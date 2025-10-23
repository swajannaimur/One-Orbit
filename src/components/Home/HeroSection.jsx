"use client";
import React from "react";
import Link from "next/link";
import {
  FiPlay,
  FiCheck,
  FiUsers,
  FiBarChart2,
  FiClock,
  FiShield,
  FiGlobe,
} from "react-icons/fi";
import {
  HiOutlineLightningBolt,
  HiOutlineTemplate,
  HiOutlineCalendar,
  HiOutlineChatAlt2,
} from "react-icons/hi";
import {
  RiRocketLine,
  RiTeamLine,
  RiSecurePaymentLine,
  RiStarSFill,
} from "react-icons/ri";

export default function HeroSection() {
  const features = [
    { icon: HiOutlineTemplate, text: "Drag & Drop Interface" },
    { icon: HiOutlineCalendar, text: "Smart Scheduling" },
    { icon: HiOutlineChatAlt2, text: "Real-time Collaboration" },
    { icon: FiBarChart2, text: "Advanced Analytics" },
  ];

  const stats = [
    { number: "98%", label: "Team Productivity Increase" },
    { number: "50%", label: "Faster Project Completion" },
    { number: "10K+", label: "Teams Trust OneOrbit" },
    { number: "4.9/5", label: "Customer Satisfaction" },
  ];

  const testimonials = [
    {
      name: "Sarah Chen",
      role: "Product Manager at TechCorp",
      text: "OneOrbit transformed how our remote teams collaborate.",
    },
    {
      name: "Marcus Johnson",
      role: "CTO at StartupXYZ",
      text: "Cut our meeting time by 60% while improving outcomes.",
    },
    {
      name: "Elena Rodriguez",
      role: "Design Lead at CreativeCo",
      text: "The intuitive interface made adoption seamless.",
    },
  ];

  return (
    <div className="relative">
      <div className="relative max-w-7xl mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-12 items-center py-8">
          {/* Left  */}
          <div className="space-y-8">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-full border border-gray-200 dark:border-gray-700 shadow-sm">
              <RiStarSFill className="w-4 h-4 text-amber-500" />
              <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                Trusted by 10,000+ teams worldwide
              </span>
              <FiGlobe className="w-4 h-4 text-blue-500" />
            </div>

            {/* Main Heading */}
            <div className="space-y-6">
              <h1 className="text-5xl lg:text-6xl font-bold tracking-tight">
                <span className="bg-gradient-to-r from-gray-900 via-blue-900 to-purple-900 dark:from-white dark:via-blue-100 dark:to-purple-100 bg-clip-text text-transparent">
                  Project
                </span>
                <br />
                <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  Management
                </span>
                <br />
                <span className="bg-gradient-to-r from-gray-900 via-blue-900 to-purple-900 dark:from-white dark:via-blue-100 dark:to-purple-100 bg-clip-text text-transparent">
                  Perfected
                </span>
              </h1>

              <p className="text-xl lg:text-2xl text-gray-600 dark:text-gray-400 leading-relaxed max-w-2xl">
                Streamline your workflow, enhance team collaboration, and
                deliver projects faster with our all-in-one platform designed
                for modern teams.
              </p>
            </div>

            {/* Features List */}
            <div className="grid sm:grid-cols-2 gap-4">
              {features.map((feature, index) => (
                <div key={index} className="flex items-center gap-3 group">
                  <div className="w-10 h-10 bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                    <feature.icon className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                  </div>
                  <span className="text-gray-700 dark:text-gray-300 font-medium">
                    {feature.text}
                  </span>
                </div>
              ))}
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <Link
                href="/get-started"
                className="group relative px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold rounded-2xl hover:shadow-2xl transition-all duration-500 hover:scale-105 overflow-hidden"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-blue-600 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                <span className="relative flex items-center justify-center gap-3">
                  <RiRocketLine className="w-5 h-5" />
                  Start Free
                </span>
              </Link>

              <button className="group px-8 py-4 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 font-semibold rounded-2xl hover:shadow-lg transition-all duration-300 hover:scale-105 flex items-center justify-center gap-3">
                <FiPlay className="w-5 h-5" />
                Watch Demo (2 mins)
              </button>
            </div>

            {/* Security Badge */}
            <div className="flex items-center gap-3 text-sm text-gray-500 dark:text-gray-400">
              <FiShield className="w-4 h-4 text-green-500" />
              <span>Enterprise-grade security • SOC 2 compliant</span>
            </div>
          </div>

          {/* Right Content - Dashboard Preview */}
          <div className="relative">
            {/* Main Dashboard Card */}
            <div className="relative bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/20 dark:border-gray-700/20 p-6 transform rotate-1 hover:rotate-0 transition-transform duration-500">
              {/* Dashboard Header */}
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                  <div className="w-3 h-3 bg-red-400 rounded-full"></div>
                  <div className="w-3 h-3 bg-yellow-400 rounded-full"></div>
                  <div className="w-3 h-3 bg-green-400 rounded-full"></div>
                  <span className="text-sm font-semibold text-gray-700 dark:text-gray-300 ml-2">
                    Active Projects
                  </span>
                </div>
                <div className="flex items-center gap-2 text-xs text-gray-500">
                  <FiClock className="w-3 h-3" />
                  Real-time
                </div>
              </div>

              {/* Project Cards Grid */}
              <div className="grid gap-4 mb-6">
                {[1, 2, 3].map((item) => (
                  <div
                    key={item}
                    className="bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 rounded-2xl p-4 border border-blue-100 dark:border-blue-800/30"
                  >
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-semibold text-gray-800 dark:text-gray-200">
                        Q1 Product Launch
                      </span>
                      <div className="flex items-center gap-1 text-xs text-green-600">
                        <FiCheck className="w-3 h-3" />
                        75%
                      </div>
                    </div>
                    <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                      <div className="bg-gradient-to-r from-green-400 to-blue-500 h-2 rounded-full w-3/4"></div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Team Activity */}
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-semibold text-gray-700 dark:text-gray-300">
                    Team Activity
                  </span>
                  <FiUsers className="w-4 h-4 text-gray-500" />
                </div>
                <div className="flex -space-x-2">
                  {[1, 2, 3, 4, 5].map((item) => (
                    <div
                      key={item}
                      className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full border-2 border-white dark:border-gray-800 flex items-center justify-center text-white text-xs font-bold"
                    >
                      {item}
                    </div>
                  ))}
                  <div className="w-8 h-8 bg-gray-100 dark:bg-gray-700 rounded-full border-2 border-white dark:border-gray-800 flex items-center justify-center text-gray-500 text-xs">
                    +8
                  </div>
                </div>
              </div>
            </div>

            {/* Floating Elements */}
            <div className="absolute -top-4 -right-4 bg-green-500 text-white px-4 py-2 rounded-2xl shadow-lg transform rotate-6">
              <div className="flex items-center gap-2 text-sm font-semibold">
                <HiOutlineLightningBolt className="w-4 h-4" />
                +45% Efficiency
              </div>
            </div>

            <div className="absolute -bottom-6 -left-6 bg-white dark:bg-gray-800 backdrop-blur-sm rounded-2xl shadow-lg p-4 border border-gray-200 dark:border-gray-700 transform -rotate-3">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-orange-500 rounded-xl flex items-center justify-center">
                  <FiCheck className="w-5 h-5 text-white" />
                </div>
                <div>
                  <div className="font-semibold text-gray-800 dark:text-gray-200">
                    128 tasks
                  </div>
                  <div className="text-sm text-gray-500">
                    completed by today
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Stats Section */}
        <div className="mt-10 grid grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, index) => (
            <div key={index} className="text-center">
              <div className="text-3xl lg:text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                {stat.number}
              </div>
              <div className="text-gray-600 dark:text-gray-400 mt-2">
                {stat.label}
              </div>
            </div>
          ))}
        </div>

        {/* Testimonials */}
        <div className="mt-8">
          <div className="grid md:grid-cols-3 gap-6">
            {testimonials.map((testimonial, index) => (
              <div
                key={index}
                className="bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm rounded-2xl p-6 border border-gray-200 dark:border-gray-700 hover:shadow-lg transition-all duration-300"
              >
                <div className="flex items-center gap-1 text-amber-400 mb-4">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <RiStarSFill key={star} className="w-4 h-4" />
                  ))}
                </div>
                <p className="text-gray-700 dark:text-gray-300 italic mb-4">
                  "{testimonial.text}"
                </p>
                <div>
                  <div className="font-semibold text-gray-900 dark:text-white">
                    {testimonial.name}
                  </div>
                  <div className="text-sm text-gray-500 dark:text-gray-400">
                    {testimonial.role}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
