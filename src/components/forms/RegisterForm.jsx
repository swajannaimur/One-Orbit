"use client";
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { signIn } from "next-auth/react";
import Link from 'next/link';
import toast from 'react-hot-toast';


export default function RegisterForm() {

    const [error, setError] = useState("");
    const router = useRouter();


    // email validation function with regx
    const isValidEmail = (email) => {
        const emailRegx = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
        return emailRegx.test(email);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const name = e.target[0].value;
        const email = e.target[1].value;
        const password = e.target[2].value;
        const role = e.target[3].value;

        // validation checks
        if (!role) {
            setError("Please select a role");
            return;
        }

        if (!isValidEmail(email)) {
            setError("Email is Invalid");
            return;
        }

        if (!password || password.length < 8) {
            setError("Password must be at least 8 characters");
            return;
        }

        try {
            const res = await fetch("/api/register", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ name, email, password, role }), // include role
            });

            if (res.status === 400) {
                toast.error("This email already registered.");
                setError("This email is already registered");
                return;
            }

            if (res.status === 200) {
                setError("");
                const result = await signIn("credentials", { redirect: false, email, password });
                if (!result.error) {
                    toast.success("Welcome to OneOrbit");
                    router.push("/");
                } else {
                    toast.error("Login failed after registration");
                    setError("Login failed after Registration");
                }
            }
        } catch (err) {
            toast.error("Some Error Happened!");
            setError("Error, try again");
        }
    };

    // if (sessionStatus === "loading") {
    //     return <h1>Loading....</h1>;
    // }

    return (

        <div className=" mx-auto w-full rounded-lg p-6 bg-white">

            {/* title */}
            <h2 className='text-center text-xl sm:text-3xl font-semibold'>Register to One Orbit</h2>

            {/* register form start */}
            <form onSubmit={handleSubmit} className="flex flex-col gap-4 mt-6">

                {/* name label and input field */}
                <div className="flex flex-col gap-1">
                    <label className="text-sm md:text-base font-medium text-gray-700">Name</label>
                    <input
                        type="text"
                        name="name"
                        placeholder="Your full name"
                        className="w-full px-3 py-2 border border-gray-300 rounded-md placeholder-gray-400 text-gray-800 
                        focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary"
                    />
                </div>

                {/* email label and input field */}
                <div className="flex flex-col gap-1">
                    <label className="text-sm md:text-base font-medium text-gray-700">Email</label>
                    <input
                        type="email"
                        name="email"
                        placeholder="Enter your email"
                        className="w-full px-3 py-2 border border-gray-300 rounded-md placeholder-gray-400 text-gray-800 
                        focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary"
                    />
                </div>

                {/* password label and input field */}
                <div className="flex flex-col gap-1">
                    <label className="text-sm md:text-base font-medium text-gray-700">Password</label>
                    <input
                        type="password"
                        name="password"
                        placeholder="Enter your password"
                        className="w-full px-3 py-2 border border-gray-300 rounded-md placeholder-gray-400 text-gray-800 focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary"
                    />
                </div>

                {/* role selection */}
                <div className="flex flex-col gap-1">
                    <label className="text-sm md:text-base font-medium text-gray-700">
                        Register as
                    </label>
                    <select
                        name="role"
                        className="w-full px-3 py-2 border border-gray-300 rounded-md text-gray-800 
    focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary"
                        defaultValue=""
                    >
                        <option value="" disabled>
                            Select your role
                        </option>
                        <option value="client">Client</option>
                        <option value="developer">Developer</option>
                    </select>
                </div>


                {/* redirecting to Login page */}
                <p className="text-sm text-gray-700 tracking-wide font-semibold">
                    Already have an account? <Link href="/login" className="text-primary hover:underline">Login</Link>

                </p>

                {/* register button */}
                <button
                    type="submit"
                    className="w-full py-2 cursor-pointer bg-primary text-white tracking-wider rounded-md
                    hover:bg-primary/90"
                >
                    Register
                </button>

                <p className="text-red-500 text-base mb-4">
                    {error && error}
                </p>

            </form>
        </div>

    )
}