import React, { ReactNode } from "react";
import { Book, Character } from "../types";
import { loadAvatars } from "./helpers";

export const AppContext = React.createContext<{
  characters: Character[];
  book: Book | null;
  characterSetter: (chars: Character) => void;
  bookSetter: (book: Book) => void;
  tokenCount: number;
  tokenCounter: (count: number) => void;
} | null>(null);

export default function AppProvider({ children }: { children: ReactNode }) {
  const [characters, setCharacters] = React.useState<Character[]>([]);
  const [book, setBook] = React.useState<Book | null>(null);
  const [tokens, setTokens] = React.useState<number>(0);

  const handleCharacterSet = (character: Character) => {
    setCharacters((chars) => {
      const exists = chars.some((c) => c.name === character.name);
      if (exists) {
        return chars.map((c) => (c.name === character.name ? character : c));
      } else {
        return [...chars, character];
      }
    });
  };

  const handleBookSet = (book: Book) => {
    setBook(book);
  };

  const handleTokenCount = (count: number) => {
    setTokens((prev) => prev + count);
  };

  return (
    <AppContext.Provider
      value={{
        characters,
        characterSetter: handleCharacterSet,
        book: book,
        bookSetter: handleBookSet,
        tokenCount: tokens,
        tokenCounter: handleTokenCount,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}
