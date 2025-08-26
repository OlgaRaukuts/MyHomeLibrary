import {render, screen} from '@testing-library/react';
import { describe, test, expect } from "vitest";
import BookDetailsCard, {Book} from '@bookdetails/BookDetailsCard';


describe('BookDetailsCard Component', () => {

test('renderds title and author correctly', () => {
    const book: Book = {
      id: "1",
      title: "The Hobbit",
      author: "J.R.R. Tolkien",
      dateAdded: new Date(),
    };

    render(<BookDetailsCard book={book} />);

    expect(screen.getAllByText("The Hobbit")).toBeInTheDocument;
    expect(screen.getByText(/by/i)).toBeInTheDocument();
    expect(screen.getAllByText("J.R.R. Tolkien")).toBeInTheDocument;
})

test('displays year when its provided', () => {

    const book: Book = {
      id: "2",
      title: "Dune",
      author: "Frank Herbert",
      year: 1965,
      dateAdded: new Date(),
    };

    render(<BookDetailsCard book={book} />);

    expect(screen.getAllByText(/Year:/i)).toBeInTheDocument;
    expect(screen.getAllByText("1965")).toBeInTheDocument;
});

    test('formats and displays dateAdded correctly', () => {

    const book: Book = {
      id: "3",
      title: "Neuromancer",
      author: "William Gibson",
      dateAdded: "2023-06-15T00:00:00Z",
    };

    render(<BookDetailsCard book={book} />);
    expect(screen.getByText(/Date added:/i)).toBeInTheDocument();
    expect(screen.getByText(/2023/)).toBeInTheDocument(); 
    });

    test('Shows Description If Present', () =>{

      const book: Book = {
      id: "4",
      title: "Snow Crash",
      author: "Neal Stephenson",
      dateAdded: new Date(),
      description: "A cyberpunk classic.",
    };

    render(<BookDetailsCard book={book} />);

    expect(screen.getByText("A cyberpunk classic.")).toBeInTheDocument();

    });


      test("shows 'Unknown date' if dateAdded is invalid", () => {
    const book: Book = {
      id: "6",
      title: "Hyperion",
      author: "Dan Simmons",
      dateAdded: "not-a-date",
    };

    render(<BookDetailsCard book={book} />);

    expect(screen.getByText(/Unknown date/i)).toBeInTheDocument();
  });

})
