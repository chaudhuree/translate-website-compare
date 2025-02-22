import product1 from "@/assets/products/product1.png";
import Image, { StaticImageData } from "next/image";
import React from "react";

type BenchmarkData = {
  id: number;
  benchmark: {
    name: string;
    description: string;
  };

  score: number;
  maxScore: number;
  image: StaticImageData;
};

const BenchmarkCard: React.FC<{ data: BenchmarkData }> = ({ data }) => {
  // Calculate the percentage for the progress bar
  const percentage = (data.score / data.maxScore) * 100;

  return (
    <div className="flex items-center gap-4 mb-6">
      <div className="flex items-center gap-4 w-1/2">
        <Image
          src={data?.image || product1}
          alt={"benchmark image"}
          width={56}
          height={56}
          className="object-contain"
        />
        <div className="flex flex-col">
          <h3 className="text-white text-sm font-medium">
            {data?.benchmark?.name || "N/A"}
          </h3>
          <p className="text-gray text-sm">
            {data?.benchmark?.description.slice(0,100) || "N/A"}
          </p>
        </div>
      </div>
      <div className="flex-1 h-8 bg-slate-100 rounded-[4px] overflow-hidden w-1/2">
        <div
          className="h-full rounded-[4px] transition-all duration-500 flex items-center px-3 text-sm text-white font-medium"
          style={{
            width: `${percentage}%`,
            backgroundColor: percentage > 50 ? "#4CAF50" : "#2196F3",
          }}
        >
          {data.score}
        </div>
      </div>
    </div>
  );
};

export default BenchmarkCard;
