"use client";

import { useSession } from "next-auth/react";
import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Swal from "sweetalert2";
import {
  FiDollarSign,
  FiCalendar,
  FiTag,
  FiCode,
  FiFileText,
  FiClock,
  FiSend,
  FiUser
} from "react-icons/fi";

// Move InputField OUTSIDE AddPost
const InputField = ({ icon: Icon, label, name, type = "text", value, onChange, required = true, categories = [], ...props }) => (
  <div className="space-y-2">
    <label className="flex items-center gap-2 text-sm font-semibold text-gray-700">
      <Icon className="text-primary" size={16} />
      {label}
      {required && <span className="text-red-500">*</span>}
    </label>
    {type === "select" ? (
      <div className="relative">
        <select
          name={name}
          value={value}
          onChange={onChange}
          required={required}
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary transition-all duration-200 bg-white appearance-none"
          {...props}
        >
          <option value="" disabled>Select {label.toLowerCase()}</option>
          {categories.map((cat, index) => (
            <option key={index} value={cat}>
              {cat}
            </option>
          ))}
        </select>
        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-400">
          <FiTag size={16} />
        </div>
      </div>
    ) : type === "date" ? (
      <div className="relative">
        <DatePicker
          selected={value}
          onChange={onChange}
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary transition-all duration-200"
          dateFormat="MMMM d, yyyy"
          minDate={new Date()}
          {...props}
        />
        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3 text-gray-400">
          <FiCalendar size={16} />
        </div>
      </div>
    ) : (
      <input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        required={required}
        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary transition-all duration-200"
        {...props}
      />
    )}
  </div>
);

const AddPost = () => {
  const { data: session } = useSession();
  const [formValues, setFormValues] = useState({
    projectName: "",
    category: "",
    budget: "",
    skills: "",
    summary: "",
    deadline: new Date(),
  });
  const [isLoading, setIsLoading] = useState(false);

  const categories = [
    "Web design",
    "Web development",
    "SEO",
    "Graphic design",
    "AI prompt engineering",
    "Web design with CMS",
    "Logo design",
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues(prev => ({ ...prev, [name]: value }));
  };

  const handleDateChange = (date) => {
    setFormValues(prev => ({ ...prev, deadline: date }));
  };

  const handleAddPost = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    const userName = session?.user?.name || "Guest";
    const userEmail = session?.user?.email || "guest@example.com";

    const data = {
      ...formValues,
      postedDate: new Date(),
      clientName: userName,
      clientEmail: userEmail,
    };

    try {
      const res = await fetch("/api/posts", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      const result = await res.json();

      if (res.ok) {
        Swal.fire({
          title: "Success!",
          text: "Your project has been posted successfully.",
          icon: "success",
          confirmButtonText: "Continue",
          confirmButtonColor: "#3B82F6",
        });
        setFormValues({
          projectName: "",
          category: "",
          budget: "",
          skills: "",
          summary: "",
          deadline: new Date(),
        });
      } else {
        throw new Error(result.message || "Failed to create post");
      }
    } catch (err) {
      console.error("Error saving:", err);
      Swal.fire({
        title: "Error!",
        text: "Failed to create project. Please try again.",
        icon: "error",
        confirmButtonText: "OK",
        confirmButtonColor: "#EF4444",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-6xl mx-auto">
      {/* Client Info Card */}
      <div className="btn-gradient rounded-xl p-6 mb-8 text-white">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-white/20 rounded-full">
              <FiUser size={24} />
            </div>
            <div>
              <h3 className="text-xl font-semibold">
                {session?.user?.name || "Guest User"}
              </h3>
              <p className="text-blue-100">
                {session?.user?.email || "guest@example.com"}
              </p>
            </div>
          </div>
          <div className="text-right">
            <p className="text-blue-100">Posting as</p>
            <p className="font-semibold">Client</p>
          </div>
        </div>
      </div>

      {/* Project Form */}
      <form onSubmit={handleAddPost} className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden">
        <div className="border-b border-gray-200 bg-gray-50 px-8 py-6">
          <h2 className="text-2xl font-bold text-gray-900 flex items-center gap-3">
            <FiFileText className="text-primary" />
            Project Details
          </h2>
          <p className="text-gray-600 mt-1">
            Fill in all the required information to post your project
          </p>
        </div>

        <div className="p-8 grid grid-cols-1 lg:grid-cols-2 gap-6">
          <InputField
            icon={FiFileText}
            label="Project Name"
            name="projectName"
            value={formValues.projectName}
            onChange={handleChange}
            placeholder="Enter your project title"
          />

          <InputField
            icon={FiTag}
            label="Project Category"
            name="category"
            type="select"
            value={formValues.category}
            onChange={handleChange}
            categories={categories}
          />

          <InputField
            icon={FiCode}
            label="Required Skills"
            name="skills"
            value={formValues.skills}
            onChange={handleChange}
            placeholder="e.g., React, Node.js, Figma"
          />

          <InputField
            icon={FiDollarSign}
            label="Budget ($)"
            name="budget"
            type="number"
            value={formValues.budget}
            onChange={handleChange}
            placeholder="Enter your budget amount"
            min="0"
          />

          <InputField
            icon={FiClock}
            label="Project Deadline"
            name="deadline"
            type="date"
            value={formValues.deadline}
            onChange={handleDateChange}
          />

          <div className="lg:col-span-2 space-y-2">
            <label className="flex items-center gap-2 text-sm font-semibold text-gray-700">
              <FiFileText className="text-primary" size={16} />
              Project Summary
              <span className="text-red-500">*</span>
            </label>
            <textarea
              name="summary"
              value={formValues.summary}
              onChange={handleChange}
              required
              rows={4}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary transition-all duration-200 resize-none"
              placeholder="Describe your project requirements, goals, and any specific details..."
            />
          </div>

          <div className="lg:col-span-2 mt-8 pt-6 border-t border-gray-200 flex justify-center">
            <button
              type="submit"
              disabled={isLoading}
              className="w-full lg:w-auto px-8 py-4 btn-gradient cursor-pointer text-white font-semibold rounded-lg focus:ring-4 focus:ring-primary/20 focus:outline-none transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-3 min-w-[200px]"
            >
              {isLoading ? (
                <>
                  <div className="animate-spin rounded-full h-5 w-5 border-2 border-white border-t-transparent"></div>
                  Posting Project...
                </>
              ) : (
                <>
                  <FiSend size={18} />
                  Post Project
                </>
              )}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default AddPost;
