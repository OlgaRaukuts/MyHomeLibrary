'use client';

import React, { useState, ChangeEvent, FormEvent } from "react";
import { collection, addDoc } from "firebase/firestore";
import { db } from "../../app/firebase-config/firebase-config"; // adjust path if needed

export interface BookFormData {
  title: string;
  author: string;
  isbn?: string;
  year?: string; // keep string for form input
  description?: string;
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

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!formData.title.trim() || !formData.author.trim()) {
      alert("Please enter at least a title and author.");
      return;
    }

    try {
      // Prepare book object for Firestore
      const bookForFirestore = {
        ...formData,
        year: formData.year ? Number(formData.year) : undefined,
        dateAdded: new Date(),
      };

      // Save to Firestore
      await addDoc(collection(db, "books"), bookForFirestore);

      // Call parent callback with string year
      if (onSubmit) await onSubmit(formData);

      setConfirmation(`"${formData.title}" by ${formData.author} added successfully!`);
      setTimeout(() => setConfirmation(null), 3000);

      setFormData({ title: "", author: "", isbn: "", year: "", description: "" });
    } catch (error) {
      console.error("Error adding book: ", error);
      alert("Failed to add book. Please try again.");
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
        placeholder="Book Author"
        required
        className="input input-bordered w-full"
      />

      {formData.title.trim() && formData.author.trim() && (
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

      {confirmation && <p className="text-green-600 mt-2">{confirmation}</p>}
    </form>
  );
}
