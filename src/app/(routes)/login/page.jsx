// import LoginForm from "@/components/forms/LoginForm";
import LoginForm from "../../../components/forms/LoginForm";
import Social from "../../../components/Social";
import Link from "next/link";
import React from "react";

export default function Login() {
  return ( 
    <div className="h-screen flex flex-col justify-center items-center">
      <LoginForm></LoginForm>
      <div className="flex items-center w-full max-w-xs">
        <div className="flex-grow h-px bg-gray-300" />
        <span className="mx-4 text-sm text-gray-500 font-medium whitespace-nowrap">
          Or Login with
        </span>
        <div className="flex-grow h-px bg-gray-300" />
      </div>
      <Social></Social>
    </div>
  );
}
