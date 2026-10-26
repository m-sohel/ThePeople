import { useCallback } from 'react';
import { useSettings } from '@/context/SettingsContext';

const en = require('./locales/en.json');
const hi = require('./locales/hi.json');

const translations: Record<string, Record<string, any>> = {
  en,
  hi,
};

export function useTranslation() {
  const { language } = useSettings();

  const t = useCallback(
    (keyPath: string): string => {
      const keys = keyPath.split('.');
      const currentLocale = translations[language] || translations.en;
      const fallbackLocale = translations.en;

      let value: any = currentLocale;
      for (const k of keys) {
        if (value && typeof value === 'object' && k in value) {
          value = value[k];
        } else {
          value = undefined;
          break;
        }
      }

      if (typeof value === 'string') {
        return value;
      }

      // Fallback to English
      let fallbackValue: any = fallbackLocale;
      for (const k of keys) {
        if (fallbackValue && typeof fallbackValue === 'object' && k in fallbackValue) {
          fallbackValue = fallbackValue[k];
        } else {
          return keyPath;
        }
      }

      return typeof fallbackValue === 'string' ? fallbackValue : keyPath;
    },
    [language]
  );

  return {
    t,
    currentLanguage: language,
  };
}

