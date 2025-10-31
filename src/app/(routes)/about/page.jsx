"use client";
import { motion } from "framer-motion";

export default function AboutPage() {
  const features = [
    {
      title: "AI-Powered Insights",
      desc: "Leverage artificial intelligence to optimize project timelines, predict bottlenecks, and provide actionable insights for smarter decisions.",
    },
    {
      title: "Seamless Task Management",
      desc: "Combine the structured project management of Jira with easy task assignments, progress tracking, and Kanban boards.",
    },
    {
      title: "Freelance Collaboration",
      desc: "Hire, manage, and collaborate with freelancers effortlessly, just like Fiverr, directly within your projects.",
    },
    {
      title: "Real-Time Analytics",
      desc: "Track team performance, project health, and deadlines with intuitive dashboards and reports.",
    },
    {
      title: "Cloud Integration",
      desc: "Access your workspace anywhere, share documents, and integrate with your favorite tools seamlessly.",
    },
    {
      title: "Secure & Reliable",
      desc: "End-to-end encryption, role-based access, and enterprise-grade security to protect your data.",
    },
  ];

  return (
    <div className="bg-gradient-to-br from-gray-50 to-gray-100 min-h-screen flex flex-col items-center py-10">
      {/* Hero Section */}
      <section className="text-center max-w-4xl px-4 mt-20 mb-16">
        <motion.h1
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-4xl md:text-5xl font-extrabold text-gray-800 mb-4"
        >
          About <span className="text-indigo-600">One Orbit</span>
        </motion.h1>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="text-gray-600 text-lg md:text-xl"
        >
          One Orbit is an AI-powered project management platform that combines
          the structure of Jira with the flexibility of Fiverr-style freelance
          collaboration. Manage projects, hire talent, and boost productivity —
          all in one intelligent platform.
        </motion.p>
      </section>

      {/* Features Grid */}
      <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 px-6 md:px-12 lg:px-24 mb-20 max-w-7xl">
        {features.map((feature, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1, duration: 0.5 }}
            viewport={{ once: true }}
            className="bg-white rounded-2xl shadow-lg p-8 hover:shadow-2xl transition flex flex-col items-center text-center border border-gray-100"
          >
            <h3 className="text-xl font-bold text-gray-800 mb-3">
              {feature.title}
            </h3>
            <p className="text-gray-600 text-base">{feature.desc}</p>
          </motion.div>
        ))}
      </section>

      {/* AI Highlight Section */}
      <section className="bg-indigo-600 text-white w-full py-20 px-6 flex flex-col items-center text-center">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-3xl md:text-4xl font-bold mb-6"
        >
          AI-Driven Project Management
        </motion.h2>
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="text-lg md:text-xl max-w-3xl"
        >
          One Orbit leverages advanced AI algorithms to provide intelligent
          recommendations, predict project risks, and enhance team productivity.
          Make faster, smarter, and data-driven decisions for every project.
        </motion.p>
      </section>

      {/* Call to Action */}
      <section className="py-16 px-6 text-center">
        <motion.h2
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 }}
          className="text-3xl md:text-4xl font-bold mb-6 text-gray-800"
        >
          Ready to Transform Your Projects?
        </motion.h2>
        <motion.button
          whileHover={{ scale: 1.05 }}
          className="px-6 py-3 bg-indigo-600 text-white font-semibold rounded-full shadow-lg hover:bg-indigo-700 transition"
        >
          Get Started with One Orbit
        </motion.button>
      </section>
    </div>
  );
}
