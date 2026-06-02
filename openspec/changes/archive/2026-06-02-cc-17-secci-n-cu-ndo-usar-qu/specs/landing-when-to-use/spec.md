## ADDED Requirements

### Requirement: Sección "¿Cuándo usar qué?" con tabla semántica accesible debajo del hero

La landing SHALL incorporar una nueva sección identificable "¿Cuándo usar qué?", colocada debajo del
hero, con un encabezado cuyo nombre accesible MUST ser "¿Cuándo usar qué?". La sección SHALL exponer
una tabla semántica con exactamente tres columnas cuyos encabezados son literalmente `Si necesitas…`,
`Característica` y `Artefacto`. Los encabezados de columna MUST estar asociados a sus celdas de datos
de modo que un lector de pantalla relacione cada valor con la columna a la que pertenece. El hero y
las demás secciones existentes SHALL permanecer sin modificarse. Esto cubre la CA-1.

#### Scenario: La landing expone la sección "¿Cuándo usar qué?" debajo del hero

- **WHEN** se carga la página de inicio
- **THEN** existe una sección identificable con un encabezado cuyo nombre accesible es "¿Cuándo usar qué?"
- **AND** dicha sección se renderiza por debajo del hero existente
- **AND** la sección contiene una tabla cuyos tres encabezados de columna son exactamente
  "Si necesitas…", "Característica" y "Artefacto", asociados a sus celdas para lectores de pantalla

### Requirement: Las 7 filas de la tabla con su contenido literal

La tabla de la sección "¿Cuándo usar qué?" SHALL mostrar exactamente 7 filas, y cada fila MUST
contener el texto literal indicado en sus tres columnas (Si necesitas… / Característica / Artefacto):

1. `Siempre activo` · `Comportamiento fundacional del agente` · `Instrucciones`
2. `A veces` · `Patrón reutilizable, dependiente del contexto` · `Skill`
3. `Una sola vez` · `Específico de la sesión actual` · `Prompt directo`
4. `Aislamiento` · `Contexto separado o paralelización` · `Subagente`
5. `Determinista` · `Interfaz fija, idempotente, salida estricta` · `Comando`
6. `Garantía` · `Debe ocurrir sí o sí, fuera del juicio del modelo` · `Hook`
7. `Integración` · `Servicio externo, OAuth, reutilización entre equipos` · `MCP server`

Esto cubre la CA-2.

#### Scenario: La tabla muestra exactamente 7 filas con el contenido literal

- **WHEN** se carga la sección "¿Cuándo usar qué?"
- **THEN** la tabla muestra exactamente 7 filas de datos
- **AND** la primera columna de cada fila contiene, en orden, "Siempre activo", "A veces",
  "Una sola vez", "Aislamiento", "Determinista", "Garantía" e "Integración"
- **AND** la columna "Característica" de cada fila contiene su texto literal correspondiente
  ("Comportamiento fundacional del agente", "Patrón reutilizable, dependiente del contexto",
  "Específico de la sesión actual", "Contexto separado o paralelización",
  "Interfaz fija, idempotente, salida estricta", "Debe ocurrir sí o sí, fuera del juicio del modelo"
  y "Servicio externo, OAuth, reutilización entre equipos")
- **AND** la columna "Artefacto" de cada fila contiene, en orden, "Instrucciones", "Skill",
  "Prompt directo", "Subagente", "Comando", "Hook" y "MCP server"

### Requirement: Resaltado por hover y por foco, accesible por teclado

Cada fila de la tabla SHALL resaltarse visualmente al pasar el ratón por encima (hover) y cuando
recibe el foco. Las filas MUST ser alcanzables y focusables por teclado (navegación con Tab), de modo
que el resaltado obtenido por foco de teclado sea equivalente al obtenido por hover. Esto cubre la CA-3.

#### Scenario: La fila se resalta al hover y al foco de teclado

- **WHEN** el usuario pasa el ratón sobre una fila de la tabla
- **THEN** esa fila se resalta visualmente
- **WHEN** el usuario navega con Tab hasta esa misma fila
- **THEN** la fila es focusable y queda resaltada de forma equivalente al resaltado por hover

### Requirement: Responsive sin overflow horizontal con apilado accesible en móvil

La sección "¿Cuándo usar qué?" SHALL renderizarse sin overflow horizontal en los viewports 375, 768 y
1280 px. En viewport estrecho (p. ej. 375 px) la tabla MUST apilarse verticalmente (cada fila como un
bloque), conservando junto a cada valor la etiqueta de la columna a la que pertenece (Si necesitas… /
Característica / Artefacto) para no perder el contexto al apilar. Esto cubre la CA-4.

#### Scenario: Sin overflow horizontal en los viewports objetivo

- **WHEN** la sección "¿Cuándo usar qué?" se renderiza en los anchos de 375, 768 y 1280 px
- **THEN** no se produce overflow horizontal en ninguno de ellos

#### Scenario: La tabla se apila por bloques conservando la etiqueta de columna en móvil

- **WHEN** la sección "¿Cuándo usar qué?" se renderiza en un viewport estrecho (p. ej. 375 px)
- **THEN** cada fila se presenta como un bloque apilado verticalmente en lugar de en una fila horizontal
- **AND** cada valor conserva visible la etiqueta de su columna (Si necesitas… / Característica / Artefacto)

### Requirement: Estética terminal coherente con el sitio

La sección "¿Cuándo usar qué?" MUST mantener la estética de terminal del sitio: emplea tipografía
monoespaciada (`font-mono`) y los tokens de color de la familia `terminal-*` ya definidos en
`app/globals.css`, de forma coherente con el hero. Esto cubre la CA-5.

#### Scenario: La sección usa tipografía monoespaciada y tokens terminal

- **WHEN** se renderiza la sección "¿Cuándo usar qué?"
- **THEN** el texto de la sección usa tipografía monoespaciada (`font-mono`)
- **AND** los colores de la sección provienen de los tokens `terminal-*` del sitio
