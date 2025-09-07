"use server";

import { GEMINI_KEY } from "@/src/utils/constants";
import { GoogleGenerativeAI } from "@google/generative-ai";

export default async function getInteractionAction(
  bookTitle?: string,
  character1?: string,
  character2?: string
): Promise<string | null> {
  try {
    console.log({ bookTitle, character1, character2 });
    if (!bookTitle || !character1 || !character2) return null;
    const genAI = new GoogleGenerativeAI(GEMINI_KEY);
    const model = genAI.getGenerativeModel({
      model: "gemini-2.0-flash-001",
    });

    const prompt = `Based on the book "${bookTitle}", please describe the interaction between ${character1} and ${character2}. No more than 75 words`;

    const result = await model.generateContent(prompt);

    if (!result.response.text()) return null;
    return result.response.text();
  } catch (error) {
    console.log("ERROR: ", error);
    return null;
  }
}
