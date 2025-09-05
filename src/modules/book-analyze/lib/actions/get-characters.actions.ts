"use server";

import { Book, Character } from "@/src/types";
import { GEMINI_KEY } from "@/src/utils/constants";
import { GoogleGenAI } from "@google/genai";

export default async function getCharactersAction(
  book: Book
): Promise<Character[] | null> {
  try {
    const genAI = new GoogleGenAI({ apiKey: GEMINI_KEY });
    const model = genAI.models;

    const text = book.summaries.join(" ");

    const prompt = `Please analyze the following book text and provide a list of the main characters with a brief description of each. Return the data as a JSON array of objects, where each object has "name" and "description" properties. Do not include any other text in the response.\n\n${text.substring(
      0,
      10000
    )}`;

    const result = await model.generateContent({
      model: "gemini-2.0-flash-001",
      contents: prompt,
    });

    if (!result.text) return null;

    const response = result.text;
    const jsonResponse = JSON.parse(response);

    return jsonResponse as Character[];
  } catch (error) {
    console.log("ERROR: ", error);
    return null;
  }
}
