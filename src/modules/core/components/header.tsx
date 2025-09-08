"use client";

import { Book } from "@/src/types";
import React from "react";
import fetchBookAction from "../../book-fetch/lib/actions/fetch-book.action";
import searchBooksAction from "../../book-fetch/lib/actions/search-books.action";
import { useAsync } from "../hooks/useAsync";
import BookCard from "./book-cards";
import Spinner from "./spinner";
import { cache } from "../../book-fetch/lib/utils/cache";
import { AppContext } from "@/src/utils/app-provider";

export default function Header({
  onBookSelect,
}: {
  onBookSelect: (book: Book) => void;
}) {
  const [search, setSearch] = React.useState("");
  const [error, setError] = React.useState<string | null>(null);
  const [selectedBook, setSelectedBook] = React.useState<Book | null>(null);
  const [bookOptions, setBookOptions] = React.useState<Book[]>([]);

  const characterContext = React.useContext(AppContext);

  const { run: fetchBookById, loading: fetchBookByIdLoading } =
    useAsync(fetchBookAction);
  const { run: searchBooks, loading: searchBookLoading } =
    useAsync(searchBooksAction);

  const handleBookFetch = async (searchStr: string) => {
    const isId = !isNaN(Number(searchStr));

    if (isId) {
      const result = await cache(fetchBookById, searchStr);
      if (result.data) {
        handleBookSelect(result.data);
        setBookOptions([result.data]);
      } else {
        setError("Book with id: " + searchStr + " not found!");
        setTimeout(() => {
          setError(null);
        }, 2000);
      }
    } else {
      const result = await cache(searchBooks, searchStr);
      if (result.data) {
        setBookOptions(result.data);
      }
    }
  };

  const handleBookSelect = (book: Book) => {
    setSelectedBook(book);
    onBookSelect(book);
    characterContext?.bookSetter(book);
  };

  return (
    <section
      className="flex flex-col gap-6 justify-center items-center mb-10 h-screen relative"
      id="header"
    >
      <div className="badge badge-dash badge-primary fixed top-8 right-8 z-50">
        {characterContext?.tokenCount} Tokens Used
      </div>
      <h1 className="text-5xl font-extrabold text-center">
        <span className="text-9xl">✨</span>
        <br />
        <br />
        Analyze Books with AI
      </h1>
      <div className="flex flex-col gap-2">
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
              onKeyDown={(e) =>
                e.key === "Enter" ? handleBookFetch(search) : null
              }
            />
          </label>
          <button
            className="btn rounded-xs btn-soft"
            onClick={() => handleBookFetch(search)}
            disabled={fetchBookByIdLoading || searchBookLoading}
          >
            Fetch
          </button>
          {(fetchBookByIdLoading || searchBookLoading) && <Spinner />}
        </div>
        {!!error && (
          <div role="alert" className="alert alert-error alert-soft">
            <span>Error! {error}</span>
          </div>
        )}
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
