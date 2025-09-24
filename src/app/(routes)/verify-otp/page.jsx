"use client";
import { useState } from "react";
import OtpInput from "react-otp-input";

export default function VerifyOTP() {
  const [otp, setOtp] = useState("");

  const handleChange = (value) => {
    setOtp(value);
  };

  const handleVerify = () => {
    alert(`OTP entered: ${otp}`);
  };

  return (
    <div className="flex flex-col w-full max-w-[512px] flex-1 mx-auto min-h-screen pt-20">
      <h2 className="text-3xl font-bold text-center pb-3">Enter the code</h2>
      <p className="text-base font-normal pb-3 pt-1 text-center">
        We sent a verification code to your email. Please enter it below to
        continue.
      </p>

      {/* OTP fields */}
      <div className="flex justify-center px-4 pt-4 mb-10">
        <OtpInput
          value={otp}
          onChange={handleChange}
          numInputs={4} // number of OTP boxes
          inputType="tel"
          renderInput={(props) => (
            <input
              {...props}
              autoFocus
              className="flex h-14 w-12 text-center focus:outline-none border-0 border-b-2 border-secondary focus:border-primary text-3xl font-normal"
            />
          )}
          containerStyle="relative flex gap-16"
        />
      </div>

      <div className="flex flex-col-reverse sm:flex-row justify-center gap-3 py-3 max-w-[200px] mx-auto">
        <button className="btn btn-secondary text-black w-full">
          Resend Code
        </button>
        <button onClick={handleVerify} className="btn btn-primary w-full">
          Verify
        </button>
      </div>

      <p className="text-primary text-sm pt-5 text-center">
        Code expires in 00:59
      </p>
    </div>
  );
}
