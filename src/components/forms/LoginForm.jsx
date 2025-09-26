"use client";
import React from "react";
import { useSession, signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Link from "next/link";

export default function LoginForm() {
  const router = useRouter();
  const [error, setError] = useState("");

  const { data: session, status: sessionStatus } = useSession();

  useEffect(() => {
    if (sessionStatus === "authenticated") {
      router.replace("/pricing");
    }
  }, [sessionStatus, router]);

  // email validation function with regx
  const isValidEmail = (email) => {
    const emailRegx = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
    return emailRegx.test(email);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const email = e.target[0].value;
    const password = e.target[1].value;

    // email validation
    if (!isValidEmail(email)) {
      setError("Email is Invalid");
      return;
    }

    // password validation
    if (!password || password.length < 8) {
      setError("Password is Invalid");
      return;
    }

    // calling next auth "signIn" function
    const res = await signIn("credentials", {
      redirect: false,
      email,
      password,
    });

    // if any error happens
    if (res?.error) {
      setError("Invalid email or password");
    } else if (res?.ok) {
      setError("");
      router.replace("/projects");
    }
  };

  if (sessionStatus === "loading") {
    return <h1>Loading ....</h1>;
  }

  return (
    sessionStatus !== "authenticated" && (
      <div className="w-9/12 sm:w-7/12 md:max-w-md mx-auto rounded-lg p-6 bg-white">
        {/* title */}
        <h2 className="text-center text-xl sm:text-3xl font-semibold">
          Login to One Orbit
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

          {/* password label and input field */}
          <div className="flex flex-col gap-1">
            <label className="text-sm md:text-base font-medium text-gray-700">
              Password
            </label>
            <input
              type="password"
              name="password"
              placeholder="Enter your password"
              className="w-full px-3 py-2 border border-gray-300 rounded-md 
                   placeholder-gray-400 text-gray-800
                   focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary"
            />
          </div>

          {/* redirecting to register page */}
          <p className="text-sm text-gray-700 tracking-wide font-semibold">
            Don't have an account?{" "}
            <Link href="register" className="text-primary hover:underline">
              Register
            </Link>
          </p>

          {/* login button */}
          <button
            type="submit"
            className="w-full py-2 cursor-pointer bg-primary text-white tracking-wider rounded-md
                 hover:bg-primary/90"
          >
            Login
          </button>

          <p className="text-red-500 text-base mb-4">{error && error}</p>
        </form>
      </div>
    )
  );
}
