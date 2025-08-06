"use client";
import "./homepage.css";
import React, { useEffect, useState } from "react";
import Category from "../../components/category/category";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../../firebase-config/firebase-config";
import Link from "next/link";
import Search from "../../components/search/search";

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
    <>
      <div className="HeroSection">
        <div className="hero1">
          <img src="/hero1.png" alt="hero" />
        </div>
        <div className="HeroRight">
          <div className="herotop">
            <center>
              <h1>50% OFF</h1>
              <h2>BROWSE USED BOOKS</h2>
              <h2>FOR THE BEST PRICE</h2>
            </center>
          </div>
          <div className="herobottom">
            <h1>SELL YOUR BOOKS</h1>
            <button>CONTINUE</button>
          </div>
        </div>
      </div>

      <div className="CategorySection">
        <h1 style={{ display: "flex" }} className="name">
          <div style={{ color: "#643887" }}>BROWSE BY </div>
          <div style={{ color: "#F4AD0F" }}>CATEGORY</div>
        </h1>
        <div className="CateLine">
          {[
            "Fiction",
            "Non-Fiction",
            "Science",
            "Mathematics",
            "Technology",
            "Literature",
            "Biography",
            "Philosophy",
            "History",
            "Art",
            "Psychology",
            "Self-Help",
            "Travel",
            "Poetry",
            "Romance",
            "Thriller",
            "Education",
            "Business",
            "Health",
            "Children",
            "Comics",
            "Religion",
            "Cooking",
            "Sports",
            "Fantasy",
          ].map((cat, i) => (
            <Category
              key={i}
              heading={cat}
              image="/fiction.svg"
              link={`/pages/BrowsePage?category=${encodeURIComponent(cat)}`}
            />
          ))}
        </div>
      </div>

      {/* 🔍 SEARCH INPUT */}
      <div style={{ textAlign: "center", marginTop: "40px" }}>
        <Search value={searchQuery} onChange={setSearchQuery} />
      </div>

      {/* 📚 BOOK LIST */}
      <div className="BookListSection">
        <h2 style={{ textAlign: "center", margin: "20px 0" }}>Latest Books</h2>
        <div className="BooksGrid">
          {filteredBooks.length > 0 ? (
            filteredBooks.map((book) => (
              <div className="BookCard" key={book.id}>
                <img
                  src={book.uploadedImages?.[0] || "/book-default.jpg"}
                  alt={book.book}
                  className="BookImage"
                />
                <h3>{book.book}</h3>
                <p>by {book.author}</p>
                <p><b>€{book.price}</b></p>
                <Link href={`/pages/Book/${book.id}`}>View</Link>
              </div>
            ))
          ) : (
            <p style={{ textAlign: "center", marginTop: "20px" }}>
              No books found.
            </p>
          )}
        </div>
      </div>

      {/* 📦 HOW IT WORKS */}
      <section className="section4info">
        <div className="informationbox">
          <div className="information">
            <h1 className="heading">
              <span className="text-purple">HOW IT </span>
              <span className="text-yellow">WORKS?</span>
            </h1>
            <p className="process-text">
              <span className="text-purple">PROCESS TO FOLLOW </span>
              <br />
              <span className="text-yellow">
                TO EXCHANGE YOUR
                <br />
                BOOKS :)
              </span>
            </p>
          </div>
          <img
            src="/image2.png"
            alt="Book Exchange Process"
            className="info-image"
          />
        </div>
        <div className="HowtoPath">
          <div className="path1">
            <div className="pathbox">
              <h1>1</h1>
              <p>Search for a book or create a listing.</p>
            </div>
            <img src="/arrowright.png" alt="arrow" />
          </div>
          <div className="path2">
            <img src="/arrowleft.png" alt="arrow" />
            <div className="pathbox">
              <h1>2</h1>
              <p>Chat with buyers or sellers directly.</p>
            </div>
          </div>
          <div className="path3">
            <div className="pathbox">
              <h1>3</h1>
              <p>Confirm the deal and enjoy your book!</p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Homepage;
