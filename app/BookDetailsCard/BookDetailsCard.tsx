import React from "react";

export type Book = {
  id: string;
  title: string;
  author: string;
  year?: number | null;
  dateAdded: string | Date;
  description?: string | null;
};

type Props = { book: Book };

function formatDate(input: string | Date) {
  try {
    const d = typeof input === "string" ? new Date(input) : input;
    if (Number.isNaN(d.getTime())) return "Unknown date";
    return d.toLocaleDateString(undefined, {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  } catch {
    return "Unknown date";
  }
}

export default function BookDetailsCard({ book }: Props) {
  return (
    <article className="border rounded-lg shadow p-4 bg-base-100 hover:shadow-lg transition">
      <div className="flex flex-col space-y-3">
        <h2 className="text-xl font-bold">{book.title}</h2>
        <p className="text-gray-600">
          by <span className="font-medium">{book.author}</span>
        </p>

        <div className="flex flex-wrap gap-4 mt-2">
          {typeof book.year === "number" && (
            <div className="badge badge-outline">
              Year: <span className="ml-1 font-semibold">{book.year}</span>
            </div>
          )}
          <div className="badge badge-outline">
            Date added: <span className="ml-1 font-semibold">{formatDate(book.dateAdded)}</span>
          </div>
        </div>

        {book.description ? (
          <section className="mt-3 text-gray-700">
            <p>{book.description}</p>
          </section>
        ) : (
          <p className="mt-3 text-gray-400 italic">No description provided.</p>
        )}
      </div>
    </article>
  );
}
