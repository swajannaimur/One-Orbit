import React from 'react'
import ProjectInfo from './ProjectInfo'
import DetailsAccordion from './DetailsAccordion'

export default function ProjectCard({ project }) {
    return (
        <div className="rounded-lg p-4 sm:p-5 shadow-sm hover:shadow-md transition duration-200 bg-white flex flex-col md:flex-row md:justify-between md:items-start gap-4 dark-bg w-full">
            {/* Left Side - Project Info */}
            <ProjectInfo project={project} />

            {/* Right Side - Accordion */}
            <div className="w-full md:w-auto md:flex-shrink-0">
                <DetailsAccordion project={project} />
            </div>
        </div>
    )
}
