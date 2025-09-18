"use client";

import React, { useEffect, useState } from "react";

function Testimonial2() {
  const [testimonials, setTestimonials] = useState([]);
  const [showAll, setShowAll] = useState(false);

  useEffect(() => {
    fetch("/data/reviews.json")
      .then((res) => res.json())
      .then((data) => setTestimonials(data));
  }, []);

  const anonymousFallbackImage =
    "https://placehold.co/48x48/6B7280/FFFFFF?text=AA";

  
  const visibleTestimonials = showAll
    ? testimonials
    : testimonials.slice(0, 4);

  return (
    <div className="font-sans flex flex-col items-center py-16 px-4 sm:px-6 lg:px-8">
      <h1 className="text-4xl  font-bold text-center max-w-4xl leading-tight mb-4 text-gray-900 ">
        Loved by community
      </h1>

      <p className="text-base sm:text-lg text-gray-600 dark:text-gray-400 text-center max-w-3xl mb-16">
        Hear directly from our users about their experience and how our platform helps them collaborate, grow, and succeed.
      </p>

      {/* Cards */}
      <div className="w-full max-w-7xl columns-1 sm:columns-2 lg:columns-4  gap-4 space-y-4">
        {visibleTestimonials.map((testimonial, index) => (
          <div
            key={index}
            className="bg-white p-6 rounded-xl shadow-md break-inside-avoid border border-gray-200 dark:border-gray-800"
          >
            <div className="flex items-center mb-4">
              <img
                src={testimonial.image}
                alt={testimonial.name}
                className="w-12 h-12 rounded-full object-cover mr-4"
                onError={(e) => {
                  const target = e.target;
                  target.onerror = null;
                  target.src = anonymousFallbackImage;
                }}
              />
              <div>
                <p className="font-semibold text-gray-900 ">
                  {testimonial.name}
                </p>
                <p className="text-sm text-gray-600 ">
                  {testimonial.title}
                </p>
              </div>
            </div>
            <p className="text-base text-gray-700  leading-relaxed">
              {testimonial.text}
            </p>
          </div>
        ))}
      </div>

      
      {testimonials.length > 4 && (
        <button
          onClick={() => setShowAll(!showAll)}
          className="mt-8 cursor-pointer px-6 py-2 shadow-md rounded-lg bg-primary text-white font-medium hover:bg-primary/90 transition"
        >
          {showAll ? "View Less" : "View More"}
        </button>
      )}
    </div>
  );
}

export default Testimonial2;
