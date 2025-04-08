import type { ResumeData } from "@/lib/types"

interface MinimalTemplateProps {
  data: ResumeData
}

export function MinimalTemplate({ data }: MinimalTemplateProps) {
  const { personalInfo, experience, education, skills } = data

  return (
    <div className="p-6 text-sm">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-800">{personalInfo.name || "Your Name"}</h1>
        <p className="text-gray-600">{personalInfo.title || "Professional Title"}</p>

        <div className="flex flex-wrap gap-2 mt-2 text-xs text-gray-600">
          {personalInfo.email && <span>{personalInfo.email}</span>}
          {personalInfo.phone && <span>{personalInfo.phone}</span>}
          {personalInfo.location && <span>{personalInfo.location}</span>}
        </div>
      </div>

      {/* Summary */}
      {personalInfo.summary && (
        <div className="mb-6">
          <h2 className="text-sm uppercase tracking-wider text-gray-500 mb-2">About</h2>
          <p className="text-gray-700">{personalInfo.summary}</p>
        </div>
      )}

      {/* Experience */}
      {experience && experience.length > 0 && (
        <div className="mb-6">
          <h2 className="text-sm uppercase tracking-wider text-gray-500 mb-2">Experience</h2>

          <div className="space-y-4">
            {experience.map((job) => (
              <div key={job.id}>
                <div className="flex justify-between">
                  <h3 className="font-medium text-gray-800">{job.position}</h3>
                  <span className="text-gray-600 text-xs">
                    {job.startDate} - {job.endDate}
                  </span>
                </div>
                <p className="text-gray-600">
                  {job.company}, {job.location}
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
          <h2 className="text-sm uppercase tracking-wider text-gray-500 mb-2">Education</h2>

          <div className="space-y-4">
            {education.map((edu) => (
              <div key={edu.id}>
                <div className="flex justify-between">
                  <h3 className="font-medium text-gray-800">
                    {edu.degree} in {edu.field}
                  </h3>
                  <span className="text-gray-600 text-xs">
                    {edu.startDate} - {edu.endDate}
                  </span>
                </div>
                <p className="text-gray-600">
                  {edu.institution}, {edu.location}
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
          <h2 className="text-sm uppercase tracking-wider text-gray-500 mb-2">Skills</h2>

          <div className="flex flex-wrap gap-1">
            {skills.map((skill) => (
              <div key={skill.id} className="border border-gray-200 px-2 py-1 rounded-full text-gray-700 text-xs">
                {skill.name}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
