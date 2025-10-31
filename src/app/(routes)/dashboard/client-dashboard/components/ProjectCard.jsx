import React from 'react'
import ProjectInfo from './ProjectInfo'
import DetailsAccordion from './DetailsAccordion'

export default function ProjectCard({ project }) {
    return (
        <div className="rounded-lg p-4 shadow-sm hover:shadow-md transition duration-200 bg-white flex flex-col md:flex-row md:justify-between md:items-start gap-4 dark-bg">

            {/* Left Side - Project Info */}
            <ProjectInfo project={project}></ProjectInfo>

            {/* Right Side - Accordion */}
            <DetailsAccordion project={project}></DetailsAccordion>

        </div>
    )
}
