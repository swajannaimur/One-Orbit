"use client";

import Carousel from "@/components/Home/Carousel";
import FaqSection from "@/components/Home/FaqSection";
import HeroSection from "@/components/Home/HeroSection";
import Reviews from "@/components/Home/Reviews";
import WhyChooseUs from "@/components/Home/WhyChoseUs";

export default function Home() {
	return (
		<div>
			<HeroSection />
			<Carousel />
			<WhyChooseUs />
			<FaqSection />
			<Reviews />
		</div>
	);
}
