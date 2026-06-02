## Context

`app/page.tsx` es hoy un placeholder del rail de diseño (copy "El landing real se construye
encima", footer provisional "commit · post-código · jorge martín"). Este cambio construye la
portada (hero) real de la landing de la charla "Bienvenidos a la era POST-CÓDIGO" (CommitConf 2026).

Restricciones del stack: Next.js 16 (App Router) + React 19, Tailwind v4 con tokens `terminal-*`
y `--font-mono` en `app/globals.css`, animaciones con `motion/react`, tests con Vitest + Testing
Library y Playwright (viewports 375 / 768 / 1280), lint/format con Biome. El documento `app/layout.tsx`
ya fija `<html lang="es">` y `font-mono` en el body.

El refinamiento define seis criterios de aceptación (CA-1..CA-6); este diseño fija las decisiones
técnicas necesarias para que las fases posteriores (test_red, implement) las puedan resolver sin
ambigüedad.

## Goals / Non-Goals

**Goals:**
- Portada a pantalla completa con estética terminal, sin overflow horizontal.
- Título h1 revelado token a token con cursor, manteniendo el nombre accesible íntegro.
- Subtítulo y pie de autor con el copy final exacto.
- Entrada animada al montar e indicador de scroll en la zona inferior.
- Responsive en 375 / 768 / 1280 y respeto a `prefers-reduced-motion: reduce`.

**Non-Goals:**
- Routing, backend/API, analítica, conmutación de i18n.
- Otras secciones de la landing distintas del hero.
- Detalles de implementación de tests (selectores concretos, timings) — corresponden a fases
  posteriores del pipeline.

## Decisions

### D1: Separar nombre accesible visible vs. casing visual del título (CA-2)

El título visual muestra "POST-CÓDIGO" en mayúsculas, pero el nombre accesible que expone
`getByRole('heading')` MUST ser siempre el texto completo "Bienvenidos a la era POST-CÓDIGO",
incluso mientras la animación token a token está en curso.

Decisión: el h1 lleva el texto completo accesible (vía `aria-label` o un nodo de texto íntegro
visualmente oculto pero presente en el árbol de accesibilidad), mientras la capa animada token a
token se marca `aria-hidden`. Así el lector de pantalla nunca lee un título a medias ni una versión
distinta del copy.

Matiz de casing (decisión explícita, NO resuelta a nivel de test aquí): el accessible name a usar es
"Bienvenidos a la era POST-CÓDIGO" con "POST-CÓDIGO" en mayúsculas, igual que el texto visual. El test
unit y el e2e existentes consultan hoy "Bienvenidos a la era post-código" (minúsculas); deberán
actualizarse al nuevo accessible name en la fase test_red. Queda como decisión de producto que el
accessible name iguala el casing visual ("POST-CÓDIGO"); si producto prefiriera otro casing accesible,
es el único punto a confirmar antes de implement.

Alternativas consideradas:
- Animar el propio texto del h1 (sin capa oculta) → rechazada: el accessible name reflejaría texto
  parcial durante la animación, incumpliendo CA-2.
- Dejar el accessible name en minúsculas como el placeholder actual → rechazada: el copy final usa
  "POST-CÓDIGO" en mayúsculas y conviene que lo visual y lo accesible coincidan.

### D2: Animaciones con motion/react y gating por prefers-reduced-motion (CA-2, CA-5, CA-6)

El revelado token a token, la entrada al montar y el indicador de scroll usan `motion/react`.
El respeto a `prefers-reduced-motion: reduce` se resuelve con el hook de reduced motion de
`motion/react` (o `matchMedia`), de modo que con la preferencia activa el contenido se renderiza
completo de inmediato y sin animaciones.

Alternativa considerada: animaciones puras en CSS. Rechazada porque el revelado token a token con
cursor y el control de estado de "completado" se expresan mejor en JS y `motion/react` ya es la
dependencia del proyecto.

### D3: Layout a alto de viewport sin overflow horizontal (CA-1, CA-6)

El hero se contiene a `min-h-dvh` con padding lateral y contenido centrado; se evita overflow
horizontal usando contenedores con anchos máximos y `overflow-x` controlado. Responsive verificado
en 375 / 768 / 1280 en la fase tester con Playwright.

### D4: Selectores de test estables

Los nodos que los tests consultarán (título, subtítulo, pie de autor, indicador de scroll) llevarán
`data-testid` estables para que las fases test_red/tester tengan anclas deterministas, sin acoplarse
al copy o al casing.

## Risks / Trade-offs

- [El revelado token a token puede dejar el accessible name parcial] → Mitigación: D1 separa la capa
  animada (`aria-hidden`) del texto accesible íntegro; la CA-2 lo cubre con un escenario explícito.
- [Animaciones ignoran prefers-reduced-motion] → Mitigación: D2 hace gating explícito; la CA-6 lo
  cubre con un escenario que exige contenido completo inmediato sin animaciones.
- [Overflow horizontal en 375 px por anchos fijos] → Mitigación: D3 usa anchos máximos y padding
  fluido; verificación visual en los tres viewports.
- [Mismatch de copy/casing entre tests actuales y copy final] → Mitigación: documentado en D1; los
  tests existentes se actualizan en test_red.

## Migration Plan

No aplica migración de datos ni de API. Es una reescritura de un componente de UI placeholder por su
versión final. Rollback trivial: revertir el cambio en `app/page.tsx` (y componentes nuevos asociados).

## Open Questions

- Confirmar (producto) que el accessible name del h1 usa el casing visual "POST-CÓDIGO" en mayúsculas
  (ver D1). Es el único punto a cerrar antes de la fase implement.
