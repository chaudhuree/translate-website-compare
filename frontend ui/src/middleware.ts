import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { match } from "@formatjs/intl-localematcher";
import Negotiator from "negotiator";
import { i18n } from '@/lib/i18n/i18n-config';

const locales = ["en", "fr", "es"];
const defaultLocale = "en";

function getLocale(request: NextRequest): string {
  const headers = new Headers(request.headers);
  const acceptLanguage = headers.get("accept-language");
  
  if (acceptLanguage) {
    headers.set("accept-language", acceptLanguage);
    const negotiator = new Negotiator({ headers: Object.fromEntries(headers) });
    const languages = negotiator.languages();
    return match(languages, i18n.locales, i18n.defaultLocale);
  }
  
  return i18n.defaultLocale;
}

export function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;
  const pathnameIsMissingLocale = i18n.locales.every(
    (locale) => !pathname.startsWith(`/${locale}/`) && pathname !== `/${locale}`
  );

  if (pathnameIsMissingLocale) {
    const locale = getLocale(request);
    return NextResponse.redirect(
      new URL(`/${locale}${pathname}`, request.url)
    );
  }
}

export const config = {
  matcher: [
    '/((?!api|_next/static|_next/image|favicon.ico|images).*)',
  ],
};
