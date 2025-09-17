import Image from "next/image";
import Footer from "./homepagesections/footer";
import FaqSection from "./HomePageSections/FaqSection";
import NewsletterSection from "./HomePageSections/NewsletterSection";


export default function Home() {
  return (
    <div>
      <h1 className="text-3xl font-bold underline">Hello, One-Orbit!</h1>
      <NewsletterSection />
      <FaqSection />
      <Footer />
    </div>
  );
}
