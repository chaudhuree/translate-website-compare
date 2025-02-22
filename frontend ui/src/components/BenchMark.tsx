import Image from "next/image";

export default function Benchmark() {
    return (
   <div className="dark:bg-primary bg-white">
       <div className="container">
        {/* Header */}
        <div className="bg-[#4C6EF5] text-white p-3 -mx-4 -mt-4 rounded-t-lg">
          <h1 className="text-xl font-normal">Benchmark results</h1>
        </div>
  
        {/* Content */}
        <div className="mt-6 space-y-6">
          {/* 3DMark Section */}
          <div>
            <h2 className="text-[#4C6EF5] text-lg font-normal mb-2">3DMark Benchmark (DirectX, Raytracing)</h2>
            <p className="text-gray-300 text-sm leading-relaxed">
              3DMark is a benchmark program that determines the performance of certain components of a computer and then
              reports the performance as a numerical value.
            </p>
          </div>
  
          {/* Time Spy Section */}
          <div>
            <h3 className="text-white text-lg font-normal mb-4">Time Spy Extreme Graphics score</h3>
  
            {/* First GPU */}
            <div className="flex items-start gap-4 mb-4">
              <Image
                src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/%7B873BB02B-FDBE-4D73-859A-BB00B4A1C2DF%7D-xlDRVpxweX87X463N8JswuRrumTka4.png"
                alt="NVIDIA GeForce GTX 960"
                className="w-16 h-16 object-cover"
              />
              <div className="flex-1">
                <div className="mb-2">
                  <h4 className="text-white font-normal">NVIDIA GeForce GTX 960</h4>
                  <p className="text-gray-400 text-sm">2 GB GDDR5</p>
                </div>
                <div className="relative h-8 bg-gray-700 rounded">
                  <div className="absolute inset-y-0 left-0 bg-[#2EA043] rounded w-[85%]"></div>
                  <span className="absolute right-2 top-1/2 -translate-y-1/2 text-white">1017</span>
                </div>
              </div>
            </div>
  
            {/* Second GPU */}
            <div className="flex items-start gap-4">
              <Image
                src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/%7B873BB02B-FDBE-4D73-859A-BB00B4A1C2DF%7D-xlDRVpxweX87X463N8JswuRrumTka4.png"
                alt="NVIDIA GeForce GTX 960"
                className="w-16 h-16 object-cover"
              />
              <div className="flex-1">
                <div className="mb-2">
                  <h4 className="text-white font-normal">NVIDIA GeForce GTX 960</h4>
                  <p className="text-gray-400 text-sm">2 GB GDDR5</p>
                </div>
                <div className="relative h-8 bg-gray-700 rounded">
                  <div className="absolute inset-y-0 left-0 bg-[#4C6EF5] rounded w-[71%]"></div>
                  <span className="absolute right-2 top-1/2 -translate-y-1/2 text-white">852</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
   </div>
    )
  }
  
  