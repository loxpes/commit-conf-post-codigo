## 1. Tests en rojo (RED)

- [ ] 1.1 Crear `app/_components/silent-changes-section.test.tsx` con test unit que verifica `data-testid="silent-changes-section"` y las 5 tarjetas `silent-change-card-1`…`5` con su texto exacto (CA-1)
- [ ] 1.2 Añadir test unit que verifica que el texto de la intro y las 5 tarjetas está en el DOM con `useReducedMotion` mockeado a `true` (CA-5)
- [ ] 1.3 Crear `tests/e2e/silent-changes.spec.ts` con escenario Playwright que desplaza hasta la sección y verifica que las 5 tarjetas quedan visibles en viewports 375/768/1280 (CA-2, CA-4)
- [ ] 1.4 Verificar que `pnpm exec vitest run` falla en rojo con los tests nuevos

## 2. Implementación de componentes (GREEN)

- [ ] 2.1 Crear `app/_components/silent-changes-section.tsx` con el sub-componente `SilentChangeCard` y los 5 pilares con sus textos exactos
- [ ] 2.2 Añadir animación stagger con `motion/react` (`whileInView`, `viewport={{ once: true }}`), desactivada vía `useReducedMotion()` (CA-2, CA-3)
- [ ] 2.3 Aplicar layout responsive con grid Tailwind: `grid-cols-1 sm:grid-cols-2 lg:grid-cols-3` y tokens `terminal-*` y `font-mono` (CA-4)
- [ ] 2.4 Montar `<SilentChangesSection />` en `app/page.tsx` tras el hero
- [ ] 2.5 Verificar que `pnpm exec vitest run` pasa en verde

## 3. Calidad y validación (REFACTOR + gate)

- [ ] 3.1 `pnpm exec biome check --write` — sin errores en los ficheros del diff
- [ ] 3.2 `pnpm exec tsc --noEmit` — sin errores de tipos
- [ ] 3.3 `openspec validate cc-15-cc-15-cinco-cambios-silenciosos --strict` — pasa limpio
- [ ] 3.4 Ejecutar `pnpm exec playwright test tests/e2e/silent-changes.spec.ts` — escenarios e2e en verde
