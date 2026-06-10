"use client";

import { useState, useEffect, useCallback } from "react";
import type { Locale } from "@/types";
import { DEFAULT_LOCALE, getDir } from "@/lib/i18n";

const LOCALE_COOKIE = "axon_locale";

function readLocaleCookie(): Locale {
  if (typeof document === "undefined") return DEFAULT_LOCALE;
  const match = document.cookie
    .split("; ")
    .find((row) => row.startsWith(`${LOCALE_COOKIE}=`));
  const value = match?.split("=")[1];
  return value === "ar" || value === "en" ? value : DEFAULT_LOCALE;
}

/**
 * Provides the current locale and a setter that:
 *  1. Updates React state
 *  2. Persists to a cookie
 *  3. Switches the <html> dir and lang attributes for RTL support
 */
export function useLocale() {
  const [locale, setLocaleState] = useState<Locale>(DEFAULT_LOCALE);

  useEffect(() => {
    const saved = readLocaleCookie();
    setLocaleState(saved);
    applyToDocument(saved);
  }, []);

  const setLocale = useCallback((next: Locale) => {
    setLocaleState(next);
    document.cookie = `${LOCALE_COOKIE}=${next}; path=/; max-age=31536000; SameSite=Lax`;
    applyToDocument(next);
  }, []);

  return { locale, setLocale };
}

function applyToDocument(locale: Locale) {
  if (typeof document === "undefined") return;
  document.documentElement.lang = locale;
  document.documentElement.dir  = getDir(locale);
}
