"use client";

import { motion, useReducedMotion } from "motion/react";

const INTRO_TEXT =
  "Cinco cambios silenciosos. Ya están aquí, aunque nadie los esté nombrando todavía.";

const CARDS = [
  { number: "01", pillar: "LENGUAJES", phrase: "El lenguaje ya no es una barrera." },
  { number: "02", pillar: "FRAMEWORKS", phrase: "Los frameworks propietarios encorsetan." },
  { number: "03", pillar: "ESCALA", phrase: "Equipos de 10 compiten con multinacionales." },
  { number: "04", pillar: "PRODUCTO", phrase: "Desarrollamos producto. No código." },
  { number: "05", pillar: "OFICIO", phrase: "Pensamos en harness. No en patrones." },
] as const;

type Card = (typeof CARDS)[number];

const CARD_VARIANTS = {
  hidden: { opacity: 0, y: 16 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease: "easeOut" as const } },
};

const CONTAINER_VARIANTS = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
};

const CARD_CLASS = "border border-terminal-muted/40 bg-terminal-surface/40 px-5 py-6 font-mono";

function CardInner({ card }: { card: Card }) {
  return (
    <>
      <span className="block text-xs tracking-[0.3em] text-terminal-accent uppercase">
        {card.number}
      </span>
      <h3 className="mt-2 text-sm font-semibold tracking-wide text-terminal-fg uppercase">
        {card.pillar}
      </h3>
      <p className="mt-3 text-sm text-terminal-muted">{card.phrase}</p>
    </>
  );
}

function SilentChangeCard({
  card,
  index,
  animated,
}: {
  card: Card;
  index: number;
  animated: boolean;
}) {
  if (!animated) {
    return (
      <article data-testid={`silent-change-card-${index + 1}`} className={CARD_CLASS}>
        <CardInner card={card} />
      </article>
    );
  }

  return (
    <motion.article
      data-testid={`silent-change-card-${index + 1}`}
      variants={CARD_VARIANTS}
      className={CARD_CLASS}
    >
      <CardInner card={card} />
    </motion.article>
  );
}

export function SilentChangesSection() {
  const reduceMotion = useReducedMotion();

  const sectionClass = "w-full max-w-4xl py-10 text-left font-mono";
  const introClass = "mb-8 max-w-[55ch] text-balance text-sm text-terminal-muted sm:text-base";
  const gridClass = "grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3";

  if (reduceMotion) {
    return (
      <section
        data-testid="silent-changes-section"
        aria-labelledby="silent-changes-heading"
        className={sectionClass}
      >
        <p id="silent-changes-heading" className={introClass}>
          {INTRO_TEXT}
        </p>
        <div className={gridClass}>
          {CARDS.map((card, index) => (
            <SilentChangeCard key={card.number} card={card} index={index} animated={false} />
          ))}
        </div>
      </section>
    );
  }

  return (
    <section
      data-testid="silent-changes-section"
      aria-labelledby="silent-changes-heading"
      className={sectionClass}
    >
      <motion.p
        id="silent-changes-heading"
        className={introClass}
        initial={{ opacity: 0, y: 8 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.4, ease: "easeOut" }}
      >
        {INTRO_TEXT}
      </motion.p>
      <motion.div
        className={gridClass}
        variants={CONTAINER_VARIANTS}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
      >
        {CARDS.map((card, index) => (
          <SilentChangeCard key={card.number} card={card} index={index} animated={true} />
        ))}
      </motion.div>
    </section>
  );
}
