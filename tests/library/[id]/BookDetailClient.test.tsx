import { render, screen } from "@testing-library/react";
import { describe, test, expect, beforeEach, vi } from "vitest";
import BookDetailClient from "../../../app/library/[id]/BookDetailClient";
import { doc, getDoc } from "firebase/firestore";

// Mock `useParams` from next/navigation
vi.mock("next/navigation", () => ({
  useParams: vi.fn(),
}));

// Mock `firebase/firestore`
vi.mock("firebase/firestore", async (importOriginal) => {
  const actual = await importOriginal() as object;
  return {
    ...actual,
    doc: vi.fn(),
    getDoc: vi.fn(),
  };
});

import { useParams } from "next/navigation";

describe("BookDetailClient", () => {
  const mockBook = {
    title: "Dune",
    author: "Frank Herbert",
    year: 1965,
    dateAdded: { toDate: () => new Date("2023-08-10T00:00:00Z") },
    description: "A science fiction classic.",
  };

  beforeEach(() => {
    vi.clearAllMocks();
  });

  test("shows 'Book not found' if book ID does not match any saved books", async () => {
    (useParams as any).mockReturnValue({ id: "99" });
    (getDoc as any).mockResolvedValue({
      exists: () => false,
    });

    render(<BookDetailClient />);

    expect(await screen.findByText("Book not found.")).toBeInTheDocument();
  });

  test("renders book details if book is found", async () => {
    (useParams as any).mockReturnValue({ id: "1" });
    (getDoc as any).mockResolvedValue({
      exists: () => true,
      id: "1",
      data: () => mockBook,
    });

    render(<BookDetailClient />);

    const titles = await screen.findAllByText("Dune");
    expect(titles.length).toBeGreaterThan(0);
    expect(screen.getAllByText(/Frank Herbert/).length).toBeGreaterThan(0);
    expect(screen.getAllByText(/1965/).length).toBeGreaterThan(0);
    expect(screen.getByText(/A science fiction classic./)).toBeInTheDocument();
    expect(screen.getByText(/Added to Library:/)).toBeInTheDocument();
  });

  test("shows 'Book not found' if no books exist", async () => {
    (useParams as any).mockReturnValue({ id: "1" });
    (getDoc as any).mockResolvedValue({
      exists: () => false,
    });

    render(<BookDetailClient />);

    expect(await screen.findByText("Book not found.")).toBeInTheDocument();
  });
});
