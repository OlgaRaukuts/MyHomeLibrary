import { render, screen } from "@testing-library/react";
import { describe, test, expect, vi } from "vitest";
import LibraryPage from "@library/Library";

vi.mock("@library/Library", () => ({
  default: vi.fn(() => <div data-testid="library-component">Mocked Library</div>),
}));

describe("LibraryPage", () => {
  test("renders the Library component", () => {
    render(<LibraryPage />);

    // Verify that the mocked Library component is rendered
    expect(screen.getByTestId("library-component")).toBeInTheDocument();
    expect(screen.getByText("Mocked Library")).toBeInTheDocument();
  });
});
