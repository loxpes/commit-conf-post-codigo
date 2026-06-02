## ADDED Requirements

### Requirement: Contenido de la sección

La home SHALL montar una sección con `data-testid="silent-changes-section"` que contenga la intro literal «Cinco cambios silenciosos. Ya están aquí, aunque nadie los esté nombrando todavía.» y exactamente 5 tarjetas (`data-testid="silent-change-card-1"` … `"silent-change-card-5"`), cada una con su número (01–05), su pilar y su frase exactos:

- 01 · LENGUAJES — El lenguaje ya no es una barrera.
- 02 · FRAMEWORKS — Los frameworks propietarios encorsetan.
- 03 · ESCALA — Equipos de 10 compiten con multinacionales.
- 04 · PRODUCTO — Desarrollamos producto. No código.
- 05 · OFICIO — Pensamos en harness. No en patrones.

#### Scenario: Sección y tarjetas presentes en el DOM

Level: unit
Target: app/_components/silent-changes-section.tsx

- **WHEN** se renderiza `SilentChangesSection`
- **THEN** existe un elemento con `data-testid="silent-changes-section"` en el DOM
- **THEN** existen exactamente 5 elementos `data-testid="silent-change-card-N"` (N=1..5)
- **THEN** cada tarjeta contiene su número, pilar y frase correspondientes

### Requirement: Aparición escalonada al hacer scroll

Las 5 tarjetas SHALL aparecer con animación stagger (`motion/react`, `whileInView`, `viewport: { once: true }`) cuando la sección entra en el viewport, una sola vez.

#### Scenario: Tarjetas visibles tras scroll a la sección

Level: e2e
Route: / (home)
Initial interaction: desplazar hasta `[data-testid="silent-changes-section"]`

- **WHEN** el usuario desplaza la página hasta que la sección entra en el viewport
- **THEN** las 5 tarjetas quedan visibles y con opacidad completa
- **THEN** la animación no se repite al salir y volver a entrar en el viewport

### Requirement: Respeto a `prefers-reduced-motion`

Con `prefers-reduced-motion: reduce`, la sección y las 5 tarjetas SHALL mostrarse completas e instantáneas, sin animación de entrada ni elementos en bucle.

#### Scenario: Sin animación con prefers-reduced-motion activo

Level: e2e
Route: / (home)
Initial interaction: emular `prefers-reduced-motion: reduce` en el viewport

- **WHEN** el sistema tiene `prefers-reduced-motion: reduce`
- **THEN** la intro y las 5 tarjetas son visibles e instantáneas al cargar
- **THEN** no hay transiciones de opacidad ni traslación visible

### Requirement: Responsive sin desbordamiento

En los viewports 375 / 768 / 1280 px la sección SHALL renderizarse sin scroll horizontal, respetando los tokens `terminal-*` y `font-mono`.

#### Scenario: Sin overflow en móvil

Level: e2e
Route: / (home)
Initial interaction: viewport 375 px de ancho

- **WHEN** se carga la home en viewport de 375 px
- **THEN** `document.documentElement.scrollWidth` es igual a `window.innerWidth`
- **THEN** las 5 tarjetas están apiladas en columna única y visibles

#### Scenario: Grid en tablet y desktop

Level: e2e
Route: / (home)
Initial interaction: viewports 768 px y 1280 px

- **WHEN** se carga la home en viewport ≥768 px
- **THEN** las tarjetas se distribuyen en 2 o más columnas
- **THEN** no hay scroll horizontal

### Requirement: Accesibilidad del contenido

El texto íntegro de la intro y de las 5 tarjetas SHALL estar siempre presente en el DOM y disponible para lectores de pantalla, independientemente del estado de la animación.

#### Scenario: Texto presente antes y después de la animación

Level: unit
Target: app/_components/silent-changes-section.tsx

- **WHEN** se renderiza `SilentChangesSection` con `useReducedMotion` mockeado a `true`
- **THEN** el texto de la intro está en el DOM
- **THEN** el texto de cada una de las 5 tarjetas está en el DOM sin `visibility:hidden` ni `display:none`
