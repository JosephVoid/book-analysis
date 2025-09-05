"use server";

import { Book, Character } from "@/src/types";
import { GEMINI_KEY } from "@/src/utils/constants";
import { parseGeminiJSON } from "@/src/utils/helpers";
import { GoogleGenerativeAI } from "@google/generative-ai";

export default async function getCharactersAction(
  book: Book
): Promise<Character[] | null> {
  try {
    const genAI = new GoogleGenerativeAI(GEMINI_KEY);
    const model = genAI.getGenerativeModel({
      model: "gemini-2.0-flash-001",
    });

    const text = book.summaries.join(" ");

    const prompt = `Please analyze the following book text and provide a list of the main characters with a brief description of each. Return the data as a JSON array of objects, where each object has "name" and "description" properties. Do not include any other text in the response.\n\n${text.substring(
      0,
      10000
    )}`;

    const result = await model.generateContent(prompt);

    if (!result.response.text()) return null;

    const jsonResponse = parseGeminiJSON<Character[]>(result.response.text());

    return jsonResponse;
  } catch (error) {
    console.log("ERROR: ", error);
    return null;
  }
}
