"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Plus, Trash2 } from "lucide-react"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import type { Education } from "@/lib/types"

interface EducationFormProps {
  data: Education[]
  onChange: (data: Education[]) => void
}

export function EducationForm({ data = [], onChange }: EducationFormProps) {
  const [expandedItem, setExpandedItem] = useState<string | null>(null)

  const addEducation = () => {
    const newEducation: Education = {
      id: Date.now().toString(),
      institution: "",
      degree: "",
      field: "",
      location: "",
      startDate: "",
      endDate: "",
      description: "",
    }

    const newData = [...data, newEducation]
    onChange(newData)
    setExpandedItem(newEducation.id)
  }

  const updateEducation = (id: string, field: keyof Education, value: string) => {
    const newData = data.map((item) => (item.id === id ? { ...item, [field]: value } : item))
    onChange(newData)
  }

  const removeEducation = (id: string) => {
    const newData = data.filter((item) => item.id !== id)
    onChange(newData)
  }

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
      {data.length === 0 ? (
        <div className="text-center py-8 border border-dashed border-gray-300 rounded-lg">
          <p className="text-gray-500 mb-4">No education added yet</p>
          <Button onClick={addEducation} className="bg-indigo-600 hover:bg-indigo-700">
            <Plus className="h-4 w-4 mr-2" /> Add Education
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
            {data.map((education, index) => (
              <AccordionItem
                key={education.id}
                value={education.id}
                className="border border-gray-200 rounded-lg overflow-hidden"
              >
                <AccordionTrigger className="px-4 py-3 hover:bg-gray-50">
                  <div className="flex items-center justify-between w-full">
                    <div className="flex items-center gap-2">
                      <div className="bg-indigo-100 text-indigo-700 w-6 h-6 rounded-full flex items-center justify-center text-xs font-medium">
                        {index + 1}
                      </div>
                      <div className="text-left">
                        <h3 className="font-medium">{education.degree || "Degree"}</h3>
                        <p className="text-sm text-gray-500">{education.institution || "Institution Name"}</p>
                      </div>
                    </div>
                  </div>
                </AccordionTrigger>
                <AccordionContent className="px-4 py-3 border-t border-gray-200">
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor={`institution-${education.id}`}>Institution</Label>
                      <Input
                        id={`institution-${education.id}`}
                        value={education.institution}
                        onChange={(e) => updateEducation(education.id, "institution", e.target.value)}
                        placeholder="University or School Name"
                      />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor={`degree-${education.id}`}>Degree</Label>
                        <Input
                          id={`degree-${education.id}`}
                          value={education.degree}
                          onChange={(e) => updateEducation(education.id, "degree", e.target.value)}
                          placeholder="Bachelor's, Master's, etc."
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor={`field-${education.id}`}>Field of Study</Label>
                        <Input
                          id={`field-${education.id}`}
                          value={education.field}
                          onChange={(e) => updateEducation(education.id, "field", e.target.value)}
                          placeholder="Computer Science, Business, etc."
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor={`startDate-${education.id}`}>Start Date</Label>
                        <Input
                          id={`startDate-${education.id}`}
                          value={education.startDate}
                          onChange={(e) => updateEducation(education.id, "startDate", e.target.value)}
                          placeholder="MM/YYYY"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor={`endDate-${education.id}`}>End Date</Label>
                        <Input
                          id={`endDate-${education.id}`}
                          value={education.endDate}
                          onChange={(e) => updateEducation(education.id, "endDate", e.target.value)}
                          placeholder="MM/YYYY or Present"
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor={`location-${education.id}`}>Location</Label>
                      <Input
                        id={`location-${education.id}`}
                        value={education.location}
                        onChange={(e) => updateEducation(education.id, "location", e.target.value)}
                        placeholder="City, State"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor={`description-${education.id}`}>Description (Optional)</Label>
                      <Textarea
                        id={`description-${education.id}`}
                        value={education.description}
                        onChange={(e) => updateEducation(education.id, "description", e.target.value)}
                        placeholder="Relevant coursework, achievements, activities..."
                        rows={3}
                      />
                    </div>

                    <div className="flex justify-end">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => removeEducation(education.id)}
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
            onClick={addEducation}
            className="w-full border-dashed border-indigo-200 text-indigo-700"
          >
            <Plus className="h-4 w-4 mr-2" /> Add Another Education
          </Button>
        </>
      )}
    </motion.div>
  )
}
