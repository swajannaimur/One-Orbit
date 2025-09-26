import LoginForm from "@/components/forms/LoginForm";
import Social from "@/components/social";
import Link from "next/link";
import React from "react";

export default function Login() {
  return (
    <div className="h-screen flex flex-col justify-center items-center">
      <LoginForm></LoginForm>
      <p className="mt-4 text-sm text-gray-600">Or login with</p>
      <Social></Social>
    </div>
  );
}
