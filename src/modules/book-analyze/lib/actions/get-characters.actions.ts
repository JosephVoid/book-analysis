"use server";

import fetchBookText from "@/src/modules/book-fetch/lib/utils/fetch-book-text";
import { Book, Character } from "@/src/types";
import { GEMINI_KEY } from "@/src/utils/constants";
import { parseGeminiJSON } from "@/src/utils/helpers";
import { GoogleGenerativeAI } from "@google/generative-ai";

export default async function getCharactersAction(
  bookTextUrl: string
): Promise<Character[] | null> {
  try {
    const genAI = new GoogleGenerativeAI(GEMINI_KEY);
    const model = genAI.getGenerativeModel({
      model: "gemini-2.0-flash-001",
    });

    const text = await fetchBookText(bookTextUrl);

    if (!text) return null;

    const prompt = `Please analyze the following book text and provide a list of the main 
    characters with a brief description of each and thier interactions with other characters. 
    Return the data as a JSON array of objects, where each object has "name", "description", "interactions" properties. 
    The "interactions" property must be in the shape of {name: string;count: number;}[]. Do not include any other text in the response.\n\n\n${text}`;

    const result = await model.generateContent(prompt);

    if (!result.response.text()) return null;

    const jsonResponse = parseGeminiJSON<Character[]>(result.response.text());

    return jsonResponse;
  } catch (error) {
    console.log("ERROR: ", error);
    return null;
  }
}
