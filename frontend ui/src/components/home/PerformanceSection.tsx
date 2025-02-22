import performance from "@/assets/perfomance.png";
import Image from "next/image";
import { GiCheckMark } from "react-icons/gi";
import { useTranslations } from "@/components/ClientLayout";

export default function PerformanceSection() {
  const { dict } = useTranslations();
  const features = [
    dict.home.performanceSection.features[0],
    dict.home.performanceSection.features[1],
    dict.home.performanceSection.features[2],
    dict.home.performanceSection.features[3],
    dict.home.performanceSection.features[4],
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
              {dict.home.performanceSection.title}
            </h2>

            <p className="text-gray-400 text-lg">
              {dict.home.performanceSection.description}
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
