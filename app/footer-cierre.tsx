"use client";

import { motion, useReducedMotion } from "motion/react";

/**
 * Closing section + footer for the post-código landing.
 *
 * Visual language is cloned from the sibling sections (hero-title,
 * when-to-use-section): mono typeface, dark terminal surface, the
 * `$ / # / >` terminal motifs and the shared `fadeUp` reveal driven by
 * `motion` + `useReducedMotion`. All animation is gated behind the user's
 * reduced-motion preference.
 */

const CLOSING_LINE =
  "La era post-código ya empezó. ¿Vais a estar en ella, o vais a ver cómo pasa?";

const SECTION_HEADING = "Para el lunes";

type NextStep = {
  readonly index: string;
  readonly title: string;
  readonly detail: string;
};

const NEXT_STEPS: readonly NextStep[] = [
  {
    index: "01",
    title: "Adopta una metodología",
    detail: "OpenSpec, spec-kit… algo que convierta intención en spec antes que en código.",
  },
  {
    index: "02",
    title: "Genera arneses para tu código",
    detail: "Tests, contratos y verificación que dejen al agente iterar sin romper nada.",
  },
  {
    index: "03",
    title: "Piensa en context engineering",
    detail: "Lo que el modelo ve es lo que el modelo hace: diseña su contexto a propósito.",
  },
];

const PIPELINE_NOTE =
  "Esta web la construyó un pipeline de agentes — ni una línea la tecleó un humano. CommitConf 2026.";

const QR_URL = "https://commitconf.com/post-codigo";

const FOOTER_LINE = "commit · post-código · jorge martín";

export default function FooterCierre() {
  const reduceMotion = useReducedMotion();

  const fadeUp = (delay: number) => ({
    initial: { opacity: 0, y: 12 },
    animate: { opacity: 1, y: 0 },
    transition: reduceMotion
      ? { duration: 0 }
      : { duration: 0.5, delay, ease: "easeOut" as const },
  });

  return (
    <section
      data-testid="footer-cierre"
      aria-labelledby="footer-cierre-heading"
      className="flex w-full max-w-3xl flex-col items-center gap-12 border border-terminal-muted/40 bg-terminal-surface/40 px-6 py-14 text-center font-mono text-terminal-fg sm:px-8"
    >
      <motion.p
        {...fadeUp(0)}
        className="max-w-[28ch] text-balance text-2xl font-semibold leading-snug tracking-tight text-terminal-fg sm:text-3xl md:text-4xl"
      >
        <span aria-hidden="true" className="text-terminal-accent-alt">
          {"> "}
        </span>
        {CLOSING_LINE}
      </motion.p>

      <motion.div
        {...fadeUp(0.15)}
        className="w-full text-left"
        data-testid="footer-next-steps"
      >
        <h2
          id="footer-cierre-heading"
          className="mb-6 text-xl font-semibold tracking-tight text-terminal-fg sm:text-2xl"
        >
          <span aria-hidden="true" className="text-terminal-accent">
            {"# "}
          </span>
          {SECTION_HEADING}
        </h2>

        <ol className="flex flex-col gap-4 sm:gap-5">
          {NEXT_STEPS.map((step, i) => (
            <motion.li
              key={step.index}
              {...fadeUp(0.2 + i * 0.1)}
              data-testid="footer-next-step"
              className="flex items-start gap-4 border border-terminal-muted/20 bg-terminal-bg/40 px-4 py-3 transition-colors hover:bg-terminal-surface sm:px-5 sm:py-4"
            >
              <span
                aria-hidden="true"
                className="select-none text-base font-semibold text-terminal-accent sm:text-lg"
              >
                {step.index}
              </span>
              <span className="flex flex-col gap-1">
                <span className="text-sm font-semibold text-terminal-fg sm:text-base">
                  {step.title}
                </span>
                <span className="text-xs leading-relaxed text-terminal-muted sm:text-sm">
                  {step.detail}
                </span>
              </span>
            </motion.li>
          ))}
        </ol>
      </motion.div>

      <motion.p
        {...fadeUp(0.55)}
        data-testid="footer-pipeline-note"
        className="max-w-[52ch] text-balance border-l-2 border-terminal-accent bg-terminal-bg/40 px-5 py-4 text-left text-sm leading-relaxed text-terminal-accent-alt sm:text-base"
      >
        {PIPELINE_NOTE}
      </motion.p>

      <motion.div
        {...fadeUp(0.6)}
        data-testid="footer-linkedin"
        className="flex flex-col items-center gap-4"
      >
        <h2 className="text-sm tracking-[0.25em] text-terminal-muted uppercase">
          <span aria-hidden="true" className="text-terminal-accent">
            ${" "}
          </span>
          Conecta en LinkedIn
        </h2>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/jorge-linkedin.jpg"
          alt="Tarjeta de LinkedIn de Jorge Martín Lopes — Arquitecto de soluciones IA en Sopra Steria"
          width={1135}
          height={1320}
          className="h-auto w-60 rounded-xl border border-terminal-muted/40 shadow-lg sm:w-72"
        />
      </motion.div>

      <motion.div
        {...fadeUp(0.65)}
        data-testid="footer-qr"
        className="flex flex-col items-center gap-3"
      >
        <a
          href={QR_URL}
          target="_blank"
          rel="noreferrer"
          aria-label={`Código QR hacia ${QR_URL}`}
          className="group flex h-40 w-40 items-center justify-center border border-dashed border-terminal-muted/50 bg-terminal-bg/60 text-terminal-muted outline-none transition-colors hover:border-terminal-accent hover:text-terminal-accent focus-visible:border-terminal-accent focus-visible:text-terminal-accent sm:h-44 sm:w-44"
        >
          <span className="text-xs tracking-[0.3em] uppercase">QR</span>
        </a>
        <span className="text-xs tracking-wide text-terminal-muted/80">
          <span aria-hidden="true" className="text-terminal-accent">
            $
          </span>{" "}
          {QR_URL}
        </span>
      </motion.div>

      <motion.footer
        {...fadeUp(0.75)}
        data-testid="footer-final"
        className="mt-2 w-full border-t border-terminal-muted/30 pt-6 text-xs tracking-[0.25em] text-terminal-muted/80 uppercase"
      >
        {FOOTER_LINE}
      </motion.footer>
    </section>
  );
}
