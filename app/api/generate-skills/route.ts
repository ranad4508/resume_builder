import { NextResponse } from "next/server";
import { generateWithGemini } from "@/lib/gemini-api";
import type { Skill } from "@/lib/types";

export async function POST(request: Request) {
  try {
    const { title, experience } = await request.json();

    const prompt = `
    Generate a list of 6-8 professional skills for a resume with the following details:
    Professional Title: ${title || "Not provided"}
    Experience: ${experience || "Not provided"}
    
    For each skill, provide a proficiency level (Beginner, Intermediate, Advanced, or Expert).
    Return the response as a JSON array with objects containing "name" and "level" properties.
    Example format: [{"name": "JavaScript", "level": "Expert"}, {"name": "Project Management", "level": "Intermediate"}]
    Focus on skills that would be relevant for the given title and experience.
    
    IMPORTANT: Return ONLY the JSON array, with no additional text before or after.
    `;

    const text = await generateWithGemini(prompt);

    // Parse the response as JSON
    let skills: Skill[] = [];
    try {
      // Clean the text to ensure it's valid JSON
      const cleanedText = text.replace(/```json|```/g, "").trim();
      const parsedSkills = JSON.parse(cleanedText);

      skills = parsedSkills.map((skill: any, index: number) => ({
        id: Date.now() + index + "",
        name: skill.name,
        level: skill.level,
      }));
    } catch (parseError) {
      console.error(
        "Error parsing skills JSON:",
        parseError,
        "Raw text:",
        text
      );

      // Fallback: Try to extract skills from text if JSON parsing fails
      const skillMatches = text.match(
        /["']name["']\s*:\s*["']([^"']+)["']\s*,\s*["']level["']\s*:\s*["']([^"']+)["']/g
      );
      if (skillMatches) {
        skills = skillMatches.map((match, index) => {
          const nameMatch = match.match(/["']name["']\s*:\s*["']([^"']+)["']/);
          const levelMatch = match.match(
            /["']level["']\s*:\s*["']([^"']+)["']/
          );
          return {
            id: Date.now() + index + "",
            name: nameMatch ? nameMatch[1] : `Skill ${index + 1}`,
            level: levelMatch ? levelMatch[1] : "Intermediate",
          };
        });
      } else {
        // If all parsing fails, create some default skills
        skills = [
          { id: Date.now() + "1", name: "Communication", level: "Advanced" },
          {
            id: Date.now() + "2",
            name: "Problem Solving",
            level: "Intermediate",
          },
          { id: Date.now() + "3", name: "Teamwork", level: "Expert" },
          { id: Date.now() + "4", name: "Time Management", level: "Advanced" },
          { id: Date.now() + "5", name: "Adaptability", level: "Intermediate" },
        ];
      }
    }

    return NextResponse.json({ skills });
  } catch (error) {
    console.error("Error generating skills:", error);
    return NextResponse.json(
      {
        error: "Failed to generate skills. Please try again.",
        details: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}
