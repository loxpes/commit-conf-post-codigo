## Context

La landing de la charla "Bienvenidos a la era post-código" es un sitio estático (Next.js 16 App
Router + React 19, Tailwind v4) con estética de terminal. Sobre el hero (cc-14) y las secciones ya
existentes, esta sección añade una tabla de referencia "¿Cuándo usar qué?" que mapea una necesidad a
un artefacto de Claude Code. El reto principal no es visual sino de **accesibilidad de tabla**:
mantener la asociación columna→valor tanto en la vista tabular de escritorio como en la vista apilada
de móvil, y permitir resaltado por hover y por foco de teclado.

## Goals / Non-Goals

**Goals**
- Sección identificable debajo del hero con encabezado accesible "¿Cuándo usar qué?" (CA-1).
- Tabla con 3 columnas de encabezado literal y 7 filas de contenido literal, semánticamente accesible
  (asociación encabezado→celda) (CA-1, CA-2).
- Resaltado equivalente por hover y por foco de teclado, filas focusables con Tab (CA-3).
- Responsive sin overflow en 375/768/1280 y apilado por bloques que conserva la etiqueta de columna
  en móvil (CA-4).
- Estética terminal: `font-mono` + tokens `terminal-*` (CA-5).

**Non-Goals**
- Animación de entrada (la card no la pide; fuera de alcance por defecto).
- Reordenar o modificar el hero u otras secciones.
- Cambios en workspace, backend o tokens de diseño existentes.

## Decisions

### D1: Componente nuevo compuesto en `app/page.tsx` debajo del hero (CA-1)
Se crea `app/_components/when-to-use-section.tsx` como componente de sección y se monta en
`app/page.tsx` por debajo del hero, sin tocar el hero ni el resto de secciones. La sección expone
`data-testid="when-to-use"` y un encabezado (`<h2>`) con el nombre accesible "¿Cuándo usar qué?".

### D2: Tabla semántica `<table>` real con asociación encabezado→celda (CA-1, CA-2)
Se usa una `<table>` HTML real con `<thead>` (3 `<th scope="col">`: "Si necesitas…", "Característica",
"Artefacto") y `<tbody>` con 7 `<tr>`. La semántica nativa de tabla da la mejor asociación
columna→valor para lectores de pantalla. Alternativa válida descartada por simplicidad: grid con
roles ARIA (`role="table"/"row"/"cell"`), que exige replicar manualmente la semántica. El contenido
de las 7 filas es literal y fijo (constante en el componente), no editable en runtime.

### D3: Apilado en móvil conservando la etiqueta de columna (CA-4)
En viewport estrecho la tabla se transforma en bloques apilados (cada `<tr>` = un bloque) mediante
CSS. Para no perder el contexto al apilar, cada celda muestra su etiqueta de columna usando
`data-label` + `::before` (patrón "responsive table"), de modo que junto a cada valor aparezca
"Si necesitas…", "Característica" o "Artefacto". En desktop (≥768) se mantiene la vista tabular
clásica. Sin anchos fijos que provoquen overflow horizontal en 375/768/1280.

### D4: Resaltado por hover y por foco de teclado equivalentes (CA-3)
Cada fila es focusable (`tabindex={0}` en el `<tr>`) y el resaltado se aplica con `:hover` y
`:focus`/`:focus-within` apuntando al mismo estilo, de forma que el foco de teclado replique el
resaltado del ratón. Así la fila es alcanzable con Tab y el feedback visual es equivalente.

### D5: Estética terminal reutilizada (CA-5)
La sección usa `font-mono` (variable `--font-mono`) y los tokens `terminal-*` ya definidos en
`app/globals.css` (terminal-bg, terminal-surface, terminal-fg, terminal-muted, terminal-accent),
sin introducir nuevos tokens ni dependencias.

### D6: Selectores de test estables
Se exponen `data-testid` estables: `when-to-use` (sección), `when-to-use-table` (tabla) y, si hace
falta, `when-to-use-row` en cada fila, para que los tests unit/componente y e2e consulten nodos
estables sin depender del copy.

## Risks / Trade-offs

- **Apilado accesible**: el patrón `data-label`/`::before` duplica la etiqueta de columna como
  contenido CSS; hay que asegurar que no rompa la lectura por pantalla (el `::before` es decorativo y
  el `<th scope>` sigue siendo la fuente semántica). Mitigación: validar en la fase tester con
  auditoría de accesibilidad/visual.
- **Foco en `<tr>`**: hacer focusables las filas con `tabindex=0` añade paradas de Tab; es el
  comportamiento pedido por CA-3 (resaltado por foco equivalente a hover), asumido conscientemente.

## Migration Plan

No hay migración de datos ni de contrato: es contenido estático nuevo. El despliegue es el del sitio
(build estático). No requiere orden de despliegue ni rollback especial; revertir es quitar el
componente de `app/page.tsx`.

## Open Questions

- **Animación de entrada**: queda fuera de alcance por defecto. Si producto la quisiera (fade-in al
  hacer scroll), se añadiría respetando `prefers-reduced-motion` y con un CA adicional; no se
  implementa en este change.
