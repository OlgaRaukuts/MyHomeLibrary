"use client";
import React, { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebase-config/firebase-config";

interface BookItem {
  id: string;
  book: string;
  author: string;
  createdAt?: { seconds: number; nanoseconds: number };
  moderationStatus: string;
}

const Homepage = () => {
  const [books, setBooks] = useState<BookItem[]>([]);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const booksRef = collection(db, "books");
        const snapshot = await getDocs(booksRef);
        const booksData: BookItem[] = snapshot.docs
          .map((doc) => ({ id: doc.id, ...doc.data() } as BookItem))
          .filter((book) => book.moderationStatus === "approved")
          .sort((a, b) => (b.createdAt?.seconds || 0) - (a.createdAt?.seconds || 0));
        setBooks(booksData);
      } catch (error) {
        console.error("Error fetching books:", error);
      }
    };
    fetchBooks();
  }, []);

  const filteredBooks = books.filter((book) =>
    book.book.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="p-8 max-w-4xl mx-auto space-y-6">
      <h1 className="text-3xl font-bold mb-4">📚 Books to Find</h1>
      <input
        type="text"
        placeholder="Search..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        className="input input-bordered w-full max-w-md mb-4"
      />
      <ul className="space-y-3">
        {filteredBooks.map((book) => (
          <li key={book.id} className="p-4 border rounded-lg hover:shadow-md transition">
            <strong className="text-lg">{book.book}</strong> by {book.author}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Homepage;
