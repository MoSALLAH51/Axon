import type { Locale } from "@/types";

// ─── Constants ──────────────────────────────────────────────────────────────

export const LOCALES: Locale[] = ["en", "ar"];
export const DEFAULT_LOCALE: Locale = "en";
export const RTL_LOCALES: Locale[] = ["ar"];

// ─── Locale Helpers ─────────────────────────────────────────────────────────

export function isRTL(locale: Locale): boolean {
  return RTL_LOCALES.includes(locale);
}

export function getDir(locale: Locale): "ltr" | "rtl" {
  return isRTL(locale) ? "rtl" : "ltr";
}

// ─── Field Resolution ────────────────────────────────────────────────────────
//
// Given a bilingual object like { title_en: "...", title_ar: "..." },
// and a field name like "title", returns the correct locale value.

type BilingualKey<T extends string> = `${T}_en` | `${T}_ar`;

export function getLocalizedField<
  TObj extends Record<BilingualKey<TField>, string>,
  TField extends string,
>(
  obj: TObj,
  field: TField,
  locale: Locale,
): string {
  const key = `${field}_${locale}` as BilingualKey<TField>;
  return obj[key] ?? obj[`${field}_en` as BilingualKey<TField>] ?? "";
}

// ─── UI Label Maps ───────────────────────────────────────────────────────────
//
// Static UI strings. For a small site with two locales, a simple map is
// sufficient and avoids a heavy i18n library dependency.

type LabelMap = Record<string, string>;
type Labels = Record<Locale, LabelMap>;

export const labels: Labels = {
  en: {
    // Navigation
    "nav.home":        "Home",
    "nav.about":       "About",
    "nav.services":    "Services",
    "nav.projects":    "Projects",
    "nav.contact":     "Contact",
    "nav.companyProfile": "Company Profile",
    "nav.licenses":    "Licenses",
    "nav.certificates": "Certificates",

    // General
    "general.readMore":    "Read More",
    "general.viewAll":     "View All",
    "general.backTo":      "Back to",
    "general.loading":     "Loading…",
    "general.error":       "Something went wrong.",
    "general.noResults":   "No results found.",
    "general.learnMore":   "Learn More",

    // Home
    "home.hero.tagline":   "Crafting Living Landscapes",
    "home.hero.subtitle":  "Premium landscape architecture and design across the UAE.",
    "home.hero.cta":       "Explore Our Work",
    "home.services.title": "Our Services",
    "home.projects.title": "Featured Projects",

    // Contact
    "contact.title":        "Get in Touch",
    "contact.name":         "Full Name",
    "contact.email":        "Email Address",
    "contact.phone":        "Phone Number",
    "contact.subject":      "Subject",
    "contact.message":      "Message",
    "contact.send":         "Send Message",
    "contact.success":      "Your message has been sent. We'll be in touch soon.",
    "contact.error":        "Failed to send. Please try again.",

    // About
    "about.profile":   "Company Profile",
    "about.licenses":  "Licenses",
    "about.certificates": "Certificates",
    "about.vision":    "Our Vision",
    "about.mission":   "Our Mission",
  },
  ar: {
    // Navigation
    "nav.home":        "الرئيسية",
    "nav.about":       "عن الشركة",
    "nav.services":    "خدماتنا",
    "nav.projects":    "مشاريعنا",
    "nav.contact":     "تواصل معنا",
    "nav.companyProfile": "ملف الشركة",
    "nav.licenses":    "التراخيص",
    "nav.certificates": "الشهادات",

    // General
    "general.readMore":    "اقرأ المزيد",
    "general.viewAll":     "عرض الكل",
    "general.backTo":      "العودة إلى",
    "general.loading":     "جار التحميل…",
    "general.error":       "حدث خطأ ما.",
    "general.noResults":   "لا توجد نتائج.",
    "general.learnMore":   "اعرف أكثر",

    // Home
    "home.hero.tagline":   "نصنع بيئات خضراء راقية",
    "home.hero.subtitle":  "هندسة وتصميم مناظر طبيعية فاخرة في جميع أنحاء الإمارات.",
    "home.hero.cta":       "استكشف أعمالنا",
    "home.services.title": "خدماتنا",
    "home.projects.title": "مشاريع مميزة",

    // Contact
    "contact.title":        "تواصل معنا",
    "contact.name":         "الاسم الكامل",
    "contact.email":        "البريد الإلكتروني",
    "contact.phone":        "رقم الهاتف",
    "contact.subject":      "الموضوع",
    "contact.message":      "الرسالة",
    "contact.send":         "إرسال الرسالة",
    "contact.success":      "تم إرسال رسالتك بنجاح. سنتواصل معك قريباً.",
    "contact.error":        "فشل الإرسال. يرجى المحاولة مرة أخرى.",

    // About
    "about.profile":   "ملف الشركة",
    "about.licenses":  "التراخيص",
    "about.certificates": "الشهادات",
    "about.vision":    "رؤيتنا",
    "about.mission":   "رسالتنا",
  },
};

export function t(key: string, locale: Locale): string {
  return labels[locale]?.[key] ?? labels[DEFAULT_LOCALE]?.[key] ?? key;
}
