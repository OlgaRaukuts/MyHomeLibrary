"use client";
import "./homepage.css";
import React, { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebase-config/firebase-config";


interface BookItem {
  id: string;
  bid: string;
  book: string;
  price: string;
  author: string;
  condition: string;
  uploadedImages: string[];
  createdAt?: {
    seconds: number;
    nanoseconds: number;
  };
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
          .sort(
            (a, b) => (b.createdAt?.seconds || 0) - (a.createdAt?.seconds || 0)
          );
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
   <div className="BookListSection">
    <h1>📚Books to find</h1>
    <input
      type="text"
      placeholder="Search..."
      value={searchQuery}
      onChange={(e) => setSearchQuery(e.target.value)}
    />
    <ul>
      {filteredBooks.map((book) => (
        <li key={book.id}>
          <strong>{book.book}</strong> by {book.author} — {book.price}€
        </li>
      ))}
    </ul>
  </div>
  );
};

export default Homepage;
