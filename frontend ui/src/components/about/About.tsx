/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import about from "@/assets/aboutBanner.png";
import mission from "@/assets/mission.png";
import whowe from "@/assets/whowe.png";
import Image from "next/image";
import AboutFeatureCard from "./AboutFeatureCard";
import { useTranslations } from "@/components/ClientLayout";

export default function About() {
  const { dict } = useTranslations();
  return (
    <div>
      <div className=" font-sans">
        <div className="relative">
          <Image
            src={about}
            alt=""
            height={300}
            width={1920}
            className="h-[340px] w-full"
          />
          <h1 className="text-white text-2xl font-bold absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
            {dict.aboutPage.aboutUs}
          </h1>
        </div>
      </div>
      <div className="min-h-screen dark:bg-[#020B1C] bg-white dark:text-white text-black py-16">
        <div className="container mx-auto px-4 mb-24 py-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <h2 className="text-4xl font-bold dark:text-white text-black mb-6">
                {dict.aboutPage.WhoWeAre}
              </h2>
              <p className="text-gray-300 leading-relaxed">
                {dict.aboutPage.aboutp1}
              </p>
              <p className="text-gray-300 leading-relaxed">
                {dict.aboutPage.aboutp2}
              </p>
            </div>
            <div className="relative">
              <div className="w-full h-[300px] lg:h-[400px] relative">
                <Image src={mission} alt="" height={472} width={587} />
              </div>
            </div>
          </div>
        </div>

        <div className="container mx-auto px-4 mt-16 py-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="order-2 lg:order-1 relative">
              <div className="w-full h-[300px] lg:h-[400px] relative">
                <Image src={whowe} alt="" height={472} width={587} />
              </div>
            </div>
            <div className="order-1 lg:order-2 space-y-6">
              <h2 className="text-4xl font-bold text-white mb-6">
                {dict.aboutPage.missionStatement}
              </h2>
              <p className="text-gray-300 leading-relaxed">
                {dict.aboutPage.aboutp3}
              </p>
              <p className="text-gray-300 leading-relaxed">
                {dict.aboutPage.aboutp4}
              </p>
            </div>
          </div>
        </div>
        <div className="">
          <div className="dark:bg-[#020B1C] bg-white dark:text-white text-black py-16 font-sans my-16">
            <div className="container mx-auto px-4">
              <div className="text-center mb-12">
                <h2 className="text-3xl md:text-4xl mt-16 font-bold dark:text-white text-black mb-4">
                  {dict.aboutPage.whyChooseUs}
                </h2>
                <p className="text-gray-400">
                  {dict.aboutPage.whyChooseUsDescription}
                </p>
              </div>
              <div className="flex justify-center">
                <AboutFeatureCard />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
