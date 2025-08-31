'use client';
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { Book } from "../../BookDetailsCard/BookDetailsCard";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../../firebase-config/firebase-config";

export default function BookDetailClient() {
  const { id } = useParams();
  const bookId = Array.isArray(id) ? id[0] : id;

  const [book, setBook] = useState<Book | null>(null);
  const [loading, setLoading] = useState(true);

useEffect(() => {
  if (!bookId) return;

  const fetchBook = async () => {
    const docRef = doc(db, "books", bookId); // now always a string
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      const data = docSnap.data();
      setBook({
        id: docSnap.id,
        title: data.title || 'No title',
        author: data.author || 'Unknown',
        year: data.year,
        description: data.description,
        dateAdded: data.dateAdded && data.dateAdded.toDate ? data.dateAdded.toDate() : new Date(),
      });
    } else {
      setBook(null);
    }
    setLoading(false);
  };

  fetchBook();
}, [bookId]);

  if (loading) return <p className="text-gray-600 text-center mt-8">Loading...</p>;
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

