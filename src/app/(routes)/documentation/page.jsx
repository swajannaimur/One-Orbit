"use client";
import { useState } from "react";
import { motion } from "framer-motion";

export default function DocumentationPage() {
  const [activeSection, setActiveSection] = useState("getting-started");

  const docs = {
    "getting-started": {
      title: "Getting Started",
      content: `
        Welcome to One Orbit Documentation!  
        One Orbit is an AI-powered project management platform that helps you manage projects,
        teams, and freelancers in one intelligent workspace.
        
        **Installation Steps:**
        1. Sign up and create your workspace.
        2. Invite your team or freelancers.
        3. Start managing tasks and tracking progress effortlessly.
      `,
    },
    "project-management": {
      title: "Project Management",
      content: `
        One Orbit makes project management simple yet powerful.  
        Use Kanban boards, Gantt charts, and AI-based analytics to monitor your progress.

        **Features:**
        - Task creation and assignment  
        - AI-powered prioritization  
        - Milestone tracking and reporting  
      `,
    },
    integrations: {
      title: "Integrations",
      content: `
        One Orbit integrates seamlessly with your favorite tools like Slack, GitHub,
        Google Drive, Notion, and Jira.

        **How to Integrate:**
        - Go to Settings > Integrations  
        - Choose your app  
        - Click "Connect" and follow the prompts  
      `,
    },
    "ai-features": {
      title: "AI Features",
      content: `
        Experience the power of AI in every workflow.  
        One Orbit uses machine learning to analyze performance and recommend improvements.

        **AI Capabilities:**
        - Predict task completion delays  
        - Suggest best-fit team members  
        - Provide project health insights  
      `,
    },
    faq: {
      title: "FAQ",
      content: `
        **Q:** Can I use One Orbit for individual projects?  
        **A:** Absolutely! One Orbit is great for freelancers, teams, and enterprises.  

        **Q:** Is there a free plan?  
        **A:** Yes, a free plan with limited features is available.  

        **Q:** Does One Orbit support dark mode?  
        **A:** Yes, you can toggle between light and dark themes anytime.  
      `,
    },
  };

  return (
    <div className="p-20 bg-gradient-to-br from-gray-50 to-gray-100 min-h-screen flex flex-col">
      {/* Hero Section */}
      <section className="text-center py-16 px-6 bg-indigo-600 text-white">
        <motion.h1
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-4xl md:text-5xl font-extrabold mb-4"
        >
          One Orbit Documentation
        </motion.h1>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="text-indigo-100 text-lg md:text-xl max-w-3xl mx-auto"
        >
          Learn how to make the most of One Orbit — from project setup to
          AI-powered insights.
        </motion.p>
      </section>

      {/* Documentation Layout */}
      <div className="flex flex-col md:flex-row max-w-7xl mx-auto w-full my-10 px-6 gap-10">
        {/* Sidebar */}
        <aside className="md:w-1/4 bg-white rounded-2xl shadow-md border border-gray-100 p-6 h-fit">
          <h2 className="text-gray-800 font-bold text-lg mb-4">
            Documentation
          </h2>
          <ul className="space-y-3">
            {Object.keys(docs).map((key) => (
              <li key={key}>
                <button
                  onClick={() => setActiveSection(key)}
                  className={`w-full text-left font-medium py-2 px-3 rounded-md transition ${
                    activeSection === key
                      ? "bg-indigo-600 text-white"
                      : "text-gray-700 hover:bg-gray-100"
                  }`}
                >
                  {docs[key].title}
                </button>
              </li>
            ))}
          </ul>
        </aside>

        {/* Main Content */}
        <motion.main
          key={activeSection}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="md:w-3/4 bg-white rounded-2xl shadow-md border border-gray-100 p-8 text-gray-800"
        >
          <h2 className="text-2xl md:text-3xl font-bold mb-4 text-indigo-600">
            {docs[activeSection].title}
          </h2>
          <div className="prose prose-indigo max-w-none text-gray-700 whitespace-pre-line">
            {docs[activeSection].content}
          </div>
        </motion.main>
      </div>

      {/* CTA Section */}
      <motion.section
        initial={{ opacity: 0, scale: 0.95 }}
        whileInView={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
        className="bg-indigo-600 text-white text-center py-16 px-6 w-full rounded-t-3xl"
      >
        <h2 className="text-3xl md:text-4xl font-bold mb-4">Need More Help?</h2>
        <p className="text-lg text-indigo-100 mb-8">
          Check out our community forum or reach out to our support team for
          assistance.
        </p>
        <button className="px-6 py-3 bg-white text-indigo-600 font-semibold rounded-full hover:bg-indigo-50 transition">
          Visit Support Center
        </button>
      </motion.section>
    </div>
  );
}
