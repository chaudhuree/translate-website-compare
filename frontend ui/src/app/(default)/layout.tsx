"use client";

import CookieConsent from "@/components/CookieConsent";
import Footer from "@/shared/Footer";
import Navbar from "@/shared/Navbar";
// import Footer from "@/shared/Footer";
// import { Navbar } from "@/shared/Navbar";
import { ReactNode } from "react";

interface LayoutProps {
  children: ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  return (
    <div className="">
      <Navbar />
      <main style={{ minHeight: "calc(100vh - 360px)" }}>{children}</main>
      <CookieConsent/>
      <Footer />
 
    </div>
  );
};

export default Layout;
