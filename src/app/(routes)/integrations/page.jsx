"use client";
import { motion } from "framer-motion";

export default function IntegrationsPage() {
  const integrations = [
    {
      name: "Slack",
      desc: "Get instant project updates and notifications directly in your Slack channels.",
    },
    {
      name: "GitHub",
      desc: "Link your repositories to track commits, pull requests, and deployments seamlessly.",
    },
    {
      name: "Google Drive",
      desc: "Attach files, collaborate on documents, and sync resources instantly with Drive.",
    },
    {
      name: "Trello",
      desc: "Import or export tasks easily from Trello boards into your One Orbit workspace.",
    },
    {
      name: "Notion",
      desc: "Bring your project docs and meeting notes from Notion directly into One Orbit.",
    },
    {
      name: "Jira",
      desc: "Integrate with Jira for advanced issue tracking and agile project management.",
    },
  ];

  return (
    <div className="p-10 bg-gradient-to-br from-gray-50 to-gray-100 min-h-screen flex flex-col items-center">
      {/* Hero Section */}
      <section className="text-center max-w-3xl px-4 mt-20 mb-12">
        <motion.h1
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-4xl md:text-5xl font-extrabold text-gray-800 mb-4"
        >
          Connect Your Favorite Tools with{" "}
          <span className="text-indigo-600">One Orbit</span>
        </motion.h1>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="text-gray-600 text-lg md:text-xl"
        >
          Supercharge your workflow by integrating One Orbit with the apps you
          already love and use every day.
        </motion.p>
        <motion.button
          whileHover={{ scale: 1.05 }}
          className="mt-8 px-6 py-3 bg-indigo-600 text-white font-semibold rounded-full shadow-lg hover:bg-indigo-700 transition"
        >
          Explore Integrations
        </motion.button>
      </section>

      {/* Integrations Grid */}
      <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 px-6 md:px-12 lg:px-20 max-w-7xl mb-20">
        {integrations.map((tool, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1, duration: 0.5 }}
            viewport={{ once: true }}
            className="bg-white rounded-2xl shadow-md hover:shadow-xl transition p-8 flex flex-col items-center text-center border border-gray-100"
          >
            <h3 className="text-xl font-bold text-gray-800 mb-2">
              {tool.name}
            </h3>
            <p className="text-gray-600 text-base">{tool.desc}</p>
            <button className="mt-4 text-indigo-600 font-semibold hover:underline">
              Connect
            </button>
          </motion.div>
        ))}
      </section>

      {/* Call to Action Section */}
      <motion.section
        initial={{ opacity: 0, scale: 0.95 }}
        whileInView={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
        className="bg-indigo-600 text-white text-center py-16 px-6 rounded-t-3xl w-full"
      >
        <h2 className="text-3xl md:text-4xl font-bold mb-4">
          Integrate. Automate. Accelerate.
        </h2>
        <p className="text-lg text-indigo-100 mb-8">
          Experience seamless collaboration and faster project delivery by
          connecting your One Orbit workspace with the tools your team already
          uses.
        </p>
        <button className="px-6 py-3 bg-white text-indigo-600 font-semibold rounded-full hover:bg-indigo-50 transition">
          Get Started Now
        </button>
      </motion.section>
    </div>
  );
}
