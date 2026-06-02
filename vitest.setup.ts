import "@testing-library/jest-dom/vitest";

// jsdom does not implement IntersectionObserver, which `motion/react`'s
// `whileInView` calls at mount (it throws a ReferenceError otherwise). Provide
// a no-op stub so scroll-triggered components render in the test environment;
// the full textual content is asserted at unit level regardless of viewport
// state, and the actual in-view reveal/stagger is covered by the Playwright
// e2e suite in a real browser.
class IntersectionObserverStub {
  readonly root: Element | null = null;
  readonly rootMargin: string = "";
  readonly thresholds: ReadonlyArray<number> = [];
  observe(): void {}
  unobserve(): void {}
  disconnect(): void {}
  takeRecords(): IntersectionObserverEntry[] {
    return [];
  }
}

globalThis.IntersectionObserver =
  IntersectionObserverStub as unknown as typeof IntersectionObserver;
