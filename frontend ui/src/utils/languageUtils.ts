import { Locale } from "@/lib/i18n/i18n-config";

export const DEFAULT_LANGUAGE = 'en';
export const LANGUAGE_STORAGE_KEY = 'preferredLanguage';

export function getStoredLanguage(): Locale {
  if (typeof window === 'undefined') return DEFAULT_LANGUAGE;
  
  const storedLang = localStorage.getItem(LANGUAGE_STORAGE_KEY) as Locale;
  return isValidLanguage(storedLang) ? storedLang : DEFAULT_LANGUAGE;
}

export function setStoredLanguage(lang: Locale): void {
  if (typeof window === 'undefined') return;
  
  if (isValidLanguage(lang)) {
    localStorage.setItem(LANGUAGE_STORAGE_KEY, lang);
  }
}

export function isValidLanguage(lang: string | null): lang is Locale {
  return lang !== null && ['en', 'fr', 'es'].includes(lang);
}

export function getLanguageFromPath(pathname: string): Locale {
  const match = pathname.match(/^\/([a-z]{2})/);
  const lang = match ? match[1] as Locale : DEFAULT_LANGUAGE;
  return isValidLanguage(lang) ? lang : DEFAULT_LANGUAGE;
}

export function updateLanguageInPath(currentPath: string, newLang: Locale): string {
  const currentLang = getLanguageFromPath(currentPath);
  return currentPath.replace(`/${currentLang}`, `/${newLang}`);
}
