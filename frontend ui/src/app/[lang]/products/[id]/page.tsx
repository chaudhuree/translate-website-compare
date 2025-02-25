"use client";

import ProductDetailsCard from "@/components/products/ProductDetailsCard";
import ProductSlider from "@/components/products/ProductSlider";
import {
  useGetProductsBenchmarkQuery,
  useGetProductsDetailsQuery,
} from "@/redux/products/productsApi";
import Image from "next/image";
import { useParams } from "next/navigation";
import amazon from "@/assets/icons/amazon.png";
import Loading from "@/components/ui/Loading";
import BenchmarkCompare from "@/components/Compare/BenchMarkCompare";

const ProductDetails = () => {
  const params = useParams();
  const id = params?.id;
  const { data, isLoading, isError } = useGetProductsDetailsQuery(id);
  const { data: benchMarkData } = useGetProductsBenchmarkQuery(id);
 

  if (isLoading) {
    return <Loading />;
  }

  if (isError) {
    return <div>Error loading product details. Please try again later.</div>;
  }

  const singleProduct = data?.data;
  const singleBenchMarkData = benchMarkData?.data[0];
  console.log("singe benchcmark", singleBenchMarkData);
  console.log("singe product", singleProduct);

  const productImages = singleProduct?.image
  ? Array(5).fill(singleProduct.image) 
  : ["/product.png"]; 

  const product = {
    name: "AMD Ryzen 7 7700 Budget Gaming Desktop PC",
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
              <h1 className="mb-3 text-secondary text-center  font-semibold sm:text-[28px] text-[24px] max-w-[485px]">
                {singleProduct?.name || "NA"}
              </h1>
              <p className="mb-6">{singleProduct?.description}</p>
              <div className="product-key-features">
                <h2 className="mb-4">Key Features</h2>
                <div>
                  {singleProduct?.features && (
                    <div>
                      {singleProduct?.features && (
                        <div>
                          {Object.entries(singleProduct.features)
                            .slice(0, 1) 
                            .map(([_, details]) => {
                              if (
                                typeof details !== "object" ||
                                details === null
                              )
                                return null;

                              return (
                                <div key={_}>
                                  <ul>
                                    {Object.values(
                                      details as Record<string, string | number>
                                    )
                                      .slice(0, 4) 
                                      .map((value, index) => (
                                        <li
                                          key={index}
                                          className="text-black dark:text-white text-sm"
                                        >
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
                  )}
                </div>
              </div>

              <div className="mt-10">
                <a
                  className="dark:bg-secondary bg-gray text-white px-6 py-3 rounded-[8px]"
                  href={`${singleProduct.onlinePurchaseLink}`}
                  target="_blank"
                >
                  <Image
                    className="w-6 inline-flex mr-2"
                    src={amazon}
                    alt="amazon icon"
                  />{" "}
                  Buy now
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
              Benchmark and Specs
            </h3>
            <p className="md:text-base dark:text-white text-black text-sm">
              All technical data and various benchmarks of the Colorful iGame
              GeForce RTX 3060 Ti Advanced OC LHR-V are listed on this page. The
              graphics card is based on the GA104-202-A1 (Ampere) graphics chip,
              which is manufactured with a structure width of 8 nm. The Colorful
              iGame GeForce RTX 3060 Ti Advanced OC LHR-V can operate up to 4
              screens with a maximum resolution of up to 7680x4320 become.
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
