import type { ResumeData } from "@/lib/types"

interface CreativeTemplateProps {
  data: ResumeData
}

export function CreativeTemplate({ data }: CreativeTemplateProps) {
  const { personalInfo, experience, education, skills } = data

  return (
    <div className="p-6 text-sm bg-gradient-to-br from-indigo-50 to-purple-50">
      {/* Header */}
      <div className="text-center mb-6 bg-white p-4 rounded-lg shadow-sm">
        <h1 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-purple-600">
          {personalInfo.name || "Your Name"}
        </h1>
        <p className="text-gray-700 font-medium">{personalInfo.title || "Professional Title"}</p>

        <div className="flex justify-center flex-wrap gap-3 mt-2 text-xs text-gray-600">
          {personalInfo.email && (
            <span className="flex items-center gap-1">
              <span className="w-1 h-1 bg-indigo-400 rounded-full"></span>
              {personalInfo.email}
            </span>
          )}
          {personalInfo.phone && (
            <span className="flex items-center gap-1">
              <span className="w-1 h-1 bg-indigo-400 rounded-full"></span>
              {personalInfo.phone}
            </span>
          )}
          {personalInfo.location && (
            <span className="flex items-center gap-1">
              <span className="w-1 h-1 bg-indigo-400 rounded-full"></span>
              {personalInfo.location}
            </span>
          )}
        </div>
      </div>

      {/* Summary */}
      {personalInfo.summary && (
        <div className="mb-6 bg-white p-4 rounded-lg shadow-sm">
          <h2 className="text-base font-bold text-indigo-600 mb-2 flex items-center">
            <span className="w-6 h-0.5 bg-indigo-600 mr-2"></span>
            About Me
          </h2>
          <p className="text-gray-700">{personalInfo.summary}</p>
        </div>
      )}

      {/* Experience */}
      {experience && experience.length > 0 && (
        <div className="mb-6 bg-white p-4 rounded-lg shadow-sm">
          <h2 className="text-base font-bold text-indigo-600 mb-2 flex items-center">
            <span className="w-6 h-0.5 bg-indigo-600 mr-2"></span>
            Experience
          </h2>

          <div className="space-y-4">
            {experience.map((job) => (
              <div key={job.id} className="relative pl-4 border-l-2 border-indigo-200">
                <div className="absolute w-3 h-3 bg-indigo-400 rounded-full -left-[7px] top-1"></div>
                <div className="flex justify-between">
                  <h3 className="font-bold text-gray-800">{job.position}</h3>
                  <span className="text-indigo-600 text-xs font-medium">
                    {job.startDate} - {job.endDate}
                  </span>
                </div>
                <p className="text-gray-600 italic">
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
        <div className="mb-6 bg-white p-4 rounded-lg shadow-sm">
          <h2 className="text-base font-bold text-indigo-600 mb-2 flex items-center">
            <span className="w-6 h-0.5 bg-indigo-600 mr-2"></span>
            Education
          </h2>

          <div className="space-y-4">
            {education.map((edu) => (
              <div key={edu.id} className="relative pl-4 border-l-2 border-indigo-200">
                <div className="absolute w-3 h-3 bg-indigo-400 rounded-full -left-[7px] top-1"></div>
                <div className="flex justify-between">
                  <h3 className="font-bold text-gray-800">
                    {edu.degree} in {edu.field}
                  </h3>
                  <span className="text-indigo-600 text-xs font-medium">
                    {edu.startDate} - {edu.endDate}
                  </span>
                </div>
                <p className="text-gray-600 italic">
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
        <div className="bg-white p-4 rounded-lg shadow-sm">
          <h2 className="text-base font-bold text-indigo-600 mb-2 flex items-center">
            <span className="w-6 h-0.5 bg-indigo-600 mr-2"></span>
            Skills
          </h2>

          <div className="flex flex-wrap gap-2">
            {skills.map((skill) => (
              <div
                key={skill.id}
                className="bg-gradient-to-r from-indigo-100 to-purple-100 px-3 py-1 rounded-full text-indigo-700 text-xs font-medium"
              >
                {skill.name}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
