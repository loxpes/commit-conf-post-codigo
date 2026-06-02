## Context

La landing de "Bienvenidos a la era POST-CÓDIGO" (CommitConf 2026) tiene hoy únicamente el hero
(capacidad `landing-hero`, cc-14). Este cambio añade la sección **"El arnés"** justo debajo del hero
para explicar de forma visual y animada el concepto central de la charla: el arnés de un agente de IA
= **guías** (lo condicionan ANTES de actuar) + **sensores** (lo verifican DESPUÉS). Juntos forman el
**carril** por el que el agente avanza y los **checkpoints** que comprueban que no se sale.

Restricciones del stack: Next.js 16 (App Router) + React 19, Tailwind v4 con tokens `terminal-*` y
`--font-mono` en `app/globals.css`, animaciones con `motion/react` y `useReducedMotion()`, tests con
Vitest + Testing Library y Playwright (viewports 375 / 768 / 1280), lint/format con Biome. El hero
existente (`app/page.tsx`, `app/_components/hero-title.tsx`) ya fija el patrón: capa animada
`aria-hidden` separada del texto accesible íntegro, gating de animaciones por reduced motion y
selectores `data-testid` estables. Este diseño reutiliza esas convenciones.

El refinamiento define siete criterios de aceptación (CA-1..CA-7); este diseño fija las decisiones
técnicas para que las fases posteriores (test_red, implement) las resuelvan sin ambigüedad, y cierra
las preguntas abiertas de la tarjeta con las opciones recomendadas.

## Goals / Non-Goals

**Goals:**
- Nueva sección "El arnés" debajo del hero, con encabezado de nombre accesible "El arnés".
- Bloques de guías (5 elementos literales) y sensores (5 elementos literales) con sus roles ANTES/DESPUÉS.
- Metáfora del carril: elemento rail + elemento agente que lo recorre de guías hacia sensores.
- Responsive en 375 / 768 / 1280 sin overflow horizontal; apilado de los bloques en viewport estrecho.
- Respeto a `prefers-reduced-motion: reduce` (contenido completo inmediato, sin animaciones).
- Accesibilidad: encabezado accesible; capas decorativas `aria-hidden` sin duplicar el texto.

**Non-Goals:**
- No se sustituye ni reordena el hero ni otras secciones; "El arnés" se añade debajo.
- No se fija el "look" visual final ni la librería de iconos definitiva (se valida en tester).
- No se toca infraestructura de workspace ni backend; es solo producto en `commit-conf-post-codigo`.
- Detalles de implementación de tests (selectores concretos, timings) — corresponden a test_red/tester.

## Decisions

### D1: Componente nuevo compuesto en `app/page.tsx` debajo del hero (CA-1)

Se crea un componente nuevo bajo `app/_components/` (p. ej. `harness-section.tsx`) y se compone en
`app/page.tsx` por debajo del hero, sin tocar el comportamiento del hero. El encabezado de sección es
un heading cuyo nombre accesible es exactamente "El arnés".

Alternativa considerada: meter el markup inline en `app/page.tsx`. Rechazada: `page.tsx` quedaría
recargado y se perdería el aislamiento para tests de componente, en línea con el patrón de `HeroTitle`.

### D2: Disposición del carril — rail horizontal en desktop / vertical en mobile (CA-4, CA-5)

El carril se dispone **horizontal en desktop y vertical en mobile** (opción recomendada de la tarjeta).
Los bloques de guías y sensores se colocan a ambos extremos del carril en desktop (lado a lado) y se
**apilan** en viewport estrecho, reorganizándose con utilidades responsive de Tailwind. El agente se
posiciona a lo largo del carril y, con animaciones habilitadas, recorre desde la zona guías/antes hacia
la zona sensores/después.

Alternativa considerada: carril siempre horizontal con scroll horizontal en mobile. Rechazada: induce
overflow horizontal, incumpliendo CA-5.

### D3: Animación de recorrido y disparo al entrar en viewport (CA-4, CA-6)

El agente recorre el carril con `motion/react`. La animación de entrada y el recorrido se disparan
**auto-play al entrar la sección en el viewport (scroll into view)** (opción recomendada de la tarjeta),
p. ej. con `whileInView` / detección de intersección. Todas las animaciones se gatean con
`useReducedMotion()`: con `prefers-reduced-motion: reduce` el contenido se renderiza completo de
inmediato y el agente aparece directamente en su posición final del carril, sin animaciones.

Alternativa considerada: animar siempre al montar, sin gating. Rechazada: incumple CA-6 y desperdicia
la animación si la sección está fuera de pantalla al cargar.

### D4: Capas decorativas `aria-hidden` separadas del texto accesible (CA-7)

Siguiendo el patrón del hero, las capas puramente visuales (carril, agente, efectos) se marcan
`aria-hidden` y NO contienen el texto de guías/sensores. El texto de guías y sensores vive en nodos
semánticos reales (listas/encabezados) presentes íntegros para el lector de pantalla, sin duplicarse
ni fragmentarse por la animación.

Alternativa considerada: pintar el texto dentro de los nodos animados. Rechazada: fragmenta/duplica el
texto para el lector de pantalla, incumpliendo CA-7.

### D5: Copy de la sección — opciones recomendadas de la tarjeta

Se cierran las preguntas abiertas con las opciones recomendadas:

- **Títulos de bloque**: "Guías · condicionan antes" y "Sensores · verifican después".
- **Intro**: una intro breve de 1–2 frases que enmarca el arnés = guías (antes) + sensores (después)
  como el carril por el que avanza el agente y los checkpoints que verifican que no se sale.
- **Iconos**: iconos ligeros con el texto SIEMPRE presente (el texto literal de guías/sensores no
  depende del icono; los iconos son decorativos).
- **Elementos literales (texto exacto, no traducir/alterar):**
  - Guías: `RULES.md`, `AGENTS.md`, `.editorconfig`, `ESLint`, `tipos en TypeScript`.
  - Sensores: `tests`, `type-checker`, `linter`, `security scan`, `gates de CI`.

### D6: Selectores de test estables

Los nodos que consultarán los tests (sección, encabezado, bloques de guías/sensores, carril, agente)
llevarán `data-testid` estables para anclas deterministas en test_red/tester, sin acoplarse al copy.

## Risks / Trade-offs

- [El recorrido del agente puede ignorar `prefers-reduced-motion`] → Mitigación: D3 gatea todas las
  animaciones con `useReducedMotion()`; CA-6 lo cubre con un escenario explícito.
- [El carril horizontal puede provocar overflow en 375 px] → Mitigación: D2 cambia a carril vertical y
  apila los bloques en viewport estrecho; CA-5 lo verifica en los tres viewports.
- [Las capas animadas podrían duplicar/fragmentar el texto para el lector de pantalla] → Mitigación:
  D4 separa decoración (`aria-hidden`) del texto accesible; CA-7 lo cubre con un escenario.
- [El "look" visual final no está cerrado] → Mitigación: declarado Non-goal; se valida en tester con
  auditores visuales; el contrato unitario solo exige presencia/estructura de carril y agente (CA-4).

## Migration Plan

No aplica migración de datos ni de API. Es una sección de UI nueva que se añade debajo del hero.
Rollback trivial: revertir el componente nuevo y su composición en `app/page.tsx`.

## Open Questions

Ninguna pendiente: las preguntas abiertas de la tarjeta se cierran en D5 con las opciones recomendadas
(auto-play al entrar en viewport; carril horizontal en desktop / vertical en mobile; iconos ligeros con
texto siempre presente; títulos "Guías · condicionan antes" y "Sensores · verifican después"; intro
breve de 1–2 frases). El detalle visual fino de la animación queda abierto por diseño y se valida en
la fase tester.
