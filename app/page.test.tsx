import { render, screen, within } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import HomePage from "./page";

const SUBTITLE = "Cómo la IA está reescribiendo nuestro oficio mientras lo vivimos.";

describe("HomePage", () => {
  it("renders the post-código hero heading", () => {
    render(<HomePage />);

    const heading = screen.getByRole("heading", {
      level: 1,
      name: "Bienvenidos a la era post-código",
    });

    expect(heading).toBeInTheDocument();
  });

  it("renders the brand footer", () => {
    render(<HomePage />);

    expect(screen.getByText("commit · post-código · jorge martín")).toBeInTheDocument();
  });

  it("should render a full-viewport terminal hero with the exact subtitle when HomePage renders", () => {
    render(<HomePage />);

    const hero = screen.getByTestId("hero");
    expect(hero).toHaveClass("min-h-dvh");
    expect(within(hero).getByText("$ commit --conf")).toBeInTheDocument();
    expect(within(hero).getByText(SUBTITLE)).toBeInTheDocument();
  });

  it("should expose a stable heading name and a visible typing caret when HomePage renders", () => {
    render(<HomePage />);

    expect(
      screen.getByRole("heading", {
        level: 1,
        name: "Bienvenidos a la era post-código",
      }),
    ).toBeInTheDocument();

    const hero = screen.getByTestId("hero");
    expect(within(hero).getByTestId("hero-caret")).toBeInTheDocument();
  });

  it("should render the final state without a typing caret when prefers-reduced-motion matches", () => {
    const original = window.matchMedia;
    window.matchMedia = vi.fn().mockImplementation((query: string) => ({
      matches: query === "(prefers-reduced-motion: reduce)",
      media: query,
      onchange: null,
      addListener: vi.fn(),
      removeListener: vi.fn(),
      addEventListener: vi.fn(),
      removeEventListener: vi.fn(),
      dispatchEvent: vi.fn(),
    }));

    try {
      render(<HomePage />);

      expect(
        screen.getByRole("heading", {
          level: 1,
          name: "Bienvenidos a la era post-código",
        }),
      ).toBeInTheDocument();
      expect(screen.getByText(SUBTITLE)).toBeInTheDocument();
      expect(screen.queryByTestId("hero-caret")).not.toBeInTheDocument();
    } finally {
      window.matchMedia = original;
    }
  });

  it("should render an accessible scroll indicator at the foot of the hero when HomePage renders", () => {
    render(<HomePage />);

    expect(screen.getByLabelText(/más contenido|desplázate|scroll/i)).toBeInTheDocument();
  });
});
