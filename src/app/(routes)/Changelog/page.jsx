"use client";
import { motion } from "framer-motion";
import { useState } from "react";

export default function ChangelogPage() {
  const changelog = [
    {
      version: "v1.2",
      date: "2025-10-31",
      title: "Text-Only Integrations",
      details: [
        "Removed icons from integrations cards.",
        "Cards now display only name, description, and Connect button.",
        "Maintains responsive layout and animations.",
      ],
    },
    {
      version: "v1.1",
      date: "2025-10-30",
      title: "Bug Fixes / Improvements",
      details: [
        "Replaced invalid FaNotion import with SiNotion or text-only card.",
        "Ensured all integrations render correctly.",
        "Improved hover shadow effect for integration cards.",
      ],
    },
    {
      version: "v1.0",
      date: "2025-10-29",
      title: "Initial Implementation",
      details: [
        "Created responsive Integrations page with Tailwind CSS.",
        "Added Hero Section with headline, description, and CTA button.",
        "Added Integrations Grid with 6 integrations.",
        "Added Call-to-Action Section at the bottom.",
        "Added Framer Motion animations for fade-in and hover effects.",
        "Responsive layout: Mobile:1, Tablet:2, Desktop:3 columns.",
      ],
    },
  ];

  return (
    <div className="bg-gray-50 min-h-screen px-4 md:px-12 lg:px-24 py-25">
      <h1 className="text-4xl font-extrabold text-gray-800 text-center mb-8">
        One Orbit Changelog
      </h1>

      <div className="flex flex-col gap-6">
        {changelog.map((item, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: idx * 0.1 }}
            viewport={{ once: true }}
            className="bg-white rounded-2xl shadow-md p-6 border border-gray-200 hover:shadow-lg transition"
          >
            <div className="flex items-center justify-between flex-wrap">
              <div className="flex items-center gap-4 mb-2 md:mb-0">
                <span className="bg-indigo-600 text-white px-3 py-1 rounded-full text-sm font-semibold">
                  {item.version}
                </span>
                <h2 className="text-xl font-bold text-gray-800">
                  {item.title}
                </h2>
              </div>
              <span className="text-gray-500 text-sm">{item.date}</span>
            </div>
            <ul className="mt-4 list-disc list-inside text-gray-700 space-y-1">
              {item.details.map((detail, i) => (
                <li key={i}>{detail}</li>
              ))}
            </ul>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
