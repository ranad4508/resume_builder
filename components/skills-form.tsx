"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Plus, X, Sparkles, Loader2 } from "lucide-react"
import type { Skill } from "@/lib/types"
import { toast } from "@/components/ui/use-toast"

interface SkillsFormProps {
  data: Skill[]
  onChange: (data: Skill[]) => void
}

export function SkillsForm({ data = [], onChange }: SkillsFormProps) {
  const [newSkill, setNewSkill] = useState("")
  const [isGenerating, setIsGenerating] = useState(false)

  const addSkill = () => {
    if (newSkill.trim() === "") return

    const skill: Skill = {
      id: Date.now().toString(),
      name: newSkill.trim(),
      level: "Intermediate",
    }

    onChange([...data, skill])
    setNewSkill("")
  }

  const removeSkill = (id: string) => {
    onChange(data.filter((skill) => skill.id !== id))
  }

  const updateSkillLevel = (id: string, level: string) => {
    onChange(data.map((skill) => (skill.id === id ? { ...skill, level } : skill)))
  }

  const generateSkills = async () => {
    setIsGenerating(true)

    try {
      const response = await fetch("/api/generate-skills", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title: "", // Could add context from personal info if available
          experience: "", // Could add context from experience if available
        }),
      })

      if (!response.ok) {
        throw new Error("Failed to generate skills")
      }

      const result = await response.json()

      if (result.skills && result.skills.length > 0) {
        onChange(result.skills)
        toast({
          title: "Skills generated",
          description: `${result.skills.length} skills have been generated successfully.`,
        })
      } else if (result.error) {
        throw new Error(result.error)
      }
    } catch (error) {
      console.error("Error generating skills:", error)
      toast({
        title: "Generation failed",
        description: "Failed to generate skills. Please try again later.",
        variant: "destructive",
      })
    } finally {
      setIsGenerating(false)
    }
  }

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <Label>Technical Skills</Label>
          <Button
            variant="outline"
            size="sm"
            onClick={generateSkills}
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
                Suggest Skills with AI
              </>
            )}
          </Button>
        </div>

        <div className="flex gap-2">
          <Input
            value={newSkill}
            onChange={(e) => setNewSkill(e.target.value)}
            placeholder="Add a skill (e.g. JavaScript, Project Management)"
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                e.preventDefault()
                addSkill()
              }
            }}
          />
          <Button onClick={addSkill} className="bg-indigo-600 hover:bg-indigo-700">
            <Plus className="h-4 w-4" />
          </Button>
        </div>

        {data.length === 0 ? (
          <div className="text-center py-6 border border-dashed border-gray-300 rounded-lg">
            <p className="text-gray-500">No skills added yet</p>
          </div>
        ) : (
          <div className="flex flex-wrap gap-2 mt-3">
            {data.map((skill) => (
              <div
                key={skill.id}
                className="flex items-center gap-2 bg-indigo-50 border border-indigo-100 rounded-full pl-3 pr-1 py-1"
              >
                <span className="text-sm">{skill.name}</span>
                <select
                  value={skill.level}
                  onChange={(e) => updateSkillLevel(skill.id, e.target.value)}
                  className="text-xs bg-transparent border-none focus:ring-0 p-0 pr-4"
                >
                  <option value="Beginner">Beginner</option>
                  <option value="Intermediate">Intermediate</option>
                  <option value="Advanced">Advanced</option>
                  <option value="Expert">Expert</option>
                </select>
                <button
                  onClick={() => removeSkill(skill.id)}
                  className="w-5 h-5 rounded-full flex items-center justify-center hover:bg-indigo-200 text-indigo-700"
                >
                  <X className="h-3 w-3" />
                </button>
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="border-t border-gray-200 pt-6">
        <p className="text-sm text-gray-600 mb-4">
          Pro tip: Include skills that are relevant to the job you're applying for. Tailor your skills list to match the
          job description.
        </p>
      </div>
    </motion.div>
  )
}
