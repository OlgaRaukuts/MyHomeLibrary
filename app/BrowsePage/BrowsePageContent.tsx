"use client";
import React, { useState, useEffect } from "react";
import "./browsepage.css";
import Header from "../components/header/header";
import Footer from "../components/footer/footer";
import { db } from "../firebase-config/firebase-config";
import { collection, getDocs } from "firebase/firestore";

interface Book {
  id: string;
  bid: string;
  book: string;
  author: string;
  price: number;
  condition: string;
  category: string;
  isbnnumber: string;
  publisher: string;
  publishedate: string; // предполагаю, что тут хранится год или дата
  location: string;
  pagescount: number;
  tags: string[];
  uploadedImages: string[];
  createdAt: string;
  moderationStatus: string;
}

const BrowsePageContent: React.FC = () => {
  const [books, setBooks] = useState<Book[]>([]);
  const [filteredBooks, setFilteredBooks] = useState<Book[]>([]);
  const [loading, setLoading] = useState(true);

  const [author, setAuthor] = useState("");
  const [title, setTitle] = useState("");
  const [year, setYear] = useState("");

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const booksCollection = collection(db, "books");
        const bookSnapshot = await getDocs(booksCollection);
        const bookList = bookSnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        })) as Book[];

        const approvedBooks = bookList.filter(
          (book) => book.moderationStatus === "approved"
        );

        setBooks(approvedBooks);
        setFilteredBooks(approvedBooks);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching books:", error);
        setLoading(false);
      }
    };

    fetchBooks();
  }, []);

  const handleFilter = () => {
    let updatedBooks = books.filter((book) => {
      const matchesAuthor =
        author === "" || book.author.toLowerCase().includes(author.toLowerCase());
      const matchesTitle =
        title === "" || book.book.toLowerCase().includes(title.toLowerCase());
      const matchesYear =
        year === "" || book.publishedate.includes(year);

      return matchesAuthor && matchesTitle && matchesYear;
    });

    setFilteredBooks(updatedBooks);
  };

  return (
    <div>
      <Header />
      <div className="browsepagecontainer">
        <div className="fliteroptions">
          <label>AUTHOR</label>
          <input
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
            placeholder="Enter author name"
          />

          <label>TITLE</label>
          <input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Enter book title"
          />

          <label>YEAR</label>
          <input
            value={year}
            onChange={(e) => setYear(e.target.value)}
            placeholder="Enter year"
          />

          <br />
          <button onClick={handleFilter}>FILTER</button>
        </div>

        <div className="bookscontainer">
          {loading ? (
            <p>Loading books...</p>
          ) : filteredBooks.length > 0 ? (
            filteredBooks.map((book) => (
              <div key={book.id} className="book-item">
                <p>
                  <strong>{book.book}</strong> — {book.author} ({book.publishedate})
                </p>
              </div>
            ))
          ) : (
            <p>No books found</p>
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default BrowsePageContent;