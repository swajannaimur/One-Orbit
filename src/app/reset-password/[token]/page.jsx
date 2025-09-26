"use client";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

const ResetPassword = ({ params }) => {
    console.log(params.token);

    const router = useRouter();
    const [error, setError] = useState("");
    const [verified, setVerified] = useState(false);
    const [user, setUser] = useState(null);

    // const session = useSession();
    const { data: session, status: sessionStatus } = useSession();

    // api to validate the token
    useEffect(() => {
        const verifyToken = async () => {
            try {
                const res = await fetch("/api/verify-token", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        token: params.token,
                    }),
                });

                if (res.status === 400) {
                    setError("Invalid token or has expired (from useEffect)");
                    setVerified(true);
                }
                if (res.status === 200) {
                    setError("");
                    setVerified(true)
                    const userData = await res.json();
                    setUser(userData);
                }
            } catch (error) {
                setError("Error , try again");
                console.log(error);
            }
        };

        verifyToken();
    }, [params.token]);

    useEffect(() => {
        if (sessionStatus === "authenticated") {
            router.replace("/dashboard");
        }
    }, [sessionStatus, router]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        // console.log(e.target[0].value)  // -- email

        const password = e.target[0].value;

        // calling the register api
        try {
            const res = await fetch("/api/reset-password", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    password,
                    email: user?.email,
                }),
            });

            if (res.status === 400) {
                setError("Something went wrong.");
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

    if (sessionStatus === "loading" || !verified) {
        return <h1>Loading....</h1>;
    }

    return (
        sessionStatus !== "authenticated" && (
            <div className="w-9/12 sm:w-7/12 md:max-w-md mx-auto rounded-lg p-6 bg-white flex flex-col min-h-screen justify-center">
                {/* title */}
                <div className="shadow-md p-6">

                    <h2 className="text-center text-xl sm:text-3xl font-semibold">
                        Reset your password
                    </h2>

                    {/* reset password form */}
                    <form onSubmit={handleSubmit} className="flex flex-col gap-4 mt-6">
                        {/* email label and input field */}
                        <div className="flex flex-col gap-1">
                            <label className="text-sm md:text-base font-medium text-gray-700">
                                New Password
                            </label>
                            <input
                                type="password"
                                name="password"
                                placeholder="Type your new password"
                                required
                                className="w-full px-3 py-2 border border-gray-300 rounded-md placeholder-gray-400 text-gray-800 
                            focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary"
                            />
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


                        {/* error message showing here */}
                        <p className="text-red-500 text-base mb-4">
                            {error && error}
                        </p>

                    </form>
                </div>
            </div>
        )
    );
};

export default ResetPassword;
