import compareGpu from "@/assets/comparegpu.png";
import Image from "next/image";
import { useRef } from "react";
import FeatureGraphicsCard from "./home/FeatureGrapicsCard";

export default function HomeCompare() {
  const featureRef = useRef<HTMLDivElement>(null);

  const scrollToFeature = () => {
    if (featureRef.current) {
      featureRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };
  return (
    <section className=" dark:bg-primary bg-white py-20">
      <div className="container ">
        <div className="grid lg:grid-cols-2 gap-8 items-center">
          {/* Left Content */}
          <div className="space-y-6">
            <h1 className="text-3xl md:text-4xl lg:text-5xl text-black dark:text-white font-bold leading-tight">
              Compare and Choose the Best Hardware
            </h1>
            <p className="text-black dark:text-white text-lg">
              Easily compare the specifications and performance metrics of your
              favorite GPUs. Make informed decisions for your gaming, creative,
              or professional needs with detailed side-by-side comparisons.
            </p>

            {/* Feature List */}
            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-gray-300 text-lg">
              {[
                "Comprehensive Specs",
                "Performance Metrics",
                "Custom Filters",
                "Multi-GPU Comparison",
                "User-Friendly Interface",
              ].map((feature) => (
                <li key={feature} className="flex items-center  space-x-2">
                  <svg
                    className="w-5 h-5 text-blue-400"
                    fill="none"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="text-black dark:text-white">{feature}</span>
                </li>
              ))}
            </ul>

            {/* CTA Button */}
            <button
              onClick={scrollToFeature}
              className="flex items-center justify-center gap-2 w-[180px] h-[48px] px-4 py-2 bg-[#4D6BDD] text-white rounded-[8px] shadow-[0px_0px_20px_0px_rgba(255,255,255,0.30)] cursor-pointer transition-all duration-300 hover:opacity-80"
            >
              View Products
            </button>
          </div>

          {/* Right Content - GPU Comparison Image */}
          <div className="relative">
            <div className="flex items-center justify-center gap-4">
              <Image
                src={compareGpu}
                alt="GPU Comparison"
                width={629}
                height={400}
              />
            </div>

            {/* Decorative Background Elements */}
            <div className="absolute inset-0 bg-blue-500/10 blur-3xl rounded-full -z-10" />
            <div className="absolute inset-0 bg-purple-500/10 blur-3xl rounded-full -z-10 translate-x-1/2" />
          </div>
        </div>
      </div>
     <div className="pt-20">
     <FeatureGraphicsCard ref={featureRef} />
     </div>
    </section>
  );
}
