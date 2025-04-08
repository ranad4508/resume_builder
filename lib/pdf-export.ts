import html2canvas from "html2canvas"
import jsPDF from "jspdf"
import type { ResumeData } from "./types"

export const exportToPdf = async (resumeId: string, fileName = "resume.pdf"): Promise<void> => {
  const resumeElement = document.getElementById(resumeId)

  if (!resumeElement) {
    console.error("Resume element not found")
    return
  }

  try {
    const canvas = await html2canvas(resumeElement, {
      scale: 2,
      useCORS: true,
      logging: false,
    })

    const imgData = canvas.toDataURL("image/png")
    const pdf = new jsPDF({
      orientation: "portrait",
      unit: "mm",
      format: "a4",
    })

    const imgWidth = 210
    const imgHeight = (canvas.height * imgWidth) / canvas.width

    pdf.addImage(imgData, "PNG", 0, 0, imgWidth, imgHeight)
    pdf.save(fileName)
  } catch (error) {
    console.error("Error generating PDF:", error)
  }
}

export const saveToLocalStorage = (data: ResumeData): void => {
  try {
    localStorage.setItem("resumeData", JSON.stringify(data))
  } catch (error) {
    console.error("Error saving to local storage:", error)
  }
}

export const loadFromLocalStorage = (): ResumeData | null => {
  try {
    const data = localStorage.getItem("resumeData")
    return data ? JSON.parse(data) : null
  } catch (error) {
    console.error("Error loading from local storage:", error)
    return null
  }
}

export const shareResume = async (data: ResumeData, template: string): Promise<string> => {
  // In a real app, you might want to save this to a database and generate a unique URL
  // For this example, we'll use URL parameters with compressed data
  const compressedData = btoa(JSON.stringify(data))
  const shareUrl = `${window.location.origin}/builder?template=${template}&data=${compressedData}`

  try {
    await navigator.clipboard.writeText(shareUrl)
    return shareUrl
  } catch (error) {
    console.error("Error copying to clipboard:", error)
    return shareUrl
  }
}
