"use client";

import { useParams, useRouter } from 'next/navigation';
import React, { useState } from 'react'
import toast from 'react-hot-toast';

export default function ResetPasswordPage() {

    const { token } = useParams();
    const router = useRouter();
    const [newPassword, setNewPassword] = useState("");
    const [message, setMessage] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();

        const res = await fetch("/api/auth/reset-password", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ token, newPassword }),
        });


        const data = await res.json();
        if (res.ok) {
            setMessage("Password reset successfull. Redirecting...")
            toast.success("Password reset successfull. Redirecting...");
            setTimeout(() => router.push("/login"), 2000);
        }
        else {
            setMessage(`${data.error}`);
        }
    }

    return (
        <div className="max-w-md mx-auto p-4">
            <h1 className="text-xl font-bold mb-4">Reset Password</h1>
            <form onSubmit={handleSubmit}>
                <input
                    type="password"
                    placeholder="Enter new password"
                    className="w-full p-2 border mb-2 rounded"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    required
                />
                <button
                    className="w-full bg-green-600 text-white py-2 rounded"
                >
                    Reset Password
                </button>
            </form>
            {message && <p className="mt-2">{message}</p>}
        </div>
    )
}
