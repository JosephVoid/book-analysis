import searchBooksAction from "@/src/modules/book-fetch/lib/actions/search-books.action";
import fetchBookAction from "@/src/modules/book-fetch/lib/actions/fetch-book.action";
import getCharacters from "@/src/modules/book-analyze/lib/actions/get-characters.actions";
import generateAvatar from "@/src/modules/book-analyze/lib/actions/generate-avatars.action";
import { Book, Character } from "@/src/types";

describe("Full Test", () => {
  let book: Book;

  beforeAll(async () => {
    const books = await searchBooksAction("Dracula");
    book = await fetchBookAction(books[0].id.toString());
  });

  it("should fetch a book", () => {
    expect(book).toBeTruthy();
    expect(book.title).toBe("Moby Dick; Or, The Whale");
  });

  it("should get characters and their interactions from the book", async () => {
    const characters = await getCharacters(book);
    expect(characters).toBeTruthy();
    if (characters) {
      console.log(JSON.stringify(characters, null, 4));
      expect(characters.length).toBeGreaterThan(0);
    }
  });

  it("should generate avatars for the characters", async () => {
    const character: Character = {
      name: "Dracula",
      description: "A vampire",
      interactions: [],
    };
    const avatarUrl = await generateAvatar(character, book);
    expect(avatarUrl).toBeTruthy();
  });
});
