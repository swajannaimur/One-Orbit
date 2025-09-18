import Link from 'next/link'
import React from 'react'

export default function Register() {
    return (
        <div className='h-screen flex flex-col justify-center items-center'>

            {/* whole register form card */}
            <div className="w-9/12 sm:w-7/12 md:max-w-md mx-auto rounded-lg p-6 bg-white">

                {/* title */}
                <h2 className='text-center text-xl sm:text-3xl font-semibold'>Register to One Orbit</h2>

                {/* register form start */}
                <form className="flex flex-col gap-4 mt-6">

                    {/* name label and input field */}
                    <div className="flex flex-col gap-1">
                        <label className="text-sm md:text-base font-medium text-gray-700">Name</label>
                        <input
                            type="text"
                            placeholder="Your full name"
                            className="w-full px-3 py-2 border border-gray-300 rounded-md placeholder-gray-400 text-gray-800 
                   focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        />
                    </div>
                    
                    {/* email label and input field */}
                    <div className="flex flex-col gap-1">
                        <label className="text-sm md:text-base font-medium text-gray-700">Email</label>
                        <input
                            type="email"
                            placeholder="Enter your email"
                            className="w-full px-3 py-2 border border-gray-300 rounded-md placeholder-gray-400 text-gray-800 
                   focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
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
                   focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        />
                    </div>

                    {/* redirecting to register page */}
                    <p className="text-sm font-medium">
                        Already have an account? <Link href="login" className="hover:underline hover:text-blue-500">Login</Link>

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









        </div>
    )
}
