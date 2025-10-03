"use client";
import React, { useState } from "react";
import Lottie from "lottie-react";
import faqAnimation from "../../../public/faq.json";

const faqs = [
  {
    question: "What is One-Orbit?",
    answer:
      "One-Orbit is a Project Management and Team Collaboration Tool designed to help teams organize, track, and complete work efficiently.",
  },
  {
    question: "How do I add team members?",
    answer:
      "You can invite team members by sending them an invitation link or adding their email addresses in the team settings.",
  },
  {
    question: "Can I integrate One-Orbit with other tools?",
    answer:
      "Yes, One-Orbit supports integrations with popular tools like Slack, Google Drive, and more.",
  },
  {
    question: "Is my data secure on One-Orbit?",
    answer:
      "We use industry-standard security and encryption to keep your data safe and private.",
  },
  {
    question: "Does One-Orbit support mobile devices?",
    answer:
      "Yes, One-Orbit is fully responsive and works seamlessly on mobile, tablet, and desktop devices.",
  },
];

const FaqSection = () => {
  const [openIndex, setOpenIndex] = useState(null);

  const handleToggle = (idx) => {
    setOpenIndex(openIndex === idx ? null : idx);
  };

  return (
    <section className="py-12 px-4">
      {/* <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-2 items-center"> */}
      <div className="max-w-6xl mx-auto flex flex-col-reverse md:flex-row items-center gap-8">
        {/* ✅ FAQ Content */}
        <div>
          <h2 className="text-3xl md:text-4xl font-bold mb-8 text-black text-center md:text-left">
            Frequently Asked Questions
          </h2>

          <div className="space-y-4">
            {faqs.map((faq, idx) => (
              <div
                key={idx}
                className="border rounded-lg shadow-sm hover:shadow-md transition"
              >
                <button
                  className={`w-full text-left px-5 py-4 font-medium text-lg flex justify-between items-center focus:outline-none transition-colors duration-300 ${
                    openIndex === idx
                      ? "bg-secondary text-black"
                      : "bg-white text-black"
                  }`}
                  onClick={() => handleToggle(idx)}
                  aria-expanded={openIndex === idx}
                >
                  {faq.question}
                  <span
                    className={`ml-4 transform transition-transform duration-300 ${
                      openIndex === idx ? "rotate-180" : ""
                    }`}
                  >
                    ▼
                  </span>
                </button>
                <div
                  className={`px-5 pb-4 overflow-hidden transition-all duration-500 ${
                    openIndex === idx
                      ? "max-h-screen opacity-100"
                      : "max-h-0 opacity-0"
                  }`}
                  style={{ transitionProperty: "max-height, opacity" }}
                >
                  <p className="text-base text-gray-700">{faq.answer}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ✅ Lottie Animation */}
        <div className="flex justify-center md:justify-start">
          <Lottie
            animationData={faqAnimation}
            loop
            className="w-64 h-64 sm:w-80 sm:h-80 md:w-96 md:h-96 lg:w-[500px] lg:h-[500px]"
          />
        </div>
      </div>
    </section>
  );
};

export default FaqSection;
