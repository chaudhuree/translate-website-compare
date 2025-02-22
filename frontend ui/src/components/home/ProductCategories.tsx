import { useCategoriesQuery } from "@/redux/Api/category/categoryApi";
import { Category } from "@/types/Article";
import { Cpu, HardDrive, Zap, CircuitBoard } from "lucide-react";
import Link from "next/link";

export const categoriesIcon = [
  { icon: <Cpu className="w-8 h-8" /> },
  { icon: <Cpu className="w-8 h-8" /> },
  { icon: <HardDrive className="w-8 h-8" /> },
  { icon: <Zap className="w-8 h-8" /> },
  { icon: <CircuitBoard className="w-8 h-8" /> },
];

// Function to get a random icon
const getRandomIcon = () => {
  const randomIndex = Math.floor(Math.random() * categoriesIcon.length);
  return categoriesIcon[randomIndex].icon;
};

export default function ProductCategories() {
  const { data } = useCategoriesQuery({});

  return (
    <div className="min-h-screen lg:py-20 py-10 px-4">
      <div className="container mx-auto">
        {/* Header Section */}
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-black dark:text-white mb-4">
            Explore Our Categories
          </h2>
          <p className="dark:text-grey text-gray max-w-2xl mx-auto">
            Discover a wide range of products tailored to meet your needs. From
            the latest innovations to timeless essentials, find what you&apos;re
            looking for in one place.
          </p>
        </div>

        {/* Categories Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {data?.data?.map((category: Category, index: number) => (
            <Link key={category.id} href={`/products?categoryId=${category.id}`} passHref>
              <div
                className={`
                  relative group
                  ${index > 2 ? "lg:col-span-1.5" : ""}
                  dark:bg-[#4D6BDD1A] rounded-xl p-8
                  border border-[#4D6BDD1A] hover:border-blue-500/50
                  transition-all duration-300
                  flex flex-col items-center text-center
                  cursor-pointer
                  shadow-lg hover:shadow-blue-500/10
                `}
              >
                {/* Icon Container */}
                <div className="dark:bg-[#4D6BDD33] bg-slate-50 rounded-[8px] w-20 h-20 flex items-center justify-center mx-auto mb-4 drop-shadow-md">
                  <div className="dark:text-white group-hover:text-blue-300 transition-colors">
                    {getRandomIcon()} {/* Display a random icon here */}
                  </div>
                </div>

                {/* Content */}
                <h3 className="text-xl font-semibold dark:text-white mb-2">
                  {category.name}
                </h3>
                <p className="text-gray-400 text-sm">{category.description.slice(0,60)}</p>

                {/* Hover Effect Overlay */}
                <div className="absolute inset-0 rounded-xl bg-gradient-to-b from-blue-500/0 to-blue-500/5 opacity-0 group-hover:opacity-100 transition-opacity" />
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
