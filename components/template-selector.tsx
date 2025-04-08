"use client";

import { motion } from "framer-motion";
import { Check } from "lucide-react";
import type { TemplateId } from "@/lib/types";

interface TemplateSelectorProps {
  selectedTemplate: TemplateId;
  onSelectTemplate: (template: TemplateId) => void;
}

export function TemplateSelector({
  selectedTemplate,
  onSelectTemplate,
}: TemplateSelectorProps) {
  const templates = [
    {
      id: "modern" as TemplateId,
      name: "Modern",
      description: "Clean and contemporary design with a sidebar",
      image: "/template-1.png",
    },
    {
      id: "minimal" as TemplateId,
      name: "Minimal",
      description: "Simple and elegant with a focus on content",
      image: "/template-2.png",
    },
    {
      id: "professional" as TemplateId,
      name: "Professional",
      description: "Traditional format ideal for corporate roles",
      image: "/template-3.png",
    },
    {
      id: "creative" as TemplateId,
      name: "Creative",
      description: "Bold design for creative industries",
      image: "/template-4.png",
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
      {templates.map((template) => (
        <motion.div
          key={template.id}
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.98 }}
          className={`relative cursor-pointer rounded-lg overflow-hidden border-2 transition-colors ${
            selectedTemplate === template.id
              ? "border-indigo-600"
              : "border-gray-200 hover:border-indigo-300"
          }`}
          onClick={() => onSelectTemplate(template.id)}
        >
          {selectedTemplate === template.id && (
            <div className="absolute top-2 right-2 bg-indigo-600 text-white rounded-full p-1">
              <Check className="h-4 w-4" />
            </div>
          )}
          <div className="p-2">
            <img
              src={template.image || "/placeholder.svg"}
              alt={template.name}
              className="w-full h-auto rounded border border-gray-100"
            />
          </div>
          <div className="p-3 bg-gray-50">
            <h3 className="font-medium text-gray-800">{template.name}</h3>
            <p className="text-xs text-gray-500 mt-1">{template.description}</p>
          </div>
        </motion.div>
      ))}
    </div>
  );
}
