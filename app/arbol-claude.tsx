"use client";

import { motion, useReducedMotion } from "motion/react";

const SECTION_NAME = "Organización del .claude";

const LEAD =
  "Un árbol con dos mitades: el motor (daemon + reglas) y el catálogo de agentes, comandos y skills.";

/**
 * Token classes used by the tree. The palette mirrors the brand tokens, with
 * one literal amber (the runners / engine pieces) since there is no amber brand
 * token; it matches the reference slide's `--amber: #fbbf24`.
 *
 * - glyph    : tree-drawing glyphs (├─ └─ │), dimmed structural lines.
 * - dir      : directories, in the brand accent.
 * - file     : files / agent names, near-foreground.
 * - hl       : highlighted leaves (commands, CI helpers), accent-alt green.
 * - runner   : runners / engine internals, amber.
 * - comment  : trailing `# …` annotations, muted.
 */
const C = {
  glyph: "text-terminal-muted/50",
  dir: "font-semibold text-terminal-accent",
  file: "text-terminal-fg/90",
  hl: "text-terminal-accent-alt",
  runner: "text-amber-400",
  comment: "text-terminal-muted",
} as const;

type Span = { readonly t: string; readonly c?: keyof typeof C };

/**
 * Each tree is a list of lines; each line is a list of styled spans. This keeps
 * the glyphs (├─ └─ │) and the _core / _project convention literal and exact,
 * matching the reference slide one-to-one — no invented paths.
 */
type Line = readonly Span[];

const ENGINE_TITLE = "El motor & las reglas";
const ENGINE_TREE: readonly Line[] = [
  [
    { t: "pipeline/", c: "dir" },
    { t: "              # el daemon y su lógica", c: "comment" },
  ],
  [
    { t: "├─ ", c: "glyph" },
    { t: "daemon.mjs", c: "file" },
    { t: "         vigila Trello · despacha fases", c: "comment" },
  ],
  [
    { t: "├─ ", c: "glyph" },
    { t: "graph.yaml", c: "file" },
    { t: "         DAG: columna → fase → agente", c: "comment" },
  ],
  [
    { t: "├─ ", c: "glyph" },
    { t: "config.json", c: "file" },
    { t: "        board · repo · scopes · modelo", c: "comment" },
  ],
  [
    { t: "├─ ", c: "glyph" },
    { t: "lib/", c: "dir" },
    { t: "               runners & núcleo", c: "comment" },
  ],
  [
    { t: "│  ├─ ", c: "glyph" },
    { t: "dispatch.mjs", c: "runner" },
    { t: " · ", c: "comment" },
    { t: "classifier.mjs", c: "runner" },
  ],
  [
    { t: "│  ├─ ", c: "glyph" },
    { t: "queue.mjs", c: "runner" },
    { t: " · ", c: "comment" },
    { t: "peek.mjs", c: "runner" },
    { t: " · ", c: "comment" },
    { t: "columns.mjs", c: "runner" },
  ],
  [
    { t: "│  ├─ ", c: "glyph" },
    { t: "ci-gate.mjs", c: "hl" },
    { t: "      gate de CI", c: "comment" },
  ],
  [
    { t: "│  ├─ ", c: "glyph" },
    { t: "auto-merge.mjs", c: "hl" },
    { t: " · ", c: "comment" },
    { t: "assign-review.mjs", c: "hl" },
  ],
  [
    { t: "│  ├─ ", c: "glyph" },
    { t: "archive-on-done.mjs", c: "hl" },
    { t: " cierre + merge", c: "comment" },
  ],
  [
    { t: "│  ├─ ", c: "glyph" },
    { t: "balancer.mjs", c: "runner" },
    { t: "     reparto de revisores", c: "comment" },
  ],
  [
    { t: "│  └─ ", c: "glyph" },
    { t: "failure-routing.mjs", c: "runner" },
    { t: " · ", c: "comment" },
    { t: "ci-bounce.mjs", c: "runner" },
  ],
  [
    { t: "└─ ", c: "glyph" },
    { t: "bin/", c: "dir" },
    { t: "  start · stop · status · watch · force-tick", c: "comment" },
  ],
  [{ t: "" }],
  [
    { t: "rules/", c: "dir" },
    { t: "                 # guías siempre activas", c: "comment" },
  ],
  [
    { t: "├─ ", c: "glyph" },
    { t: "generic.md", c: "file" },
    { t: "         par crítico · TDD · verificación", c: "comment" },
  ],
  [
    { t: "└─ ", c: "glyph" },
    { t: "nextjs-panel.md", c: "file" },
    { t: "    reglas por área", c: "comment" },
  ],
];

const AGENTS_TITLE = "Agentes · comandos · skills";
const AGENTS_TREE: readonly Line[] = [
  [
    { t: "agents/", c: "dir" },
    { t: "                # subagentes, por fase", c: "comment" },
  ],
  [
    { t: "├─ ", c: "glyph" },
    { t: "refine/_core/", c: "dir" },
    { t: "      openspec-scope-classifier", c: "file" },
  ],
  [
    { t: "├─ ", c: "glyph" },
    { t: "test_red/_core/", c: "dir" },
    { t: "    tdd-red", c: "file" },
  ],
  [
    { t: "├─ ", c: "glyph" },
    { t: "implement/_core/", c: "dir" },
    { t: "   tdd-refactor · refactoring-specialist", c: "file" },
  ],
  [
    { t: "├─ ", c: "glyph" },
    { t: "reviewer/_core/", c: "dir" },
    { t: "    pr-preflight · correctness · security", c: "file" },
  ],
  [
    { t: "│  └─ ", c: "glyph" },
    { t: "_project/", c: "dir" },
    { t: "       architecture-reviewer", c: "file" },
  ],
  [
    { t: "├─ ", c: "glyph" },
    { t: "tester/_core/", c: "dir" },
    { t: "      playwright-e2e · design-compliance", c: "file" },
  ],
  [
    { t: "│  ", c: "glyph" },
    { t: "                  visual-regression · accessibility", c: "file" },
  ],
  [
    { t: "│  ", c: "glyph" },
    { t: "                  scenario-extractor · debugger", c: "file" },
  ],
  [
    { t: "│  └─ ", c: "glyph" },
    { t: "_project/", c: "dir" },
    { t: "       backend-api-tester", c: "file" },
  ],
  [
    { t: "├─ ", c: "glyph" },
    { t: "docs/_core/", c: "dir" },
    { t: "        openspec-consistency-guardian", c: "file" },
  ],
  [
    { t: "│  └─ ", c: "glyph" },
    { t: "_project/", c: "dir" },
    { t: "       documentation-syncer", c: "file" },
  ],
  [
    { t: "└─ ", c: "glyph" },
    { t: "_meta/", c: "dir" },
    { t: "            orchestrator", c: "file" },
    { t: " (agente único de las fases)", c: "comment" },
  ],
  [{ t: "" }],
  [
    { t: "commands/pipeline/", c: "dir" },
    { t: "     # 1 slash-command por fase", c: "comment" },
  ],
  [
    { t: "└─ ", c: "glyph" },
    { t: "refine · scaffold · test_red · implement · reviewer", c: "hl" },
  ],
  [
    { t: "   ", c: "glyph" },
    { t: " tester · docs · deliver · watcher", c: "hl" },
  ],
  [{ t: "" }],
  [
    { t: "skills/", c: "dir" },
    { t: "                # capacidades reutilizables", c: "comment" },
  ],
  [
    { t: "└─ ", c: "glyph" },
    { t: "trello", c: "file" },
    { t: " · ", c: "comment" },
    { t: "opsx", c: "file" },
    { t: " (OpenSpec) · ", c: "comment" },
    { t: "design-review", c: "file" },
    { t: " · ", c: "comment" },
    { t: "self-improving-agent", c: "file" },
  ],
];

const LEGEND: readonly { readonly token: keyof typeof C; readonly label: string }[] = [
  { token: "dir", label: "_core = genéricos (commiteados)" },
  { token: "file", label: "_project = expertos de stack" },
  { token: "runner", label: "runners del motor" },
];

function TreeLine({ line }: { line: Line }) {
  if (line.length === 1 && line[0].t === "") {
    // Blank spacer line: render a non-collapsing break so the gap survives.
    return <span aria-hidden="true">{" "}</span>;
  }
  return (
    <span>
      {line.map((span, i) => (
        <span key={i} className={span.c ? C[span.c] : undefined}>
          {span.t}
        </span>
      ))}
    </span>
  );
}

function TreePanel({
  title,
  tree,
  reduceMotion,
  delay,
}: {
  title: string;
  tree: readonly Line[];
  reduceMotion: boolean;
  delay: number;
}) {
  return (
    <motion.article
      data-testid={`tree-panel-${title}`}
      className="flex min-w-0 flex-1 flex-col gap-3 border border-terminal-muted/40 bg-terminal-surface/40 p-4 sm:p-5"
      initial={reduceMotion ? false : { opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={reduceMotion ? { duration: 0 } : { duration: 0.5, delay, ease: "easeOut" }}
    >
      <h3 className="flex items-center gap-2 text-[0.7rem] font-semibold tracking-[0.2em] text-terminal-accent uppercase">
        <span aria-hidden="true" className="text-terminal-accent-alt">
          #
        </span>
        {title}
      </h3>

      <pre className="overflow-x-auto text-[0.72rem] leading-[1.6] sm:text-[0.8rem]">
        <code className="block whitespace-pre">
          {tree.map((line, i) => (
            <span key={i} className="block">
              <TreeLine line={line} />
            </span>
          ))}
        </code>
      </pre>
    </motion.article>
  );
}

export default function ArbolClaude() {
  const reduceMotion = useReducedMotion() ?? false;

  return (
    <section
      data-testid="arbol-claude-section"
      aria-labelledby="arbol-claude-heading"
      className="w-full max-w-5xl border border-terminal-muted/40 bg-terminal-surface/40 px-6 py-10 text-left font-mono text-terminal-fg sm:px-8"
    >
      <h2
        id="arbol-claude-heading"
        className="mb-3 text-2xl font-semibold tracking-tight text-terminal-fg"
      >
        <span aria-hidden="true" className="text-terminal-accent">
          {"$ "}
        </span>
        tree <span className="text-terminal-accent">.claude</span>
      </h2>

      <p className="mb-6 max-w-[60ch] text-sm leading-relaxed text-terminal-muted">
        <span aria-hidden="true" className="text-terminal-accent-alt">
          {"> "}
        </span>
        {LEAD}
      </p>

      <ul className="mb-8 flex flex-wrap gap-x-5 gap-y-2 text-[0.7rem] text-terminal-muted">
        {LEGEND.map((item) => (
          <li key={item.label} className="flex items-center gap-2">
            <span aria-hidden="true" className={`h-2 w-2 shrink-0 rounded-full ${C[item.token]} bg-current`} />
            {item.label}
          </li>
        ))}
      </ul>

      <div className="grid grid-cols-1 gap-5 lg:grid-cols-[1fr_1.15fr]">
        <TreePanel
          title={ENGINE_TITLE}
          tree={ENGINE_TREE}
          reduceMotion={reduceMotion}
          delay={0}
        />
        <TreePanel
          title={AGENTS_TITLE}
          tree={AGENTS_TREE}
          reduceMotion={reduceMotion}
          delay={0.12}
        />
      </div>
    </section>
  );
}
