"use server";

import { Book, Character } from "@/src/types";
import { GEMINI_KEY } from "@/src/utils/constants";
import { base64ToImage } from "@/src/utils/helpers";
import { GoogleGenerativeAI } from "@google/generative-ai";

export default async function generateAvatarAction(character: Character) {
  try {
    const genAI = new GoogleGenerativeAI(GEMINI_KEY);
    const model = genAI.getGenerativeModel({
      model: "gemini-2.5-flash-image-preview",
    });

    const prompt = `Please create an avatar picture for this character: \n
    name: ${character.name}, description: ${character.description}\n 
    make the art style clean, flat-style 2D illustrations.`;

    const result = await model.generateContent(prompt);

    if (!result.response.candidates) return null;

    const parts = result.response?.candidates[0]?.content?.parts ?? [];

    for (const part of parts) {
      if (part.text) {
        console.log(part.text);
      } else if (part.inlineData?.data) {
        const imageData = part.inlineData.data;
        return {
          data: base64ToImage(imageData),
          usage: result.response.usageMetadata?.totalTokenCount,
        };
      } else return null;
    }

    return null;
  } catch (error) {
    console.log("ERROR: ", error);
    return null;
  }
}
