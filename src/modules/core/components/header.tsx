"use client";

import React from "react";

export default function Header({
  onSearch,
}: {
  onSearch: (search: string) => void;
}) {
  const [search, setSearch] = React.useState("");

  return (
    <>
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
            placeholder="Enter Book ID or Book title..."
            onChange={(e) => setSearch(e.target.value)}
          />
        </label>
        <button
          className="btn rounded-xs btn-soft"
          onClick={() => onSearch(search)}
        >
          Fetch
        </button>
      </div>
    </>
  );
}
