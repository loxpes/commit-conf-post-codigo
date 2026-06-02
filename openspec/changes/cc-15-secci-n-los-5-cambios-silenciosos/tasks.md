## 1. Tests en rojo (RED)

- [ ] 1.1 Test de componente (Vitest + Testing Library) para CA-1: la sección
  `silent-changes-section` monta la intro literal y las 5 tarjetas
  `silent-change-card-1`…`silent-change-card-5` con número, pilar y frase exactos.
- [ ] 1.2 Test de componente para CA-3: con `prefers-reduced-motion: reduce`
  (mock de `useReducedMotion()`), intro y tarjetas se muestran completas e
  instantáneas, sin animación de entrada ni bucles.
- [ ] 1.3 Test de componente para CA-5: el texto íntegro de intro y tarjetas está
  presente en el DOM y accesible (consultable por rol/texto) con animación en curso.
- [ ] 1.4 Test e2e (Playwright) para CA-2: tras desplazar hasta la sección, las 5
  tarjetas quedan visibles; la animación de entrada no se repite al re-entrar.
- [ ] 1.5 Test e2e/responsive (Playwright) para CA-4: en 375 / 768 / 1280 px la
  sección no produce scroll horizontal (1 columna en móvil, varias en grande).

## 2. Implementación (GREEN)

- [ ] 2.1 Crear `app/_components/silent-changes-section.tsx` con la intro literal y
  el `data-testid="silent-changes-section"`, siguiendo la convención de `hero-title.tsx`.
- [ ] 2.2 Crear el sub-componente de tarjeta con número (01–05), pilar y frase, con
  `data-testid="silent-change-card-N"`; alimentarlo desde una lista de 5 pilares con copy literal.
- [ ] 2.3 Montar la sección en `app/page.tsx`.
- [ ] 2.4 Implementar el stagger con `motion/react` (`whileInView`, `viewport: { once: true }`) (CA-2).
- [ ] 2.5 Implementar el respeto a `prefers-reduced-motion` con `useReducedMotion()` (CA-3) y
  garantizar que el texto íntegro permanece siempre en el DOM (CA-5).
- [ ] 2.6 Maquetar el layout responsive con tokens `terminal-*` y `font-mono`: 1 columna en
  móvil, varias columnas en pantallas grandes, sin desbordamiento (CA-4).

## 3. Refactor y verificación

- [ ] 3.1 REFACTOR: limpiar el componente con los tests en verde (extraer datos de los
  pilares, nombres, sin duplicación).
- [ ] 3.2 Typecheck del diff (`pnpm exec tsc --noEmit`) y lint/format del diff
  (`pnpm exec biome check --write` solo sobre los ficheros tocados) en verde.
- [ ] 3.3 Suite de tests (componente + e2e) en verde.
- [ ] 3.4 Auditoría de diseño / visual sobre la home en los 3 viewports (fase funcional).
