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

export default function Library() {
  const [books, setBooks] = useState<Book[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [confirmation, setConfirmation] = useState<string|null>(null);

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
  const sortedBooks = [...books].sort(
    (a, b) => new Date(b.dateAdded).getTime() - new Date(a.dateAdded).getTime()
  ); 

  const recentBooks = sortedBooks.slice(0, 5);

  const filteredRecentBooks = recentBooks.filter((book) =>
    book.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    book.author.toLowerCase().includes(searchQuery.toLowerCase())
  );

   const filteredAllBooks = sortedBooks.filter((book) =>
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