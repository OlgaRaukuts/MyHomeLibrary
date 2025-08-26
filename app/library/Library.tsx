"use client";
import { useState, FormEvent, useEffect } from "react";
import Link from "next/link";
import Search from "../components/search/Search"; 
import AddBook from "../AddBook/AddBook";
import BookDetailsCard, { Book } from '../BookDetailsCard/BookDetailsCard';

interface BookFormData { title: string; author: string; isbn?: string; year?: string; description?: string; }
type SortOption = "titleAZ" | "titleZA" | "dateNewest" | "dateOldest";

export default function Library() {
  const [books, setBooks] = useState<Book[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [confirmation, setConfirmation] = useState<string|null>(null);
  const [sortOption, setSortOption] = useState<SortOption>("dateNewest");
  const [authorFilter, setAuthorFilter] = useState<string>("all");
  const [yearFilter, setYearFilter] = useState<string>("all");

  useEffect(() => {
    const savedBooks = JSON.parse(localStorage.getItem('libraryBooks') || '[]');
    setBooks(savedBooks);
  }, []);
  
  useEffect(() => {
    localStorage.setItem('libraryBooks', JSON.stringify(books));
  }, [books]);

  const handleAddBook = (event: FormEvent<HTMLFormElement>, newBook: BookFormData) => {
    const bookWithId: Book = { id: crypto.randomUUID(), title: newBook.title, author: newBook.author, year: newBook.year ? Number(newBook.year) : undefined, dateAdded: new Date(), description: newBook.description || '' };
    setBooks((prev) => [...prev, bookWithId]);
    setConfirmation(`"${newBook.title}" by ${newBook.author} added successfully!`);
    setTimeout(() => setConfirmation(null), 3000);
  };

  const sortedBooks = [...books].sort((a, b) => {
    switch (sortOption) {
      case "titleAZ": return a.title.localeCompare(b.title);
      case "titleZA": return b.title.localeCompare(a.title);
      case "dateOldest": return new Date(a.dateAdded).getTime() - new Date(b.dateAdded).getTime();
      case "dateNewest":
      default: return new Date(b.dateAdded).getTime() - new Date(a.dateAdded).getTime();
    }
  });

  const authors = Array.from(new Set(books.map((b) => b.author))).sort();
  const years = Array.from(new Set(books.map((b) => b.year).filter((y): y is number => y != null))).sort((a,b)=>a-b);
  const filteredAllBooks = sortedBooks.filter(book => {
    const matchesSearch = book.title.toLowerCase().includes(searchQuery.toLowerCase()) || book.author.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesAuthor = authorFilter==="all" || book.author===authorFilter;
    const matchesYear = yearFilter==="all" || String(book.year)===yearFilter;
    return matchesSearch && matchesAuthor && matchesYear;
  });
  const recentBooks = [...books].sort((a,b)=>new Date(b.dateAdded).getTime()-new Date(a.dateAdded).getTime()).slice(0,5);
  const totalBooks = books.length;

  return (
    <main className="p-8 max-w-7xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Books in My Library</h1>
      <AddBook onSubmit={handleAddBook} />
      {confirmation && <p className="text-green-600 my-2">{confirmation}</p>}

      {books.length > 0 && (
        <section className="mt-8 space-y-8">
          {/* Recent Books */}
          <div>
            <h2 className="text-2xl font-semibold mb-4">5 Most Recently Added</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
              {recentBooks.map(book => (
                <Link key={book.id} href={`/library/${book.id}`}>
                  <BookDetailsCard book={book} />
                </Link>
              ))}
            </div>
          </div>

          {/* All Books */}
          <div>
            <h2 className="text-2xl font-semibold mb-4">All Books</h2>
            <Search value={searchQuery} onChange={setSearchQuery} />
            
            <div className="overflow-x-auto mt-4">
              <table className="table-auto w-full border border-gray-300 rounded-lg">
                <thead className="bg-gray-100">
                  <tr>
                    <th className="px-4 py-2 cursor-pointer" onClick={()=>setSortOption(sortOption==="titleAZ"?"titleZA":"titleAZ")}>
                      Title {sortOption==="titleAZ"?"▲":sortOption==="titleZA"?"▼":""}
                    </th>
                    <th className="px-4 py-2">
                      Author
                      <select className="ml-2 border rounded p-1" value={authorFilter} onChange={e=>setAuthorFilter(e.target.value)}>
                        <option value="all">All</option>
                        {authors.map(author=><option key={author} value={author}>{author}</option>)}
                      </select>
                    </th>
                    <th className="px-4 py-2">
                      Year
                      <select className="ml-2 border rounded p-1" value={yearFilter} onChange={e=>setYearFilter(e.target.value)}>
                        <option value="all">All</option>
                        {years.map(year=><option key={year} value={String(year)}>{year}</option>)}
                      </select>
                    </th>
                    <th className="px-4 py-2 cursor-pointer" onClick={()=>setSortOption(sortOption==="dateNewest"?"dateOldest":"dateNewest")}>
                      Date Added {sortOption==="dateNewest"?"▼":sortOption==="dateOldest"?"▲":""}
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {filteredAllBooks.map(book=>(
                    <tr key={book.id} className="border-t hover:bg-gray-50">
                      <td className="px-4 py-2">
                        <Link href={`/library/${book.id}`} className="text-blue-600 hover:underline">{book.title}</Link>
                      </td>
                      <td className="px-4 py-2">{book.author}</td>
                      <td className="px-4 py-2">{book.year||'—'}</td>
                      <td className="px-4 py-2">{new Date(book.dateAdded).toLocaleDateString()}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {totalBooks>0 && (
              <div className="mt-6 bg-gray-50 p-4 rounded-lg">
                <h3 className="font-semibold">TOTAL</h3>
                <p data-testid="total-books">
               You have <span className="font-bold">{books.length}</span> book{books.length !== 1 && 's'} in total.</p>
              </div>
            )}
          </div>
        </section>
      )}
    </main>
  );
}