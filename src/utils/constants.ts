export const GEMINI_KEY = process.env.GEMINI_API_KEY as string;

if (!GEMINI_KEY) {
  throw new Error("❌ Missing GEMINI_API_KEY in environment");
}
