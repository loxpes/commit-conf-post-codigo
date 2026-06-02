"use client";

import { motion } from "motion/react";
import { useEffect, useState } from "react";

const TITLE = "Bienvenidos a la era post-código";
const SUBTITLE = "Cómo la IA está reescribiendo nuestro oficio mientras lo vivimos.";
const TYPE_INTERVAL_MS = 55;

export default function HomePage() {
  // Default (SSR + non-reduced) state: animate the typewriter and show the caret.
  // A useEffect downgrades to the final static state when the user prefers
  // reduced motion. matchMedia may be undefined under jsdom, so we guard it.
  const [reducedMotion, setReducedMotion] = useState(false);
  const [typed, setTyped] = useState("");

  useEffect(() => {
    const prefersReduced =
      window.matchMedia?.("(prefers-reduced-motion: reduce)")?.matches ?? false;
    if (prefersReduced) {
      setReducedMotion(true);
    }
  }, []);

  useEffect(() => {
    if (reducedMotion) return;

    let index = 0;
    const id = setInterval(() => {
      index += 1;
      setTyped(TITLE.slice(0, index));
      if (index >= TITLE.length) {
        clearInterval(id);
      }
    }, TYPE_INTERVAL_MS);

    return () => clearInterval(id);
  }, [reducedMotion]);

  return (
    <main className="flex min-h-dvh w-full flex-col items-center bg-terminal-bg font-mono text-terminal-fg">
      <section
        data-testid="hero"
        className="relative flex min-h-dvh w-full flex-col items-center justify-center gap-6 overflow-x-hidden px-6 py-20 text-center"
      >
        <p className="text-xs tracking-[0.4em] text-terminal-accent uppercase sm:text-sm">
          $ commit --conf
        </p>

        <h1
          aria-label={TITLE}
          className="max-w-4xl text-balance break-words text-4xl font-semibold leading-tight text-terminal-fg sm:text-5xl md:text-6xl"
        >
          {reducedMotion ? (
            <span aria-hidden="true">{TITLE}</span>
          ) : (
            <span aria-hidden="true">
              {typed}
              <span
                data-testid="hero-caret"
                className="ml-0.5 inline-block w-[0.55ch] animate-pulse text-terminal-accent"
              >
                █
              </span>
            </span>
          )}
        </h1>

        {reducedMotion ? (
          <p className="max-w-2xl text-balance break-words text-base text-terminal-muted sm:text-lg">
            {SUBTITLE}
          </p>
        ) : (
          <motion.p
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="max-w-2xl text-balance break-words text-base text-terminal-muted sm:text-lg"
          >
            {SUBTITLE}
          </motion.p>
        )}

        <span
          role="img"
          aria-label="Hay más contenido debajo, desplázate"
          className="absolute bottom-8 left-1/2 flex -translate-x-1/2 flex-col items-center gap-1 text-terminal-accent-alt"
        >
          <span aria-hidden="true" className="text-xs tracking-widest text-terminal-muted">
            scroll
          </span>
          <span aria-hidden="true" className={reducedMotion ? "text-lg" : "animate-bounce text-lg"}>
            ↓
          </span>
        </span>
      </section>

      <footer className="pb-10 text-xs tracking-wide text-terminal-muted">
        commit · post-código · jorge martín
      </footer>
    </main>
  );
}
