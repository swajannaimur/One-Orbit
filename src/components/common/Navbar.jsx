"use client";
import React from "react";
import { signOut, useSession } from "next-auth/react";
import Link from "next/link";

export default function Navbar() {
  const { data: session } = useSession();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  // const [darkMode, setDarkMode] = useState(false);
  const [isUserDropdownOpen, setIsUserDropdownOpen] = useState(false);

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
    { href: "/projects", label: "All Project", icon: HiOutlineSparkles },
    { href: "/solutions", label: "Solutions", icon: RiLightbulbFlashLine },
    { href: "/pricing", label: "Pricing", icon: HiOutlineCurrencyDollar },
    {
      href: "/chat",
      label: "Message",
      icon: HiOutlineChatBubbleOvalLeftEllipsis,
    },
    {
      href: "/create-post",
      label: "Create Post",
      icon: HiOutlineChatBubbleOvalLeftEllipsis,
    },
  ];

  const userMenuItems = [
    { href: "/profile", label: "My Profile", icon: FiUser },
    { href: "/dashboard", label: "Dashboard", icon: HiOutlineSparkles },
    { href: "/billing", label: "Billing", icon: FiCreditCard },
    { href: "/settings", label: "Settings", icon: FiSettings },
    { href: "/support", label: "Support", icon: FiHelpCircle },
  ];

  return (
    <div className="navbar xl:px-0 max-w-7xl mx-auto ">
      <div className="navbar-start w-auto">
        <div className="dropdown">
          <div tabIndex={0} role="button" className="lg:hidden mr-5">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              {" "}
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h8m-8 6h16"
              />{" "}
            </svg>
          </div>
          {/* dropdown nav items for mobile */}
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow"
          >
            {navItem}
          </ul>
        </div>

        {/* brand logo */}
        <Link href="/" className="text-2xl font-bold">
          OneOrbit
        </Link>
      </div>

      <div className="navbar-end w-full">
        <div className="hidden lg:flex">
          {/* nav items for desktop */}
          <ul className="menu menu-horizontal px-1 text-base">{navItem}</ul>
        </div>
        {/* conditional buttons */}
        {!session ? (
          <>
            <div className=" flex justify-center items-center gap-4">
              <Link href="/login" className="btn btn-primary rounded-lg">
                Log In
              </Link>
              <Link
                href="/register"
                className="btn bg-secondary text-primary rounded-lg hidden sm:flex"
              >
                Register
              </Link>
            </div>
          </>
        ) : (
          <>
            <button
              onClick={() => {
                signOut();
              }}
              className="btn btn-primary px-3 py-2 rounded-md cursor-pointer"
            >
              Logout
            </button>
          </>
        )}
      </div>
    </div>
  );
}
