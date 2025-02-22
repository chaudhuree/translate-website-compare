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
import { Locale } from "@/lib/i18n/i18n-config";
import { setStoredLanguage, updateLanguageInPath } from "@/utils/languageUtils";

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
    { name: dict.nav.compare, href: `/${lang}/compare` },
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
    // Save the selected language to localStorage
    setStoredLanguage(code as Locale);
    
    // Update the URL
    const newPath = updateLanguageInPath(router, code as Locale);
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
        <div className="hidden md:flex items-center gap-4">
          <ThemeToggle />
          <div className="relative">
            <div
              className="flex items-center gap-2 cursor-pointer p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
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
              <ChevronDown 
                size={18} 
                className={`${navbarColor} transform transition-transform duration-200 ${langOpen ? 'rotate-180' : 'rotate-0'}`} 
              />
            </div>
            
            {/* Language Dropdown */}
            {langOpen && (
              <ul className="absolute top-full right-0 mt-2 w-40 bg-white dark:bg-gray-900 rounded-lg shadow-lg py-2 border border-gray-200 dark:border-gray-700 z-50 text-black">
                {languages.map((language) => (
                  <li
                    key={language.code}
                    className={`px-4 py-2 cursor-pointer flex items-center gap-2 ${
                      language.code === lang 
                        ? 'bg-gray-100 dark:bg-gray-600 text-gray-600 bg-blue-500 dark:text-white'  
                        : 'text-gray-700  hover:bg-gray-50 dark:hover:bg-gray-800'
                    }`}
                    onClick={() => handleLanguageChange(language.code)}
                  >
                    <Image
                      src={language.flag}
                      alt={`${language.name} Flag`}
                      height={20}
                      width={20}
                      className="rounded-full"
                    />
                    {language.name}
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>

        {/* Mobile Menu Button */}
        <div className="md:hidden block ">
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
        <div className="md:hidden bg-white dark:bg-gray-900 shadow-lg p-4 text-black ">
          <ul className="space-y-4">
            {navLinks.map((link, index) => (
              <li
                key={index}
                className="cursor-pointer"
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
            <div className="relative">
              <div
                className="flex items-center gap-2 cursor-pointer p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                onClick={() => setLangOpen(!langOpen)}
              >
                <Image
                  src={currentLangDetails.flag}
                  alt={`${currentLangDetails.name} Flag`}
                  height={24}
                  width={24}
                  className="rounded-full"
                />
                <span className="text-gray-800 dark:text-white">{currentLangDetails.name}</span>
                <ChevronDown 
                  size={18} 
                  className={`text-gray-800 dark:text-white transform transition-transform duration-200 ${langOpen ? 'rotate-180' : 'rotate-0'}`} 
                />
              </div>

              {langOpen && (
                <ul className="mt-2 bg-white dark:bg-gray-900 rounded-lg shadow-lg py-2 border border-gray-200 dark:border-gray-700">
                  {languages.map((language) => (
                    <li
                      key={language.code}
                      className={`px-4 py-2 cursor-pointer flex items-center gap-2 ${
                        language.code === lang 
                          ? 'bg-gray-100 dark:bg-gray-800 text-gray-900 ' 
                          : 'text-gray-700 dark:text-gray-900 hover:bg-gray-50 dark:hover:bg-gray-800'
                      }`}
                      onClick={() => handleLanguageChange(language.code)}
                    >
                      <Image
                        src={language.flag}
                        alt={`${language.name} Flag`}
                        height={20}
                        width={20}
                        className="rounded-full"
                      />
                      {language.name}
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </ul>
        </div>
      )}
    </nav>
  );
}
