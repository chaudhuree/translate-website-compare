"use client";

import { redirect } from "next/navigation";
import { use } from "react";
import { useTranslations } from "@/components/ClientLayout";

interface PageProps {
  params: Promise<{ lang: string }>;
}

export default function AboutPage({ params }: PageProps) {
  const { lang } = use(params);
  const { dict } = useTranslations();

  // Validate lang parameter
  if (!["en", "fr", "es"].includes(lang)) {
    redirect("/en");
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-4">{dict.about.title}</h1>
      <p className="text-lg text-gray-600 dark:text-gray-300">
        {dict.about.description}
      </p>
    </div>
  );
}
