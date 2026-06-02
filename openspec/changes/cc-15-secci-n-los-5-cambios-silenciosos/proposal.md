## Why

La landing de la charla «Bienvenidos a la era post-código» necesita una sección
que condense el mensaje central: los cinco cambios silenciosos que ya están
ocurriendo en el desarrollo de software. Hoy ese mensaje no tiene un lugar
propio en la home; sin él, el relato de la charla queda incompleto entre el hero
y el resto del contenido.

## What Changes

- Se añade a la home una sección «Los 5 cambios silenciosos» con una frase de
  intro y cinco tarjetas-pilar (número 01–05, pilar y frase), con copy literal
  fijado por negocio.
- Las cinco tarjetas aparecen de forma escalonada (stagger) al entrar la sección
  en el viewport, una sola vez, usando `motion/react`.
- La sección respeta `prefers-reduced-motion`: con movimiento reducido, intro y
  tarjetas se muestran completas e instantáneas, sin animación de entrada ni
  bucles.
- El layout es responsive (1 columna en móvil, varias columnas en pantallas
  grandes) sin desbordamiento horizontal en 375 / 768 / 1280 px, con los tokens
  `terminal-*` y `font-mono`.
- El texto íntegro de la intro y de las tarjetas está siempre presente en el DOM
  para lectores de pantalla, con independencia del estado de la animación.

## Capabilities

### New Capabilities
- `landing-silent-changes`: la sección «Los 5 cambios silenciosos» de la home —
  su contenido literal, su aparición escalonada al hacer scroll, el respeto a
  `prefers-reduced-motion`, su comportamiento responsive y su accesibilidad.

### Modified Capabilities
<!-- Ninguna: no cambian requisitos de capacidades existentes. -->

## Impact

- **Código:** nuevo componente de sección en `app/_components/` (p. ej.
  `silent-changes-section.tsx`) más un sub-componente de tarjeta, montado en
  `app/page.tsx` siguiendo la convención de `hero-title.tsx`.
- **Dependencias:** `motion/react` (ya presente en el harness); sin nuevas
  dependencias.
- **Tests:** componente (Vitest + Testing Library) para contenido, accesibilidad
  y `prefers-reduced-motion`; e2e/visual (Playwright) para el stagger al hacer
  scroll y el responsive en los tres viewports.
- **APIs/datos:** ninguno (sitio estático de marketing).
