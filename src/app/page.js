"use client";

import Testimonial2 from "@/component/Reviews";
import WhyChooseUs from "@/component/WhyChoseUs";
import FaqSection from "./HomePageSections/FaqSection";
import NewsletterSection from "./HomePageSections/NewsletterSection";
import HeroSection from "@/components/HeroSection/HeroSection";

export default function Home() {
  return (
    <div>
      <HeroSection/>
      <WhyChooseUs/>
      <Testimonial2/>    
      <FaqSection />
      <NewsletterSection />
      
    </div>
  );
}
