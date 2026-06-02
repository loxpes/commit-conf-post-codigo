## 1. Sección "El arnés" debajo del hero (CA-1)

- [ ] 1.1 RED: test que falla afirmando que existe una sección con un encabezado cuyo nombre
  accesible es "El arnés" y que se renderiza por debajo del hero
- [ ] 1.2 GREEN: crear el componente `app/_components/harness-section.tsx` con el encabezado
  accesible "El arnés" y componerlo en `app/page.tsx` debajo del hero hasta pasar el test
- [ ] 1.3 REFACTOR: limpiar la estructura de la sección con estética terminal (`terminal-*`,
  `font-mono`) dejando los tests en verde

## 2. Bloque de GUÍAS — condicionan ANTES (CA-2)

- [ ] 2.1 RED: test que falla afirmando que el bloque de guías muestra exactamente los 5 textos
  literales "RULES.md", "AGENTS.md", ".editorconfig", "ESLint", "tipos en TypeScript" y su rol ANTES
- [ ] 2.2 GREEN: renderizar el bloque de guías con el título "Guías · condicionan antes" y los 5
  elementos literales hasta pasar el test
- [ ] 2.3 REFACTOR: extraer la lista de guías con `data-testid` estables, tests en verde

## 3. Bloque de SENSORES — verifican DESPUÉS (CA-3)

- [ ] 3.1 RED: test que falla afirmando que el bloque de sensores muestra exactamente los 5 textos
  literales "tests", "type-checker", "linter", "security scan", "gates de CI" y su rol DESPUÉS
- [ ] 3.2 GREEN: renderizar el bloque de sensores con el título "Sensores · verifican después" y los
  5 elementos literales hasta pasar el test
- [ ] 3.3 REFACTOR: extraer la lista de sensores con `data-testid` estables, tests en verde

## 4. Metáfora del carril con agente (CA-4)

- [ ] 4.1 RED: test que falla afirmando la presencia y estructura de un elemento de carril (rail) y
  un elemento "agente" posicionado a lo largo de él (vía `data-testid`)
- [ ] 4.2 GREEN: implementar el carril y el agente con `motion/react`, con animación de recorrido
  desde la zona guías/antes hacia la zona sensores/después (auto-play al entrar en viewport)
- [ ] 4.3 REFACTOR: consolidar la animación del recorrido dejando los tests en verde

## 5. Intro y copy de la sección (CA-1, CA-2, CA-3)

- [ ] 5.1 RED: test que falla afirmando la presencia de la intro breve (1–2 frases) que enmarca el
  arnés = guías (antes) + sensores (después)
- [ ] 5.2 GREEN: añadir la intro breve con copy en español hasta pasar el test

## 6. Responsive y apilado en viewport estrecho (CA-5)

- [ ] 6.1 RED: test que falla afirmando que en viewport estrecho los bloques de guías y sensores se
  apilan en lugar de quedar lado a lado
- [ ] 6.2 GREEN: aplicar utilidades responsive de Tailwind (carril horizontal en desktop / vertical
  en mobile; bloques apilados en estrecho) hasta pasar el test
- [ ] 6.3 Verificar sin overflow horizontal en 375 / 768 / 1280 ampliando el e2e Playwright en
  `tests/e2e/` para la nueva sección

## 7. prefers-reduced-motion (CA-6)

- [ ] 7.1 RED: test que falla afirmando que con `prefers-reduced-motion: reduce` se muestran de
  inmediato guías, sensores y el agente en su posición final del carril, sin animaciones
- [ ] 7.2 GREEN: gatear todas las animaciones (recorrido del agente, entrada) con `useReducedMotion()`
  hasta pasar el test

## 8. Accesibilidad (CA-7)

- [ ] 8.1 RED: test que falla afirmando que el encabezado expone el nombre accesible "El arnés" y que
  las capas decorativas (carril, agente, efectos) son `aria-hidden` sin duplicar el texto de guías y
  sensores
- [ ] 8.2 GREEN: marcar `aria-hidden` las capas decorativas y mantener el texto de guías/sensores en
  nodos semánticos íntegros hasta pasar el test

## 9. Quality gate

- [ ] 9.1 Ejecutar la batería completa en verde: `pnpm exec vitest run`,
  `pnpm exec biome check --write` (solo el diff), `pnpm exec tsc --noEmit`,
  `openspec validate "cc-16-secci-n-el-arn-s-gu" --strict` y la suite Playwright
  (viewports 375 / 768 / 1280)
