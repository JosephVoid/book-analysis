"use client";

import React from "react";
import { useAsync } from "../hooks/useAsync";
import fetchBookAction from "../../book-fetch/lib/actions/fetch-book.action";
import { Book } from "@/src/types";
import { cache } from "../../book-fetch/lib/utils/cache";
import Spinner from "./spinner";

export default function NavBar({
  onBookSelect,
}: {
  onBookSelect: (book: Book) => void;
}) {
  const [search, setSearch] = React.useState("");
  const [error, setError] = React.useState<string | null>(null);

  const { run: fetchBookById, loading: fetchBookByIdLoading } =
    useAsync(fetchBookAction);

  const handleBookFetch = async (searchStr: string) => {
    const result = await cache(fetchBookById, searchStr);
    if (result.data) {
      handleBookSelect(result.data);
    } else {
      setError("Book with id: " + searchStr + " not found!");
      setTimeout(() => {
        setError(null);
      }, 2000);
    }
  };

  const handleBookSelect = (book: Book) => {
    onBookSelect(book);
  };

  return (
    <nav className="fixed top-0 right-0 left-0 bg-white z-50">
      <div className="container mx-auto px-4">
        <div className="flex items-center h-16 flex-col p-2 gap-2">
          <div className="flex gap-2 w-fit">
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
                placeholder="Enter Book ID number"
                onChange={(e) => setSearch(e.target.value)}
              />
            </label>
            <button
              className="btn rounded-xs btn-soft"
              onClick={() => handleBookFetch(search)}
              disabled={fetchBookByIdLoading}
            >
              Fetch
            </button>
            {fetchBookByIdLoading && <Spinner />}
          </div>
          {!!error && (
            <div role="alert" className="alert alert-error alert-soft">
              <span>Error! {error}</span>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}
