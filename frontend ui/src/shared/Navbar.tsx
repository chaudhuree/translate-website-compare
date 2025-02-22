"use client";

import logoBlack from "@/assets/icons/Logo (1).png";
import logo from "@/assets/icons/Logo (2) (1).png";
import usa from "@/assets/usa.png";
import ThemeToggle from "@/components/ThemeToggle";
import { ChevronDown, Menu, X } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useTheme } from "next-themes";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { useTranslations } from "@/components/ClientLayout";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [langOpen, setLangOpen] = useState(false);
  const { theme } = useTheme();
  const router = usePathname();
  const { dict, lang } = useTranslations();

  // Determine navbar background color
  const isHomePage = router === `/${lang}`;
  const navbarBg = isHomePage
    ? "bg-black text-white"
    : "bg-white dark:bg-transparent";
  const navbarColor = isHomePage ? "text-white" : "text-black dark:text-white";

  // Determine which logo to show based on theme
  const currentLogo = isHomePage ? logo : theme === "dark" ? logo : logoBlack;

  // Navigation links array
  const navLinks = [
    { name: dict.nav.home, href: `/${lang}` },
    { name: dict.nav.about, href: `/${lang}/about` },
    { name: dict.nav.products, href: `/${lang}/products` },
    { name: dict.nav.blog, href: `/${lang}/blog` },
    { name: dict.nav.contact, href: `/${lang}/contact` },
  ];

  const languages = [
    { code: "en", name: "English", flag: usa },
    { code: "fr", name: "French", flag: usa },
    { code: "es", name: "Spanish", flag: usa },
  ];

  const currentLangDetails = languages.find((l) => l.code === lang) || languages[0];

  const handleLanguageChange = (code: string) => {
    const currentPath = router;
    const newPath = currentPath.replace(`/${lang}`, `/${code}`);
    window.location.href = newPath;
    setLangOpen(false);
  };

  return (
    <nav className={`w-full z-[999] ${navbarBg}`}>
      <div className="container mx-auto px-3 py-4 flex justify-between items-center rounded-full">
        {/* Logo */}
        <Link href={`/${lang}`}>
          <Image
            className="w-[150px] object-contain"
            src={currentLogo}
            alt="logo icon"
          />
        </Link>

        {/* Desktop Navigation */}
        <ul className={`hidden md:flex space-x-6 z-[5550] ${navbarColor}`}>
          {navLinks.map((link, index) => (
            <Link
              href={link.href}
              key={index}
              className="cursor-pointer hover:text-gray-500 transition-colors"
            >
              {link.name}
            </Link>
          ))}
        </ul>

        {/* Right Side: Theme Toggle & Language Selector */}
        <div className="hidden md:flex items-center gap-4 relative z-[100]">
          <ThemeToggle />
          <div
            className="relative flex items-center gap-2 cursor-pointer"
            onClick={() => setLangOpen(!langOpen)}
          >
            <Image
              src={currentLangDetails.flag}
              alt={`${currentLangDetails.name} Flag`}
              height={24}
              width={24}
              className="rounded-full"
            />
            <span className={`font-medium ${navbarColor}`}>{currentLangDetails.name}</span>
            <ChevronDown size={18} className={navbarColor} />
            
            {/* Language Dropdown */}
            {langOpen && (
              <ul className="absolute top-8 right-0 w-32 bg-white dark:bg-gray-800 rounded-md shadow-lg py-2 ">
                {languages.map((language) => (
                  <li
                    key={language.code}
                    className="px-4 py-2 cursor-pointer text-gray-800 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                    onClick={() => handleLanguageChange(language.code)}
                  >
                    {language.name}
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>

        {/* Mobile Menu Button */}
        <div className="md:hidden block">
          <div className="flex gap-2 items-center">
            <ThemeToggle />
            <button
              className={navbarColor}
              onClick={() => setIsOpen(!isOpen)}
            >
              {isOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-white dark:bg-gray-800 shadow-lg p-4">
          <ul className="space-y-4">
            {navLinks.map((link, index) => (
              <li
                key={index}
                className="cursor-pointer z-[7777]"
                onClick={() => setIsOpen(false)}
              >
                <Link
                  href={link.href}
                  className="text-gray-800 dark:text-white hover:text-gray-500 dark:hover:text-gray-300 transition-colors block"
                >
                  {link.name}
                </Link>
              </li>
            ))}
            
            {/* Language Selector */}
            <div
              className="relative flex items-center gap-2 cursor-pointer z-[100]"
              onClick={() => setLangOpen(!langOpen)}
            >
              <Image
                src={currentLangDetails.flag}
                alt={`${currentLangDetails.name} Flag`}
                height={24}
                width={24}
                className="rounded-full w-6 h-6"
              />
              <span className="text-gray-800 dark:text-white">{currentLangDetails.name}</span>
              <ChevronDown size={18} className="text-gray-800 dark:text-white" />
            </div>

            {langOpen && (
              <ul className="mt-2 bg-white dark:bg-gray-700 rounded-md shadow-lg py-2 z-[100] relative">
                {languages.map((language) => (
                  <li
                    key={language.code}
                    className="px-4 py-2 cursor-pointer text-gray-800 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors"
                    onClick={() => handleLanguageChange(language.code)}
                  >
                    {language.name}
                  </li>
                ))}
              </ul>
            )}
          </ul>
        </div>
      )}
    </nav>
  );
}
