import React from 'react'

export default function ProjectCard({ project }) {
    return (
        <div className="rounded-lg p-4 shadow-sm hover:shadow-md transition duration-200 bg-white flex flex-col md:flex-row md:justify-between md:items-start gap-4">

            {/* Left Side - Project Info */}
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

            {/* Right Side - Accordion */}
            <div className="w-full md:w-80">
                <div className="collapse collapse-arrow bg-base-100 border border-gray-200 rounded-lg">
                    <input type="checkbox" />
                    <div className="collapse-title text-base font-medium">
                        Details
                    </div>
                    <div className="collapse-content space-y-1">
                        <ul className="ml-5 list-disc text-sm text-gray-700">
                            {project.developerEmails.map((dev, i) => (
                                <li key={i} className="mb-1">
                                    <span className="font-semibold cursor-pointer">{dev}</span> — Bid:{" "}
                                    <span className="text-green-600 font-semibold">
                                        {project.bids[i]}$
                                    </span>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </div>

        </div>
    )
}
