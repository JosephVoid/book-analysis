"use server";

import { Book } from "@/src/types";
import axios from "axios";

export default async function searchBooksAction(
  search: string
): Promise<Book[]> {
  const encodedSearch = encodeURIComponent(search);
  const response = await axios.get(
    `https://gutendex.com/books?search=${encodedSearch}`
  );
  return response.data.results;
}
