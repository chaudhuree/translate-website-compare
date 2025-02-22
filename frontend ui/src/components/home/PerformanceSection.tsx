import performance from "@/assets/perfomance.png";
import Image from "next/image";
import { GiCheckMark } from "react-icons/gi";

export default function PerformanceSection() {
  const features = [
    "Synthetic Benchmark Results",
    "Real-World Gaming Performance",
    "Resolution-Based Analysis",
    "Overclocking Results",
    "Efficiency Metrics",
  ];

  return (
    <div className="px-5 pb-20">
      <div className="container mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left Column - Benchmark Image */}
          <div className="w-full">
            <Image
              src={performance}
              width={600}
              height={400}
              className="object-contain w-full h-auto"
              priority
              alt="Performance Benchmark"
            />
          </div>

          {/* Right Column - Content */}
          <div className="space-y-6">
            <h2 className="text-3xl sm:text-4xl font-bold dark:text-white">
              Performance You Can Trust
            </h2>

            <p className="text-gray-400 text-lg">
              Explore comprehensive benchmark results for a wide range of GPUs.
              This section provides detailed performance metrics from both
              synthetic benchmarks and real-world gaming tests cards.
            </p>

            {/* Feature List */}
            <div className="space-y-4">
              {features.map((feature, index) => (
                <div key={index} className="flex items-center gap-3">
                  <div className="">
                    <GiCheckMark className="w-4 h-4 text-blue-500 font-bold" />
                  </div>
                  <span className="text-gray-300">{feature}</span>
                </div>
              ))}
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}
