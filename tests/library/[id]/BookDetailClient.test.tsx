import { render, screen } from "@testing-library/react";
import { describe, test, expect, beforeEach, vi } from "vitest";
import BookDetailClient from "@library/[id]/BookDetailClient";
import { Book} from '@bookdetails/BookDetailsCard';

// Mock `useParams` from next/navigation
vi.mock("next/navigation", () => ({
  useParams: vi.fn(),
}));

// Get mocked `useParams`
import { useParams } from "next/navigation";

describe("BookDetailClient", () => {
  const mockBook: Book = {
    id: "1",
    title: "Dune",
    author: "Frank Herbert",
    year: 1965,
    dateAdded: "2023-08-10T00:00:00Z",
    description: "A science fiction classic.",
  };

  beforeEach(() => {
    // Reset mocks and localStorage before each test
    vi.clearAllMocks();
    localStorage.clear();
  });

  test("shows 'Book not found' if book ID does not match any saved books", () => {
    (useParams as vi.Mock).mockReturnValue({ id: "99" });
    localStorage.setItem("libraryBooks", JSON.stringify([mockBook]));

    render(<BookDetailClient />);

    expect(screen.getByText("Book not found.")).toBeInTheDocument();
  });

  test("renders book details if book is found in localStorage", () => {
    (useParams as vi.Mock).mockReturnValue({ id: "1" });
    localStorage.setItem("libraryBooks", JSON.stringify([mockBook]));

    render(<BookDetailClient />);

    expect(screen.getByText("Dune")).toBeInTheDocument();
    expect(screen.getByText(/Frank Herbert/)).toBeInTheDocument();
    expect(screen.getByText(/1965/)).toBeInTheDocument();
    expect(screen.getByText(/A science fiction classic./)).toBeInTheDocument();
    expect(screen.getByText(/Date Added:/)).toBeInTheDocument();
  });

  test("shows 'Book not found' if no books exist in localStorage", () => {
    (useParams as vi.Mock).mockReturnValue({ id: "1" });
    localStorage.setItem("libraryBooks", JSON.stringify([]));

    render(<BookDetailClient />);

    expect(screen.getByText("Book not found.")).toBeInTheDocument();
  });
});
