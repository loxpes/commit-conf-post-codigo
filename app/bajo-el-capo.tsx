"use client";

import { AnimatePresence, motion, useInView, useReducedMotion } from "motion/react";
import { useId, useRef, useState } from "react";

const SECTION_NAME = "Bajo el capó: el stack del pipeline";

const INTRO =
  "El arnés, por dentro. Agentes en claro, script / runner / hook en ámbar. Toca (o pasa el ratón) para el detalle de cada pieza.";

const LEGEND =
  "agentes en claro · script / runner / hook en ámbar · toca o pasa el ratón para el detalle";

/**
 * A chip that carries an explanatory detail. On desktop the detail shows as a
 * hover/focus tooltip; on touch (no hover) it toggles open on tap and the
 * detail renders inline below the chip so no information is lost. The same
 * `open` state drives both, so keyboard and touch users get the full content.
 */
type DetailItem = {
  readonly id: string;
  readonly label: string;
  readonly detail: string;
  /** Inline markup-free emphasis tokens, rendered bold + accent-alt. */
  readonly emphasis?: readonly string[];
  /** Cyan-tinted (key) chip styling, mirroring the "buenas prácticas" set. */
  readonly key?: boolean;
};

/**
 * "Buenas prácticas" — order-stable, literal copy from the reference slide.
 * Rendered as cyan (key) chips.
 */
const GOOD_PRACTICES: readonly DetailItem[] = [
  {
    id: "spec-driven",
    label: "Spec-driven (OpenSpec)",
    detail:
      "La especificación formal y legible por máquina es la fuente de la verdad: de ella derivan código, tests y documentación. Ciclo: explore → propose → archive → apply.",
    emphasis: ["fuente de la verdad"],
    key: true,
  },
  {
    id: "harness",
    label: "Harness: guías + sensores",
    detail:
      "Guías (rules, AGENTS.md, tipos) que condicionan al agente ANTES + sensores (tests, lint, CI) que verifican DESPUÉS. El carril por el que se mueve y los checkpoints.",
    emphasis: ["Guías", "sensores"],
    key: true,
  },
  {
    id: "tdd",
    label: "TDD · RED→GREEN→REFACTOR",
    detail:
      "Primero un test que falla (RED), luego el código mínimo para pasarlo (GREEN), luego limpieza con tests en verde (REFACTOR).",
    emphasis: ["test que falla"],
    key: true,
  },
  {
    id: "column-driven",
    label: "Column-driven",
    detail:
      "La columna de Trello en la que vive la tarjeta ES su estado. El daemon decide qué fase lanzar según la columna.",
    emphasis: ["columna de Trello"],
    key: true,
  },
  {
    id: "context-engineering",
    label: "Context engineering",
    detail:
      "Curar a propósito lo que entra al modelo: artefactos, reglas, ejemplos. «Lo que el modelo ve es lo que el modelo hace».",
    emphasis: ["lo que entra al modelo"],
    key: true,
  },
  {
    id: "delegate",
    label: "Delegate-by-default",
    detail:
      "Toda tarea aislable se delega a un subagente especializado: contexto del orquestador limpio, experto por tema y paralelismo si son independientes.",
    emphasis: ["delega a un subagente", "paralelismo"],
    key: true,
  },
  {
    id: "adversarial",
    label: "Revisión adversarial ×3",
    detail:
      "Tres revisores en paralelo con lentes distintas (correctness / security / architecture) que buscan fallos, no aprueban a la ligera.",
    emphasis: ["en paralelo", "buscan fallos"],
    key: true,
  },
];

/**
 * "Orquestación" — neutral (non-key) chips, order-stable from the slide.
 */
const ORCHESTRATION: readonly DetailItem[] = [
  {
    id: "daemon",
    label: "Daemon Node · daemon.mjs",
    detail:
      "Proceso Node que vigila el board y despacha la fase según la columna. Único actor: serializa por tarjeta (cola FIFO, retry, pausa por cuota).",
    emphasis: ["vigila el board", "serializa por tarjeta"],
  },
  {
    id: "trello-fsm",
    label: "Trello · máquina de estados",
    detail:
      "El board es la máquina de estados: columna = fase. Mover una tarjeta dispara (o aprueba) el siguiente paso.",
    emphasis: ["es"],
  },
  {
    id: "openspec",
    label: "OpenSpec · la spec es la verdad",
    detail:
      "Herramienta spec-driven. La proposal + spec se generan en scaffold y se archivan al cerrar.",
    emphasis: ["scaffold"],
  },
  {
    id: "graph-yaml",
    label: "graph.yaml · DAG de fases",
    detail:
      "El grafo: qué fase corre en cada columna, qué agente/runner usa y a dónde transiciona en éxito o fallo.",
    emphasis: ["grafo"],
  },
  {
    id: "pipeline-bot",
    label: "pipeline_bot · actor",
    detail:
      "Cuenta de Trello propia del bot: separa lo que hace el agente (refina, mueve, comenta) de lo que decides tú (apruebas, revisas).",
    emphasis: ["separa"],
  },
];

/**
 * The 9-phase flow. Each phase lists its agents (light) and the script / runner
 * / hook that runs in that phase (amber). The detail is the per-phase tooltip
 * copy from the slide.
 */
type Phase = {
  readonly id: string;
  readonly name: string;
  /** Agent names rendered in light text; bold names mirror the slide's <b>. */
  readonly agents: readonly string[];
  /** The amber "what gets launched" line (script / runner / hook). */
  readonly run: string;
  readonly detail: string;
  readonly emphasis?: readonly string[];
};

const PHASES: readonly Phase[] = [
  {
    id: "refine",
    name: "refine",
    agents: ["openspec-scope-classifier"],
    run: "skill opsx:explore",
    detail:
      "Convierte la tarjeta en criterios de aceptación testeables y decide el alcance. La card queda esperando tu aprobación humana (la mueves a Aprobada).",
    emphasis: ["criterios de aceptación", "aprobación humana"],
  },
  {
    id: "scaffold",
    name: "scaffold",
    agents: ["orchestrator"],
    run: "opsx:propose · gh (PR draft)",
    detail:
      "Prepara el terreno: rama feature/, PR en draft y proposal OpenSpec validada. Idempotente: si ya existe, no lo recrea.",
    emphasis: ["rama", "PR en draft", "proposal OpenSpec"],
  },
  {
    id: "test_red",
    name: "test_red",
    agents: ["tdd-red"],
    run: "opsx:apply (deliver)",
    detail:
      "Fast-lane: una sola sesión recorre test_red→implement→CI→review→tester→docs sin arrancar en frío. Arranca con un test en rojo.",
    emphasis: ["Fast-lane", "test en rojo"],
  },
  {
    id: "implement",
    name: "implement",
    agents: ["tdd-refactor", "refactoring-specialist"],
    run: "opsx:apply · hook TDD-Guard",
    detail:
      "Código mínimo hasta verde + refactor. El hook TDD-Guard (pre-edit) impide tocar producción sin un test que la cubra.",
    emphasis: ["verde", "hook TDD-Guard"],
  },
  {
    id: "ci",
    name: "CI",
    agents: ["runner determinista"],
    run: "ci-gate.mjs · hook post-dev-local-ci",
    detail:
      "Gate: typecheck + test + build + lint (Biome) en local antes de pushear; GitHub Actions en el merge. Si falla → vuelve a implement.",
    emphasis: ["Gate", "local"],
  },
  {
    id: "review",
    name: "review",
    agents: ["pr-preflight", "correctness · security", "architecture"],
    run: "refactor-loop ≤2",
    detail:
      "Revisión adversarial ×3 en paralelo. Si hay hallazgos, un loop de refactor acotado los corrige y vuelve a revisar.",
    emphasis: ["Revisión adversarial ×3", "loop de refactor acotado"],
  },
  {
    id: "tester",
    name: "tester",
    agents: ["playwright-e2e", "design-compliance", "visual-regression", "accessibility"],
    run: "Playwright · screenshots→Trello",
    detail:
      "Levanta la app y la prueba de verdad: e2e, regresión visual, accesibilidad y cumplimiento de diseño. Adjunta screenshots a la tarjeta como evidencia.",
    emphasis: ["Levanta la app", "Adjunta screenshots"],
  },
  {
    id: "docs",
    name: "docs",
    agents: ["openspec-guardian", "documentation-syncer"],
    run: "sync doc/",
    detail:
      "Sincroniza la documentación con la spec y el código, y verifica que no hay drift entre lo escrito y lo implementado.",
    emphasis: ["documentación", "drift"],
  },
  {
    id: "deliver",
    name: "deliver",
    agents: ["runner de cierre"],
    run: "auto-merge.mjs · archive-on-done.mjs",
    detail:
      "Con Auto-merge: archiva el change, marca la PR ready, mergea a main (squash) y Vercel despliega. Sin Auto-merge: asigna a revisión humana (Jorge/Carlos).",
    emphasis: ["Auto-merge", "ready", "Vercel despliega"],
  },
];

type ColumnCard = {
  readonly id: string;
  readonly title: string;
  readonly items: readonly string[];
};

const COLUMNS: readonly ColumnCard[] = [
  {
    id: "skills",
    title: "Skills",
    items: ["trello", "opsx (OpenSpec)", "design-review", "self-improving-agent"],
  },
  {
    id: "plugins",
    title: "Plugins · MCP",
    items: ["context7 · docs de libs", "playwright · navegador"],
  },
  {
    id: "stack",
    title: "Stack tecnológico",
    items: [
      "Claude Code · Opus 4.8 / Sonnet 4.6",
      "gh · git",
      "Next.js 16 · React 19 · Tailwind v4 · motion",
      "Vitest · Playwright · Biome",
      "Vercel",
    ],
  },
];

/**
 * Renders a detail string with the given emphasis substrings bolded in the
 * accent-alt colour, mirroring the <b> tags in the reference slide. Falls back
 * to plain text when there is nothing to emphasise.
 */
function EmphasisedText({ text, emphasis }: { text: string; emphasis?: readonly string[] }) {
  if (!emphasis || emphasis.length === 0) {
    return <>{text}</>;
  }

  // Build a single alternation regex, escaping each emphasis token, then split
  // the text keeping the matched segments so we can wrap them.
  const escaped = emphasis.map((token) => token.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"));
  const pattern = new RegExp(`(${escaped.join("|")})`, "g");
  const parts = text.split(pattern);

  return (
    <>
      {parts.map((part, index) =>
        emphasis.includes(part) ? (
          // biome-ignore lint/suspicious/noArrayIndexKey: split output is order-stable
          <strong key={index} className="font-semibold text-terminal-accent-alt">
            {part}
          </strong>
        ) : (
          // biome-ignore lint/suspicious/noArrayIndexKey: split output is order-stable
          <span key={index}>{part}</span>
        ),
      )}
    </>
  );
}

/**
 * A chip with an attached detail. Desktop: detail floats as a hover/focus
 * tooltip. Touch / no-hover: tapping toggles the detail open and it renders
 * inline below the chip (md:hidden) so nothing is lost. The `aria-expanded`
 * button + linked region keep it accessible on every input.
 */
function DetailChip({ item, reduceMotion }: { item: DetailItem; reduceMotion: boolean }) {
  const [open, setOpen] = useState(false);
  const tipId = useId();

  const base =
    "relative inline-flex items-center rounded-md border px-2.5 py-1.5 text-left text-xs leading-snug whitespace-normal outline-none transition-colors focus-visible:ring-1 focus-visible:ring-terminal-accent";
  const tone = item.key
    ? "border-terminal-accent-alt/40 bg-terminal-accent-alt/10 text-terminal-accent-alt hover:bg-terminal-accent-alt/15"
    : "border-terminal-muted/40 bg-terminal-surface text-terminal-fg hover:border-terminal-accent/50";

  return (
    <span className="group/chip relative inline-block">
      <button
        type="button"
        aria-expanded={open}
        aria-controls={tipId}
        onClick={() => setOpen((value) => !value)}
        className={`${base} ${tone}`}
      >
        {item.label}
        <span aria-hidden="true" className="ml-1.5 text-[0.6rem] text-terminal-muted md:hidden">
          {open ? "▾" : "›"}
        </span>
      </button>

      {/* DESKTOP: floating tooltip on hover/focus (md and up). */}
      <span
        role="tooltip"
        id={`${tipId}-desktop`}
        className="pointer-events-none absolute bottom-[calc(100%+0.6rem)] left-1/2 z-30 hidden w-60 -translate-x-1/2 rounded-lg border border-terminal-accent/70 bg-terminal-bg p-3 text-left text-[0.7rem] leading-relaxed font-normal text-terminal-fg opacity-0 shadow-[0_14px_40px_rgba(0,0,0,0.7)] transition-opacity duration-150 group-hover/chip:opacity-100 group-focus-within/chip:opacity-100 md:block"
      >
        <EmphasisedText text={item.detail} emphasis={item.emphasis} />
        <span
          aria-hidden="true"
          className="absolute top-full left-1/2 -translate-x-1/2 border-[6px] border-transparent border-t-terminal-accent/70"
        />
      </span>

      {/* MOBILE: inline expandable detail (below md). */}
      <AnimatePresence initial={false}>
        {open ? (
          <motion.span
            id={tipId}
            key="inline"
            initial={reduceMotion ? false : { opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={reduceMotion ? { opacity: 0 } : { opacity: 0, height: 0 }}
            transition={reduceMotion ? { duration: 0 } : { duration: 0.2, ease: "easeOut" }}
            className="mt-2 block overflow-hidden rounded-md border border-terminal-accent/40 bg-terminal-bg p-2.5 text-left text-[0.7rem] leading-relaxed text-terminal-muted md:hidden"
          >
            <EmphasisedText text={item.detail} emphasis={item.emphasis} />
          </motion.span>
        ) : null}
      </AnimatePresence>
    </span>
  );
}

/**
 * A single phase card. Same desktop-tooltip / mobile-inline pattern as the
 * chips, but the visible body already shows the agents (light) and the runner
 * line (amber); the detail adds the narrative on demand.
 */
function PhaseCard({
  phase,
  index,
  inView,
  reduceMotion,
  isLast,
}: {
  phase: Phase;
  index: number;
  inView: boolean;
  reduceMotion: boolean;
  isLast: boolean;
}) {
  const [open, setOpen] = useState(false);
  const tipId = useId();

  return (
    <motion.li
      data-testid={`pipeline-phase-${phase.id}`}
      initial={reduceMotion ? false : { opacity: 0, y: 14 }}
      animate={
        reduceMotion ? { opacity: 1, y: 0 } : inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 14 }
      }
      transition={
        reduceMotion ? { duration: 0 } : { duration: 0.4, delay: index * 0.07, ease: "easeOut" }
      }
      className="group/phase relative flex w-[14rem] shrink-0 flex-col gap-2 rounded-lg border border-terminal-muted/40 bg-gradient-to-b from-terminal-surface to-terminal-surface/40 p-3 shadow-[0_10px_30px_-18px_rgba(44,230,193,0.5)] md:w-auto md:shrink"
    >
      <button
        type="button"
        aria-expanded={open}
        aria-controls={tipId}
        onClick={() => setOpen((value) => !value)}
        className="flex flex-col gap-2 text-left outline-none focus-visible:ring-1 focus-visible:ring-terminal-accent"
      >
        <span className="flex items-center justify-center gap-1.5 text-center text-sm font-bold tracking-tight text-terminal-accent">
          {phase.name}
          <span aria-hidden="true" className="text-[0.65rem] text-terminal-muted md:hidden">
            {open ? "▾" : "›"}
          </span>
        </span>

        <span className="flex flex-col gap-0.5 text-center text-[0.7rem] leading-snug text-terminal-muted">
          {phase.agents.map((agent) => (
            <span key={agent} className="text-terminal-fg/85">
              {agent}
            </span>
          ))}
        </span>

        <span className="mt-0.5 border-t border-dashed border-terminal-muted/40 pt-1.5 text-center text-[0.65rem] leading-snug text-amber-300/90">
          <span aria-hidden="true">⚙ </span>
          {phase.run}
        </span>
      </button>

      {/* Flow arrow between phases (desktop horizontal / mobile vertical). */}
      {!isLast ? (
        <>
          <span
            aria-hidden="true"
            className="absolute top-1/2 -right-[0.85rem] z-10 hidden -translate-y-1/2 text-base text-terminal-accent-alt drop-shadow-[0_0_8px_rgba(110,240,138,0.6)] md:inline"
          >
            →
          </span>
          <span
            aria-hidden="true"
            className="absolute -bottom-[1.05rem] left-1/2 z-10 -translate-x-1/2 text-base text-terminal-accent-alt md:hidden"
          >
            ↓
          </span>
        </>
      ) : null}

      {/* DESKTOP: floating tooltip. */}
      <span
        role="tooltip"
        id={`${tipId}-desktop`}
        className="pointer-events-none absolute bottom-[calc(100%+0.6rem)] left-1/2 z-30 hidden w-60 -translate-x-1/2 rounded-lg border border-terminal-accent/70 bg-terminal-bg p-3 text-left text-[0.7rem] leading-relaxed font-normal text-terminal-fg opacity-0 shadow-[0_14px_40px_rgba(0,0,0,0.7)] transition-opacity duration-150 group-hover/phase:opacity-100 group-focus-within/phase:opacity-100 md:block"
      >
        <EmphasisedText text={phase.detail} emphasis={phase.emphasis} />
        <span
          aria-hidden="true"
          className="absolute top-full left-1/2 -translate-x-1/2 border-[6px] border-transparent border-t-terminal-accent/70"
        />
      </span>

      {/* MOBILE: inline expandable detail. */}
      <AnimatePresence initial={false}>
        {open ? (
          <motion.span
            id={tipId}
            key="inline"
            initial={reduceMotion ? false : { opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={reduceMotion ? { opacity: 0 } : { opacity: 0, height: 0 }}
            transition={reduceMotion ? { duration: 0 } : { duration: 0.2, ease: "easeOut" }}
            className="block overflow-hidden rounded-md border border-terminal-accent/40 bg-terminal-bg p-2.5 text-left text-[0.7rem] leading-relaxed text-terminal-muted md:hidden"
          >
            <EmphasisedText text={phase.detail} emphasis={phase.emphasis} />
          </motion.span>
        ) : null}
      </AnimatePresence>
    </motion.li>
  );
}

export default function BajoElCapo() {
  const reduceMotion = useReducedMotion() ?? false;
  const flowRef = useRef<HTMLOListElement>(null);
  const inView = useInView(flowRef, { once: true, margin: "0px 0px -10% 0px" });

  return (
    <section
      data-testid="bajo-el-capo"
      aria-labelledby="bajo-el-capo-heading"
      className="w-full max-w-6xl border border-terminal-muted/40 bg-terminal-surface/40 px-6 py-10 text-left font-mono text-terminal-fg sm:px-8"
    >
      <h2
        id="bajo-el-capo-heading"
        className="text-2xl font-semibold tracking-tight text-terminal-fg"
      >
        <span aria-hidden="true" className="text-terminal-accent">
          {"# "}
        </span>
        {SECTION_NAME}
      </h2>

      <p className="mt-4 max-w-[64ch] text-balance text-sm leading-relaxed text-terminal-muted">
        <span aria-hidden="true" className="text-terminal-accent-alt">
          {"> "}
        </span>
        {INTRO}
      </p>

      <p className="mt-2 text-[0.7rem] tracking-wide text-terminal-muted/70">
        {LEGEND.split("ámbar").map((chunk, index, all) => (
          // biome-ignore lint/suspicious/noArrayIndexKey: fixed two-part split
          <span key={index}>
            {chunk}
            {index < all.length - 1 ? <span className="text-amber-300">ámbar</span> : null}
          </span>
        ))}
      </p>

      {/* Buenas prácticas */}
      <div className="mt-8">
        <h3 className="mb-3 flex items-center gap-2 text-xs tracking-[0.25em] text-terminal-accent uppercase">
          <span aria-hidden="true" className="text-terminal-accent-alt">
            #
          </span>
          Buenas prácticas
        </h3>
        <div className="flex flex-wrap gap-2">
          {GOOD_PRACTICES.map((item) => (
            <DetailChip key={item.id} item={item} reduceMotion={reduceMotion} />
          ))}
        </div>
      </div>

      {/* Orquestación */}
      <div className="mt-8">
        <h3 className="mb-3 flex items-center gap-2 text-xs tracking-[0.25em] text-terminal-accent uppercase">
          <span aria-hidden="true" className="text-terminal-accent-alt">
            #
          </span>
          Orquestación
        </h3>
        <div className="flex flex-wrap gap-2">
          {ORCHESTRATION.map((item) => (
            <DetailChip key={item.id} item={item} reduceMotion={reduceMotion} />
          ))}
        </div>
      </div>

      {/* El flujo · 9 fases */}
      <div className="mt-8">
        <h3 className="mb-3 flex items-center gap-2 text-xs tracking-[0.25em] text-terminal-accent uppercase">
          <span aria-hidden="true" className="text-terminal-accent-alt">
            #
          </span>
          El flujo · agentes + qué se lanza por fase
        </h3>

        {/*
         * Desktop: 9 phases in a row (auto-fit grid). Mobile: a horizontal
         * scroll strip so every phase stays readable without squashing.
         * Below sm it can also wrap-scroll; the snap + overflow keep it usable.
         */}
        <ol
          ref={flowRef}
          data-testid="pipeline-flow"
          className="flex snap-x snap-mandatory gap-4 overflow-x-auto pb-3 md:grid md:grid-cols-9 md:gap-3 md:overflow-visible md:pb-0 md:[scrollbar-width:none]"
        >
          {PHASES.map((phase, index) => (
            <div key={phase.id} className="snap-start md:contents">
              <PhaseCard
                phase={phase}
                index={index}
                inView={inView}
                reduceMotion={reduceMotion}
                isLast={index === PHASES.length - 1}
              />
            </div>
          ))}
        </ol>

        <p className="mt-2 text-[0.7rem] text-terminal-muted/60 md:hidden">
          ← desliza para ver las 9 fases →
        </p>
      </div>

      {/* Columnas: Skills / Plugins·MCP / Stack */}
      <div className="mt-8 grid grid-cols-1 gap-4 md:grid-cols-3">
        {COLUMNS.map((column) => (
          <div
            key={column.id}
            data-testid={`stack-column-${column.id}`}
            className="rounded-xl border border-terminal-muted/40 bg-gradient-to-b from-terminal-surface to-terminal-surface/40 p-4"
          >
            <h3 className="mb-3 flex items-center gap-2 text-xs tracking-[0.25em] text-terminal-accent uppercase">
              <span aria-hidden="true" className="text-terminal-accent-alt">
                #
              </span>
              {column.title}
            </h3>
            <div className="flex flex-wrap gap-2">
              {column.items.map((entry) => (
                <span
                  key={entry}
                  className="rounded-md border border-terminal-muted/40 bg-terminal-surface px-2.5 py-1.5 text-xs text-terminal-fg"
                >
                  {entry}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
