"use client";

import { Book } from "@/src/types";
import React from "react";
import fetchBookAction from "../../book-fetch/lib/actions/fetch-book.action";
import searchBooksAction from "../../book-fetch/lib/actions/search-books.action";
import { useAsync } from "../hooks/useAsync";
import BookCard from "./book-cards";
import Spinner from "./spinner";

export default function Header({
  onBookSelect,
}: {
  onBookSelect: (book: Book) => void;
}) {
  const [search, setSearch] = React.useState("");
  const [selectedBook, setSelectedBook] = React.useState<Book | null>(null);
  const [bookOptions, setBookOptions] = React.useState<Book[]>([]);

  const { run: fetchBookById, loading: fetchBookByIdLoading } =
    useAsync(fetchBookAction);
  const { run: searchBooks, loading: searchBookLoading } =
    useAsync(searchBooksAction);

  const handleBookFetch = async (searchStr: string) => {
    const isId = !isNaN(Number(searchStr));

    if (isId) {
      const result = await fetchBookById(searchStr);
      if (result) {
        handleBookSelect(result);
        setBookOptions([result]);
      }
    } else {
      const result = await searchBooks(searchStr);
      if (result) {
        setBookOptions(result);
      }
    }
  };

  const handleBookSelect = (book: Book) => {
    setSelectedBook(book);
    onBookSelect(book);
  };

  return (
    <section className="flex flex-col gap-6 justify-center items-center mb-10">
      <h1 className="text-5xl font-extrabold text-center">
        Analyze Books with AI
      </h1>
      <div className="flex gap-2">
        <label className="input focus:outline-none focus-within:outline-none">
          <svg
            className="h-[1em] opacity-50"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
          >
            <g
              strokeLinejoin="round"
              strokeLinecap="round"
              strokeWidth="2.5"
              fill="none"
              stroke="currentColor"
            >
              <circle cx="11" cy="11" r="8"></circle>
              <path d="m21 21-4.3-4.3"></path>
            </g>
          </svg>
          <input
            type="search"
            className="grow"
            placeholder="Enter Book ID or title..."
            onChange={(e) => setSearch(e.target.value)}
          />
        </label>
        <button
          className="btn rounded-xs btn-soft"
          onClick={() => handleBookFetch(search)}
          disabled={fetchBookByIdLoading || searchBookLoading}
        >
          Fetch
        </button>
        {fetchBookByIdLoading || (searchBookLoading && <Spinner />)}
      </div>
      <div className="flex flex-wrap gap-4">
        {bookOptions.map((book: Book) => (
          <BookCard
            key={book.id}
            {...book}
            selected={selectedBook?.id === book.id}
            onClick={() => handleBookSelect(book)}
          />
        ))}
      </div>
    </section>
  );
}
