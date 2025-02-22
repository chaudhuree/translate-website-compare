import type { Locale } from './i18n-config';

// Import dictionaries statically to work with server components
import enDict from '../dictionaries/en.json';
import frDict from '../dictionaries/fr.json';
import esDict from '../dictionaries/es.json';

const dictionaries = {
  en: enDict,
  fr: frDict,
  es: esDict,
};

export const getDictionary = async (locale: Locale) => {
  return dictionaries[locale] ?? dictionaries.en;
};
