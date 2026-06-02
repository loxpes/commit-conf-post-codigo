"use client";

import {
  AnimatePresence,
  motion,
  type Transition,
  useReducedMotion,
} from "motion/react";
import { useEffect, useState } from "react";

const SECTION_NAME = "El arnés: guías y sensores";

const HARNESS_PHRASE =
  "Juntos forman el carril por el que se mueve el agente y los checkpoints que comprueban que sigue dentro.";

type Side = {
  readonly id: "guia" | "sensor";
  readonly prefix: string;
  readonly title: string;
  readonly when: string;
  readonly definition: string;
  readonly examples: readonly string[];
};

/**
 * The two halves of the harness. Order-stable and literal: the same data drives
 * the explanatory cards and is conceptually mirrored by the animated rail below
 * (guides condition the lane up-front, sensors are the checkpoints along it).
 */
const SIDES: readonly Side[] = [
  {
    id: "guia",
    prefix: "guide",
    title: "Guía",
    when: "ANTES de que el agente actúe",
    definition: "Le dice a la IA por dónde puede moverse. Condiciona el camino antes de que escriba una sola línea.",
    examples: ["RULES.md", "AGENTS.md", ".editorconfig", "ESLint", "tipos en TypeScript"],
  },
  {
    id: "sensor",
    prefix: "sensor",
    title: "Sensor",
    when: "DESPUÉS de que el agente actúe",
    definition: "Detecta cuando se sale del camino. Verifica lo que ya hizo y avisa si se desvió.",
    examples: ["tests", "type-checker", "linter", "security scan", "gates de CI"],
  },
];

/**
 * Checkpoints laid along the rail, expressed as a progress threshold in [0, 1].
 * A checkpoint is considered "passed" (lit green) once the agent's progress
 * reaches its `at` value, so the lighting follows the dot as it travels.
 */
type Checkpoint = {
  readonly id: string;
  readonly label: string;
  readonly at: number;
};

const CHECKPOINTS: readonly Checkpoint[] = [
  { id: "lint", label: "lint", at: 0.18 },
  { id: "types", label: "types", at: 0.42 },
  { id: "tests", label: "tests", at: 0.66 },
  { id: "ci", label: "ci", at: 0.9 },
];

const RAIL_DURATION = 4.2;

/**
 * Drives the agent's progress along the rail on a loop (0 → 1) so the
 * checkpoints can light up as it passes. Honors reduced-motion by parking the
 * agent at the end with every checkpoint already lit (no animation).
 */
function useRailProgress(reduceMotion: boolean): number {
  const [progress, setProgress] = useState(reduceMotion ? 1 : 0);

  useEffect(() => {
    if (reduceMotion) {
      setProgress(1);
      return;
    }

    let frame = 0;
    let start: number | null = null;

    const tick = (now: number) => {
      if (start === null) {
        start = now;
      }
      const elapsed = (now - start) / 1000;
      // Travel for RAIL_DURATION, hold briefly at the end, then restart.
      const cycle = RAIL_DURATION + 1;
      const t = (elapsed % cycle) / RAIL_DURATION;
      setProgress(Math.min(1, t));
      frame = requestAnimationFrame(tick);
    };

    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [reduceMotion]);

  return progress;
}

function SideCard({ side }: { side: Side }) {
  const isGuide = side.id === "guia";
  const accent = isGuide ? "text-terminal-accent" : "text-terminal-accent-alt";
  const dot = isGuide ? "bg-terminal-accent" : "bg-terminal-accent-alt";

  return (
    <article
      data-testid={`harness-side-${side.id}`}
      className="flex flex-1 flex-col gap-3 border border-terminal-muted/40 bg-terminal-surface/40 p-5 text-left"
    >
      <header className="flex items-center gap-3">
        <span aria-hidden="true" className={`h-2.5 w-2.5 shrink-0 rounded-full ${dot}`} />
        <h3 className="text-lg font-semibold tracking-tight text-terminal-fg">
          <span aria-hidden="true" className={accent}>
            {`${side.prefix} :: `}
          </span>
          {side.title}
        </h3>
      </header>

      <p className={`text-xs font-semibold tracking-[0.2em] uppercase ${accent}`}>{side.when}</p>

      <p className="text-sm leading-relaxed text-terminal-muted">{side.definition}</p>

      <ul className="mt-1 flex flex-wrap gap-2">
        {side.examples.map((example) => (
          <li
            key={example}
            className="border border-terminal-muted/30 bg-terminal-bg/60 px-2 py-1 text-xs text-terminal-fg"
          >
            {example}
          </li>
        ))}
      </ul>
    </article>
  );
}

function CheckpointMarker({
  checkpoint,
  passed,
  reduceMotion,
}: {
  checkpoint: Checkpoint;
  passed: boolean;
  reduceMotion: boolean;
}) {
  const pulse: Transition = reduceMotion
    ? { duration: 0 }
    : { type: "spring", stiffness: 380, damping: 16 };

  return (
    <div
      data-testid={`harness-checkpoint-${checkpoint.id}`}
      data-passed={passed}
      className="flex flex-col items-center gap-2 sm:flex-row sm:gap-3"
    >
      <motion.span
        aria-hidden="true"
        className={`relative flex h-4 w-4 items-center justify-center rounded-full border ${
          passed
            ? "border-terminal-accent-alt bg-terminal-accent-alt"
            : "border-terminal-muted/50 bg-terminal-surface"
        }`}
        animate={passed ? { scale: [1, 1.5, 1] } : { scale: 1 }}
        transition={pulse}
      >
        <AnimatePresence>
          {passed ? (
            <motion.span
              key="glow"
              className="absolute inset-0 rounded-full bg-terminal-accent-alt"
              initial={{ opacity: 0.6, scale: 1 }}
              animate={reduceMotion ? { opacity: 0 } : { opacity: 0, scale: 2.4 }}
              exit={{ opacity: 0 }}
              transition={reduceMotion ? { duration: 0 } : { duration: 0.7, ease: "easeOut" }}
            />
          ) : null}
        </AnimatePresence>
      </motion.span>
      <span
        className={`text-xs tracking-wide transition-colors ${
          passed ? "text-terminal-accent-alt" : "text-terminal-muted"
        }`}
      >
        {checkpoint.label}
      </span>
    </div>
  );
}

/**
 * The animated harness rail. On desktop it is a horizontal lane with the agent
 * (a glowing dot) travelling left-to-right; on mobile the lane rotates to
 * vertical. Either way, each checkpoint lights green as the agent reaches it.
 */
function HarnessRail({ reduceMotion }: { reduceMotion: boolean }) {
  const progress = useRailProgress(reduceMotion);
  const percent = `${progress * 100}%`;

  const agentTransition: Transition = reduceMotion
    ? { duration: 0 }
    : { type: "spring", stiffness: 120, damping: 24 };

  return (
    <div
      data-testid="harness-rail"
      aria-hidden="true"
      className="relative w-full border border-terminal-muted/40 bg-terminal-surface/30 p-6 sm:px-10 sm:py-12"
    >
      {/* MOBILE: vertical rail */}
      <div className="relative flex flex-col gap-8 sm:hidden">
        <div className="absolute top-0 bottom-0 left-[7px] w-px bg-terminal-muted/30" />
        <motion.div
          className="absolute left-[7px] w-px bg-gradient-to-b from-terminal-accent to-terminal-accent-alt"
          style={{ top: 0 }}
          animate={{ height: percent }}
          transition={agentTransition}
        />
        {CHECKPOINTS.map((checkpoint) => (
          <CheckpointMarker
            key={checkpoint.id}
            checkpoint={checkpoint}
            passed={progress >= checkpoint.at}
            reduceMotion={reduceMotion}
          />
        ))}
        <motion.span
          className="absolute left-[1px] h-[14px] w-[14px] rounded-full bg-terminal-accent shadow-[0_0_14px_2px_rgba(44,230,193,0.8)]"
          animate={{ top: percent }}
          transition={agentTransition}
        />
      </div>

      {/* DESKTOP: horizontal rail */}
      <div className="relative hidden h-24 sm:block">
        <div className="absolute top-3 right-0 left-0 h-px bg-terminal-muted/30" />
        <motion.div
          className="absolute top-3 left-0 h-px bg-gradient-to-r from-terminal-accent to-terminal-accent-alt"
          animate={{ width: percent }}
          transition={agentTransition}
        />
        <div className="absolute top-0 right-0 left-0 flex justify-between">
          {CHECKPOINTS.map((checkpoint) => (
            <CheckpointMarker
              key={checkpoint.id}
              checkpoint={checkpoint}
              passed={progress >= checkpoint.at}
              reduceMotion={reduceMotion}
            />
          ))}
        </div>
        <motion.span
          className="absolute top-[5px] h-[14px] w-[14px] -translate-x-1/2 rounded-full bg-terminal-accent shadow-[0_0_14px_2px_rgba(44,230,193,0.8)]"
          animate={{ left: percent }}
          transition={agentTransition}
        />
      </div>

      <p className="mt-6 text-center text-xs tracking-[0.25em] text-terminal-muted/70 uppercase sm:mt-8">
        <span className="text-terminal-accent">agent</span>
        {" → "}
        <span className="text-terminal-accent-alt">checkpoints</span>
      </p>
    </div>
  );
}

export default function Arnes() {
  const reduceMotion = useReducedMotion() ?? false;

  return (
    <section
      data-testid="harness-section"
      aria-labelledby="harness-heading"
      className="w-full max-w-3xl border border-terminal-muted/40 bg-terminal-surface/40 px-6 py-10 text-left font-mono text-terminal-fg sm:px-8"
    >
      <h2
        id="harness-heading"
        className="mb-3 text-2xl font-semibold tracking-tight text-terminal-fg"
      >
        <span aria-hidden="true" className="text-terminal-accent">
          {"# "}
        </span>
        {SECTION_NAME}
      </h2>

      <p className="mb-8 max-w-[60ch] text-sm leading-relaxed text-terminal-muted">
        <span aria-hidden="true" className="text-terminal-accent-alt">
          {"> "}
        </span>
        El arnés es lo que mantiene al agente dentro del carril: dos piezas que
        trabajan en momentos distintos.
      </p>

      <div className="mb-8 flex flex-col gap-4 md:flex-row">
        {SIDES.map((side) => (
          <SideCard key={side.id} side={side} />
        ))}
      </div>

      <HarnessRail reduceMotion={reduceMotion} />

      <p
        data-testid="harness-phrase"
        className="mt-8 max-w-[60ch] text-balance text-sm leading-relaxed text-terminal-fg"
      >
        <span aria-hidden="true" className="text-terminal-accent">
          {"// "}
        </span>
        {HARNESS_PHRASE}
      </p>
    </section>
  );
}
