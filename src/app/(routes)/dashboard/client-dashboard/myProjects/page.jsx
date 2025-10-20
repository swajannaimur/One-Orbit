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
            finally {
                setLoading(false);
            }
        };

        if (email) fetchMyProjects();
    }, [email])


    return (
        // <div>
        //     <h2 className="my-20 text-2xl text-center">My Projects</h2>

        //     {projects.length > 0 ? (
        //         projects.map((project, idx) => (

        //             <div
        //                 key={idx} // projectName unique na hole index use
        //                 className="border p-2 rounded-md gap-2 mb-4"
        //             >
        //                 <h3>Project: {project.projectName}</h3>
        //                 <h4>Developers & Bids:</h4>
        //                 <ul className="ml-4 list-disc">
        //                     {project.developerEmails.map((dev, i) => (
        //                         <li key={i}>
        //                             {dev} - Bid: {project.bids[i]}
        //                         </li>
        //                     ))}
        //                 </ul>
        //             </div>
        //         ))
        //     ) : (
        //         <p>No projects found for this client email: {email}</p>
        //     )}
        // </div>


        <div className="w-10/11 mx-auto px-4 my-10">
            {/* page header */}
            <h2 className="text-2xl font-semibold text-center mb-8">My Projects by Bids</h2>

            {/* showing loading spinner */}
            {
                loading ? (<div className="flex justify-center items-center py-10">
                    <span className="loading loading-spinner loading-lg text-primary"></span>
                </div>) : projects.length > 0 ? (
                    <div className="grid grid-cols-1 gap-4">
                        {projects.map((project, idx) => (
                            <ProjectCard key={idx} project={project}></ProjectCard>
                        ))}
                    </div>
                ) : (<p className="text-center text-gray-500">No Bid projects found for this client email : {email}</p>)
            }

        </div>
    )
}
