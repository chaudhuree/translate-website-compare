"use client";
import React from "react";
import { useSelector } from "react-redux";
import { ShoppingCart } from "lucide-react"; // Amazon-like icon

interface Benchmark {
  benchmarkName: string;
  score: number;
  maxScore: number;
}

interface Product {
  id: string;
  name: string;
  benchmarks: Benchmark[];
}

interface ComparisonData {
  product1: Product;
  product2: Product;
}

const BenchmarkCom = () => {
  const comparisonData = useSelector(
    (state: { compare: { compareDetails: ComparisonData } }) => state.compare.compareDetails
  );

  const calculatePercentage = (score: number, maxScore: number): number => {
    return maxScore ? Math.round((score / maxScore) * 100) : 0;
  };

  const product1 = comparisonData?.product1?.benchmarks || [];
  const product2 = comparisonData?.product2?.benchmarks || [];

  // Create a map of benchmarks for easy lookup
  const product1Map = new Map(product1.map((b) => [b.benchmarkName, b]));
  const product2Map = new Map(product2.map((b) => [b.benchmarkName, b]));

  // Collect all unique benchmark names
  const allBenchmarkNames = new Set([...product1Map.keys(), ...product2Map.keys()]);

  const combinedBenchmarks = Array.from(allBenchmarkNames).map((benchmarkName) => {
    const benchmark1 = product1Map.get(benchmarkName);
    const benchmark2 = product2Map.get(benchmarkName);

    return {
      benchmarkName,
      product1: benchmark1
        ? { score: benchmark1.score, percentage: calculatePercentage(benchmark1.score, benchmark1.maxScore) }
        : null,
      product2: benchmark2
        ? { score: benchmark2.score, percentage: calculatePercentage(benchmark2.score, benchmark2.maxScore) }
        : null,
    };
  });

  return (
    <div className="container mx-auto bg-[#FFFFFF0D] px-0 rounded-[8px] shadow-lg pb-8">
      {/* Header */}
      <h2 className="text-2xl font-semibold text-white bg-[#005A9C] text-center py-3 rounded-t-[8px]">
        Benchmark Results
      </h2>

      {/* Description */}
      <div className="px-6 bg-white dark:bg-[#0A0D13] py-4">
        <p className="text-black dark:text-white text-sm">
          Theoretical computing performance and real-world benchmark results for GPUs.
        </p>
      </div>

      {/* Benchmark Table */}
      <div className="px-6 py-4">
        {combinedBenchmarks.length > 0 ? (
          combinedBenchmarks.map((data, index) => (
            <div key={index} className="bg-white dark:bg-[#1A1F2A] shadow-md rounded-lg p-4 mb-4">
              {/* Benchmark Name */}
              <h3 className="text-lg font-semibold text-black dark:text-white mb-3">
                {data.benchmarkName}
              </h3>

              {/* Product 1 Benchmark */}
              {data.product1 && (
                <div className="mb-3 flex items-center gap-4">
                  {/* Amazon Icon */}
                  <div className="w-8 h-8 flex items-center justify-center bg-green-200 rounded-lg">
                    <ShoppingCart className="w-5 h-5 text-green-700" />
                  </div>

                  <div className="flex-1">
                    <p className="text-sm font-medium dark:text-white text-black mb-1">
                      {comparisonData?.product1?.name}
                    </p>
                    <div className="h-8 bg-slate-200 rounded-[4px] overflow-hidden relative">
                      <div
                        className="h-full rounded-[4px] flex items-center justify-end px-3 text-sm font-medium text-white"
                        style={{
                          width: `${data.product1.percentage}%`,
                          backgroundColor: "#4CAF50",
                        }}
                      >
                        {data.product1.score}
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Product 2 Benchmark */}
              {data.product2 && (
                <div className="flex items-center gap-4">
                  {/* Amazon Icon */}
                  <div className="w-8 h-8 flex items-center justify-center bg-green-200 rounded-lg">
                    <ShoppingCart className="w-5 h-5 text-green-700" />
                  </div>

                  <div className="flex-1">
                    <p className="text-sm font-medium dark:text-white text-black mb-1">
                      {comparisonData?.product2?.name}
                    </p>
                    <div className="h-8 bg-gray-300 rounded-[4px] overflow-hidden relative">
                      <div
                        className="h-full rounded-[4px] flex items-center justify-end px-3 text-sm font-medium text-white"
                        style={{
                          width: `${data.product2.percentage}%`,
                          backgroundColor: "#2196F3",
                        }}
                      >
                        {data.product2.score}
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          ))
        ) : (
          <div className="text-red-500 text-center py-4">
            <h1>No benchmarks available!</h1>
          </div>
        )}
      </div>
    </div>
  );
};

export default BenchmarkCom;
