"use client";


import FaqSection from "../components/Home/FaqSection";
import HeroSection from "../components/Home/HeroSection";
import NewsletterSection from "../components/Home/NewsletterSection";
import Testimonial2 from "../components/Home/Reviews";
import WhyChooseUs from "../components/Home/WhyChoseUs";
export default function Home() {
  return (
    <div>

      <HeroSection />
      <WhyChooseUs />
      <Testimonial2 />
      <FaqSection />
      <NewsletterSection />

    </div>
  );
}
