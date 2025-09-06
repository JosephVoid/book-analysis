"use client";

import BookCard from "../components/book-cards";
import Header from "../components/header";
import { Character } from "@/src/types";
import CharacterGraph from "../components/character-graph";

export default function LandingPage() {
  const characters: Character[] = [
    {
      name: "Alice",
      description: "Main character",
      avatar:
        "https://fastly.picsum.photos/id/27/200/200.jpg?hmac=CR097EjlzbMVaroKJsDHX-nARM-O-4gnpDICBxhqbEU",
      interactions: [
        { name: "Bob", count: 3 },
        { name: "Charlie", count: 2 },
      ],
    },
    {
      name: "Bob",
      description: "Friend",
      interactions: [{ name: "Charlie", count: 1 }],
    },
    {
      name: "Charlie",
      description: "Mysterious cat",
      interactions: [],
    },
  ];

  return (
    <div className="flex justify-center p-10">
      <div className="w-1/2 flex flex-col">
        {/* Search Bar */}
        <section className="flex flex-col gap-6 justify-center items-center mb-10">
          <Header onSearch={(str: string) => null} />
          <div className="flex flex-wrap gap-4">
            <BookCard
              title="Title of a very long book title name"
              selected={false}
            />
          </div>
        </section>
        {/* Book */}
        <section className="flex flex-col gap-6 justify-center py-5">
          <h1 className="text-5xl font-extrabold">Dracula</h1>
          <div className="flex gap-3">
            <div className="w-1/4">
              <img
                src={
                  "https://www.gutenberg.org/cache/epub/345/pg345.cover.medium.jpg"
                }
              />
            </div>
            <div className="w-3/4 flex flex-col gap-4">
              <p className="text-xs line-clamp-[10]">
                Dracula by Bram Stoker is a Gothic horror novel written in the
                late 19th century. The story unfolds through a series of
                letters, journal entries, and newspaper clippings, primarily
                following the experiences of Jonathan Harker, a young English
                solicitor. Harker’s journey takes him to Transylvania, where he
                encounters the enigmatic Count Dracula, setting a thrilling and
                mysterious tone that delves into themes of fear, seduction, and
                the supernatural. The opening of the novel presents Jonathan
                Harker’s journal entries, marking the beginning of his travels
                to meet Count Dracula regarding a real estate transaction.
                Harker describes his train journey through the picturesque
                landscapes of eastern Europe, highlighting the eerie atmosphere
                and local superstitions that hint at the challenges he will
                face. Upon arriving at the Count's castle, Harker senses unease,
                especially when local villagers express concern and give him
                protective charms against evil spirits. The tension escalates as
                Harker meets Dracula, who, while courteous, exhibits strange and
                unsettling behavior. Kafkaesque and claustrophobic, the initial
                chapters effectively set the stage for Harker’s realization that
                he is trapped in Dracula’s world, creating an eerie, suspenseful
                foundation for the unfolding narrative. (This is an
                automatically generated summary.)
              </p>
              <p className="text-xs">by Stoker, Bram</p>
              <button className="btn btn-soft rounded-xs btn-primary">
                Analyze with Gemini
              </button>
            </div>
          </div>
        </section>
        {/* Analysis */}
        <section className="flex flex-col gap-6 justify-center py-5">
          <h3 className="text-2xl font-bold">Characters and Interactions</h3>
          <CharacterGraph characters={characters} />
        </section>
      </div>
    </div>
  );
}
