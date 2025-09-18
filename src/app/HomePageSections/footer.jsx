import React from "react";

const Footer = () => {
  return (
    <footer className="bg-teal-100 w-full py-12 px-4">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="font-bold text-lg tracking-wide text-[#064232]">
          One-Orbit
        </div>
        <nav className="flex flex-wrap gap-6 text-base">
          <a
            href="#about"
            className="text-[#064232] hover:text-teal-700 transition"
          >
            About
          </a>
          <a
            href="#services"
            className="text-[#064232] hover:text-teal-700 transition"
          >
            Services
          </a>
          <a
            href="#contact"
            className="text-[#064232] hover:text-teal-700 transition"
          >
            Contact
          </a>
        </nav>
        <div className="flex gap-4">
          <a
            href="https://facebook.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-[#064232] hover:text-teal-700 transition"
          >
            Facebook
          </a>
          <a
            href="https://linkedin.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-[#064232] hover:text-teal-700 transition"
          >
            LinkedIn
          </a>
        </div>
      </div>
      <div className="text-center text-sm text-[#064232] mt-6">
        &copy; {new Date().getFullYear()} One-Orbit. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
