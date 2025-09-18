"use client";
import React from "react";
import Swal from "sweetalert2";
import Lottie from "lottie-react";

const NewsletterSection = () => {
  const handleSubmit = (e) => {
    e.preventDefault();
    Swal.fire({
      title: "Subscribed!",
      text: "You have successfully subscribed to our newsletter.",
      icon: "success",
      confirmButtonColor: "#064232",
    });
  };

  return (
    <section className="bg-white py-12 px-4">
      <div className="max-w-4xl mx-auto flex flex-col md:flex-row items-center gap-10">
        <div className="w-full md:w-1/2 flex justify-center">
          <Lottie
            animationData={require("../../../public/newsletter.json")}
            loop={true}
            className="w-64 h-64 sm:w-80 sm:h-80 md:w-96 md:h-96 lg:w-[500px] lg:h-[500px]"
          />
        </div>
        <div className="w-full md:w-1/2">
          <h2 className="text-3xl font-bold mb-4 text-[#064232]">
            Stay Updated!
          </h2>
          <p className="mb-6 text-gray-700 text-base">
            Subscribe to our newsletter for the latest updates on project
            management, team collaboration tips, and new features in One-Orbit.
          </p>
          <form
            className="flex flex-col sm:flex-row gap-3"
            onSubmit={handleSubmit}
          >
            <input
              type="email"
              required
              placeholder="Enter your email"
              className="px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#064232] flex-1"
            />
            <button
              type="submit"
              className="bg-[#064232] text-white px-6 py-3 rounded-lg font-semibold hover:bg-[#07694b] transition"
            >
              Subscribe
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default NewsletterSection;
