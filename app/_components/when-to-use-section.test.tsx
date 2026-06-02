import { render, screen, within } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { WhenToUseSection } from "./when-to-use-section";

const SECTION_NAME = "¿Cuándo usar qué?";
const COLUMN_HEADERS = ["Si necesitas…", "Característica", "Artefacto"] as const;

const ROWS: ReadonlyArray<readonly [string, string, string]> = [
  ["Siempre activo", "Comportamiento fundacional del agente", "Instrucciones"],
  ["A veces", "Patrón reutilizable, dependiente del contexto", "Skill"],
  ["Una sola vez", "Específico de la sesión actual", "Prompt directo"],
  ["Aislamiento", "Contexto separado o paralelización", "Subagente"],
  ["Determinista", "Interfaz fija, idempotente, salida estricta", "Comando"],
  ["Garantía", "Debe ocurrir sí o sí, fuera del juicio del modelo", "Hook"],
  ["Integración", "Servicio externo, OAuth, reutilización entre equipos", "MCP server"],
];

function highlightTokens(prefix: string, className: string): Set<string> {
  return new Set(
    className
      .split(/\s+/)
      .filter((cls) => cls.startsWith(prefix))
      .map((cls) => cls.slice(prefix.length)),
  );
}

describe("WhenToUseSection", () => {
  it("CA-1: renders an identifiable section with the exact heading and three semantic column headers", () => {
    render(<WhenToUseSection />);

    const section = screen.getByTestId("when-to-use");
    expect(section).toBeInTheDocument();

    const heading = within(section).getByRole("heading", { name: SECTION_NAME });
    expect(heading).toBeInTheDocument();

    expect(screen.getByTestId("when-to-use-table").tagName).toBe("TABLE");

    for (const name of COLUMN_HEADERS) {
      const header = within(section).getByRole("columnheader", { name });
      expect(header).toHaveAttribute("scope", "col");
    }
  });

  it("CA-2: renders exactly 7 data rows with the literal content of each column", () => {
    render(<WhenToUseSection />);

    const rows = screen.getAllByTestId("when-to-use-row");
    expect(rows).toHaveLength(7);

    rows.forEach((row, index) => {
      const [col1, col2, col3] = ROWS[index];
      expect(within(row).getByText(col1)).toBeInTheDocument();
      expect(within(row).getByText(col2)).toBeInTheDocument();
      expect(within(row).getByText(col3)).toBeInTheDocument();
    });
  });

  it("CA-3: makes each row keyboard-focusable with focus highlight equivalent to hover highlight", () => {
    render(<WhenToUseSection />);

    const rows = screen.getAllByTestId("when-to-use-row");
    expect(rows).toHaveLength(7);

    for (const row of rows) {
      expect(row).toHaveAttribute("tabindex", "0");

      const hoverTokens = highlightTokens("hover:", row.className);
      const focusTokens = new Set([
        ...highlightTokens("focus:", row.className),
        ...highlightTokens("focus-within:", row.className),
      ]);

      expect(hoverTokens.size).toBeGreaterThan(0);

      const sharedHighlight = [...hoverTokens].filter((token) => focusTokens.has(token));
      expect(sharedHighlight.length).toBeGreaterThan(0);
    }
  });

  it("CA-4: tags every data cell with a data-label equal to its column header for stacked mobile view", () => {
    render(<WhenToUseSection />);

    const rows = screen.getAllByTestId("when-to-use-row");

    for (const row of rows) {
      const cells = within(row).getAllByRole("cell");
      expect(cells).toHaveLength(3);

      cells.forEach((cell, index) => {
        expect(cell).toHaveAttribute("data-label", COLUMN_HEADERS[index]);
      });
    }
  });

  it("CA-5: applies the terminal aesthetic on the section root (font-mono + a terminal-* token)", () => {
    render(<WhenToUseSection />);

    const section = screen.getByTestId("when-to-use");
    expect(section.className).toContain("font-mono");
    expect(section.className).toMatch(/terminal-/);
  });
});
