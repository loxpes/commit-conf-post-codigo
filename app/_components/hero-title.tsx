"use client";

import { motion, useReducedMotion } from "motion/react";

const FULL_TITLE = "Bienvenidos a la era POST-CÓDIGO";

/**
 * Tokens revealed one-by-one. The accessible name is supplied by an
 * `aria-label` on the <h1> so screen readers always read the full title,
 * even while the visual reveal is mid-flight. The animated layer is
 * `aria-hidden` to avoid double-announcing the partially-revealed text.
 */
const TOKENS = FULL_TITLE.split(" ");

export function HeroTitle() {
  const reduceMotion = useReducedMotion();

  return (
    <h1
      aria-label={FULL_TITLE}
      data-testid="hero-title"
      className="max-w-[20ch] text-balance text-4xl font-semibold tracking-tight text-terminal-fg sm:text-5xl md:text-6xl"
    >
      <span aria-hidden="true" className="inline">
        {TOKENS.map((token, index) => (
          <motion.span
            // biome-ignore lint/suspicious/noArrayIndexKey: tokens are a fixed, order-stable list
            key={index}
            initial={reduceMotion ? false : { opacity: 0, y: "0.25em" }}
            animate={{ opacity: 1, y: 0 }}
            transition={
              reduceMotion
                ? { duration: 0 }
                : {
                    duration: 0.35,
                    delay: 0.15 + index * 0.18,
                    ease: "easeOut" as const,
                  }
            }
            className="inline-block whitespace-pre"
          >
            {token}
            {index < TOKENS.length - 1 ? " " : ""}
          </motion.span>
        ))}
        <motion.span
          data-testid="hero-title-cursor"
          aria-hidden="true"
          className="ml-1 inline-block h-[0.9em] w-[0.55ch] translate-y-[0.08em] bg-terminal-accent align-middle"
          animate={reduceMotion ? { opacity: 1 } : { opacity: [1, 1, 0, 0] }}
          transition={
            reduceMotion
              ? { duration: 0 }
              : { duration: 1.1, repeat: Number.POSITIVE_INFINITY, ease: "linear" }
          }
        />
      </span>
    </h1>
  );
}
