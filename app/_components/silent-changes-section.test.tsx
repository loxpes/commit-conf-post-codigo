import { render, screen, within } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { SilentChangesSection } from "./silent-changes-section";

const INTRO_TEXT =
  "Cinco cambios silenciosos. Ya están aquí, aunque nadie los esté nombrando todavía.";

const CARDS = [
  { number: "01", pillar: "LENGUAJES", phrase: "El lenguaje ya no es una barrera." },
  { number: "02", pillar: "FRAMEWORKS", phrase: "Los frameworks propietarios encorsetan." },
  { number: "03", pillar: "ESCALA", phrase: "Equipos de 10 compiten con multinacionales." },
  { number: "04", pillar: "PRODUCTO", phrase: "Desarrollamos producto. No código." },
  { number: "05", pillar: "OFICIO", phrase: "Pensamos en harness. No en patrones." },
] as const;

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

function normalizedText(element: Element | null | undefined): string {
  return element?.textContent?.replace(/\s+/g, " ").trim() ?? "";
}

describe("SilentChangesSection", () => {
  beforeEach(() => {
    mockMatchMedia(() => false);
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it("CA-1: renders the intro copy and the five cards with exact number, pillar and phrase", () => {
    render(<SilentChangesSection />);

    const section = screen.getByTestId("silent-changes-section");
    expect(section).toBeInTheDocument();
    expect(normalizedText(section)).toContain(INTRO_TEXT);

    for (const { number, pillar, phrase } of CARDS) {
      const index = Number(number);
      const card = screen.getByTestId(`silent-change-card-${index}`);
      const cardScope = within(card);

      expect(cardScope.getByText(number)).toBeInTheDocument();
      expect(cardScope.getByText(pillar)).toBeInTheDocument();

      const cardText = normalizedText(card);
      expect(cardText).toContain(pillar);
      expect(cardText).toContain(phrase);
    }
  });

  it("CA-3: renders intro and all five cards complete when prefers-reduced-motion is reduce", () => {
    mockMatchMedia((query) => query.includes("prefers-reduced-motion"));

    render(<SilentChangesSection />);

    const section = screen.getByTestId("silent-changes-section");
    expect(normalizedText(section)).toContain(INTRO_TEXT);

    for (const { number, pillar, phrase } of CARDS) {
      const index = Number(number);
      const card = screen.getByTestId(`silent-change-card-${index}`);
      const cardText = normalizedText(card);

      expect(cardText).toContain(number);
      expect(cardText).toContain(pillar);
      expect(cardText).toContain(phrase);
    }
  });

  it("CA-5: keeps intro and every card pillar and phrase accessible under default motion", () => {
    render(<SilentChangesSection />);

    expect(
      screen.getByText(
        (_content, element) => normalizedText(element) === INTRO_TEXT,
      ),
    ).toBeInTheDocument();

    for (const { pillar, phrase } of CARDS) {
      expect(
        screen.getByText(
          (_content, element) => normalizedText(element) === phrase,
        ),
      ).toBeInTheDocument();
      expect(screen.getByText(pillar)).toBeInTheDocument();
    }
  });
});
