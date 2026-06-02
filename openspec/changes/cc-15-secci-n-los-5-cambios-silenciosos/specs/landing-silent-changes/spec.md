## ADDED Requirements

### Requirement: Contenido literal de la sección «Los 5 cambios silenciosos»

La home SHALL montar una sección identificable (`data-testid="silent-changes-section"`)
que muestre la frase de intro literal «Cinco cambios silenciosos. Ya están aquí, aunque
nadie los esté nombrando todavía.» y cinco tarjetas
(`data-testid="silent-change-card-1"` … `data-testid="silent-change-card-5"`). Cada tarjeta
MUST mostrar su número, su pilar y su frase exactos:

- `01` · LENGUAJES — El lenguaje ya no es una barrera.
- `02` · FRAMEWORKS — Los frameworks propietarios encorsetan.
- `03` · ESCALA — Equipos de 10 compiten con multinacionales.
- `04` · PRODUCTO — Desarrollamos producto. No código.
- `05` · OFICIO — Pensamos en harness. No en patrones.

Esto cubre la CA-1.

#### Scenario: La sección muestra la intro y las cinco tarjetas con el copy exacto

- **WHEN** se carga la página de inicio
- **THEN** existe un nodo `data-testid="silent-changes-section"` que muestra el texto exacto
  «Cinco cambios silenciosos. Ya están aquí, aunque nadie los esté nombrando todavía.»
- **AND** existen las cinco tarjetas `silent-change-card-1` … `silent-change-card-5`, cada una
  con su número (`01`–`05`), su pilar y su frase exactos

### Requirement: Aparición escalonada al hacer scroll, una sola vez

Cuando la sección entra en el viewport, las cinco tarjetas SHALL aparecer con una animación
escalonada (stagger) mediante `motion/react` (`whileInView`, `viewport: { once: true }`), y la
animación de entrada MUST ejecutarse una sola vez (no se re-anima al volver a entrar en el
viewport). Esto cubre la CA-2.

#### Scenario: Tras desplazar hasta la sección, las cinco tarjetas quedan visibles

- **WHEN** el usuario se desplaza hasta que la sección entra en el viewport
- **THEN** las cinco tarjetas se revelan de forma escalonada y quedan visibles

#### Scenario: La animación de entrada no se repite al re-entrar

- **WHEN** la sección sale del viewport y vuelve a entrar
- **THEN** las cinco tarjetas permanecen visibles y la animación de entrada no se vuelve a ejecutar

### Requirement: Respeto a `prefers-reduced-motion`

Con `prefers-reduced-motion: reduce`, la intro y las cinco tarjetas SHALL mostrarse completas e
instantáneas, sin animación de entrada ni elementos en bucle, detectado vía `useReducedMotion()`,
de forma coherente con el resto de la landing. Esto cubre la CA-3.

#### Scenario: Con movimiento reducido el contenido se muestra al instante

- **WHEN** el usuario tiene activado `prefers-reduced-motion: reduce` y carga la página
- **THEN** la intro y las cinco tarjetas se muestran completas desde el primer render,
  sin animación de entrada ni elementos animados en bucle

### Requirement: Responsive sin desbordamiento horizontal

La sección SHALL renderizarse sin scroll horizontal en los viewports 375, 768 y 1280 px,
con una columna en móvil y varias columnas en pantallas grandes, usando los tokens
`terminal-*` y `font-mono`. Esto cubre la CA-4.

#### Scenario: La sección no desborda en los tres viewports

- **WHEN** la página se renderiza en anchuras de 375, 768 y 1280 px
- **THEN** la sección no produce scroll horizontal y su layout pasa de una columna (móvil)
  a varias columnas (pantallas grandes)

### Requirement: Accesibilidad del contenido textual

El texto íntegro de la intro y de las cinco tarjetas SHALL estar siempre presente en el DOM y
disponible para lectores de pantalla, con independencia del estado de la animación: la capa
animada MUST NOT ocultar el contenido textual a la tecnología de asistencia. Esto cubre la CA-5.

#### Scenario: El contenido textual es accesible durante y después de la animación

- **WHEN** la sección está animándose o ya ha terminado de animarse
- **THEN** el texto completo de la intro y de las cinco tarjetas está presente en el DOM y
  expuesto a lectores de pantalla
