"use client"

import { useState, useEffect } from "react"
import { useSearchParams } from "next/navigation"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  FileText,
  User,
  Briefcase,
  GraduationCap,
  Code,
  Save,
  Download,
  Sparkles,
  ArrowLeft,
  ArrowRight,
  Share2,
  Check,
} from "lucide-react"
import { ResumePreview } from "@/components/resume-preview"
import { PersonalInfoForm } from "@/components/personal-info-form"
import { ExperienceForm } from "@/components/experience-form"
import { EducationForm } from "@/components/education-form"
import { SkillsForm } from "@/components/skills-form"
import { TemplateSelector } from "@/components/template-selector"
import { exportToPdf, saveToLocalStorage, loadFromLocalStorage, shareResume } from "@/lib/pdf-export"
import type { ResumeData, TemplateId } from "@/lib/types"
import { toast } from "@/components/ui/use-toast"
import { ToastAction } from "@/components/ui/toast"
import { Toaster } from "@/components/ui/toaster"

export default function ResumeBuilder() {
  const searchParams = useSearchParams()
  const [activeTab, setActiveTab] = useState("templates")
  const [selectedTemplate, setSelectedTemplate] = useState<TemplateId>("modern")
  const [isSharing, setIsSharing] = useState(false)
  const [isSaving, setIsSaving] = useState(false)
  const [isExporting, setIsExporting] = useState(false)
  const [resumeData, setResumeData] = useState<ResumeData>({
    personalInfo: {
      name: "",
      title: "",
      email: "",
      phone: "",
      location: "",
      summary: "",
    },
    experience: [],
    education: [],
    skills: [],
  })

  // Load template from URL params
  useEffect(() => {
    const templateParam = searchParams.get("template") as TemplateId | null
    if (templateParam) {
      setSelectedTemplate(templateParam)
      setActiveTab("personal")
    }

    // Try to load data from URL
    const dataParam = searchParams.get("data")
    if (dataParam) {
      try {
        const decodedData = JSON.parse(atob(dataParam))
        setResumeData(decodedData)
      } catch (error) {
        console.error("Error parsing resume data from URL:", error)
      }
    } else {
      // Try to load from localStorage
      const savedData = loadFromLocalStorage()
      if (savedData) {
        setResumeData(savedData)
      }
    }
  }, [searchParams])

  const updateResumeData = (section: keyof ResumeData, data: any) => {
    setResumeData((prev) => ({
      ...prev,
      [section]: data,
    }))
  }

  const handleNext = () => {
    const tabs = ["templates", "personal", "experience", "education", "skills", "preview"]
    const currentIndex = tabs.indexOf(activeTab)
    if (currentIndex < tabs.length - 1) {
      setActiveTab(tabs[currentIndex + 1])
    }
  }

  const handlePrevious = () => {
    const tabs = ["templates", "personal", "experience", "education", "skills", "preview"]
    const currentIndex = tabs.indexOf(activeTab)
    if (currentIndex > 0) {
      setActiveTab(tabs[currentIndex - 1])
    }
  }

  const handleSave = () => {
    setIsSaving(true)
    saveToLocalStorage(resumeData)

    setTimeout(() => {
      setIsSaving(false)
      toast({
        title: "Resume saved",
        description: "Your resume has been saved to your browser's local storage.",
        action: <ToastAction altText="OK">OK</ToastAction>,
      })
    }, 1000)
  }

  const handleExport = async () => {
    setIsExporting(true)
    await exportToPdf("resume-preview", `${resumeData.personalInfo.name || "resume"}.pdf`)

    setTimeout(() => {
      setIsExporting(false)
      toast({
        title: "Resume exported",
        description: "Your resume has been exported as a PDF file.",
        action: <ToastAction altText="OK">OK</ToastAction>,
      })
    }, 1000)
  }

  const handleShare = async () => {
    setIsSharing(true)
    const shareUrl = await shareResume(resumeData, selectedTemplate)

    setTimeout(() => {
      setIsSharing(false)
      toast({
        title: "Share link copied",
        description: "A link to your resume has been copied to your clipboard.",
        action: <ToastAction altText="OK">OK</ToastAction>,
      })
    }, 1000)
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-indigo-50 to-purple-50">
      <header className="container mx-auto py-6 px-4 border-b border-indigo-100">
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-2">
            <FileText className="h-6 w-6 text-indigo-600" />
            <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-purple-600">
              ResumeAI
            </span>
          </div>
          <div className="flex items-center gap-3">
            <Button
              variant="outline"
              size="sm"
              className="border-indigo-200 text-indigo-700"
              onClick={handleSave}
              disabled={isSaving}
            >
              <Save className="h-4 w-4 mr-2" /> {isSaving ? "Saving..." : "Save"}
            </Button>
            <Button
              variant="outline"
              size="sm"
              className="border-indigo-200 text-indigo-700"
              onClick={handleShare}
              disabled={isSharing}
            >
              {isSharing ? <Check className="h-4 w-4 mr-2" /> : <Share2 className="h-4 w-4 mr-2" />}
              {isSharing ? "Copied!" : "Share"}
            </Button>
            <Button
              size="sm"
              className="bg-indigo-600 hover:bg-indigo-700"
              onClick={handleExport}
              disabled={isExporting}
            >
              <Download className="h-4 w-4 mr-2" /> {isExporting ? "Exporting..." : "Export PDF"}
            </Button>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <div className="mb-8">
            <TabsList className="w-full grid grid-cols-3 md:grid-cols-6 h-auto p-1 bg-indigo-100 rounded-lg">
              <TabsTrigger
                value="templates"
                className="data-[state=active]:bg-white data-[state=active]:text-indigo-700 py-3"
              >
                <div className="flex flex-col items-center gap-1">
                  <FileText className="h-4 w-4" />
                  <span className="text-xs">Templates</span>
                </div>
              </TabsTrigger>
              <TabsTrigger
                value="personal"
                className="data-[state=active]:bg-white data-[state=active]:text-indigo-700 py-3"
              >
                <div className="flex flex-col items-center gap-1">
                  <User className="h-4 w-4" />
                  <span className="text-xs">Personal</span>
                </div>
              </TabsTrigger>
              <TabsTrigger
                value="experience"
                className="data-[state=active]:bg-white data-[state=active]:text-indigo-700 py-3"
              >
                <div className="flex flex-col items-center gap-1">
                  <Briefcase className="h-4 w-4" />
                  <span className="text-xs">Experience</span>
                </div>
              </TabsTrigger>
              <TabsTrigger
                value="education"
                className="data-[state=active]:bg-white data-[state=active]:text-indigo-700 py-3"
              >
                <div className="flex flex-col items-center gap-1">
                  <GraduationCap className="h-4 w-4" />
                  <span className="text-xs">Education</span>
                </div>
              </TabsTrigger>
              <TabsTrigger
                value="skills"
                className="data-[state=active]:bg-white data-[state=active]:text-indigo-700 py-3"
              >
                <div className="flex flex-col items-center gap-1">
                  <Code className="h-4 w-4" />
                  <span className="text-xs">Skills</span>
                </div>
              </TabsTrigger>
              <TabsTrigger
                value="preview"
                className="data-[state=active]:bg-white data-[state=active]:text-indigo-700 py-3"
              >
                <div className="flex flex-col items-center gap-1">
                  <FileText className="h-4 w-4" />
                  <span className="text-xs">Preview</span>
                </div>
              </TabsTrigger>
            </TabsList>
          </div>

          <div className="grid md:grid-cols-[1fr_400px] gap-8">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeTab}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
                className="bg-white p-6 rounded-xl shadow-sm border border-indigo-100"
              >
                <TabsContent value="templates" className="mt-0">
                  <div className="space-y-6">
                    <div>
                      <h2 className="text-2xl font-bold text-gray-800 mb-2">Choose a Template</h2>
                      <p className="text-gray-600">Select a template that best represents your professional style</p>
                    </div>

                    <TemplateSelector selectedTemplate={selectedTemplate} onSelectTemplate={setSelectedTemplate} />
                  </div>
                </TabsContent>

                <TabsContent value="personal" className="mt-0">
                  <div className="space-y-6">
                    <div>
                      <h2 className="text-2xl font-bold text-gray-800 mb-2">Personal Information</h2>
                      <p className="text-gray-600">Add your contact details and personal summary</p>
                    </div>

                    <PersonalInfoForm
                      data={resumeData.personalInfo}
                      onChange={(data) => updateResumeData("personalInfo", data)}
                    />
                  </div>
                </TabsContent>

                <TabsContent value="experience" className="mt-0">
                  <div className="space-y-6">
                    <div>
                      <h2 className="text-2xl font-bold text-gray-800 mb-2">Work Experience</h2>
                      <p className="text-gray-600">Add your relevant work experience</p>
                    </div>

                    <ExperienceForm
                      data={resumeData.experience}
                      onChange={(data) => updateResumeData("experience", data)}
                    />
                  </div>
                </TabsContent>

                <TabsContent value="education" className="mt-0">
                  <div className="space-y-6">
                    <div>
                      <h2 className="text-2xl font-bold text-gray-800 mb-2">Education</h2>
                      <p className="text-gray-600">Add your educational background</p>
                    </div>

                    <EducationForm
                      data={resumeData.education}
                      onChange={(data) => updateResumeData("education", data)}
                    />
                  </div>
                </TabsContent>

                <TabsContent value="skills" className="mt-0">
                  <div className="space-y-6">
                    <div>
                      <h2 className="text-2xl font-bold text-gray-800 mb-2">Skills & Languages</h2>
                      <p className="text-gray-600">Add your technical skills and language proficiencies</p>
                    </div>

                    <SkillsForm data={resumeData.skills} onChange={(data) => updateResumeData("skills", data)} />
                  </div>
                </TabsContent>

                <TabsContent value="preview" className="mt-0">
                  <div className="space-y-6">
                    <div>
                      <h2 className="text-2xl font-bold text-gray-800 mb-2">Preview Your Resume</h2>
                      <p className="text-gray-600">Review your resume before downloading</p>
                    </div>

                    <div className="flex justify-center">
                      <div className="w-full max-w-[600px] border border-gray-200 rounded-lg shadow-md">
                        <div id="resume-preview">
                          <ResumePreview data={resumeData} template={selectedTemplate} />
                        </div>
                      </div>
                    </div>

                    <div className="flex justify-center gap-4 pt-4">
                      <Button
                        className="bg-indigo-600 hover:bg-indigo-700"
                        onClick={handleExport}
                        disabled={isExporting}
                      >
                        <Download className="h-4 w-4 mr-2" /> {isExporting ? "Exporting..." : "Download PDF"}
                      </Button>
                      <Button
                        variant="outline"
                        className="border-indigo-200 text-indigo-700"
                        onClick={handleShare}
                        disabled={isSharing}
                      >
                        {isSharing ? <Check className="h-4 w-4 mr-2" /> : <Share2 className="h-4 w-4 mr-2" />}
                        {isSharing ? "Copied!" : "Share Resume"}
                      </Button>
                    </div>
                  </div>
                </TabsContent>
              </motion.div>
            </AnimatePresence>

            <div className="hidden md:block">
              <div className="sticky top-8">
                <div className="bg-white p-4 rounded-xl shadow-sm border border-indigo-100 mb-6">
                  <h3 className="font-semibold text-gray-800 mb-3">Resume Preview</h3>
                  <div className="border border-gray-200 rounded-lg overflow-hidden">
                    <ResumePreview data={resumeData} template={selectedTemplate} />
                  </div>
                </div>

                <div className="bg-indigo-50 p-4 rounded-xl border border-indigo-100">
                  <div className="flex items-start gap-3">
                    <div className="bg-indigo-100 p-2 rounded-full">
                      <Sparkles className="h-5 w-5 text-indigo-600" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-800 mb-1">AI Assistant</h3>
                      <p className="text-sm text-gray-600 mb-3">
                        Need help with your content? Our AI can suggest improvements.
                      </p>
                      <Button
                        size="sm"
                        className="w-full bg-indigo-600 hover:bg-indigo-700"
                        onClick={() => {
                          toast({
                            title: "AI Assistant",
                            description:
                              "Based on your current tab, use the 'Generate with AI' buttons to create content for your resume.",
                          })
                        }}
                      >
                        <Sparkles className="h-4 w-4 mr-2" /> Get Suggestions
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="flex justify-between mt-8">
            <Button
              variant="outline"
              onClick={handlePrevious}
              disabled={activeTab === "templates"}
              className="border-indigo-200 text-indigo-700"
            >
              <ArrowLeft className="h-4 w-4 mr-2" /> Previous
            </Button>
            <Button
              onClick={handleNext}
              disabled={activeTab === "preview"}
              className="bg-indigo-600 hover:bg-indigo-700"
            >
              {activeTab === "skills" ? (
                <>
                  Preview <FileText className="h-4 w-4 ml-2" />
                </>
              ) : (
                <>
                  Next <ArrowRight className="h-4 w-4 ml-2" />
                </>
              )}
            </Button>
          </div>
        </Tabs>
      </main>
      <Toaster />
    </div>
  )
}
