import LoginForm from "@/components/forms/LoginForm";
import Social from "@/components/Social";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import React from "react";
import { 
  FiArrowLeft, 
  FiShield, 
  FiUsers, 
  FiTrendingUp,
  FiStar
} from 'react-icons/fi';
import { 
 
  HiOutlineLightningBolt
} from 'react-icons/hi';


export default async function Login() {
    const session = await getServerSession();

    if (session) {
        redirect("/");
    }

    return (
        <div className="min-h-screen max-w-7xl mx-auto bg-gray-50 dark:bg-gray-700 mt-20">
            <div className="relative min-h-screen flex">
                
                {/* Left Side - Illustration/Content */}
                <div className="hidden lg:flex lg:flex-1 lg:flex-col lg:justify-between lg:p-12 bg-gradient-to-br from-blue-600 to-purple-600 text-white relative overflow-hidden">
                    {/* Background Pattern */}
                    <div className="absolute inset-0 opacity-10">
                        <div className="absolute top-0 left-0 w-72 h-72 bg-white rounded-full -translate-x-1/2 -translate-y-1/2"></div>
                        <div className="absolute bottom-0 right-0 w-96 h-96 bg-white rounded-full translate-x-1/2 translate-y-1/2"></div>
                    </div>

                    <div className="relative z-10">
                        {/* Back to Home */}
                        <a 
                            href="/"
                            className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-sm rounded-xl hover:bg-white/20 transition-all duration-300 border border-white/20"
                        >
                            <FiArrowLeft className="w-4 h-4" />
                            <span className="text-sm font-medium">Back to Home</span>
                        </a>

                        {/* Main Content */}
                        <div className="mt-20 max-w-md">
                            <div className="flex items-center gap-3 mb-6">
                                <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center">
                                   <span className="text-2xl flex items-center justify-center">O</span>
                                </div>
                                <div>
                                    <h1 className="text-2xl font-bold">OneOrbit</h1>
                                    <p className="text-blue-100 text-sm">Project Management Platform</p>
                                </div>
                            </div>

                            <h2 className="text-4xl lg:text-5xl font-bold mb-6 leading-tight">
                                Welcome back to your
                                <span className="block text-transparent bg-clip-text bg-gradient-to-r from-amber-200 to-cyan-200">
                                    workspace
                                </span>
                            </h2>

                            <p className="text-blue-100 text-lg leading-relaxed mb-8">
                                Sign in to continue managing your projects, collaborating with your team, and tracking progress in one unified platform.
                            </p>

                            {/* Features List */}
                            <div className="space-y-4">
                                {[
                                    { icon: FiUsers, text: "Collaborate with your team in real-time" },
                                    { icon: HiOutlineLightningBolt, text: "Access powerful project management tools" },
                                    { icon: FiShield, text: "Enterprise-grade security & privacy" },
                                    { icon: FiTrendingUp, text: "Track progress with advanced analytics" }
                                ].map((feature, index) => (
                                    <div key={index} className="flex items-center gap-3">
                                        <div className="w-8 h-8 bg-white/20 rounded-lg flex items-center justify-center">
                                            <feature.icon className="w-4 h-4" />
                                        </div>
                                        <span className="text-blue-100">{feature.text}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Bottom Stats */}
                    <div className="relative z-10">
                        <div className="flex items-center gap-6 text-blue-100">
                            <div className="flex items-center gap-2">
                                <FiStar className="w-4 h-4 text-amber-300" />
                                <span className="text-sm">Rated 4.9/5 by 10,000+ teams</span>
                            </div>
                            <div className="w-px h-4 bg-white/30"></div>
                            <div className="text-sm">Trusted by industry leaders</div>
                        </div>
                    </div>
                </div>

                {/* Right Side - Login Form */}
                <div className="flex-1 flex flex-col justify-center items-center p-8">
                    <div className="w-full max-w-md">
                        
                        {/* Mobile Header */}
                        <div className="lg:hidden text-center mb-8">
                            <div className="flex items-center justify-center gap-3 mb-6">
                                <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center">
                                    <span className="text-2xl font-bold text-white">O</span>
                                </div>
                                <div className="text-left">
                                    <h1 className="text-2xl font-bold text-gray-900 dark:text-white">OneOrbit</h1>
                                    <p className="text-gray-600 dark:text-gray-400 text-sm">Project Management Platform</p>
                                </div>
                            </div>
                            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
                                Welcome back
                            </h2>
                            <p className="text-gray-600 dark:text-gray-400">
                                Sign in to your account to continue
                            </p>
                        </div>

                        {/* Login Form Container */}
                        <div className="bg-white dark:bg-gray-800 rounded-3xl shadow-2xl border border-gray-200 dark:border-gray-700 p-8">
                            {/* Form Header */}
                            <div className="text-center mb-8">
                                <h3 className="text-2xl font-bold text-gray-900 dark:text-white">
                                    Sign in to your account
                                </h3>
                                <p className="text-gray-600 dark:text-gray-400 mt-2">
                                    Enter your credentials to access your workspace
                                </p>
                            </div>

                            {/* Login Form */}
                            <LoginForm />

                            {/* Divider */}
                            <div className="flex items-center my-8">
                                <div className="flex-grow h-px bg-gray-200 dark:bg-gray-700" />
                                <span className="mx-4 text-sm text-gray-500 dark:text-gray-400 font-medium whitespace-nowrap">
                                    Or continue with
                                </span>
                                <div className="flex-grow h-px bg-gray-200 dark:bg-gray-700" />
                            </div>

                            {/* Social Login */}
                            <Social />

                            {/* Sign Up Link */}
                            <div className="text-center mt-8 pt-6 border-t border-gray-200 dark:border-gray-700">
                                <p className="text-gray-600 dark:text-gray-400">
                                    Don't have an account?{" "}
                                    <a 
                                        href="/register" 
                                        className="text-blue-600 dark:text-blue-400 font-semibold hover:text-blue-700 dark:hover:text-blue-300 transition-colors duration-200"
                                    >
                                        Sign up now
                                    </a>
                                </p>
                            </div>
                        </div>

                        {/* Security Notice */}
                        <div className="mt-6 text-center">
                            <div className="flex items-center justify-center gap-2 text-sm text-gray-500 dark:text-gray-400">
                                <FiShield className="w-4 h-4" />
                                <span>Your data is securely encrypted and protected</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}