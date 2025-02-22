import React from "react";

export default function Compare() {
  return (
    <div className=" relative overflow-hidden pt-[60px] lg:pt-[200px]">
      {" "}
      {/* Comparison Section */}
      <div className="flex flex-col md:flex-row items-center justify-center gap-4 md:gap-8">
        {/* Left Input */}
        <div className="relative w-full md:w-auto">
          <input
            type="text"
            placeholder="enter your product name"
            className="w-full md:w-[280px] px-4 py-3 bg-[#FFFFFF1A] backdrop-blur-[20px] rounded-[8px] text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* VS Circle */}
        <div className="relative w-16 h-16 flex items-center justify-center">
          <div className="absolute inset-0 bg-blue-500/20 rounded-full blur-md" />
          <div className="relative bg-white/10 backdrop-blur-sm text-white font-semibold rounded-full w-12 h-12 flex items-center justify-center border border-white/20">
            VS
          </div>
        </div>

        {/* Right Input */}
        <div className="relative w-full md:w-auto">
          <input
            type="text"
            placeholder="enter your product name"
            className="w-full md:w-[280px] px-4 py-3 bg-[#FFFFFF1A] backdrop-blur-[20px] rounded-[8px] text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
      </div>
    </div>
  );
}
