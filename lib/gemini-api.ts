import { GoogleGenerativeAI } from "@google/generative-ai";

// Initialize the Google Generative AI with the API key
const API_KEY = "AIzaSyDF53jAIf0_mLoeQ-6bd9gWqzmGnTiSNVs";
const genAI = new GoogleGenerativeAI(API_KEY);

export async function generateWithGemini(prompt: string): Promise<string> {
  try {
    // For text-only input, use the gemini-pro model
    const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();

    return text;
  } catch (error) {
    console.error("Error generating content with Gemini:", error);
    throw error;
  }
}
