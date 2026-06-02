import { render, screen, within } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";
import { SilentChangesSection } from "./silent-changes-section";

const INTRO_TEXT =
  "Cinco cambios silenciosos. Ya están aquí, aunque nadie los esté nombrando todavía.";

const CARDS: ReadonlyArray<{
  readonly number: string;
  readonly pillar: string;
  readonly phrase: string;
}> = [
  { number: "01", pillar: "LENGUAJES", phrase: "El lenguaje ya no es una barrera." },
  { number: "02", pillar: "FRAMEWORKS", phrase: "Los frameworks propietarios encorsetan." },
  { number: "03", pillar: "ESCALA", phrase: "Equipos de 10 compiten con multinacionales." },
  { number: "04", pillar: "PRODUCTO", phrase: "Desarrollamos producto. No código." },
  { number: "05", pillar: "OFICIO", phrase: "Pensamos en harness. No en patrones." },
];

afterEach(() => {
  vi.restoreAllMocks();
  vi.resetModules();
});

describe("SilentChangesSection", () => {
  it("CA-1: renders an identifiable section with exactly 5 cards carrying their number, pillar and exact phrase", () => {
    render(<SilentChangesSection />);

    const section = screen.getByTestId("silent-changes-section");
    expect(section).toBeInTheDocument();

    CARDS.forEach((card, index) => {
      const testId = `silent-change-card-${index + 1}`;
      const cardEl = within(section).getByTestId(testId);
      expect(cardEl).toBeInTheDocument();

      expect(within(cardEl).getByText(card.number)).toBeInTheDocument();
      expect(within(cardEl).getByText(card.pillar)).toBeInTheDocument();
      expect(within(cardEl).getByText(card.phrase)).toBeInTheDocument();
    });

    const allCards = within(section).getAllByTestId(/^silent-change-card-\d+$/);
    expect(allCards).toHaveLength(5);
  });

  it("CA-5: keeps the intro and every card text in the DOM and visible when useReducedMotion is true", async () => {
    vi.resetModules();
    vi.doMock("motion/react", async () => {
      const actual = await vi.importActual<typeof import("motion/react")>("motion/react");
      return { ...actual, useReducedMotion: () => true };
    });

    const { SilentChangesSection: ReducedMotionSection } = await import(
      "./silent-changes-section"
    );

    render(<ReducedMotionSection />);

    expect(screen.getByText(INTRO_TEXT)).toBeInTheDocument();

    for (const card of CARDS) {
      const phrase = screen.getByText(card.phrase);
      expect(phrase).toBeInTheDocument();
      expect(phrase).toBeVisible();
      expect(phrase.closest('[style*="visibility: hidden"]')).toBeNull();
      expect(phrase.closest('[style*="display: none"]')).toBeNull();
    }
  });
});
