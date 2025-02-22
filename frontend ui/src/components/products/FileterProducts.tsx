"use client"
import amazon from "@/assets/icons/amazon.png"
import { Cpu, DollarSign } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { forwardRef } from "react"

// Define the ProductCard type
interface ProductCard {
  id: string
  image: string
  name: string
  brand: {
    name: string
  }
  onlinePurchaseLink:string
  price: number
}

// Define Benchmark interface


interface FilterProductsProps {
  products: { data: ProductCard[] } // Correct type for products (array of ProductCard objects)
  isLoading: boolean
}

// ForwardRef type annotation for ref
const FilterProducts = forwardRef<HTMLDivElement, FilterProductsProps>(({ products, isLoading }, ref) => {
  if (isLoading) {
    return <div className="text-center text-white">Loading...</div>
  }

  if (!products?.data || products.data.length === 0) {
    return <div className="text-center text-white font-semibold text-lg mt-8">No products available.</div>
  }

  return (
    <div ref={ref} className="w-full">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {products?.data?.map((card: ProductCard) => (
            <div
              key={card.id}
              className="dark:bg-[#FFFFFF1A] shadow-md rounded-[8px] overflow-hidden"
            >
              <div className="p-6">
                <div className="aspect-square relative rounded-[8px] overflow-hidden">
                  <Image
                    src={card?.image || "/placeholder.svg"}
                    alt={card?.name}
                    fill
                    className="object-cover h-[200px] w-full"
                  />
                </div>
                <h3 className="text-lg font-semibold dark:text-white mt-5 mb-4">
                  {card?.name}
                </h3>
                <div className="grid grid-cols-2 gap-4">
                  <div className="flex items-center gap-2">
                    <Cpu className="h-4 w-4 text-gray-400" />
                    <span className="text-sm text-gray-300">
                      {card?.brand?.name}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <DollarSign className="h-4 w-4 text-gray-400" />
                    <span className="text-sm text-gray-300">
                      ${card?.price}
                    </span>
                  </div>
                </div>
              </div>
              <div className="p-4 flex gap-4">
                <a
                  className="dark:bg-secondary bg-gray text-white px-6 py-3 rounded-[8px]"
                  href={`${card?.onlinePurchaseLink}`}
                  target="_blank"
                >
                  <Image
                    className="w-6 inline-flex mr-2"
                    src={amazon}
                    alt="amazon icon"
                  />{" "}
                  Buy now
                </a>
                <Link
                  href={`products/${card.id}`}
                  className="dark:text-white dark:hover:bg-secondary hover:bg-gray hover:text-white hover:rounded-[8px] px-6 py-3"
                >
                  More details
                </Link>
              </div>
            </div>
         
        ))}
      </div>
    </div>
  )
})

FilterProducts.displayName = "FilterProducts"

export default FilterProducts
