import Link from 'next/link';
import React from 'react'

export default function Navbar() {
  const navItem = (
    <>
      <li>
        <a>Product</a>
      </li>
      <li>
        <a>Solutions</a>
      </li>
      <li>
        <a>Resources</a>
      </li>
      <li>
        <a>Pricing</a>
      </li>
    </>
  );
  return (
    <div className="navbar xl:px-0 max-w-7xl mx-auto">
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

      <div className="navbar-end gap-5 w-full">
    
        <div className="hidden lg:flex">
          {/* nav items for desktop */}
          <ul className="menu menu-horizontal px-1 text-base">{navItem}</ul>
        </div>

        {/* right side buttons */}
        <a className="btn btn-primary rounded-lg hidden sm:flex">Get Started</a>
        <Link href="/login" className="btn bg-secondary rounded-lg">Log In</Link>
      </div>
    </div>
  );
}
