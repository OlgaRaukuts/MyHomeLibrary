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
  const [confirmation, setConfirmation] = useState<string | null>(null);
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

  // 🔹 Add a new book
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
        description: newBook.description?.trim() || null,
        dateAdded: Timestamp.fromDate(new Date()), // Firestore Timestamp
      };

      const docRef = await addDoc(collection(db, "books"), newBookData);

      setConfirmation(`"${newBookData.title}" by ${newBookData.author} added successfully!`);
      setTimeout(() => setConfirmation(null), 3000);
    } catch (error) {
      console.error("Error adding book:", error);
      setConfirmation("Failed to add book. Please try again.");
      setTimeout(() => setConfirmation(null), 3000);
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

      {/* Book form */}
      <AddBook onSubmit={handleAddBook} />

      {/* Confirmation message */}
      {confirmation && <p className="text-green-600 my-2">{confirmation}</p>}

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
            <Search value={searchQuery} onChange={setSearchQuery} />

            <div className="overflow-x-auto mt-4">
              <table className="table-auto w-full border border-gray-300 rounded-lg">
                <thead className="bg-gray-100">
                  <tr>
                    <th
                      className="px-4 py-2 cursor-pointer"
                      onClick={() =>
                        setSortOption(sortOption === "titleAZ" ? "titleZA" : "titleAZ")
                      }
                    >
                      Title {sortOption === "titleAZ" ? "▲" : sortOption === "titleZA" ? "▼" : ""}
                    </th>
                    <th className="px-4 py-2">
                      Author
                      <select
                        className="ml-2 border rounded p-1"
                        value={authorFilter}
                        onChange={(e) => setAuthorFilter(e.target.value)}
                      >
                        <option value="all">All</option>
                        {authors.map((author) => (
                          <option key={author} value={author}>
                            {author}
                          </option>
                        ))}
                      </select>
                    </th>
                    <th className="px-4 py-2">
                      Year
                      <select
                        className="ml-2 border rounded p-1"
                        value={yearFilter}
                        onChange={(e) => setYearFilter(e.target.value)}
                      >
                        <option value="all">All</option>
                        {years.map((year) => (
                          <option key={year} value={String(year)}>
                            {year}
                          </option>
                        ))}
                      </select>
                    </th>
                    <th
                      className="px-4 py-2 cursor-pointer"
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
                    <tr key={book.id} className="border-t hover:bg-gray-50 transition">
                      <td className="px-4 py-2">
                        <Link href={`/library/${book.id}`} className="text-blue-600 hover:underline">
                          {book.title}
                        </Link>
                      </td>
                      <td className="px-4 py-2">{book.author}</td>
                      <td className="px-4 py-2">{book.year ?? "—"}</td>
                      <td className="px-4 py-2">{new Date(book.dateAdded).toLocaleDateString()}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Total count */}
            {totalBooks > 0 && (
              <div className="mt-6 bg-gray-50 p-4 rounded-lg">
                <h3 className="font-semibold">TOTAL</h3>
                <p>
                  You have <span className="font-bold">{totalBooks}</span> book
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
