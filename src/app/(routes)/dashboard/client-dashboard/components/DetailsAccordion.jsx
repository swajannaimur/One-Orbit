import React from 'react'

export default function DetailsAccordion({ project }) {
    return (
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
    )
}
