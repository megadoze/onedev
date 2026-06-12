import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import createMiddleware from "next-intl/middleware";

const LOCALES = ["ru", "en", "de", "es", "uk"] as const;
type Locale = (typeof LOCALES)[number];

const DEFAULT_LOCALE: Locale = "ru";
const LOCALE_SET = new Set<string>(LOCALES);

function isLocale(value: string | null | undefined): value is Locale {
  return !!value && LOCALE_SET.has(value);
}

const handleI18nRouting = createMiddleware({
  locales: [...LOCALES],
  defaultLocale: DEFAULT_LOCALE,
  localePrefix: "as-needed",
  localeDetection: false,
});

function withLocaleCookie(res: NextResponse, locale: Locale) {
  res.cookies.set("locale", locale, {
    path: "/",
    maxAge: 60 * 60 * 24 * 365,
    sameSite: "lax",
  });

  return res;
}

export default function proxy(req: NextRequest) {
  const pathname = req.nextUrl.pathname;
  const first = pathname.split("/").filter(Boolean)[0];

  const res = handleI18nRouting(req);

  if (isLocale(first)) {
    return withLocaleCookie(res, first);
  }

  return res;
}

export const config = {
  matcher: ["/((?!api|_next|_vercel|.*\\..*).*)"],
};
