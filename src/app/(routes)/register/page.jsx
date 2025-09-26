import RegisterForm from "@/components/forms/RegisterForm";
import Social from "@/components/Social";
import React from "react";

export default function Register() {
  return (
    <div className="h-screen flex flex-col justify-center items-center">
      <RegisterForm></RegisterForm>
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
