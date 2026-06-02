const SECTION_NAME = "¿Cuándo usar qué?";

const COLUMN_HEADERS = ["Si necesitas…", "Característica", "Artefacto"] as const;

type Row = {
  readonly need: string;
  readonly feature: string;
  readonly artifact: string;
};

/**
 * Decision table copy. Literal and order-stable: it drives both the desktop
 * tabular layout and the stacked mobile blocks. Each cell renders its column
 * label via `data-label` (D3) so the column context survives the mobile stack.
 */
const ROWS: readonly Row[] = [
  {
    need: "Siempre activo",
    feature: "Comportamiento fundacional del agente",
    artifact: "Instrucciones",
  },
  {
    need: "A veces",
    feature: "Patrón reutilizable, dependiente del contexto",
    artifact: "Skill",
  },
  {
    need: "Una sola vez",
    feature: "Específico de la sesión actual",
    artifact: "Prompt directo",
  },
  {
    need: "Aislamiento",
    feature: "Contexto separado o paralelización",
    artifact: "Subagente",
  },
  {
    need: "Determinista",
    feature: "Interfaz fija, idempotente, salida estricta",
    artifact: "Comando",
  },
  {
    need: "Garantía",
    feature: "Debe ocurrir sí o sí, fuera del juicio del modelo",
    artifact: "Hook",
  },
  {
    need: "Integración",
    feature: "Servicio externo, OAuth, reutilización entre equipos",
    artifact: "MCP server",
  },
];

/**
 * Highlight applied identically on hover and keyboard focus (D4/CA-3). The
 * `hover:` and `focus:` variants share the same underlying utility so the
 * focus feedback is equivalent to hover.
 */
const ROW_HIGHLIGHT =
  "outline-none transition-colors hover:bg-terminal-surface focus:bg-terminal-surface";

/**
 * Mobile-stacking label: each cell prints its column header via
 * `before:content-[attr(data-label)]`, visible only below `md` where the
 * table collapses into vertical blocks (D3). It is purely decorative; the
 * `<th scope="col">` stays the semantic source for screen readers.
 */
const CELL_LABEL =
  "before:mr-2 before:font-semibold before:text-terminal-accent before:content-[attr(data-label)] md:before:content-none";

export function WhenToUseSection() {
  return (
    <section
      data-testid="when-to-use"
      aria-labelledby="when-to-use-heading"
      className="w-full max-w-3xl border border-terminal-muted/40 bg-terminal-surface/40 px-6 py-10 text-left font-mono text-terminal-fg sm:px-8"
    >
      <h2
        id="when-to-use-heading"
        className="mb-6 text-2xl font-semibold tracking-tight text-terminal-fg"
      >
        <span aria-hidden="true" className="text-terminal-accent">
          {"# "}
        </span>
        {SECTION_NAME}
      </h2>

      <table
        data-testid="when-to-use-table"
        className="w-full border-collapse text-sm text-terminal-fg"
      >
        <thead className="sr-only md:not-sr-only">
          <tr>
            {COLUMN_HEADERS.map((header) => (
              <th
                key={header}
                scope="col"
                className="border-b border-terminal-muted/40 px-3 py-2 text-left text-terminal-accent uppercase tracking-wide"
              >
                {header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {ROWS.map((row) => (
            <tr
              key={row.artifact}
              data-testid="when-to-use-row"
              tabIndex={0}
              className={`block border-b border-terminal-muted/20 md:table-row ${ROW_HIGHLIGHT}`}
            >
              <td
                data-label={COLUMN_HEADERS[0]}
                className={`block px-3 py-1 text-terminal-fg md:table-cell md:py-2 ${CELL_LABEL}`}
              >
                {row.need}
              </td>
              <td
                data-label={COLUMN_HEADERS[1]}
                className={`block px-3 py-1 text-terminal-muted md:table-cell md:py-2 ${CELL_LABEL}`}
              >
                {row.feature}
              </td>
              <td
                data-label={COLUMN_HEADERS[2]}
                className={`block px-3 py-1 pb-3 text-terminal-accent-alt md:table-cell md:py-2 md:pb-2 ${CELL_LABEL}`}
              >
                {row.artifact}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </section>
  );
}
