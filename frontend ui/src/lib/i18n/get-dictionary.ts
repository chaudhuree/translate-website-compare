import type { Locale } from './i18n-config';
import type { Dictionary } from '@/components/ClientLayout';

// Import dictionaries statically to work with server components
import enDict from '@/dictionaries/en.json';
import frDict from '@/dictionaries/fr.json';
import esDict from '@/dictionaries/es.json';

// Type guard to validate dictionary structure
function isDictionary(obj: unknown): obj is Dictionary {
  const dict = obj as Dictionary;
  return (
    dict &&
    typeof dict === 'object' &&
    'common' in dict &&
    'nav' in dict &&
    'home' in dict &&
    'about' in dict
  );
}

const validateDictionary = (dict: unknown): Dictionary => {
  if (!isDictionary(dict)) {
    throw new Error('Invalid dictionary structure');
  }
  return dict;
};

const dictionaries = {
  en: validateDictionary(enDict),
  fr: validateDictionary(frDict),
  es: validateDictionary(esDict),
} as const;

export const getDictionary = async (locale: Locale): Promise<Dictionary> => {
  const dict = dictionaries[locale] ?? dictionaries.en;
  return dict;
};
