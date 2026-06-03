import { render, screen } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import HomePage from "./page";

const FULL_TITLE = "Bienvenidos a la era POST-CÓDIGO";

function mockMatchMedia(matcher: (query: string) => boolean) {
  Object.defineProperty(window, "matchMedia", {
    writable: true,
    configurable: true,
    value: vi.fn().mockImplementation((query: string) => ({
      matches: matcher(query),
      media: query,
      onchange: null,
      addEventListener: vi.fn(),
      removeEventListener: vi.fn(),
      addListener: vi.fn(),
      removeListener: vi.fn(),
      dispatchEvent: vi.fn(),
    })),
  });
}

describe("HomePage", () => {
  beforeEach(() => {
    mockMatchMedia(() => false);
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it("CA-1: hero container carries full-viewport terminal aesthetic classes", () => {
    const { container } = render(<HomePage />);

    const hero = container.querySelector("main") ?? container.firstElementChild;
    expect(hero).not.toBeNull();
    expect(hero?.className).toContain("min-h-dvh");
    expect(hero?.className).toContain("bg-terminal-bg");
    expect(hero?.className).toContain("font-mono");
  });

  it("CA-2: heading exposes the full accessible name during the token reveal", () => {
    render(<HomePage />);

    const heading = screen.getByRole("heading", { level: 1 });
    expect(heading).toHaveAccessibleName(FULL_TITLE);

    const cursor = screen.getByTestId("hero-title-cursor");
    expect(cursor).toBeInTheDocument();

    const title = screen.getByTestId("hero-title");
    const animatedLayer = title.querySelector("[aria-hidden='true']");
    expect(animatedLayer).not.toBeNull();
  });

  it("CA-3: renders the exact subtitle copy", () => {
    render(<HomePage />);

    expect(
      screen.getByText("Cómo la IA está reescribiendo nuestro oficio mientras lo vivimos."),
    ).toBeInTheDocument();
  });

  it("CA-4: renders the exact author footer copy", () => {
    render(<HomePage />);

    expect(
      screen.getByText(
        (_content, element) =>
          element?.textContent?.replace(/\s+/g, " ").trim() ===
          "Jorge Martín Lopes · AI Software Architect · Sopra Steria · @loxpes · #CommitConf2026",
      ),
    ).toBeInTheDocument();
  });

  it("CA-5: renders a scroll indicator in the lower zone", () => {
    render(<HomePage />);

    expect(screen.getByTestId("hero-scroll-indicator")).toBeInTheDocument();
  });

  it("CA-6: renders the full title immediately when prefers-reduced-motion is reduce", () => {
    mockMatchMedia((query) => query.includes("prefers-reduced-motion"));

    render(<HomePage />);

    const heading = screen.getByRole("heading", { level: 1 });
    expect(heading).toHaveAccessibleName(FULL_TITLE);
  });
});
