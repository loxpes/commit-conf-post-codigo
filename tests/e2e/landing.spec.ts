import { expect, test } from "@playwright/test";

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
 * "¿Cuándo usar qué?" section (cc-17). Asserts the section is visible below the
 * hero and that adding it introduces no horizontal overflow at the configured
 * viewports (375 / 768 / 1280 are driven by the Playwright projects).
 */
test("when-to-use section is visible with no horizontal overflow", async ({ page }) => {
  await page.goto("/");

  const section = page.getByTestId("when-to-use");
  await expect(section).toBeVisible();
  await expect(page.getByRole("heading", { name: "¿Cuándo usar qué?" })).toBeVisible();
  await expect(page.getByTestId("when-to-use-row")).toHaveCount(7);

  const hasNoHorizontalOverflow = await page.evaluate(
    () => document.documentElement.scrollWidth <= window.innerWidth + 1,
  );
  expect(hasNoHorizontalOverflow).toBeTruthy();
});
