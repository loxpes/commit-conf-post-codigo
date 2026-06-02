## Context

`app/page.tsx` contiene hoy el hero real de la landing (cc-14): una portada a pantalla completa con
estética de terminal cuyo indicador de scroll no conduce a contenido real. Este cambio añade la
sección de cierre de la charla "Bienvenidos a la era POST-CÓDIGO" (CommitConf 2026) debajo del hero.

Restricciones del stack: Next.js 16 (App Router) + React 19, Tailwind v4 con tokens `terminal-*` y
`--font-mono` en `app/globals.css`, animaciones con `motion/react`, tests con Vitest + Testing Library
y Playwright (viewports 375 / 768 / 1280), lint/format con Biome. `app/layout.tsx` ya fija
`<html lang="es">` y `font-mono` en el body.

El refinamiento define seis criterios de aceptación (CA-1..CA-6); este diseño fija las decisiones
técnicas necesarias para que las fases posteriores (test_red, implement) las puedan resolver sin
ambigüedad.

## Goals / Non-Goals

**Goals:**
- Nueva sección de cierre debajo del hero con la frase de cierre exacta (CA-1).
- Bloque "Para el lunes" con 3 pasos exactos modelados como `<ol>` (CA-2).
- Nota de atribución con copy exacto (CA-3).
- Hueco accesible (placeholder) para el QR con `data-testid` y nombre accesible (CA-4).
- Línea de footer semántica `<footer>` con copy exacto (CA-5).
- Animación de entrada al montar, responsive sin overflow y respeto a `prefers-reduced-motion` (CA-6).
- El indicador de scroll del hero pasa a conducir a la nueva sección (contenido real).

**Non-Goals:**
- El QR real (asset o generador): solo el hueco accesible en este cambio.
- Routing, backend/API, analítica e i18n.
- Cualquier modificación del hero más allá de que su indicador de scroll apunte a la nueva sección.
- Detalles de implementación de tests (selectores concretos, timings) — corresponden a fases
  posteriores del pipeline.

## Decisions

### D1: Landmarks semánticos — `<section>` de cierre + `<footer>` (CA-1, CA-5)

El bloque de cierre se modela como un `<section>` debajo del hero, y la última línea
("commit · post-código · jorge martín") como un `<footer>` semántico al final de la página. Es la
recomendación del refino sobre landmarks: la línea de footer es el cierre de la página, no del bloque
de contenido, y conviene exponerla como `contentinfo` para lectores de pantalla.

Alternativa considerada: un único `<div>` para todo el cierre. Rechazada: pierde semántica de
landmarks y dificulta la navegación accesible.

### D2: Lista numerada "Para el lunes" como `<ol>` (CA-2)

Los 3 pasos se modelan como `<ol>` (lista numerada) con un `<li>` por paso, en el orden definido. La
numeración es semántica (la da el `<ol>`), no texto hardcodeado, para que el orden y la cuenta sean
verificables y accesibles.

Alternativa considerada: `<ul>` o párrafos numerados a mano. Rechazada: el refino exige lista numerada
y la semántica de orden importa.

### D3: Hueco accesible del QR como placeholder (CA-4)

DECISIÓN YA TOMADA en refino: en este cambio se reserva un HUECO ACCESIBLE (placeholder), NO el QR
real. Motivo: la URL final del sitio no se conoce y no hay librería de QR en el stack. El hueco
expone un `data-testid` estable y un nombre accesible que lo describe (p. ej. "Código QR a la web"),
de modo que los tests puedan afirmar su existencia y accesibilidad sin depender del QR real. El QR
real queda fuera de alcance.

Alternativa considerada: añadir ya una librería de QR y generar el código. Rechazada: introduce una
dependencia y requiere una URL que aún no existe; sería trabajo a tirar.

### D4: Reutilización del lenguaje visual terminal y gating de animaciones (CA-6)

La sección de cierre reutiliza los tokens `terminal-*`, `font-mono` y `motion/react` del hero. La
animación de entrada al montar y cualquier otra animación se controlan (gating) con
`useReducedMotion` de `motion/react`, de modo que con `prefers-reduced-motion: reduce` el contenido se
renderiza completo de inmediato y sin animaciones.

Alternativa considerada: animaciones puras en CSS. Rechazada: `motion/react` ya es la dependencia del
proyecto y el gating por reduced motion se expresa de forma uniforme con el hero.

### D5: Layout sin overflow horizontal en 375 / 768 / 1280 (CA-6)

La sección usa contenedores con anchos máximos, padding fluido y `overflow-x` controlado para evitar
scroll horizontal. Verificación visual en los tres viewports en la fase tester con Playwright.

### D6: Selectores de test estables (CA-1..CA-6)

Los nodos que los tests consultarán (frase de cierre, encabezado y lista "Para el lunes", nota de
atribución, hueco del QR, footer, contenedor de la sección) llevarán `data-testid` estables —
incluido el `data-testid` del hueco del QR — para que las fases test_red/tester tengan anclas
deterministas sin acoplarse al copy.

## Risks / Trade-offs

- [El hueco del QR podría confundirse con un QR real] → Mitigación: D3 lo deja explícito como
  placeholder accesible; la CA-4 lo cubre con un escenario que afirma que no contiene el QR real.
- [Animaciones ignoran prefers-reduced-motion] → Mitigación: D4 hace gating explícito con
  `useReducedMotion`; la CA-6 lo cubre con un escenario de contenido completo inmediato.
- [Overflow horizontal en 375 px] → Mitigación: D5 usa anchos máximos y padding fluido; verificación
  en los tres viewports.
- [El indicador de scroll del hero queda apuntando a la nada] → Mitigación: este cambio lo reconecta
  a la nueva sección de cierre (contenido real).

## Migration Plan

No aplica migración de datos ni de API. Es una adición de UI: se añade una sección debajo del hero
existente. Rollback trivial: revertir la adición en `app/page.tsx` (y componentes nuevos asociados) y
dejar el indicador de scroll del hero como estaba.

## Open Questions

- (Residual, no bloqueante) El QR real se generará cuando exista la URL final del sitio; en ese
  momento se sustituirá el hueco accesible por el QR real en un cambio posterior.
