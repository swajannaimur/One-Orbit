import Link from 'next/link'
import React from 'react'

export default function Login() {
    return (
        // parent div
        <div className='h-screen flex flex-col justify-center items-center'>

            {/* whole login form card */}
            <div className="w-9/12 sm:w-7/12 md:max-w-md mx-auto rounded-lg p-6 bg-white">

                {/* title */}
                <h2 className='text-center text-2xl font-semibold my-4'>Login to One Orbit</h2>

                <form className="flex flex-col gap-4">

                    {/* email label and input field */}
                    <div className="flex flex-col gap-1">
                        <label className="text-sm font-medium text-gray-700">Email</label>
                        <input
                            type="email"
                            placeholder="Enter your email"
                            className="w-full px-3 py-2 border border-gray-300 rounded-md placeholder-gray-400 text-gray-800 
                   focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        />
                    </div>

                    {/* password label and input field */}
                    <div className="flex flex-col gap-1">
                        <label className="text-sm font-medium text-gray-700">Password</label>
                        <input
                            type="password"
                            placeholder="Enter your password"
                            className="w-full px-3 py-2 border border-gray-300 rounded-md 
                   placeholder-gray-400 text-gray-800
                   focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        />
                    </div>

                    {/* redirecting to register page */}
                    <p className="text-sm font-medium">
                        Don't have an account? <Link href="register" className="hover:underline hover:text-blue-500">Register</Link>

                    </p>

                    {/* login button */}
                    <button
                        type="submit"
                        className="w-full py-2 bg-blue-600 text-white font-semibold tracking-wider rounded-md
                 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                        Login
                    </button>

                </form>
            </div>









        </div>
    )
}
