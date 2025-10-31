"use client";

import { useSearchParams } from "next/navigation";
import {
    FaEnvelope,
    FaCode,
    FaUserTie,
    FaCheckCircle,
    FaPhoneAlt,
    FaMapMarkerAlt,
    FaBriefcase,
} from "react-icons/fa";
import { motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import toast from "react-hot-toast";

export default function AssignDeveloper() {
    const searchParams = useSearchParams();
    const developer = searchParams.get("developer");
    const projectId = searchParams.get("projectId");
    const projectName = searchParams.get("projectName");
    const budget = searchParams.get("budget");

    const [isAlreadyAssigned, setIsAlreadyAssigned] = useState(false);
    const toastShownRef = useRef(false);

    useEffect(() => {
        if (!projectId) return;

        const checkAssignedStatus = async () => {
            try {
                const res = await fetch(`/api/check-assigned?projectId=${projectId}`);
                const data = await res.json();
                setIsAlreadyAssigned(data?.assigned || false);
                if (data?.assigned && !toastShownRef.current) {
                    toast.success("Already Assigned");
                    toastShownRef.current = true;
                }
            } catch (error) {
                toast.error("Error checking assigned status");
            }
        };

        checkAssignedStatus();
    }, [projectId]);




    const handleAssign = async (email) => {
        try {
            const res = await fetch("/api/assign-project", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    projectId,
                    projectName,
                    devEmail: email,
                    budget: budget,
                    payment: "not-paid",
                }),
            });

            const data = await res.json();

            if (data.success) {
                if (data.alreadyAssigned) {
                    toast.error(`Developer already assigned to this project`);
                } else {
                    toast.success("Developer Successfully assigned!");
                    setIsAlreadyAssigned(true);
                }
            } else {
                toast.error(`Error res: ${data.error || "Something went wrong"}`);
            }
        } catch (error) {
            toast.error("Failed to assign developer");
        }
    };

    // static data
    const profile = {
        name: developer?.split("@")[0] || "Unknown Developer",
        role: "Full Stack Developer",
        bio: "Passionate developer with a love for clean code, scalable architecture, and beautiful UI. Experienced in both frontend and backend technologies with a focus on building user-centric applications.",
        skills: [
            "React",
            "Next.js",
            "Node.js",
            "MongoDB",
            "Tailwind CSS",
            "Express",
            "TypeScript",
        ],
        projects: 18,
        experience: [
            {
                company: "TechWave Solutions",
                role: "Frontend Engineer",
                duration: "2022 - Present",
            },
            {
                company: "DevCloud Agency",
                role: "Junior Developer",
                duration: "2020 - 2022",
            },
        ],
        rating: 4.8,
        location: "Dhaka, Bangladesh",
        phone: "+880 1789-123456",
        github: "https://github.com/example",
        linkedin: "https://linkedin.com/in/example",
        status: "Available",
    };

    return (
        <motion.div
            className="max-w-6xl mx-auto  bg-white dark-bg shadow-lg rounded-2xl p-4 sm:p-6 md:p-8"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
        >
            {/* Header Section */}
            <div className="flex flex-col md:flex-row items-center md:items-start gap-6 md:gap-10">
                {/* Profile Picture */}
                <div className="w-32 h-32 sm:w-40 sm:h-40 rounded-full overflow-hidden border-4 border-blue-500 shadow-md flex-shrink-0">
                    <img
                        src={`https://api.dicebear.com/9.x/initials/svg?seed=${profile.name}`}
                        alt="Developer Avatar"
                        className="w-full h-full object-cover"
                    />
                </div>

                {/* Profile Info */}
                <div className="flex-1 w-full text-center md:text-left space-y-2">
                    <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-800 dark:text-white break-words">
                        {profile.name}
                    </h1>
                    <p className="flex justify-center md:justify-start items-center text-gray-600 dark:text-white text-sm sm:text-base gap-2 flex-wrap">
                        <FaUserTie className="text-blue-600" /> {profile.role}
                    </p>
                    <p className="flex justify-center md:justify-start items-center text-gray-600 dark:text-white text-sm sm:text-base gap-2 flex-wrap break-all">
                        <FaEnvelope className="text-blue-600" /> {developer}
                    </p>
                    <p className="flex justify-center md:justify-start items-center text-gray-600 dark:text-white text-sm sm:text-base gap-2 flex-wrap">
                        <FaMapMarkerAlt className="text-blue-600" /> {profile.location}
                    </p>
                    <p className="flex justify-center md:justify-start items-center text-gray-600 dark:text-white text-sm sm:text-base gap-2 flex-wrap">
                        <FaPhoneAlt className="text-blue-600" /> {profile.phone}
                    </p>

                    <div className="flex justify-center md:justify-start items-center gap-2 mt-3">
                        <FaCheckCircle
                            className={`${profile.status === "Available"
                                ? "text-green-500"
                                : "text-gray-400"
                                }`}
                        />
                        <span
                            className={`font-medium ${profile.status === "Available"
                                ? "text-green-600"
                                : "text-gray-600"
                                }`}
                        >
                            {profile.status}
                        </span>
                    </div>
                </div>

                {/* Assign Developer Button */}
                <div className="w-full md:w-auto mt-6 md:mt-0 text-center md:text-right">
                    <button
                        onClick={() => handleAssign(developer)}
                        disabled={isAlreadyAssigned}
                        className={`px-4 sm:px-6 py-2 rounded-lg font-medium shadow-md transition text-sm sm:text-base 
              ${isAlreadyAssigned
                                ? "bg-gray-300 cursor-not-allowed text-gray-600"
                                : "btn-linear text-white cursor-pointer"
                            }`}
                    >
                        {isAlreadyAssigned
                            ? "Already Assigned"
                            : "Assign This Developer"}
                    </button>

                    {isAlreadyAssigned && (
                        <p className="text-xs sm:text-sm text-gray-500 mt-2">
                            This project has already been assigned to a developer.
                        </p>
                    )}
                </div>
            </div>

            {/* Bio */}
            <div className="mt-8">
                <h2 className="text-lg sm:text-xl font-semibold text-gray-800 mb-3 dark:text-white">
                    About
                </h2>
                <p className="text-gray-600 leading-relaxed dark:text-white text-sm sm:text-base">
                    {profile.bio}
                </p>
            </div>

            {/* Skills */}
            <div className="mt-8">
                <h2 className="text-lg sm:text-xl font-semibold text-gray-800 dark:text-white mb-3 flex items-center gap-2">
                    <FaCode className="text-blue-600" /> Skills
                </h2>
                <div className="flex flex-wrap gap-2">
                    {profile.skills.map((skill, index) => (
                        <span
                            key={index}
                            className="bg-blue-50 text-blue-600 text-xs sm:text-sm font-medium px-2 sm:px-3 py-1 rounded-full border border-blue-100"
                        >
                            {skill}
                        </span>
                    ))}
                </div>
            </div>

            {/* Experience Timeline */}
            <div className="mt-8">
                <h2 className="text-lg sm:text-xl font-semibold text-gray-800 dark:text-white mb-3 flex items-center gap-2">
                    <FaBriefcase className="text-blue-600" /> Experience
                </h2>
                <div className="space-y-3 sm:space-y-4">
                    {profile.experience.map((exp, idx) => (
                        <div
                            key={idx}
                            className="border-l-4 border-blue-500 pl-3 sm:pl-4 py-2 bg-gray-50 dark-bg rounded-r-lg"
                        >
                            <p className="text-blue-700 font-semibold text-sm sm:text-base dark:text-white">
                                {exp.role}
                            </p>
                            <p className="text-gray-700 text-sm sm:text-base dark:text-white">
                                {exp.company}
                            </p>
                            <p className="text-gray-500 text-xs sm:text-sm dark:text-white">
                                {exp.duration}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </motion.div>
    );
}
