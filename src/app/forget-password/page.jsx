"use client";

import Link from "next/link";
import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

const ForgetPassword = () => {
    const router = useRouter();
    const [error, setError] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    // const session = useSession();
    const { data: session, status: sessionStatus } = useSession();

    useEffect(() => {
        if (sessionStatus === "authenticated") {
            router.replace("/dashboard");
        }
    }, [sessionStatus, router]);

    const isValidEmail = (email) => {
        const emailRegx = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
        return emailRegx.test(email);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        // console.log(e.target[0].value)  // -- email

        const email = e.target[0].value;


        if (!isValidEmail(email)) {
            setError("Email is invalid");
            return;
        }

        // calling the register api
        try {
            const res = await fetch("/api/forget-password", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    email,
                }),
            });

            if (res.status === 400) {
                setError("User with this email is not registered.");
            }
            if (res.status === 200) {
                setError("");
                router.push("/login");
            }
        } catch (error) {
            setError("Error , try again");
            console.log(error);
        }



    };

    if (sessionStatus === "loading") {
        return <h1>Loading....</h1>
    }

    return (
        sessionStatus !== "authenticated" && (
            <div className="w-9/12 sm:w-7/12 md:max-w-md mx-auto rounded-lg p-6 bg-white flex flex-col min-h-screen justify-center">
                {/* title */}
                <div className="shadow-md p-6">

                    <h2 className="text-center text-xl sm:text-3xl font-semibold">
                        Forgot your password
                    </h2>

                    <form onSubmit={handleSubmit} className="flex flex-col gap-4 mt-6">
                        {/* email label and input field */}
                        <div className="flex flex-col gap-1">
                            <label className="text-sm md:text-base font-medium text-gray-700">
                                Email
                            </label>
                            <input
                                type="email"
                                name="email"
                                placeholder="Enter your email"
                                className="w-full px-3 py-2 border border-gray-300 rounded-md placeholder-gray-400 text-gray-800 
                            focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary"
                            />
                        </div>



                        {/* login redirect link */}
                        <div>
                            <p className="text-sm text-gray-700 tracking-wide font-semibold">

                                Remember your password? <Link href="/login" className="text-primary hover:underline">Login</Link>

                            </p>
                        </div>

                        {/* Submit button */}
                        <button
                            type="submit"
                            className="w-full py-2 cursor-pointer bg-primary text-white tracking-wider rounded-md
                        hover:bg-primary/90"
                        >
                            {isLoading ? (
                                <span className="loading loading-spinner loading-xl"></span>
                            ) : (
                                "Submit"
                            )}
                        </button>


                        <p className="text-red-500 text-base mb-4">{error && error}</p>
                    </form>
                </div>
            </div>
        )
    );
};

export default ForgetPassword;
