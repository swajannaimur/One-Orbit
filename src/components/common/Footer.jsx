
"use client";

import Link from "next/link";
import React from "react";
import { FaFacebook, FaLinkedin, FaTwitter, FaInstagram } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="w-full bg-secondary text-black py-12 px-6">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 justify-around gap-8 ">
        {/* Logo + Tagline */}
        <div>
          <Link href="/" className="text-2xl font-bold text-black">
            OneOrbit
          </Link>
          <p className="mt-4 text-sm text-gray-800 leading-relaxed">
            A versatile platform designed to streamline workflows and enhance
            collaboration across industries.
          </p>
        </div>
        {/* Navigation */}
        <div>
          <h3 className="text-black font-semibold mb-4">Explore</h3>
          <ul className="space-y-2 text-sm">
            <li>
              <Link href="/product" className="hover:text-primary transition">
                Product
              </Link>
            </li>
            <li>
              <Link href="/solutions" className="hover:text-primary transition">
                Solutions
              </Link>
            </li>
            <li>
              <Link href="/resources" className="hover:text-primary transition">
                Resources
              </Link>
            </li>
            <li>
              <Link href="/pricing" className="hover:text-primary transition">
                Pricing
              </Link>
            </li>
            <li>
              <Link href="/contact" className="hover:text-primary transition">
                Contact
              </Link>
            </li>
          </ul>
        </div>
        {/* Socials */}
        <div>
          <h3 className="text-black font-semibold mb-4">Follow Us</h3>
          <div className="flex gap-4">
            <a
              href="https://facebook.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-blue-500 transition"
            >
              <FaFacebook size={22} />
            </a>
            <a
              href="https://linkedin.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-blue-400 transition"
            >
              <FaLinkedin size={22} />
            </a>
            <a
              href="https://twitter.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-sky-400 transition"
            >
              <FaTwitter size={22} />
            </a>
          </div>
        </div>
      </div>

      {/* Bottom Note */}
      <div className="border-t border-gray-800 mt-10 pt-6 text-center text-sm text-gray-500">
        &copy; {new Date().getFullYear()} OneOrbit. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
