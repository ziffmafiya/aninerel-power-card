import { HomeAssistant } from '../types';
import en from './languages/en.json';
import ru from './languages/ru.json';

const languages: Record<string, any> = {
  en,
  ru,
};

export function localize(
  key: string,
  hass?: HomeAssistant,
  search?: string,
  replace?: string
): string {
  const userLang = (
    hass?.locale?.language ||
    hass?.language ||
    navigator.language ||
    'ru'
  )
    .toLowerCase()
    .split('-')[0];

  const activeLang = languages[userLang] ? userLang : 'ru';

  let translated: any;
  try {
    translated = key.split('.').reduce((o, i) => o?.[i], languages[activeLang]);
  } catch (e) {
    translated = undefined;
  }

  // Fallback to Russian, then English, then raw key
  if (translated === undefined) {
    try {
      translated = key.split('.').reduce((o, i) => o?.[i], languages['ru']);
    } catch (e) {
      translated = undefined;
    }
  }

  if (translated === undefined) {
    try {
      translated = key.split('.').reduce((o, i) => o?.[i], languages['en']);
    } catch (e) {
      translated = undefined;
    }
  }

  if (translated === undefined || typeof translated !== 'string') {
    translated = key;
  }

  if (search && replace) {
    translated = translated.replace(search, replace);
  }

  return translated;
}
