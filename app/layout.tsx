import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "ResumeAI - AI-Powered Resume Builder",
  description:
    "ResumeAI is an AI-powered resume builder that helps you create professional resumes quickly and easily. Generate personalized summaries, experiences, and skills with the power of AI.",
  generator: "Next.js",
  applicationName: "ResumeAI",
  referrer: "origin-when-cross-origin",
  keywords: [
    "Resume Builder",
    "AI Resume Generator",
    "AI-Powered Resume",
    "Resume Writing",
    "Job Application",
    "Career Development",
    "Professional Summary",
    "Job Description",
    "Skills Assessment",
    "Resume Tips",
    "Resume Formatting",
    "Resume Templates",
    "Resume Examples",
    "Resume Optimization",
    "Resume Review",
    "Resume Feedback",
    "Resume Customization",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
