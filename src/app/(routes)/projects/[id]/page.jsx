"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";

export default function ProjectDetails() {
    const { id } = useParams();
    const [post, setPost] = useState(null);

    useEffect(() => {
        const fetchPost = async () => {
            try {
                const res = await fetch(`/api/posts/${id}`);
                if (!res.ok) throw new Error("Post not found");
                const data = await res.json();
                setPost(data);
            } catch (err) {
                console.error("Error fetching post:", err);
            }
        };
        if (id) fetchPost();
    }, [id]);

    if (!post) return <p>Loading...</p>;
console.log(post);

    return (
        <div className="p-8">
            <h1 className="text-3xl font-bold mb-4">{post.projectName}</h1>
            <p className="text-gray-600 mb-2">{post.summary}</p>
            <p className="text-sm text-gray-500">Category: {post.category}</p>
            <p className="text-sm text-gray-500">Budget: ${post.budget}</p>
        </div>
    );
}
