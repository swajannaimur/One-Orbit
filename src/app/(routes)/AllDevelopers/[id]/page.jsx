import clientPromise from "@/lib/mongodb";
import React from "react";
import MessageForm from "@/components/forms/MessageForm";
import Link from "next/link";
import { FaGithub, FaLinkedin, FaFacebook } from "react-icons/fa";
import Image from "next/image";

const page = async ({ params }) => {
  const { id } = params;
  const client = await clientPromise;
  const db = client.db(process.env.DB_NAME);

  const { ObjectId } = await import("mongodb");
  const developer = await db
    .collection("users-data")
    .findOne({ _id: new ObjectId(id) }, { projection: { password: 0 } });

  if (!developer) {
    return (
      <div className="flex justify-center items-center min-h-screen p-6">
        <div className="text-center">
          <h2 className="text-xl font-semibold">Developer not found</h2>
          <Link
            href="/AllDevelopers"
            className="text-blue-600 hover:underline mt-3 inline-block"
          >
            Back
          </Link>
        </div>
      </div>
    );
  }

  const socialLinks = [
    { icon: FaGithub, label: "GitHub", url: developer.github },
    { icon: FaLinkedin, label: "LinkedIn", url: developer.linkedin },
    { icon: FaFacebook, label: "Facebook", url: developer.facebook },
  ];

  return (
    <div className="min-h-screen bg-linear-to-br from-gray-50 to-blue-50 dark:from-gray-900 dark:to-gray-800 py-24">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">

        {/* Top Card */}
        <div className="bg-white dark:bg-gray-800 rounded-3xl shadow-xl border border-gray-200 dark:border-gray-700 overflow-hidden">
          {/* Linear Top Bar */}
          <div className="h-2 bg-linear-to-r from-blue-500 to-purple-600"></div>

          <div className="p-8 flex flex-col md:flex-row items-start md:items-center gap-8">
            {/* Profile Image */}
            <div className="relative w-32 h-32 rounded-full overflow-hidden border-4 border-white dark:border-gray-800 shadow-md shrink-0">
              <Image
                src={developer.image || "/favicon.ico"}
                alt={developer.name || "Profile"}
                fill
                className="object-cover"
                sizes="128px"
              />
            </div>

            {/* Info */}
            <div className="flex-1 space-y-4">
              <div>
                <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
                  {developer.name}
                </h1>
                <p className="text-sm text-gray-500">{developer.role || "Developer"}</p>
              </div>
              <p className="text-gray-700 dark:text-gray-300 whitespace-pre-wrap">
                {developer.bio}
              </p>

              {/* Social Links */}
              <div className="flex gap-3 text-gray-600 dark:text-gray-400 text-xl">
                {socialLinks.map(
                  ({ icon: Icon, url, label }) =>
                    url && (
                      <a
                        key={label}
                        href={url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="hover:text-indigo-600 transition-colors"
                        title={label}
                      >
                        <Icon />
                      </a>
                    )
                )}
              </div>
            </div>
          </div>
        </div>

        {/* About & Resume Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* About Card */}
          <div className="bg-white dark:bg-gray-800 rounded-3xl shadow-xl border border-gray-200 dark:border-gray-700 overflow-hidden transform transition-transform hover:scale-105 hover:shadow-2xl duration-300">
            <div className="h-2 bg-linear-to-r from-blue-500 to-purple-600"></div>
            <div className="p-6 space-y-4">
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white">About Me</h2>
              <p className="text-gray-700 dark:text-gray-300 whitespace-pre-wrap">
                {developer.about || "No additional details provided."}
              </p>

              {developer.resume && (
                <a
                  href={developer.resume}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block w-full text-center px-4 py-2 bg-linear-to-r from-blue-600 to-purple-600 text-white font-medium rounded-xl hover:shadow-lg transition-all duration-300 hover:scale-105"
                >
                  View Resume
                </a>
              )}

              {developer.portfolio && (
                <a
                  href={developer.portfolio}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block w-full text-center px-4 py-2 bg-linear-to-r from-blue-600 to-purple-600 text-white font-medium rounded-xl hover:shadow-lg transition-all duration-300 hover:scale-105"
                >
                  Open Portfolio
                </a>
              )}

              <div>
                <h3 className="font-medium text-gray-900 dark:text-white">Contact Info</h3>
                <p className="text-gray-700 dark:text-gray-300 mt-1">Email: {developer.email}</p>
              </div>
            </div>
          </div>

          {/* Q&A Card */}
          <div className="bg-white dark:bg-gray-800 rounded-3xl shadow-xl border border-gray-200 dark:border-gray-700 overflow-hidden transform transition-transform hover:scale-105 hover:shadow-2xl duration-300">
            <div className="h-2 bg-linear-to-r from-purple-500 to-blue-600"></div>
            <div className="p-6 space-y-4">
              <h2 className="text-2xl font-semibold text-purple-600 mb-4">Q & A</h2>
              {[{ q: "Why should we hire you?", ans: developer.qna?.whyHire },
              { q: "How do you stay motivated long-term?", ans: developer.qna?.motivation },
              { q: "Projects/technologies you're excited about", ans: developer.qna?.future },
              { q: "How do you ensure quality?", ans: developer.qna?.quality },
              { q: "Where do you see yourself in 5 years?", ans: developer.qna?.fiveYear },
              ].map(({ q, ans }, idx) => (
                <div
                  key={idx}
                  className="p-3 dark:text-white rounded border-l-4 border-purple-600 hover:bg-indigo-50 hover:text-gray-700 transition-colors"
                >
                  <strong>{q}</strong>
                  <p className="mt-1 whitespace-pre-wrap dark:text-white hover:bg-indigo-50 hover:text-gray-700 transition-colors">
                    {ans || "No answer provided."}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Message Form Card */}
        <div className="bg-white dark:bg-gray-800 rounded-3xl shadow-xl border border-gray-200 dark:border-gray-700 overflow-hidden transform transition-transform hover:scale-105 hover:shadow-2xl duration-300">
          <div className="h-2 bg-linear-to-r from-blue-500 to-purple-600"></div>
          <div className="p-6">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">Send a Message</h2>
            <MessageForm developerId={id} />
          </div>
        </div>

      </div>
    </div>
  );
};

export default page;
