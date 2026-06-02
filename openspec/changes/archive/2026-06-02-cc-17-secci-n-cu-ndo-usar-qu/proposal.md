## Why

La landing de la charla "Bienvenidos a la era post-código" ya presenta el hero (cc-14) y otras
secciones, pero no ofrece todavía una **guía práctica de decisión**: ante un problema concreto,
¿qué artefacto de Claude Code conviene usar? La audiencia necesita una referencia rápida que
relacione *lo que necesita* con *la característica* y *el artefacto* adecuado (Instrucciones,
Skill, Prompt directo, Subagente, Comando, Hook, MCP server). Una tabla "¿Cuándo usar qué?",
debajo del hero, materializa esa decisión de un vistazo y refuerza el mensaje de la ponencia.

## What Changes

- Se añade una nueva sección **"¿Cuándo usar qué?"** en la landing, colocada **debajo del hero**
  (el hero y el resto de secciones permanecen intactos), identificable mediante `data-testid`
  (p. ej. `when-to-use`) y con un encabezado cuyo nombre accesible es "¿Cuándo usar qué?".
- La sección presenta una **tabla semántica** con exactamente **3 columnas**, cuyos encabezados
  son literalmente `Si necesitas…`, `Característica` y `Artefacto`, con los encabezados de columna
  asociados a sus celdas para que un lector de pantalla relacione cada valor con su columna.
- La tabla muestra **exactamente 7 filas** con su contenido literal por columna
  (Instrucciones, Skill, Prompt directo, Subagente, Comando, Hook, MCP server).
- Cada fila se **resalta al pasar el ratón (hover) y al recibir el foco de teclado**; las filas son
  alcanzables y focusables por teclado (Tab), de modo que el resaltado por foco es equivalente al de
  hover.
- La sección es **responsive**: en viewport estrecho (375 px) la tabla se **apila** en bloques (cada
  fila = un bloque) conservando la etiqueta de su columna junto a cada valor, y no se produce
  **overflow horizontal** en los anchos 375, 768 y 1280 px.
- Se reutiliza la **estética terminal** del sitio: tipografía monoespaciada (`font-mono`) y tokens de
  color `terminal-*`, coherente con el hero.

## Capabilities

### New Capabilities
- `landing-when-to-use`: sección "¿Cuándo usar qué?" de la landing, debajo del hero, que guía a la
  audiencia para elegir el artefacto adecuado de Claude Code mediante una tabla semántica de 3
  columnas y 7 filas con contenido literal, resaltado por hover y por foco de teclado, comportamiento
  responsive con apilado accesible en móvil y estética terminal.

### Modified Capabilities
<!-- Ninguna: el hero (landing-hero, cc-14) y el resto de secciones no cambian; "¿Cuándo usar qué?"
     se añade como capacidad nueva. -->

## Impact

- Código afectado: nuevo componente bajo `app/_components/` (p. ej. `when-to-use-section.tsx`)
  compuesto dentro de `app/page.tsx` debajo del hero. El hero (`app/page.tsx`) y las demás secciones
  no se modifican en su comportamiento actual.
- Tests afectados: nuevos tests unit/componente (`*.test.tsx`) y ampliación del e2e/visual
  (`tests/e2e/`) en fases posteriores del pipeline para cubrir la nueva sección en 375 / 768 / 1280.
- Tokens de diseño (`terminal-*`) y `--font-mono` ya existentes en `app/globals.css`; no se modifican.
- Sin dependencias nuevas: la sección es estática (HTML/CSS), sin animaciones por defecto.

## Non-goals (fuera de alcance)

- **Animación de entrada**: la card no la pide y queda fuera de alcance por defecto. Si en el futuro
  se quisiera un fade-in al hacer scroll, debería respetar `prefers-reduced-motion` y añadiría un CA
  adicional; no se incluye en este change.
- No sustituye ni reordena otras secciones: el hero permanece y "¿Cuándo usar qué?" se añade debajo.
- No define la librería de iconos ni el "look" visual final más allá de la estética terminal; el
  detalle visual se valida en la fase tester con auditores visuales.
- No toca infraestructura de workspace ni backend; es exclusivamente una sección de producto en
  `commit-conf-post-codigo`.
