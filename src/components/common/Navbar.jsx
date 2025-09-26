"use client";
import React from 'react'
import { signOut, useSession } from "next-auth/react";
import Link from "next/link";


export default function Navbar() {

    const { data: session } = useSession();

    const navItem = (
        <>
            <li>
                <Link href="/projects">All Projects</Link>
            </li>
            <li>
                <Link href="/solutions">Solutions</Link>
            </li>
            <li>
                <Link href="/pricing">Pricing</Link>
            </li>
            <li>
                <Link href="/create-post">Create Post</Link>
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
                {/* conditional buttons */}
                {
                    !session ? (<><Link href="/login" className="btn btn-primary rounded-lg hidden sm:flex">Log In</Link>
                        <Link href="/register" className="btn bg-secondary text-primary rounded-lg hidden sm:flex">Register</Link></>) : (<><button onClick={() => {
                            signOut();
                        }} className="btn bg-secondary text-primary rounded-lg">
                            Logout
                        </button></>)
                }
            </div>
        </div>
    );
}
