'use client';
import { useState } from 'react';
import styles from '../Library/library.module.css';
import Search from "../../components/search/search";

export default function Library() {
  const [books, setBooks] = useState<string[]>([]);
  const [searchQuery, setSearchQuery] = useState('');

  const handleAddBook = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const book = formData.get('book');

    if (typeof book === 'string') {
      const trimmed = book.trim();
      if (trimmed) {
        setBooks((prev) => [...prev, trimmed]);
        event.currentTarget.reset();
      }
    }
  };

  const totalBooks = books.length;
  const filteredBooks = books.filter((book) =>
    book.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <main className={styles.libraryMain}>
      <form onSubmit={handleAddBook} className={styles.addBookForm}>
        <input
          type="text"
          name="book"
          placeholder="e.g. Harry Potter"
          aria-label="Add a book"
          className={styles.input}
        />
        <button type="submit" className={styles.button}>Add a Book</button>
      </form>

      {books.length > 0 && (
        <section className={styles.booksSection}>
          <Search value={searchQuery} onChange={setSearchQuery} />

          <h2>Books in Library</h2>
          <ul className={styles.ulBooksList}>
            {filteredBooks.map((book, index) => (
              <li key={index} className={styles.ulBooksListLi}>{book}</li>
            ))}
          </ul>

          {totalBooks > 3 && (
            <div className={styles.container}>
              <h3 className={styles.h3}>TOTAL</h3>
              <p className={styles.p}>
                You have{' '}
                <span className={styles.totalCount}>{totalBooks}</span>{' '}
                book{totalBooks !== 1 ? 's' : ''} in total.
              </p>
            </div>
          )}
        </section>
      )}
    </main>
  );
}