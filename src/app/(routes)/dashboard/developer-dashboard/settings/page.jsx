

"use client";
import React, { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import {
  FaUser,
  FaEnvelope,
  FaSave,
  FaEdit,
  FaLink,
  FaFileUpload,
  FaInfoCircle,
  FaCode,
  FaGithub,
  FaLinkedin,
  FaFacebook,
} from "react-icons/fa";
import Swal from "sweetalert2";
import Image from "next/image";

export default function DeveloperSettingsPage() {
  const { data: session } = useSession();
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    theme: "light",
    notifications: true,
    bio: "",
    portfolio: "",
    resume: "",
    about: "",
    skills: "",
    github: "",
    linkedin: "",
    facebook: "",
    image: "",
    qna: {
      whyHire: "",
      motivation: "",
      future: "",
      quality: "",
      fiveYear: "",
    },
  });
  const [avatarPreview, setAvatarPreview] = useState("");

  // Load user data from API
  useEffect(() => {
    let mounted = true;
    async function loadUser() {
      setLoading(true);
      try {
        const res = await fetch("/api/users/me");
        if (!res.ok) throw new Error("Failed to fetch user");
        const data = await res.json();
        const user = data.user || {};
        if (!mounted) return;

        setFormData({
          name: user.name || session?.user?.name || "",
          email: user.email || session?.user?.email || "",
          theme: user?.preferences?.theme || "light",
          notifications: user?.preferences?.notifications ?? true,
          bio: user.bio || "",
          portfolio: user.portfolio || "",
          resume: user.resume || "",
          about: user.about || "",
          skills: Array.isArray(user.skills)
            ? user.skills.join(", ")
            : user.skills || "",
          github: user.github || "",
          linkedin: user.linkedin || "",
          facebook: user.facebook || "",
          image: user.image || session?.user?.image || "",
          qna: {
            whyHire: user.qna?.whyHire || "",
            motivation: user.qna?.motivation || "",
            future: user.qna?.future || "",
            quality: user.qna?.quality || "",
            fiveYear: user.qna?.fiveYear || "",
          },
        });
        setAvatarPreview(user.image || session?.user?.image || "");
      } catch (err) {
        console.error("Failed to load user settings", err);
      } finally {
        setLoading(false);
      }
    }
    loadUser();
    return () => (mounted = false);
  }, [session]);

  const [showQnA, setShowQnA] = useState(false);

  // Handle input changes
  const handleChange = (e) => {
    const { name, value, type, checked, dataset } = e.target;
    if (dataset.qna) {
      setFormData((prev) => ({
        ...prev,
        qna: { ...prev.qna, [name]: type === "checkbox" ? checked : value },
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: type === "checkbox" ? checked : value,
      }));
    }
  };

  // Handle avatar changes
  const handleImageChange = (e) => {
    const url = e.target.value;
    setFormData((prev) => ({ ...prev, image: url }));
    setAvatarPreview(url);
  };

  const handleFileUpload = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      setAvatarPreview(reader.result);
      setFormData((prev) => ({ ...prev, image: reader.result }));
    };
    reader.readAsDataURL(file);
  };

  // Submit updates
  const handleUpdate = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      // Normalize skills to array before sending
      const payload = {
        ...formData,
        skills: formData.skills
          ? formData.skills.split(",").map((s) => s.trim())
          : [],
      };

      const res = await fetch("/api/users/update", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data?.error || "Update failed");

      Swal.fire({
        icon: "success",
        title: "Profile Updated",
        text: "Your settings have been successfully updated!",
        timer: 1500,
        showConfirmButton: false,
      });
      setIsEditing(false);
    } catch (error) {
      console.error("Update error:", error);
      Swal.fire({
        icon: "error",
        title: "Update Failed",
        text: error?.message || "Something went wrong. Please try again later.",
      });
    } finally {
      setLoading(false);
    }
  };

  // Display skills as array
  const skillsArray = formData.skills
    ? formData.skills.split(",").map((s) => s.trim())
    : [];

  return (
    <div className="max-w-6xl mx-auto bg-gradient-to-br from-indigo-100 via-white to-pink-100 shadow-xl rounded-2xl p-8 mt-20 mb-16 border border-indigo-200">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8 gap-6">
        <div className="flex items-center gap-4">
          <div className="relative w-20 h-20 rounded-full border-4 border-indigo-300 shadow-md overflow-hidden">
            <Image
              src={avatarPreview || "https://i.pravatar.cc/80"}
              alt={formData.name || "Avatar"}
              fill
              className="object-cover"
            />
          </div>

          <div>
            <h2 className="text-2xl font-bold text-gray-800">
              Developer Settings
            </h2>
            <p className="text-sm text-gray-500">
              Manage your developer profile, skills, links, and Q&A
            </p>
          </div>
        </div>

        <div className="flex flex-wrap gap-3">
          <button
            onClick={() => setIsEditing(!isEditing)}
            className="flex items-center gap-2 px-5 py-2 bg-gradient-to-r from-blue-500 to-purple-600 text-white font-semibold rounded-md hover:scale-105 transition-transform"
          >
            {isEditing ? (
              <>
                <FaSave /> Save
              </>
            ) : (
              <>
                <FaEdit /> Edit
              </>
            )}
          </button>

          <button
            onClick={async () => {
              setLoading(true);
              try {
                const res = await fetch("/api/users/me");
                if (!res.ok) throw new Error("Failed to reload");
                const data = await res.json();
                const user = data.user || {};
                setFormData({
                  name: user.name || session?.user?.name || "",
                  email: user.email || session?.user?.email || "",
                  theme: user?.preferences?.theme || "light",
                  notifications: user?.preferences?.notifications ?? true,
                  bio: user.bio || "",
                  portfolio: user.portfolio || "",
                  resume: user.resume || "",
                  about: user.about || "",
                  skills: Array.isArray(user.skills)
                    ? user.skills.join(", ")
                    : user.skills || "",
                  github: user.github || "",
                  linkedin: user.linkedin || "",
                  facebook: user.facebook || "",
                  image: user.image || session?.user?.image || "",
                  qna: {
                    whyHire: user.qna?.whyHire || "",
                    motivation: user.qna?.motivation || "",
                    future: user.qna?.future || "",
                    quality: user.qna?.quality || "",
                    fiveYear: user.qna?.fiveYear || "",
                  },
                });
                setAvatarPreview(user.image || session?.user?.image || "");
              } catch (err) {
                console.error(err);
              } finally {
                setLoading(false);
              }
            }}
            className="px-5 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
          >
            Reload
          </button>
        </div>
      </div>

      {/* Form */}
      <form
        onSubmit={handleUpdate}
        className="space-y-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
      >
        {/* Name */}
        <div>
          <label className="block text-sm font-medium text-gray-600 mb-1">
            <FaUser className="inline mr-1 text-gray-500" /> Name
          </label>
          {isEditing ? (
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="input input-bordered w-full"
            />
          ) : (
            <p className="text-gray-700">{formData.name || "Not set"}</p>
          )}
        </div>

        {/* Email */}
        <div>
          <label className="block text-sm font-medium text-gray-600 mb-1">
            <FaEnvelope className="inline mr-1 text-gray-500" /> Email
          </label>
          <p className="text-gray-700">{formData.email}</p>
        </div>

        {/* Avatar */}
        <div>
          <label className="block text-sm font-medium text-gray-600 mb-1">
            Avatar URL
          </label>
          {isEditing ? (
            <>
              <input
                type="text"
                name="image"
                value={formData.image || ""}
                onChange={handleImageChange}
                className="input input-bordered w-full mb-2"
              />
              <input
                type="file"
                accept="image/*"
                onChange={handleFileUpload}
                className="file-input file-input-bordered w-full"
              />
            </>
          ) : (
            <p className="text-gray-700">
              {formData.image ? "Custom avatar set" : "Using provider avatar"}
            </p>
          )}
        </div>

        {/* Bio */}
        <div className="md:col-span-2">
          <label className="block text-sm font-medium text-gray-600 mb-1">
            <FaInfoCircle className="inline mr-1 text-gray-500" /> Short Bio
          </label>
          {isEditing ? (
            <textarea
              name="bio"
              value={formData.bio}
              onChange={handleChange}
              rows={2}
              className="textarea textarea-bordered w-full"
              placeholder="E.g. Full-stack developer passionate about MERN stack"
            />
          ) : (
            <p className="text-gray-700">{formData.bio || "No bio yet"}</p>
          )}
        </div>

        {/* Skills */}
        <div className="md:col-span-2">
          <label className="block text-sm font-medium text-gray-600 mb-1">
            <FaCode className="inline mr-1 text-gray-500" /> Skills
          </label>
          {isEditing ? (
            <input
              type="text"
              name="skills"
              value={formData.skills}
              onChange={handleChange}
              className="input input-bordered w-full"
              placeholder="e.g., React, Node.js, MongoDB, Tailwind CSS"
            />
          ) : skillsArray.length ? (
            <div className="flex flex-wrap gap-2">
              {skillsArray.map((skill, idx) => (
                <span
                  key={idx}
                  className="bg-indigo-100 text-indigo-700 px-2 py-1 rounded-full text-xs font-medium"
                >
                  {skill}
                </span>
              ))}
            </div>
          ) : (
            <p className="text-gray-700">No skills added</p>
          )}
        </div>

        {/* Portfolio */}
        <div>
          <label className="block text-sm font-medium text-gray-600 mb-1">
            <FaLink className="inline mr-1 text-gray-500" /> Portfolio Link
          </label>
          {isEditing ? (
            <input
              type="url"
              name="portfolio"
              value={formData.portfolio}
              onChange={handleChange}
              className="input input-bordered w-full"
              placeholder="https://yourportfolio.com"
            />
          ) : formData.portfolio ? (
            <a
              href={formData.portfolio}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 underline break-all"
            >
              {formData.portfolio}
            </a>
          ) : (
            <p className="text-gray-700">Not added</p>
          )}
        </div>

        {/* Resume */}
        <div>
          <label className="block text-sm font-medium text-gray-600 mb-1">
            <FaFileUpload className="inline mr-1 text-gray-500" /> Resume URL
          </label>
          {isEditing ? (
            <input
              type="url"
              name="resume"
              value={formData.resume}
              onChange={handleChange}
              className="input input-bordered w-full"
              placeholder="https://drive.google.com/yourresume.pdf"
            />
          ) : formData.resume ? (
            <a
              href={formData.resume}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 underline break-all"
            >
              View Resume
            </a>
          ) : (
            <p className="text-gray-700">No resume uploaded</p>
          )}
        </div>

        {/* About */}
        <div className="md:col-span-3">
          <label className="block text-sm font-medium text-gray-600 mb-1">
            About You
          </label>
          {isEditing ? (
            <textarea
              name="about"
              value={formData.about}
              onChange={handleChange}
              rows={4}
              className="textarea textarea-bordered w-full"
              placeholder="Write about your experience, interests, and goals..."
            />
          ) : (
            <p className="text-gray-700 whitespace-pre-wrap">
              {formData.about || "No details added yet"}
            </p>
          )}
        </div>

        {/* Q&A Section (Collapsible) */}
        <div className="md:col-span-3">
          <button
            type="button"
            onClick={() => setShowQnA(!showQnA)}
            className="w-full flex justify-between items-center bg-indigo-200 hover:bg-indigo-300 text-indigo-800 font-semibold py-2 px-4 rounded-md mb-2 transition"
          >
            <span>Developer Q&A</span>
            <span>{showQnA ? "▲ Hide" : "▼ Show"}</span>
          </button>

          {showQnA && (
            <div className="p-4 border border-indigo-300 rounded-md space-y-4 bg-indigo-50">
              {[
                { label: "Why should we hire you?", name: "whyHire" },
                { label: "What motivates you?", name: "motivation" },
                { label: "Your future goals?", name: "future" },
                { label: "Your key quality?", name: "quality" },
                {
                  label: "Where do you see yourself in 5 years?",
                  name: "fiveYear",
                },
              ].map(({ label, name }) => (
                <div key={name}>
                  <label className="block text-sm font-medium text-gray-600 mb-1">
                    {label}
                  </label>
                  {isEditing ? (
                    <textarea
                      name={name}
                      data-qna="true"
                      value={formData.qna[name]}
                      onChange={handleChange}
                      rows={2}
                      className="textarea textarea-bordered w-full"
                      placeholder={`Your answer to "${label}"`}
                    />
                  ) : (
                    <p className="text-gray-700 whitespace-pre-wrap">
                      {formData.qna[name] || "Not answered yet"}
                    </p>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Social Links */}
        {[
          { label: "GitHub", name: "github", icon: FaGithub },
          { label: "LinkedIn", name: "linkedin", icon: FaLinkedin },
          { label: "Facebook", name: "facebook", icon: FaFacebook },
        ].map(({ label, name, icon: Icon }) => (
          <div key={name}>
            <label className="block text-sm font-medium text-gray-600 mb-1">
              <Icon className="inline mr-1 text-gray-500" /> {label}
            </label>
            {isEditing ? (
              <input
                type="url"
                name={name}
                value={formData[name]}
                onChange={handleChange}
                className="input input-bordered w-full"
                placeholder={`https://${label.toLowerCase()}.com/username`}
              />
            ) : formData[name] ? (
              <a
                href={formData[name]}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 underline break-all"
              >
                {formData[name]}
              </a>
            ) : (
              <p className="text-gray-700">Not added</p>
            )}
          </div>
        ))}

        {/* Theme */}
        <div>
          <label className="block text-sm font-medium text-gray-600 mb-1">
            Theme
          </label>
          {isEditing ? (
            <select
              name="theme"
              value={formData.theme}
              onChange={handleChange}
              className="select select-bordered w-full"
            >
              <option value="light">Light</option>
              <option value="dark">Dark</option>
              <option value="system">System Default</option>
            </select>
          ) : (
            <p className="text-gray-700 capitalize">{formData.theme}</p>
          )}
        </div>

        {/* Notifications */}
        <div>
          <label className="block text-sm font-medium text-gray-600 mb-1">
            Notifications
          </label>
          {isEditing ? (
            <label className="flex items-center gap-2">
              <input
                type="checkbox"
                name="notifications"
                checked={formData.notifications}
                onChange={handleChange}
              />
              <span>Enable</span>
            </label>
          ) : (
            <p className="text-gray-700">
              {formData.notifications ? "Enabled" : "Disabled"}
            </p>
          )}
        </div>

        {/* Submit Button */}
        {isEditing && (
          <div className="md:col-span-3">
            <button
              type="submit"
              disabled={loading}
              className="w-full mt-4 bg-gradient-to-b from-indigo-600 to-indigo-400 text-white py-2 rounded-md hover:bg-indigo-700 transition disabled:opacity-60"
            >
              {loading ? "Saving..." : "Update Settings"}
            </button>
          </div>
        )}
      </form>
    </div>
  );
}
