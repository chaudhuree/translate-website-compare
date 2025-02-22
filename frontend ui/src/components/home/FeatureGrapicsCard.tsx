"use client";
import amazon from "@/assets/icons/amazon.png";
import { useGetProductsQuery } from "@/redux/products/productsApi";
import { Cpu, DollarSign } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { forwardRef } from "react";

// Define the ProductCard type
interface ProductCard {
  id: string;
  image: string;
  name: string;
  brand: {
    name: string;
  };
  price: number;
  onlinePurchaseLink: string;
}

// ForwardRef type annotation for ref
const FeatureGraphicsCard = forwardRef<HTMLDivElement>((props, ref) => {
  const { data} = useGetProductsQuery({});

  const pathname = usePathname();
  const cardsData =
    pathname === "/products" ? data?.data : data?.data.slice(0, 3);
  console.log("feature graphics card data", cardsData);
  // if (isLoading) return <LoadingSpinner fullPage />;
  return (
    <div ref={ref} className="w-full" {...props}>
      <div className="container mx-auto space-y-6">
        {pathname === "/products" && (
          <div className="pt-28">
            <h1 className="text-[36px] font-semibold dark:text-white text-black">
              Features Products
            </h1>
          </div>
        )}
        <div className="flex justify-between items-center">
          <h2 className="text-xl font-semibold dark:text-white text-black">
            Products
          </h2>
          {pathname !== "/products" && (
            <Link
              href="/products"
              className="text-blue-500 hover:text-blue-400"
            >
              See All
            </Link>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {cardsData?.map((card: ProductCard) => (
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
                    <span className="text-sm text-gray">${card?.price}</span>
                  </div>
                </div>
              </div>
              <div className="lg:p-4 p-2 flex lg:gap-4 gap-2">
                <a
                  className="dark:bg-secondary bg-gray text-white lg:px-6 px-3 py-3 rounded-[8px]"
                  href={`${card.onlinePurchaseLink}`}
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
    </div>
  );
});

FeatureGraphicsCard.displayName = "FeatureGraphicsCard";

export default FeatureGraphicsCard;
