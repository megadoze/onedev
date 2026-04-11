import type { MetadataRoute } from "next";

const LOCALES = ["en", "es", "de", "uk", "ru"] as const;
const DEFAULT_LOCALE = "ru";
const SITE_URL = "https://onedev.work";

const ROUTES = ["/"] as const;

function localePath(locale: string, path: string) {
  if (path === "/") {
    return locale === DEFAULT_LOCALE ? "/" : `/${locale}`;
  }

  return locale === DEFAULT_LOCALE ? path : `/${locale}${path}`;
}

function absoluteUrl(path: string) {
  return `${SITE_URL}${path}`;
}

export default function sitemap(): MetadataRoute.Sitemap {
  if (!SITE_URL) return [];

  const lastModified = new Date();

  return ROUTES.flatMap((route) => {
    const languages = Object.fromEntries(
      LOCALES.map((locale) => [locale, absoluteUrl(localePath(locale, route))]),
    ) as Record<string, string>;

    languages["x-default"] = absoluteUrl(localePath(DEFAULT_LOCALE, route));

    return LOCALES.map((locale) => ({
      url: absoluteUrl(localePath(locale, route)),
      lastModified,
      changeFrequency: route === "/" ? "weekly" : "monthly",
      priority: route === "/" ? 1 : 0.8,
      alternates: {
        languages,
      },
    }));
  });
}
