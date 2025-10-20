import React from 'react'

export default function ProjectInfo({project}) {
  return (
    <div className="flex-1">
                <h3 className="text-lg font-semibold mb-2">
                    Project : <span className="text-blue-600">{project.projectName}</span>
                </h3>

                <h4 className="text-sm">
                    Deadline: <span className="font-medium">{ new Date(project.projectDetails.deadline).toLocaleDateString("en-GB",{
                        day: "numeric",
                        month: "long",
                        year: "numeric",
                    })}</span>
                </h4>

                <h4 className="text-sm">
                    Total Bids: <span className="font-medium">{project.developerEmails.length}</span>
                </h4>
            </div>
  )
}
