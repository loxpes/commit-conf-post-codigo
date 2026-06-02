import { describe, expect, it } from "vitest";
import { metadata } from "./layout";

describe("RootLayout metadata", () => {
  it("should expose an og:title matching the brand title when metadata is read", () => {
    expect(metadata.openGraph?.title).toBe(metadata.title);
    expect(metadata.openGraph?.title).toBe("post-código");
  });

  it("should expose an og:description matching the brand description when metadata is read", () => {
    expect(metadata.openGraph?.description).toBe(metadata.description);
    expect(metadata.openGraph?.description).toBe(
      "Bienvenidos a la era post-código — commit · post-código",
    );
  });
});
