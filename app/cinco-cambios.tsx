"use client";

import { motion, useInView, useReducedMotion } from "motion/react";
import { useRef } from "react";

const SECTION_NAME = "Los 5 cambios silenciosos";

const INTRO =
  "Cinco cambios silenciosos. Ya están aquí, aunque nadie los esté nombrando todavía.";

type Change = {
  readonly index: string;
  readonly pillar: string;
  readonly statement: string;
};

/**
 * The five quiet shifts. Literal and order-stable: the `index`/`pillar` pair is
 * the card's terminal-style header and `statement` is the headline claim. The
 * list order also drives the stagger sequence below.
 */
const CHANGES: readonly Change[] = [
  {
    index: "01",
    pillar: "LENGUAJES",
    statement: "El lenguaje ya no es una barrera.",
  },
  {
    index: "02",
    pillar: "FRAMEWORKS",
    statement: "Los frameworks propietarios encorsetan.",
  },
  {
    index: "03",
    pillar: "ESCALA",
    statement: "Equipos de 10 compiten con multinacionales.",
  },
  {
    index: "04",
    pillar: "PRODUCTO",
    statement: "Desarrollamos producto. No código.",
  },
  {
    index: "05",
    pillar: "OFICIO",
    statement: "Pensamos en harness. No en patrones.",
  },
];

export default function CincoCambios() {
  const reduceMotion = useReducedMotion();
  const containerRef = useRef<HTMLDivElement>(null);
  // Trigger once when the grid enters the viewport; `margin` brings the reveal
  // forward slightly so it fires while the section is still rising into view.
  const inView = useInView(containerRef, {
    once: true,
    margin: "0px 0px -15% 0px",
  });

  return (
    <section
      data-testid="cinco-cambios"
      aria-labelledby="cinco-cambios-heading"
      className="w-full max-w-5xl px-6 py-10 text-left font-mono text-terminal-fg sm:px-8"
    >
      <h2
        id="cinco-cambios-heading"
        className="text-2xl font-semibold tracking-tight text-terminal-fg"
      >
        <span aria-hidden="true" className="text-terminal-accent">
          {"# "}
        </span>
        {SECTION_NAME}
      </h2>

      <p className="mt-4 max-w-[60ch] text-balance text-sm text-terminal-muted sm:text-base">
        <span aria-hidden="true" className="text-terminal-accent-alt">
          {"> "}
        </span>
        {INTRO}
      </p>

      <div
        ref={containerRef}
        data-testid="cinco-cambios-grid"
        className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3"
      >
        {CHANGES.map((change, position) => (
          <motion.article
            key={change.index}
            data-testid="cinco-cambios-card"
            initial={reduceMotion ? false : { opacity: 0, y: 16 }}
            animate={
              reduceMotion
                ? { opacity: 1, y: 0 }
                : inView
                  ? { opacity: 1, y: 0 }
                  : { opacity: 0, y: 16 }
            }
            transition={
              reduceMotion
                ? { duration: 0 }
                : {
                    duration: 0.45,
                    delay: position * 0.12,
                    ease: "easeOut" as const,
                  }
            }
            className="group flex h-full flex-col gap-3 border border-terminal-muted/40 bg-terminal-surface/40 px-5 py-6 transition-colors hover:border-terminal-accent/60 hover:bg-terminal-surface"
          >
            <header className="flex items-baseline gap-2 text-xs uppercase tracking-[0.2em]">
              <span className="text-terminal-accent">{change.index}</span>
              <span aria-hidden="true" className="text-terminal-muted/60">
                ·
              </span>
              <span className="text-terminal-accent-alt">{change.pillar}</span>
            </header>

            <p className="text-balance text-lg font-semibold leading-snug tracking-tight text-terminal-fg sm:text-xl">
              {change.statement}
            </p>
          </motion.article>
        ))}
      </div>
    </section>
  );
}
