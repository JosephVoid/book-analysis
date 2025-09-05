"use server";

import { Book } from "@/src/types";
import axios from "axios";

export default async function fetchBookAction(id: string): Promise<Book> {
  const response = await axios.get(`https://gutendex.com/books/${id}`);
  return response.data;
}
