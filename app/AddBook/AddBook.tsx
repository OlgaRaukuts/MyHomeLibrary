'use client';

import React, { useState, ChangeEvent, FormEvent } from "react";

export interface BookFormData {
  title: string;
  author: string;
  isbn: string;
  year: string;
  description: string;
}

interface AddBookProps {
  onSubmit?: (newBook: BookFormData) => void | Promise<void>;
}

export default function AddBook({ onSubmit }: AddBookProps) {
  const [formData, setFormData] = useState<BookFormData>({
    title: "",
    author: "",
    isbn: "",
    year: "",
    description: "",
  });

  const [confirmation, setConfirmation] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!formData.title.trim()) {
      setError("Please enter at least a book title.");
      return;
    }

    setError(null);

    try {
      if (onSubmit) await onSubmit(formData);

      const authorLabel = formData.author.trim() || "Unknown author";
      setConfirmation(`"${formData.title.trim()}" by ${authorLabel} added successfully!`);
      setTimeout(() => setConfirmation(null), 4000);

      setFormData({ title: "", author: "", isbn: "", year: "", description: "" });
    } catch (err) {
      console.error("Error adding book:", err);
      setError("Failed to add book. Please try again.");
      setTimeout(() => setError(null), 4000);
    }
  };


  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-3 mb-6 max-w-md">
      <input
        type="text"
        name="title"
        value={formData.title}
        onChange={handleChange}
        placeholder="Book Title"
        required
        className="input input-bordered w-full"
      />
      <input
        type="text"
        name="author"
        value={formData.author}
        onChange={handleChange}
        placeholder="Author (optional)"
        className="input input-bordered w-full"
      />

      {formData.title.trim() && (
        <>
          <input
            type="text"
            name="isbn"
            value={formData.isbn}
            onChange={handleChange}
            placeholder="ISBN"
            className="input input-bordered w-full"
          />
          <input
            type="text"
            name="year"
            value={formData.year}
            onChange={handleChange}
            placeholder="Year"
            className="input input-bordered w-full"
          />
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            placeholder="Description"
            className="textarea textarea-bordered w-full"
          />
        </>
      )}

      <button type="submit" className="btn btn-primary mt-2 w-full">
        Add a Book
      </button>

      {error && <p className="text-red-500 mt-2">{error}</p>}
      {confirmation && <p className="text-green-600 mt-2">{confirmation}</p>}
    </form>
  );
}
