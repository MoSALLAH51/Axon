"use client";

import { createContext, useContext } from "react";
import { useLocale } from "@/hooks/useLocale";
import type { Locale } from "@/types";

/* ------------------------------------------------------------------ */
/*  Context                                                             */
/* ------------------------------------------------------------------ */

interface LocaleContextValue {
  locale: Locale;
  setLocale: (locale: Locale) => void;
}

const LocaleContext = createContext<LocaleContextValue>({
  locale: "en",
  setLocale: () => {},
});

/* ------------------------------------------------------------------ */
/*  Provider                                                            */
/* ------------------------------------------------------------------ */

export function LocaleProvider({ children }: { children: React.ReactNode }) {
  const { locale, setLocale } = useLocale();

  return (
    <LocaleContext.Provider value={{ locale, setLocale }}>
      {children}
    </LocaleContext.Provider>
  );
}

/* ------------------------------------------------------------------ */
/*  Hook                                                                */
/* ------------------------------------------------------------------ */

export function useLocaleContext(): LocaleContextValue {
  return useContext(LocaleContext);
}