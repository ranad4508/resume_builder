import { NextResponse } from "next/server";
import { generateWithGemini } from "@/lib/gemini-api";

export async function POST(request: Request) {
  try {
    const { name, title, experience } = await request.json();

    const prompt = `
    Generate a professional summary for a resume with the following details:
    Name: ${name || "Not provided"}
    Professional Title: ${title || "Not provided"}
    Experience: ${experience || "Not provided"}
    
    The summary should be concise (3-4 sentences), professional, and highlight key strengths and expertise.
    Focus on skills, achievements, and career goals that would be relevant for the given title.
    Do not use phrases like "As requested" or "Here is a summary".
    `;

    const summary = await generateWithGemini(prompt);

    return NextResponse.json({ summary });
  } catch (error) {
    console.error("Error generating summary:", error);
    return NextResponse.json(
      {
        error: "Failed to generate summary. Please try again.",
        details: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}
