import React from "react";
import homeback from '@/assets/homebac.png';
import CommonButton from "../button/CommonButton";
import Link from "next/link";

export const HomeBanner = () => {
  return (
    <div
      className="relative  bg-cover bg-center pt-10 pb-[60px] lg:pt-20 lg:pb-[180px] z-[10]"
      style={{ backgroundImage: `url(${homeback.src})` }}
    >
      

      <div className="container flex justify-start items-center ">
        <div className="lg:w-[644px] w-full">
          <p className="lg:text-[64px] md:text-[44px] text-[25px] lg:font-[700] font-[500] md:leading-[72px] leading-[40px] font-inter  text-[#FFF]">
            Find the Perfect GPU for Your Needs.
          </p>
          <p className="text-[16px] font-[400] font-inter text-white mt-[32px] ">
            Unlock the ultimate resource for GPU enthusiasts and professionals alike. Dive into a comprehensive platform that empowers you to compare, benchmark, and explore graphics cards with unparalleled precision.
          </p>
          <div className="pt-[32px]">
           <Link href="/compare"> <CommonButton>Compare Cpus</CommonButton></Link>
          </div>
        </div>
      </div>
    </div>
  );
};
