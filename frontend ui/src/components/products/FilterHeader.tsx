"use client"

import { useGetBrandsQuery, useGetCategoryQuery } from "@/redux/Api/filter/brandApi"
import { useState, useEffect, useCallback } from "react"
import { ChevronDown, Filter, RefreshCw } from "lucide-react"
import { FilterDropdown } from "./FilterDropdown"

// Define the type for Brand and Category
interface Brand {
  id: string
  name: string
}

interface Category {
  id: string
  name: string
}

// Define the types for FilterHeader props
interface FilterHeaderProps {
  onFilterChange: (filters: Record<string, string>) => void
}

export default function FilterHeader({ onFilterChange }: FilterHeaderProps) {
  // Get brands and categories data from the API queries
  const { data: brandsData } = useGetBrandsQuery({})
  const { data: categoriesData } = useGetCategoryQuery({})

  const [selectedBrand, setSelectedBrand] = useState<string>("")
  const [selectedCategory, setSelectedCategory] = useState<string>("")
  const [minPrice, setMinPrice] = useState<string>("")
  const [maxPrice, setMaxPrice] = useState<string>("")

  // Handle filter change callback
  const handleFilterChange = useCallback(() => {
    const filters: Record<string, string> = {
      ...(selectedBrand && { brandId: selectedBrand }),
      ...(selectedCategory && { categoryId: selectedCategory }),
      ...(minPrice && { minPrice }),
      ...(maxPrice && { maxPrice }),
    }

    if (Object.keys(filters).length > 0) {
      onFilterChange(filters)
    } else {
      onFilterChange({}) // Reset when no filters are selected
    }
  }, [selectedBrand, selectedCategory, minPrice, maxPrice, onFilterChange])

  // Trigger filter change on mount or when filter values change
  useEffect(() => {
    handleFilterChange()
  }, [handleFilterChange])

  // Handle filter reset
  const handleRefresh = () => {
    setSelectedBrand("")
    setSelectedCategory("")
    setMinPrice("")
    setMaxPrice("")
    onFilterChange({}) // Reset filters completely
    window.location.reload()
  }

  return (
    <div className="dark:bg-gradient-to-b from-[#0a0d13] to-[#1a1f2a] bg-white pt-24 pb-12">
      <div className="container mx-auto px-4">
        <div className="mb-8 flex items-center justify-between">
          <h2 className="text-3xl font-bold dark:text-white text-black">Filter Products</h2>
          <div className="flex items-center space-x-4">
            <Filter className="text-secondary" size={24} />
            <button
              onClick={handleRefresh}
              className="bg-secondary hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full transition-colors duration-200 flex items-center"
            >
              <RefreshCw size={18} className="mr-2" />
              Reset Filters
            </button>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* Brand Dropdown */}
          <FilterDropdown
            label="Brand"
            options={[{ id: "", name: "Select Brand" }, ...(brandsData?.data?.map((brand: Brand) => ({
              id: brand.id,
              name: brand.name,
            })) || [])]}
            value={selectedBrand}
            onChange={setSelectedBrand}
          />

          {/* Category Dropdown */}
          <FilterDropdown
            label="Category"
            options={[{ id: "", name: "Select Category" }, ...(categoriesData?.data?.map((category: Category) => ({
              id: category.id,
              name: category.name,
            })) || [])]}
            value={selectedCategory}
            onChange={setSelectedCategory}
          />

          {/* Price Range */}
          <div className="relative">
            <label className="block dark:text-gray text-black mb-2 font-medium">Min Price</label>
            <div className="relative">
              <select
                value={minPrice}
                onChange={(e) => setMinPrice(e.target.value)}
                className="w-full appearance-none rounded-xl dark:bg-[#1a1f2a]/80 bg-white px-4 py-3 text-sm  
                           outline-none transition-colors dark:hover:bg-[#1a1f2a] hover:bg-white focus:ring-2 focus:ring-blue-500
                           border dark:border-slate-700 border-slate-50 shadow-lg"
              >
                <option value="">Select Min Price</option>
                <option value="100">100</option>
                <option value="200">200</option>
                <option value="300">300</option>
                <option value="400">400</option>
              </select>
              <ChevronDown
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none"
                size={18}
              />
            </div>
          </div>

          <div className="relative">
            <label className="block text-gray-300 mb-2 font-medium">Max Price</label>
            <div className="relative">
              <select
                value={maxPrice}
                onChange={(e) => setMaxPrice(e.target.value)}
                className="w-full appearance-none rounded-xl dark:bg-[#1a1f2a]/80 bg-white px-4 py-3 text-sm  
                outline-none transition-colors dark:hover:bg-[#1a1f2a] hover:bg-white focus:ring-2 focus:ring-blue-500
                border dark:border-slate-700 border-slate-50 shadow-lg"
              >
                <option value="">Select Max Price</option>
                <option value="500">500</option>
                <option value="1000">1000</option>
                <option value="1500">1500</option>
                <option value="2000">2000</option>
              </select>
              <ChevronDown
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none"
                size={18}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
