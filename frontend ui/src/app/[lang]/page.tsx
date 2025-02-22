"use client";

import { redirect } from "next/navigation";
import { use } from "react";
import ExplorerProduct from "@/components/home/ExplorerProduct";
import GraphicsGrid from "@/components/home/GraphicsGrid";
import { HomeBanner } from "@/components/home/HomeBanner";
import PerformanceSection from "@/components/home/PerformanceSection";
import ProductCategories from "@/components/home/ProductCategories";
import HomeCompare from "@/components/HomeCompare";
// import { useTranslations } from "@/components/ClientLayout";

interface PageProps {
  params: Promise<{ lang: string }>;
}

export default function Home({ params }: PageProps) {
  const { lang } = use(params);
  // const { dict } = useTranslations();

  // Validate lang parameter
  if (!["en", "fr", "es"].includes(lang)) {
    redirect("/en");
  }

  // Safely access nested dictionary values
  // const compareTitle = dict?.home?.compare?.title ?? "Compare and Choose the Best Hardware";
  // const compareSubtitle = dict?.home?.compare?.subtitle ?? "Experience the power of our cutting-edge hardware comparison tools";

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
