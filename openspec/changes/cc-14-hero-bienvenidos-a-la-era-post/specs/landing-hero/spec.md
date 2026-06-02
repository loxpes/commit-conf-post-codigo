## ADDED Requirements

### Requirement: Portada a pantalla completa con estética terminal

La sección hero de la landing SHALL ocupar el alto del viewport con estética de terminal:
fondo `terminal-bg`, tipografía monoespaciada (`--font-mono`) y sin overflow horizontal.
Esto cubre la CA-1.

#### Scenario: Hero ocupa el viewport con fondo terminal

- **WHEN** se carga la página de inicio
- **THEN** el hero ocupa el alto del viewport, usa el fondo `terminal-bg` y tipografía
  monoespaciada, y no produce scroll horizontal

### Requirement: Título revelado token a token con nombre accesible íntegro

El hero SHALL mostrar un título h1 con el texto "Bienvenidos a la era POST-CÓDIGO" revelado
token a token acompañado de un cursor. El nombre accesible del encabezado (lo que expone
`getByRole('heading')` a un lector de pantalla) MUST ser SIEMPRE el texto completo del título,
aunque la animación de revelado esté en curso. Esto cubre la CA-2.

#### Scenario: El encabezado expone el título completo durante la animación

- **WHEN** la página se monta y la animación de revelado token a token aún no ha terminado
- **THEN** `getByRole('heading', { level: 1 })` expone el nombre accesible completo
  "Bienvenidos a la era POST-CÓDIGO"

#### Scenario: El título se revela token a token con cursor

- **WHEN** se monta el hero con animaciones habilitadas
- **THEN** el título h1 aparece de forma progresiva (token a token) y se muestra un cursor
  durante el revelado

### Requirement: Subtítulo con copy exacto

El hero SHALL mostrar un subtítulo con el texto exacto
"Cómo la IA está reescribiendo nuestro oficio mientras lo vivimos.". Esto cubre la CA-3.

#### Scenario: El subtítulo muestra el copy exacto

- **WHEN** se carga el hero
- **THEN** se muestra el texto exacto "Cómo la IA está reescribiendo nuestro oficio mientras lo vivimos."

### Requirement: Pie de autor con copy exacto

El hero SHALL mostrar un pie de autor con el texto exacto
"Jorge Martín Lopes · AI Software Architect · Sopra Steria · @loxpes · #CommitConf2026".
Esto cubre la CA-4.

#### Scenario: El pie de autor muestra el copy exacto

- **WHEN** se carga el hero
- **THEN** se muestra el texto exacto "Jorge Martín Lopes · AI Software Architect · Sopra Steria · @loxpes · #CommitConf2026"

### Requirement: Entrada animada e indicador de scroll

El hero SHALL ejecutar una animación de entrada al montar y SHALL mostrar un indicador de
scroll animado visible en la zona inferior de la portada. Esto cubre la CA-5.

#### Scenario: Animación de entrada al montar

- **WHEN** el hero se monta con animaciones habilitadas
- **THEN** sus elementos aparecen mediante una animación de entrada

#### Scenario: Indicador de scroll visible

- **WHEN** se carga el hero
- **THEN** se muestra un indicador de scroll animado en la zona inferior de la portada

### Requirement: Responsive sin overflow y respeto a prefers-reduced-motion

El hero SHALL renderizarse sin overflow horizontal en los viewports 375, 768 y 1280.
Cuando el usuario tenga activado `prefers-reduced-motion: reduce`, el hero MUST mostrar el
contenido completo de forma inmediata (incluido el título íntegro) sin ejecutar animaciones.
Esto cubre la CA-6.

#### Scenario: Sin overflow horizontal en los viewports objetivo

- **WHEN** el hero se renderiza en los anchos de 375, 768 y 1280 px
- **THEN** no se produce overflow horizontal en ninguno de ellos

#### Scenario: prefers-reduced-motion muestra contenido completo sin animaciones

- **WHEN** el usuario tiene activado `prefers-reduced-motion: reduce` y se carga el hero
- **THEN** se muestra el título completo y el resto del contenido de inmediato, sin ejecutar
  ninguna animación
