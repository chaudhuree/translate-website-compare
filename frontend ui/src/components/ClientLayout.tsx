"use client";

import CookieConsent from "@/components/CookieConsent";
import Footer from "@/shared/Footer";
import Navbar from "@/shared/Navbar";
import { createContext, useContext } from "react";

interface TranslationContextType {
  dict: any;
  lang: string;
}

const TranslationContext = createContext<TranslationContextType>({
  dict: {},
  lang: "en",
});

export const useTranslations = () => useContext(TranslationContext);

interface ClientLayoutProps {
  children: React.ReactNode;
  dict: any;
  lang: string;
}

export default function ClientLayout({ children, dict, lang }: ClientLayoutProps) {
  return (
    <TranslationContext.Provider value={{ dict, lang }}>
      <div className="">
        <Navbar />
        <main style={{ minHeight: "calc(100vh - 360px)" }}>{children}</main>
        <CookieConsent/>
        <Footer />
      </div>
    </TranslationContext.Provider>
  );
}
