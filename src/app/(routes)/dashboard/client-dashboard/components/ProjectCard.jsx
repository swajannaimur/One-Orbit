import React from 'react'

export default function ProjectCard({ project }) {
    return (
        <div className="rounded-lg p-4 shadow-sm hover:shadow-md transition duration-200 bg-white">
            <h3 className="text-lg font-semibold mb-2">
                Project : <span className="text-blue-600">{project.projectName}</span>
            </h3>

            {/* project deadline */}
            <h4>Deadline: <span>{project.projectDetails.deadline}</span></h4>

            {/* total bids */}
            <h4>Total Bids: <span>{project.developerEmails.length}</span></h4>

            {/* bid details */}
            <div className="space-y-1">
                <h4 className="font-medium">Developers & Bids:</h4>
                <ul className="ml-5 list-disc text-sm text-gray-700">
                    {project.developerEmails.map((dev, i) => (
                        <li key={i}>
                            <span className="font-semibold">{dev}</span> — Bid:{" "}
                            <span className="text-green-600 font-semibold">
                                {project.bids[i]}$
                            </span>
                        </li>
                    ))}
                </ul>
            </div>

        </div>
    )
}
