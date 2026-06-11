"use client";

import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { useLocaleContext } from "@/components/providers/LocaleProvider";

const QUICK_LINKS = {
  en: [
    { label: "Home",         href: "/" },
    { label: "About Us",     href: "/about/company-profile" },
    { label: "Services",     href: "/services" },
    { label: "Projects",     href: "/projects" },
    { label: "Contact Us",   href: "/contact" },
  ],
  ar: [
    { label: "الرئيسية",     href: "/" },
    { label: "من نحن",       href: "/about/company-profile" },
    { label: "خدماتنا",      href: "/services" },
    { label: "مشاريعنا",     href: "/projects" },
    { label: "تواصل معنا",   href: "/contact" },
  ],
};

const CONTACT = {
  en: {
    title:    "Contact Info",
    address1: "UAE - Abu Dhabi",
    address2: "Kamala Tower - 1602",
    privacy:  "Privacy Policy",
    terms:    "Terms & Conditions",
    rights:   "All Rights Reserved.",
    tagline:  "Designing and maintaining outdoor spaces that inspire and last.",
    quickLinks: "Quick Links",
  },
  ar: {
    title:    "معلومات التواصل",
    address1: "الإمارات - أبوظبي",
    address2: "برج كمالا - 1602",
    privacy:  "سياسة الخصوصية",
    terms:    "الشروط والأحكام",
    rights:   "جميع الحقوق محفوظة.",
    tagline:  "نصمم ونحافظ على المساحات الخارجية التي تُلهم وتدوم.",
    quickLinks: "روابط سريعة",
  },
};

export function Footer() {
  const { locale } = useLocaleContext();
  const isRTL = locale === "ar";
  const year = new Date().getFullYear();

  const quickLinks = QUICK_LINKS[locale];
  const t          = CONTACT[locale];

  return (
    <footer className="bg-forest-600 text-white" dir={isRTL ? "rtl" : "ltr"}>
      {/* ── Main Grid ── */}
      <Container>
        <div className="grid grid-cols-1 gap-12 sm:grid-cols-2 lg:grid-cols-3 py-16">

          {/* ── Brand ── */}
          <div className="flex flex-col gap-5">
            <Link href="/" className="inline-block">
              <div className="flex flex-col leading-none">
                <span className="font-display text-5xl font-bold text-white tracking-tight">
                  AXON
                </span>
                <span className="text-[11px] font-body tracking-[0.35em] uppercase text-white/80 mt-0.5 ml-0.5">
                  LANDSCAPE
                </span>
                <div className="flex items-center gap-1.5 mt-1.5">
                  <span className="h-px flex-1 bg-white/30" />
                  <span className="text-[9px] tracking-widest text-white/60 font-light">
                    ─── أكسون للتنسيق ───
                  </span>
                  <span className="h-px flex-1 bg-white/30" />
                </div>
              </div>
            </Link>

            <p className="font-body text-sm text-white/75 leading-relaxed max-w-[220px]">
              {t.tagline}
            </p>

            {/* Social icons */}
            <div className="flex gap-3 mt-1">
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" aria-label="Facebook"
                className="w-9 h-9 rounded-full border border-white/30 flex items-center justify-center text-white/70 hover:border-white hover:text-white transition-colors">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
                </svg>
              </a>
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" aria-label="Instagram"
                className="w-9 h-9 rounded-full border border-white/30 flex items-center justify-center text-white/70 hover:border-white hover:text-white transition-colors">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={1.8} viewBox="0 0 24 24">
                  <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                  <circle cx="12" cy="12" r="4" />
                  <circle cx="17.5" cy="6.5" r="0.5" fill="currentColor" />
                </svg>
              </a>
              <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn"
                className="w-9 h-9 rounded-full border border-white/30 flex items-center justify-center text-white/70 hover:border-white hover:text-white transition-colors">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6zM2 9h4v12H2z" />
                  <circle cx="4" cy="4" r="2" />
                </svg>
              </a>
            </div>
          </div>

          {/* ── Quick Links ── */}
          <div>
            <h4 className="font-body text-sm font-semibold text-white mb-6">{t.quickLinks}</h4>
            <ul className="space-y-3">
              {quickLinks.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="font-body text-sm text-white/70 hover:text-white transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* ── Contact Info ── */}
          <div>
            <h4 className="font-body text-sm font-semibold text-white mb-6">{t.title}</h4>
            <address className="not-italic space-y-4">

              {/* Phones */}
              <div className="flex items-start gap-3 text-sm text-white/70 ">
                <div className="w-7 h-7 rounded-full border border-white/25 flex items-center justify-center shrink-0 mt-0.5">
                  <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth={1.8} viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 0 0 2.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 0 1-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 0 0-1.091-.852H4.5A2.25 2.25 0 0 0 2.25 4.5v2.25Z" />
                  </svg>
                </div>
                <div className="flex flex-col gap-0.5" dir="ltr">
                  <a href="tel:+97126676877" className="hover:text-white transition">+971 2 667 6877</a>
                  <a href="tel:+97126282444" className="hover:text-white transition">+971 2 628 2444</a>
                  <a href="tel:+97126282999" className="hover:text-white transition">+971 2 628 2999</a>
                  <a href="tel:+971529987406" className="hover:text-white transition">+971 52 998 7406</a>
                </div>
              </div>

              {/* Email */}
              <a href="mailto:info@axonlandscape.com"
                className="flex items-center gap-3 text-sm text-white/70 hover:text-white transition-colors">
                <div className="w-7 h-7 rounded-full border border-white/25 flex items-center justify-center shrink-0">
                  <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth={1.8} viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 0 1-2.25 2.25h-15a2.25 2.25 0 0 1-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25m19.5 0v.243a2.25 2.25 0 0 1-1.07 1.916l-7.5 4.615a2.25 2.25 0 0 1-2.36 0L3.32 8.91a2.25 2.25 0 0 1-1.07-1.916V6.75" />
                  </svg>
                </div>
                info@axonlandscape.com
              </a>

              {/* Address */}
              <div className="flex items-start gap-3 text-sm text-white/70">
                <div className="w-7 h-7 rounded-full border border-white/25 flex items-center justify-center shrink-0 mt-0.5">
                  <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth={1.8} viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z" />
                  </svg>
                </div>
                <div className="flex flex-col gap-0.5 font-semibold text-white">
                  <span>{t.address1}</span>
                  <span>{t.address2}</span>
                </div>
              </div>

            </address>
          </div>

        </div>
      </Container>

      {/* ── Bottom Bar ── */}
      <div className="border-t border-forest-700">
        <Container>
          <div className="flex flex-col sm:flex-row items-center justify-between gap-3 py-6">
            <p className="font-body text-xs text-white/50">
              &copy; {year} Axon Landscape. {t.rights}
            </p>
            <div className="flex gap-6">
              <Link href="/privacy-policy" className="font-body text-xs text-white/50 hover:text-white/80 transition-colors">
                {t.privacy}
              </Link>
              <Link href="/terms" className="font-body text-xs text-white/50 hover:text-white/80 transition-colors">
                {t.terms}
              </Link>
            </div>
          </div>
        </Container>
      </div>
    </footer>
  );
}