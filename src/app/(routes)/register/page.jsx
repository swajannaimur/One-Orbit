import RegisterForm from "@/components/forms/RegisterForm";
import Social from "@/components/Social";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import React from "react";
import { 
  FiArrowLeft, 
  FiShield, 
  FiUsers, 
  FiTrendingUp,
  FiStar,
  FiAward,
  FiCheck
} from 'react-icons/fi';
import { 
  
  HiOutlineLightningBolt,
  HiOutlineChartBar
} from 'react-icons/hi';

export default async function Register() {
    const session = await getServerSession();

    if (session) {
        redirect("/");
    }

    return (
        <div className="min-h-screen max-w-7xl bg-gray-50 dark:bg-gray-700 mx-auto mt-20">
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
                                    <span className="text-xl">O</span>
                                </div>
                                <div>
                                    <h1 className="text-2xl font-bold">OneOrbit</h1>
                                    <p className="text-green-100 text-sm">Project Management Platform</p>
                                </div>
                            </div>

                            <h2 className="text-4xl lg:text-5xl font-bold mb-6 leading-tight">
                                Start your
                                <span className="block text-transparent bg-clip-text bg-gradient-to-r from-amber-200 to-cyan-200">
                                    journey today
                                </span>
                            </h2>

                            <p className="text-green-100 text-lg leading-relaxed mb-8">
                                Join thousands of teams already using OneOrbit to streamline project management, enhance collaboration, and drive productivity.
                            </p>

                            {/* Benefits List */}
                            <div className="space-y-4 mb-8">
                                {[
                                    { icon: FiCheck, text: "14-day free trial, no credit card required" },
                                    { icon: HiOutlineLightningBolt, text: "Set up your workspace in minutes" },
                                    { icon: FiUsers, text: "Invite your team members instantly" },
                                    { icon: HiOutlineChartBar, text: "Access to all core features" }
                                ].map((benefit, index) => (
                                    <div key={index} className="flex items-center gap-3">
                                        <div className="w-8 h-8 bg-white/20 rounded-lg flex items-center justify-center">
                                            <benefit.icon className="w-4 h-4" />
                                        </div>
                                        <span className="text-green-100">{benefit.text}</span>
                                    </div>
                                ))}
                            </div>

                            {/* Success Stats */}
                            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
                                <div className="grid grid-cols-2 gap-4 text-center">
                                    <div>
                                        <div className="text-2xl font-bold">10K+</div>
                                        <div className="text-green-100 text-sm">Teams</div>
                                    </div>
                                    <div>
                                        <div className="text-2xl font-bold">98%</div>
                                        <div className="text-green-100 text-sm">Satisfaction</div>
                                    </div>
                                    <div>
                                        <div className="text-2xl font-bold">45%</div>
                                        <div className="text-green-100 text-sm">Faster Delivery</div>
                                    </div>
                                    <div>
                                        <div className="text-2xl font-bold">24/7</div>
                                        <div className="text-green-100 text-sm">Support</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Bottom Trust Indicators */}
                    <div className="relative z-10">
                        <div className="flex items-center gap-6 text-green-100 flex-wrap">
                            <div className="flex items-center gap-2">
                                <FiAward className="w-4 h-4 text-amber-300" />
                                <span className="text-sm">G2 High Performer 2024</span>
                            </div>
                            <div className="w-px h-4 bg-white/30"></div>
                            <div className="flex items-center gap-2">
                                <FiShield className="w-4 h-4 text-blue-300" />
                                <span className="text-sm">SOC 2 Certified</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Right Side - Register Form */}
                <div className="flex-1 flex flex-col justify-center items-center p-8">
                    <div className="w-full max-w-md">
                        
                        {/* Mobile Header */}
                        <div className="lg:hidden text-center mb-8">
                            <div className="flex items-center justify-center gap-3 mb-6">
                                <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-blue-600 rounded-2xl flex items-center justify-center">
                                    <span className="text-xl">O</span>
                                </div>
                                <div className="text-left">
                                    <h1 className="text-2xl font-bold text-gray-900 dark:text-white">OneOrbit</h1>
                                    <p className="text-gray-600 dark:text-gray-400 text-sm">Project Management Platform</p>
                                </div>
                            </div>
                            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
                                Create your account
                            </h2>
                            <p className="text-gray-600 dark:text-gray-400">
                                Join thousands of productive teams
                            </p>
                        </div>

                        {/* Register Form Container */}
                        <div className="bg-white dark:bg-gray-800 rounded-3xl shadow-2xl border border-gray-200 dark:border-gray-700 p-8">
                            {/* Form Header */}
                            <div className="text-center mb-8">
                                <div className="inline-flex items-center gap-2 px-4 py-2 bg-green-50 dark:bg-green-900/30 rounded-full border border-green-200 dark:border-green-800 mb-4">
                                    <FiStar className="w-4 h-4 text-green-600 dark:text-green-400" />
                                    <span className="text-sm font-medium text-green-700 dark:text-green-300">
                                        Start your free trial
                                    </span>
                                </div>
                                <h3 className="text-2xl font-bold text-gray-900 dark:text-white">
                                    Create your account
                                </h3>
                                <p className="text-gray-600 dark:text-gray-400 mt-2">
                                    Get started with your 14-day free trial
                                </p>
                            </div>

                            {/* Register Form */}
                            <RegisterForm />

                            {/* Divider */}
                            <div className="flex items-center my-8">
                                <div className="flex-grow h-px bg-gray-200 dark:bg-gray-700" />
                                <span className="mx-4 text-sm text-gray-500 dark:text-gray-400 font-medium whitespace-nowrap">
                                    Or sign up with
                                </span>
                                <div className="flex-grow h-px bg-gray-200 dark:bg-gray-700" />
                            </div>

                            {/* Social Register */}
                            <Social />

                            {/* Login Link */}
                            <div className="text-center mt-8 pt-6 border-t border-gray-200 dark:border-gray-700">
                                <p className="text-gray-600 dark:text-gray-400">
                                    Already have an account?{" "}
                                    <a 
                                        href="/login" 
                                        className="text-green-600 dark:text-green-400 font-semibold hover:text-green-700 dark:hover:text-green-300 transition-colors duration-200"
                                    >
                                        Sign in here
                                    </a>
                                </p>
                            </div>
                        </div>

                        {/* Trial Information */}
                        <div className="mt-6 text-center">
                            <div className="flex items-center justify-center gap-2 text-sm text-gray-500 dark:text-gray-400">
                                <FiCheck className="w-4 h-4 text-green-500" />
                                <span>Full access during 14-day trial • No credit card required</span>
                            </div>
                        </div>

                        {/* Security & Privacy */}
                        <div className="mt-4 text-center">
                            <div className="flex items-center justify-center gap-2 text-xs text-gray-400 dark:text-gray-500">
                                <FiShield className="w-3 h-3" />
                                <span>Your data is secure and protected. We never share your information.</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}