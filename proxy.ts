import createMiddleware from "next-intl/middleware";

const LOCALES = ["ru", "en", "de", "es", "uk"] as const;

export default createMiddleware({
  locales: LOCALES,
  defaultLocale: "ru",

  localePrefix: "as-needed",

  // Язык определяется только по URL
  localeDetection: false,

  // next-intl тоже не создаёт NEXT_LOCALE
  localeCookie: false,
});

export const config = {
  matcher: ["/((?!api|_next|_vercel|.*\\..*).*)"],
};
