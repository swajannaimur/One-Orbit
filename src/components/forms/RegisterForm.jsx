"use client";
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { signIn } from "next-auth/react";
import Link from 'next/link';
import toast from 'react-hot-toast';
import Image from 'next/image';

const CLOUDINARY_UPLOAD_URL = `https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/upload`;
const CLOUDINARY_UPLOAD_PRESET = process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET;

export default function RegisterForm() {

    const [error, setError] = useState("");
    const [image, setImage] = useState(null);
    const [preview, setPreview] = useState("");
    const [loading, setLoading] = useState(false);
    const [role, setRole] = useState("client");
    const router = useRouter();

    const isValidEmail = (email) => {
        const emailRegx = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
        return emailRegx.test(email);
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setImage(file);
            setPreview(URL.createObjectURL(file));
        }
    };

    const handleImageClick = () => {
        document.getElementById('profile-image-input').click();
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");
        setLoading(true);

        const name = e.target.name.value.trim();
        const email = e.target.email.value.trim();
        const password = e.target.password.value.trim();

        if (!isValidEmail(email)) {
            setError("Email is Invalid");
            setLoading(false);
            return;
        }

        if (!password || password.length < 8) {
            setError("Password must be at least 8 characters");
            setLoading(false);
            return;
        }

        if (!image) {
            setError("Please upload a profile image");
            setLoading(false);
            return;
        }

        try {
            // ✅ Upload image to Cloudinary
            const formData = new FormData();
            formData.append("file", image);
            formData.append("upload_preset", CLOUDINARY_UPLOAD_PRESET);

            const uploadRes = await fetch(CLOUDINARY_UPLOAD_URL, {
                method: "POST",
                body: formData,
            });

            const uploadData = await uploadRes.json();

            if (!uploadData.secure_url) {
                setError("Image upload failed");
                setLoading(false);
                return;
            }

            const imageUrl = uploadData.secure_url;

            // ✅ Send user data with role
            const res = await fetch("/api/register", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ name, email, password, image: imageUrl, role }),
            });


            if (res.status === 400) {
                toast.error("This email already registered.");
                toast.error("This email already registered.");
                setError("This email is already registered");
                setLoading(false);
                return;
            }

            if (res.status === 200) {
                toast.success("Registration successful! Logging you in...");
                setError("");

                const result = await signIn("credentials", { redirect: false, email, password });
                if (!result.error) {
                    router.push("/");
                } else {

                    toast.error("Login failed after registration");
                }
            }

        } catch (err) {
            console.error(err);
            toast.error("Something went wrong!");
            setError("Error, try again");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="mx-auto w-full rounded-lg p-6 bg-white">
            <h2 className='text-center text-xl sm:text-3xl font-semibold'>Register to <span className='bg-linear-to-br from-blue-500 to-purple-600 bg-clip-text text-transparent'>OneOrbit</span></h2>

            {/* Profile Image Upload - Positioned at the top */}
            <div className="flex flex-col items-center justify-center mt-6 mb-6">
                <div className="relative">
                    <div
                        onClick={handleImageClick}
                        className="w-32 h-32 rounded-full border-2 border-dashed border-gray-300 flex items-center justify-center cursor-pointer hover:border-primary transition-colors duration-200 bg-gray-50"
                    >
                        {preview ? (
                            <Image
                                src={preview}
                                alt="Preview"
                                fill
                                className="object-cover rounded-full"
                            />
                        ) : (
                            <div className="text-center">
                                <svg className="w-8 h-8 mx-auto text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                                </svg>
                                <span className="text-xs text-gray-500 mt-1 block">Add Photo</span>
                            </div>
                        )}
                    </div>

                    {preview && (
                        <button
                            type="button"
                            onClick={handleImageClick}
                            className="absolute -bottom-2 -right-2 bg-primary text-white p-2 rounded-full shadow-lg hover:bg-primary/90 transition-colors duration-200"
                        >
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
                            </svg>
                        </button>
                    )}
                </div>

                <input
                    id="profile-image-input"
                    type="file"
                    accept="image/*"
                    onChange={handleImageChange}
                    className="hidden"
                />

                <p className="text-sm text-gray-500 mt-3 text-center">
                    Click the circle to upload a profile image
                </p>
            </div>

            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                {/* Name */}
                <div className="flex flex-col gap-1">
                    <label className="text-sm md:text-base font-medium text-gray-700">Name</label>
                    <input
                        type="text"
                        name="name"
                        placeholder="Your full name"
                        className="w-full px-3 py-2 border border-gray-300 rounded-md placeholder-gray-400 text-gray-800 
                        focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary"
                    />
                </div>

                {/* Email */}
                <div className="flex flex-col gap-1">
                    <label className="text-sm md:text-base font-medium text-gray-700">Email</label>
                    <input
                        type="email"
                        name="email"
                        placeholder="Enter your email"
                        className="w-full px-3 py-2 border border-gray-300 rounded-md placeholder-gray-400 text-gray-800 
                        focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary"
                    />
                </div>

                {/* Password */}
                <div className="flex flex-col gap-1">
                    <label className="text-sm md:text-base font-medium text-gray-700">Password</label>
                    <input
                        type="password"
                        name="password"
                        placeholder="Enter your password"
                        className="w-full px-3 py-2 border border-gray-300 rounded-md placeholder-gray-400 text-gray-800 focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary"
                    />
                </div>

                {/* Role Dropdown */}
                <div className="flex flex-col gap-1">
                    <label className="text-sm md:text-base font-medium text-gray-700">Select Role</label>
                    <select
                        name="role"
                        value={role}
                        onChange={(e) => setRole(e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md text-gray-800 focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary"
                    >
                        <option value="client">Client</option>
                        <option value="developer">Developer</option>
                    </select>
                </div>

                <p className="text-sm text-gray-700 tracking-wide font-semibold">
                    Already have an account? <Link href="/login" className="text-primary hover:underline">Login</Link>
                </p>

                <button
                    type="submit"
                    disabled={loading}
                    className="w-full py-2 cursor-pointer bg-primary text-white tracking-wider rounded-md
                    hover:bg-primary/90 disabled:bg-gray-400"
                >
                    {loading ? "Registering..." : "Register"}
                </button>

                <p className="text-red-500 text-base mb-4">
                    {error && error}
                </p>
            </form>
        </div>
    );
}