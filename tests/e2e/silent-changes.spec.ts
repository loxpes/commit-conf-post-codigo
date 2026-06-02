import { expect, test } from "@playwright/test";

/**
 * Silent-changes section (RED). The section does not exist yet, so these
 * tests fail in the tester phase until the component renders on "/".
 *
 * Covers the OpenSpec acceptance criteria:
 * - CA-2: staggered scroll entrance plays once and never hides/replays.
 * - CA-4: responsive layout with no horizontal overflow, per viewport.
 */
const CARD_COUNT = 5;

test("CA-2: silent-changes cards appear on scroll and stay visible after re-entry", async ({
  page,
}) => {
  await page.goto("/");

  const section = page.getByTestId("silent-changes-section");
  await expect(section).toBeVisible();
  await expect(
    page.getByText(
      "Cinco cambios silenciosos. Ya están aquí, aunque nadie los esté nombrando todavía.",
    ),
  ).toBeVisible();

  await section.scrollIntoViewIfNeeded();

  for (let index = 1; index <= CARD_COUNT; index++) {
    await expect(page.getByTestId(`silent-change-card-${index}`)).toBeVisible();
  }

  await page.evaluate(() => window.scrollTo(0, 0));
  await section.scrollIntoViewIfNeeded();

  for (let index = 1; index <= CARD_COUNT; index++) {
    await expect(page.getByTestId(`silent-change-card-${index}`)).toBeVisible();
  }
});

test("CA-4: silent-changes section has no horizontal overflow and is captured per viewport", async ({
  page,
}, testInfo) => {
  await page.goto("/");

  const section = page.getByTestId("silent-changes-section");
  await section.scrollIntoViewIfNeeded();
  await expect(section).toBeVisible();

  const hasNoHorizontalOverflow = await page.evaluate(
    () => document.documentElement.scrollWidth <= window.innerWidth + 1,
  );
  expect(hasNoHorizontalOverflow).toBeTruthy();

  await page.screenshot({
    path: testInfo.outputPath(`silent-changes-${testInfo.project.name}.png`),
    fullPage: true,
  });
});
