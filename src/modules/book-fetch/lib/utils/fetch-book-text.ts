import { Book } from "@/src/types";
import axios from "axios";
import { getFirstTwoChapters } from "./get-chapters";

export default async function fetchBookText(book: Book) {
  try {
    const response = await axios.get(
      book.formats["text/plain; charset=us-ascii"]
    );
    if (response.statusText !== "OK") return null;
    else return getFirstTwoChapters(response.data);
  } catch (error) {
    console.log("ERROR: ", error);
    return null;
  }
}
