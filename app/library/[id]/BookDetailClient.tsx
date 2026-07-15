'use client';
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { Book } from "../../BookDetailsCard/BookDetailsCard";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../../firebase-config/firebase-config";
import Link from "next/link";

export default function BookDetailClient() {
  const { id } = useParams();
  const bookId = Array.isArray(id) ? id[0] : id;

  const [book, setBook] = useState<Book | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!bookId) return;

    const fetchBook = async () => {
      try {
        const docRef = doc(db, "books", bookId);
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
          setLoading(false);
          return;
        }
      } catch (err) {
        console.warn("Firestore getDoc error, trying localStorage fallback:", err);
      }

      // Try local storage fallback
      try {
        const cached = localStorage.getItem("libraryBooks");
        if (cached) {
          const currentList: Book[] = JSON.parse(cached);
          const found = currentList.find((b) => b.id === bookId);
          if (found) {
            setBook(found);
            setLoading(false);
            return;
          }
        }
      } catch (e) {
        console.warn("Failed to read from localStorage:", e);
      }

      setBook(null);
      setLoading(false);
    };

    fetchBook();
  }, [bookId]);

  if (loading) return <p className="text-gray-600 text-center mt-8">Loading...</p>;
  if (!book) return <p className="text-red-600 text-center mt-8">Book not found.</p>;

  return (
    <main className="p-8 max-w-4xl mx-auto space-y-6">
      <div className="flex justify-between items-center">
        <Link href="/library" className="btn btn-outline btn-sm gap-2">
          ← Back to Library
        </Link>
      </div>

      <div className="card lg:card-side bg-base-100 shadow-xl border border-base-300 overflow-hidden">
        {/* Book Cover Placeholder */}
        <div className="bg-gradient-to-br from-primary to-secondary text-primary-content flex flex-col justify-between p-8 w-full lg:w-72 shrink-0 aspect-[3/4] relative">
          <div className="space-y-2">
            <span className="badge badge-accent badge-sm uppercase tracking-wider font-semibold">Home Library</span>
            <h2 className="text-2xl font-black leading-tight line-clamp-3 mt-4">{book.title}</h2>
            <p className="text-sm opacity-90 italic">by {book.author}</p>
          </div>
          
          <div className="border-t border-primary-content/20 pt-4 flex justify-between items-center">
            {book.year && <span className="text-xs font-semibold">{book.year}</span>}
            <span className="text-xs opacity-75">Owned</span>
          </div>
        </div>

        {/* Book Details */}
        <div className="card-body justify-between">
          <div className="space-y-4">
            <div>
              <h1 className="card-title text-3xl font-extrabold mb-1">{book.title}</h1>
              <p className="text-lg text-gray-500 font-medium">by <span className="text-primary">{book.author}</span></p>
            </div>

            <div className="flex flex-wrap gap-2 py-2 border-y border-base-200">
              {book.year && (
                <div className="badge badge-outline gap-1 p-3">
                  <span className="opacity-60 text-xs">Published:</span>
                  <span className="font-semibold">{book.year}</span>
                </div>
              )}
              <div className="badge badge-outline gap-1 p-3">
                <span className="opacity-60 text-xs">Added to Library:</span>
                <span className="font-semibold">{new Date(book.dateAdded).toLocaleDateString()}</span>
              </div>
            </div>

            {book.description ? (
              <div className="space-y-2">
                <h3 className="font-bold text-lg">Description</h3>
                <p className="text-base-content/80 leading-relaxed whitespace-pre-line">{book.description}</p>
              </div>
            ) : (
              <p className="text-base-content/50 italic py-4">No description provided for this book.</p>
            )}
          </div>
        </div>
      </div>
    </main>
  );
}

