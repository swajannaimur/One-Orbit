// "use client";
// import React from "react";
// import Link from "next/link";
// import { useSession } from "next-auth/react";

// export default function DevelopersSettings() {
//   const { data: session } = useSession();

//   return (
//     <div>
//       <h2 className="text-2xl font-semibold mb-4">Settings</h2>

//       <div className="bg-white shadow rounded-md p-6 max-w-2xl">
//         <p className="text-sm text-gray-600">
//           Manage your account settings and preferences.
//         </p>

//         <div className="mt-6 space-y-4">
//           <div>
//             <h4 className="font-medium">Account</h4>
//             <p className="text-sm text-gray-500">{session?.user?.email}</p>
//           </div>

//           <div>
//             <h4 className="font-medium">Preferences</h4>
//             <p className="text-sm text-gray-500">Theme, notifications, etc.</p>
//           </div>

//           <div className="pt-2">
//             <Link
//               href="/developerDashboard/profile"
//               className="inline-block px-4 py-2 bg-blue-600 text-white rounded-md"
//             >
//               View Profile
//             </Link>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

"use client";
import React, { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { FaUser, FaEnvelope, FaSave, FaEdit } from "react-icons/fa";
import Swal from "sweetalert2";
import InviteForm from "@/app/api/users/invite/InviteForm";

export default function DeveloperSettingsPage() {
  const { data: session } = useSession();
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: session?.user?.name || "",
    email: session?.user?.email || "",
    theme: "light",
    notifications: true,
  });
  const [avatarPreview, setAvatarPreview] = useState(
    session?.user?.image || ""
  );
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    let mounted = true;
    async function load() {
      setLoading(true);
      try {
        const res = await fetch("/api/users/me");
        if (!res.ok) return;
        const data = await res.json();
        const user = data.user || {};
        if (!mounted) return;
        setFormData((f) => ({
          ...f,
          image: user.image ?? f.image,
          name: user.name ?? f.name,
          email: user.email ?? f.email,
          theme: user?.preferences?.theme ?? f.theme,
          notifications: user?.preferences?.notifications ?? f.notifications,
        }));
      } catch (err) {
        console.error("Failed to load user settings", err);
      } finally {
        setLoading(false);
      }
    }
    load();
    return () => {
      mounted = false;
    };
  }, []);

  // Handle input changes
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  // handle avatar URL change
  const handleImageChange = (e) => {
    const url = e.target.value;
    setFormData((f) => ({ ...f, image: url }));
    setAvatarPreview(url);
  };

  // handle file upload (simple client-side to data URL) - optional
  const handleFileUpload = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      setAvatarPreview(reader.result);
      setFormData((f) => ({ ...f, image: reader.result }));
    };
    reader.readAsDataURL(file);
  };

  // Handle update submission
  const handleUpdate = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await fetch("/api/users/update", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data?.error || "Update failed");

      Swal.fire({
        icon: "success",
        title: "Profile Updated",
        text: "Your settings have been successfully updated!",
        timer: 1500,
        showConfirmButton: false,
      });
      setIsEditing(false);
    } catch (error) {
      console.error("Update error:", error);
      Swal.fire({
        icon: "error",
        title: "Update Failed",
        text: error?.message || "Something went wrong. Please try again later.",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto bg-white shadow-md rounded-lg p-8 mt-20 mb-16">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-4">
          <img
            src={
              avatarPreview ||
              session?.user?.image ||
              "https://i.pravatar.cc/80"
            }
            alt={session?.user?.name || "Avatar"}
            className="w-16 h-16 rounded-full object-cover"
          />
          <div>
            <h2 className="text-2xl font-semibold text-gray-800">Settings</h2>
            <p className="text-sm text-gray-500">
              Manage your profile and preferences
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => setIsEditing(!isEditing)}
            className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition"
          >
            {isEditing ? (
              <>
                <FaSave /> Save
              </>
            ) : (
              <>
                <FaEdit /> Edit
              </>
            )}
          </button>

          <button
            onClick={async () => {
              setLoading(true);
              const res = await fetch("/api/users/me");
              if (res.ok) {
                const data = await res.json();
                const user = data.user || {};
                setFormData((f) => ({
                  ...f,
                  name: user.name ?? f.name,
                  email: user.email ?? f.email,
                  theme: user?.preferences?.theme ?? f.theme,
                  notifications:
                    user?.preferences?.notifications ?? f.notifications,
                }));
              }
              setLoading(false);
            }}
            className="px-4 py-2 border rounded-md"
          >
            Reload
          </button>
        </div>
      </div>

      <form
        onSubmit={handleUpdate}
        className="space-y-5 grid grid-cols-1 md:grid-cols-3 gap-6"
      >
        {/* Name */}
        <div className="md:col-span-2">
          <label className="block text-sm font-medium text-gray-600 mb-1">
            <FaUser className="inline mr-1 text-gray-500" /> Name
          </label>
          {isEditing ? (
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="w-full border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          ) : (
            <p className="text-gray-700">{formData.name || "Not set"}</p>
          )}
        </div>

        {/* Avatar URL + Upload */}
        <div className="md:col-span-1">
          <label className="block text-sm font-medium text-gray-600 mb-1">
            Avatar URL
          </label>
          {isEditing ? (
            <input
              type="text"
              name="image"
              value={formData.image || ""}
              onChange={handleImageChange}
              className="w-full border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 mb-2"
            />
          ) : (
            <p className="text-gray-700">
              {formData.image ? "Custom avatar set" : "Using provider avatar"}
            </p>
          )}

          {isEditing && (
            <>
              <label className="block text-sm text-gray-500 mb-1">
                Or upload
              </label>
              <input type="file" accept="image/*" onChange={handleFileUpload} />
            </>
          )}
        </div>

        {/* Email */}
        <div className="md:col-span-1">
          <label className="block text-sm font-medium text-gray-600 mb-1">
            <FaEnvelope className="inline mr-1 text-gray-500" /> Email
          </label>
          <p className="text-gray-700">{formData.email}</p>
        </div>

        {/* Theme */}
        <div className="md:col-span-2">
          <label className="block text-sm font-medium text-gray-600 mb-1">
            Theme Preference
          </label>
          {isEditing ? (
            <select
              name="theme"
              value={formData.theme}
              onChange={handleChange}
              className="w-full border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="light">Light</option>
              <option value="dark">Dark</option>
              <option value="system">System Default</option>
            </select>
          ) : (
            <p className="text-gray-700 capitalize">{formData.theme}</p>
          )}
        </div>

        {/* Notifications */}
        <div className="md:col-span-1">
          <label className="block text-sm font-medium text-gray-600 mb-1">
            Notifications
          </label>
          {isEditing ? (
            <label className="flex items-center gap-2">
              <input
                type="checkbox"
                name="notifications"
                checked={formData.notifications}
                onChange={handleChange}
              />
              <span>Enable Notifications</span>
            </label>
          ) : (
            <p className="text-gray-700">
              {formData.notifications ? "Enabled" : "Disabled"}
            </p>
          )}
        </div>

        {isEditing && (
          <div className="md:col-span-3">
            <button
              type="submit"
              disabled={loading}
              className="w-full mt-4 bg-green-600 text-white py-2 rounded-md hover:bg-green-700 transition disabled:opacity-60"
            >
              {loading ? "Saving..." : "Update Settings"}
            </button>
          </div>
        )}
      </form>

      <div className="mt-8">
        <InviteForm />
      </div>
    </div>
  );
}
