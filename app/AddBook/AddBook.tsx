'use client';

import React, { useState, ChangeEvent, FormEvent } from "react";
import { collection, addDoc } from "firebase/firestore";
import { db } from "../../app/firebase-config/firebase-config"; // adjust path if needed

interface BookFormData {
  title: string;
  author: string;
  isbn?: string;
  year?: string;
  description?: string;
}

export default function AddBook() {
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
      const bookToAdd = {
        title: formData.title,
        author: formData.author,
        isbn: formData.isbn || undefined,
        year: formData.year ? Number(formData.year) : undefined,
        description: formData.description || undefined,
        dateAdded: new Date(),
      };

      // Add book to Firestore
      await addDoc(collection(db, "books"), bookToAdd);

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
