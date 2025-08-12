'use client';
import { useState, FormEvent } from 'react';
import styles from '../Library/library.module.css';
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

  const handleAddBook = (event: FormEvent<HTMLFormElement>, newBook: BookFormData) => {
     setBooks((prev) => [
      ...prev,
      {
        title: newBook.title,
        author: newBook.author,
        year: newBook.year ? Number(newBook.year) : undefined,
        dateAdded: new Date(),
        description: newBook.description || '',
      },
    ]);
    setConfirmation(`"${newBook.title}" by ${newBook.author} added successfully!`);
    setTimeout(() => setConfirmation(null), 3000);
  };

  const totalBooks = books.length;
  const recentBooks = [...books].slice(-5).reverse();

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

          <h2>5 Most Recently Added</h2>
          <div className={styles.booksGrid}>
            {filteredRecentBooks.map((book, index) => (
              <BookDetailsCard key={index} book={book} />
            ))}
          </div>

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