import React from "react";
import styles from './BookDetailsCard.module.css';

export type Book = {
id: string;
title: string;
author: string;
year?: number | null;
dateAdded: string | Date;
description?: string | null;

}

type Props = {
    book: Book;
}

function formatDate(input: string | Date) {
  try {
    const d = typeof input === 'string' ? new Date(input) : input;
    if (Number.isNaN(d.getTime())) return 'Unknown date';
    return d.toLocaleDateString(undefined, {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  } catch {
    return 'Unknown date';
  }
}

export default function BookDetailsCard({book}: Props){
return(
<article className={styles.card}>
      <div className={styles.layout}>
        <div className={styles.details}>
          <h2 className={styles.title}>{book.title}</h2>

          <p className={styles.author}>
            by <span>{book.author}</span>
          </p>

          <div className={styles.meta}>
            {typeof book.year === 'number' && (
              <div className={styles.badge}>
                <span>Year</span>
                <span className={styles.badgeValue}>{book.year}</span>
              </div>
            )}
            <div className={styles.badge}>
              <span>Date added</span>
              <span className={styles.badgeValue}>
                {formatDate(book.dateAdded)}
              </span>
            </div>
          </div>

          {book.description ? (
            <section className={styles.description}>
              <h3 className="sr-only">Description</h3>
              <p>{book.description}</p>
            </section>
          ) : (
            <p className={styles.noDescription}>No description provided.</p>
          )}
        </div>
      </div>
    </article>
);
}