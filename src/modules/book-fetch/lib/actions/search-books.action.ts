"use server";

import { Book } from "@/src/types";
import axios from "axios";

export default async function searchBooksAction(
  search: string
): Promise<Book[] | null> {
  try {
    const encodedSearch = encodeURIComponent(search);
    const response = await axios.get(
      `https://gutendex.com/books?search=${encodedSearch}`
    );
    if (response.statusText !== "OK") return null;
    return response.data.results;
  } catch (error) {
    console.log("ERROR:", error);
    return null;
  }
}
