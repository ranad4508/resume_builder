"use client"

import type React from "react"

import { useState } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Sparkles, Loader2 } from "lucide-react"
import type { PersonalInfo } from "@/lib/types"
import { toast } from "@/components/ui/use-toast"

interface PersonalInfoFormProps {
  data: PersonalInfo
  onChange: (data: PersonalInfo) => void
}

export function PersonalInfoForm({ data, onChange }: PersonalInfoFormProps) {
  const [isGenerating, setIsGenerating] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    onChange({
      ...data,
      [name]: value,
    })
  }

  const generateSummary = async () => {
    if (!data.name && !data.title) {
      toast({
        title: "Missing information",
        description: "Please provide at least your name and professional title for better results.",
        variant: "destructive",
      })
      return
    }

    setIsGenerating(true)

    try {
      const response = await fetch("/api/generate-summary", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: data.name,
          title: data.title,
          experience: "", // Could add more context here if available
        }),
      })

      if (!response.ok) {
        throw new Error("Failed to generate summary")
      }

      const result = await response.json()

      if (result.summary) {
        onChange({
          ...data,
          summary: result.summary,
        })
        toast({
          title: "Summary generated",
          description: "Your professional summary has been generated successfully.",
        })
      } else if (result.error) {
        throw new Error(result.error)
      }
    } catch (error) {
      console.error("Error generating summary:", error)
      toast({
        title: "Generation failed",
        description: "Failed to generate summary. Please try again later.",
        variant: "destructive",
      })
    } finally {
      setIsGenerating(false)
    }
  }

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <Label htmlFor="name">Full Name</Label>
          <Input id="name" name="name" value={data.name} onChange={handleChange} placeholder="John Doe" />
        </div>

        <div className="space-y-2">
          <Label htmlFor="title">Professional Title</Label>
          <Input id="title" name="title" value={data.title} onChange={handleChange} placeholder="Software Engineer" />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            name="email"
            type="email"
            value={data.email}
            onChange={handleChange}
            placeholder="john.doe@example.com"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="phone">Phone</Label>
          <Input id="phone" name="phone" value={data.phone} onChange={handleChange} placeholder="(123) 456-7890" />
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="location">Location</Label>
        <Input id="location" name="location" value={data.location} onChange={handleChange} placeholder="New York, NY" />
      </div>

      <div className="space-y-2">
        <div className="flex justify-between items-center">
          <Label htmlFor="summary">Professional Summary</Label>
          <Button
            variant="outline"
            size="sm"
            onClick={generateSummary}
            disabled={isGenerating}
            className="text-xs border-indigo-200 text-indigo-700"
          >
            {isGenerating ? (
              <>
                <Loader2 className="h-3 w-3 mr-1 animate-spin" />
                Generating...
              </>
            ) : (
              <>
                <Sparkles className="h-3 w-3 mr-1" />
                Generate with AI
              </>
            )}
          </Button>
        </div>
        <Textarea
          id="summary"
          name="summary"
          value={data.summary}
          onChange={handleChange}
          placeholder="Write a brief summary of your professional background and key strengths..."
          rows={5}
        />
        <p className="text-xs text-gray-500">
          A compelling summary helps you stand out. Keep it concise and highlight your key strengths.
        </p>
      </div>
    </motion.div>
  )
}
