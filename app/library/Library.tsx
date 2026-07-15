"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Search from "../components/search/Search";
import AddBook, { BookFormData } from "../AddBook/AddBook";
import BookDetailsCard, { Book } from "../BookDetailsCard/BookDetailsCard";
import {
  collection,
  query,
  orderBy,
  onSnapshot,
  Timestamp,
  addDoc,
} from "firebase/firestore";
import { db } from "../../app/firebase-config/firebase-config";

type SortOption = "titleAZ" | "titleZA" | "dateNewest" | "dateOldest";

export default function Library() {
  const [books, setBooks] = useState<Book[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [sortOption, setSortOption] = useState<SortOption>("dateNewest");
  const [authorFilter, setAuthorFilter] = useState<string>("all");
  const [yearFilter, setYearFilter] = useState<string>("all");

  // 🔹 Real-time Firestore subscription
  useEffect(() => {
    const q = query(collection(db, "books"), orderBy("dateAdded", "desc"));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const fetchedBooks: Book[] = snapshot.docs.map((doc) => {
        const data = doc.data();
        return {
          id: doc.id,
          title: data.title || "Untitled",
          author: data.author || "Unknown",
          year: data.year ?? null,
          description: data.description ?? null,
          dateAdded: data.dateAdded?.toDate ? data.dateAdded.toDate() : new Date(),
        };
      });
      setBooks(fetchedBooks);
    });

    return () => unsubscribe();
  }, []);

  // 🔹 Add a new book (single Firestore write — AddBook calls this via onSubmit)
  const handleAddBook = async (newBook: BookFormData) => {
    try {
      const yearValue = newBook.year?.trim()
        ? isNaN(Number(newBook.year))
          ? null
          : Number(newBook.year)
        : null;

      const newBookData = {
        title: newBook.title.trim() || "Untitled",
        author: newBook.author.trim() || "Unknown",
        year: yearValue,
        isbn: newBook.isbn?.trim() || null,
        description: newBook.description?.trim() || null,
        dateAdded: Timestamp.fromDate(new Date()),
      };

      await addDoc(collection(db, "books"), newBookData);
    } catch (error) {
      console.error("Error adding book:", error);
      throw error; // re-throw so AddBook can show error feedback
    }
  };

  // 🔹 Sorting
  const sortedBooks = [...books].sort((a, b) => {
    switch (sortOption) {
      case "titleAZ":
        return a.title.localeCompare(b.title);
      case "titleZA":
        return b.title.localeCompare(a.title);
      case "dateOldest":
        return new Date(a.dateAdded).getTime() - new Date(b.dateAdded).getTime();
      case "dateNewest":
      default:
        return new Date(b.dateAdded).getTime() - new Date(a.dateAdded).getTime();
    }
  });

  // 🔹 Filters
  const authors = Array.from(new Set(books.map((b) => b.author))).sort();
  const years = Array.from(
    new Set(books.map((b) => b.year).filter((y): y is number => y != null))
  ).sort((a, b) => a - b);

  const filteredBooks = sortedBooks.filter((book) => {
    const matchesSearch =
      book.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      book.author.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesAuthor = authorFilter === "all" || book.author === authorFilter;
    const matchesYear = yearFilter === "all" || String(book.year) === yearFilter;
    return matchesSearch && matchesAuthor && matchesYear;
  });

  const recentBooks = books
    .slice()
    .sort((a, b) => new Date(b.dateAdded).getTime() - new Date(a.dateAdded).getTime())
    .slice(0, 5);

  const totalBooks = books.length;

  return (
    <main className="p-8 max-w-7xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">📚 My Library</h1>

      {/* Search/Add Book section */}
      <section className="mb-8">
        <h2 className="text-xl font-semibold mb-3">Search / Add a Book</h2>
        <AddBook onSubmit={handleAddBook} />
      </section>

      {books.length > 0 && (
        <section className="mt-8 space-y-8">
          {/* Recently Added */}
          <div>
            <h2 className="text-2xl font-semibold mb-4">5 Most Recently Added</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
              {recentBooks.map((book) => (
                <Link key={book.id} href={`/library/${book.id}`}>
                  <BookDetailsCard book={book} />
                </Link>
              ))}
            </div>
          </div>

          {/* All Books */}
          <div>
            <h2 className="text-2xl font-semibold mb-4">All Books</h2>

            {/* Filter and Sort Control Panel */}
            <div className="bg-base-100 p-4 rounded-xl shadow-sm border border-base-300 flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
              <div className="flex flex-wrap items-center gap-3">
                <Search value={searchQuery} onChange={setSearchQuery} />
                
                <div className="form-control">
                  <select
                    className="select select-bordered select-sm w-full max-w-xs"
                    value={authorFilter}
                    onChange={(e) => setAuthorFilter(e.target.value)}
                  >
                    <option value="all">All Authors</option>
                    {authors.map((author) => (
                      <option key={author} value={author}>
                        {author}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="form-control">
                  <select
                    className="select select-bordered select-sm w-full max-w-xs"
                    value={yearFilter}
                    onChange={(e) => setYearFilter(e.target.value)}
                  >
                    <option value="all">All Years</option>
                    {years.map((year) => (
                      <option key={year} value={String(year)}>
                        {year}
                      </option>
                    ))}
                  </select>
                </div>

                {(searchQuery || authorFilter !== "all" || yearFilter !== "all") && (
                  <button 
                    onClick={() => {
                      setSearchQuery("");
                      setAuthorFilter("all");
                      setYearFilter("all");
                    }}
                    className="btn btn-ghost btn-sm text-error"
                  >
                    Clear Filters
                  </button>
                )}
              </div>

              <div className="flex items-center gap-2">
                <span className="text-sm font-medium text-gray-500">Sort by:</span>
                <select
                  className="select select-bordered select-sm"
                  value={sortOption}
                  onChange={(e) => setSortOption(e.target.value as SortOption)}
                >
                  <option value="dateNewest">Date Added (Newest)</option>
                  <option value="dateOldest">Date Added (Oldest)</option>
                  <option value="titleAZ">Title (A-Z)</option>
                  <option value="titleZA">Title (Z-A)</option>
                </select>
              </div>
            </div>

            <div className="overflow-x-auto mt-4">
              <table className="table w-full border border-base-300 rounded-lg">
                <thead>
                  <tr>
                    <th
                      className="cursor-pointer hover:bg-base-200 transition"
                      onClick={() =>
                        setSortOption(sortOption === "titleAZ" ? "titleZA" : "titleAZ")
                      }
                    >
                      Title {sortOption === "titleAZ" ? "▲" : sortOption === "titleZA" ? "▼" : ""}
                    </th>
                    <th>Author</th>
                    <th>Year</th>
                    <th
                      className="cursor-pointer hover:bg-base-200 transition"
                      onClick={() =>
                        setSortOption(sortOption === "dateNewest" ? "dateOldest" : "dateNewest")
                      }
                    >
                      Date Added {sortOption === "dateNewest" ? "▼" : sortOption === "dateOldest" ? "▲" : ""}
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {filteredBooks.map((book) => (
                    <tr key={book.id} className="hover">
                      <td>
                        <Link href={`/library/${book.id}`} className="font-semibold text-primary hover:underline">
                          {book.title}
                        </Link>
                      </td>
                      <td>{book.author}</td>
                      <td>{book.year ?? "—"}</td>
                      <td>{new Date(book.dateAdded).toLocaleDateString()}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Total count */}
            {totalBooks > 0 && (
              <div className="mt-6 bg-base-100 border border-base-300 p-4 rounded-lg">
                <h3 className="font-semibold">TOTAL</h3>
                <p data-testid="total-books">
                  You have <span className="font-bold text-primary">{totalBooks}</span> book
                  {totalBooks !== 1 && "s"} in total.
                </p>
              </div>
            )}
          </div>
        </section>
      )}
    </main>
  );
}
