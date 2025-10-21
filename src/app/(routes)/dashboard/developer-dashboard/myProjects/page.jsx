"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import { FaTrashAlt, FaEye } from "react-icons/fa";
import Swal from "sweetalert2";
import { useSession } from "next-auth/react"; // ✅ import session

export default function DevelopersProjects() {
  const { data: session, status } = useSession(); // ✅ get session data
  const [bids, setBids] = useState([]);
  const [assignedProjects, setAssignedProjects] = useState([]);
  const [loading, setLoading] = useState(true);

  // ✅ Wait for session to load
  useEffect(() => {
    if (status === "loading") return; // wait for session
    if (status === "unauthenticated") {
      setLoading(false);
      return;
    }

    const developerEmail = session?.user?.email;
    if (!developerEmail) {
      setLoading(false);
      return;
    }

    const fetchData = async () => {
      try {
        const [bidsRes, assignedRes, projectDetails] = await Promise.all([
          fetch("/api/bids"),
          fetch("/api/assign-project"),
          fetch("/api/posts"),
        ]);

        const bidsData = await bidsRes.json();
        const assignedData = await assignedRes.json();
        const postsData = await projectDetails.json();

        // ✅ Filter projects by logged-in developer
        const myBids = bidsData.filter(
          (bid) => bid.developerEmail === developerEmail
        );
        const myAssigned = assignedData.filter((p) =>
          p.developers?.includes(developerEmail)
        );

        setBids(myBids);
        setAssignedProjects(myAssigned);
      } catch (error) {
        console.error("Error fetching projects:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [session, status]);

  // ✅ Delete bid
  const handleDeleteBid = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "This will remove the card from the page!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, remove it!",
      cancelButtonText: "Cancel",
    }).then((result) => {
      if (result.isConfirmed) {
        // Remove bid from state
        setBids((prev) => prev.filter((b) => b._id !== id));

        Swal.fire(
          "Removed!",
          "The card has been removed from the page.",
          "success"
        );
      }
    });
  };

  // ✅ Handle session loading
  if (status === "loading" || loading)
    return <p className="text-center py-10">Loading...</p>;

  if (status === "unauthenticated")
    return (
      <p className="text-center py-10 text-red-600 font-medium">
        Please log in to view your projects.
      </p>
    );

  return (
    <div className="p-6 space-y-10">
      {/* Stats */}
      <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
        <h1 className="text-2xl font-semibold">Developer Projects</h1>
        <div className="flex gap-6 text-center">
          <div className="bg-blue-100 px-4 py-2 rounded-lg shadow-md">
            <h3 className="text-blue-700 font-semibold text-lg">
              Total Bids: {bids.length}
            </h3>
          </div>
          <div className="bg-green-100 px-4 py-2 rounded-lg shadow-md">
            <h3 className="text-green-700 font-semibold text-lg">
              Assigned Projects: {assignedProjects.length}
            </h3>
          </div>
        </div>
      </div>

      {/* Bids Section */}
      <div>
        <h2 className="text-xl font-semibold mb-4 border-b pb-2">
          Projects I Have Bid On
        </h2>
        {bids.length === 0 ? (
          <p className="text-gray-500">You haven’t placed any bids yet.</p>
        ) : (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {bids.map((project) => (
              <div
                key={project._id}
                className="bg-white rounded-2xl shadow hover:shadow-lg transition-all p-5 border border-gray-100"
              >
                <h3 className="text-lg font-semibold text-gray-800">
                  {project.projectName}
                </h3>
                <p className="text-sm text-gray-500 mb-2">{project.category}</p>
                {/* <p className="text-gray-600 mb-3">
                  {project.shortDescription?.slice(0, 80)}...
                </p> */}
                <p className="text-sm text-gray-500 mb-2">
                  <strong>Deadline:</strong> {project.deadline || "Not set"}
                </p>
                <p className="text-sm text-gray-500 mb-4">
                  <strong>Client:</strong> {project.clientName || "N/A"}
                </p>
                <div className="flex justify-between items-center">
                  <Link
                    href={`/projects/${project._id}`}
                    className="flex items-center gap-2 text-blue-600 hover:underline text-sm"
                  >
                    <FaEye /> View Details
                  </Link>
                  <button
                    onClick={() => handleDeleteBid(project._id)}
                    className="flex items-center gap-2 text-red-600 hover:text-red-800"
                  >
                    <FaTrashAlt /> Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Assigned Section */}
      <div>
        <h2 className="text-xl font-semibold mb-4 border-b pb-2">
          Projects Assigned to Me
        </h2>
        {assignedProjects.length === 0 ? (
          <p className="text-gray-500">No projects assigned yet.</p>
        ) : (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {assignedProjects.map((project) => (
              <div
                key={project._id}
                className="bg-white rounded-2xl shadow hover:shadow-lg transition-all p-5 border border-gray-100"
              >
                <h3 className="text-lg font-semibold text-gray-800">
                  {project.projectName}
                </h3>
                <p className="text-sm text-gray-500 mb-3">
                  <strong>Status:</strong> {project.status}
                </p>
                <p className="text-sm text-gray-600 mb-3">
                  Assigned at:{" "}
                  {new Date(project.assignedAt).toLocaleDateString()}
                </p>
                <div className="flex justify-between items-center">
                  <Link
                    href={`/projects/${post._id}`}
                    className="flex items-center gap-2 text-blue-600 hover:underline text-sm"
                  >
                    <FaEye /> View Details
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
