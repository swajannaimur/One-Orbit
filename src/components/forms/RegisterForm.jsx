"use client";
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useSession } from "next/navigation";




export default function RegisterForm() {

    const [error, setError] = useState("");
    const router = useRouter();

    const { data: session, status: sessionStatus } = useSession();

    useEffect(() => {
        if (sessionStatus === "authenticated") {
            router.replace("/pricing");
        }
    }, [sessionStatus, router]);

    const isValidEmail = (email) => {
        const emailRegx = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
        return emailRegx.test(email);
    };

    const handleSubmit = async (e)=>{
        e.preventDefault();

        const name = e.target[0].value;
        const email = e.target[1].value;
        const password = e.target[2].value;

        console.log(name, email, password);

        // email validation
        if(isValidEmail(email)) {
            setError("Email is Invalid");
            return;
        }

        // password validation
        if(!password || password.length < 8 ){
            setError("Password is Invalid");
            return;
        }


        // calling the api and sending form data
        try{
            const res = await fetch("/api/auth/register", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ name, email, password }),
            });

            // if server returns any error
            if(res.status === 400) {
                setError("This email is already registered");
                return;
            }

            // otherwise
            if(res.status === 200) {
                setError("");
                router.push("/solutions");
            }
        }
        catch(err){
            setError("Error, try again");
            console.error(err);
        }


    };

    if(sessionStatus === "loading") {
        return <h1>Loading....</h1>;
    }

    return sessionStatus !== "authenticated" ? (



        <div className="w-9/12 sm:w-7/12 md:max-w-md mx-auto rounded-lg p-6 bg-white">

            {/* title */}
            <h2 className='text-center text-xl sm:text-3xl font-semibold'>Register to One Orbit</h2>

            {/* register form start */}
            <form onSubmit={handleSubmit} className="flex flex-col gap-4 mt-6">

                {/* name label and input field */}
                <div className="flex flex-col gap-1">
                    <label className="text-sm md:text-base font-medium text-gray-700">Name</label>
                    <input
                        type="text"
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
                        placeholder="Enter your password"
                        className="w-full px-3 py-2 border border-gray-300 rounded-md 
                   placeholder-gray-400 text-gray-800
                   focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary"
                    />
                </div>

                {/* redirecting to Login page */}
                <p className="text-sm text-gray-700 tracking-wide font-semibold">
                    Already have an account? <Link href="login" className="text-primary hover:underline">Login</Link>

                </p>

                {/* register button */}
                <button
                    type="submit"
                    className="w-full py-2 cursor-pointer bg-primary text-white tracking-wider rounded-md
                 hover:bg-primary/90"
                >
                    Register
                </button>

            </form>
        </div>
    )
}
