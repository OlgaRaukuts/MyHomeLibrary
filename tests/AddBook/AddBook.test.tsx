import { render, screen } from "@testing-library/react";
import AddBook from "../../app/AddBook/AddBook";
import userEvent from "@testing-library/user-event";
import { describe, test, expect, vi, beforeEach } from "vitest";

describe("AddBook component", () => {
  const mockSubmit = vi.fn();

  beforeEach(() => {
    mockSubmit.mockClear();
  });

  test("renders required inputs and buttons", () => {
    render(<AddBook onSubmit={mockSubmit} />);

    expect(screen.getByPlaceholderText("Book Title")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Author (optional)")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /Add a Book/i })).toBeInTheDocument();
  });

  test("updates form fields when user types something", async () => {
    render(<AddBook onSubmit={mockSubmit} />);

    const titleInput = screen.getByPlaceholderText("Book Title") as HTMLInputElement;
    const authorInput = screen.getByPlaceholderText("Author (optional)") as HTMLInputElement;

    await userEvent.type(titleInput, "The Hobbit");
    await userEvent.type(authorInput, "J.R.R. Tolkien");

    expect(titleInput.value).toBe("The Hobbit");
    expect(authorInput.value).toBe("J.R.R. Tolkien");
  });

  test("conditionally renders ISBN and Year inputs when title is filled", async () => {
    render(<AddBook onSubmit={mockSubmit} />);

    expect(screen.queryByPlaceholderText("ISBN")).not.toBeInTheDocument();
    expect(screen.queryByPlaceholderText("Year")).not.toBeInTheDocument();

    await userEvent.type(screen.getByPlaceholderText("Book Title"), "Book");

    expect(screen.getByPlaceholderText("ISBN")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Year")).toBeInTheDocument();
  });

  test("calls onSubmit with form data when valid inputs are provided", async () => {
    render(<AddBook onSubmit={mockSubmit} />);

    await userEvent.type(screen.getByPlaceholderText("Book Title"), "1984");
    await userEvent.type(screen.getByPlaceholderText("Author (optional)"), "George Orwell");

    await userEvent.click(screen.getByRole("button", { name: /Add a Book/i }));

    expect(mockSubmit).toHaveBeenCalledTimes(1);
    expect(mockSubmit).toHaveBeenCalledWith({
      title: "1984",
      author: "George Orwell",
      isbn: "",
      year: "",
      description: "",
    });
  });

  test("prevents submission and shows error if title is missing", async () => {
    render(<AddBook onSubmit={mockSubmit} />);

    // Fill with spaces to bypass HTML5 required attribute but fail .trim()
    await userEvent.type(screen.getByPlaceholderText("Book Title"), "   ");

    await userEvent.click(screen.getByRole("button", { name: /Add a Book/i }));

    expect(screen.getByText("Please enter at least a book title.")).toBeInTheDocument();
    expect(mockSubmit).not.toHaveBeenCalled();
  });

  test("clears form fields after successful submit", async () => {
    render(<AddBook onSubmit={mockSubmit} />);

    const titleInput = screen.getByPlaceholderText("Book Title") as HTMLInputElement;
    const authorInput = screen.getByPlaceholderText("Author (optional)") as HTMLInputElement;

    await userEvent.type(titleInput, "Dune");
    await userEvent.type(authorInput, "Frank Herbert");
    await userEvent.click(screen.getByRole("button", { name: /Add a Book/i }));

    expect(titleInput.value).toBe("");
    expect(authorInput.value).toBe("");
  });
});