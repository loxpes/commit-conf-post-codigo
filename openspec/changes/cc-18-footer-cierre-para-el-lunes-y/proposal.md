## Why

La landing de "Bienvenidos a la era POST-CÓDIGO" (CommitConf 2026) tiene hoy solo el hero (cc-14):
una portada a pantalla completa cuyo indicador de scroll no conduce a ningún contenido real. Falta el
cierre de la charla: la frase final, la llamada a la acción "Para el lunes", la nota de atribución, el
hueco para el QR y la línea de footer. Necesitamos una sección de cierre debajo del hero que reutilice
el lenguaje visual de terminal de la marca, para que la web tenga un final presentable y el indicador
de scroll del hero lleve a contenido real.

## What Changes

- Se añade una nueva sección de cierre (`<section>`) en `app/page.tsx`, DEBAJO del hero existente
  (cc-14), reutilizando el lenguaje visual de terminal (tokens `terminal-*`, `font-mono`,
  `motion/react`, `useReducedMotion`).
- La sección muestra la frase de cierre exacta "La era post-código ya empezó. ¿Vais a estar en ella,
  o vais a ver cómo pasa?".
- Se añade un bloque "Para el lunes" con exactamente 3 pasos, modelados como lista numerada (`<ol>`):
  1) "Adopta una metodología (OpenSpec, spec-kit…)", 2) "Genera arneses para tu código",
  3) "Piensa en context engineering".
- Se añade la nota de atribución exacta "Esta web la construyó un pipeline de agentes —
  CommitConf 2026.".
- Se reserva un hueco accesible (placeholder) para un QR a la URL del sitio, con `data-testid` y un
  nombre accesible que lo describa (p. ej. "Código QR a la web"). En este cambio NO se incluye el QR
  real (la URL final no se conoce y no hay librería de QR en el stack).
- La sección cierra con una línea de footer semántica (`<footer>`) con el copy exacto
  "commit · post-código · jorge martín".
- El indicador de scroll del hero pasa a conducir a esta nueva sección (contenido real).
- La sección aparece con una animación de entrada sutil al montar; se renderiza sin overflow
  horizontal en 375 / 768 / 1280, y con `prefers-reduced-motion: reduce` muestra todo el contenido de
  inmediato, sin animaciones.

## Capabilities

### New Capabilities
- `landing-closing`: sección de cierre de la landing (debajo del hero) con la frase de cierre, el
  bloque "Para el lunes" (lista numerada de 3 pasos), la nota de atribución, el hueco accesible del
  QR, la línea de footer semántica, animación de entrada al montar, responsive sin overflow y respeto
  a `prefers-reduced-motion`.

### Modified Capabilities
<!-- Ninguna: no existen specs previas para landing-closing en openspec/specs/. -->

## Impact

- Código afectado: `app/page.tsx` (se añade la sección de cierre debajo del hero; el indicador de
  scroll del hero pasa a apuntar a la nueva sección). Posibles componentes nuevos bajo `app/`.
- Tests afectados: `app/page.test.tsx` (unit/componente) y `tests/e2e/landing.spec.ts` (e2e/visual)
  se ampliarán en fases posteriores del pipeline para el copy y comportamiento nuevos.
- Tokens de diseño `terminal-*` y `--font-mono` ya existentes en `app/globals.css`; no se modifican.
- Dependencias: `motion/react` (ya presente) para las animaciones; no se añade librería de QR.

## Non-goals

- El QR real (asset o generador): en este cambio solo se reserva el hueco accesible (placeholder).
  El QR real queda fuera de alcance hasta que exista la URL final del sitio.
- Routing, backend/API, analítica e i18n.
- Cualquier modificación del hero (cc-14) más allá de que su indicador de scroll conduzca a la nueva
  sección de cierre.
