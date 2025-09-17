'use client';


import { FaUsers, FaBolt, FaLock, FaHandsHelping } from "react-icons/fa";
import ThreeDCard from "./ThreeDCard";

export default function WhyChooseUs() {
  const features = [
    {
      title: "Strong Community",
      desc: "We connect people together to build a supportive and active community.",
      icon: <FaUsers size={30} className="text-blue-500" />,
      
    },
    {
      title: "Fast & Reliable",
      desc: "Our platform ensures speed and reliability at every step.",
      icon: <FaBolt size={30} className="text-yellow-400" />,
     
    },
    {
      title: "Secure Platform",
      desc: "Your data and privacy are protected with top security standards.",
      icon: <FaLock size={30} className="text-green-500" />,
      
    },
    {
      title: "Helping Hands",
      desc: "We are always ready to provide help and guidance whenever needed.",
      icon: <FaHandsHelping size={30} className="text-pink-500" />,
      
    }
  ];

  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-6 text-center">
        <h2 className="text-4xl font-bold mb-4">Why Choose Us</h2>
        <p className="text-gray-600 mb-12">
          Discover why people trust our platform for collaboration and growth.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, i) => (
            <ThreeDCard key={i} backgroundImage={feature.bg}>
              <div className="p-6 flex flex-col items-start text-left">
                <div className="mb-4">{feature.icon}</div>
                <h3 className="text-xl font-semibold text-blue-800">{feature.title}</h3>
                <p className="text-gray-800 text-sm mt-2">{feature.desc}</p>
              </div>
            </ThreeDCard>
          ))}
        </div>
      </div>
    </section>
  );
}
