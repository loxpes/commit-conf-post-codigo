## Why

La landing de la charla "Bienvenidos a la era POST-CÓDIGO" tiene hoy solo el hero (cc-14) y no
explica todavía el concepto central de la ponencia: el "arnés" de un agente de IA. El arnés son las
**guías** que condicionan al agente ANTES de actuar y los **sensores** que lo verifican DESPUÉS;
juntos forman el **carril** por el que el agente avanza y los **checkpoints** que comprueban que no
se sale. Necesitamos una sección que materialice esta idea de forma visual y animada, justo debajo
del hero, para que quien visita la web entienda el mensaje sin leer texto denso.

## What Changes

- Se añade una nueva sección **"El arnés"** en la landing, colocada **debajo del hero** (el hero
  permanece intacto), con un encabezado de sección cuyo nombre accesible es "El arnés".
- La sección incluye una breve intro (1-2 frases) que enmarca el concepto de arnés = guías + sensores.
- Se presenta el bloque de **GUÍAS — condicionan ANTES** con exactamente 5 elementos literales:
  `RULES.md`, `AGENTS.md`, `.editorconfig`, `ESLint`, `tipos en TypeScript`.
- Se presenta el bloque de **SENSORES — verifican DESPUÉS** con exactamente 5 elementos literales:
  `tests`, `type-checker`, `linter`, `security scan`, `gates de CI`.
- Se materializa la **metáfora del carril**: un elemento de carril (rail) y un elemento "agente"
  posicionado a lo largo de él. Con animaciones habilitadas, el agente recorre el carril desde la
  zona guías/antes hacia la zona sensores/después; las capas decorativas (carril, agente, efectos)
  son `aria-hidden` y no duplican el texto de guías y sensores.
- La sección es responsive (375 / 768 / 1280) sin overflow horizontal; en viewport estrecho los
  bloques de guías y sensores se **apilan** en lugar de quedar lado a lado.
- Se respeta `prefers-reduced-motion: reduce`: el contenido completo (guías, sensores y el agente en
  su posición final) se muestra de inmediato, sin animaciones.
- Se reutiliza la estética terminal del hero: tokens `terminal-*`, `--font-mono`, animaciones con
  `motion/react`, `useReducedMotion()` y selectores `data-testid` estables.

## Capabilities

### New Capabilities
- `landing-harness`: sección "El arnés" de la landing, debajo del hero, que explica de forma visual y
  animada el concepto de arnés del agente (guías que condicionan ANTES + sensores que verifican
  DESPUÉS), con la metáfora del carril y un agente que lo recorre, comportamiento responsive,
  accesibilidad y respeto a `prefers-reduced-motion`.

### Modified Capabilities
<!-- Ninguna: el hero (landing-hero, cc-14) no cambia; "El arnés" se añade como capacidad nueva. -->

## Impact

- Código afectado: nuevo componente bajo `app/_components/` (p. ej. `harness-section.tsx`) compuesto
  dentro de `app/page.tsx` debajo del hero. El hero (`HeroTitle`, `app/page.tsx`) no se modifica en su
  comportamiento actual.
- Tests afectados: nuevos tests unit/componente (`*.test.tsx`) y ampliación del e2e/visual
  (`tests/e2e/`) en fases posteriores del pipeline para cubrir la nueva sección en 375 / 768 / 1280.
- Tokens de diseño (`terminal-*`) y `--font-mono` ya existentes en `app/globals.css`; no se modifican.
- Dependencias: `motion/react` (ya presente) para las animaciones del carril y el agente.

## Non-goals (fuera de alcance)

- No sustituye ni reordena otras secciones: el hero permanece y "El arnés" se añade debajo.
- No define el "look" visual final ni la librería de iconos definitiva; el detalle visual de la
  animación queda abierto y se valida en la fase tester con auditores visuales.
- No toca infraestructura de workspace ni backend; es exclusivamente una sección de producto en
  `commit-conf-post-codigo`.
