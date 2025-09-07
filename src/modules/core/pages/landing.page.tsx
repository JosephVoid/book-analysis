"use client";

import Header from "../components/header";
import { Book, Character } from "@/src/types";
import CharacterGraph from "../components/character-graph";
import React from "react";
import BookInfo from "../components/book-info";
import AppProvider from "@/src/utils/app-provider";
import NavBar from "../components/nav-bar";

export default function LandingPage() {
  const [book, setBook] = React.useState<Book | null>(null);
  const [characters, setCharacters] = React.useState<Character[] | null>(null);
  const [showNav, setShowNav] = React.useState(false);

  React.useEffect(() => {
    const handleScroll = () => {
      const bookInfo = document.getElementById("book-info");
      const characterGraph = document.getElementById("graph");
      if (bookInfo || characterGraph) {
        const bookInfoTop = bookInfo?.getBoundingClientRect().top ?? Infinity;
        const characterGraphTop =
          characterGraph?.getBoundingClientRect().top ?? Infinity;
        if (bookInfoTop - 1 < 0 || characterGraphTop < 0) {
          setShowNav(true);
        } else {
          setShowNav(false);
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [book, characters]);

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
      <AppProvider>
        <div className="w-1/2 flex flex-col">
          {showNav && <NavBar onBookSelect={handleBookSelect} />}
          {/* Search Bar */}
          <Header onBookSelect={handleBookSelect} />
          {/* Book */}
          {book && <BookInfo {...book} onCharactersSet={setCharacters} />}
          {/* Analysis */}
          {characters && <CharacterGraph characters={characters} />}
        </div>
      </AppProvider>
    </div>
  );
}
