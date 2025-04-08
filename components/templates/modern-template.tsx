import type { ResumeData } from "@/lib/types"

interface ModernTemplateProps {
  data: ResumeData
}

export function ModernTemplate({ data }: ModernTemplateProps) {
  const { personalInfo, experience, education, skills } = data

  return (
    <div className="p-6 text-sm">
      {/* Header */}
      <div className="text-center mb-6">
        <h1 className="text-2xl font-bold text-gray-800">{personalInfo.name || "Your Name"}</h1>
        <p className="text-gray-600">{personalInfo.title || "Professional Title"}</p>

        <div className="flex justify-center gap-3 mt-2 text-xs text-gray-600">
          {personalInfo.email && <span>{personalInfo.email}</span>}
          {personalInfo.phone && <span>• {personalInfo.phone}</span>}
          {personalInfo.location && <span>• {personalInfo.location}</span>}
        </div>
      </div>

      {/* Summary */}
      {personalInfo.summary && (
        <div className="mb-6">
          <h2 className="text-base font-bold text-gray-800 border-b border-gray-300 pb-1 mb-2">Professional Summary</h2>
          <p className="text-gray-700">{personalInfo.summary}</p>
        </div>
      )}

      {/* Experience */}
      {experience && experience.length > 0 && (
        <div className="mb-6">
          <h2 className="text-base font-bold text-gray-800 border-b border-gray-300 pb-1 mb-2">Work Experience</h2>

          <div className="space-y-4">
            {experience.map((job) => (
              <div key={job.id}>
                <div className="flex justify-between">
                  <h3 className="font-bold text-gray-800">{job.position}</h3>
                  <span className="text-gray-600">
                    {job.startDate} - {job.endDate}
                  </span>
                </div>
                <div className="flex justify-between text-gray-600">
                  <p>{job.company}</p>
                  <p>{job.location}</p>
                </div>
                <p className="mt-1 text-gray-700">{job.description}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Education */}
      {education && education.length > 0 && (
        <div className="mb-6">
          <h2 className="text-base font-bold text-gray-800 border-b border-gray-300 pb-1 mb-2">Education</h2>

          <div className="space-y-4">
            {education.map((edu) => (
              <div key={edu.id}>
                <div className="flex justify-between">
                  <h3 className="font-bold text-gray-800">
                    {edu.degree} in {edu.field}
                  </h3>
                  <span className="text-gray-600">
                    {edu.startDate} - {edu.endDate}
                  </span>
                </div>
                <div className="flex justify-between text-gray-600">
                  <p>{edu.institution}</p>
                  <p>{edu.location}</p>
                </div>
                {edu.description && <p className="mt-1 text-gray-700">{edu.description}</p>}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Skills */}
      {skills && skills.length > 0 && (
        <div>
          <h2 className="text-base font-bold text-gray-800 border-b border-gray-300 pb-1 mb-2">Skills</h2>

          <div className="flex flex-wrap gap-2">
            {skills.map((skill) => (
              <div key={skill.id} className="bg-gray-100 px-2 py-1 rounded text-gray-700 text-xs">
                {skill.name} ({skill.level})
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
