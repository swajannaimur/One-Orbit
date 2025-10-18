"use client";

import LoadingSpinner from "@/components/common/LoadingSpinner";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";

const ResetPassword = ({ params }) => {
    // unwrap params
    const { token } = React.use(params);

    const router = useRouter();
    const [error, setError] = useState("");
    const [verified, setVerified] = useState(false);
    const [user, setUser] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

    const { data: session, status: sessionStatus } = useSession();

    // verifying the token
    useEffect(() => {
        if (!token) return;

        const verifyToken = async () => {
            try {
                const res = await fetch("/api/verify-token", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ token }),
                });

                if (res.status === 400) {
                    setError("Invalid token or has expired.");
                    setVerified(false);
                } else if (res.status === 200) {
                    const userData = await res.json();
                    setUser(userData);
                    setError("");
                    setVerified(true);
                }
            } catch (error) {
                console.error(error);
                setError("Something went wrong. Please try again.");
                setVerified(false);
            }
        };

        verifyToken();
    }, [token]);

    // redirect authenticated users
    useEffect(() => {
        if (sessionStatus === "authenticated") {
            router.replace("/dashboard");
        }
    }, [sessionStatus, router]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const form = e.target;
        const password = form.password.value;

        setIsLoading(true);
        try {
            const res = await fetch("/api/reset-password", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    password,
                    email: user?.email,
                }),
            });

            if (res.status === 400) {
                setError("Something went wrong.");
            } else if (res.status === 200) {
                setError("");
                toast.success("Password Updated. Now Login.")
                router.push("/login");
            }
        } catch (error) {
            console.error(error);
            toast.error("Error, try again")
            setError("Error, try again.");
        } finally {
            setIsLoading(false);
        }
    };

    if (sessionStatus === "loading" || (!verified && !error)) {
        return <LoadingSpinner />;
    }

    return (
        sessionStatus !== "authenticated" && (
            <div className="w-9/12 sm:w-7/12 md:max-w-md mx-auto rounded-lg p-6 flex flex-col min-h-screen justify-center">
                <div className="shadow-lg p-6">
                    <h2 className="text-center text-xl sm:text-3xl font-semibold">
                        Reset your password
                    </h2>

                    <form onSubmit={handleSubmit} className="flex flex-col gap-4 mt-6">
                        <div className="flex flex-col gap-1">
                            <label className="text-sm md:text-base font-medium text-gray-700">
                                New Password
                            </label>
                            <input
                                type="password"
                                name="password"
                                placeholder="Type your new password"
                                required
                                className="w-full px-3 py-2 border border-gray-300 rounded-md placeholder-gray-700 text-gray-800 
                                    focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary"
                            />
                        </div>

                        <button
                            type="submit"
                            disabled={error.length > 0 || isLoading}
                            className="w-full py-2 cursor-pointer bg-primary text-white tracking-wider rounded-md
                                hover:bg-primary/90"
                        >
                            {isLoading ? (
                                <span className="loading loading-spinner loading-xl"></span>
                            ) : (
                                "Submit"
                            )}
                        </button>

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
