"use client";
import { useSession } from 'next-auth/react';
import React, { useEffect, useState } from 'react'
import ProjectCard from '../components/ProjectCard';

export default function MyProjects() {

    const [projects, setProjects] = useState([]);
    const [loading, setLoading] = useState(false);
    const { data: session } = useSession();
    const email = session?.user?.email;

    useEffect(() => {
        const fetchMyProjects = async () => {
            try {
                setLoading(true);
                const res = await fetch("/api/totalBids", {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                        clientEmail: email,
                    },
                });

                const data = await res.json();
                if (data.success) {
                    setProjects(data.data);
                } else {
                    console.log("Error: ", data.error);
                }
            } catch (error) {
                console.log("Error fetching total bids", error);
            } finally {
                setLoading(false);
            }
        };

        if (email) fetchMyProjects();
    }, [email]);

    return (
        <div className="w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            {loading ? (
                <div className="flex justify-center items-center py-10">
                    <span className="loading loading-spinner loading-lg text-primary"></span>
                </div>
            ) : projects.length > 0 ? (
                <div className="grid grid-cols-1 gap-6">
                    {projects.map((project, idx) => (
                        <ProjectCard key={idx} project={project} />
                    ))}
                </div>
            ) : (
                <p className="text-center text-gray-500 text-sm sm:text-base break-words">
                    No Bid projects found for this client email: {email}
                </p>
            )}
        </div>
    );
}
