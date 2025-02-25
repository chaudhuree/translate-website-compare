"use client";

import CookieConsent from "@/components/CookieConsent";
import Footer from "@/shared/Footer";
import Navbar from "@/shared/Navbar";
import { createContext, useContext } from "react";

export interface Dictionary {
  common: {
    language: string;
    selectLanguage: string;
  };
  nav: {
    home: string;
    compare: string;
    blog: string;
    contact: string;
  };
  home: {
    banner: {
      title: string;
      description: string;
      button: string;
    };
    homeCompare: {
      title: string;
      description: string;
      features: string[];
      button: string;
    };
    exploreCategories: {
      title: string;
      description: string;
    };
    performanceSection: {
      title: string;
      description: string;
      features: string[];
    };
    exploreOurProducts: {
      title: string;
      description: string;
    };
    brands: {
      title: string;
    };
    compare: {
      title: string;
      subtitle: string;
    };
  };
  about: {
    title: string;
    description: string;
  };
  contact: {
    title: string;
    fields: {
      name: string;
      email: string;
      subject: string;
      message: string;
    };
    button: string;
  }
  footer: {
    description: string;
    home: string;
    compare: string;
    blog: string;
    contact: string;
    copyright: string;
    privacy: string;
  };
}

interface TranslationContextType {
  dict: Dictionary;
  lang: string;
}

const TranslationContext = createContext<TranslationContextType>({
  dict: {
    common: {
      language: "",
      selectLanguage: "",
    },
    nav: {
      home: "",
      compare: "",
      blog: "",
      contact: "",
    },
    home: {
      banner: {
        title: "",
        description: "",
        button: "",
      },
      homeCompare: {
        title: "",
        description: "",
        features: [],
        button: "",
      },
      exploreCategories: {
        title: "",
        description: "",
      },
      performanceSection: {
        title: "",
        description: "",
        features: [],
      },
      exploreOurProducts: {
        title: "",
        description: "",
      },
      brands: {
        title: "",
      },
      compare: {
        title: "",
        subtitle: "",
      },
    },
    about: {
      title: "",
      description: ""
    },
    contact: {
      title: "",
      fields: {
        name: "",
        email: "",
        subject: "",
        message: ""
      },
      button: ""
    },
    footer: {
      description: "",
      home: "",
      compare: "",
      blog: "",
      contact: "",
      copyright: "",
      privacy: "",
    }
  },
  lang: "",
});

export const useTranslations = () => useContext(TranslationContext);

interface ClientLayoutProps {
  children: React.ReactNode;
  dict: Dictionary;
  lang: string;
}

export default function ClientLayout({ children, dict, lang }: ClientLayoutProps) {
  return (
    <TranslationContext.Provider value={{ dict, lang }}>
      <div className="flex min-h-screen flex-col">
        <Navbar />
        <main className="flex-1">{children}</main>
        <Footer />
        <CookieConsent />
      </div>
    </TranslationContext.Provider>
  );
}
