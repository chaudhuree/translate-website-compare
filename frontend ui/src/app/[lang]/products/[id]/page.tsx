"use client";

import ProductDetailsCard from "@/components/products/ProductDetailsCard";
import ProductSlider from "@/components/products/ProductSlider";
import { useGetProductsDetailsQuery } from "@/redux/products/productsApi";
import Image from "next/image";
import { useParams } from "next/navigation";
import amazon from "@/assets/icons/amazon.png";
import Loading from "@/components/ui/Loading";
import BenchmarkCompare from "@/components/Compare/BenchMarkCompare";
import { useTranslations } from "@/components/ClientLayout";

// type FeatureValue = string | number;

interface Features {
  [key: string]: {
    Description?: string;
    [key: string]: string | number | undefined;
  };
}

interface GeneralDetails {
  series?: string;
  generation?: string;
  releaseDate?: string;
  launchPrice?: string;
  chipset?: string;
  [key: string]: string | undefined;
}

interface Category {
  id: string;
  name: string;
  description: string;
}

interface Brand {
  id: string;
  name: string;
  image: string;
}

interface Product {
  id: string;
  name: string;
  image: string;
  description: string;
  price: number;
  rating: number;
  totalRatings: number;
  onlinePurchaseLink: string;
  categoryId: string;
  brandId: string;
  generalDetails?: GeneralDetails;
  features?: Features;
  category?: Category;
  brand?: Brand;
  [key: string]: unknown;
}

interface Dictionary {
  translation?: {
    [key: string]: string;
  };
  benchmarkAndSpecs: string;
  benchmarkAndSpecsDetails: string;
}

type TranslatableObject = {
  [key: string]: unknown;
};

// Export the Product interface for use in other components
export type { Product };

const ProductDetails = () => {
  const params = useParams();
  const id = params?.id as string;
  const { data, isLoading, isError } = useGetProductsDetailsQuery(id);
  const { dict } = useTranslations() as { dict: Dictionary };

  if (isLoading) {
    return <Loading />;
  }

  if (isError) {
    return <div>Error loading product details. Please try again later.</div>;
  }

  // Helper function to translate object keys
  const translateObjectKeys = <T extends TranslatableObject>(obj: T): TranslatableObject => {
    if (!obj || typeof obj !== 'object') return obj;
    
    return Object.entries(obj).reduce((acc, [key, value]) => {
      const translatedKey = dict?.translation?.[key] || key;
      
      if (value && typeof value === 'object' && !Array.isArray(value)) {
        acc[translatedKey] = translateObjectKeys(value as TranslatableObject);
      } else {
        acc[translatedKey] = value;
      }
      
      return acc;
    }, {} as TranslatableObject);
  };

  // Sanitize and translate the product data
  const rawProduct = data?.data as Product | undefined;
  const singleProduct: Product = {
    ...rawProduct!,
    features: translateObjectKeys(rawProduct?.features || {}) as Features,
    generalDetails: translateObjectKeys(rawProduct?.generalDetails || {}) as GeneralDetails
  };
  
  const productImages = singleProduct?.image
    ? Array(5).fill(singleProduct.image)
    : ["/product.png"];

  const product = {
    name: singleProduct?.name || "AMD Ryzen 7 7700 Budget Gaming Desktop PC",
    images: productImages,
  };

  return (
    <>
      <section className="pt-[160px] pb-10">
        <div className="container">
          <div className="grid md:grid-cols-2 grid-cols-1 items-center gap-6">
            <div>
              <ProductSlider product={product} />
            </div>
            <div>
              <h1 className="mb-3 text-secondary text-center font-semibold sm:text-[28px] text-[24px] max-w-[485px]">
                {singleProduct?.name || "NA"}
              </h1>
              <p className="mb-6">{singleProduct?.description}</p>
              <div className="product-key-features">
                <h2 className="mb-4">{dict?.translation?.features || "Features"}</h2>
                <div>
                  {singleProduct?.features && (
                    <div>
                      {Object.entries(singleProduct.features)
                        .slice(0, 1)
                        .map(([key, details]) => {
                          if (!details || typeof details !== "object") {
                            return null;
                          }

                          return (
                            <div key={key}>
                              <ul>
                                {Object.entries(details)
                                  .slice(0, 4)
                                  .map(([detailKey, value], index) => (
                                    <li
                                      key={`${detailKey}-${index}`}
                                      className="text-black dark:text-white text-sm"
                                    >
                                      <strong>{dict?.translation?.[detailKey] || detailKey}:</strong>{" "}
                                      {String(value)}
                                    </li>
                                  ))}
                              </ul>
                            </div>
                          );
                        })}
                    </div>
                  )}
                </div>
              </div>

              <div className="mt-10">
                <a
                  className="dark:bg-secondary bg-gray text-white px-6 py-3 rounded-[8px]"
                  href={singleProduct.onlinePurchaseLink}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Image
                    className="w-6 inline-flex mr-2"
                    src={amazon}
                    alt="amazon icon"
                  />{" "}
                  {dict?.translation?.buyNow || "Buy now"}
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="md:py-20 py-5">
        <div className="container">
          <div className="p-6 rounded-[8px] shadow-md bg-white dark:bg-[rgba(255,255,255,0.10)]">
            <h3 className="mb-4 text-black dark:text-white font-medium md:text-[32px] text-2xl">
              {dict?.benchmarkAndSpecs || "Benchmark and Specs"}
            </h3>
            <p className="md:text-base dark:text-white text-black text-sm">
              {dict?.benchmarkAndSpecsDetails || "All technical data and various benchmarks are listed on this page."}
            </p>
          </div>
        </div>
      </section>

      <section className="container mx-auto">
        <ProductDetailsCard singeProduct={singleProduct} />
      </section>
      <section className="container mx-auto">
        <BenchmarkCompare />
      </section>
    </>
  );
};

export default ProductDetails;
