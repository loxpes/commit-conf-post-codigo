"use client";

import { motion, useReducedMotion } from "motion/react";

const HEADING_ID = "harness-heading";

const INTRO =
  "El arnés de un agente son sus guías (lo condicionan antes de actuar) y sus sensores (lo verifican después): el carril por el que avanza y los checkpoints que comprueban que no se sale.";

const GUIDE_ITEMS = ["RULES.md", "AGENTS.md", ".editorconfig", "ESLint", "tipos en TypeScript"];
const SENSOR_ITEMS = ["tests", "type-checker", "linter", "security scan", "gates de CI"];

type BlockProps = {
  testId: string;
  title: string;
  items: readonly string[];
};

/**
 * A semantic block (heading + list) for either the guides or the sensors.
 * The literal item texts live in real list nodes — never inside an
 * `aria-hidden` subtree — so screen readers read them intact (CA-7).
 */
function HarnessBlock({ testId, title, items }: BlockProps) {
  return (
    <div
      data-testid={testId}
      className="flex-1 rounded-md border border-terminal-muted/20 bg-terminal-surface/60 p-5 text-left"
    >
      <h3 className="mb-3 text-sm font-semibold tracking-wide text-terminal-accent uppercase">
        {title}
      </h3>
      <ul className="flex flex-col gap-2">
        {items.map((item) => (
          <li key={item} className="flex items-center gap-2 text-sm text-terminal-fg">
            <span aria-hidden="true" className="text-terminal-accent-alt">
              {"> "}
            </span>
            <span className="font-mono">{item}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

export function HarnessSection() {
  const reduceMotion = useReducedMotion();

  // The agent travels along the rail from the guides/before zone toward the
  // sensors/after zone. With reduced motion it renders immediately at its
  // FINAL position with no animation (CA-6); otherwise it auto-plays the
  // traversal when the section scrolls into view (CA-4).
  const railTravel = {
    initial: reduceMotion ? false : ({ offsetDistance: "0%" } as const),
    whileInView: { offsetDistance: "100%" } as const,
    viewport: { once: true, amount: 0.4 } as const,
    transition: reduceMotion
      ? { duration: 0 }
      : ({ duration: 2.2, ease: "easeInOut" as const } as const),
  };

  return (
    <section
      data-testid="harness-section"
      aria-labelledby={HEADING_ID}
      className="relative flex w-full flex-col items-center gap-8 overflow-x-hidden bg-terminal-bg px-6 py-20 font-mono sm:px-8"
    >
      <h2
        id={HEADING_ID}
        className="text-2xl font-semibold tracking-tight text-terminal-fg sm:text-3xl"
      >
        El arnés
      </h2>

      <p
        data-testid="harness-intro"
        className="max-w-[60ch] text-balance text-center text-sm text-terminal-muted sm:text-base"
      >
        {INTRO}
      </p>

      <div className="relative w-full max-w-4xl">
        {/*
         * The rail is a purely decorative layer (aria-hidden). On desktop it
         * runs horizontally between the two blocks; on mobile it is vertical
         * (D2). The agent is a DOM descendant of the rail and travels along it.
         */}
        <div
          data-testid="harness-rail"
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 flex items-center justify-center"
        >
          <div
            className="relative h-full w-px bg-gradient-to-b from-terminal-accent/0 via-terminal-accent/40 to-terminal-accent-alt/0 sm:h-px sm:w-full sm:bg-gradient-to-r"
            style={{ offsetRotate: "0deg" }}
          >
            <motion.span
              data-testid="harness-agent"
              aria-hidden="true"
              className="absolute block h-3 w-3 -translate-x-1/2 -translate-y-1/2 rounded-full bg-terminal-accent shadow-[0_0_12px_2px_var(--color-terminal-accent)]"
              style={{ offsetPath: "border-box", top: 0, left: "50%" }}
              initial={railTravel.initial}
              whileInView={railTravel.whileInView}
              viewport={railTravel.viewport}
              transition={railTravel.transition}
            />
          </div>
        </div>

        <div
          data-testid="harness-blocks"
          className="relative flex flex-col items-stretch gap-6 sm:flex-row sm:items-center sm:gap-16"
        >
          <HarnessBlock
            testId="harness-guides"
            title="Guías · condicionan antes"
            items={GUIDE_ITEMS}
          />
          <HarnessBlock
            testId="harness-sensors"
            title="Sensores · verifican después"
            items={SENSOR_ITEMS}
          />
        </div>
      </div>
    </section>
  );
}
