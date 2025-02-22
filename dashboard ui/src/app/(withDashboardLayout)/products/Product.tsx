"use client";
import React, { useRef, useState } from "react";
import Link from "next/link";
import { MdAddBox } from "react-icons/md";
import { usePathname } from "next/navigation";
import { FaAngleRight } from "react-icons/fa6";
import ProductTable from "@/components/Table/ProductTable";
import { useProductsQuery } from "@/Redux/Api/ProductApi";

const Product = () => {
 const  {data: products}=useProductsQuery({})
 console.log(products)



  const currentRoute = usePathname().replace("/", "");

  return (
    <div className="p-10">
      {/* <h1 className='text-3xl font-semibold text-center mb-8'>Users Details</h1> */}
      <div className="flex justify-between mb-5">
        <div>
          <h1 className="text-white font-semibold flex items-center gap-2">
            Product <FaAngleRight /> <span className="text-blue-500 text-lg">{currentRoute}</span>
          </h1>
        </div>
     
        <div>
          <Link
            className="bg-[#4D6BDD] text-white px-4 py-3 rounded-[8px] flex items-center gap-2"
            href={"/add-cpu-product"}
          >
            <MdAddBox className="text-2xl" />
            Add Product
          </Link>
        </div>
      </div>
      <div>
        <ProductTable
          productData={products?.data}
          isLoading={false}
           meta={products?.meta}          
        ></ProductTable>
      </div>
     
    </div>
  );
};

export default Product;
