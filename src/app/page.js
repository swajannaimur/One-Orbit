"use client";
import Footer from "./homepagesections/footer";
import FaqSection from "./HomePageSections/FaqSection";
import NewsletterSection from "./HomePageSections/NewsletterSection";
import HeroSection from "@/components/HeroSection/HeroSection";


export default function Home() {
  return (
    <div>
      <HeroSection/>
      <NewsletterSection />
      <FaqSection />
      <Footer />
    </div>
  );
}
