"use client";
import { signIn } from "next-auth/react";
import { FaGoogle, FaGithub } from "react-icons/fa";

const Social = () => {
  return (
    <div className="flex flex-col gap-4 mt-6">
      <button
        onClick={() => signIn("google", { callbackUrl: "/", redirect: true })}
        className="flex items-center justify-center gap-2 px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition"
      >
        <FaGoogle size={20} /> Log in with Google
      </button>
      <button
        onClick={() => signIn("github", { callbackUrl: "/", redirect: true })}
        className="flex items-center justify-center gap-2 px-4 py-2 bg-gray-800 text-white rounded hover:bg-gray-900 transition"
      >
        <FaGithub size={20} /> Log in with GitHub
      </button>
    </div>
  );
};

export default Social;
