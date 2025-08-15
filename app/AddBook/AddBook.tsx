'use client';

import React, { useState, ChangeEvent, FormEvent } from "react";
import styles from '../styles/Library.module.css';

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
    title: '',
    author: '',
    isbn: '',
    year: ''
  });

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!formData.title.trim() || !formData.author.trim()) {
      alert('Please enter at least a title and author.');
      return;
    }

    // Call parent-provided handler
    onSubmit(e, formData);

    // Reset form
    setFormData({
      title: '',
      author: '',
      isbn: '',
      year: ''
    });
  };

  return (
    <form onSubmit={handleSubmit} className={styles.addBookForm}>
      <input
        type="text"
        name="title"
        value={formData.title}
        onChange={handleChange}
        placeholder="Book Title"
        className={styles.input}
        required
      />
      <input
        type="text"
        name="author"
        value={formData.author}
        onChange={handleChange}
        placeholder="Book Author"
        className={styles.input}
        required
      />

      {formData.title.trim() && formData.author.trim() && (
        <>
          <input
            type="text"
            name="isbn"
            value={formData.isbn}
            onChange={handleChange}
            placeholder="ISBN"
            className={styles.input}
          />
          <input
            type="text"
            name="year"
            value={formData.year}
            onChange={handleChange}
            placeholder="Year"
            className={styles.input}
          />
        </>
      )}

      <button type="submit" className={styles.button}>
        Add a Book
      </button>
    </form>
  );
}