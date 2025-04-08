export interface PersonalInfo {
  name: string
  title: string
  email: string
  phone: string
  location: string
  summary: string
}

export interface Experience {
  id: string
  company: string
  position: string
  location: string
  startDate: string
  endDate: string
  current: boolean
  description: string
}

export interface Education {
  id: string
  institution: string
  degree: string
  field: string
  location: string
  startDate: string
  endDate: string
  description: string
}

export interface Skill {
  id: string
  name: string
  level: string
}

export interface ResumeData {
  personalInfo: PersonalInfo
  experience: Experience[]
  education: Education[]
  skills: Skill[]
}

export interface Template {
  id: string
  name: string
  description: string
  image: string
}

export type TemplateId = "modern" | "minimal" | "professional" | "creative"
