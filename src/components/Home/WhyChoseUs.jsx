'use client';
import React from 'react';
import { 
  FiUsers, 
  FiZap, 
  FiShield, 
  FiHeart,
  FiArrowRight,
  FiAward,
  FiTrendingUp,
  FiGlobe
} from "react-icons/fi";
import { 
  HiOutlineUserGroup,
  HiOutlineLightningBolt,
  HiOutlineLockClosed,
  HiOutlineSupport
} from "react-icons/hi";

export default function WhyChooseUs() {
  const features = [
    {
      title: "10,000+ Strong Community",
      desc: "Join thousands of project management professionals sharing best practices, templates, and success stories in our vibrant community.",
      icon: HiOutlineUserGroup,
      stats: "98% satisfaction",
      color: "from-blue-500 to-cyan-500",
      linear: "bg-linear-to-r from-blue-500 to-cyan-500"
    },
    {
      title: "Lightning Fast Performance",
      desc: "Experience blazing-fast load times and real-time collaboration with our optimized infrastructure and global CDN.",
      icon: HiOutlineLightningBolt,
      stats: "99.9% uptime",
      color: "from-amber-500 to-orange-500",
      linear: "bg-linear-to-r from-amber-500 to-orange-500"
    },
    {
      title: "Enterprise-Grade Security",
      desc: "Your data is protected with military-grade encryption, SOC 2 compliance, and advanced security features built for enterprises.",
      icon: HiOutlineLockClosed,
      stats: "SOC 2 Certified",
      color: "from-emerald-500 to-green-500",
      linear: "bg-linear-to-r from-emerald-500 to-green-500"
    },
    {
      title: "24/7 Expert Support",
      desc: "Get instant help from our dedicated support team with average response times under 2 minutes and 95% first-contact resolution.",
      icon: HiOutlineSupport,
      stats: "24/7 available",
      color: "from-purple-500 to-pink-500",
      linear: "bg-linear-to-r from-purple-500 to-pink-500"
    }
  ];

  const stats = [
    { number: "10K+", label: "Active Teams", icon: FiUsers },
    { number: "98%", label: "Customer Satisfaction", icon: FiHeart },
    { number: "45%", label: "Productivity Increase", icon: FiTrendingUp },
    { number: "150+", label: "Countries Served", icon: FiGlobe }
  ];

  return (
    <section className="relative py-20 bg-linear-to-br from-gray-50 via-white to-blue-50 dark:from-gray-900 dark:via-gray-800 dark:to-blue-900/20 overflow-hidden">
      
      {/* Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-0 w-72 h-72 bg-blue-100 dark:bg-blue-900/20 rounded-full blur-3xl opacity-30 animate-pulse"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-purple-100 dark:bg-purple-900/20 rounded-full blur-3xl opacity-30 animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-cyan-100 dark:bg-cyan-900/20 rounded-full blur-3xl opacity-20"></div>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header Section */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-50 dark:bg-blue-900/30 rounded-full border border-blue-200 dark:border-blue-800 mb-6">
            <FiAward className="w-4 h-4 text-blue-600 dark:text-blue-400" />
            <span className="text-sm font-medium text-blue-700 dark:text-blue-300">
              Trusted by Industry Leaders
            </span>
          </div>
          
          <h2 className="text-4xl lg:text-5xl xl:text-6xl font-bold tracking-tight mb-6">
            <span className="bg-linear-to-r from-gray-900 to-blue-900 dark:from-white dark:to-blue-200 bg-clip-text text-transparent">
              Why Teams Choose
            </span>
            <br />
            <span className="bg-linear-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              OneOrbit
            </span>
          </h2>
          
          <p className="text-xl lg:text-2xl text-gray-600 dark:text-gray-400 max-w-4xl mx-auto leading-relaxed">
            Join thousands of high-performing teams that trust OneOrbit to streamline their workflow, 
            enhance collaboration, and deliver projects faster with enterprise-grade security.
          </p>
        </div>

        {/* Stats Section */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <div key={index} className="text-center group">
                <div className="w-16 h-16 bg-linear-to-r from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300 shadow-lg">
                  <Icon className="w-6 h-6 text-white" />
                </div>
                <div className="text-3xl lg:text-4xl font-bold bg-linear-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  {stat.number}
                </div>
                <div className="text-gray-600 dark:text-gray-400 mt-2 font-medium">
                  {stat.label}
                </div>
              </div>
            );
          })}
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <div 
                key={index}
                className="group relative bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-3xl shadow-lg hover:shadow-2xl border border-gray-200 dark:border-gray-700 transition-all duration-500 hover:scale-105 overflow-hidden"
              >
                {/* linear Border Effect */}
                <div className={`absolute inset-0 bg-linear-to-r ${feature.color} opacity-0 group-hover:opacity-5 transition-opacity duration-500`}></div>
                
                <div className="relative p-8 h-full flex flex-col">
                  
                  {/* Icon */}
                  <div className={`w-16 h-16 ${feature.linear} rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300 shadow-lg`}>
                    <Icon className="w-8 h-8 text-white" />
                  </div>

                  {/* Content */}
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4 leading-tight">
                    {feature.title}
                  </h3>
                  
                  <p className="text-gray-600 dark:text-gray-400 leading-relaxed flex-1 mb-6">
                    {feature.desc}
                  </p>

                  {/* Stats Badge */}
                  <div className="flex items-center justify-between">
                    <span className="px-3 py-1 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 text-sm font-medium rounded-full">
                      {feature.stats}
                    </span>
                    <div className="w-8 h-8 bg-gray-100 dark:bg-gray-700 rounded-full flex items-center justify-center group-hover:bg-linear-to-r group-hover:from-blue-500 group-hover:to-purple-600 transition-all duration-300">
                      <FiArrowRight className="w-4 h-4 text-gray-600 dark:text-gray-400 group-hover:text-white transition-colors duration-300" />
                    </div>
                  </div>
                </div>

                {/* Hover Effect */}
                <div className="absolute bottom-0 left-0 w-full h-1 bg-linear-to-r from-transparent via-gray-300 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              </div>
            );
          })}
        </div>

        {/* CTA Section */}
        <div className="text-center">
          <div className="bg-linear-to-r from-blue-600 to-purple-600 rounded-3xl p-8 lg:p-12 text-white relative overflow-hidden">
            
            {/* Background Pattern */}
            <div className="absolute inset-0 opacity-10">
              <div className="absolute top-0 right-0 w-32 h-32 bg-white rounded-full -translate-y-16 translate-x-16"></div>
              <div className="absolute bottom-0 left-0 w-24 h-24 bg-white rounded-full translate-y-12 -translate-x-12"></div>
            </div>

            <div className="relative">
              <h3 className="text-2xl lg:text-3xl font-bold mb-4">
                Ready to Transform Your Team's Productivity?
              </h3>
              <p className="text-blue-100 text-lg mb-8 max-w-2xl mx-auto">
                Join 10,000+ teams already using OneOrbit to deliver projects faster and collaborate better.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button className="px-8 py-4 bg-white text-blue-600 font-semibold rounded-2xl hover:scale-105 transition-transform duration-300 shadow-lg">
                  Start Free Trial
                </button>
                <button className="px-8 py-4 bg-blue-500 text-white font-semibold rounded-2xl hover:scale-105 transition-transform duration-300 border border-blue-400">
                  Watch Demo Video
                </button>
              </div>
              
              {/* Trust Badge */}
              <div className="flex items-center justify-center gap-4 mt-8 text-blue-100 text-sm">
                <FiShield className="w-4 h-4" />
                <span>Enterprise-grade security • No credit card required</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}