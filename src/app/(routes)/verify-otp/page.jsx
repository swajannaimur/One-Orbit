"use client";
import { useSearchParams, useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import OtpInput from "react-otp-input";
import { signIn } from "next-auth/react";
import Swal from "sweetalert2";

export default function VerifyOTP() {
  const router = useRouter();
  const params = useSearchParams();
  const email = params.get("email");
  const password = localStorage.getItem("password");
  const [sending, setSending] = useState(false);

  const [otp, setOtp] = useState("");
  const [countdown, setCountdown] = useState(300); // 5 minutes

  // Countdown timer
  useEffect(() => {
    const timer =
      countdown > 0 &&
      setInterval(() => setCountdown((prev) => prev - 1), 1000);
    return () => clearInterval(timer);
  }, [countdown]);

  // Auto-send OTP once on mount
  // useEffect(() =>{
  //   if (email){
  //     if (sending) return;
  //     setSending(true)
  //     fetch("/api/send-otp", {
  //       method: "POST",
  //       headers: { "Content-Type": "application/json" },
  //       body: JSON.stringify({ email, password }),
  //     }).then(res=>res.json()).then(data=>{
  //       if(data.message === "OTP sent"){
  //         setSending(false)
  //       }
  //     })
  //   }
  // }, [ email ]);

  // Resend OTP
  const handleResend = async () => {
    setSending(true);
    try {
      await fetch("/api/send-otp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      Swal.fire({
        title: "OTP sent successfully",
        icon: "success",
        showConfirmButton: false,
        timer: 1500,
      });

      // Reset countdown timer
      setCountdown(300);
    } finally {
      setSending(false);
    }
  };

  const handleVerify = async () => {
    const res = await fetch("/api/verify-otp", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, code: otp }),
    });

    const data = await res.json();
    if (res.ok) {
      // OTP verified → now signIn to NextAuth to create the session
      await signIn("credentials", {
        redirect: false,
        email,
        password,
      });
      localStorage.removeItem("password");
      router.replace("/");
    } else {
      Swal.fire({
        title: data.message,
        icon: "error",
      });
    }
  };

  const minutes = String(Math.floor(countdown / 60)).padStart(2, "0");
  const seconds = String(countdown % 60).padStart(2, "0");

  if (sending) {
    return (
      <div className="w-full min-h-screen flex items-center justify-center">
        <span className="loading loading-spinner loading-xl"></span>
      </div>
    );
  }

  return (
    <div className="relative flex min-h-[100vh] w-full flex-col items-center justify-center overflow-hidden bg-gradient-to-br from-[#87CEEB]/40 to-[#8A2BE2]/40 px-3 py-24">
      {/* Background animation blobs */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-400 rounded-full mix-blend-multiply filter blur-2xl opacity-20 animate-blob"></div>{" "}
      <div className="absolute top-1/2 right-1/4 w-96 h-96 bg-purple-400 rounded-full mix-blend-multiply filter blur-2xl opacity-20 animate-blob animation-delay-2000"></div>{" "}
      <div className="absolute bottom-1/4 right-1/2 w-96 h-96 bg-pink-400 rounded-full mix-blend-multiply filter blur-2xl opacity-20 animate-blob animation-delay-4000"></div>
      {/* OTP Card */}
      <div className="z-10 flex flex-col items-center justify-center p-8 bg-white/10 backdrop-blur-xl rounded-2xl shadow-2xl border border-white/20 w-full max-w-md">
        {/* Heading */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-black mb-2">Enter the Code</h1>
          <p className="text-black text-base font-normal pb-3 pt-1">
            We sent a code to your email ({email}). Please enter it below to
            continue. <b>Also check in spam folder</b>
          </p>
        </div>

        {/* OTP Inputs */}
        <div className="flex justify-center py-4">
          <OtpInput
            value={otp}
            onChange={setOtp}
            numInputs={4}
            inputType="tel"
            containerStyle="relative flex gap-5"
            renderInput={(props, index) => (
              <input
                {...props}
                autoFocus={index === 0}
                style={{ width: "3rem" }}
                className="h-14 text-center text-white bg-white/10 border border-white/30 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all duration-300"
              />
            )}
          />
        </div>

        {/* Timer and Buttons */}
        <div className="w-full mt-6 flex flex-col gap-4">
          <p className="text-black/70 text-sm text-center">
            Code expires in{" "}
            <span className="font-semibold">
              {minutes}:{seconds}
            </span>
          </p>

          <button
            onClick={handleVerify}
            className="btn rounded-2xl bg-gradient-to-r from-blue-500 to-purple-600 text-white font-light text-lg hover:from-blue-600 hover:to-purple-700 border-none transition-colors shadow-sm py-6"
          >
            Verify
          </button>

          <button
            onClick={handleResend}
            className="btn bg-white/30 shadow-sm border border-white/30 text-black hover:bg-white/20 transition-all rounded-2xl py-6 font-light text-lg"
          >
            Resend Code
          </button>
        </div>
      </div>
    </div>
  );
}