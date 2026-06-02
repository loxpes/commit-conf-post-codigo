## 1. Sección de cierre y frase de cierre (CA-1)

- [ ] 1.1 RED: test que falla afirmando que, debajo del hero, existe una `<section>` de cierre con el
  texto exacto "La era post-código ya empezó. ¿Vais a estar en ella, o vais a ver cómo pasa?"
- [ ] 1.2 GREEN: añadir en `app/page.tsx` la `<section>` de cierre debajo del hero, con estética
  terminal (tokens `terminal-*`, `font-mono`) y la frase de cierre exacta, hasta pasar el test
- [ ] 1.3 REFACTOR: limpiar el layout de la sección con los tests en verde

## 2. Bloque "Para el lunes" como lista numerada (CA-2)

- [ ] 2.1 RED: test que falla afirmando que existe un encabezado "Para el lunes" y un `<ol>` con
  exactamente 3 ítems con el copy exacto en orden: "Adopta una metodología (OpenSpec, spec-kit…)",
  "Genera arneses para tu código", "Piensa en context engineering"
- [ ] 2.2 GREEN: renderizar el encabezado "Para el lunes" y la lista numerada `<ol>` con los 3 pasos
  exactos hasta pasar el test
- [ ] 2.3 REFACTOR: extraer el bloque "Para el lunes" si procede, con los tests en verde

## 3. Nota de atribución (CA-3)

- [ ] 3.1 RED: test que falla afirmando el texto exacto de la nota
  "Esta web la construyó un pipeline de agentes — CommitConf 2026."
- [ ] 3.2 GREEN: renderizar la nota de atribución con el copy exacto hasta pasar el test

## 4. Hueco accesible del QR (CA-4)

- [ ] 4.1 RED: test que falla afirmando que existe un hueco para el QR con un `data-testid` estable y
  un nombre accesible que lo describe (p. ej. "Código QR a la web"), sin contener el QR real
- [ ] 4.2 GREEN: añadir el hueco accesible (placeholder) con su `data-testid` y nombre accesible hasta
  pasar el test

## 5. Línea de footer semántica (CA-5)

- [ ] 5.1 RED: test que falla afirmando que existe un `<footer>` semántico con el texto exacto
  "commit · post-código · jorge martín"
- [ ] 5.2 GREEN: renderizar el `<footer>` semántico con el copy exacto hasta pasar el test

## 6. Animación de entrada, indicador de scroll del hero y prefers-reduced-motion (CA-6)

- [ ] 6.1 RED: test que falla afirmando que la sección de cierre aparece con una animación de entrada
  al montar y que con `prefers-reduced-motion: reduce` muestra todo el contenido de inmediato, sin
  animaciones
- [ ] 6.2 GREEN: implementar la animación de entrada con `motion/react`, hacer gating con
  `useReducedMotion`, y reconectar el indicador de scroll del hero a la nueva sección, hasta pasar el
  test
- [ ] 6.3 REFACTOR: consolidar animaciones y selectores `data-testid` estables con los tests en verde
- [ ] 6.4 Verificar responsive sin overflow horizontal en 375 / 768 / 1280 (ampliar Playwright e2e
  `tests/e2e/landing.spec.ts` al copy/selectores nuevos)

## 7. Quality gate

- [ ] 7.1 Ejecutar la batería completa en verde: `pnpm exec vitest run`,
  `pnpm exec biome check --write` (solo el diff), `pnpm exec tsc --noEmit`,
  `openspec validate "cc-18-footer-cierre-para-el-lunes-y" --strict` y la suite Playwright
  (viewports 375 / 768 / 1280)
