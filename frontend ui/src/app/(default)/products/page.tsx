"use client";
import { useSearchParams } from "next/navigation";
import FilterProducts from "@/components/products/FileterProducts";
import FilterHeader from "@/components/products/FilterHeader";
import { useGetFilterQuery } from "@/redux/Api/filter/brandApi";
import { useState, useEffect, useCallback } from "react";

// Define the types
interface FilterParams {
  categoryId?: string;
  brandId?: string;
  minPrice?: string;
  maxPrice?: string;
  searchTerm?: string;
}

export default function ProductsPage() {
  const searchParams = useSearchParams();
  const categoryIdFromUrl = searchParams.get("categoryId") || ""; // Read categoryId from URL
  const brandIdFromUrl = searchParams.get("brandId") || ""; // Read brandId from URL

  const [filterParams, setFilterParams] = useState<FilterParams>({
    categoryId: categoryIdFromUrl,
    brandId: brandIdFromUrl,
    minPrice: "",
    maxPrice: "",
    searchTerm: "",
  });

  // Ensure `categoryId` and `brandId` update only when they actually change
  useEffect(() => {
    setFilterParams((prev) => ({
      ...prev,
      categoryId: categoryIdFromUrl || prev.categoryId,
      brandId: brandIdFromUrl || prev.brandId,
    }));
  }, [categoryIdFromUrl, brandIdFromUrl]);

  // Fetch products based on filters
  const { data: filteredProducts, isLoading: filterLoading } = useGetFilterQuery(filterParams);

  // Stable function to handle filter changes
  const handleFilterChange = useCallback((newParams: Partial<FilterParams>) => {
    setFilterParams((prev) => ({
      ...prev,
      ...newParams,
      categoryId: newParams.categoryId ?? prev.categoryId, // Ensure categoryId is not removed
      brandId: newParams.brandId ?? prev.brandId, // Ensure brandId is not removed
    }));
  }, []);

  return (
    <div className="dark:bg-[#0a0d13] bg-white min-h-screen">
      <FilterHeader onFilterChange={handleFilterChange} />
      <div className="container mx-auto px-4 py-8">
        <FilterProducts products={filteredProducts} isLoading={filterLoading} />
      </div>
    </div>
  );
}
