'use client';  //for ibsn and year write a condition when to show these fields
import React, {ChangeEvent, useState, FormEvent} from "react";
import styles from '../Library/library.module.css'; 
import Link from 'next/link';

interface BookFormData{
title: string;
author: string;
isbn?: string;
year?: string;
}

export default function AddBook(){

    const [formData, setFormData] = useState<BookFormData>({
        title: '',
        author: '',
        isbn: '',
        year: ''

    });

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        const{name, value} = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {

        e.preventDefault();
        if(!formData.title || !formData.author){
            alert('Please enter at least title and author.');
        return;
        }
    };

    console.log('New book added:', formData);

    return(
        <>
        <main className={styles.libraryMain}>
            <h1 className={styles.h1}>
                <form onSubmit={handleSubmit} className={styles.addBookFrom}>
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
                <button type="submit" className={styles.button}>
                ADD A BOOK
                </button>
                </form>
                
     <div style={{ marginTop: '20px', textAlign: 'center' }}>
        <Link href="/pages/Library" className={styles.button}>
          ← Back to Library
        </Link>
      </div>

     </h1>

        </main>

        </>
    );
}