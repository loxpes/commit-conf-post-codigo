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

describe("HarnessSection animation & accessibility", () => {
  beforeEach(() => {
    mockMatchMedia(() => false);
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it("CA-4: renders the rail track with the agent positioned along it", () => {
    render(<HarnessSection />);

    const rail = screen.getByTestId("harness-rail");
    const agent = screen.getByTestId("harness-agent");

    expect(rail).toBeInTheDocument();
    expect(agent).toBeInTheDocument();
    expect(rail).toContainElement(agent);
  });

  it("CA-5: blocks wrapper stacks by default and lays out side-by-side at a larger breakpoint", () => {
    render(<HarnessSection />);

    const blocks = screen.getByTestId("harness-blocks");

    expect(blocks.className).toMatch(/flex-col/);
    expect(blocks.className).toMatch(/(sm|md|lg):flex-row/);
  });

  it("CA-6: shows guides, sensors and the agent immediately when prefers-reduced-motion is reduce", () => {
    mockMatchMedia((query) => query.includes("prefers-reduced-motion"));

    render(<HarnessSection />);

    const guides = screen.getByTestId("harness-guides");
    const sensors = screen.getByTestId("harness-sensors");

    for (const item of GUIDE_ITEMS) {
      expect(within(guides).getByText(item)).toBeInTheDocument();
    }
    for (const item of SENSOR_ITEMS) {
      expect(within(sensors).getByText(item)).toBeInTheDocument();
    }
    expect(screen.getByTestId("harness-agent")).toBeInTheDocument();
  });

  it("CA-7: heading is accessible, decorative layers are aria-hidden, and literal texts are not hidden from screen readers", () => {
    render(<HarnessSection />);

    expect(screen.getByRole("heading", { name: "El arnés" })).toBeInTheDocument();

    expect(screen.getByTestId("harness-rail")).toHaveAttribute("aria-hidden", "true");
    expect(screen.getByTestId("harness-agent")).toHaveAttribute("aria-hidden", "true");

    for (const item of [...GUIDE_ITEMS, ...SENSOR_ITEMS]) {
      const node = screen.getByText(item);
      expect(node.closest("[aria-hidden='true']")).toBeNull();
    }
  });
});
