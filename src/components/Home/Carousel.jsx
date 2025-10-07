// components/Carousel.jsx
"use client";
import React, { useState, useEffect, useCallback } from 'react';
import { 
  FiChevronLeft, 
  FiChevronRight, 
  FiPlay,
  FiPause,
  FiStar
} from 'react-icons/fi';
import { 
  HiOutlineLightningBolt,
  HiOutlineChartBar,
  HiOutlineUsers,
  HiOutlineGlobe
} from 'react-icons/hi';
import Image from 'next/image';

const Carousel = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const [isAnimating, setIsAnimating] = useState(false);
  const [touchStart, setTouchStart] = useState(null);
  const [touchEnd, setTouchEnd] = useState(null);

  const slides = [
    {
      id: 1,
      title: "Streamline Your Workflow",
      description: "Manage projects effortlessly with our intuitive drag-and-drop interface and automated workflows.",
      image: "/images/carousel-1.jpg", // Replace with your actual images
      icon: HiOutlineLightningBolt,
      stats: "Save 15+ hours weekly",
      color: "from-blue-500 to-cyan-500",
      badge: "New Feature",
      cta: {
        primary: "Start Free Trial",
        secondary: "View Demo"
      }
    },
    {
      id: 2,
      title: "Real-time Collaboration",
      description: "Work together seamlessly with your team through integrated chat, comments, and live updates.",
      image: "/images/carousel-2.jpg",
      icon: HiOutlineUsers,
      stats: "10K+ teams connected",
      color: "from-purple-500 to-pink-500",
      badge: "Popular",
      cta: {
        primary: "Join Teams",
        secondary: "Learn More"
      }
    },
    {
      id: 3,
      title: "Advanced Analytics",
      description: "Gain deep insights into your team's performance with comprehensive dashboards and reports.",
      image: "/images/carousel-3.jpg",
      icon: HiOutlineChartBar,
      stats: "98% accuracy rate",
      color: "from-green-500 to-emerald-500",
      badge: "AI Powered",
      cta: {
        primary: "Explore Analytics",
        secondary: "See Reports"
      }
    },
    {
      id: 4,
      title: "Global Scale",
      description: "Scale your operations across multiple teams and timezones with enterprise-grade infrastructure.",
      image: "/images/carousel-4.jpg",
      icon: HiOutlineGlobe,
      stats: "99.9% uptime",
      color: "from-orange-500 to-red-500",
      badge: "Enterprise",
      cta: {
        primary: "Scale Up",
        secondary: "Contact Sales"
      }
    }
  ];

  const nextSlide = useCallback(() => {
    if (isAnimating) return;
    setIsAnimating(true);
    setCurrentSlide((prev) => (prev + 1) % slides.length);
    setTimeout(() => setIsAnimating(false), 500);
  }, [isAnimating, slides.length]);

  const prevSlide = useCallback(() => {
    if (isAnimating) return;
    setIsAnimating(true);
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
    setTimeout(() => setIsAnimating(false), 500);
  }, [isAnimating, slides.length]);

  const goToSlide = useCallback((index) => {
    if (isAnimating || index === currentSlide) return;
    setIsAnimating(true);
    setCurrentSlide(index);
    setTimeout(() => setIsAnimating(false), 500);
  }, [isAnimating, currentSlide]);

  // Touch handlers for mobile swipe
  const handleTouchStart = (e) => {
    setTouchStart(e.targetTouches[0].clientX);
  };

  const handleTouchMove = (e) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const handleTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > 50;
    const isRightSwipe = distance < -50;

    if (isLeftSwipe) {
      nextSlide();
    }
    if (isRightSwipe) {
      prevSlide();
    }

    setTouchStart(null);
    setTouchEnd(null);
  };

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'ArrowLeft') prevSlide();
      if (e.key === 'ArrowRight') nextSlide();
      if (e.key === ' ') setIsAutoPlaying(prev => !prev);
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [prevSlide, nextSlide]);

  // Auto-play effect
  useEffect(() => {
    if (!isAutoPlaying) return;

    const interval = setInterval(() => {
      nextSlide();
    }, 5000);

    return () => clearInterval(interval);
  }, [isAutoPlaying, nextSlide]);

  return (
    <section className="relative mx-auto bg-gradient-to-br from-gray-50 to-blue-50 dark:from-gray-900 dark:to-blue-900/20  shadow-2xl overflow-hidden">
      
      {/* Main Carousel Container */}
      <div 
        className="relative h-[600px] lg:h-[700px] overflow-hidden"
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        
        {/* Slides */}
        {slides.map((slide, index) => (
          <div
            key={slide.id}
            className={`absolute inset-0 transition-all duration-500 ease-in-out ${
              index === currentSlide
                ? 'opacity-100 translate-x-0'
                : index < currentSlide
                ? 'opacity-0 -translate-x-full'
                : 'opacity-0 translate-x-full'
            }`}
            aria-hidden={index !== currentSlide}
          >
            <div className="grid lg:grid-cols-2 h-full">
              
              {/* Content Side */}
              <div className="flex flex-col justify-center p-8 lg:p-12 space-y-6">
                
                {/* Badge */}
                <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-full border border-gray-200 dark:border-gray-700 w-fit">
                  <span className="text-sm font-semibold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                    {slide.badge}
                  </span>
                </div>

                {/* Title */}
                <h2 className="text-4xl lg:text-5xl xl:text-6xl font-bold tracking-tight">
                  <span className="bg-gradient-to-r from-gray-900 to-gray-700 dark:from-white dark:to-gray-300 bg-clip-text text-transparent">
                    {slide.title}
                  </span>
                </h2>

                {/* Description */}
                <p className="text-xl lg:text-2xl text-gray-600 dark:text-gray-400 leading-relaxed max-w-2xl">
                  {slide.description}
                </p>

                {/* Stats */}
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-2">
                    <slide.icon className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                    <span className="text-lg font-semibold text-gray-900 dark:text-white">
                      {slide.stats}
                    </span>
                  </div>
                </div>

                {/* CTA Buttons */}
                <div className="flex flex-col sm:flex-row gap-4 pt-4">
                  <button className="px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold rounded-2xl hover:shadow-2xl transition-all duration-300 hover:scale-105 transform focus:outline-none focus:ring-4 focus:ring-blue-500/20">
                    {slide.cta.primary}
                  </button>
                  <button className="px-8 py-4 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 font-semibold rounded-2xl hover:shadow-lg transition-all duration-300 transform focus:outline-none focus:ring-4 focus:ring-gray-500/20">
                    {slide.cta.secondary}
                  </button>
                </div>
              </div>

              {/* Image Side */}
              <div className="relative hidden lg:flex items-center justify-center p-8">
                <div className="relative w-full h-96">
                  {/* Mockup Device */}
                  <div className="absolute inset-0 bg-gradient-to-br from-white to-gray-100 dark:from-gray-800 dark:to-gray-700 rounded-3xl shadow-2xl border border-gray-200 dark:border-gray-600 transform rotate-3">
                    
                    {/* Device Header */}
                    <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-600">
                      <div className="flex items-center gap-2">
                        <div className="w-3 h-3 bg-red-400 rounded-full"></div>
                        <div className="w-3 h-3 bg-yellow-400 rounded-full"></div>
                        <div className="w-3 h-3 bg-green-400 rounded-full"></div>
                      </div>
                      <div className="text-sm font-semibold text-gray-700 dark:text-gray-300">
                        OneOrbit Dashboard
                      </div>
                      <div className="w-6"></div>
                    </div>

                    {/* Mock Content */}
                    <div className="p-6 space-y-4">
                      {/* Progress Bars */}
                      {[70, 85, 60].map((percent, idx) => (
                        <div key={idx} className="space-y-2">
                          <div className="flex justify-between text-sm text-gray-600 dark:text-gray-400">
                            <span>Project {idx + 1}</span>
                            <span>{percent}%</span>
                          </div>
                          <div className="w-full bg-gray-200 dark:bg-gray-600 rounded-full h-2">
                            <div 
                              className={`h-2 rounded-full bg-gradient-to-r ${slide.color}`}
                              style={{ width: `${percent}%` }}
                            ></div>
                          </div>
                        </div>
                      ))}

                      {/* Team Avatars */}
                      <div className="flex justify-between items-center pt-4">
                        <div className="flex -space-x-2">
                          {[1, 2, 3, 4].map((item) => (
                            <div 
                              key={item}
                              className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full border-2 border-white dark:border-gray-800 flex items-center justify-center text-white text-xs font-bold"
                            >
                              {item}
                            </div>
                          ))}
                        </div>
                        <div className="text-sm text-gray-500 dark:text-gray-400">
                          Active now
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Floating Elements */}
                  <div className="absolute -top-4 -right-4 bg-green-500 text-white px-4 py-2 rounded-2xl shadow-lg transform rotate-6">
                    <div className="flex items-center gap-2 text-sm font-semibold">
                      <FiStar className="w-4 h-4" />
                      Trending
                    </div>
                  </div>

                  <div className="absolute -bottom-4 -left-4 bg-white dark:bg-gray-800 backdrop-blur-sm rounded-2xl shadow-lg p-4 border border-gray-200 dark:border-gray-700 transform -rotate-6">
                    <div className="text-center">
                      <div className="font-bold text-2xl text-gray-900 dark:text-white">45%</div>
                      <div className="text-xs text-gray-500">Efficiency Gain</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}

        {/* Navigation Arrows */}
        <button
          onClick={prevSlide}
          className="absolute left-4 top-1/2 transform -translate-y-1/2 w-12 h-12 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border border-gray-200 dark:border-gray-700 rounded-full flex items-center justify-center hover:scale-110 transition-all duration-300 shadow-lg z-10 focus:outline-none focus:ring-4 focus:ring-blue-500/20"
          aria-label="Previous slide"
        >
          <FiChevronLeft className="w-6 h-6 text-gray-700 dark:text-gray-300" />
        </button>

        <button
          onClick={nextSlide}
          className="absolute right-4 top-1/2 transform -translate-y-1/2 w-12 h-12 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border border-gray-200 dark:border-gray-700 rounded-full flex items-center justify-center hover:scale-110 transition-all duration-300 shadow-lg z-10 focus:outline-none focus:ring-4 focus:ring-blue-500/20"
          aria-label="Next slide"
        >
          <FiChevronRight className="w-6 h-6 text-gray-700 dark:text-gray-300" />
        </button>

        {/* Play/Pause Button */}
        <button
          onClick={() => setIsAutoPlaying(!isAutoPlaying)}
          className="absolute top-4 right-4 w-10 h-10 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border border-gray-200 dark:border-gray-700 rounded-full flex items-center justify-center hover:scale-110 transition-all duration-300 shadow-lg z-10 focus:outline-none focus:ring-4 focus:ring-blue-500/20"
          aria-label={isAutoPlaying ? "Pause carousel" : "Play carousel"}
        >
          {isAutoPlaying ? (
            <FiPause className="w-4 h-4 text-gray-700 dark:text-gray-300" />
          ) : (
            <FiPlay className="w-4 h-4 text-gray-700 dark:text-gray-300" />
          )}
        </button>
      </div>

      {/* Progress Bar */}
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 w-48 h-1 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
        <div 
          className="h-full bg-gradient-to-r from-blue-600 to-purple-600 transition-all duration-1000 ease-out"
          style={{ width: `${((currentSlide + 1) / slides.length) * 100}%` }}
        ></div>
      </div>

      {/* Dots Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex items-center gap-3 z-10">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`w-3 h-3 rounded-full transition-all duration-300 focus:outline-none focus:ring-4 focus:ring-blue-500/20 ${
              index === currentSlide
                ? 'bg-gradient-to-r from-blue-600 to-purple-600 scale-125'
                : 'bg-gray-300 dark:bg-gray-600 hover:bg-gray-400 dark:hover:bg-gray-500'
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>

      {/* Slide Counter */}
      <div className="absolute bottom-8 right-8 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm px-4 py-2 rounded-full border border-gray-200 dark:border-gray-700 text-sm font-semibold text-gray-700 dark:text-gray-300">
        {currentSlide + 1} / {slides.length}
      </div>
    </section>
  );
};

export default Carousel;