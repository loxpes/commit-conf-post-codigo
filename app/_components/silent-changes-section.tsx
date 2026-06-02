"use client";

import { motion, useReducedMotion } from "motion/react";

const INTRO = "Cinco cambios silenciosos. Ya están aquí, aunque nadie los esté nombrando todavía.";

/**
 * The five "silent changes" pillars. Single source of truth for the cards:
 * the literal business copy lives here once and drives the rendered list.
 */
const PILLARS = [
  { number: "01", pillar: "LENGUAJES", phrase: "El lenguaje ya no es una barrera." },
  { number: "02", pillar: "FRAMEWORKS", phrase: "Los frameworks propietarios encorsetan." },
  { number: "03", pillar: "ESCALA", phrase: "Equipos de 10 compiten con multinacionales." },
  { number: "04", pillar: "PRODUCTO", phrase: "Desarrollamos producto. No código." },
  { number: "05", pillar: "OFICIO", phrase: "Pensamos en harness. No en patrones." },
] as const;

const VISIBLE = { opacity: 1, y: 0 } as const;
const HIDDEN = { opacity: 0, y: 16 } as const;
const VIEWPORT = { once: true, amount: 0.2, margin: "0px 0px -10% 0px" } as const;

/**
 * «Los 5 cambios silenciosos» home section.
 *
 * The intro and every card's text live directly inside the `motion` nodes, so
 * the full content is always in the DOM and exposed to assistive tech whatever
 * the animation state (CA-5) — the animated layer is never `aria-hidden`. Cards
 * reveal once, staggered, the first time the section scrolls into view via
 * `whileInView` + `viewport: { once: true }` (CA-2); with reduced motion they
 * render complete and instant instead (CA-3).
 */
export function SilentChangesSection() {
  const reduceMotion = useReducedMotion();

  // `initial` is read once at mount and kept identical (HIDDEN) for SSR and
  // client, so a reduced-motion client (which the server can't detect) does not
  // trigger a hydration mismatch. Reduced motion then reveals instantly via
  // `animate`; otherwise the cards reveal on scroll.
  const entrance = (delay: number) =>
    reduceMotion
      ? { initial: HIDDEN, animate: VISIBLE, transition: { duration: 0 } }
      : {
          initial: HIDDEN,
          whileInView: VISIBLE,
          viewport: VIEWPORT,
          transition: { duration: 0.4, delay, ease: "easeOut" as const },
        };

  return (
    <section
      data-testid="silent-changes-section"
      className="flex w-full flex-col items-center gap-12 overflow-x-hidden bg-terminal-bg px-6 py-24 font-mono sm:px-8"
    >
      <motion.p
        {...entrance(0)}
        className="max-w-[52ch] text-balance text-center text-base text-terminal-muted sm:text-lg"
      >
        <span aria-hidden="true" className="text-terminal-accent-alt">
          {"> "}
        </span>
        <span>{INTRO}</span>
      </motion.p>

      <ul className="grid w-full max-w-5xl grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-5">
        {PILLARS.map(({ number, pillar, phrase }, index) => (
          <motion.li
            key={number}
            data-testid={`silent-change-card-${index + 1}`}
            {...entrance(index * 0.12)}
            className="flex flex-col gap-4 rounded-md border border-terminal-muted/20 bg-terminal-surface p-6 text-left"
          >
            <span className="text-3xl font-semibold tracking-tight text-terminal-accent">
              {number}
            </span>
            <span className="text-xs tracking-[0.3em] text-terminal-muted uppercase">{pillar}</span>
            <p className="text-balance text-base text-terminal-fg">{phrase}</p>
          </motion.li>
        ))}
      </ul>
    </section>
  );
}
