"use server";

import { Book, Character } from "@/src/types";
import { GEMINI_KEY } from "@/src/utils/constants";
import { base64ToImage } from "@/src/utils/helpers";
import { GoogleGenAI } from "@google/genai";

export default async function generateAvatarAction(
  character: Character,
  book: Book
) {
  try {
    const genAI = new GoogleGenAI({ apiKey: GEMINI_KEY });
    const model = genAI.models;

    const prompt = `Please generate an avatar for this character: \nname: ${character.name}, description: ${character.description}, from the book: ${book.title}\n make the art style clean, flat-style 2D illustrations`;

    const response = await model.generateContent({
      model: "gemini-2.5-flash-image-preview",
      contents: prompt,
    });

    if (!response.candidates) return null;

    const parts = response?.candidates[0]?.content?.parts ?? [];

    for (const part of parts) {
      if (part.text) {
        console.log(part.text);
      } else if (part.inlineData?.data) {
        const imageData = part.inlineData.data;
        const imageURL = base64ToImage(imageData);
        return imageURL;
      } else return null;
    }

    return null;
  } catch (error) {
    console.log("ERROR: ", error);
    return null;
  }
}
