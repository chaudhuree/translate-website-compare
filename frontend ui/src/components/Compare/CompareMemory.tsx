import React from "react";
import SpecCard from "./SpeceCard";

const gpuSpecs = [
  { value: "2 GB", label: "Memory Size", value2: "2 GB" },
  { value: "GDDR5", label: "Memory Type", value2: "GDDR5" },
  { value: "1.753 GHz", label: "Memory Clock", value2: "1.753 GHz" },
  { value: "7.0 Gbps", label: "Memory Speed", value2: "7.0 Gbps" },
  { value: "112 GB/s", label: "Memory Bandwidth", value2: "112 GB/s" },
  { value: "128 bit", label: "Memory Interface", value2: "256 bit" },
];

const CompareMemory = () => {
  return (
    <div className="p-6">
      <SpecCard title="Memory" specs={gpuSpecs} />
    </div>
  );
};

export default CompareMemory;
