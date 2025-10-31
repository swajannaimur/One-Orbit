"use client";
import { motion } from "framer-motion";

export default function CommunityPage() {
  const discussions = [
    {
      title: "Best AI tools for project management?",
      author: "Ariana Smith",
      replies: 24,
      time: "2h ago",
      excerpt:
        "Which AI tools have you integrated with One Orbit to streamline your workflow?",
    },
    {
      title: "Tips for remote team collaboration",
      author: "Devon Lee",
      replies: 15,
      time: "5h ago",
      excerpt:
        "How do you manage communication and accountability for distributed teams?",
    },
    {
      title: "How to connect Jira boards with One Orbit?",
      author: "Mila Khan",
      replies: 9,
      time: "1d ago",
      excerpt:
        "Looking for best practices or tutorials for integrating Jira into One Orbit’s task view.",
    },
    {
      title: "Showcase your One Orbit dashboard setup!",
      author: "Chris Patel",
      replies: 31,
      time: "3d ago",
      excerpt:
        "Let’s inspire each other — share how you organize your workspace inside One Orbit.",
    },
  ];

  const members = [
    { name: "Sophia Tan", role: "Product Designer" },
    { name: "Arjun Das", role: "Full Stack Developer" },
    { name: "Liam Wright", role: "Project Manager" },
    { name: "Emma Rahman", role: "AI Engineer" },
  ];

  return (
    <div className="p-10 bg-gradient-to-br from-gray-50 to-gray-100 min-h-screen flex flex-col items-center">
      {/* Hero Section */}
      <section className="text-center max-w-3xl px-6 mt-20 mb-16">
        <motion.h1
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-4xl md:text-5xl font-extrabold text-gray-800 mb-4"
        >
          Welcome to the <span className="text-indigo-600">One Orbit</span>{" "}
          Community
        </motion.h1>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="text-gray-600 text-lg md:text-xl"
        >
          Connect with innovators, developers, and project managers who are
          shaping the future of AI-powered project collaboration.
        </motion.p>
        <motion.button
          whileHover={{ scale: 1.05 }}
          className="mt-8 px-6 py-3 bg-indigo-600 text-white font-semibold rounded-full shadow-lg hover:bg-indigo-700 transition"
        >
          Join the Discussion
        </motion.button>
      </section>

      {/* Discussions Section */}
      <section className="max-w-7xl w-full px-6 md:px-12 lg:px-20 mb-20">
        <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-6 text-center">
          Latest Discussions
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {discussions.map((post, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
              viewport={{ once: true }}
              className="bg-white p-6 rounded-2xl shadow-md border border-gray-100 hover:shadow-xl transition"
            >
              <h3 className="text-lg font-semibold text-gray-800 mb-2 hover:text-indigo-600 cursor-pointer">
                {post.title}
              </h3>
              <p className="text-gray-600 mb-4 text-sm">{post.excerpt}</p>
              <div className="flex justify-between items-center text-sm text-gray-500">
                <span>👤 {post.author}</span>
                <span>💬 {post.replies} replies</span>
                <span>⏱ {post.time}</span>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Featured Members */}
      <section className="bg-white w-full py-16 px-6 md:px-12 lg:px-20 shadow-inner">
        <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-8 text-center">
          Meet Our Active Members
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 max-w-6xl mx-auto">
          {members.map((member, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1, duration: 0.5 }}
              viewport={{ once: true }}
              className="bg-gray-50 rounded-2xl p-6 shadow hover:shadow-lg transition flex flex-col items-center text-center"
            >
              <div className="w-16 h-16 bg-indigo-200 rounded-full flex items-center justify-center mb-3 text-2xl font-bold text-indigo-600">
                {member.name.charAt(0)}
              </div>
              <h4 className="font-semibold text-gray-800">{member.name}</h4>
              <p className="text-sm text-gray-500">{member.role}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <motion.section
        initial={{ opacity: 0, scale: 0.95 }}
        whileInView={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
        className="bg-indigo-600 text-white text-center py-16 px-6 w-full rounded-t-3xl mt-16"
      >
        <h2 className="text-3xl md:text-4xl font-bold mb-4">
          Be Part of the Conversation
        </h2>
        <p className="text-lg text-indigo-100 mb-8 max-w-2xl mx-auto">
          Join the One Orbit community to learn, share, and grow with others who
          believe in the power of AI-driven collaboration.
        </p>
        <button className="px-6 py-3 bg-white text-indigo-600 font-semibold rounded-full hover:bg-indigo-50 transition">
          Join Our Community
        </button>
      </motion.section>
    </div>
  );
}
