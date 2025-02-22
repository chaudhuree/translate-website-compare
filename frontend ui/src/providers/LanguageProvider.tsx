"use client";

import { createContext, useContext, useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

type LanguageContextType = {
  currentLocale: string;
  changeLanguage: (locale: string) => void;
};

const LanguageContext = createContext<LanguageContextType>({
  currentLocale: 'en',
  changeLanguage: () => {},
});

export const useLanguage = () => useContext(LanguageContext);

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [currentLocale, setCurrentLocale] = useState('en');
  const router = useRouter();

  useEffect(() => {
    const locale = window.location.pathname.split('/')[1];
    if (['en', 'fr', 'es'].includes(locale)) {
      setCurrentLocale(locale);
    }
  }, []);

  const changeLanguage = (locale: string) => {
    const currentPath = window.location.pathname;
    const pathWithoutLocale = currentPath.split('/').slice(2).join('/');
    const newPath = `/${locale}/${pathWithoutLocale}`;
    router.push(newPath);
    setCurrentLocale(locale);
  };

  return (
    <LanguageContext.Provider value={{ currentLocale, changeLanguage }}>
      {children}
    </LanguageContext.Provider>
  );
}
