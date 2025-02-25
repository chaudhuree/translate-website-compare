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
  };
  blog: {
    title: string;
    description: string;
  };  
  footer: {
    description: string;
    home: string;
    compare: string;
    blog: string;
    contact: string;
    copyright: string;
    privacy: string;
  };
  translation: {
    name: string;
    description: string;
    quantity: string;
    features: string;
    cpu: string;
    memory: string;
    baseClock: string;
    boostClock: string;
    cache: string;
    cores: string;
    threads: string;
    TDP: string;
    socket: string;
    memorySupport: string;
    maxMemory: string;
    channels: string;
    series: string;
    generation: string;
    releaseDate: string;
    launchPrice: string;
    chipset: string;
    pcieVersion: string;
    maxRamSupport: string;
    maxResolution: string;
    coolerType: string;
    stockCooler: string;
    hyperThreading: string;
    turboBoost: string;
    intelVt: string;
    intelSpeedStep: string;
    generalDetails: string;
    connectivity: string;
    cooler: string;
    supportedTechnologies: string;
    category: string;
    brand: string;
    createdAt: string;
    updatedAt: string;
    onlinePurchaseLink: string
  },
  benchmarkAndSpecs: string;
  benchmarkAndSpecsDetails: string;
  benchmarkResults: string;
  descriptionNotAvailble: string;
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
    blog: {
      title: "",
      description: ""
    },
    footer: {
      description: "",
      home: "",
      compare: "",
      blog: "",
      contact: "",
      copyright: "",
      privacy: "",
    },
    translation: {
      name: "",
      description: "",
      quantity: "",
      features: "",
      cpu: "",
      memory: "",
      baseClock: "",
      boostClock: "",
      cache: "",
      cores: "",
      threads: "",
      TDP: "",
      socket: "",
      memorySupport: "",
      maxMemory: "",
      channels: "",
      series: "",
      generation: "",
      releaseDate: "",
      launchPrice: "",
      chipset: "",
      pcieVersion: "",
      maxRamSupport: "",
      maxResolution: "",
      coolerType: "",
      stockCooler: "",
      hyperThreading: "",
      turboBoost: "",
      intelVt: "",
      intelSpeedStep: "",
      generalDetails: "",
      connectivity: "",
      cooler: "",
      supportedTechnologies: "",
      category: "",
      brand: "",
      createdAt: "",
      updatedAt: "",
      onlinePurchaseLink: ""
    },
    benchmarkAndSpecs: "",
    benchmarkAndSpecsDetails: "",
    benchmarkResults: "",
    descriptionNotAvailble: ""
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
