"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Plus, Trash2, Sparkles, Loader2 } from "lucide-react"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import type { Experience } from "@/lib/types"
import { toast } from "@/components/ui/use-toast"

interface ExperienceFormProps {
  data: Experience[]
  onChange: (data: Experience[]) => void
}

export function ExperienceForm({ data = [], onChange }: ExperienceFormProps) {
  const [expandedItem, setExpandedItem] = useState<string | null>(null)
  const [generatingId, setGeneratingId] = useState<string | null>(null)

  const addExperience = () => {
    const newExperience: Experience = {
      id: Date.now().toString(),
      company: "",
      position: "",
      location: "",
      startDate: "",
      endDate: "",
      current: false,
      description: "",
    }

    const newData = [...data, newExperience]
    onChange(newData)
    setExpandedItem(newExperience.id)
  }

  const updateExperience = (id: string, field: keyof Experience, value: string | boolean) => {
    const newData = data.map((item) => (item.id === id ? { ...item, [field]: value } : item))
    onChange(newData)
  }

  const removeExperience = (id: string) => {
    const newData = data.filter((item) => item.id !== id)
    onChange(newData)
  }

  const generateDescription = async (id: string) => {
    const experience = data.find((item) => item.id === id)

    if (!experience) return

    if (!experience.position || !experience.company) {
      toast({
        title: "Missing information",
        description: "Please provide at least the position and company name for better results.",
        variant: "destructive",
      })
      return
    }

    setGeneratingId(id)

    try {
      const response = await fetch("/api/generate-experience", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          position: experience.position,
          company: experience.company,
          startDate: experience.startDate,
          endDate: experience.endDate || "Present",
        }),
      })

      if (!response.ok) {
        throw new Error("Failed to generate description")
      }

      const result = await response.json()

      if (result.description) {
        updateExperience(id, "description", result.description)
        toast({
          title: "Description generated",
          description: "Your experience description has been generated successfully.",
        })
      } else if (result.error) {
        throw new Error(result.error)
      }
    } catch (error) {
      console.error("Error generating description:", error)
      toast({
        title: "Generation failed",
        description: "Failed to generate description. Please try again later.",
        variant: "destructive",
      })
    } finally {
      setGeneratingId(null)
    }
  }

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
      {data.length === 0 ? (
        <div className="text-center py-8 border border-dashed border-gray-300 rounded-lg">
          <p className="text-gray-500 mb-4">No work experience added yet</p>
          <Button onClick={addExperience} className="bg-indigo-600 hover:bg-indigo-700">
            <Plus className="h-4 w-4 mr-2" /> Add Experience
          </Button>
        </div>
      ) : (
        <>
          <Accordion
            type="single"
            collapsible
            value={expandedItem}
            onValueChange={setExpandedItem}
            className="space-y-4"
          >
            {data.map((experience, index) => (
              <AccordionItem
                key={experience.id}
                value={experience.id}
                className="border border-gray-200 rounded-lg overflow-hidden"
              >
                <AccordionTrigger className="px-4 py-3 hover:bg-gray-50">
                  <div className="flex items-center justify-between w-full">
                    <div className="flex items-center gap-2">
                      <div className="bg-indigo-100 text-indigo-700 w-6 h-6 rounded-full flex items-center justify-center text-xs font-medium">
                        {index + 1}
                      </div>
                      <div className="text-left">
                        <h3 className="font-medium">{experience.position || "New Position"}</h3>
                        <p className="text-sm text-gray-500">{experience.company || "Company Name"}</p>
                      </div>
                    </div>
                  </div>
                </AccordionTrigger>
                <AccordionContent className="px-4 py-3 border-t border-gray-200">
                  <div className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor={`company-${experience.id}`}>Company</Label>
                        <Input
                          id={`company-${experience.id}`}
                          value={experience.company}
                          onChange={(e) => updateExperience(experience.id, "company", e.target.value)}
                          placeholder="Company Name"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor={`position-${experience.id}`}>Position</Label>
                        <Input
                          id={`position-${experience.id}`}
                          value={experience.position}
                          onChange={(e) => updateExperience(experience.id, "position", e.target.value)}
                          placeholder="Job Title"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor={`startDate-${experience.id}`}>Start Date</Label>
                        <Input
                          id={`startDate-${experience.id}`}
                          value={experience.startDate}
                          onChange={(e) => updateExperience(experience.id, "startDate", e.target.value)}
                          placeholder="MM/YYYY"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor={`endDate-${experience.id}`}>End Date</Label>
                        <Input
                          id={`endDate-${experience.id}`}
                          value={experience.endDate}
                          onChange={(e) => updateExperience(experience.id, "endDate", e.target.value)}
                          placeholder="MM/YYYY or Present"
                          disabled={experience.current}
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor={`location-${experience.id}`}>Location</Label>
                      <Input
                        id={`location-${experience.id}`}
                        value={experience.location}
                        onChange={(e) => updateExperience(experience.id, "location", e.target.value)}
                        placeholder="City, State"
                      />
                    </div>

                    <div className="space-y-2">
                      <div className="flex justify-between items-center">
                        <Label htmlFor={`description-${experience.id}`}>Description</Label>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => generateDescription(experience.id)}
                          disabled={generatingId === experience.id}
                          className="text-xs border-indigo-200 text-indigo-700"
                        >
                          {generatingId === experience.id ? (
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
                        id={`description-${experience.id}`}
                        value={experience.description}
                        onChange={(e) => updateExperience(experience.id, "description", e.target.value)}
                        placeholder="Describe your responsibilities and achievements..."
                        rows={4}
                      />
                      <p className="text-xs text-gray-500">
                        Use bullet points and quantify achievements when possible.
                      </p>
                    </div>

                    <div className="flex justify-end">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => removeExperience(experience.id)}
                        className="text-red-500 border-red-200 hover:bg-red-50 hover:text-red-600"
                      >
                        <Trash2 className="h-4 w-4 mr-1" />
                        Remove
                      </Button>
                    </div>
                  </div>
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>

          <Button
            variant="outline"
            onClick={addExperience}
            className="w-full border-dashed border-indigo-200 text-indigo-700"
          >
            <Plus className="h-4 w-4 mr-2" /> Add Another Experience
          </Button>
        </>
      )}
    </motion.div>
  )
}
