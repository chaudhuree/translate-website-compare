"use client";

import ExplorerProduct from "@/components/home/ExplorerProduct";
import GraphicsGrid from "@/components/home/GraphicsGrid";
import { HomeBanner } from "@/components/home/HomeBanner";
import PerformanceSection from "@/components/home/PerformanceSection";
import ProductCategories from "@/components/home/ProductCategories";
import HomeCompare from "@/components/HomeCompare";

export default function Home() {
  return (
    <div className="">
      <HomeBanner />
      <HomeCompare />
      <ProductCategories />
      <PerformanceSection />
      <GraphicsGrid />
      <ExplorerProduct />
    </div>
  );
}


