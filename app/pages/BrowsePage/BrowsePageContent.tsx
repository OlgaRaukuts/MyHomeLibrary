"use client";
import React, { useState, useEffect} from "react";
import "./browsepage.css";
import Header from "../../components/header/header";
import Footer from "../../components/footer/footer";
import { db } from "../../firebase-config/firebase-config";
import { collection, getDocs } from "firebase/firestore";
import Link from "next/link";
import { useSearchParams } from "next/navigation";

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
  publishedate: string;
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
  const [category, setCategory] = useState("");
  const [author, setAuthor] = useState("");
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [condition, setCondition] = useState("");
  const [sortOrder, setSortOrder] = useState("");
  const [searchTerm, setSearchTerm] = useState("");

  const searchParams = useSearchParams();

  useEffect(() => {
    const categoryFromURL = searchParams.get("category") || ""; //This line reads a specific parameter from the URL — category. For example:URL: https://example.com/browse?category=Fiction would return "Fiction"
    searchParams.get("category")
    setCategory(categoryFromURL);
  }, [searchParams]); //It runs once when the component mounts (initial load), and again every time searchParams changes, i.e., when the query string in the URL updates.

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const booksCollection = collection(db, "books");
        const bookSnapshot = await getDocs(booksCollection);
        const bookList = bookSnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        })) as Book[]; //It casts the result as Book[], meaning an array of Book type objects.

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

  const handleSearch = () => { //filter books based on a search term
    if (searchTerm.trim() === "") {
      setFilteredBooks(books);
      return;
    } //If searchTerm is empty or only whitespace, it resets the filter and shows all books (setFilteredBooks(books)). If there's something typed in, the function will continue (you haven’t shown the rest) — probably to filter the books based on title, author, tags, etc.

    const lowerSearch = searchTerm.toLowerCase();
    const searchResults = books.filter(
      (book) =>
        book.book.toLowerCase().includes(lowerSearch) ||
        book.author.toLowerCase().includes(lowerSearch)
    );

    setFilteredBooks(searchResults);
  };

  const handleFilter = () => { //a flexible filter function that allows users to narrow down books by multiple criteria
    let updatedBooks = books.filter((book) => {
      return (
        (category === "" || book.category.toLowerCase().includes(category.toLowerCase())) &&
        (author === "" || book.author.toLowerCase().includes(author.toLowerCase())) &&
        (condition === "" || book.condition.toLowerCase() === condition.toLowerCase()) &&
        (minPrice === "" || book.price >= parseInt(minPrice)) &&
        (maxPrice === "" || book.price <= parseInt(maxPrice)) //include only books where the price is greater than or equal to the entered min value.
      );
    });

    // sorts books by their creation date, with the most recently added books appearing first
    updatedBooks.sort((a, b) => 
      new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    );

    if (sortOrder === "lowToHigh") {
      updatedBooks.sort((a, b) => a.price - b.price);
    } else if (sortOrder === "highToLow") {
      updatedBooks.sort((a, b) => b.price - a.price);
    }

    setFilteredBooks(updatedBooks);
  };
//Note: <center> is outdated in HTML5. It's better to use CSS (text-align: center or flexbox)
  return (
    <div>
      <Header />
      <br />
      <center>
        <div className="searchcontainer">
          <div className="searchbar">
            <input
              type="text"
              placeholder="Search books or authors..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <button onClick={handleSearch}>SEARCH</button>
          </div>
        </div>
      </center>

      <div className="browsepagecontainer">
        <div className="fliteroptions">
          <label>SELECT CATEGORY</label>
          <select value={category} onChange={(e) => setCategory(e.target.value)}>
            <option value="">All Categories</option>
            <option value="Fiction">Fiction</option>
            <option value="Non-Fiction">Non-Fiction</option>
            <option value="Science">Science</option>
            <option value="Mathematics">Mathematics</option>
            <option value="Technology">Technology</option>
            <option value="Literature">Literature</option>
            <option value="Biography">Biography</option>
            <option value="Philosophy">Philosophy</option>
            <option value="History">History</option>
            <option value="Art">Art</option>
            <option value="Psychology">Psychology</option>
            <option value="Self-Help">Self-Help</option>
            <option value="Travel">Travel</option>
            <option value="Poetry">Poetry</option>
          </select>

          <label>SELECT AUTHOR</label>
          <input value={author} onChange={(e) => setAuthor(e.target.value)} />

          <label>SELECT PRICE RANGE</label>
          <input
            type="number"
            value={minPrice}
            onChange={(e) => setMinPrice(e.target.value)}
            placeholder="Min Price"
          />
          <label> to </label>
          <br />
          <input
            type="number"
            value={maxPrice}
            onChange={(e) => setMaxPrice(e.target.value)}
            placeholder="Max Price"
          />

          <label>SORT BY PRICE</label>
          <br />
          <select value={sortOrder} onChange={(e) => setSortOrder(e.target.value)}>
            <option value="">Default</option>
            <option value="lowToHigh">Price: Low to High</option>
            <option value="highToLow">Price: High to Low</option>
          </select>

          <br />
          <button onClick={handleFilter}>FILTER</button>
        </div>

        <div className="bookscontainer">
          {loading ? (
            <p>Loading books...</p>
          ) : filteredBooks.length > 0 ? (
            filteredBooks.map((book) => (
              <div key={book.id} className="book-item">
                <Link
                  href={`/pages/${book.bid}/ProductPage`}
                  style={{ textDecoration: "none", color: "inherit" }}
                >
                </Link>
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
