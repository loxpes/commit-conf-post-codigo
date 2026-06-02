## Why

La landing de la charla carece de la sección que presenta los cinco pilares del "post-código". Sin ella, el visitante no entiende el mensaje central de la charla antes de ver el resto del contenido.

## What Changes

- Se añade la sección `SilentChangesSection` a `app/page.tsx`, después del hero.
- Nuevo componente `app/_components/silent-changes-section.tsx` con intro literal y cinco tarjetas (`SilentChangeCard`).
- Las tarjetas aparecen con animación stagger (`motion/react`, `whileInView`) al entrar en el viewport; la animación se deshabilita con `prefers-reduced-motion`.
- Layout responsive: 1 columna en móvil, grid 2-3 columnas en ≥768 px, 5 tarjetas visibles en ≥1280 px.
- Texto íntegro siempre presente en el DOM para accesibilidad.

## Capabilities

### New Capabilities

- `silent-changes-section`: Sección «Los 5 cambios silenciosos» con intro, cinco tarjetas-pilar numeradas (01-05), animación stagger al hacer scroll, accesibilidad y responsive.

### Modified Capabilities

<!-- ninguna: esta sección es nueva -->

## Impact

- `app/page.tsx`: montaje del nuevo componente.
- `app/_components/silent-changes-section.tsx` (nuevo).
- Dependencia `motion/react` ya presente (`package.json`).
- Tests: nuevas suites Vitest (unit) y Playwright (e2e).
- No hay cambios de API, base de datos ni infraestructura.

## Non-goals

- No se modifica el hero ni otras secciones existentes.
- No se añaden mockups en `doc/design/mockups/`; el diseño sigue los tokens `terminal-*` y el patrón de `when-to-use-section.tsx`.
- No se implementa internacionalización.

## Trello

CC-15 · https://trello.com/c/CRuA9CJs
