"use client";

import { useLocaleContext } from "@/components/providers/LocaleProvider";
import { cn } from "@/lib/utils";

interface LocaleSwitcherProps {
  className?: string;
}

export function LocaleSwitcher({ className }: LocaleSwitcherProps) {
  const { locale, setLocale } = useLocaleContext();

  return (
    <div className={cn("flex items-center gap-0.5", className)}>
      <button
        onClick={() => setLocale("en")}
        aria-label="Switch to English"
        className={cn(
          "px-2.5 py-1 font-body text-xs font-semibold tracking-wide transition-colors duration-150 rounded-sm",
          locale === "en"
            ? "bg-forest-400 text-white"
            : "text-charcoal-500 hover:text-charcoal-900",
        )}
      >
        EN
      </button>

      <span className="text-charcoal-300 text-xs select-none">|</span>

      <button
        onClick={() => setLocale("ar")}
        aria-label="التبديل إلى العربية"
        className={cn(
          "px-2.5 py-1 font-body text-xs font-semibold tracking-wide transition-colors duration-150 rounded-sm",
          locale === "ar"
            ? "bg-forest-400 text-white"
            : "text-charcoal-500 hover:text-charcoal-900",
        )}
      >
        AR
      </button>
    </div>
  );
}