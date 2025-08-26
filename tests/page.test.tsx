
import React from "react";
import { render, screen } from "@testing-library/react";
import { vi } from "vitest";

vi.mock("../app/HomePage/Homepage", () => ({
  default: () => <div data-testid="home-page">HomePage Component</div>,
}));


import HomePage from "../app/HomePage/Homepage";

describe("Home component", () => {
  test("renders the HomePage component", () => {
    render(<HomePage />);
    const homePage = screen.getByTestId("home-page");
    expect(homePage).toBeInTheDocument();
    expect(homePage).toHaveTextContent("HomePage Component");
  });
});
