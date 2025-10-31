"use client";
import React, { useState, useEffect } from "react";
import { signOut, useSession } from "next-auth/react";
import { IoCreateOutline } from "react-icons/io5";
import Link from "next/link";
import {
  FiMenu,
  FiX,
  FiUser,
  FiLogOut,
  FiSettings,
  FiHelpCircle,
  FiCreditCard,
  FiStar,
  FiMoon,
  FiSun,
  FiChevronDown,
} from "react-icons/fi";
import { HiOutlineSparkles, HiOutlineCurrencyDollar } from "react-icons/hi";
import { HiOutlineChatBubbleOvalLeftEllipsis } from "react-icons/hi2";
import { RiRocketLine, RiLightbulbFlashLine } from "react-icons/ri";
import { usePathname } from "next/navigation";

export default function Navbar() {
  const { data: session } = useSession();
  const pathname = usePathname();

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isUserDropdownOpen, setIsUserDropdownOpen] = useState(false);

  const role = session?.user?.role;

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close mobile menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        isMobileMenuOpen &&
        !event.target.closest(".mobile-menu") &&
        !event.target.closest(".hamburger-button")
      ) {
        setIsMobileMenuOpen(false);
      }
    };
    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, [isMobileMenuOpen]);

  const navItems = [
    { href: "/projects", label: "All Project" },
    { href: "/AllDevelopers", label: "All Developers" },
    { href: "/solutions", label: "Solutions" },
  ];

  const secureItems = [
    {
      href: "/chat",
      label: "Inbox",
    },
  ];

  // Only show "Create Project" if role is client
  if (role === "client") {
    secureItems.push({
      href: "/create-post",
      label: "Create Project",
    });
  }

  const userMenuItems = [
    { href: "/profile", label: "My Profile", icon: FiUser },
    { href: "/dashboard", label: "Dashboard", icon: HiOutlineSparkles },
    { href: "/pricing", label: "Pricing", icon: FiCreditCard }
  ];

  // Helper function to check if a route is active
  const isActiveRoute = (href) => {
    if (href === "/") {
      return pathname === "/";
    }
    return pathname.startsWith(href);
  };

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-40 dark-bg transition-all duration-100 ${isScrolled
          ? "bg-white/80 dark:bg-gray-900/80 backdrop-blur-xl shadow-lg"
          : "bg-transparent"
          }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 lg:h-20">
            {/* Logo Section */}
            <Link
              href="/"
              className="flex items-center space-x-3 group shrink-0"
            >
              <div className="relative">
                <div className="w-10 h-10 lg:w-12 lg:h-12 bg-linear-to-br from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300 shadow-lg">
                  <span className="text-white font-bold text-lg">O</span>
                </div>
                <div className="absolute -inset-1 bg-linear-to-r from-blue-500 to-purple-600 rounded-2xl blur opacity-20 group-hover:opacity-30 transition-opacity duration-300"></div>
              </div>
              <div className="flex flex-col">
                <span className="text-lg lg:text-xl font-bold bg-linear-to-r from-gray-800 to-gray-600 dark:from-white dark:to-gray-200 bg-clip-text text-transparent">
                  One
                  <span className="bg-linear-to-br from-blue-500 to-purple-600 bg-clip-text text-transparent">
                    Orbit
                  </span>
                </span>
                <span className="text-xs text-gray-500 dark:text-gray-400 font-medium hidden sm:block">
                  management platform
                </span>
              </div>
            </Link>

            {/* Desktop Navigation - Hidden on mobile */}
            <div className="hidden lg:flex items-center space-x-1">
              {/* Public Nav Items */}
              {navItems.map((item) => {
                const isActive = isActiveRoute(item.href);
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={`relative flex items-center gap-2 px-4 py-3 rounded-xl transition-all duration-300 group font-medium ${isActive
                      ? "text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/20"
                      : "text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400"
                      }`}
                  >
                    {item.label}
                    {item.badge && (
                      <span className="absolute -top-1 -right-1 px-1.5 py-0.5 text-xs bg-linear-to-r from-green-400 to-blue-500 text-white rounded-full">
                        {item.badge}
                      </span>
                    )}
                    <div className={`absolute bottom-0 left-1/2 w-0 h-0.5 bg-linear-to-r from-blue-500 to-purple-500 transition-all duration-300 ${isActive
                      ? "w-4/5 left-1/10"
                      : "group-hover:w-4/5 group-hover:left-1/10"
                      }`}></div>
                  </Link>
                );
              })}

              {/* Secure Nav Items - Only show when session exists */}
              {session &&
                secureItems.map((item) => {
                  const isActive = isActiveRoute(item.href);
                  return (
                    <Link
                      key={item.href}
                      href={item.href}
                      className={`relative flex items-center gap-2 px-4 py-3 rounded-xl transition-all duration-300 group font-medium ${isActive
                        ? "text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/20"
                        : "text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400"
                        }`}
                    >
                      {item.label}
                      {item.badge && (
                        <span className="absolute -top-1 -right-1 px-1.5 py-0.5 text-xs bg-linear-to-r from-green-400 to-blue-500 text-white rounded-full">
                          {item.badge}
                        </span>
                      )}
                      <div className={`absolute bottom-0 left-1/2 w-0 h-0.5 bg-linear-to-r from-blue-500 to-purple-500 transition-all duration-300 ${isActive
                        ? "w-4/5 left-1/10"
                        : "group-hover:w-4/5 group-hover:left-1/10"
                        }`}></div>
                    </Link>
                  );
                })}
            </div>

            {/* Right Actions */}
            <div className="flex items-center space-x-2 lg:space-x-3">
              {/* Authentication Section */}
              {!session ? (
                <div className="hidden sm:flex items-center space-x-2 lg:space-x-3">
                  <Link
                    href="/login"
                    className="items-center gap-2 px-4 py-2.5 bg-linear-to-r from-amber-400 to-orange-500 text-white rounded-xl font-medium hover:shadow-lg transition-all duration-300 hover:scale-105 group"
                  >
                    Sign In
                  </Link>
                  <Link
                    href="/register"
                    className="group relative px-4 py-2 lg:px-8 lg:py-2.5 bg-linear-to-r from-blue-600 to-purple-600 text-white font-medium rounded-xl hover:shadow-xl transition-all duration-300 hover:scale-105 overflow-hidden text-sm lg:text-base"
                  >
                    <div className="absolute inset-0 bg-linear-to-r from-purple-600 to-blue-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    <span className="relative flex items-center gap-1 lg:gap-2">
                      <RiRocketLine className="w-3 h-3 lg:w-4 lg:h-4" />
                      <span className="hidden lg:inline">Get Started</span>
                      <span className="lg:hidden">Start</span>
                    </span>
                  </Link>
                </div>
              ) : (
                /* User Profile Section */
                <div className="hidden lg:flex items-center space-x-4">

                  {/* User Avatar */}
                  <div className="relative group">
                    <button
                      className="flex items-center gap-3 p-2 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-800 transition-all duration-300 border border-transparent hover:border-gray-200 dark:hover:border-gray-700"
                      onClick={() => setIsUserDropdownOpen(!isUserDropdownOpen)}
                    >
                      <div className="w-8 h-8 lg:w-10 lg:h-10 bg-linear-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center text-white font-semibold shadow-lg">
                        {session.user?.name?.[0] ||
                          session.user?.email?.[0] ||
                          "U"}
                      </div>
                      <div className="hidden md:flex flex-col items-start">
                        <span className="text-sm font-semibold text-gray-900 dark:text-white">
                          {session.user?.name?.split(" ")[0] || "User"}
                        </span>
                        <span className="text-xs text-gray-500 dark:text-gray-400">
                          Pro Plan
                        </span>
                      </div>
                      <FiChevronDown
                        className={`w-4 h-4 text-gray-500 transition-transform duration-200 ${isUserDropdownOpen ? "rotate-180" : ""
                          }`}
                      />
                    </button>

                    {/* Dropdown Menu */}
                    {isUserDropdownOpen && (
                      <div className="absolute right-0 top-full mt-2 w-64 bg-white dark:bg-gray-800 rounded-2xl shadow-xl border border-gray-200 dark:border-gray-700 py-2 backdrop-blur-lg z-80">
                        {/* User Info */}
                        <div className="p-4 border-b border-gray-100 dark:border-gray-700">
                          <div className="flex items-center space-x-3">
                            <div className="w-10 h-10 bg-linear-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center text-white font-semibold text-lg">
                              {session.user?.name?.[0] ||
                                session.user?.email?.[0] ||
                                "U"}
                            </div>
                            <div className="flex-1 min-w-0">
                              <p className="text-sm font-semibold text-gray-900 dark:text-white truncate">
                                {session.user?.name || "User"}
                              </p>
                              <p className="text-sm text-gray-500 dark:text-gray-400 truncate">
                                {session.user?.email}
                              </p>
                            </div>
                          </div>
                        </div>

                        {/* Menu Items */}
                        <div className="p-2">
                          {userMenuItems.map((item) => {
                            const Icon = item.icon;
                            const isActive = isActiveRoute(item.href);
                            return (
                              <Link
                                key={item.href}
                                href={item.href}
                                className={`flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all duration-200 group ${isActive
                                  ? "text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/20"
                                  : "text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/20"
                                  }`}
                                onClick={() => setIsUserDropdownOpen(false)}
                              >
                                <Icon className={`w-4 h-4 group-hover:scale-110 transition-transform ${isActive ? "text-blue-600 dark:text-blue-400" : ""}`} />
                                {item.label}
                              </Link>
                            );
                          })}
                        </div>

                        {/* Sign Out */}
                        <div className="p-2 border-t border-gray-100 dark:border-gray-700">
                          <button
                            onClick={() => {
                              signOut();
                              setIsUserDropdownOpen(false);
                            }}
                            className="flex items-center gap-3 w-full px-3 py-2.5 text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-all duration-200 group"
                          >
                            <FiLogOut className="w-4 h-4 group-hover:scale-110 transition-transform" />
                            Sign Out
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* Mobile Authentication Buttons - Show on small screens */}
              {!session && (
                <div className="flex sm:hidden items-center space-x-2">
                  <Link
                    href="/login"
                    className="px-3 py-2 text-gray-700 dark:text-gray-300 font-medium rounded-xl hover:bg-gray-50 dark:hover:bg-gray-800 transition-all duration-300 border border-gray-200 dark:border-gray-700 text-sm"
                  >
                    Sign In
                  </Link>
                </div>
              )}

              {/* Mobile User Avatar - Show on small screens when logged in */}
              {session && (
                <div className="flex lg:hidden">
                  <div className="w-8 h-8 bg-linear-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center text-white font-semibold shadow-lg">
                    {session.user?.name?.[0] || session.user?.email?.[0] || "U"}
                  </div>
                </div>
              )}

              {/* Hamburger Menu Button - Always visible on mobile */}
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="lg:hidden p-2 rounded-xl border border-gray-200 dark:border-gray-700 bg-linear-to-br from-blue-500 to-purple-600 hover:shadow-md transition-all duration-300 hamburger-button"
                aria-label="Toggle menu"
              >
                {isMobileMenuOpen ? (
                  <FiX className="w-5 h-5 text-gray-200" />
                ) : (
                  <FiMenu className="w-5 h-5 text-gray-200" />
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        <div
          className={`lg:hidden absolute top-16 left-0 right-0 bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-700 shadow-2xl transition-all duration-300 transform mobile-menu ${isMobileMenuOpen
            ? "translate-y-0 opacity-100"
            : "-translate-y-4 opacity-0 pointer-events-none"
            }`}
        >
          <div className="px-4 py-6 space-y-4">
            {/* Navigation Items */}
            <div className="grid gap-2">
              {navItems.map((item) => {
                const isActive = isActiveRoute(item.href);
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={`flex items-center gap-4 px-4 py-3 rounded-xl transition-all duration-300 group font-medium ${isActive
                      ? "text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/20"
                      : "text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/20"
                      }`}
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    {item.label}
                    {item.badge && (
                      <span className="ml-auto px-2 py-1 text-xs bg-linear-to-r from-green-400 to-blue-500 text-white rounded-full">
                        {item.badge}
                      </span>
                    )}
                  </Link>
                );
              })}

              {/* Secure Items for Mobile */}
              {session &&
                secureItems.map((item) => {
                  const isActive = isActiveRoute(item.href);
                  return (
                    <Link
                      key={item.href}
                      href={item.href}
                      className={`flex items-center gap-4 px-4 py-3 rounded-xl transition-all duration-300 group font-medium ${isActive
                        ? "text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/20"
                        : "text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/20"
                        }`}
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      {item.label}
                    </Link>
                  );
                })}
            </div>

            {/* Mobile Authentication */}
            {!session ? (
              <div className="pt-4 border-t border-gray-200 dark:border-gray-700 space-y-3">
                <Link
                  href="/login"
                  className="flex items-center justify-center w-full px-4 py-3 text-gray-700 dark:text-gray-300 font-medium rounded-xl border border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600 transition-all duration-300"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Sign In
                </Link>
                <Link
                  href="/register"
                  className="flex items-center justify-center gap-2 w-full px-4 py-3 bg-linear-to-r from-blue-600 to-purple-600 text-white font-medium rounded-xl hover:shadow-lg transition-all duration-300 hover:scale-105"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  <RiRocketLine className="w-4 h-4" />
                  Get Started Free
                </Link>
              </div>
            ) : (
              <div className="pt-4 border-t border-gray-200 dark:border-gray-700 space-y-4">
                {/* User Info */}
                <div className="px-4 py-3 bg-gray-50 dark:bg-gray-800 rounded-xl">
                  <p className="text-sm font-semibold text-gray-900 dark:text-white">
                    {session.user?.name}
                  </p>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    {session.user?.email}
                  </p>
                </div>

                {/* User Menu Items */}
                <div className="grid gap-2">
                  {userMenuItems.map((item) => {
                    const Icon = item.icon;
                    const isActive = isActiveRoute(item.href);
                    return (
                      <Link
                        key={item.href}
                        href={item.href}
                        className={`flex items-center gap-4 px-4 py-3 rounded-xl transition-all duration-300 group font-medium ${isActive
                          ? "text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/20"
                          : "text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/20"
                          }`}
                        onClick={() => setIsMobileMenuOpen(false)}
                      >
                        <Icon className={`w-5 h-5 group-hover:scale-110 transition-transform ${isActive ? "text-blue-600 dark:text-blue-400" : ""}`} />
                        {item.label}
                      </Link>
                    );
                  })}
                </div>

                {/* Upgrade Button for Mobile */}
                <Link
                  href="/upgrade"
                  className="flex items-center justify-center gap-2 w-full px-4 py-3 bg-linear-to-r from-amber-400 to-orange-500 text-white font-medium rounded-xl hover:shadow-lg transition-all duration-300 hover:scale-105"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  <FiStar className="w-4 h-4" />
                  Upgrade to Pro
                </Link>

                {/* Sign Out */}
                <button
                  onClick={() => {
                    signOut();
                    setIsMobileMenuOpen(false);
                  }}
                  className="flex items-center justify-center gap-2 w-full px-4 py-3 text-red-600 dark:text-red-400 font-medium rounded-xl border border-red-200 dark:border-red-800 hover:bg-red-50 dark:hover:bg-red-900/20 transition-all duration-300"
                >
                  <FiLogOut className="w-4 h-4" />
                  Sign Out
                </button>
              </div>
            )}
          </div>
        </div>
      </nav>

      {/* Backdrop Overlay */}
      {isMobileMenuOpen && (
        <div
          className="fixed inset-0 bg-opacity-10 z-30 lg:hidden"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}

      {/* Overlay for user dropdown */}
      {isUserDropdownOpen && (
        <div
          className="fixed inset-0 z-30"
          onClick={() => setIsUserDropdownOpen(false)}
        />
      )}
    </>
  );
}