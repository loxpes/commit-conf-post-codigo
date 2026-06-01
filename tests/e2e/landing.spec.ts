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
