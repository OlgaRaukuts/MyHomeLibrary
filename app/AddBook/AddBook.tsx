"use client";

import React, { useState, ChangeEvent, FormEvent } from "react";

interface BookFormData {
  title: string;
  author: string;
  isbn?: string;
  year?: string;
}

interface AddBookProps {
  onSubmit: (event: FormEvent<HTMLFormElement>, formData: BookFormData) => void;
}

export default function AddBook({ onSubmit }: AddBookProps) {
  const [formData, setFormData] = useState<BookFormData>({
    title: "",
    author: "",
    isbn: "",
    year: "",
  });

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!formData.title.trim() || !formData.author.trim()) {
      alert("Please enter at least a title and author.");
      return;
    }
    onSubmit(e, formData);
    setFormData({ title: "", author: "", isbn: "", year: "" });
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
        </>
      )}

      <button type="submit" className="btn btn-primary mt-2 w-full">
        Add a Book
      </button>
    </form>
  );
}
