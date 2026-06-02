import "@testing-library/jest-dom/vitest";

// jsdom does not implement IntersectionObserver, which `motion`'s `useInView`
// (used by the cinco-cambios section) relies on. Provide a no-op stub so
// components that observe their viewport position can mount under test.
if (!("IntersectionObserver" in globalThis)) {
  class IntersectionObserverStub implements IntersectionObserver {
    readonly root: Element | Document | null = null;
    readonly rootMargin: string = "";
    readonly scrollMargin: string = "";
    readonly thresholds: ReadonlyArray<number> = [];

    observe(): void {}
    unobserve(): void {}
    disconnect(): void {}
    takeRecords(): IntersectionObserverEntry[] {
      return [];
    }
  }

  Object.defineProperty(globalThis, "IntersectionObserver", {
    writable: true,
    configurable: true,
    value: IntersectionObserverStub,
  });
}
