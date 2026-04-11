import {getRequestConfig} from 'next-intl/server';

const LOCALES = ['en', 'es', 'de', 'uk', 'ru'] as const;
const DEFAULT_LOCALE = 'ru';

export default getRequestConfig(async ({requestLocale}) => {
  let locale = await requestLocale;

  if (!locale || !LOCALES.includes(locale as (typeof LOCALES)[number])) {
    locale = DEFAULT_LOCALE;
  }

  return {
    locale,
    messages: (await import(`../messages/${locale}.json`)).default
  };
});