'use client';
import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import styles from '../../styles/Library.module.css';
import { Book } from '../../BookDetailsCard/BookDetailsCard';

export default function BookDetailPage() {
  const { id } = useParams();
  const [book, setBook] = useState<Book | null>(null);

  useEffect(() => {
    if (!id) return;
    const savedBooks: Book[] = JSON.parse(localStorage.getItem('libraryBooks') || '[]');
    const foundBook = savedBooks.find(b => b.id === id);
    setBook(foundBook || null);
  }, [id]);

  if (!book) {
    return <p className={styles.notFound}>Book not found.</p>;
  }

  return (
    <main className={styles.libraryMain}>
      <h1>{book.title}</h1>
      <p><strong>Author:</strong> {book.author}</p>
      {book.year && <p><strong>Year:</strong> {book.year}</p>}
      <p><strong>Date Added:</strong> {new Date(book.dateAdded).toLocaleDateString()}</p>
      {book.description && <p><strong>Description:</strong> {book.description}</p>}
    </main>
  );
}
