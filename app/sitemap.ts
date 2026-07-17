import type { MetadataRoute } from "next";

const LOCALES = ["en", "es", "de", "uk", "ru"] as const;
const DEFAULT_LOCALE = "ru";
const SITE_URL = "https://onedev.work";

const ROUTES = ["/"] as const;

function localePath(locale: string, path: string) {
  if (locale === DEFAULT_LOCALE) {
    return path;
  }

  return path === "/" ? `/${locale}` : `/${locale}${path}`;
}

function absoluteUrl(path: string) {
  return new URL(path, SITE_URL).toString();
}

export default function sitemap(): MetadataRoute.Sitemap {
  return ROUTES.flatMap((route) => {
    const languages: Record<string, string> = Object.fromEntries(
      LOCALES.map((locale) => [locale, absoluteUrl(localePath(locale, route))]),
    );

    languages["x-default"] = absoluteUrl(localePath(DEFAULT_LOCALE, route));

    return LOCALES.map((locale) => ({
      url: absoluteUrl(localePath(locale, route)),
      changeFrequency: "weekly" as const,
      priority: route === "/" ? 1 : 0.8,
      alternates: {
        languages,
      },
    }));
  });
}
