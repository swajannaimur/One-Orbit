"use client";
import { useRouter } from "next/navigation";
import { useState } from "react";
import Link from "next/link";
import toast from "react-hot-toast";
import { signIn } from "next-auth/react";
import { FaEye, FaEyeSlash } from "react-icons/fa";

export default function LoginForm()
{
    const router = useRouter();
    const [ error, setError ] = useState("");
    const [ showPassword, setShowPassword ] = useState(false);
    const [ isLoading, setIsLoading ] = useState(false);

    // email validation function with regx
    const isValidEmail = (email) =>
    {
        const emailRegx = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
        return emailRegx.test(email);
    };

    const handleSubmit = async (e) =>{
        e.preventDefault();
        const form = e.target;
        const email = e.target.email.value;
        const password = e.target.password.value;

        setIsLoading(true);

        // email validation
        if (!isValidEmail(email)){
            toast.error("Email is Invalid");
            setError("Email is Invalid");
            setIsLoading(false);
            return;
        }

        // password validation
        if (!password || password.length < 8){
            toast.error("Password should be at least 8 characters")
            setError("Password is less then 8");
            setIsLoading(false);
            return;
        }


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

        // OTP - commented by Yasin Arafat
    
        const res = await fetch("/api/send-otp", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email, password }),
        });
    
        if (res.ok){
            localStorage.setItem("password", password);
            setIsLoading(false);
            router.push("/");
        }
    
        if (!res.ok) {
            const data = await res.json();
            setError(data.message);
            setIsLoading(false);
        } else {
            router.replace(`/verify-otp?email=${encodeURIComponent(email)}`);
        }
    }


    return (
        <div className="w-full  mx-auto rounded-lg p-6 bg-white">
            {/* title */}
            <h2 className="text-center text-xl sm:text-3xl font-semibold">
                Login to One Orbit
            </h2>

            <form onSubmit={handleSubmit} className="flex flex-col gap-4 mt-6">
                {/* email label and input field */}
                <div className="flex flex-col gap-1">
                    <label className="text-sm md:text-base font-medium text-gray-700">
                        Email
                    </label>
                    <input
                        type="email"
                        name="email"
                        placeholder="Enter your email"
                        className="w-full px-3 py-2 border border-gray-300 rounded-md placeholder-gray-400 text-gray-800 
                   focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary"
                    />
                </div>

                {/* password label and input field */}
                <div className="flex flex-col gap-1">
                    <label className="text-sm md:text-base font-medium text-gray-700">
                        Password
                    </label>

                    <div className="relative flex items-center">
                        <input
                            type={showPassword ? "text" : "password"}
                            name="password"
                            placeholder="Enter your password"
                            className="w-full px-3 py-2 border border-gray-300 rounded-md 
                   placeholder-gray-400 text-gray-800
                   focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary"
                        />

                        <button type="button" onClick={()=> setShowPassword(!showPassword)} className="absolute right-3 text-gray-500 cursor-pointer">
                            {showPassword ? <FaEyeSlash size={18}/> : <FaEye size={18}/>}
                        </button>
                    </div>

                </div>

                {/* showing form error */}
                <p className="text-red-500 text-sm font-semibold">{error && error}</p>


                {/* forget password redirect link */}
                <div>
                    <p className="text-sm text-gray-700 tracking-wide font-semibold">

                        Forgot password? <Link href="/forget-password" className="text-primary hover:underline">Reset Here</Link>

                    </p>
                </div>

                {/* login button */}
                <button
                    type="submit"
                    className="w-full py-2 cursor-pointer bg-primary text-white tracking-wider rounded-md
                 hover:bg-primary/90"
                >
                    {isLoading ? (
                        <span className="loading loading-spinner loading-xl"></span>
                    ) : (
                        "Login"
                    )}
                </button>

                {/* redirecting to register page */}
                <p className="text-sm text-gray-500 tracking-wide font-semibold">
                    Don't have an account?{" "}
                    <Link href="register" className="text-primary/80 hover:underline">
                        Register
                    </Link>
                </p>

            </form>
        </div>
    );
}
