// components/Footer.jsx
"use client";
import React from "react";
import Link from "next/link";
import {
  FiTwitter,
  FiLinkedin,
  FiGithub,
  FiYoutube,
  FiMail,
  FiPhone,
  FiMapPin,
  FiArrowUp,
} from "react-icons/fi";

const Footer = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const quickLinks = [
    { name: "Features", href: "/features" },
    { name: "Pricing", href: "/pricing" },
    { name: "About", href: "/about" },
    { name: "Careers", href: "/careers" },
    { name: "Blog", href: "/blog" },
    { name: "Help", href: "/help" },
  ];

  const legalLinks = [
    { name: "Privacy", href: "/privacy" },
    { name: "Terms", href: "/terms" },
    { name: "Security", href: "/security" },
    { name: "Cookies", href: "/cookies" },
  ];

  const socialLinks = [
    { name: "Twitter", icon: FiTwitter, href: "https://twitter.com" },
    { name: "LinkedIn", icon: FiLinkedin, href: "https://linkedin.com" },
    { name: "GitHub", icon: FiGithub, href: "https://github.com" },
    { name: "YouTube", icon: FiYoutube, href: "https://youtube.com" },
  ];

  return (
    <footer className="bg-gradient-to-br from-gray-50 via-blue-50 to-indigo-100 dark:bg-gray-900 border-t border-gray-100 dark:border-gray-800 transition-colors duration-300">
      {/* Main Footer */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Top Section - Brand & Newsletter */}
        <div className="grid lg:grid-cols-3 gap-20 w-full mb-12">
          {/* Brand Section */}
          <div className="lg:col-span-1">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-lg">O</span>
              </div>
              <span className="text-2xl font-bold bg-gradient-to-br from-blue-500 to-purple-600 bg-clip-text text-transparent">OneOrbit</span>
            </div>
            <p className="text-gray-600 dark:text-gray-400 text-lg mb-6 max-w-md transition-colors duration-300">
              Building the future of team collaboration. Simple, powerful tools for modern teams.
            </p>
            
            {/* Newsletter */}
            <div className="space-y-4">
              <p className="text-sm font-medium text-gray-900 dark:text-white transition-colors duration-300">
                Stay updated
              </p>
              <div className="flex gap-2 max-w-sm">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="flex-1 px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 transition-colors duration-300"
                />
                <button className="px-4 py-2 bg-gray-900 dark:bg-gray-700 text-white rounded-lg hover:bg-gray-800 dark:hover:bg-gray-600 transition-colors duration-300 font-medium">
                  Join
                </button>
              </div>
            </div>
          </div>

          {/* Links Grid */}
          <div className="lg:col-span-2 grid grid-cols-2 md:grid-cols-3 gap-x-24 ml-20">
            {/* Product */}
            <div>
              <h3 className="font-semibold text-gray-900 dark:text-white mb-4 transition-colors duration-300">
                Product
              </h3>
              <ul className="space-y-3">
                <li>
                  <Link 
                    href="/features" 
                    className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors duration-300"
                  >
                    Features
                  </Link>
                </li>
                <li>
                  <Link 
                    href="/integrations" 
                    className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors duration-300"
                  >
                    Integrations
                  </Link>
                </li>
                <li>
                  <Link 
                    href="/pricing" 
                    className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors duration-300"
                  >
                    Pricing
                  </Link>
                </li>
                <li>
                  <Link 
                    href="/changelog" 
                    className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors duration-300"
                  >
                    Changelog
                  </Link>
                </li>
              </ul>
            </div>

            {/* Company */}
            <div>
              <h3 className="font-semibold text-gray-900 dark:text-white mb-4 transition-colors duration-300">
                Company
              </h3>
              <ul className="space-y-3">
                <li>
                  <Link 
                    href="/about" 
                    className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors duration-300"
                  >
                    About
                  </Link>
                </li>
                <li>
                  <Link 
                    href="/careers" 
                    className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors duration-300"
                  >
                    Careers
                  </Link>
                </li>
                <li>
                  <Link 
                    href="/press" 
                    className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors duration-300"
                  >
                    Press
                  </Link>
                </li>
                <li>
                  <Link 
                    href="/contact" 
                    className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors duration-300"
                  >
                    Contact
                  </Link>
                </li>
              </ul>
            </div>

            {/* Resources */}
            <div>
              <h3 className="font-semibold text-gray-900 dark:text-white mb-4 transition-colors duration-300">
                Resources
              </h3>
              <ul className="space-y-3">
                <li>
                  <Link 
                    href="/blog" 
                    className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors duration-300"
                  >
                    Blog
                  </Link>
                </li>
                <li>
                  <Link 
                    href="/docs" 
                    className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors duration-300"
                  >
                    Documentation
                  </Link>
                </li>
                <li>
                  <Link 
                    href="/community" 
                    className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors duration-300"
                  >
                    Community
                  </Link>
                </li>
                <li>
                  <Link 
                    href="/support" 
                    className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors duration-300"
                  >
                    Support
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-gray-200 dark:border-gray-800 pt-8 transition-colors duration-300">
          <div className="flex flex-col lg:flex-row justify-between items-center gap-6">
            {/* Left - Copyright & Legal */}
            <div className="flex flex-col sm:flex-row items-center gap-4 text-sm text-gray-600 dark:text-gray-400 transition-colors duration-300">
              <span>© 2025 OneOrbit. All rights reserved.</span>
              <div className="flex gap-4">
                {legalLinks.map((link) => (
                  <Link
                    key={link.name}
                    href={link.href}
                    className="hover:text-gray-900 dark:hover:text-white transition-colors duration-300"
                  >
                    {link.name}
                  </Link>
                ))}
              </div>
            </div>

            {/* Center - Contact Info */}
            <div className="flex items-center gap-6 text-sm text-gray-600 dark:text-gray-400 transition-colors duration-300">
              <div className="flex items-center gap-2">
                <FiMail className="w-4 h-4" />
                <span>hello@orbit.com</span>
              </div>
              <div className="flex items-center gap-2">
                <FiPhone className="w-4 h-4" />
                <span>+1 (555) 123-4567</span>
              </div>
            </div>

            {/* Right - Social & Back to Top */}
            <div className="flex items-center gap-4">
              {/* Social Links */}
              <div className="flex gap-3">
                {socialLinks.map((social) => {
                  const Icon = social.icon;
                  return (
                    <a
                      key={social.name}
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-10 h-10 bg-gray-100 dark:bg-gray-800 rounded-lg flex items-center justify-center hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors duration-300 group"
                      aria-label={social.name}
                    >
                      <Icon className="w-5 h-5 text-gray-600 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white transition-colors duration-300" />
                    </a>
                  );
                })}
              </div>

              {/* Vertical Divider */}
              <div className="h-8 w-px bg-gray-300 dark:bg-gray-700 transition-colors duration-300"></div>

              {/* Back to Top */}
              <button
                onClick={scrollToTop}
                className="w-10 h-10 bg-gray-100 dark:bg-gray-800 rounded-lg flex items-center justify-center hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors duration-300 group"
                aria-label="Back to top"
              >
                <FiArrowUp className="w-5 h-5 text-gray-600 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white transition-colors duration-300" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Trust Badges */}
      <div className="bg-gray-50 dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700 transition-colors duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-gray-600 dark:text-gray-400 transition-colors duration-300">
            {/* Security Badges */}
            <div className="flex items-center gap-6">
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 bg-green-100 dark:bg-green-900/30 rounded flex items-center justify-center transition-colors duration-300">
                  <span className="text-green-600 dark:text-green-400 text-xs font-bold">✓</span>
                </div>
                <span>SSL Secured</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 bg-blue-100 dark:bg-blue-900/30 rounded flex items-center justify-center transition-colors duration-300">
                  <span className="text-blue-600 dark:text-blue-400 text-xs font-bold">✓</span>
                </div>
                <span>GDPR Compliant</span>
              </div>
            </div>

            {/* System Status */}
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
              <span>All systems operational</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;