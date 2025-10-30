"use client";
import { useRouter } from "next/navigation";
import { useState } from "react";
import Link from "next/link";
import toast from "react-hot-toast";
import { signIn } from "next-auth/react";
import { FaArrowRight, FaEye, FaEyeSlash } from "react-icons/fa";

export default function LoginForm() {
  const router = useRouter();
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const isValidEmail = (email) => {
    const emailRegx = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
    return emailRegx.test(email);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = e.target;
    const email = e.target.email.value;
    const password = e.target.password.value;

    setIsLoading(true);

    if (!isValidEmail(email)) {
      toast.error("Email is Invalid");
      setError("Email is Invalid");
      setIsLoading(false);
      return;
    }

    if (!password || password.length < 8) {
      toast.error("Password should be at least 8 characters");
      setError("Password is less then 8");
      setIsLoading(false);
      return;
    }

    // login and OTP sections are commented intentionally
  };

  // login comment by sazzad
  // calling next-auth "signIn" function
  // const result = await signIn("credentials", { redirect: false, email, password });

  // console.log('after login : ', result);

  // if (result?.error) {
  //     toast.error("Invalid Email or Password");
  //     setError("Invalid Email or Password");
  //     setIsLoading(false);
  // }
  // else {
  //     form.reset();
  //     toast.success("Login Successfull");
  //     setError("");
  //     router.push("/dashboard");
  // }

  // OTP - commented by Yasin Arafat
  // const res = await fetch("/api/send-otp", {
  //     method: "POST",
  //     headers: { "Content-Type": "application/json" },
  //     body: JSON.stringify({ email, password }),
  // });

  // if (res.ok){
  //     localStorage.setItem("password", password);
  //     setIsLoading(false);
  //     router.push("/");
  // }

  // if (!res.ok) {
  //     const data = await res.json();
  //     setError(data.message);
  //     setIsLoading(false);
  // } else {
  //     router.replace(`/verify-otp?email=${encodeURIComponent(email)}`);
  // }

  const handleRoleBasedLogin = async (role) => {
    let email, password;

    if (role === "client") {
      email = "client1@gmail.com";
      password = "abcd1234";
    } else if (role === "dev") {
      email = "dev1@gmail.com";
      password = "abcd1234";
    }

    setIsLoading(true);

    const result = await signIn("credentials", {
      redirect: false,
      email,
      password,
    });

    if (result?.error) {
      toast.error("Invalid Email or Password");
      setError("Invalid Email or Password");
      setIsLoading(false);
    } else {
      toast.success(`${role} Login Successfull`);
      setError("");
      router.push("/dashboard");
    }
  };

  return (
    <div className="w-full max-w-md sm:max-w-lg md:max-w-xl mx-auto rounded-lg  sm:p-8 bg-white shadow-md">
      {/* title */}
      <h2 className="text-center text-2xl sm:text-3xl md:text-4xl font-semibold text-gray-800">
        Login to One Orbit
      </h2>

      <form onSubmit={handleSubmit} className="flex flex-col gap-4 mt-6 sm:mt-8">
        {/* email label and input field */}
        <div className="flex flex-col gap-1">
          <label className="text-sm sm:text-base font-medium text-gray-700">
            Email
          </label>
          <input
            type="email"
            name="email"
            placeholder="Enter your email"
            className="w-full px-3 py-2 sm:px-4 sm:py-3 border border-gray-300 rounded-md placeholder-gray-400 text-gray-800 
                   focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary text-sm sm:text-base"
          />
        </div>

        {/* password label and input field */}
        <div className="flex flex-col gap-1">
          <label className="text-sm sm:text-base font-medium text-gray-700">
            Password
          </label>

          <div className="relative flex items-center">
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              placeholder="Enter your password"
              className="w-full px-3 py-2 sm:px-4 sm:py-3 border border-gray-300 rounded-md 
                   placeholder-gray-400 text-gray-800
                   focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary text-sm sm:text-base"
            />

            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 text-gray-500 cursor-pointer"
            >
              {showPassword ? <FaEyeSlash size={18} /> : <FaEye size={18} />}
            </button>
          </div>
        </div>

        {/* showing form error */}
        <p className="text-red-500 text-sm sm:text-base font-semibold">{error && error}</p>

        {/* forget password redirect link */}
        <div>
          <p className="text-xs sm:text-sm md:text-base text-gray-700 tracking-wide font-semibold">
            Forgot password?{" "}
            <Link
              href="/forgot-password"
              className="text-primary hover:underline"
            >
              Reset Here
            </Link>
          </p>
        </div>

        {/* login button */}
        <button
          type="submit"
          className="w-full py-2 sm:py-3 cursor-pointer btn-linear text-white text-sm sm:text-base tracking-wider rounded-md
                 hover:bg-primary/90 flex justify-center"
        >
          {isLoading ? (
            <span className="loading loading-spinner loading-xl"></span>
          ) : (
            "Login"
          )}
        </button>

        {/* Role preferences */}
        <div className="flex flex-col sm:flex-row justify-between items-center gap-3 sm:gap-0">
          <p
            onClick={() => handleRoleBasedLogin("client")}
            className="flex items-center justify-center gap-2 border border-blue-500 rounded-full px-3 py-1 sm:px-4 sm:py-2 text-blue-500 cursor-pointer text-sm sm:text-base w-full sm:w-auto"
          >
            Client Login <FaArrowRight />
          </p>

          <p
            onClick={() => handleRoleBasedLogin("dev")}
            className="flex items-center justify-center gap-2 border border-blue-500 rounded-full px-3 py-1 sm:px-4 sm:py-2 text-blue-500 cursor-pointer text-sm sm:text-base w-full sm:w-auto"
          >
            Dev Login <FaArrowRight />
          </p>
        </div>

        {/* redirecting to register page */}
        <p className="text-xs sm:text-sm md:text-base text-gray-500 tracking-wide font-semibold text-center">
          Don't have an account?{" "}
          <Link href="register" className="text-primary/80 hover:underline">
            Register
          </Link>
        </p>
      </form>
    </div>
  );
}
