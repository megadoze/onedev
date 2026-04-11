"use client";

import { useRef, useState, useEffect, useLayoutEffect } from "react";
import { usePathname, useRouter } from "next/navigation";
import { useLocale } from "next-intl";

type Locale = "en" | "es" | "de" | "uk" | "ru";
type Placement = "top" | "bottom";

type LanguageOption = {
  locale: Locale;
  label: string;
  flag: string;
};

const LANG_OPTIONS: LanguageOption[] = [
  { locale: "ru", label: "Русский", flag: "🇷🇺" },
  { locale: "uk", label: "Українська", flag: "🇺🇦" },
  { locale: "en", label: "English", flag: "🇬🇧" },
  { locale: "es", label: "Spanish", flag: "🇪🇸" },
  { locale: "de", label: "German", flag: "🇩🇪" },
];

function cn(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(" ");
}

function stripLocale(pathname: string) {
  const parts = pathname.split("/").filter(Boolean);
  if (LANG_OPTIONS.some((o) => o.locale === parts[0])) {
    return "/" + parts.slice(1).join("/");
  }
  return pathname || "/";
}

function ChevronDown({ open }: { open: boolean }) {
  return (
    <svg
      className={cn(
        "ml-1 h-4 w-4 transition-transform opacity-70",
        open && "rotate-180",
      )}
      viewBox="0 0 20 20"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M6 8l4 4 4-4" />
    </svg>
  );
}

export function LanguagePicker() {
  const router = useRouter();
  const pathname = usePathname() || "/";
  const menuRef = useRef<HTMLDivElement | null>(null);
  const dropdownRef = useRef<HTMLDivElement | null>(null);

  const locale = useLocale() as Locale;
  const selected =
    LANG_OPTIONS.find((o) => o.locale === locale) ?? LANG_OPTIONS[0];

  const [open, setOpen] = useState(false);
  const [placement, setPlacement] = useState<Placement>("bottom");

  useEffect(() => {
    function onDoc(e: MouseEvent) {
      if (!menuRef.current?.contains(e.target as Node)) setOpen(false);
    }

    function onEsc(e: KeyboardEvent) {
      if (e.key === "Escape") setOpen(false);
    }

    document.addEventListener("click", onDoc);
    document.addEventListener("keydown", onEsc);

    return () => {
      document.removeEventListener("click", onDoc);
      document.removeEventListener("keydown", onEsc);
    };
  }, []);

  useLayoutEffect(() => {
    if (!open) return;

    function updatePlacement() {
      const trigger = menuRef.current;
      const dropdown = dropdownRef.current;
      if (!trigger || !dropdown) return;

      const triggerRect = trigger.getBoundingClientRect();
      const dropdownHeight = dropdown.offsetHeight;
      const gap = 8;

      const spaceBelow = window.innerHeight - triggerRect.bottom;
      const spaceAbove = triggerRect.top;

      const fitsBelow = spaceBelow >= dropdownHeight + gap;
      const fitsAbove = spaceAbove >= dropdownHeight + gap;

      if (fitsBelow) {
        setPlacement("bottom");
        return;
      }

      if (fitsAbove) {
        setPlacement("top");
        return;
      }

      setPlacement(spaceBelow >= spaceAbove ? "bottom" : "top");
    }

    updatePlacement();

    window.addEventListener("resize", updatePlacement);
    window.addEventListener("scroll", updatePlacement, true);

    return () => {
      window.removeEventListener("resize", updatePlacement);
      window.removeEventListener("scroll", updatePlacement, true);
    };
  }, [open]);

  return (
    <div className="relative text-sm" ref={menuRef}>
      <button
        type="button"
        aria-haspopup="listbox"
        aria-expanded={open}
        onClick={() => setOpen((v) => !v)}
        className={cn(
          "inline-flex items-center gap-2 rounded-full px-3 py-1.5 cursor-pointer transition",
          "border border-white/15 bg-white/7 text-white/85 hover:bg-white/10",
          "backdrop-blur",
          "focus:outline-none focus-visible:ring-4 focus-visible:ring-white/20",
        )}
      >
        <span
          className={cn(
            "inline-flex h-4 w-4 items-center justify-center rounded-full text-[10px]",
            "bg-white/10 ring-1 ring-white/15",
          )}
        >
          {selected.flag}
        </span>

        <span className="whitespace-nowrap">{selected.label}</span>
        <ChevronDown open={open} />
      </button>

      {open && (
        <div
          ref={dropdownRef}
          className={cn(
            "absolute right-0 z-20 w-64 rounded-xl p-2 backdrop-blur shadow-lg",
            "border border-white/10 bg-[#0B0B0C]/90",
            placement === "bottom"
              ? "top-full mt-2 origin-top-right"
              : "bottom-full mb-2 origin-bottom-right",
          )}
          role="listbox"
        >
          {LANG_OPTIONS.map((opt) => {
            const active = opt.locale === locale;

            return (
              <button
                key={opt.locale}
                type="button"
                className={cn(
                  "w-full flex items-center gap-2 rounded-lg px-3 py-2 text-left text-sm transition my-0.5",
                  "border border-transparent",
                  "text-white/85 hover:bg-white/10 hover:border-white/10",
                  active && "bg-white/10 border-white/12",
                  "focus:outline-none focus-visible:ring-4 focus-visible:ring-white/20",
                )}
                onClick={() => {
                  setOpen(false);

                  document.cookie = `locale=${opt.locale}; path=/; max-age=31536000; samesite=lax`;

                  const clean = stripLocale(pathname);

                  if (opt.locale === "ru") {
                    router.replace(clean);
                    router.refresh();
                    return;
                  }

                  router.replace(
                    clean === "/" ? `/${opt.locale}` : `/${opt.locale}${clean}`,
                  );
                  router.refresh();
                }}
              >
                <span
                  className={cn(
                    "inline-flex h-4 w-4 items-center justify-center rounded-full text-[10px]",
                    "bg-white/10 ring-1 ring-white/15",
                  )}
                >
                  {opt.flag}
                </span>

                <span className="grow">{opt.label}</span>

                {active && (
                  <span
                    className={cn(
                      "ml-2 inline-flex h-5 w-5 items-center justify-center rounded-full border",
                      "bg-white/10 border-white/10 text-white/80",
                    )}
                    aria-hidden="true"
                  >
                    <svg
                      viewBox="0 0 24 24"
                      className="h-4 w-4"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M20 6L9 17l-5-5" />
                    </svg>
                  </span>
                )}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}
