## ADDED Requirements

### Requirement: Sección "El arnés" debajo del hero

La landing SHALL incorporar una nueva sección identificable "El arnés", colocada debajo del hero,
con un encabezado de sección cuyo nombre accesible MUST ser "El arnés". El hero existente SHALL
permanecer por encima de la sección sin modificarse. Esto cubre la CA-1.

#### Scenario: La landing expone la sección "El arnés" debajo del hero

- **WHEN** se carga la página de inicio
- **THEN** existe una sección identificable con un encabezado cuyo nombre accesible es "El arnés"
- **AND** dicha sección se renderiza por debajo del hero existente

### Requirement: Bloque de GUÍAS con los 5 elementos literales

La sección "El arnés" SHALL presentar el bloque de GUÍAS — condicionan ANTES con exactamente estos
5 elementos, con el texto literal: `RULES.md`, `AGENTS.md`, `.editorconfig`, `ESLint`,
`tipos en TypeScript`. El bloque SHALL exponer su rol "guías / condicionan ANTES". Esto cubre la CA-2.

#### Scenario: El bloque de guías muestra los 5 elementos literales

- **WHEN** se carga la sección "El arnés"
- **THEN** el bloque de guías muestra exactamente los textos "RULES.md", "AGENTS.md",
  ".editorconfig", "ESLint" y "tipos en TypeScript"
- **AND** el bloque identifica su rol como guías que condicionan ANTES

### Requirement: Bloque de SENSORES con los 5 elementos literales

La sección "El arnés" SHALL presentar el bloque de SENSORES — verifican DESPUÉS con exactamente
estos 5 elementos, con el texto literal: `tests`, `type-checker`, `linter`, `security scan`,
`gates de CI`. El bloque SHALL exponer su rol "sensores / verifican DESPUÉS". Esto cubre la CA-3.

#### Scenario: El bloque de sensores muestra los 5 elementos literales

- **WHEN** se carga la sección "El arnés"
- **THEN** el bloque de sensores muestra exactamente los textos "tests", "type-checker", "linter",
  "security scan" y "gates de CI"
- **AND** el bloque identifica su rol como sensores que verifican DESPUÉS

### Requirement: Metáfora del carril con un agente que lo recorre

La sección "El arnés" SHALL materializar la metáfora del carril: MUST existir un elemento de carril
(rail) y un elemento "agente" posicionado a lo largo de él. Con las animaciones habilitadas, el
agente SHALL ejecutar una animación de recorrido desde la zona guías/antes hacia la zona
sensores/después. A nivel unitario se comprueba la presencia y estructura del carril y el agente
(p. ej. mediante selectores `data-testid` estables); el movimiento se valida en la fase tester con
auditores visuales. Esto cubre la CA-4.

#### Scenario: Existen el carril y el agente con animación de recorrido

- **WHEN** se renderiza la sección "El arnés" con animaciones habilitadas
- **THEN** existe un elemento de carril y un elemento "agente" posicionado a lo largo de él
- **AND** el agente ejecuta una animación de recorrido desde la zona guías/antes hacia la zona
  sensores/después

### Requirement: Responsive sin overflow horizontal con apilado en viewport estrecho

La sección "El arnés" SHALL renderizarse sin overflow horizontal en los viewports 375, 768 y 1280 px.
En viewport estrecho, los bloques de guías y sensores MUST reorganizarse (apilarse) en lugar de
quedar lado a lado, manteniéndose legibles. Esto cubre la CA-5.

#### Scenario: Sin overflow horizontal en los viewports objetivo

- **WHEN** la sección "El arnés" se renderiza en los anchos de 375, 768 y 1280 px
- **THEN** no se produce overflow horizontal en ninguno de ellos

#### Scenario: Los bloques se apilan en viewport estrecho

- **WHEN** la sección "El arnés" se renderiza en un viewport estrecho (p. ej. 375 px)
- **THEN** los bloques de guías y sensores se apilan (uno debajo del otro) en lugar de quedar lado a
  lado y permanecen legibles

### Requirement: Respeto a prefers-reduced-motion

Cuando el usuario tenga activado `prefers-reduced-motion: reduce`, la sección "El arnés" MUST mostrar
todo su contenido de inmediato (guías, sensores y el agente en su posición final del carril) sin
ejecutar animaciones. Esto cubre la CA-6.

#### Scenario: prefers-reduced-motion muestra el contenido completo sin animaciones

- **WHEN** el usuario tiene activado `prefers-reduced-motion: reduce` y se carga la sección "El arnés"
- **THEN** se muestran de inmediato las guías, los sensores y el agente en su posición final del carril
- **AND** no se ejecuta ninguna animación

### Requirement: Accesibilidad del contenido y capas decorativas

La sección "El arnés" SHALL ser accesible: el encabezado MUST exponer el nombre accesible "El arnés"
a un lector de pantalla, y las capas puramente decorativas de la animación (carril, agente, efectos)
MUST ser `aria-hidden` y NO duplicar ni fragmentar el texto de guías y sensores. Esto cubre la CA-7.

#### Scenario: El encabezado es accesible y las capas decorativas están ocultas a lector de pantalla

- **WHEN** un lector de pantalla recorre la sección "El arnés"
- **THEN** el encabezado expone el nombre accesible "El arnés"
- **AND** las capas decorativas de la animación (carril, agente, efectos) son `aria-hidden`
- **AND** el texto de guías y sensores no aparece duplicado ni fragmentado por las capas decorativas
