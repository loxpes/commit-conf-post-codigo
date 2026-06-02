import path from "node:path";
import { expect, test } from "@playwright/test";

/**
 * Evidence sink for the tester phase. Screenshots are written here (outside the
 * Playwright `test-results/` churn) so the pipeline can attach them to the card.
 */
const EVIDENCE_DIR = path.resolve(
  process.cwd(),
  "..",
  ".pipeline",
  "tmp",
  "evidence",
);

/**
 * Landing smoke (default motion). The pipeline's tester phase builds on this:
 * launch the site, assert the hero contract renders, and capture a full-page
 * screenshot per viewport (375 / 768 / 1280).
 *
 * Reduced-motion behavior is covered at unit level and by the
 * design-compliance / visual auditors, not here.
 */
test("landing renders the post-código hero and captures a full-page screenshot", async ({
  page,
}, testInfo) => {
  await page.goto("/");

  const heading = page.getByRole("heading", {
    level: 1,
    name: "Bienvenidos a la era POST-CÓDIGO",
  });
  await expect(heading).toBeVisible();

  await expect(
    page.getByText("Cómo la IA está reescribiendo nuestro oficio mientras lo vivimos."),
  ).toBeVisible();

  await expect(
    page.getByText(
      "Jorge Martín Lopes · AI Software Architect · Sopra Steria · @loxpes · #CommitConf2026",
    ),
  ).toBeVisible();

  const hasNoHorizontalOverflow = await page.evaluate(
    () => document.documentElement.scrollWidth <= window.innerWidth + 1,
  );
  expect(hasNoHorizontalOverflow).toBeTruthy();

  await page.screenshot({
    path: testInfo.outputPath(`landing-${testInfo.project.name}.png`),
    fullPage: true,
  });
});

/**
 * "¿Cuándo usar qué?" section (cc-17). Selectors are testID-based; literal text
 * assertions are intentional here because the landing is single-locale (Spanish)
 * with fixed copy — there is no i18n drift to guard against.
 *
 * Viewports (375 / 768 / 1280) are driven by the three Playwright projects, so
 * each assertion runs once per viewport without an explicit loop.
 */

// CA-1.1 — section visible, rendered AFTER the hero, 3 literal column headers.
test("CA-1.1 when-to-use renders after the hero with 3 literal column headers", async ({
  page,
}) => {
  await page.goto("/");

  const section = page.getByTestId("when-to-use");
  await expect(section).toBeVisible();
  await expect(page.getByRole("heading", { name: "¿Cuándo usar qué?" })).toBeVisible();

  // Section is positioned below the hero (greater vertical offset).
  const heroBox = await page.getByRole("heading", { level: 1 }).boundingBox();
  const sectionBox = await section.boundingBox();
  expect(heroBox).not.toBeNull();
  expect(sectionBox).not.toBeNull();
  expect(sectionBox!.y).toBeGreaterThan(heroBox!.y);

  // Column headers: the <thead> is sr-only below md, so it stays in the DOM at
  // every viewport. Assert by literal text rather than visibility.
  const headers = page.getByTestId("when-to-use-table").locator("th[scope='col']");
  await expect(headers).toHaveCount(3);
  await expect(headers.nth(0)).toHaveText("Si necesitas…");
  await expect(headers.nth(1)).toHaveText("Característica");
  await expect(headers.nth(2)).toHaveText("Artefacto");
});

// CA-2.1 — exactly 7 data rows; artifact column in order + col1 spot-checks.
test("CA-2.1 table has 7 rows with the artifact column in order", async ({ page }) => {
  await page.goto("/");

  const rows = page.getByTestId("when-to-use-row");
  await expect(rows).toHaveCount(7);

  const expectedArtifacts = [
    "Instrucciones",
    "Skill",
    "Prompt directo",
    "Subagente",
    "Comando",
    "Hook",
    "MCP server",
  ];
  for (const [index, artifact] of expectedArtifacts.entries()) {
    // 3rd cell of each row is the artifact column.
    await expect(rows.nth(index).locator("td").nth(2)).toHaveText(artifact);
  }

  // Spot-check the "Si necesitas…" column (1st cell) first and last.
  await expect(rows.first().locator("td").nth(0)).toHaveText("Siempre activo");
  await expect(rows.last().locator("td").nth(0)).toHaveText("Integración");
});

// CA-3.1 — rows are keyboard-focusable (tabindex=0, reachable as activeElement).
test("CA-3.1 a table row is keyboard-focusable", async ({ page }) => {
  await page.goto("/");

  const firstRow = page.getByTestId("when-to-use-row").first();
  await expect(firstRow).toHaveAttribute("tabindex", "0");

  await firstRow.focus();
  await expect(firstRow).toBeFocused();

  // The focused element is genuinely the row, not a descendant.
  const isRow = await firstRow.evaluate(
    (el) => document.activeElement === el && el.getAttribute("data-testid") === "when-to-use-row",
  );
  expect(isRow).toBeTruthy();
});

// CA-4.1 — no horizontal overflow at any viewport + evidence screenshots.
test("CA-4.1 no horizontal overflow; capture evidence screenshots", async ({
  page,
}, testInfo) => {
  await page.goto("/");
  await expect(page.getByTestId("when-to-use")).toBeVisible();

  const hasNoHorizontalOverflow = await page.evaluate(
    () => document.documentElement.scrollWidth <= window.innerWidth + 1,
  );
  expect(hasNoHorizontalOverflow).toBeTruthy();

  const suffix = testInfo.project.name.replace(/^\D+/, ""); // mobile-375 -> 375

  // Full-page landing screenshot per viewport.
  await page.screenshot({
    path: path.join(EVIDENCE_DIR, `cc17-landing-${suffix}.png`),
    fullPage: true,
  });

  // Section-focused screenshot per viewport.
  await page.getByTestId("when-to-use").scrollIntoViewIfNeeded();
  await page.getByTestId("when-to-use").screenshot({
    path: path.join(EVIDENCE_DIR, `cc17-when-to-use-${suffix}.png`),
  });
});
