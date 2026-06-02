"use client";

import { motion, useReducedMotion } from "motion/react";
import { HeroTitle } from "./_components/hero-title";
import { SilentChangesSection } from "./_components/silent-changes-section";

const SUBTITLE = "Cómo la IA está reescribiendo nuestro oficio mientras lo vivimos.";
const AUTHOR =
  "Jorge Martín Lopes · AI Software Architect · Sopra Steria · @loxpes · #CommitConf2026";

export default function HomePage() {
  const reduceMotion = useReducedMotion();

  const fadeUp = (delay: number) => ({
    initial: { opacity: 0, y: 12 },
    animate: { opacity: 1, y: 0 },
    transition: reduceMotion ? { duration: 0 } : { duration: 0.5, delay, ease: "easeOut" as const },
  });

  return (
    <>
      <main className="relative flex min-h-dvh flex-col items-center justify-center gap-8 overflow-x-hidden bg-terminal-bg px-6 py-20 text-center font-mono sm:px-8">
        <motion.p
          {...fadeUp(0)}
          className="text-xs tracking-[0.35em] text-terminal-muted uppercase sm:text-sm"
        >
          <span className="text-terminal-accent">$</span> commit --conf 2026
        </motion.p>

        <HeroTitle />

        <motion.p
          {...fadeUp(0.7)}
          className="max-w-[42ch] text-balance text-base text-terminal-muted sm:text-lg"
        >
          <span className="text-terminal-accent-alt">{"> "}</span>
          {SUBTITLE}
        </motion.p>

        <motion.p
          {...fadeUp(0.9)}
          className="max-w-[52ch] text-balance text-xs tracking-wide text-terminal-muted/80 sm:text-sm"
        >
          {AUTHOR}
        </motion.p>

        <motion.div
          data-testid="hero-scroll-indicator"
          aria-hidden="true"
          className="absolute bottom-8 left-1/2 flex -translate-x-1/2 flex-col items-center gap-2 text-terminal-muted"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={reduceMotion ? { duration: 0 } : { duration: 0.5, delay: 1.2 }}
        >
          <span className="text-[0.65rem] tracking-[0.3em] uppercase">scroll</span>
          <motion.span
            className="block h-6 w-px bg-terminal-accent"
            animate={reduceMotion ? { opacity: 1 } : { y: [0, 8, 0], opacity: [0.3, 1, 0.3] }}
            transition={
              reduceMotion
                ? { duration: 0 }
                : {
                    duration: 1.6,
                    repeat: Number.POSITIVE_INFINITY,
                    ease: "easeInOut" as const,
                  }
            }
          />
        </motion.div>
      </main>

      <SilentChangesSection />
    </>
  );
}
