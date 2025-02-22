const ArticleSkeleton = () => {
  return (
    <div className="bg-[#0E1527] rounded-xl overflow-hidden">
      <div className="relative h-48 bg-gray-300 animate-pulse">
        <div className="w-full h-full bg-gray-500 rounded-md"></div>
      </div>

      <div className="p-6 flex flex-col">
        <div className="flex items-center justify-between mb-4">
          <div className="w-1/3 h-4 bg-gray-400 rounded animate-pulse"></div>
          <div className="flex items-center text-gray-400 text-sm">
            <div className="w-4 h-4 bg-gray-400 rounded animate-pulse mr-2"></div>
            <div className="w-16 h-4 bg-gray-400 rounded animate-pulse"></div>
          </div>
        </div>

        <div className="w-full h-6 bg-gray-400 rounded animate-pulse mb-3"></div>

        <div className="w-full h-4 bg-gray-400 rounded animate-pulse mb-6"></div>

        <div className="w-full h-6 bg-gray-400 rounded animate-pulse mt-auto"></div>
      </div>
    </div>
  );
};

export default ArticleSkeleton;
