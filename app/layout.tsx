// app/layout.tsx
import "./globals.css";
import type { Metadata } from "next";
import { headers } from "next/headers";
import { Inter_Tight, Montserrat, Roboto_Condensed } from "next/font/google";

export const metadata: Metadata = {
  title: "OneDev",
  description: "OneDev",
};

const interTight = Inter_Tight({
  subsets: ["latin", "cyrillic"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-inter-tight",
});

const robotoCondensed = Roboto_Condensed({
  subsets: ["latin"],
  weight: ["300", "400", "700", "800", "900"],
  variable: "--font-roboto-condensed",
  display: "swap",
});

const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-montserrat",
  display: "swap",
});

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const headersList = await headers();
  const locale = headersList.get("x-next-intl-locale") || "ru";

  return (
    <html lang={locale}>
      <body
        className={`${interTight.className} ${montserrat.variable} ${robotoCondensed.variable}`}
      >
        {children}
      </body>
    </html>
  );
}
