"use client"

import { motion } from "framer-motion"
import { ModernTemplate } from "./templates/modern-template"
import { MinimalTemplate } from "./templates/minimal-template"
import { ProfessionalTemplate } from "./templates/professional-template"
import { CreativeTemplate } from "./templates/creative-template"
import type { ResumeData, TemplateId } from "@/lib/types"

interface ResumePreviewProps {
  data: ResumeData
  template: TemplateId
}

export function ResumePreview({ data, template }: ResumePreviewProps) {
  const renderTemplate = () => {
    switch (template) {
      case "modern":
        return <ModernTemplate data={data} />
      case "minimal":
        return <MinimalTemplate data={data} />
      case "professional":
        return <ProfessionalTemplate data={data} />
      case "creative":
        return <CreativeTemplate data={data} />
      default:
        return <ModernTemplate data={data} />
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="w-full h-full"
    >
      {renderTemplate()}
    </motion.div>
  )
}
