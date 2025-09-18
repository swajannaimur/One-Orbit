"use client";

import Testimonial2 from "@/component/Reviews";
import WhyChooseUs from "@/component/WhyChoseUs";
import Image from "next/image";
import Footer from "./homepagesections/footer";
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
      <Footer />
    </div>
  );
}
