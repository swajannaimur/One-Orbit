"use client";
import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import {
  FaUserEdit,
  FaUsers,
  FaEnvelope,
  FaSync,
  FaCrown,
  FaUser,
  FaUserTie,
} from "react-icons/fa";
import { MdPendingActions, MdCancel, MdCheckCircle } from "react-icons/md";
import Swal from "sweetalert2";
import Loading from "@/app/loading";

export default function TeamMemberPage() {
  const { data: session } = useSession();
  const userEmail = session?.user?.email;

  const [teamMembers, setTeamMembers] = useState([]);
  const [invites, setInvites] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("team");

  // Fetch team members (status: done)
  const fetchTeamMembers = async () => {
    try {
      const res = await fetch("/api/users/done-invites");
      if (!res.ok) throw new Error("Failed to fetch team members");
      const data = await res.json();

      // ✅ Filter by userEmail (show only the ones created by this user)
      const filteredMembers = (data.users || []).filter(
        (member) => member.inviterEmail === userEmail
      );
      setTeamMembers(filteredMembers);
    } catch (err) {
      Swal.fire("Error", err.message, "error");
    }
  };

  // Fetch all invites
  const fetchInvites = async () => {
    try {
      const res = await fetch("/api/users/invite/users-invites");
      if (!res.ok) throw new Error("Failed to fetch invites");
      const data = await res.json();


      // ✅ Filter by userEmail (show only invites created by this user)
      const filteredInvites = (data.invites || []).filter(
        (inv) => inv.inviteeEmail === userEmail
      );
      setInvites(filteredInvites);
    } catch (err) {
      Swal.fire("Error", err.message, "error");
    }
  };

  const refreshData = async () => {
    setLoading(true);
    await Promise.all([fetchTeamMembers(), fetchInvites()]);
    setLoading(false);
    Swal.fire("Success", "Data refreshed successfully", "success");
  };

  useEffect(() => {
    if (!userEmail) return;
    const fetchAll = async () => {
      setLoading(true);
      await Promise.all([fetchTeamMembers(), fetchInvites()]);
      setLoading(false);
    };
    fetchAll();
  }, [userEmail]);

  // Update invite status
  const handleUpdateStatus = async (inv) => {
    const { value: status } = await Swal.fire({
      title: `Update Status for ${inv.inviteeEmail}`,
      input: "select",
      inputOptions: {
        pending: "Pending",
        done: "Done",
        canceled: "Canceled",
      },
      inputValue: inv.status,
      showCancelButton: true,
      inputValidator: (value) => {
        if (!value) return "You need to select a status!";
      },
    });

    if (!status) return;

    try {
      const res = await fetch(`/api/users/invite/${inv._id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status }),
      });

      if (!res.ok) throw new Error("Failed to update status");

      setInvites((prev) =>
        prev.map((item) => (item._id === inv._id ? { ...item, status } : item))
      );

      if (status === "done") {
        await fetchTeamMembers();
      }

      Swal.fire("Success", "Status updated successfully", "success");
    } catch (err) {
      Swal.fire("Error", err.message, "error");
    }
  };


  const getStatusIcon = (status) => {
    switch (status) {
      case "pending":
        return <MdPendingActions className="text-yellow-500" />;
      case "done":
        return <MdCheckCircle className="text-green-500" />;
      case "canceled":
        return <MdCancel className="text-red-500" />;
      default:
        return <MdPendingActions className="text-gray-500" />;
    }
  };

  const getRoleIcon = (role) => {
    switch (role) {
      case "admin":
        return <FaCrown className="text-purple-500" />;
      case "manager":
        return <FaUserTie className="text-blue-500" />;
      default:
        return <FaUser className="text-gray-500" />;
    }
  };

  if(loading) return <Loading/>

  return (
    <div className="min-h-screen dark-bg bg-linear-to-br from-blue-50 to-purple-50 py-8 px-4 mt-20">
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold bg-linear-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-4">
            Team Management
          </h1>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto dark:text-white">
            Manage your team members and track invitation status in real-time
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="dark-bg  rounded-2xl shadow-lg p-6 border-l-4 border-blue-500">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-500 dark:text-white text-sm">Team Members</p>
                <p className="text-3xl font-bold text-gray-800 dark:text-white">{teamMembers.length}</p>
              </div>
              <div className="p-3 bg-blue-100 rounded-full">
                <FaUsers className="text-2xl text-blue-600" />
              </div>
            </div>
          </div>

          <div className="dark-bg  rounded-2xl shadow-lg p-6 border-l-4 border-purple-500">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-500 dark:text-white text-sm">Pending Invites</p>
                <p className="text-3xl font-bold text-gray-800 dark:text-white">
                  {invites.filter((inv) => inv.status === "pending").length}
                </p>
              </div>
              <div className="p-3 bg-purple-100 rounded-full">
                <FaEnvelope className="text-2xl text-purple-600" />
              </div>
            </div>
          </div>

          <div className="dark-bg  rounded-2xl shadow-lg p-6 border-l-4 border-green-500">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-500 dark:text-white text-sm">Total Invites</p>
                <p className="text-3xl font-bold text-gray-800 dark:text-white">{invites.length}</p>
              </div>
              <div className="p-3 bg-green-100 rounded-full">
                <FaUserEdit className="text-2xl text-green-600" />
              </div>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="dark-bg rounded-2xl shadow-xl overflow-hidden">
          {/* Tabs */}
          <div className="border-b border-gray-200">
            <div className="flex">
              <button
                onClick={() => setActiveTab("team")}
                className={`flex items-center gap-2 px-6 py-4 font-medium text-sm transition-all ${activeTab === "team"
                  ? "text-blue-600 border-b-2 border-blue-600 bg-blue-50"
                  : "text-gray-500 hover:text-gray-700"
                  }`}
              >
                <FaUsers />
                Team Members ({teamMembers.length})
              </button>
              <button
                onClick={() => setActiveTab("invites")}
                className={`flex items-center gap-2 px-6 py-4 font-medium text-sm transition-all ${activeTab === "invites"
                  ? "text-blue-600 border-b-2 border-blue-600 bg-blue-50"
                  : "text-gray-500 hover:text-gray-700"
                  }`}
              >
                <FaEnvelope />
                Invitations ({invites.length})
              </button>
            </div>
          </div>

          {/* Tab Content */}
          <div className="p-6">
            {/* ✅ Team Members Tab */}
            {activeTab === "team" && (
              <div>
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-xl  font-semibold text-gray-800 dark:text-white">
                    Active Team Members
                  </h2>
                 
                </div>

                {teamMembers.length === 0 ? (
                  <div className="text-center py-12">
                    <FaUsers className="text-6xl text-gray-300 mx-auto mb-4" />
                    <p className="text-gray-500 text-lg mb-2">No team members yet</p>
                    <p className="text-gray-400">Invite team members to get started</p>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {teamMembers.map((member) => (
                      <div
                        key={member._id}
                        className="bg-linear-to-br from-white to-gray-50 border border-gray-200 rounded-xl p-6 hover:shadow-lg transition-all duration-300"
                      >
                        <div className="flex items-center justify-between mb-4">
                          <div className="w-12 h-12 bg-linear-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-white font-bold text-lg">
                            {member.name?.charAt(0) || "U"}
                          </div>
                          <div className="flex items-center gap-1 text-sm bg-green-100 text-green-700 px-3 py-1 rounded-full">
                            <MdCheckCircle />
                            Active
                          </div>
                        </div>
                        <h3 className="font-semibold text-gray-800 text-lg mb-1">
                          {member.name}
                        </h3>
                        <p className="text-gray-600 text-sm mb-3">
                          {member.inviteeEmail}
                        </p>
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2 text-sm text-gray-600">
                            {getRoleIcon(member.role)}
                            <span className="capitalize">{member.role}</span>
                          </div>
                          <span className="text-xs text-gray-500">Joined</span>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

            {/* ✅ Invitations Tab */}
            {activeTab === "invites" && (
              <div>
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-xl  font-semibold text-gray-800 dark:text-white">
                    Invitation Management
                  </h2>
                  <button
                    onClick={refreshData}
                    className="flex items-center gap-2 px-4 py-2 bg-linear-to-r from-blue-500 to-purple-500 text-white rounded-lg hover:from-blue-600 hover:to-purple-600 transition-all shadow-md"
                  >
                    <FaSync />
                    Refresh
                  </button>
                </div>

                {invites.length === 0 ? (
                  <div className="text-center py-12">
                    <FaEnvelope className="text-6xl text-gray-300 mx-auto mb-4" />
                    <p className="text-gray-500 text-lg mb-2">No invitations found</p>
                    <p className="text-gray-400">
                      Send invitations to grow your team
                    </p>
                  </div>
                ) : (
                  <div className="overflow-hidden rounded-lg border border-gray-200">
                    <table className="w-full">
                      <thead className="bg-linear-to-r from-blue-500 to-purple-500 text-white">
                        <tr>
                          <th className="p-4 text-left font-semibold">Inviter Email</th>
                          <th className="p-4 text-left font-semibold">Role</th>
                          <th className="p-4 text-left font-semibold">Status</th>
                          <th className="p-4 text-left font-semibold">Actions</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-200">
                        {invites.map((inv) => (
                          <tr key={inv._id} className="hover:bg-gray-50 transition-colors">
                            <td className="p-4">
                              <div className="flex items-center gap-3">
                                <div className="w-8 h-8 bg-linear-to-r from-blue-400 to-purple-400 rounded-full flex items-center justify-center text-white text-sm">
                                  {inv.inviteeEmail?.charAt(0) || "U"}
                                </div>
                                <span className="font-medium text-gray-800">
                                  {inv.inviterEmail}
                                </span>
                              </div>
                            </td>
                            <td className="p-4">
                              <div className="flex items-center gap-2">
                                {getRoleIcon(inv.role)}
                                <span className="capitalize text-gray-700">
                                  {inv.role}
                                </span>
                              </div>
                            </td>
                            <td className="p-4">
                              <div
                                className={`flex items-center gap-2 px-3 py-1 rounded-full text-sm font-medium w-fit ${inv.status === "pending"
                                  ? "bg-yellow-100 text-yellow-700"
                                  : inv.status === "done"
                                    ? "bg-green-100 text-green-700"
                                    : "bg-red-100 text-red-700"
                                  }`}
                              >
                                {getStatusIcon(inv.status)}
                                <span className="capitalize">{inv.status}</span>
                              </div>
                            </td>
                            <td className="p-4">
                              <button
                                onClick={() => handleUpdateStatus(inv)}
                                className="flex items-center gap-2 px-4 py-2 bg-linear-to-r from-blue-500 to-purple-500 text-white rounded-lg hover:from-blue-600 hover:to-purple-600 transition-all shadow-md text-sm"
                              >
                                <FaUserEdit />
                                Update Status
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
