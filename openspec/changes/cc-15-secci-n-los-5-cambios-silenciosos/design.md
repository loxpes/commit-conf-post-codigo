## Context

La landing (Next.js 16 App Router, React 19, Tailwind v4 con tokens `terminal-*`,
animaciones con `motion/react`) ya tiene un hero animado (`hero-title.tsx`) montado
en `app/page.tsx`. Esta sección «Los 5 cambios silenciosos» se suma a la home con
el mismo lenguaje visual y los mismos requisitos transversales de la landing:
respeto a `prefers-reduced-motion` y accesibilidad del texto íntegro. El copy
(intro y las cinco frases-pilar) está fijado por negocio y es literal.

## Goals / Non-Goals

**Goals:**
- Sección con intro + 5 tarjetas-pilar de copy literal, identificables por `data-testid`.
- Aparición escalonada (stagger) al hacer scroll, una sola vez.
- Coherencia con el resto de la landing en movimiento reducido y accesibilidad.
- Responsive sin desbordamiento en 375 / 768 / 1280 px.

**Non-Goals:**
- No se introduce contenido dinámico ni fuentes de datos (sitio estático).
- No se rediseña el hero ni otras secciones existentes.
- No se añaden nuevas dependencias.

## Decisions

- **Ubicación del componente.** Nuevo componente de sección en `app/_components/`
  (p. ej. `silent-changes-section.tsx`) más un sub-componente de tarjeta, montado en
  `app/page.tsx`, siguiendo la convención de `hero-title.tsx`.
  *Alternativa descartada:* inline dentro de `page.tsx` — peor testabilidad y
  reutilización; el patrón del repo es un componente por sección.
- **Animación de entrada.** `motion/react` con `whileInView` y
  `viewport: { once: true }` para el stagger de las tarjetas, una sola vez.
  *Alternativa descartada:* `IntersectionObserver` manual — `motion/react` ya está
  en el harness y cubre el caso con menos código.
- **Movimiento reducido.** `useReducedMotion()` para servir el contenido completo e
  instantáneo cuando `prefers-reduced-motion: reduce`, igual que el hero.
- **Accesibilidad.** El texto íntegro (intro + tarjetas) se renderiza siempre en el
  DOM; la capa animada solo afecta a la presentación (opacidad/desplazamiento), nunca
  oculta el contenido a la tecnología de asistencia.
- **Layout responsive (default, ajustable en diseño).** 1 columna en móvil, grid en
  ≥768 px (2–3 columnas) y las 5 tarjetas visibles en ≥1280 px, con tokens
  `terminal-*` y `font-mono`; el auditor de diseño valida el resultado final.

## Risks / Trade-offs

- **[Sin mockup específico de la sección]** → Si existe uno en `doc/design/mockups`, la
  implementación debe ceñirse a él; si no, se siguen el sistema de tokens `terminal-*`
  y los patrones de las secciones existentes. La fase de pruebas funcionales /
  auditoría de diseño valida el resultado.
- **[`whileInView` con `once: true` y carga diferida]** → En viewports altos la sección
  podría entrar parcialmente; se ajusta el `amount`/margin del viewport para disparar el
  stagger de forma fiable y verificarlo end-to-end.

## Open Questions

- ¿Existe un mockup de referencia para esta sección en `doc/design/mockups`? Si aparece,
  prevalece sobre el layout por defecto descrito arriba.
