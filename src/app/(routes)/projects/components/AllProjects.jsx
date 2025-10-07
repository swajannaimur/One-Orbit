"use client";
import React from "react";
import { useEffect, useState } from "react";

export default function AllProjects() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const res = await fetch("/api/posts");
        const data = await res.json();
        setPosts(data);
      } catch (err) {
        console.error("Error fetching posts:", err);
      }
    };
    fetchPosts();
  }, []);

  return (
    <div className="px-10 py-6 min-h-screen mt-20">
      {/* card */}
      <div className="grid grid-cols-3 space-y-8">
        {posts.length > 0 ? (
          posts.map((post) => (
            <div
              key={post._id}
              className="card bg-base-100 w-96 shadow-sm flex "
            >
              <div className="card-body">
                <h2 className="card-title">{post.projectName}</h2>
                <h2 className="text-sm font-semibold">{post.projectType}</h2>
                <p>
                  A card component has a figure, a body part, and inside body
                  there are title and actions parts
                </p>
                <div className="card-actions justify-end">
                  <div className="badge badge-outline">Fashion</div>
                  <div className="badge badge-outline">Products</div>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div>
            <p className="">No posts found</p>
          </div>
        )}
      </div>
    </div>
  );
}
