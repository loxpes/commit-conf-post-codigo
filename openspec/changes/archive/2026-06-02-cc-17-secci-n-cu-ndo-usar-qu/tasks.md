## 1. Sección "¿Cuándo usar qué?" con tabla semántica debajo del hero (CA-1)

- [x] 1.1 RED: test que falla afirmando que existe una sección identificable (`data-testid`
  `when-to-use`) con un encabezado cuyo nombre accesible es "¿Cuándo usar qué?", renderizada por
  debajo del hero, que contiene una tabla con tres encabezados de columna exactos "Si necesitas…",
  "Característica" y "Artefacto" asociados a sus celdas (`<th scope="col">`)
- [x] 1.2 GREEN: crear el componente `app/_components/when-to-use-section.tsx` con la `<table>`
  semántica (`<thead>` con los 3 `<th scope="col">`) y componerlo en `app/page.tsx` debajo del hero
  hasta pasar el test
- [x] 1.3 REFACTOR: limpiar la estructura de la sección y exponer `data-testid` estables
  (`when-to-use`, `when-to-use-table`) dejando los tests en verde

## 2. Las 7 filas con su contenido literal (CA-2)

- [x] 2.1 RED: test que falla afirmando que la tabla muestra exactamente 7 filas y que el contenido
  literal de las tres columnas coincide, en orden, con las 7 filas especificadas (Instrucciones,
  Skill, Prompt directo, Subagente, Comando, Hook, MCP server)
- [x] 2.2 GREEN: renderizar las 7 filas a partir de una constante con el copy literal exacto
  (incluida la elipsis de "Si necesitas…") hasta pasar el test
- [x] 2.3 REFACTOR: extraer los datos de las filas a una estructura tipada con `data-testid`
  estables por fila, tests en verde

## 3. Resaltado por hover y por foco de teclado (CA-3)

- [x] 3.1 RED: test que falla afirmando que las filas son focusables por teclado (`tabindex=0`) y que
  el resaltado por foco es equivalente al de hover (mismo estilo aplicado por `:hover` y `:focus`/
  `:focus-within`)
- [x] 3.2 GREEN: hacer las filas focusables y aplicar el resaltado con `:hover` y `:focus`/
  `:focus-within` apuntando al mismo estilo hasta pasar el test
- [x] 3.3 REFACTOR: consolidar los estilos de resaltado (hover/foco) sin duplicación, tests en verde

## 4. Responsive y apilado accesible en móvil (CA-4)

- [x] 4.1 RED: test que falla afirmando que en viewport estrecho cada fila se presenta como un bloque
  apilado y que cada valor conserva la etiqueta de su columna (Si necesitas… / Característica /
  Artefacto)
- [x] 4.2 GREEN: aplicar el patrón de tabla responsive (vista tabular en ≥768; bloques apilados con
  `data-label`/`::before` que muestran la etiqueta de columna en 375) hasta pasar el test
- [x] 4.3 Verificar sin overflow horizontal en 375 / 768 / 1280 ampliando el e2e Playwright en
  `tests/e2e/` para la nueva sección

## 5. Estética terminal (CA-5)

- [x] 5.1 RED: test que falla afirmando que la sección usa tipografía monoespaciada (`font-mono`) y
  tokens de color `terminal-*`, coherente con el hero
- [x] 5.2 GREEN: aplicar `font-mono` y los tokens `terminal-*` existentes en la sección hasta pasar
  el test
- [x] 5.3 REFACTOR: unificar las clases de estética terminal sin tocar `app/globals.css`, tests en verde

## 6. Quality gate

- [x] 6.1 Ejecutar la batería completa en verde: `pnpm exec vitest run`,
  `pnpm exec biome check --write` (solo el diff), `pnpm exec tsc --noEmit`,
  `openspec validate "cc-17-secci-n-cu-ndo-usar-qu" --strict` y la suite Playwright
  (viewports 375 / 768 / 1280)
