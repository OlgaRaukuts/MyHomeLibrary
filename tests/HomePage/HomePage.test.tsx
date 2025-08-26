import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import Homepage from "../../app/HomePage/Homepage";
import { describe, test, expect, vi, beforeEach } from "vitest";
import React from "react";
import { collection, getDocs } from "firebase/firestore";


vi.mock('firebase/firestore', async (importOriginal) => {
  const actual = await importOriginal() as object;
  return {
    ...actual,
    getFirestore: vi.fn(),
    collection: vi.fn(),
    getDocs: vi.fn().mockResolvedValue({ docs: [] }),
  };
});


describe('Homepage component', () => {
    const mockBooks = [
    {
      id: "1",
      book: "React for Beginners",
      author: "Dan Abramov",
      createdAt: { seconds: 100, nanoseconds: 0 },
      moderationStatus: "approved",
    },
    {
      id: "2",
      book: "Learning JavaScript",
      author: "Kyle Simpson",
      createdAt: { seconds: 50, nanoseconds: 0 },
      moderationStatus: "approved",
    },
    {
      id: "3",
      book: "Vue Guide",
      author: "Evan You",
      createdAt: { seconds: 30, nanoseconds: 0 },
      moderationStatus: "pending",
    },
  ];

    beforeEach(() => {
    (collection as unknown as ReturnType<typeof vi.fn>).mockReturnValue({});
    (getDocs as unknown as ReturnType<typeof vi.fn>).mockResolvedValue({
      docs: mockBooks.map((b) => ({
        id: b.id,
        data: () => ({
          book: b.book,
          author: b.author,
          createdAt: b.createdAt,
          moderationStatus: b.moderationStatus,
        }),
      })),
    });
  });

    test("renders header and search field", () => {
    render(<Homepage />);
    expect(screen.getByText("📚 Books to Find")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Search...")).toBeInTheDocument();
  });

  test('loads and displays books in Firestore', async () =>{
    render(<Homepage />);

    await waitFor(() => {
      expect(screen.getByText("React for Beginners")).toBeInTheDocument();
      expect(screen.getByText("Learning JavaScript")).toBeInTheDocument();
    });

    expect(screen.queryByText("Vue Guide")).not.toBeInTheDocument();
  });

  test('filters books using serch', async () => {
   render(<Homepage />);

    await waitFor(() => {
      expect(screen.getByText("React for Beginners")).toBeInTheDocument();
    });

    const searchInput = screen.getByPlaceholderText("Search...");
    fireEvent.change(searchInput, { target: { value: "React" } });

    expect(screen.getByText("React for Beginners")).toBeInTheDocument();
    expect(screen.queryByText("Learning JavaScript")).not.toBeInTheDocument();
  });

  test('displays book createdAt.seconds descending order', async () => {
    render(<Homepage />);
    await waitFor(() => {
      const items = screen.getAllByRole("listitem");
      expect(items[0]).toHaveTextContent("React for Beginners"); // newest first
      expect(items[1]).toHaveTextContent("Learning JavaScript");
    });
  });

    test("handles errors when loading a book", async () => {
    (getDocs as unknown as ReturnType<typeof vi.fn>).mockRejectedValueOnce(new Error("Firestore error"));

    const errorSpy = vi.spyOn(console, "error").mockImplementation(() => {});
    render(<Homepage />);

    await waitFor(() => {
      expect(errorSpy).toHaveBeenCalled();
    });

    errorSpy.mockRestore();
  });

})