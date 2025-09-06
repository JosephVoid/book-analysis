"use server";

import { Book } from "@/src/types";
import axios from "axios";

export default async function fetchBookAction(
  id: string
): Promise<Book | null> {
  try {
    const response = await axios.get(`https://gutendex.com/books/${id}`);
    if (response.statusText !== "OK") return null;
    return response.data;
  } catch (error) {
    console.log("ERROR", error);
    return null;
  }
}
