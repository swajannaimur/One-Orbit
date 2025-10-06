"use client";

import { useSession } from "next-auth/react";
import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Swal from "sweetalert2";

const AddPost = () => {
  const { data: session } = useSession();
  const [deadline, setDeadline] = useState(new Date());

  const categories = [
    "Web design",
    "Web development",
    "SEO",
    "Graphic design",
    "AI prompt engineering",
    "Web design with CMS",
    "Logo design",
  ];

  const handleAddPost = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);

    const userName = session?.user?.name || "Guest";
    const userEmail = session?.user?.email || "guest@example.com";

    const data = {
      projectName: formData.get("projectName"),
      category: formData.get("category"),
      budget: formData.get("budget"),
      skills: formData.get("skills"),
      summary: formData.get("summary"),
      deadline,
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
      console.log("Saved to MongoDB:", result);
      Swal.fire({
        title: "Post Added!",
        text: "Your project has been saved successfully.",
        icon: "success",
        confirmButtonText: "OK",
      });
    } catch (err) {
      console.error("Error saving:", err);
    }
  };

  return (
    <div className="mb-10">
      <form onSubmit={handleAddPost} className="rounded-2xl px-32 py-8 bg-base-200 shadow-lg">
        <div className="grid grid-cols-2 gap-8">

          <fieldset className="fieldset">
            <legend className="fieldset-legend text-lg text-primary">Project Name</legend>
            <input
              type="text"
              name="projectName"
              required
              className="input w-full border-2 border-secondary"
              placeholder="Enter your project name"
            />
          </fieldset>

          <fieldset className="fieldset relative">
            <legend className="fieldset-legend text-lg text-primary">Category</legend>
            <select
              name="category"
              required
              className="appearance-none input w-full border-2 border-secondary pr-10"
              defaultValue=""
            >
              <option value="" disabled>
                Select category
              </option>
              {categories.map((cat, index) => (
                <option key={index} value={cat}>
                  {cat}
                </option>
              ))}
            </select>
            <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-gray-400">
              ▼
            </span>
          </fieldset>

          <fieldset className="fieldset">
            <legend className="fieldset-legend text-lg text-primary">Skills</legend>
            <input
              type="text"
              name="skills"
              required
              className="input w-full border-2 border-secondary"
              placeholder="Enter required skills"
            />
          </fieldset>

          <fieldset className="fieldset">
            <legend className="fieldset-legend text-lg text-primary">Summary</legend>
            <input
              type="text"
              name="summary"
              required
              className="input w-full border-2 border-secondary"
              placeholder="Enter short description"
            />
          </fieldset>

          <fieldset className="fieldset">
            <legend className="fieldset-legend text-lg text-primary">Deadline</legend>
            <DatePicker
              selected={deadline}
              onChange={(date) => setDeadline(date)}
              className="input w-full border-2 border-secondary"
              dateFormat="dd/MM/yyyy"
            />
          </fieldset>

          <fieldset className="fieldset">
            <legend className="fieldset-legend text-lg text-primary">Budget</legend>
            <input
              type="number"
              name="budget"
              required
              className="input w-full border-2 border-secondary"
              placeholder="Enter your budget"
            />
          </fieldset>

        </div>

        <button type="submit" className="btn btn-primary w-full text-lg my-4">
          Add Post
        </button>
      </form>
    </div>
  );
};

export default AddPost;
