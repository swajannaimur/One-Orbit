import clientPromise from "@/lib/mongodb";
import React from "react";
import MessageForm from "@/components/forms/MessageForm";
import Link from "next/link";
import { FaGithub, FaLinkedin, FaFacebook, FaEnvelope } from "react-icons/fa";
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
      <div className="p-6 text-center">
        <h2 className="text-xl font-semibold">Developer not found</h2>
        <Link
          href="/AllDevelopers"
          className="text-blue-600 hover:underline mt-3 inline-block"
        >
          Back
        </Link>
      </div>
    );
  }

  const socialLinks = [
    { icon: FaGithub, label: "GitHub", url: developer.github },
    { icon: FaLinkedin, label: "LinkedIn", url: developer.linkedin },
    { icon: FaFacebook, label: "Facebook", url: developer.facebook },
    // { icon: FaEnvelope, label: "Email", url: `mailto:${developer.email}` },
  ];

  return (
    <div className="max-w-6xl mx-auto p-6 space-y-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row items-start md:items-center gap-6">
        <div className="relative w-32 h-32">
          <Image
            src={developer.image || "/favicon.ico"}
            alt={developer.name || "Profile"}
            fill
            className="rounded-full object-cover border-2 border-indigo-300 shadow-md"
            sizes="128px"
          />
        </div>
        <div className="flex-1">
          <h1 className="text-3xl font-bold text-gray-800">{developer.name}</h1>
          <p className="text-sm text-gray-500">
            {developer.role || "Developer"}
          </p>
          <p className="mt-2 text-gray-700 whitespace-pre-wrap">
            {developer.bio}
          </p>

          {/* Social Icons */}
          <div className="flex gap-3 mt-3 text-gray-600">
            {socialLinks.map(
              ({ icon: Icon, url, label }) =>
                url && (
                  <a
                    key={label}
                    href={url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-indigo-600 transition-colors text-xl"
                    title={label}
                  >
                    <Icon />
                  </a>
                )
            )}
          </div>
        </div>
      </div>

      {/* Developer Cards (out of grid) */}
      <div className="space-y-6">
        {/* About Card */}
        <div className="bg-white p-6 rounded-lg shadow-md transform transition-transform hover:scale-105 hover:shadow-lg duration-300">
          <h2 className="text-xl font-semibold mb-2">About Me</h2>
          <p className="text-gray-700 whitespace-pre-wrap">
            {developer.about || "No additional details provided."}
          </p>

          <div className="mt-4">
            {developer.resume ? (
              <a
                href={developer.resume}
                target="_blank"
                rel="noopener noreferrer"
                className="btn bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl font-medium hover:shadow-lg transition-all duration-300 hover:scale-105 group hover:underline break-words"
              >
                View Resume
              </a>
            ) : (
              <p className="text-gray-500">No resume provided.</p>
            )}
          </div>

          <div className="mt-2">
            {developer.portfolio ? (
              <a
                href={developer.portfolio}
                target="_blank"
                rel="noopener noreferrer"
                className="btn bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl font-medium hover:shadow-lg transition-all duration-300 hover:scale-105 group hover:underline break-words"
              >
                Open Portfolio
              </a>
            ) : (
              <p className="text-gray-500">No portfolio link.</p>
            )}
          </div>

          <div className="mt-2">
            <h3 className="font-medium text-black">Contact Info</h3>
            <ul className="text-black space-y-1">
              <li>Email: {developer.email}</li>
            </ul>
          </div>
        </div>

        {/* Q&A Card */}
        <div className="bg-white p-6 rounded-lg shadow-md transform transition-transform hover:scale-105 hover:shadow-lg duration-300">
          <h2 className="text-2xl font-semibold mb-4 text-purple-600">Q & A</h2>
          <div className="space-y-4 text-black text-sm">
            {[
              { q: "Why should we hire you?", ans: developer.qna?.whyHire },
              {
                q: "How do you stay motivated long-term?",
                ans: developer.qna?.motivation,
              },
              {
                q: "Projects/technologies you're excited about",
                ans: developer.qna?.future,
              },
              { q: "How do you ensure quality?", ans: developer.qna?.quality },
              {
                q: "Where do you see yourself in 5 years?",
                ans: developer.qna?.fiveYear,
              },
            ].map(({ q, ans }, idx) => (
              <div
                key={idx}
                className="p-3 rounded border-l-4 border-purple-600 hover:bg-indigo-50 transition-colors"
              >
                <strong>{q}</strong>
                <p className="mt-1 whitespace-pre-wrap">
                  {ans || "No answer provided."}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Message Form Card */}
        <div className="bg-white p-6 rounded-lg shadow-md transform transition-transform hover:scale-105 hover:shadow-lg duration-300">
          <h2 className="text-xl font-semibold mb-2">Send a Message</h2>
          <MessageForm developerId={id} developerEmail={developer.email} />
        </div>
      </div>
    </div>
  );
};

export default page;
