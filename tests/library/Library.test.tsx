import { render, screen, fireEvent } from "@testing-library/react";
import { describe, test, expect, vi, beforeEach } from "vitest";
import Library from "../../app/library/Library";

vi.mock("../../app/AddBook/AddBook", () => ({
  default: vi.fn(({ onSubmit }) => (
    <button
      data-testid="add-book"
      onClick={(e) =>
        onSubmit(
          e as any,
          { title: "Test Book", author: "Test Author", year: "2023", description: "desc" }
        )
      }
    >
      Add Book
    </button>
  )),
}));

vi.mock("../../app/BookDetailsCard/BookDetailsCard", () => ({
  default: vi.fn(({ book }) => <div data-testid="book-card">{book.title}</div>),
}));

vi.mock("../../app/components/search/Search", () => ({
  default: vi.fn(({ value, onChange }) => (
    <input
      data-testid="search"
      value={value}
      onChange={(e) => onChange(e.target.value)}
    />
  )),
}));

vi.mock("next/link", () => ({
  default: ({ children }: { children: React.ReactNode }) => <div>{children}</div>,
}));

beforeEach(() => {
  localStorage.clear();
});

describe("Library component", () => {
  test("renders Library component with no books", () => {
    render(<Library />);
    expect(screen.getByText("Books in My Library")).toBeInTheDocument();
    expect(screen.queryByTestId("book-card")).toBeNull();
  });

  test("adds a book and shows confirmation", async () => {
    render(<Library />);
    const addBtn = screen.getByTestId("add-book");
    fireEvent.click(addBtn);

    expect(await screen.findByTestId("book-card")).toHaveTextContent("Test Book");
    expect(screen.getByTestId("book-card")).toHaveTextContent("Test Book");
  });

  test("saves book to localStorage", async () => {
    render(<Library />);
    const addBtn = screen.getByTestId("add-book");
    fireEvent.click(addBtn);

    const stored = JSON.parse(localStorage.getItem("libraryBooks") || "[]");
    expect(stored).toHaveLength(1);
    expect(stored[0].title).toBe("Test Book");
  });

  test("renders total books count", async () => {
    render(<Library />);
    const addBtn = screen.getByTestId("add-book");
    fireEvent.click(addBtn);

    expect(await screen.findByTestId("total-books")).toHaveTextContent("You have 1 book in total");
  });
});
