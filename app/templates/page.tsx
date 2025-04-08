"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { FileText, ArrowLeft, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import type { Template } from "@/lib/types";

export default function TemplatesPage() {
  const [selectedTemplate, setSelectedTemplate] = useState<string | null>(null);

  const templates: Template[] = [
    {
      id: "modern",
      name: "Modern",
      description: "Clean and contemporary design with a sidebar",
      image: "/template-1.png",
    },
    {
      id: "minimal",
      name: "Minimal",
      description: "Simple and elegant with a focus on content",
      image: "/template-2.png",
    },
    {
      id: "professional",
      name: "Professional",
      description: "Traditional format ideal for corporate roles",
      image: "/template-3.png",
    },
    {
      id: "creative",
      name: "Creative",
      description: "Bold design for creative industries",
      image: "/template-4.png",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-indigo-50 to-purple-50">
      <header className="container mx-auto py-6 px-4 border-b border-indigo-100">
        <div className="flex justify-between items-center">
          <Link href="/" className="flex items-center gap-2">
            <FileText className="h-6 w-6 text-indigo-600" />
            <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-purple-600">
              ResumeAI
            </span>
          </Link>
        </div>
      </header>

      <main className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          <div className="mb-12 text-center">
            <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
              Choose Your Resume Template
            </h1>
            <p className="text-lg text-gray-600">
              Select a template that best represents your professional style and
              career goals
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {templates.map((template) => (
              <motion.div
                key={template.id}
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.98 }}
                className={`relative cursor-pointer rounded-xl overflow-hidden border-2 transition-colors ${
                  selectedTemplate === template.id
                    ? "border-indigo-600 shadow-md"
                    : "border-gray-200 hover:border-indigo-300"
                }`}
                onClick={() => setSelectedTemplate(template.id)}
              >
                <div className="p-3">
                  <img
                    src={template.image || "/placeholder.svg"}
                    alt={template.name}
                    className="w-full h-auto rounded-lg border border-gray-100"
                  />
                </div>
                <div className="p-4 bg-white">
                  <h3 className="font-bold text-gray-800 text-lg">
                    {template.name}
                  </h3>
                  <p className="text-gray-600 mt-1">{template.description}</p>
                </div>
                {selectedTemplate === template.id && (
                  <div className="absolute inset-0 bg-indigo-600 bg-opacity-10 flex items-center justify-center">
                    <div className="bg-white rounded-lg shadow-lg p-3">
                      <Button
                        asChild
                        className="bg-indigo-600 hover:bg-indigo-700"
                      >
                        <Link href={`/builder?template=${template.id}`}>
                          Use This Template
                        </Link>
                      </Button>
                    </div>
                  </div>
                )}
              </motion.div>
            ))}
          </div>

          <div className="mt-12 flex justify-between">
            <Button
              asChild
              variant="outline"
              className="border-indigo-200 text-indigo-700"
            >
              <Link href="/" className="flex items-center gap-2">
                <ArrowLeft className="h-4 w-4" /> Back to Home
              </Link>
            </Button>
            <Button
              asChild
              className="bg-indigo-600 hover:bg-indigo-700"
              disabled={!selectedTemplate}
            >
              <Link
                href={
                  selectedTemplate
                    ? `/builder?template=${selectedTemplate}`
                    : "#"
                }
                className="flex items-center gap-2"
              >
                Continue <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </main>

      <footer className="bg-gray-50 border-t border-gray-100 py-8 mt-20">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center gap-2 mb-4 md:mb-0">
              <FileText className="h-5 w-5 text-indigo-600" />
              <span className="text-lg font-bold bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-purple-600">
                ResumeAI
              </span>
            </div>
            <p className="text-sm text-gray-600">
              © {new Date().getFullYear()} ResumeAI. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
