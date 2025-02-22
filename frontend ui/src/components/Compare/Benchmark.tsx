import React from "react";
import SpecCard from "./SpeceCard";

const gpuSpecs = [
  { value: "16 GB", label: "Video Memory", value2: "16 GB" },
  { value: "280W", label: "Power Consumption", value2: "320W" },
  { value: "86", label: "Efficiency", value2: "89" },
  { value: "2024", label: "Release Date", value2: "2025" },
  { value: "502 $", label: "MSRP", value2: "999 $" },
  { value: "24426", label: "3DMark Performance", value2: "28531" },
];

const Benchmark = () => {
  return (
    <div className="p-6">
      <SpecCard title="Benchmark Timestamps" specs={gpuSpecs} />
    </div>
  );
};

export default Benchmark;
