import { NextResponse } from "next/server";
import { generateWithGemini } from "@/lib/gemini-api";

export async function POST(request: Request) {
  try {
    const { position, company, startDate, endDate } = await request.json();

    const prompt = `
    Generate a professional job description for a resume with the following details:
    Position: ${position || "Not provided"}
    Company: ${company || "Not provided"}
    Duration: ${startDate || "Not provided"} to ${endDate || "Present"}
    
    The description should be concise (3-5 sentences), professional, and highlight key responsibilities and achievements.
    Include specific metrics or achievements where possible.
    Use bullet points if appropriate.
    Do not use phrases like "As requested" or "Here is a description".
    `;

    const description = await generateWithGemini(prompt);

    return NextResponse.json({ description });
  } catch (error) {
    console.error("Error generating experience description:", error);
    return NextResponse.json(
      {
        error: "Failed to generate experience description. Please try again.",
        details: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}
