## ADDED Requirements

### Requirement: Frase de cierre debajo del hero

La landing SHALL mostrar, debajo del hero, una sección de cierre (`<section>`) que reutiliza el
lenguaje visual de terminal (tokens `terminal-*`, tipografía monoespaciada). La sección MUST mostrar
el texto exacto "La era post-código ya empezó. ¿Vais a estar en ella, o vais a ver cómo pasa?".
Esto cubre la CA-1.

#### Scenario: La sección de cierre muestra la frase exacta

- **WHEN** se carga la página de inicio y se llega a la sección de cierre debajo del hero
- **THEN** se muestra el texto exacto "La era post-código ya empezó. ¿Vais a estar en ella, o vais a ver cómo pasa?"

### Requirement: Bloque "Para el lunes" con 3 pasos como lista numerada

La sección de cierre SHALL mostrar un encabezado "Para el lunes" y una lista numerada (`<ol>`) con
exactamente 3 ítems, con el copy exacto en este orden: 1) "Adopta una metodología (OpenSpec,
spec-kit…)", 2) "Genera arneses para tu código", 3) "Piensa en context engineering". Esto cubre la
CA-2.

#### Scenario: El bloque "Para el lunes" muestra los 3 pasos exactos en una lista numerada

- **WHEN** se carga la sección de cierre
- **THEN** se muestra el encabezado "Para el lunes" y una lista numerada (`<ol>`) con exactamente 3
  ítems cuyo copy exacto es, en orden, "Adopta una metodología (OpenSpec, spec-kit…)", "Genera arneses
  para tu código" y "Piensa en context engineering"

### Requirement: Nota de atribución

La sección de cierre SHALL mostrar una nota de atribución con el texto exacto "Esta web la construyó
un pipeline de agentes — CommitConf 2026.". Esto cubre la CA-3.

#### Scenario: La nota de atribución muestra el copy exacto

- **WHEN** se carga la sección de cierre
- **THEN** se muestra el texto exacto "Esta web la construyó un pipeline de agentes — CommitConf 2026."

### Requirement: Hueco accesible para el QR

La sección de cierre SHALL incluir un hueco identificable (placeholder) para un QR que apuntará a la
URL del sitio. El hueco MUST exponer un `data-testid` estable y un nombre accesible que lo describa
(p. ej. "Código QR a la web"). En este cambio el hueco es un placeholder accesible; NO contiene el QR
real. Esto cubre la CA-4.

#### Scenario: Existe el hueco accesible del QR con data-testid y nombre accesible

- **WHEN** se carga la sección de cierre
- **THEN** existe un hueco para el QR con un `data-testid` estable y un nombre accesible que lo
  describe (p. ej. "Código QR a la web"), sin contener el QR real

### Requirement: Línea de footer semántica

La sección de cierre SHALL terminar con una línea de footer en un elemento `<footer>` semántico con
el copy exacto "commit · post-código · jorge martín". Esto cubre la CA-5.

#### Scenario: El footer semántico muestra el copy exacto

- **WHEN** se carga la sección de cierre
- **THEN** se muestra un elemento `<footer>` semántico con el texto exacto "commit · post-código · jorge martín"

### Requirement: Aparición animada, responsive y respeto a prefers-reduced-motion

La sección de cierre SHALL aparecer con una animación de entrada sutil al montar y SHALL renderizarse
sin overflow horizontal en los viewports 375, 768 y 1280. Cuando el usuario tenga activado
`prefers-reduced-motion: reduce`, la sección MUST mostrar todo su contenido de forma inmediata, sin
ejecutar animaciones. Esto cubre la CA-6.

#### Scenario: Animación de entrada al montar

- **WHEN** la sección de cierre se monta con animaciones habilitadas
- **THEN** su contenido aparece mediante una animación de entrada sutil

#### Scenario: Sin overflow horizontal en los viewports objetivo

- **WHEN** la sección de cierre se renderiza en los anchos de 375, 768 y 1280 px
- **THEN** no se produce overflow horizontal en ninguno de ellos

#### Scenario: prefers-reduced-motion muestra el contenido completo sin animaciones

- **WHEN** el usuario tiene activado `prefers-reduced-motion: reduce` y se carga la sección de cierre
- **THEN** se muestra todo el contenido de inmediato, sin ejecutar ninguna animación
