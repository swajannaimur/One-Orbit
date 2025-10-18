"use client";
import { useSession } from 'next-auth/react';
import React, { useEffect, useState } from 'react'

export default function MyProjects() {

    const [projects, setProjects] = useState([]);
    const { data: session } = useSession();

    const email = session?.user?.email;
    
    useEffect(()=>{
        const fetchMyProjects = async () => {
            const res = await fetch("/api/myProjects", {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    email: email,
                },
            });

            const data = await res.json();
            setProjects(data);
        };
        if(email) fetchMyProjects();
    }, [email])


    return (
        <div>
            <h2 className="my-20 text-2xl text-center">My projects</h2>

            
            {
                projects.length > 0 ? (
                    projects.map((project) => (
                        <div key={project._id} className="border p-2 rounded-md gap-2 mb-4">
                            <h3>{project.projectName}</h3>
                            <h4>Owner : {project.clientEmail}</h4>
                        </div>
                    ))
                ) : (<p>No projects found in this client email : {email}</p>)
            }
        </div>
    )
}
