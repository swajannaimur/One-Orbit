"use client";

import React from "react";

const solutionsData = [
  {
    category: "IT & Software Development",
    description:
      "For IT and software development teams, One Orbit offers robust tools for project tracking, task management, and code collaboration. Integrate with your favorite development tools, manage sprints, and keep your team aligned on project goals.",
    items: [
      {
        title: "Agile Project Management",
        description:
          "Manage sprints, track progress, and adapt to changing requirements with ease.",
        image: "/solutionImages/solution_1.png",
      },
      {
        title: "Code Collaboration",
        description:
          "Collaborate on code, review changes, and ensure code quality.",
        image: "/solutionImages/solution_2.png",
      },
      {
        title: "Bug Tracking",
        description:
          "Identify, track, and resolve bugs efficiently to maintain software quality.",
        image: "/solutionImages/solution_3.png",
      },
    ],
  },
  {
    category: "Education & Research",
    description:
      "In education and research, One Orbit facilitates collaboration on research projects, course management, and student engagement. Share resources, track progress, and communicate effectively with students and colleagues.",
    items: [
      {
        title: "Research Project Management",
        description:
          "Organize research projects, manage tasks, and track milestones effectively.",
        image: "/solutionImages/solution_4.png",
      },
      {
        title: "Course Management",
        description:
          "Create and manage courses, share materials, and track student progress.",
        image: "/solutionImages/solution_5.png",
      },
      {
        title: "Student Collaboration",
        description:
          "Facilitate student collaboration, discussions, and group projects.",
        image: "/solutionImages/solution_6.png",
      },
    ],
  },
  {
    category: "Marketing & Creative Teams",
    description:
      "For marketing and creative teams, One Orbit provides tools for campaign planning, content management, and creative reviews. Streamline your workflows, manage assets, and ensure your team stays on brand.",
    items: [
      {
        title: "Campaign Planning",
        description:
          "Plan and execute marketing campaigns, track budgets, and measure performance.",
        image: "/solutionImages/solution_7.png",
      },
      {
        title: "Content Management",
        description:
          "Manage content assets, collaborate on drafts, and ensure brand consistency.",
        image: "/solutionImages/solution_8.png",
      },
      {
        title: "Creative Reviews",
        description:
          "Review and approve creative work, provide feedback, and manage revisions.",
        image: "/solutionImages/solution_9.png",
      },
    ],
  },
];

const Solutions = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      <h1 className="text-4xl font-bold mb-4">Solutions</h1>
      <p className="text-gray-600 mb-12">
       One Orbit is a versatile platform that adapts to the unique needs of various industries. Explore how our features can streamline your workflows and enhance collaboration.
      </p>

      
    </div>
  );
};

export default Solutions;
