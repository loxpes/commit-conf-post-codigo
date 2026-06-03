## Why

La página de inicio (`app/page.tsx`) es hoy un placeholder del rail de diseño: muestra un copy
provisional ("El landing real se construye encima") y no representa la portada real de la charla.
Necesitamos construir la sección hero definitiva de la landing de "Bienvenidos a la era POST-CÓDIGO"
(CommitConf 2026) para que la web tenga una portada presentable, con la estética de terminal de la
marca y el copy final de la ponencia.

## What Changes

- Se sustituye el hero placeholder de `app/page.tsx` por la portada real a pantalla completa
  con estética terminal (fondo `terminal-bg`, tipografía monoespaciada, alto de viewport, sin
  overflow horizontal).
- El título h1 "Bienvenidos a la era POST-CÓDIGO" se revela token a token con un cursor animado,
  manteniendo el nombre accesible (lo que expone `getByRole('heading')`) siempre como el texto
  completo aunque la animación esté en curso.
- Se añade el subtítulo final: "Cómo la IA está reescribiendo nuestro oficio mientras lo vivimos."
- Se añade el pie de autor final: "Jorge Martín Lopes · AI Software Architect · Sopra Steria ·
  @loxpes · #CommitConf2026" (reemplaza el footer provisional "commit · post-código · jorge martín").
- Se añade una entrada animada al montar y un indicador de scroll animado visible en la zona inferior.
- Se garantiza responsive en 375 / 768 / 1280 sin overflow horizontal y el respeto a
  `prefers-reduced-motion: reduce` (texto completo inmediato, sin animaciones).

## Capabilities

### New Capabilities
- `landing-hero`: portada (hero) a pantalla completa de la landing con estética terminal, título
  revelado token a token con nombre accesible íntegro, subtítulo y pie de autor finales, entrada
  animada, indicador de scroll, comportamiento responsive y respeto a `prefers-reduced-motion`.

### Modified Capabilities
<!-- Ninguna: no existen specs previas en openspec/specs/. -->

## Impact

- Código afectado: `app/page.tsx` (reescritura del hero); posibles componentes nuevos bajo `app/`.
- Tests afectados: `app/page.test.tsx` (unit/componente) y `tests/e2e/landing.spec.ts` (e2e/visual)
  se actualizarán en fases posteriores del pipeline para el copy y comportamiento nuevos.
- Tokens de diseño y `--font-mono` ya existentes en `app/globals.css`; no se modifican.
- Dependencias: `motion/react` (ya presente) para las animaciones.
- Fuera de alcance (Non-goals): routing, backend/API, analítica, conmutación de i18n y cualquier
  otra sección de la landing distinta del hero. Es un cambio de UI exclusivamente.
