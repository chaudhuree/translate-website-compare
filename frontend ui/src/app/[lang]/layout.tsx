import { use } from "react";
import { i18n, Locale } from "@/lib/i18n/i18n-config";
import { getDictionary } from "@/lib/i18n/get-dictionary";
import ClientLayout from "@/components/ClientLayout";

export async function generateStaticParams() {
  return i18n.locales.map((locale) => ({ lang: locale }));
}

interface LayoutProps {
  children: React.ReactNode;
  params: Promise<{ lang: Locale }>;
}

export default function Layout({ children, params }: LayoutProps) {
  const { lang } = use(params);
  const dict = use(getDictionary(lang));

  return (
    <ClientLayout dict={dict} lang={lang}>
      {children}
    </ClientLayout>
  );
}
