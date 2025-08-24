'use client';
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { Book } from "../../BookDetailsCard/BookDetailsCard";

export default function BookDetailClient() {
  const { id } = useParams();
  const [book, setBook] = useState<Book | null>(null);

  useEffect(() => {
    if (!id) return;
    const savedBooks: Book[] = JSON.parse(localStorage.getItem("libraryBooks") || "[]");
    const foundBook = savedBooks.find((b) => b.id === id);
    setBook(foundBook || null);
  }, [id]);

  if (!book) return <p className="text-red-600 text-center mt-8">Book not found.</p>;

  return (
    <main className="p-8 max-w-3xl mx-auto space-y-4">
      <h1 className="text-3xl font-bold">{book.title}</h1>
      <p><strong className="font-semibold">Author:</strong> {book.author}</p>
      {book.year && <p><strong className="font-semibold">Year:</strong> {book.year}</p>}
      <p><strong className="font-semibold">Date Added:</strong> {new Date(book.dateAdded).toLocaleDateString()}</p>
      {book.description && (
        <p><strong className="font-semibold">Description:</strong> {book.description}</p>
      )}
    </main>
  );
}
