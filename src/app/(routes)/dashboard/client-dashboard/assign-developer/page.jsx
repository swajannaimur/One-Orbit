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
    FaStar,
    FaGithub,
    FaLinkedin,
    FaLaptopCode,
} from "react-icons/fa";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

export default function AssignDeveloper() {
    const searchParams = useSearchParams();
    const developer = searchParams.get("developer");
    const projectId = searchParams.get("projectId");
    const projectName = searchParams.get("projectName");

    const [isAlreadyAssigned, setIsAlreadyAssigned] = useState(false);
    // console.log("Project id in assign dev : ", projectId);
    // console.log("Project name in assing dev : ", projectName);

    useEffect(() => {
        let toastShown = false;
        const checkAssignedStatus = async () => {
            if (!projectId) return;
            try {
                const res = await fetch(`/api/check-assigned?projectId=${projectId}`);
                const data = await res.json();

                setIsAlreadyAssigned(data?.assigned || false);

                if (data?.assigned && !toastShown) {
                    toast.success("Already Assigned");
                    toastShown = true;
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
                    devEmail: email
                }),
            });

            const data = await res.json();

            if (data.success) {
                if (data.alreadyAssigned) {
                    toast.error(`Developer already assigned to this project`);
                } else {
                    toast.success("Developer Successfully assigned!");
                    setIsAlreadyAssigned(true); // button immediately update
                }
            } else {
                toast.error(`Error res: ${data.error || "Something went wrong"}`);
            }
        } catch (error) {
            console.log("Error : ", error);
            toast.error("Failed to assign developer");
        }
    };




    // static data
    const profile = {
        name: developer?.split("@")[0] || "Unknown Developer",
        role: "Full Stack Developer",
        bio: "Passionate developer with a love for clean code, scalable architecture, and beautiful UI. Experienced in both frontend and backend technologies with a focus on building user-centric applications.",
        skills: ["React", "Next.js", "Node.js", "MongoDB", "Tailwind CSS", "Express", "TypeScript"],
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
            className="max-w-5xl mx-auto mt-10 bg-white border border-gray-200 shadow-lg rounded-2xl p-8"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
        >
            {/* Header Section */}
            <div className="flex flex-col md:flex-row items-center gap-8">
                {/* Profile Picture */}
                <div className="w-40 h-40 rounded-full overflow-hidden border-4 border-blue-500 shadow-md">
                    <img
                        src={`https://api.dicebear.com/9.x/initials/svg?seed=${profile.name}`}
                        alt="Developer Avatar"
                        className="w-full h-full object-cover"
                    />
                </div>



                {/* Profile Info */}
                <div className="flex-1 space-y-2">
                    <h1 className="text-4xl font-bold text-gray-800">{profile.name}</h1>
                    <p className="flex items-center text-gray-600 text-base gap-2">
                        <FaUserTie className="text-blue-600" /> {profile.role}
                    </p>
                    <p className="flex items-center text-gray-600 text-base gap-2">
                        <FaEnvelope className="text-blue-600" /> {developer}
                    </p>
                    <p className="flex items-center text-gray-600 text-base gap-2">
                        <FaMapMarkerAlt className="text-blue-600" /> {profile.location}
                    </p>
                    <p className="flex items-center text-gray-600 text-base gap-2">
                        <FaPhoneAlt className="text-blue-600" /> {profile.phone}
                    </p>

                    <div className="flex items-center gap-2 mt-3">
                        <FaCheckCircle
                            className={`${profile.status === "Available" ? "text-green-500" : "text-gray-400"
                                }`}
                        />
                        <span
                            className={`font-medium ${profile.status === "Available" ? "text-green-600" : "text-gray-600"
                                }`}
                        >
                            {profile.status}
                        </span>
                    </div>
                </div>

                {/* assign developer button */}
                <div className="mt-10 text-center">
                    <button
                        onClick={() => handleAssign(developer)}
                        disabled={isAlreadyAssigned}
                        className={`px-4 py-2 rounded-lg font-medium shadow-md transition text-md 
      ${isAlreadyAssigned
                                ? "bg-gray-300 cursor-not-allowed text-gray-600"
                                : "bg-blue-600 hover:bg-blue-700 text-white cursor-pointer"
                            }`}
                    >
                        {isAlreadyAssigned ? "Already Assigned" : "Assign This Developer"}
                    </button>

                    {isAlreadyAssigned && (
                        <p className="text-sm text-gray-500 mt-2">
                            This project has already been assigned to a developer.
                        </p>
                    )}
                </div>


            </div>

            {/* Bio */}
            <div className="mt-8">
                <h2 className="text-xl font-semibold text-gray-800 mb-3">About</h2>
                <p className="text-gray-600 leading-relaxed">{profile.bio}</p>
            </div>

            {/* Skills */}
            <div className="mt-8">
                <h2 className="text-xl font-semibold text-gray-800 mb-3 flex items-center gap-2">
                    <FaCode className="text-blue-600" /> Skills
                </h2>
                <div className="flex flex-wrap gap-2">
                    {profile.skills.map((skill, index) => (
                        <span
                            key={index}
                            className="bg-blue-50 text-blue-600 text-sm font-medium px-3 py-1 rounded-full border border-blue-100"
                        >
                            {skill}
                        </span>
                    ))}
                </div>
            </div>

            {/* Experience Timeline */}
            <div className="mt-8">
                <h2 className="text-xl font-semibold text-gray-800 mb-3 flex items-center gap-2">
                    <FaBriefcase className="text-blue-600" /> Experience
                </h2>
                <div className="space-y-4">
                    {profile.experience.map((exp, idx) => (
                        <div
                            key={idx}
                            className="border-l-4 border-blue-500 pl-4 py-2 bg-gray-50 rounded-r-lg"
                        >
                            <p className="text-blue-700 font-semibold">{exp.role}</p>
                            <p className="text-gray-700">{exp.company}</p>
                            <p className="text-gray-500 text-sm">{exp.duration}</p>
                        </div>
                    ))}
                </div>
            </div>

            {/* Ratings */}
            <div className="mt-8">
                <h2 className="text-xl font-semibold text-gray-800 mb-3 flex items-center gap-2">
                    <FaStar className="text-yellow-500" /> Ratings
                </h2>
                <div className="flex items-center gap-1">
                    {[...Array(5)].map((_, i) => (
                        <FaStar
                            key={i}
                            className={`${i < Math.floor(profile.rating)
                                ? "text-yellow-400"
                                : "text-gray-300"
                                } text-lg`}
                        />
                    ))}
                    <span className="ml-2 text-gray-700 font-medium">
                        {profile.rating.toFixed(1)} / 5.0
                    </span>
                </div>
            </div>

            {/* Project Stats */}
            <div className="mt-8">
                <h2 className="text-xl font-semibold text-gray-800 mb-3 flex items-center gap-2">
                    <FaLaptopCode className="text-blue-600" /> Project Stats
                </h2>
                <div className="bg-gray-50 border border-gray-200 rounded-lg p-4 flex items-center justify-between">
                    <p className="text-gray-600 text-sm">Total Projects Completed</p>
                    <p className="text-xl font-bold text-blue-600">{profile.projects}</p>
                </div>
            </div>

            {/* Social Links */}
            <div className="mt-8 flex gap-4">
                <a
                    href={profile.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-700 hover:text-black flex items-center gap-2"
                >
                    <FaGithub className="text-2xl" /> GitHub
                </a>
                <a
                    href={profile.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-700 hover:text-blue-800 flex items-center gap-2"
                >
                    <FaLinkedin className="text-2xl" /> LinkedIn
                </a>
            </div>

        </motion.div>
    );
}
