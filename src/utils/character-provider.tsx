import React, { ReactNode } from "react";
import { Character } from "../types";
import { loadAvatars } from "./helpers";

export const CharacterContext = React.createContext<{
  characters: Character[];
  characterSetter: (chars: Character) => void;
} | null>(null);

export default function CharacterAvatarProvider({
  children,
}: {
  children: ReactNode;
}) {
  const [characters, setCharacters] = React.useState<Character[]>([]);

  React.useEffect(() => {
    setCharacters((chars) => loadAvatars(chars));
  }, []);

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

  return (
    <CharacterContext.Provider
      value={{ characters, characterSetter: handleCharacterSet }}
    >
      {children}
    </CharacterContext.Provider>
  );
}
