"use client";
import React, { useState } from "react";
import Swal from "sweetalert2";
import Lottie from "lottie-react";
import { FiMail, FiCheck, FiUsers, FiTrendingUp } from "react-icons/fi";
import { HiOutlineSparkles, HiOutlineShieldCheck } from "react-icons/hi";

const NewsletterSection = () => {
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));

    Swal.fire({
      title: "🎉 Welcome to the Orbit!",
      html: `
        <div class="text-center">
          <div class="w-16 h-16 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg class="w-8 h-8 text-green-600 dark:text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
            </svg>
          </div>
          <p class="text-gray-700 dark:text-gray-300 mb-2">You're now part of 10,000+ project management professionals</p>
          <p class="text-sm text-gray-500 dark:text-gray-400">Check your inbox for a welcome gift 🎁</p>
        </div>
      `,
      icon: "success",
      confirmButtonColor: "#2563eb",
      confirmButtonText: "Awesome!",
      background: "#ffffff",
      customClass: {
        popup: 'rounded-2xl shadow-2xl border border-gray-100 dark:border-gray-700 dark:bg-gray-800',
        title: 'dark:text-white',
        htmlContainer: 'dark:text-gray-300'
      }
    });

    setEmail("");
    setIsLoading(false);
  };

  const benefits = [
    {
      icon: FiTrendingUp,
      text: "Weekly productivity tips"
    },
    {
      icon: HiOutlineSparkles,
      text: "Exclusive feature previews"
    },
    {
      icon: FiUsers,
      text: "Community insights"
    }
  ];

  return (
    <section className="relative py-20 px-4 overflow-hidden bg-linear-to-br from-gray-50   to-blue-50 dark:from-gray-900 dark:via-gray-800 dark:to-blue-900/10">
      
      {/* Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-10 left-10 w-72 h-72 bg-blue-100 dark:bg-blue-900/20 rounded-full blur-3xl opacity-20 animate-pulse"></div>
        <div className="absolute bottom-10 right-10 w-96 h-96 bg-purple-100 dark:bg-purple-900/20 rounded-full blur-3xl opacity-20 animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-indigo-100 dark:bg-indigo-900/20 rounded-full blur-3xl opacity-10"></div>
      </div>

      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          
          {/* Animation Side */}
          <div className="relative flex justify-center lg:justify-end">
            <div className="relative">
              <Lottie
                animationData={require("../../../public/newsletter.json")}
                loop={true}
                className="w-80 h-80 lg:w-96 lg:h-96 xl:w-[500px] xl:h-[500px]"
              />
              
              {/* Floating Stats */}
              <div className="absolute top-4 -left-4 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-2xl shadow-lg p-4 border border-gray-200 dark:border-gray-700 transform -rotate-3">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-green-500 rounded-xl flex items-center justify-center">
                    <FiUsers className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <div className="font-bold text-gray-900 dark:text-white">10K+</div>
                    <div className="text-xs text-gray-500 dark:text-gray-400">Subscribers</div>
                  </div>
                </div>
              </div>

              <div className="absolute bottom-8 -right-4 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-2xl shadow-lg p-4 border border-gray-200 dark:border-gray-700 transform rotate-3">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-blue-500 rounded-xl flex items-center justify-center">
                    <HiOutlineSparkles className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <div className="font-bold text-gray-900 dark:text-white">Weekly</div>
                    <div className="text-xs text-gray-500 dark:text-gray-400">Insights</div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Content Side */}
          <div className="relative">
            <div className="max-w-lg mx-auto lg:mx-0 lg:max-w-md">
              
              {/* Badge */}
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-50 dark:bg-blue-900/30 rounded-full border border-blue-200 dark:border-blue-800 mb-6">
                <HiOutlineSparkles className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                <span className="text-sm font-medium text-blue-700 dark:text-blue-300">
                  Join our community
                </span>
              </div>

              {/* Heading */}
              <h2 className="text-4xl lg:text-5xl font-bold tracking-tight mb-6">
                <span className="bg-linear-to-r from-gray-900 to-blue-900 dark:from-white dark:to-blue-200 bg-clip-text text-transparent">
                  Stay in the
                </span>
                <br />
                <span className="bg-linear-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  Project Management Orbit
                </span>
              </h2>

              {/* Description */}
              <p className="text-xl text-gray-600 dark:text-gray-400 leading-relaxed mb-8">
                Get exclusive project management insights, team collaboration tips, and early access to new features that help you deliver projects faster.
              </p>

              {/* Benefits List */}
              <div className="space-y-3 mb-8">
                {benefits.map((benefit, index) => {
                  const Icon = benefit.icon;
                  return (
                    <div key={index} className="flex items-center gap-3 group">
                      <div className="w-8 h-8 bg-green-100 dark:bg-green-900/30 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform duration-300 border border-green-200 dark:border-green-800">
                        <Icon className="w-4 h-4 text-green-600 dark:text-green-400" />
                      </div>
                      <span className="text-gray-700 dark:text-gray-300 font-medium">{benefit.text}</span>
                    </div>
                  );
                })}
              </div>

              {/* Newsletter Form */}
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="relative">
                  <FiMail className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400 dark:text-gray-500" />
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your work email"
                    className="w-full pl-12 pr-4 py-4 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-2xl focus:outline-none focus:ring-4 focus:ring-blue-500/20 focus:border-blue-500 dark:focus:border-blue-400 transition-all duration-300 placeholder-gray-500 dark:placeholder-gray-400 shadow-sm hover:shadow-md text-gray-900 dark:text-white"
                  />
                </div>
                
                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full group relative px-8 py-4 bg-linear-to-r from-blue-600 to-purple-600 text-white font-semibold rounded-2xl hover:shadow-2xl transition-all duration-500 hover:scale-105 overflow-hidden disabled:opacity-50 disabled:cursor-not-allowed border border-blue-500 dark:border-blue-400"
                >
                  <div className="absolute inset-0 bg-linear-to-r from-purple-600 to-blue-600 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  <span className="relative flex items-center justify-center gap-3">
                    {isLoading ? (
                      <>
                        <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                        Subscribing...
                      </>
                    ) : (
                      <>
                        <FiCheck className="w-5 h-5" />
                        Join 10,000+ Professionals
                      </>
                    )}
                  </span>
                </button>
              </form>

              {/* Trust & Privacy */}
              <div className="flex items-center justify-center gap-4 mt-6 text-sm text-gray-500 dark:text-gray-400">
                <div className="flex items-center gap-2">
                  <HiOutlineShieldCheck className="w-4 h-4 text-green-500 dark:text-green-400" />
                  <span>No spam, unsubscribe anytime</span>
                </div>
              </div>

              {/* Social Proof */}
              <div className="mt-8 p-6 bg-gray-50 dark:bg-gray-800/50 rounded-2xl border border-gray-200 dark:border-gray-700 backdrop-blur-sm">
                <div className="flex items-center gap-4">
                  <div className="flex -space-x-2">
                    {[1, 2, 3, 4, 5].map((item) => (
                      <div 
                        key={item}
                        className="w-8 h-8 bg-linear-to-br from-blue-500 to-purple-600 rounded-full border-2 border-white dark:border-gray-800 flex items-center justify-center text-white text-xs font-bold"
                      >
                        {item}
                      </div>
                    ))}
                  </div>
                  <div className="flex-1">
                    <div className="text-sm font-semibold text-gray-900 dark:text-white">
                      Join professionals from
                    </div>
                    <div className="text-xs text-gray-500 dark:text-gray-400">
                      Google, Microsoft, Spotify, and 2,000+ companies
                    </div>
                  </div>
                </div>
              </div>

              {/* Additional Trust Elements */}
              <div className="mt-6 grid grid-cols-3 gap-4 text-center">
                <div className="text-xs text-gray-500 dark:text-gray-400">
                  <div className="font-semibold text-gray-900 dark:text-white">256-bit</div>
                  <div>Encryption</div>
                </div>
                <div className="text-xs text-gray-500 dark:text-gray-400">
                  <div className="font-semibold text-gray-900 dark:text-white">GDPR</div>
                  <div>Compliant</div>
                </div>
                <div className="text-xs text-gray-500 dark:text-gray-400">
                  <div className="font-semibold text-gray-900 dark:text-white">SOC 2</div>
                  <div>Certified</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Decorative Elements */}
      <div className="absolute bottom-0 left-0 w-full overflow-hidden">
        <svg 
          className="relative block w-full h-8 text-gray-50 dark:text-gray-900" 
          data-name="Layer 1" 
          xmlns="http://www.w3.org/2000/svg" 
          viewBox="0 0 1200 120" 
          preserveAspectRatio="none"
        >
          <path 
            d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z" 
            className="fill-current"
          ></path>
        </svg>
      </div>
    </section>
  );
};

export default NewsletterSection;