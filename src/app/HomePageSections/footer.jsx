import React from "react";

const Footer = () => {
  return (
    <footer className="bg-amber-800 text-white py-8 px-4">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="font-bold text-lg tracking-wide">One-Orbit</div>
        <nav className="flex flex-wrap gap-6 text-base">
          <a href="#about" className="hover:text-amber-400 transition">
            About
          </a>
          <a href="#services" className="hover:text-amber-400 transition">
            Services
          </a>
          <a href="#contact" className="hover:text-amber-400 transition">
            Contact
          </a>
        </nav>
        <div className="flex gap-4">
          <a
            href="https://facebook.com"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-amber-400 transition"
          >
            Facebook
          </a>
          <a
            href="https://linkedin.com"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-amber-400 transition"
          >
            LinkedIn
          </a>
        </div>
      </div>
      <div className="text-center text-sm text-gray-300 mt-6">
        &copy; {new Date().getFullYear()} One-Orbit. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
