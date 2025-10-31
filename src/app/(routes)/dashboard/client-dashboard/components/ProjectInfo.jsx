import React from 'react'

export default function ProjectInfo({ project }) {
    return (
        <div className="flex-1 overflow-hidden">
            <h3 className="text-base sm:text-lg font-semibold mb-2 dark:text-white break-words">
                Project:{" "}
                <span className="text-blue-600 break-words">
                    {project.projectName}
                </span>
            </h3>

            <h4 className="text-sm sm:text-base dark:text-white">
                Deadline:{" "}
                <span className="font-medium dark:text-white">
                    {new Date(project.projectDetails.deadline).toLocaleDateString("en-GB", {
                        day: "numeric",
                        month: "long",
                        year: "numeric",
                    })}
                </span>
            </h4>

            <h4 className="text-sm sm:text-base dark:text-white">
                Total Bids:{" "}
                <span className="font-medium dark:text-white">
                    {project.developerEmails.length}
                </span>
            </h4>
        </div>
    )
}
