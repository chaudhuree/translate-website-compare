import Image from "next/image";
import { useSelector } from "react-redux";

// Define the types for the product and comparison data
interface Product {
  id: string;
  name: string;
  image: string;
}

interface ComparisonData {
  product1: Product;
  product2: Product;
}

const CompareCard = () => {
  // Get comparison data from Redux store with proper types
  const comparisonData = useSelector((state: { compare: { compareDetails: ComparisonData } }) => state.compare.compareDetails);

  console.log("Comparison Data:", comparisonData); // Debug the comparisonData

  // Ensure both products exist
  if (!comparisonData?.product1 || !comparisonData?.product2) {
    return null;
  }

  return (
    <div className="container mx-auto lg:block hidden ">
      <div className="flex flex-row justify-center items-center gap-10 lg:gap-[229px] md:gap-12 p-6">
        {/* Render each product's details */}
        <div key={comparisonData.product1.id} className="bg-[#FFFFFF1A] rounded-[8px] shadow-lg p-4">
          <Image
            src={comparisonData.product1.image}
            alt={comparisonData.product1.name}
            className="w-full h-[180px] object-contain rounded-[8px] mb-4"
            width={180}
            height={180}
          />
          <div className="text-center dark:text-white text-black">
            <h3 className="text-xl font-semibold mb-2">{comparisonData.product1.name}</h3>
          </div>
        </div>

        <div key={comparisonData.product2.id} className="bg-[#FFFFFF1A] rounded-[8px] shadow-lg p-4">
          <Image
            src={comparisonData.product2.image}
            alt={comparisonData.product2.name}
            className="w-full h-[180px] object-contain rounded-[8px] mb-4"
            width={180}
            height={180}
          />
          <div className="text-center dark:text-white text-black">
            <h3 className="text-xl font-semibold mb-2">{comparisonData.product2.name}</h3>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CompareCard;
