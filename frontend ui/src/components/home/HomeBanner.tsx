"use client";

import React, { useEffect } from "react";
import homeback from '@/assets/homebac.png';
import CommonButton from "../button/CommonButton";
import Link from "next/link";
import { useTranslations } from "@/components/ClientLayout";
import { useRouter, usePathname } from "next/navigation";

export const HomeBanner = () => {
  const { dict, lang } = useTranslations();
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    // Get language from localStorage or use default
    const storedLang = localStorage.getItem('preferredLanguage') || 'en';
    
    // If current language is different from stored language, redirect
    if (storedLang !== lang) {
      const newPath = pathname.replace(`/${lang}`, `/${storedLang}`);
      router.push(newPath);
    }
  }, [lang, pathname, router]);

  return (
    <div
      className="relative bg-cover bg-center pt-10 pb-[60px] lg:pt-20 lg:pb-[180px] z-[10]"
      style={{ backgroundImage: `url(${homeback.src})` }}
    >
      <div className="container flex justify-start items-center">
        <div className="lg:w-[644px] w-full">
          <p className="lg:text-[64px] md:text-[44px] text-[25px] lg:font-[700] font-[500] md:leading-[72px] leading-[40px] font-inter text-[#FFF]">
            {dict.home.banner.title}
          </p>
          <p className="text-[16px] font-[400] font-inter text-white mt-[32px]">
            {dict.home.banner.description}
          </p>
          <div className="pt-[32px]">
            <Link href={`/${lang}/compare`}>
              <CommonButton>{dict.home.banner.button}</CommonButton>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};
