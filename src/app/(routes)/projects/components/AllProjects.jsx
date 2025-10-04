"use client";
import React from 'react';
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
        <div className="px-10 py-6 min-h-screen">
            <h2 className="text-3xl font-bold text-center text-primary mb-6">
                All Projects
            </h2>
            {/* table */}
            <div className="overflow-x-auto">
                <table className="table">
                    {/* head */}
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Project Name</th>
                            <th>Type</th>
                            <th>Budget</th>
                            <th>Deadline</th>
                        </tr>
                    </thead>

                    <tbody>
                        {posts.length > 0 ? (
                            posts.map((post, index) => (
                                <tr key={post._id} className="hover:bg-base-100">
                                    <td>{index + 1}</td>
                                    <td>{post.projectName}</td>
                                    <td>{post.projectType}</td>
                                    <td>${post.budget}</td>
                                    <td>{new Date(post.deadline).toLocaleDateString()}</td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="5" className="text-center py-4 text-gray-500">
                                    No posts found
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    )
}
