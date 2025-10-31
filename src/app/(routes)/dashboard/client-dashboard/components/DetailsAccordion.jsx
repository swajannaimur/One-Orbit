"use client";
import Link from 'next/link';
import React, { useEffect, useState } from 'react'
import toast from 'react-hot-toast';

export default function DetailsAccordion({ project }) {

    const [selectedDeveloper, setSelectedDeveloper] = useState(null);
    const [assignedEmails, setAssignedEmails] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (selectedDeveloper && !loading) {
            document.getElementById("developer_modal").showModal();
        }
    }, [selectedDeveloper, loading]);

    return (
        <>
            {/* details accordion */}
            <div className="w-full">
                <div className="collapse collapse-arrow rounded-lg border border-gray-200 dark:border-gray-700">
                    <input type="checkbox" />
                    <div className="collapse-title text-sm sm:text-base font-medium dark:text-white">
                        Details
                    </div>
                    <div className="collapse-content space-y-2 sm:space-y-1">
                        <ul className="ml-4 sm:ml-5 list-disc text-sm sm:text-base text-gray-700 dark:text-white space-y-1">
                            {project.developerEmails.length === 0 ? (
                                <p className="text-gray-500 dark:text-white text-sm">
                                    Nobody has placed any bid
                                </p>
                            ) : (
                                project.developerEmails.map((dev, i) => (
                                    <li key={i} className="mb-1 break-all">
                                        <Link
                                            href={{
                                                pathname: "/dashboard/client-dashboard/assign-developer",
                                                query: {
                                                    developer: dev,
                                                    projectId: project.projectDetails._id,
                                                    projectName: project.projectDetails.projectName,
                                                    budget: project.bids[i],
                                                },
                                            }}
                                            className="font-semibold cursor-pointer text-blue-600 hover:underline break-all"
                                        >
                                            {dev}
                                        </Link>{" "}
                                        — Bid:{" "}
                                        <span className="text-green-600 font-semibold dark:text-white">
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
                <div className="modal-box max-w-xs sm:max-w-md">
                    {loading ? (
                        <div className="flex justify-center py-10">
                            <span className="loading loading-spinner loading-lg"></span>
                        </div>
                    ) : selectedDeveloper ? (
                        <div className="space-y-2 text-sm sm:text-base">
                            <h3 className="font-bold text-lg">{selectedDeveloper.name}</h3>
                            <p className="text-gray-600 break-all">
                                Email: {selectedDeveloper.email}
                            </p>

                            <p className="text-sm">Rating: No value</p>

                            <p className="mt-4">
                                <button
                                    className={`px-3 py-1 rounded-md text-sm sm:text-base ${assignedEmails.includes(selectedDeveloper?.email)
                                        ? "bg-gray-300 cursor-not-allowed"
                                        : "bg-blue-400 cursor-pointer"
                                        }`}
                                    onClick={() => handleAssign(selectedDeveloper?.email)}
                                    disabled={assignedEmails.includes(selectedDeveloper?.email)}
                                >
                                    {assignedEmails.includes(selectedDeveloper?.email)
                                        ? "Already Assigned"
                                        : "Assign"}
                                </button>
                            </p>
                        </div>
                    ) : (
                        <p className="text-center text-gray-500 text-sm">No data found</p>
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
