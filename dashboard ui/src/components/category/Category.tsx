"use client";
// import { useAllCreatorsQuery } from '@/components/Redux/Api/userApi';
import { useAllCreatorsQuery } from "@/Redux/Api/userApi";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { useRef, useState } from "react";
import { FaAngleRight } from "react-icons/fa6";
import { MdAddBox } from "react-icons/md";
import CategoryTable from "../Table/CategoryTable";
import { useCategoryQuery } from "@/Redux/Api/categoryApi";
import { useContactsQuery } from "@/Redux/Api/contactApi";

const Category = () => {
  const emailRef = useRef<HTMLInputElement | null>(null);
  const [page, setPage] = useState<number>(1);
  const limit = 100;
  const [email, setEmail] = useState<string>("");
  const { data:categoryData, isLoading } = useCategoryQuery({
    page,
    limit,
  });

  const button = categoryData && [
    ...Array(categoryData?.data?.meta?.totalPage).keys(),
  ];


  
  const currentRoute = usePathname().replace("/", "");

  return (
    <div className="p-10">
      {/* <h1 className='text-3xl font-semibold text-center mb-8'>Event Creator Details</h1> */}
      <div className="flex justify-between mb-5">
        <div>
        <div>
          <h1 className="text-white font-semibold flex items-center gap-2">
            Category <FaAngleRight /> <span className="text-blue-500 text-lg">{currentRoute}</span>
          </h1>
        </div> 
        </div>
       <div>
      
       
       </div>
       <div>
          <Link
            className="bg-[#4D6BDD] text-white px-4 py-3 rounded-[8px] flex items-center gap-2"
            href={"/add_category"}
          >
            <MdAddBox className="text-2xl" />
            Add Category
          </Link>
        </div>
      </div>
      <div>
        <CategoryTable
          creatorData={categoryData?.data}
          serial={page * limit - limit}
          isLoading={isLoading}
        ></CategoryTable>
      </div>
      <div className="flex justify-center gap-5 mt-5">
        {button &&
          button.map((item: string, index: number) => (
            <button
              onClick={() => setPage(index + 1)}
              className="border-2 px-3 py-1 rounded-lg border-primary/50 text-primary text-lg font-bold"
              key={index}
            >
              {item + 1}
            </button>
          ))}
      </div>
    </div>
  );
};

export default Category;
