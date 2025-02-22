"use client";
import { useGetProductsBenchmarkQuery } from "@/redux/products/productsApi";
import { StaticImageData } from "next/image";
import { useParams } from "next/navigation";
import BenchmarkCard from "./BenchMarkCard";

interface BenchmarkData {
  id: number;
  benchmark: {
    name: string;
    description: string;
  };
  name: string;
  videoMemory: string;
  score: number;
  maxScore: number;
  image: StaticImageData;
}

// const benchmarkData = [
//   {
//     id: 1,
//     name: 'NVIDIA GeForce GTX 960',
//     videoMemory: '2 GB GDDR5',
//     score: 1017,
//     maxScore: 5000,
//     image: product1, // Path to image
//   },
//   {
//     id: 2,
//     name: 'NVIDIA GeForce GTX 960',
//     videoMemory: '2 GB GDDR5',
//     score: 852,
//     maxScore: 5000,
//     image: product1, // Path to image
//   },
// ];

const BenchmarkCompare = () => {
  const params = useParams();
  const id = params?.id;
  const { data: benchMarkData } = useGetProductsBenchmarkQuery(id);
  const productBenchData = benchMarkData?.data;

  return (
    <div className="container mx-auto shadow-md dark:bg-[#FFFFFF0D] px-0 rounded-[8px] pb-8 mb-20">
      <h2 className="text-3xl font-semibold text-white bg-secondary text-center py-2 rounded-t-[8px] mb-5">
        Benchmark results
      </h2>
      <div className="px-6">
        <p className="text-start text-secondary mb-12 text-[28px]">
          3DMark Benchmark (DirectX, Raytracing)
          <br />
          <p className="dark:text-white text-black text-base">
            3DMark is a benchmark program that determines the performance of
            certain components of a computer and then reports the performance as
            a numerical value.
          </p>
        </p>
        <h3 className="text-xl font-semibold dark:text-white text-black mb-4">
          Time Spy Extreme Graphics score
        </h3>
      </div>
      <div className="px-6">
        {productBenchData?.length > 0 ? (
          productBenchData?.map((data: BenchmarkData) => (
            <BenchmarkCard key={data.id} data={data} />
          ))
        ) : (
          <div className="text-red-500">
            <h1>Not available benchmark!</h1>
          </div>
        )}
      </div>
    </div>
  );
};

export default BenchmarkCompare;
