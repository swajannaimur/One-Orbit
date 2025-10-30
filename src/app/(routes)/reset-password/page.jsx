"use client";

import { useState } from "react";
import { useSearchParams } from "next/navigation";
import toast, { Toaster } from "react-hot-toast";
import Link from "next/link";

export default function ResetPassword() {
    const searchParams = useSearchParams();
    const token = searchParams.get("token");

    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!password.trim()) {
            toast.error("Please enter a new password");
            return;
        }

        setLoading(true);

        try {
            const res = await fetch("/api/reset-password", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ token, password }),
            });

            const data = await res.json();

            if (res.ok) {
                toast.success(data.message || "Password reset successful!");
                setPassword("");
            
            } else {
                toast.error(data.message || "Something went wrong!");
            }
        } catch (err) {
            console.error(err);
            toast.error("Failed to reset password. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-linear-to-br from-gray-50 to-gray-200 p-4">
            <Toaster position="top-center" reverseOrder={false} />

            <div className="bg-white shadow-lg rounded-2xl p-8 w-full max-w-md text-center border border-gray-100">
                <h2 className="text-3xl font-bold text-gray-800 mb-3">Reset Password</h2>
                <p className="text-gray-500 mb-6 text-sm">
                    Enter your new password below to regain access to your account.
                </p>

                <form onSubmit={handleSubmit} className="flex flex-col gap-3">
                    <input
                        type="password"
                        placeholder="Enter new password"
                        className="input input-bordered w-full border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 rounded-lg px-3 py-2"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />

                    <button
                        type="submit"
                        disabled={loading}
                        className={`btn w-full text-white font-semibold py-2 mt-2 rounded-lg transition-all duration-200 ${loading
                                ? "bg-gray-400 cursor-not-allowed"
                                : "bg-linear-to-r from-blue-600 to-blue-500 hover:from-blue-700 hover:to-blue-600 shadow-md hover:shadow-lg"
                            }`}
                    >
                        {loading ? "Resetting..." : "Reset Password"}
                    </button>
                </form>


                <div className="mt-4">
                    <Link href="/login" className="btn">Go to Login</Link>
                </div>

             
            </div>
        </div>
    );
}
