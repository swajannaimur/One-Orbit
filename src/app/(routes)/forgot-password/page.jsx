"use client"

import React, { useState } from 'react'
import toast from 'react-hot-toast';

export default function ForgotPasswordPage() {

    const [email, setEmail] = useState("");
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState("");

    // resend_api_key_yasin= re_cVS3JUEH_EzoWYqXo58YxUTeZEnnZCnEV

    const handleSubmit = async(e)=>{
        e.preventDefault();

        setLoading(true);
        setMessage("");

        const res = await fetch("/api/auth/forgot-password", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            }, 
            body: JSON.stringify({ email }),
        });

        const data = await res.json();
        setLoading(false);


        if(res.ok) {
            setMessage("Password Reset link sent to your email");
            toast.success("Password reset link sent to your email");
        }

        else{
            setMessage(`${data.error}`);
            toast.error(`${data.error}`);
        }
    }

    return (
        <div className="min-h-screen flex flex-col justify-center items-center max-w-md mx-auto p-4">
            <h1 className="text-xl font-bold mb-4">Forgot Password</h1>
            <form onSubmit={handleSubmit}>
                <input
                    type="email"
                    placeholder="Enter your email"
                    className="w-full p-2 border mb-2 rounded"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />
                <button
                    disabled={loading}
                    className="w-full bg-blue-600 text-white py-2 rounded cursor-pointer"
                >
                    {loading ? "Sending..." : "Send Reset Link"}
                </button>
            </form>
            {message && <p className="mt-2">{message}</p>}
        </div>
    )
}



