"use client";
import { clearCompare, setCompare } from "@/redux/allSlice/compareSlice";
import { useGetCompareMutation } from "@/redux/Api/compare/compareApi";
import { useGetProductsQuery } from "@/redux/Api/product/productApi";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "sonner";
import GraphicsGrid from "../home/GraphicsGrid";
import CompareDetails from "./CompareDetails";
import CompareMobileCard from "./CompareMobileCard";

interface Product {
  id: string;
  name: string;
  image: string;
  categoryId: string;
}

interface ComparisonState {
  compareDetails: {
    product1: Product;
    product2: Product;
    specs: Array<{
      label: string;
      value1: string | number;
      value2: string | number;
    }>;
  } | null;
}

interface CompareError {
  data: {
    message: string;
  };
}

export default function CompareSection() {
  const { data: products } = useGetProductsQuery({});
  const [compare] = useGetCompareMutation();
  const dispatch = useDispatch();

  const [selectedProduct1, setSelectedProduct1] = useState<Product | null>(
    null
  );
  const [selectedProduct2, setSelectedProduct2] = useState<Product | null>(
    null
  );
  const [showComparison, setShowComparison] = useState(false);
  const [searchTerm1, setSearchTerm1] = useState("");
  const [searchTerm2, setSearchTerm2] = useState("");
  const [filteredProducts1, setFilteredProducts1] = useState<Product[]>([]);
  const [filteredProducts2, setFilteredProducts2] = useState<Product[]>([]);

  useEffect(() => {
    if (products?.data?.length >= 2) {
      setSelectedProduct1(products.data[0]);
      setSelectedProduct2(products.data[1]);
      handleCompare(products.data[0].id, products.data[1].id);
    }
  }, [products]);

  useEffect(() => {
    if (searchTerm1) {
      setFilteredProducts1(
        products?.data?.filter(
          (product: Product) =>
            product.name.toLowerCase().includes(searchTerm1.toLowerCase()) &&
            product.id !== selectedProduct2?.id // Remove selected product 2
        ) || []
      );
    } else {
      setFilteredProducts1([]);
    }
  }, [searchTerm1, selectedProduct2, products]);

  useEffect(() => {
    if (searchTerm2 && selectedProduct1) {
      const selectedCategory = selectedProduct1.categoryId;
      setFilteredProducts2(
        products?.data?.filter(
          (product: Product) =>
            product.categoryId === selectedCategory &&
            product.id !== selectedProduct1.id &&
            product.name.toLowerCase().includes(searchTerm2.toLowerCase())
        ) || []
      );
    } else {
      setFilteredProducts2([]);
    }
  }, [searchTerm2, selectedProduct1, products]);

  const handleCompare = async (productOne: string, productTwo: string) => {
    if (!productOne || !productTwo) {
      toast.error("Please select both products before comparing.");
      return;
    }

    if (productOne === productTwo) {
      toast.error("Please select different products to compare.");
      return;
    }

    dispatch(clearCompare());

    try {
      const response = await compare({ productOne, productTwo }).unwrap();

      if (response?.data) {
        dispatch(setCompare(response.data));
        // toast.success("Comparison data fetched successfully!");
        setShowComparison(true);
      } else {
        toast.error("No data found for comparison.");
      }
    } catch (error: CompareError | unknown) {
      const errorMessage =
        (error as CompareError).data?.message ||
        "Error fetching comparison data. Please try again later.";
      toast.error(errorMessage);
    }
  };

  const comparisonData = useSelector(
    (state: { compare: ComparisonState }) => state.compare
  );

  return (
    <div className="relative overflow-hidden pt-20 pb-16">
      <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8 pb-16 text-center">
        <h1 className="text-3xl md:text-5xl font-bold text-black dark:text-white mb-4">
          Compare everything
        </h1>
        <div className="lg:hidden block">
          <CompareMobileCard />
        </div>

        <div className="flex flex-col md:flex-row items-center justify-center gap-4 md:gap-8 mt-8">
          {/* Searchable Input for Product 1 */}
          <div className="relative w-full md:w-[280px]">
            <input
              type="text"
              value={selectedProduct1 ? selectedProduct1.name : searchTerm1}
              onChange={(e) => {
                setSearchTerm1(e.target.value);
                setSelectedProduct1(null); // Clear selection on typing
              }}
              placeholder="Search product 1"
              className="w-full h-[48px] px-4 py-3 dark:bg-[#FFFFFF1A] bg-slate-100 rounded-[8px] text-black dark:text-white cursor-pointer"
            />
            {filteredProducts1.length > 0 && searchTerm1 && (
              <ul className="absolute z-10 w-full bg-white dark:bg-[#1c1f26] border border-gray-300 dark:border-[#2a2d35] mt-1 rounded-md shadow-lg">
                {filteredProducts1.map((product) => (
                  <li
                    key={product.id}
                    onClick={() => {
                      setSelectedProduct1(product);
                      setSearchTerm1(""); // Clear search term to close the dropdown
                    }}
                    className="cursor-pointer px-4 py-2 hover:bg-gray-200 dark:hover:bg-gray-700"
                  >
                    {product.name}
                  </li>
                ))}
              </ul>
            )}
          </div>

          {/* VS Button */}
          <div className="lg:block hidden">
            <div
              className={`relative w-16 h-16 flex items-center justify-center ${
                !selectedProduct1 || !selectedProduct2
                  ? "opacity-50 cursor-not-allowed"
                  : "cursor-pointer"
              }`}
              onClick={() => {
                if (selectedProduct1 && selectedProduct2) {
                  handleCompare(selectedProduct1.id, selectedProduct2.id);
                }
              }}
            >
              <div className="relative hover:scale-[1.05] dark:bg-white/10 bg-gray text-white font-semibold rounded-full w-12 h-12 flex items-center justify-center border border-white/20">
                VS
              </div>
            </div>
          </div>

          {/* Searchable Input for Product 2 */}
          <div className="relative w-full md:w-[280px]">
            <input
              type="text"
              value={selectedProduct2 ? selectedProduct2.name : searchTerm2}
              onChange={(e) => {
                setSearchTerm2(e.target.value);
                setSelectedProduct2(null); // Clear selection on typing
              }}
              placeholder="Search product 2"
              disabled={!selectedProduct1}
              className="w-full h-[48px] px-4 py-3 dark:bg-[#FFFFFF1A] bg-slate-100 rounded-[8px] text-black dark:text-white disabled:opacity-50 cursor-pointer"
            />
            {filteredProducts2.length > 0 && searchTerm2 && (
              <ul className="absolute z-10 w-full bg-white dark:bg-[#1c1f26] border border-gray-300 dark:border-[#2a2d35] mt-1 rounded-md shadow-lg">
                {filteredProducts2.map((product) => (
                  <li
                    key={product.id}
                    onClick={() => {
                      setSelectedProduct2(product);
                      setSearchTerm2(""); // Clear search term to close the dropdown
                    }}
                    className="cursor-pointer px-4 py-2 hover:bg-gray-200 dark:hover:bg-gray-700"
                  >
                    {product.name}
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
        <div className="lg:hidden block ">
          <div className="flex justify-center bg-secondary py-2 rounded-lg text-white my-4 ">
            <button className=" px-5 "  onClick={() => {
                if (selectedProduct1 && selectedProduct2) {
                  handleCompare(selectedProduct1.id, selectedProduct2.id);
                }
              }}>Compare</button>
          </div>{" "}
        </div>
      </div>

      {showComparison && comparisonData?.compareDetails && <CompareDetails />}
      <GraphicsGrid />
    </div>
  );
}
