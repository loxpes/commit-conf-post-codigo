## Context

La landing post-código muestra la sección hero y a continuación las secciones de contenido de la charla. CC-15 introduce la sección «Los 5 cambios silenciosos», que son los pilares del mensaje: LENGUAJES, FRAMEWORKS, ESCALA, PRODUCTO y OFICIO.

El proyecto ya usa `motion/react` (añadido en `7a0ab70`). El patrón de componente de sección sigue `when-to-use-section.tsx`. No existe `doc/design/mockups/` para esta sección; el diseño se basa en los tokens `terminal-*`.

## Goals / Non-Goals

**Goals:**
- Componente `SilentChangesSection` aislado y autocontenido.
- Animación stagger con `motion/react` (`whileInView`, `once: true`).
- `useReducedMotion()` para deshabilitar animaciones cuando el sistema lo exige.
- Layout responsive con tokens del design system existente.
- Accesibilidad: texto completo siempre en DOM.

**Non-Goals:**
- No se modifica el hero ni otras secciones.
- No se añaden mockups ni nuevos tokens de diseño.
- No se implementa i18n.

## Decisions

### 1. Estructura de componentes

`SilentChangesSection` (componente raíz) + `SilentChangeCard` (sub-componente de tarjeta). Se sigue el patrón de `hero-title.tsx` y `when-to-use-section.tsx`: componentes en `app/_components/`, sin estado global.

**Alternativa descartada:** Un único componente con todo inline → dificulta los tests por `data-testid` individuales de cada tarjeta.

### 2. Animación con stagger

`motion/react` con `variants` en el contenedor (stagger `0.1s` entre hijos) y `whileInView` + `viewport={{ once: true }}`. El hook `useReducedMotion()` desactiva las transiciones.

**Alternativa descartada:** CSS `@keyframes` con `animation-delay` → no integra con `useReducedMotion` de forma limpia y no resuelve el `once: true`.

### 3. Layout responsive

Grid Tailwind: `grid-cols-1` en móvil, `sm:grid-cols-2` en 768 px, `lg:grid-cols-3` en ≥1024 px. Las 5 tarjetas caben sin desbordamiento en cualquier viewport (la última fila puede quedar con 1-2 tarjetas centradas en desktop).

**Alternativa descartada:** Flexbox con `flex-wrap` → más difícil controlar el centrado de la última fila y el gap consistente.

### 4. Accesibilidad

El texto de la intro y de cada tarjeta vive en el DOM con normalidad (no en `aria-label` ni en capas ocultas). La animación actúa sobre opacidad/traslación del wrapper, nunca sobre `visibility:hidden` o `display:none`.

## Risks / Trade-offs

- [Riesgo] `motion/react` añade peso al bundle → Mitigación: ya es dependencia del proyecto; impacto mínimo.
- [Trade-off] Grid de 3 columnas en ≥1024 px deja la 5ª tarjeta sola en la segunda fila → aceptable dado el diseño de terminal minimalista; el auditor de diseño valida en tester.
