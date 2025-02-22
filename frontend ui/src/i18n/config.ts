import i18next from 'i18next';
import { initReactI18next } from 'react-i18next';

import enTranslations from '../dictionaries/en.json';
import frTranslations from '../dictionaries/fr.json';
import esTranslations from '../dictionaries/es.json';

i18next.use(initReactI18next).init({
  resources: {
    en: {
      translation: enTranslations,
    },
    fr: {
      translation: frTranslations,
    },
    es: {
      translation: esTranslations,
    },
  },
  lng: 'en',
  fallbackLng: 'en',
  interpolation: {
    escapeValue: false,
  },
});

export default i18next;
