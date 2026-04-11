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

function detectLocale(req: NextRequest): Locale {
  const cookieLocale = req.cookies.get("locale")?.value;
  if (isLocale(cookieLocale)) return cookieLocale;

  const header = req.headers.get("accept-language")?.toLowerCase() || "";

  if (header.includes("uk")) return "uk";
  if (header.includes("ru")) return "ru";
  if (header.includes("de")) return "de";
  if (header.includes("es")) return "es";
  if (header.includes("en")) return "en";

  return DEFAULT_LOCALE;
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
  const segments = pathname.split("/").filter(Boolean);
  const first = segments[0];

  // Если локаль уже явно есть в URL — просто отдаём в next-intl
  if (isLocale(first)) {
    const res = handleI18nRouting(req);
    return withLocaleCookie(res, first);
  }

  const locale = detectLocale(req);

  // Для ru оставляем URL как есть и даём next-intl обработать as-needed
  if (locale === DEFAULT_LOCALE) {
    const res = handleI18nRouting(req);
    return withLocaleCookie(res, locale);
  }

  // Для не-default локали делаем rewrite на внутренний /{locale}/...
  const url = req.nextUrl.clone();
  url.pathname = `/${locale}${pathname === "/" ? "" : pathname}`;

  const res = NextResponse.rewrite(url);
  return withLocaleCookie(res, locale);
}

export const config = {
  matcher: ["/((?!api|_next|_vercel|.*\\..*).*)"],
};

// import createMiddleware from "next-intl/middleware";

// export default createMiddleware({
//   locales: ["ru", "en", "de", "es", "uk"],
//   defaultLocale: "ru",
//   localePrefix: "as-needed",
//   localeDetection: false,
// });

// export const config = {
//   matcher: ["/((?!api|_next|_vercel|.*\\..*).*)"],
// };
