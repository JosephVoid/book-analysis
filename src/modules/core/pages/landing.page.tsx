"use client";

import Header from "../components/header";
import { Book, Character } from "@/src/types";
import CharacterGraph from "../components/character-graph";
import React from "react";
import BookInfo from "../components/book-info";
import CharacterAvatarProvider from "@/src/utils/character-provider";

export default function LandingPage() {
  const [book, setBook] = React.useState<Book | null>(null);
  const [characters, setCharacters] = React.useState<Character[] | null>(null);

  React.useEffect(() => {
    if (book) {
      document.getElementById("book-info")?.scrollIntoView({
        behavior: "smooth",
      });
    }
  }, [book]);

  React.useEffect(() => {
    if (characters) {
      document.getElementById("graph")?.scrollIntoView({
        behavior: "smooth",
      });
    }
  }, [characters]);

  const handleBookSelect = (book: Book) => {
    setBook(book);
    setCharacters(null);
  };

  return (
    <div className="flex justify-center p-10">
      <div className="w-1/2 flex flex-col">
        {/* Search Bar */}
        <Header onBookSelect={handleBookSelect} />
        {/* Book */}
        {book && <BookInfo {...book} onCharactersSet={setCharacters} />}
        {/* Analysis */}
        {characters && (
          <CharacterAvatarProvider>
            <CharacterGraph characters={characters} />
          </CharacterAvatarProvider>
        )}
      </div>
    </div>
  );
}
