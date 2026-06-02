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

const SECTION = "[data-testid='silent-changes-section']";
const CARD = "[data-testid^='silent-change-card-']";

/**
 * "Los 5 cambios silenciosos" section (cc-15). Selectors are testID-based and
 * literal-text assertions are intentional: the landing is single-locale.
 *
 * The three Playwright projects drive viewports (375 / 768 / 1280), so each
 * assertion runs once per viewport without an explicit loop.
 */

// CA-2.1 — after scrolling to the section, the 5 cards are visible.
test("CA-2.1 the 5 silent-change cards become visible after scrolling to the section", async ({
  page,
}) => {
  await page.goto("/");

  const section = page.locator(SECTION);
  await section.scrollIntoViewIfNeeded();
  await expect(section).toBeVisible();

  const cards = page.locator(CARD);
  await expect(cards).toHaveCount(5);

  for (let i = 0; i < 5; i++) {
    await expect(cards.nth(i)).toBeVisible();
    const opacity = await cards.nth(i).evaluate((el) =>
      Number(window.getComputedStyle(el as HTMLElement).opacity),
    );
    expect(opacity).toBeGreaterThan(0.99);
  }
});

// CA-4.1 — no horizontal overflow at 375px; single-column stack.
test("CA-4.1 no horizontal overflow at 375px and cards stacked in a single column", async ({
  page,
}, testInfo) => {
  test.skip(testInfo.project.name !== "mobile-375", "375px-only assertion");

  await page.goto("/");
  await page.locator(SECTION).scrollIntoViewIfNeeded();
  await expect(page.locator(SECTION)).toBeVisible();

  const noOverflow = await page.evaluate(
    () => document.documentElement.scrollWidth === window.innerWidth,
  );
  expect(noOverflow).toBeTruthy();

  const cards = page.locator(CARD);
  await expect(cards).toHaveCount(5);

  // Single column: every card shares the same left edge (x).
  const boxes = await cards.evaluateAll((els) =>
    els.map((el) => Math.round(el.getBoundingClientRect().x)),
  );
  const uniqueLeftEdges = new Set(boxes);
  expect(uniqueLeftEdges.size).toBe(1);

  await page.locator(SECTION).screenshot({
    path: path.join(EVIDENCE_DIR, "cc15-silent-changes-375.png"),
  });
});

// CA-4.2 — grid with 2+ columns from 768px upward; no horizontal overflow.
test("CA-4.2 cards lay out in 2+ columns and no horizontal overflow at >=768px", async ({
  page,
}, testInfo) => {
  test.skip(testInfo.project.name === "mobile-375", ">=768px-only assertion");

  await page.goto("/");
  await page.locator(SECTION).scrollIntoViewIfNeeded();
  await expect(page.locator(SECTION)).toBeVisible();

  const noOverflow = await page.evaluate(
    () => document.documentElement.scrollWidth === window.innerWidth,
  );
  expect(noOverflow).toBeTruthy();

  const cards = page.locator(CARD);
  await expect(cards).toHaveCount(5);

  // Two-or-more columns: cards do not all share the same left edge.
  const leftEdges = await cards.evaluateAll((els) =>
    els.map((el) => Math.round(el.getBoundingClientRect().x)),
  );
  const uniqueLeftEdges = new Set(leftEdges);
  expect(uniqueLeftEdges.size).toBeGreaterThanOrEqual(2);

  const suffix = testInfo.project.name.replace(/^\D+/, ""); // tablet-768 -> 768
  await page.locator(SECTION).screenshot({
    path: path.join(EVIDENCE_DIR, `cc15-silent-changes-${suffix}.png`),
  });
});
