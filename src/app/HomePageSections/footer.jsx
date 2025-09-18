import Link from "next/link";
import React from "react";
import { FaFacebook, FaLinkedin } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="w-full bg-secondary text-black py-16 px-4">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="font-bold text-lg tracking-wide">
          <Link href="/" className="text-2xl font-bold">
            OneOrbit
          </Link>
        </div>
        <nav className="flex flex-wrap gap-6 text-base">
          <a
            href="#about"
            className="hover:text-primary font-semibold transition"
          >
            About
          </a>
          <a
            href="#services"
            className="hover:text-primary font-semibold transition"
          >
            Services
          </a>
          <a
            href="#contact"
            className="hover:text-primary font-semibold transition"
          >
            Contact
          </a>
        </nav>
        <div className="flex gap-4">
          <a
            href="https://facebook.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-primary transition"
          >
            <FaFacebook size={25}></FaFacebook>
          </a>
          <a
            href="https://linkedin.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-primary transition"
          >
            <FaLinkedin size={25}></FaLinkedin>
          </a>
        </div>
      </div>

      <div className="text-center text-sm  mt-6">
        &copy; {new Date().getFullYear()} One-Orbit. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
