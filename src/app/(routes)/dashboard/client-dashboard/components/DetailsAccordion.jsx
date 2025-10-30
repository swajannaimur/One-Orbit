"use client";
import Link from 'next/link';
import React, { useEffect, useState } from 'react'
import toast from 'react-hot-toast';

export default function DetailsAccordion({ project }) {

    const [selectedDeveloper, setSelectedDeveloper] = useState(null);
    const [assignedEmails, setAssignedEmails] = useState([]);
    const [loading, setLoading] = useState(false);

    // console.log("Project printing : ", project);

    useEffect(() => {
        if (selectedDeveloper && !loading) {
            document.getElementById("developer_modal").showModal();
        }
    }, [selectedDeveloper, loading]);

    const fetchDeveloper = async (email) => {
        try {
            setLoading(true);
            const res = await fetch("/api/developers", {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    "devEmail": email,
                },
            });

            const data = await res.json();
            if (res.ok) {
                setSelectedDeveloper(data);
                // console.log("selected Developer : ", selectedDeveloper);
                console.log('Selected Developerrr : ', data);
                // document.getElementById("developer_modal").showModal();
            }
            else {
                toast.error("Developer not found!");
            }
        }
        catch (error) {
            console.log(error);
            toast.error("Something went wrong in the API!");
        }
        finally {
            setLoading(false);
        }
    }

    const handleAssign = async (email) => {
        // console.log("Email received : ", email);
        try {

            const res = await fetch("/api/assign-project", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "projectId": project.projectDetails._id,
                    "projectName": project.projectName,
                    "devEmail": email,
                }
            });

            const data = await res.json();

            if (data.success) {
                if (data.alreadyAssigned) // alreadyAssigned is coming from api response
                {
                    toast(`Developer already assigned to this project`);
                }
                else {
                    toast.success("Developer Successfully assigned!");
                    setAssignedEmails((prev) => [...prev, email]);
                }

            }
            else {
                toast.error(`Error: ${data.error || "Something went wrong"}`);
            }
        }
        catch (error) {
            console.log("Error : ", error);
            toast.error("Failed to assign developer")
        }
    }


    return (
        <>
            {/* details accordion */}
            <div className="w-full md:w-80">
                <div className="collapse collapse-arrow bg-base-100 border border-gray-200 rounded-lg">
                    <input type="checkbox" />
                    <div className="collapse-title text-base font-medium">
                        Details
                    </div>
                    <div className="collapse-content space-y-1">
                        <ul className="ml-5 list-disc text-sm text-gray-700">

                            {project.developerEmails.length === 0 ? (
                                <p className="text-gray-500">Nobody has placed any bid</p>
                            ) : (
                                project.developerEmails.map((dev, i) => (
                                    <li key={i} className="mb-1">
                                        <Link
                                            href={{
                                                pathname: "/dashboard/client-dashboard/assign-developer",
                                                query: {
                                                    developer: dev,
                                                    projectId: project.projectDetails._id,
                                                    projectName: project.projectDetails.projectName,
                                                },
                                            }}
                                            className="font-semibold cursor-pointer text-blue-600 hover:underline"
                                        >
                                            {dev}
                                        </Link>{" "}
                                        — Bid:{" "}
                                        <span className="text-green-600 font-semibold">
                                            {project.bids[i]}$
                                        </span>
                                    </li>
                                ))
                            )}

                        </ul>
                    </div>
                </div>
            </div>

            {/* developer profile modal */}
            <dialog id="developer_modal" className="modal">
                <div className="modal-box">
                    {loading ? (
                        <div className="flex justify-center py-10">
                            <span className="loading loading-spinner loading-lg"></span>
                        </div>
                    ) : selectedDeveloper ? (
                        <div className="space-y-2">
                            <h3 className="font-bold text-lg">{selectedDeveloper.name}</h3>
                            <p className="text-sm text-gray-600">
                                Email: {selectedDeveloper.email}
                            </p>

                            {/* <p className="text-sm">
                                Skills: {selectedDeveloper.skills?.join(", ")}
                            </p> */}

                            <p className="text-sm">Rating: No value</p>

                            {/* Assign Button - TODO: make a different Component */}
                            <p className="mt-4">
                                <button
                                    className={`px-3 py-1 rounded-md ${assignedEmails.includes(selectedDeveloper?.email)
                                        ? "bg-gray-300 cursor-not-allowed"
                                        : "bg-blue-400 cursor-pointer"
                                        }`}
                                    onClick={() => handleAssign(selectedDeveloper?.email)}
                                    disabled={assignedEmails.includes(selectedDeveloper?.email)}
                                >
                                    {assignedEmails.includes(selectedDeveloper?.email) ? "Already Assigned" : "Assign"}
                                </button>
                            </p>

                        </div>
                    ) : (
                        <p className="text-center text-gray-500">No data found</p>
                    )}
                    <div className="modal-action">
                        <form method="dialog">
                            <button className="btn btn-sm btn-outline">Close</button>
                        </form>
                    </div>
                </div>
            </dialog>
        </>
    )
}
