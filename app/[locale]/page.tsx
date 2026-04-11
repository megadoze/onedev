import type { Metadata } from "next";
import { notFound } from "next/navigation";
import B2BClient from "./b2bClient";

const LOCALES = ["en", "es", "de", "uk", "ru"] as const;
const DEFAULT_LOCALE = "ru";

const SITE_NAME = "ONEDEV";
const CANONICAL = "/";
const siteUrl = "https://onedev.work";

const META_BY_LOCALE: Record<
  (typeof LOCALES)[number],
  { title: string; description: string }
> = {
  ru: {
    title: "Разработка сайтов, CRM и веб-систем | OneDev",
    description:
      "Сайты, лендинги, CRM, онлайн-бронирование и внутренние системы — под реальные бизнес-задачи. От идеи до запуска.",
  },
  uk: {
    title: "Розробка сайтів, CRM і веб-систем | OneDev",
    description:
      "Сайти, лендінги, CRM, онлайн-бронювання та внутрішні системи — під реальні задачі бізнесу. Від ідеї до запуску.",
  },
  en: {
    title: "Websites, CRM & Web Systems | OneDev",
    description:
      "Websites, landing pages, CRM systems, booking tools and internal platforms built for real business needs. From idea to launch.",
  },
  es: {
    title: "Sitios web, CRM y sistemas web | OneDev",
    description:
      "Sitios web, landing pages, CRM, reservas online y sistemas internos para necesidades reales de negocio. De la idea al lanzamiento.",
  },
  de: {
    title: "Websites, CRM und Websysteme | OneDev",
    description:
      "Websites, Landingpages, CRM, Buchungssysteme und interne Lösungen für reale Geschäftsanforderungen. Von der Idee bis zum Launch.",
  },
};

function normalizeBaseUrl(url: string) {
  return url.replace(/\/+$/, "");
}

function localePath(locale: string, path: string) {
  return locale === DEFAULT_LOCALE ? path : `/${locale}${path}`;
}

function getOgLocale(locale: (typeof LOCALES)[number]) {
  switch (locale) {
    case "ru":
      return "ru_RU";
    case "uk":
      return "uk_UA";
    case "de":
      return "de_DE";
    case "es":
      return "es_ES";
    case "en":
    default:
      return "en_US";
  }
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;

  if (!LOCALES.includes(locale as any)) {
    notFound();
  }

  const typedLocale = locale as (typeof LOCALES)[number];
  const base = normalizeBaseUrl(siteUrl);
  const meta = META_BY_LOCALE[typedLocale];

  const canonicalPath = localePath(typedLocale, CANONICAL);
  const canonicalAbs = base ? `${base}${canonicalPath}` : canonicalPath;

  const languages: Record<string, string> = {};
  for (const l of LOCALES) {
    const pth = localePath(l, CANONICAL);
    languages[l] = base ? `${base}${pth}` : pth;
  }

  languages["x-default"] = base
    ? `${base}${localePath(DEFAULT_LOCALE, CANONICAL)}`
    : localePath(DEFAULT_LOCALE, CANONICAL);

  const ogImage = base ? `${base}/og.jpg` : "/og.jpg";

  return {
    title: meta.title,
    description: meta.description,
    alternates: {
      canonical: canonicalAbs,
      languages,
    },
    openGraph: {
      type: "website",
      title: meta.title,
      description: meta.description,
      url: canonicalAbs,
      siteName: SITE_NAME,
      locale: getOgLocale(typedLocale),
      images: [
        {
          url: ogImage,
          width: 1200,
          height: 630,
          alt: SITE_NAME,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: meta.title,
      description: meta.description,
      images: [ogImage],
    },
    robots: {
      index: true,
      follow: true,
    },
  };
}

export default async function Page({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  if (!LOCALES.includes(locale as any)) {
    notFound();
  }

  return <B2BClient />;
}
