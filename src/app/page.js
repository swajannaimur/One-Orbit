import Image from "next/image";
import Footer from "./homepagesections/footer";
import FaqSection from "./HomePageSections/FaqSection";


export default function Home() {
  return (
    <div>
      <h1 className="text-3xl font-bold underline">Hello, One-Orbit!</h1>
      <FaqSection />
      <Footer />
    </div>
  );
}
