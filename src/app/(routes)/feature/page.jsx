"use client";
import { motion } from "framer-motion";
import {
  FaUsers,
  FaTasks,
  FaChartLine,
  FaComments,
  FaCloud,
  FaShieldAlt,
} from "react-icons/fa";

export default function FeaturesPage() {
  const features = [
    {
      icon: <FaTasks className="text-indigo-500 text-4xl" />,
      title: "Smart Task Management",
      desc: "Organize, assign, and track tasks in real time with drag-and-drop Kanban boards.",
    },
    {
      icon: <FaUsers className="text-pink-500 text-4xl" />,
      title: "Team Collaboration",
      desc: "Communicate, share updates, and work together seamlessly within projects.",
    },
    {
      icon: <FaChartLine className="text-green-500 text-4xl" />,
      title: "Project Analytics",
      desc: "Gain insights into progress, productivity, and performance with visual reports.",
    },
    {
      icon: <FaComments className="text-yellow-500 text-4xl" />,
      title: "Real-Time Communication",
      desc: "Integrated chat and comment system for faster team communication.",
    },
    {
      icon: <FaCloud className="text-sky-500 text-4xl" />,
      title: "Cloud Integration",
      desc: "Access your workspace anywhere — all data is securely stored in the cloud.",
    },
    {
      icon: <FaShieldAlt className="text-red-500 text-4xl" />,
      title: "Enterprise-Level Security",
      desc: "End-to-end encrypted storage and role-based access ensure your data is safe.",
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
          Discover the Power of{" "}
          <span className="text-indigo-600">One Orbit</span>
        </motion.h1>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="text-gray-600 text-lg md:text-xl"
        >
          Streamline your projects, boost productivity, and collaborate
          effortlessly — all in one platform.
        </motion.p>
        <motion.button
          whileHover={{ scale: 1.05 }}
          className="mt-8 px-6 py-3 bg-indigo-600 text-white font-semibold rounded-full shadow-lg hover:bg-indigo-700 transition"
        >
          Get Started
        </motion.button>
      </section>

      {/* Features Grid */}
      <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 px-6 md:px-12 lg:px-20 max-w-7xl mb-20">
        {features.map((f, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1, duration: 0.5 }}
            viewport={{ once: true }}
            className="bg-white rounded-2xl shadow-md hover:shadow-xl transition p-8 flex flex-col items-center text-center border border-gray-100"
          >
            <div className="mb-4">{f.icon}</div>
            <h3 className="text-xl font-bold text-gray-800 mb-2">{f.title}</h3>
            <p className="text-gray-600 text-base">{f.desc}</p>
          </motion.div>
        ))}
      </section>

      {/* Call to Action */}
      <motion.section
        initial={{ opacity: 0, scale: 0.95 }}
        whileInView={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
        className="bg-indigo-600 text-white text-center py-16 px-6 rounded-t-3xl w-full"
      >
        <h2 className="text-3xl md:text-4xl font-bold mb-4">
          Start Managing Projects Smarter with One Orbit
        </h2>
        <p className="text-lg text-indigo-100 mb-8">
          Join thousands of teams already accelerating their workflow with our
          platform.
        </p>
        <button className="px-6 py-3 bg-white text-indigo-600 font-semibold rounded-full hover:bg-indigo-50 transition">
          Try It Now
        </button>
      </motion.section>
    </div>
  );
}
