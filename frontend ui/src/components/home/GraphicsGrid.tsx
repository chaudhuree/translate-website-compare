import { useBrandQuery } from "@/redux/Api/category/categoryApi";
import { Category } from "@/types/Article";
import Image from "next/image";
import Link from "next/link";
import { useTranslations } from "@/components/ClientLayout";

export default function GraphicsGrid() {
  const { data } = useBrandQuery({});
  const { dict } = useTranslations();
  console.log("graphics data", data);

  return (
    <div className="lg:px-5 px-3 pb-20">
      <div className="container mx-auto">
        <h2 className="text-2xl lg:text-4xl font-bold dark:text-white text-black mb-12">
          {dict.home.brands.title}
        </h2>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6">
          {data?.data?.map((card: Category) => (
            <Link key={card.id} href={`/products?brandId=${card.id}`} passHref>
              <div className="bg-white rounded-[8px] shadow-lg flex flex-col p-4">
                <div className="flex gap-4 items-center">
                  <div className="">
                    <Image
                      src={card.image}
                      alt="Intel Logo"
                      width={200}
                      height={56}
                      className="lg:w-[60px] lg:h-[60px] w-[45px] h-[45px] object-contain mx-auto rounded-[8px]"
                    />
                  </div>
                  <div>
                    <h2 className="lg:text-[20px] text-[16px] text-[#040D1A] font-semibold">{card.name}</h2>
                  </div>
                </div>

                {/* Card Content */}
                <div className="text-end">
                  <p className="text-[#040D1A] font-medium text-sm mt-2">
                    {new Date(card.createdAt).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "long",
                    })}
                  </p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
