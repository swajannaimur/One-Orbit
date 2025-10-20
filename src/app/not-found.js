// components/ErrorPage.jsx
"use client";
import React from 'react';
import Link from 'next/link';
import { 
  FiHome, 
  FiRefreshCw, 
  FiAlertTriangle,
  FiArrowLeft,
  FiMail,
  FiMessageCircle
} from 'react-icons/fi';
import { 
  HiOutlineExclamation,
  HiOutlineServer,
  HiOutlineWifi
} from 'react-icons/hi';

const ErrorPage = ({ 
  statusCode = 500, 
  title = "Something went wrong", 
  message = "We apologize for the inconvenience. Please try again later.",
  showRetry = true 
}) => {
  const errorConfigs = {
    404: {
      icon: HiOutlineExclamation,
      title: "Page Not Found",
      message: "The page you're looking for doesn't exist or has been moved.",
      color: "from-blue-500 to-cyan-500",
      illustration: "🚀"
    },
    500: {
      icon: HiOutlineServer,
      title: "Server Error",
      message: "Our servers are experiencing some issues. Please try again in a moment.",
      color: "from-red-500 to-orange-500",
      illustration: "⚡"
    },
    403: {
      icon: FiAlertTriangle,
      title: "Access Denied",
      message: "You don't have permission to access this resource.",
      color: "from-amber-500 to-yellow-500",
      illustration: "🔒"
    },
    503: {
      icon: HiOutlineWifi,
      title: "Service Unavailable",
      message: "We're performing some maintenance. Please check back soon.",
      color: "from-purple-500 to-pink-500",
      illustration: "🔧"
    }
  };

  const config = errorConfigs[statusCode] || {
    icon: HiOutlineExclamation,
    title,
    message,
    color: "from-gray-500 to-gray-700",
    illustration: "❓"
  };

  const Icon = config.icon;

  const handleRetry = () => {
    window.location.reload();
  };

  return (
    <div className="min-h-screen mt-25 bg-gradient-to-br from-gray-50 via-blue-50 to-indigo-100 dark:from-gray-900 dark:via-blue-900/20 dark:to-indigo-900/20 flex items-center justify-center px-4 sm:px-6 lg:px-8">
      <div className="max-w-2xl w-full">
        
        {/* Background Elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-40 -right-40 w-80 h-80 bg-blue-200 dark:bg-blue-800/20 rounded-full blur-3xl opacity-30 animate-pulse"></div>
          <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-purple-200 dark:bg-purple-800/20 rounded-full blur-3xl opacity-30 animate-pulse delay-1000"></div>
        </div>

        <div className="relative">
          
          {/* Main Error Card */}
          <div className=" p-8 sm:p-12 text-center">
            
            {/* Error Illustration */}
            <div className="mb-8">
              <div className="relative inline-block">
                <div className={`w-24 h-24 bg-gradient-to-r ${config.color} rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg`}>
                  <span className="text-3xl">{config.illustration}</span>
                </div>
                <div className="absolute -inset-4 bg-gradient-to-r from-blue-500 to-purple-500 rounded-3xl blur-xl opacity-20 animate-pulse"></div>
              </div>
              
              {/* Status Code */}
              <div className="text-8xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 dark:from-white dark:to-gray-300 bg-clip-text text-transparent mb-4">
                {statusCode}
              </div>
            </div>

            {/* Error Content */}
            <div className="space-y-6">
              <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white">
                {config.title}
              </h1>
              
              <p className="text-xl text-gray-600 dark:text-gray-400 leading-relaxed max-w-md mx-auto">
                {config.message}
              </p>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 justify-center pt-6">
                <Link
                  href="/"
                  className="group relative px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold rounded-2xl hover:shadow-2xl transition-all duration-500 hover:scale-105 overflow-hidden flex items-center justify-center gap-3"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-blue-600 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  <FiHome className="w-5 h-5 relative z-10" />
                  <span className="relative z-10">Back to Home</span>
                </Link>

                {showRetry && (
                  <button
                    onClick={handleRetry}
                    className="group px-8 py-4 bg-white/80 dark:bg-gray-700/80 backdrop-blur-sm border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 font-semibold rounded-2xl hover:shadow-lg transition-all duration-300 hover:scale-105 flex items-center justify-center gap-3"
                  >
                    <FiRefreshCw className="w-5 h-5 group-hover:rotate-180 transition-transform duration-500" />
                    Try Again
                  </button>
                )}
              </div>

              {/* Secondary Actions */}
              <div className="flex flex-wrap justify-center gap-6 pt-8 border-t border-gray-200 dark:border-gray-700">
                <Link
                  href="/contact"
                  className="flex items-center gap-2 text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-300 group"
                >
                  <FiMail className="w-4 h-4 group-hover:scale-110 transition-transform" />
                  Contact Support
                </Link>
                <Link
                  href="/help"
                  className="flex items-center gap-2 text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-300 group"
                >
                  <FiMessageCircle className="w-4 h-4 group-hover:scale-110 transition-transform" />
                  Get Help
                </Link>
                <button
                  onClick={() => window.history.back()}
                  className="flex items-center gap-2 text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-300 group"
                >
                  <FiArrowLeft className="w-4 h-4 group-hover:scale-110 transition-transform" />
                  Go Back
                </button>
              </div>
            </div>
          </div>

          {/* Additional Info */}
         
        </div>
      </div>
    </div>
  );
};

export default ErrorPage;