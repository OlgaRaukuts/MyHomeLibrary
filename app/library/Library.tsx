'use client';
import { useState, FormEvent, useEffect } from 'react';
import Link from 'next/link';
import styles from '../styles/Library.module.css';
import Search from "../components/search/Search";
import AddBook from '../AddBook/AddBook';
import BookDetailsCard, {Book} from '../BookDetailsCard/BookDetailsCard';

interface BookFormData {
  title: string;
  author: string;
  isbn?: string;
  year?: string;
  description?: string;
}
type SortOption = "titleAZ" | "titleZA" | "dateNewest" | "dateOldest";


export default function Library() {
  const [books, setBooks] = useState<Book[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [confirmation, setConfirmation] = useState<string|null>(null);
  const [sortOption, setSortOption] = useState<SortOption>("dateNewest");
  const [authorFilter, setAuthorFilter] = useState<string>("all");
  const [yearFilter, setYearFilter] = useState<string>("all");

  useEffect(() => { //Load saved books on first render
    const savedBooks = JSON.parse(localStorage.getItem('libraryBooks') || '[]');
    setBooks(savedBooks);
  }, []);

  useEffect(() => {
    localStorage.setItem('libraryBooks', JSON.stringify(books));
  }, [books]);

  const handleAddBook = (event: FormEvent<HTMLFormElement>, newBook: BookFormData) => {
     const bookWithId: Book = {
    id: crypto.randomUUID(),
    title: newBook.title,
    author: newBook.author,
    year: newBook.year ? Number(newBook.year) : undefined,
    dateAdded: new Date(),
    description: newBook.description || '',
  };

  setBooks((prev) => [...prev, bookWithId]);
    setConfirmation(`"${newBook.title}" by ${newBook.author} added successfully!`);
    setTimeout(() => setConfirmation(null), 3000);
  };

  const totalBooks = books.length;

  // Sort by dateAdded (newest first)
  const sortedBooks = [...books].sort((a, b) => {
    switch (sortOption){
      case "titleAZ":
        return a.title.localeCompare(b.title);
      case "titleZA":
      return b.title.localeCompare(a.title);
      case "dateOldest":
        return new Date(a.dateAdded).getTime() - new Date(b.dateAdded).getTime();
      case "dateNewest":
        default:
        return new Date(b.dateAdded ?? 0).getTime() - new Date(a.dateAdded ?? 0).getTime();
    }
  }); 
  const authors = Array.from(new Set(books.map((b) => b.author))).sort();
  const years = Array.from(
  new Set(books.map((b) => b.year).filter((y): y is number => y != null))).sort((a, b) => a - b);

    // Apply search + filters
  const filteredAllBooks = sortedBooks.filter((book) => {
    const matchesSearch =
      book.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      book.author.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesAuthor = authorFilter === "all" || book.author === authorFilter;
    const matchesYear = yearFilter === "all" || String(book.year) === yearFilter;

    return matchesSearch && matchesAuthor && matchesYear;
  });

  const recentBooks = sortedBooks.slice(0, 5);

  const filteredRecentBooks = recentBooks.filter((book) =>
    book.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    book.author.toLowerCase().includes(searchQuery.toLowerCase())
  );


  return (
   <main className={styles.libraryMain}>
      <h1>Books in My Library</h1>
      <AddBook onSubmit={handleAddBook} />
      {confirmation && <p className={styles.confirmation}>{confirmation}</p>}

      {books.length > 0 && (
        <section className={styles.booksSection}>
          <Search value={searchQuery} onChange={setSearchQuery} />

 {/*Sorting Dropdown + filters*/}

          <div className={styles.controls}>
            <div>
              <label htmlFor="sort">Sort by: </label>
              <select
                id="sort"
                value={sortOption}
                onChange={(e) => setSortOption(e.target.value as SortOption)}
              >
                <option value="titleAZ">Title (A → Z)</option>
                <option value="titleZA">Title (Z → A)</option>
                <option value="dateNewest">Date Added (Newest)</option>
                <option value="dateOldest">Date Added (Oldest)</option>
              </select>
            </div>

            <div>
              <label htmlFor="authorFilter">Author: </label>
              <select
                id="authorFilter"
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
            </div>

            <div>
              <label htmlFor="yearFilter">Year: </label>
              <select
                id="yearFilter"
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
            </div>
          </div>

 {/* Recent Books */}

          <h2>5 Most Recently Added</h2>
          <div className={styles.booksGrid}>
            {filteredRecentBooks.map((book) => (
              <Link key={book.id} href={`/library/${book.id}`}>
                <BookDetailsCard book={book} />
              </Link>
            ))}
          </div>
{/* All Books */}
          <h2>All Books</h2>
          <table className={styles.booksTable}>
            <thead>
              <tr>
                <th>Title</th>
                <th>Author</th>
                <th>Year</th>
                <th>Date Added</th>
              </tr>
            </thead>
            <tbody>
              {filteredAllBooks.map((book) => (
                <tr key={book.id}>
                  <td>
                    <Link href={`/library/${book.id}`}>
                      {book.title}
                    </Link>
                  </td>
                  <td>{book.author}</td>
                  <td>{book.year || '—'}</td>
                  <td>{new Date(book.dateAdded).toLocaleDateString()}</td>
                </tr>
              ))}
            </tbody>
          </table>

          {totalBooks > 3 && (
            <div className={styles.container}>
              <h3 className={styles.h3}>TOTAL</h3>
              <p className={styles.p}>
                You have <span className={styles.totalCount}>{totalBooks}</span>{' '}
                book{totalBooks !== 1 ? 's' : ''} in total.
              </p>
            </div>
          )}
        </section>
      )}
    </main>
  );
}