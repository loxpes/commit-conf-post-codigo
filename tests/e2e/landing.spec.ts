import { expect, test } from "@playwright/test";

/**
 * Landing smoke. The pipeline's tester phase builds on this:
 * launch the site, assert the hero heading renders, and capture a
 * full-page screenshot per viewport (375 / 768 / 1280).
 */
test("landing renders the post-código hero and captures a full-page screenshot", async ({
  page,
}, testInfo) => {
  await page.goto("/");

  const heading = page.getByRole("heading", {
    level: 1,
    name: "Bienvenidos a la era post-código",
  });
  await expect(heading).toBeVisible();

  await page.screenshot({
    path: testInfo.outputPath(`landing-${testInfo.project.name}.png`),
    fullPage: true,
  });
});

/**
 * CA-5 — Responsive without horizontal overflow.
 *
 * Runs 3× via the project matrix (375 / 768 / 1280). The viewport comes from
 * the project config, so we never call setViewportSize here; the screenshot is
 * named by testInfo.project.name to keep one artifact per viewport.
 */
test("hero renders title and subtitle with no horizontal overflow across viewports", async ({
  page,
}, testInfo) => {
  await page.goto("/");

  const title = page.getByRole("heading", {
    level: 1,
    name: "Bienvenidos a la era post-código",
  });
  await expect(title).toBeVisible();

  const subtitle = page.getByText(
    "Cómo la IA está reescribiendo nuestro oficio mientras lo vivimos.",
  );
  await expect(subtitle).toBeVisible();

  const { scrollWidth, clientWidth } = await page.evaluate(() => ({
    scrollWidth: document.documentElement.scrollWidth,
    clientWidth: document.documentElement.clientWidth,
  }));
  expect(scrollWidth).toBeLessThanOrEqual(clientWidth + 1);

  await page.screenshot({
    path: testInfo.outputPath(`hero-responsive-${testInfo.project.name}.png`),
    fullPage: true,
  });
});
