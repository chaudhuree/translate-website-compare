"use client";

import about from "@/assets/aboutBanner.png";
import Image from "next/image";
import { useTranslations } from "@/components/ClientLayout";

export default function Privacy() {
  const { dict } = useTranslations();
  return (
    <div className="">
      <div className="relative">
        <Image
          src={about}
          alt=""
          height={300}
          width={1920}
          className="h-[340px] w-full"
        />
        <h1 className="text-white text-2xl font-bold absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
          {dict.privacyPage.PrivacyPolicy}
        </h1>
      </div>
      <div className="container py-[52px]">
        <h1 className="text-center text-[28px] font-semibold">
          {dict.privacyPage.UpdatedDate}
        </h1>
        <p className="mt-5">
          {dict.privacyPage.privacyPera1}
        </p>
        <p className="mt-6">
          {dict.privacyPage.privacyPera2}
        </p>

        <h2 className="text-[20px] font-semibold mt-4">
          {dict.privacyPage.heading1}
        </h2>
        <p className="mt-3">
          {dict.privacyPage.heading1Description}
        </p>
        <h2 className="text-[20px] font-semibold mt-4">
          {dict.privacyPage.heading2}
        </h2>
        <p className="mt-3">
          {dict.privacyPage.heading2Description}
        </p>
        <h2 className="text-[20px] font-semibold mt-4">
          {dict.privacyPage.heading3}
        </h2>
        <p className="mt-3">
          {dict.privacyPage.heading3Description}
        </p>
      </div>
    </div>
  );
}
