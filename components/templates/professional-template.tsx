import type { ResumeData } from "@/lib/types"

interface ProfessionalTemplateProps {
  data: ResumeData
}

export function ProfessionalTemplate({ data }: ProfessionalTemplateProps) {
  const { personalInfo, experience, education, skills } = data

  return (
    <div className="p-6 text-sm">
      {/* Header */}
      <div className="border-b-2 border-gray-800 pb-3 mb-6">
        <h1 className="text-2xl font-bold text-gray-800 uppercase">{personalInfo.name || "Your Name"}</h1>
        <p className="text-gray-700 font-medium">{personalInfo.title || "Professional Title"}</p>

        <div className="flex flex-wrap justify-between mt-2 text-xs text-gray-600">
          <div className="space-x-2">
            {personalInfo.email && <span>{personalInfo.email}</span>}
            {personalInfo.phone && <span>| {personalInfo.phone}</span>}
          </div>
          {personalInfo.location && <span>{personalInfo.location}</span>}
        </div>
      </div>

      {/* Summary */}
      {personalInfo.summary && (
        <div className="mb-6">
          <h2 className="text-base font-bold text-gray-800 uppercase mb-2">Professional Summary</h2>
          <p className="text-gray-700">{personalInfo.summary}</p>
        </div>
      )}

      {/* Experience */}
      {experience && experience.length > 0 && (
        <div className="mb-6">
          <h2 className="text-base font-bold text-gray-800 uppercase mb-2">Professional Experience</h2>

          <div className="space-y-4">
            {experience.map((job) => (
              <div key={job.id}>
                <div className="flex justify-between font-bold">
                  <h3 className="text-gray-800">{job.company}</h3>
                  <span className="text-gray-700">
                    {job.startDate} - {job.endDate}
                  </span>
                </div>
                <p className="italic text-gray-700">
                  {job.position} | {job.location}
                </p>
                <p className="mt-1 text-gray-700">{job.description}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Education */}
      {education && education.length > 0 && (
        <div className="mb-6">
          <h2 className="text-base font-bold text-gray-800 uppercase mb-2">Education</h2>

          <div className="space-y-4">
            {education.map((edu) => (
              <div key={edu.id}>
                <div className="flex justify-between font-bold">
                  <h3 className="text-gray-800">{edu.institution}</h3>
                  <span className="text-gray-700">
                    {edu.startDate} - {edu.endDate}
                  </span>
                </div>
                <p className="italic text-gray-700">
                  {edu.degree} in {edu.field} | {edu.location}
                </p>
                {edu.description && <p className="mt-1 text-gray-700">{edu.description}</p>}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Skills */}
      {skills && skills.length > 0 && (
        <div>
          <h2 className="text-base font-bold text-gray-800 uppercase mb-2">Skills & Expertise</h2>

          <div className="grid grid-cols-2 gap-1">
            {skills.map((skill) => (
              <div key={skill.id} className="flex items-center gap-2">
                <span className="w-2 h-2 bg-gray-800 rounded-full"></span>
                <span className="text-gray-700">
                  {skill.name} ({skill.level})
                </span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
