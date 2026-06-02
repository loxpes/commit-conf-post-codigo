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

test("landing serves a favicon resolvable to an image resource", async ({ page }) => {
  await page.goto("/");

  const iconLink = page.locator('link[rel="icon"]');
  await expect(iconLink).toHaveCount(1);

  const href = await iconLink.getAttribute("href");
  expect(href).toBeTruthy();

  const response = await page.request.get(href as string);
  expect(response.status()).toBe(200);
  expect(response.headers()["content-type"]).toMatch(/^image\//);
});

test("landing renders an og:title matching the brand title", async ({ page }) => {
  await page.goto("/");

  const ogTitle = page.locator('meta[property="og:title"]');
  await expect(ogTitle).toHaveCount(1);
  await expect(ogTitle).toHaveAttribute("content", "post-código");
});

test("landing renders an og:description matching the brand description", async ({ page }) => {
  await page.goto("/");

  const ogDescription = page.locator('meta[property="og:description"]');
  await expect(ogDescription).toHaveCount(1);
  await expect(ogDescription).toHaveAttribute(
    "content",
    "Bienvenidos a la era post-código — commit · post-código",
  );
});
