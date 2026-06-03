## 1. Estructura y estética de portada (CA-1)

- [x] 1.1 RED: test que falla afirmando que el hero ocupa el alto del viewport con estética
  terminal (fondo `terminal-bg`, monoespaciada) y sin overflow horizontal
- [x] 1.2 GREEN: reescribir `app/page.tsx` con el contenedor del hero a `min-h-dvh`, fondo
  `terminal-bg`, tipografía `--font-mono` y `overflow-x` controlado hasta pasar el test
- [x] 1.3 REFACTOR: limpiar el layout con los tests en verde

## 2. Título token a token con nombre accesible íntegro (CA-2)

- [x] 2.1 RED: test que falla afirmando que `getByRole('heading', { level: 1 })` expone el nombre
  accesible completo "Bienvenidos a la era POST-CÓDIGO" aunque la animación esté en curso
- [x] 2.2 GREEN: implementar el h1 con texto accesible íntegro (`aria-label`/nodo oculto presente)
  y la capa animada token a token con cursor marcada `aria-hidden`
- [x] 2.3 REFACTOR: extraer el componente de título animado y dejar selectores `data-testid`
  estables con los tests en verde

## 3. Subtítulo y pie de autor (CA-3, CA-4)

- [x] 3.1 RED: test que falla afirmando el subtítulo exacto
  "Cómo la IA está reescribiendo nuestro oficio mientras lo vivimos."
- [x] 3.2 GREEN: renderizar el subtítulo con el copy exacto hasta pasar el test
- [x] 3.3 RED: test que falla afirmando el pie de autor exacto
  "Jorge Martín Lopes · AI Software Architect · Sopra Steria · @loxpes · #CommitConf2026"
- [x] 3.4 GREEN: renderizar el pie de autor con el copy exacto (reemplazando el footer provisional)

## 4. Entrada animada e indicador de scroll (CA-5)

- [x] 4.1 RED: test que falla afirmando que existe una entrada animada al montar y un indicador de
  scroll animado visible en la zona inferior
- [x] 4.2 GREEN: implementar con `motion/react` la animación de entrada al montar y el indicador de
  scroll inferior hasta pasar el test
- [x] 4.3 REFACTOR: consolidar las animaciones con los tests en verde

## 5. Responsive y prefers-reduced-motion (CA-6)

- [x] 5.1 RED: test que falla afirmando que con `prefers-reduced-motion: reduce` se muestra el
  título completo y el resto del contenido de inmediato, sin animaciones
- [x] 5.2 GREEN: hacer gating de todas las animaciones por reduced motion hasta pasar el test
- [x] 5.3 Verificar responsive sin overflow horizontal en 375 / 768 / 1280 (ajustar Playwright e2e
  `tests/e2e/landing.spec.ts` al copy/selectores nuevos)

## 6. Quality gate

- [x] 6.1 Ejecutar la batería completa en verde: `pnpm exec vitest run`,
  `pnpm exec biome check --write` (solo el diff), `pnpm exec tsc --noEmit`,
  `openspec validate "cc-20-hero-bienvenidos-a-la-era-post" --strict` y la suite Playwright
  (viewports 375 / 768 / 1280)
