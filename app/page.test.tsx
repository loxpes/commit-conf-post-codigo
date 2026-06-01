import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import HomePage from "./page";

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
});
