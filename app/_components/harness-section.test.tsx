import { render, screen, within } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { HarnessSection } from "./harness-section";

const GUIDE_ITEMS = ["RULES.md", "AGENTS.md", ".editorconfig", "ESLint", "tipos en TypeScript"];
const SENSOR_ITEMS = ["tests", "type-checker", "linter", "security scan", "gates de CI"];

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

describe("HarnessSection", () => {
  beforeEach(() => {
    mockMatchMedia(() => false);
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it("CA-1: renders a section with a heading whose accessible name is exactly 'El arnés'", () => {
    render(<HarnessSection />);

    expect(screen.getByTestId("harness-section")).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: "El arnés" })).toBeInTheDocument();
  });

  it("CA-2: guides block shows the 5 literal guide texts and identifies its role as conditioning ANTES", () => {
    render(<HarnessSection />);

    const guides = screen.getByTestId("harness-guides");
    for (const item of GUIDE_ITEMS) {
      expect(within(guides).getByText(item)).toBeInTheDocument();
    }
    expect(within(guides).getByText(/condicionan antes/i)).toBeInTheDocument();
  });

  it("CA-3: sensors block shows the 5 literal sensor texts and identifies its role as verifying DESPUÉS", () => {
    render(<HarnessSection />);

    const sensors = screen.getByTestId("harness-sensors");
    for (const item of SENSOR_ITEMS) {
      expect(within(sensors).getByText(item)).toBeInTheDocument();
    }
    expect(within(sensors).getByText(/verifican después/i)).toBeInTheDocument();
  });

  it("renders the intro framing arnés as guías plus sensores", () => {
    render(<HarnessSection />);

    const intro = screen.getByTestId("harness-intro");
    expect(intro).toBeInTheDocument();
    expect(intro.textContent).toMatch(/guías/i);
    expect(intro.textContent).toMatch(/sensores/i);
  });
});
