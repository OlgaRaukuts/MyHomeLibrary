'use client';
import React from 'react';
import styles from '../search/Search.module.css';

interface SearchProps {
  value: string;
  onChange: (value: string) => void;
}

export default function Search ({value, onChange}: SearchProps){

    return(
        <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Search books..."
        className={styles.searchInput}
        aria-label="Search books"
        />
    );
};