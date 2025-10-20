"use client";
import { useSession } from 'next-auth/react';
import React, { useEffect, useState } from 'react'

export default function MyProjects() {

    const [projects, setProjects] = useState([]);
    const { data: session } = useSession();

    const email = session?.user?.email;

    useEffect(() => {
        const fetchMyProjects = async () => {

            try {
                const res = await fetch("/api/totalBids", {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                        clientEmail: email,
                    },
                });

                const data = await res.json();
                console.log(data)
                if (data.success) {
                    setProjects(data.data);
                }
                else {
                    console.log("Error: ", data.error)
                }
            }

            catch (error) {
                console.log("Error fetching total bids", error);
            }
        };

        if (email) fetchMyProjects();
    }, [email])


    return (
        <div>
            <h2 className="my-20 text-2xl text-center">My Projects</h2>

            {projects.length > 0 ? (
                projects.map((project, idx) => (
                    
                    <div
                        key={idx} // projectName unique na hole index use
                        className="border p-2 rounded-md gap-2 mb-4"
                    >
                        <h3>Project: {project.projectName}</h3>
                        <h4>Developers & Bids:</h4>
                        <ul className="ml-4 list-disc">
                            {project.developerEmails.map((dev, i) => (
                                <li key={i}>
                                    {dev} - Bid: {project.bids[i]}
                                </li>
                            ))}
                        </ul>
                    </div>
                ))
            ) : (
                <p>No projects found for this client email: {email}</p>
            )}
        </div>
    )
}
