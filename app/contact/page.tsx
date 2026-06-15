"use client";

import { useLocaleContext } from "@/components/providers/LocaleProvider";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { ContactForm } from "@/components/sections/ContactForm";
import { cn } from "@/lib/utils";

/* ------------------------------------------------------------------ */
/*  Translations                                                        */
/* ------------------------------------------------------------------ */

const T = {
  en: {
    badge:          "Reach Out",
    heroTitle:      "Let's Work Together",
    heroDesc:       "We'd love to hear about your project. Fill in the form and our team will be in touch within 24 hours.",
    formLabel:      "Send Us a Message",
    sidebarLabel:   "Get in Touch",
    followLabel:    "Follow Us",
    locationLabel:  "Location",
    mapsLink:       "Open in Google Maps →",
    reassurance:    "We respond to all inquiries within",
    hours:          "24 hours",
    reassurance2:   ". Your information is kept strictly confidential.",
    address:        "Al-Muhafaza, Aleppo, Syria.",
    addressLabel:   "Address",
    emailLabel:     "Email",
    phoneLabel:     "Phone",
    hoursLabel:     "Working Hours",
  },
  ar: {
    badge:          "تواصل معنا",
    heroTitle:      "لنعمل معاً",
    heroDesc:       "يسعدنا سماع تفاصيل مشروعك. أرسل لنا رسالة وسيتواصل معك فريقنا خلال 24 ساعة.",
    formLabel:      "أرسل لنا رسالة",
    sidebarLabel:   "تواصل معنا",
    followLabel:    "تابعنا",
    locationLabel:  "الموقع",
    mapsLink:       "→ فتح في خرائط جوجل",
    reassurance:    "نرد على جميع الاستفسارات خلال",
    hours:          "24 ساعة",
    reassurance2:   ". تظل معلوماتك سرية تماماً.",
    address:        "الجمهورية العربية السورية، محافظة حلب - حي المحافظة",
    addressLabel:   "العنوان",
    emailLabel:     "البريد الإلكتروني",
    phoneLabel:     "الهاتف",
    hoursLabel:     "ساعات العمل",
  },
};

const FALLBACK_PHONES = [
  { href: "tel:+963214731300", label: "+963 • 21 • 473 1300" },
];

/* ------------------------------------------------------------------ */
/*  Component                                                           */
/* ------------------------------------------------------------------ */

export default function ContactPage() {
  const { locale } = useLocaleContext();
  const isRTL = locale === "ar";
  const t = T[locale];

  return (
    <div dir={isRTL ? "rtl" : "ltr"}>

      {/* ── PAGE HEADER ── */}
      <div className="bg-sand-50 border-b border-sand-100 relative overflow-hidden min-h-[280px] md:min-h-[320px] flex items-center">
        <Container className="py-30 md:py-34">
          <div className={cn("max-w-2xl", isRTL && "text-right")}>
            <p className="font-body text-[10px] font-semibold tracking-[0.22em] uppercase text-forest-500 mb-5">
              {t.badge}
            </p>
            <h1 className="font-display text-5xl md:text-6xl lg:text-7xl text-charcoal-900 leading-[1.05] mb-6">
              {t.heroTitle}
            </h1>
            <div className="w-10 h-0.5 bg-forest-400 mb-6" />
            <p className="font-body text-sm md:text-base text-charcoal-500 leading-relaxed max-w-lg">
              {t.heroDesc}
            </p>
          </div>
        </Container>

        {/* Decorative illustration */}
        <div className={cn(
          "absolute top-10 bottom-0 items-center pointer-events-none hidden lg:flex",
          isRTL ? "left-0 pl-12" : "right-0 pr-12"
        )}>
          <ContactIllustration />
        </div>
      </div>

      <Section spacing="lg">
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-16">

            {/* ── Form ── */}
            <div className="lg:col-span-3">
              <p className="font-body text-[10px] font-semibold tracking-[0.22em] uppercase text-forest-500 mb-8">
                {t.formLabel}
              </p>
              <ContactForm />
            </div>

            {/* ── Sidebar ── */}
            <aside className="lg:col-span-2 space-y-10">

              {/* Contact info */}
              <div>
                <p className={cn("font-body text-[10px] font-semibold tracking-[0.22em] uppercase text-forest-500 mb-8", isRTL && "text-right")}>
                  {t.sidebarLabel}
                </p>

                <ul className="space-y-5">

                  {/* Phones */}
                  <li className={cn("flex gap-4", isRTL && "flex-row-reverse")}>
                    <div className="w-11 h-11 rounded-full bg-forest-50 border border-forest-200 flex items-center justify-center shrink-0 text-forest-700 mt-0.5">
                      <PhoneIcon />
                    </div>
                    <div className="pt-0.5">
                      <p className={cn("font-body text-[10px] font-semibold tracking-[0.15em] uppercase text-charcoal-400 mb-1", isRTL && "text-right")}>
                        {t.phoneLabel}
                      </p>
                      <div className="flex flex-col gap-0.5" dir="ltr">
                        {FALLBACK_PHONES.map((p) => (
                          <a key={p.href} href={p.href} className="font-body text-sm text-charcoal-700 hover:text-forest-600 transition-colors">
                            {p.label}
                          </a>
                        ))}
                      </div>
                    </div>
                  </li>

                  {/* Email */}
                  <li className={cn("flex gap-4", isRTL && "flex-row-reverse")}>
                    <div className="w-11 h-11 rounded-full bg-forest-50 border border-forest-200 flex items-center justify-center shrink-0 text-forest-700">
                      <EnvelopeIcon />
                    </div>
                    <div className="pt-0.5">
                      <p className={cn("font-body text-[10px] font-semibold tracking-[0.15em] uppercase text-charcoal-400 mb-1", isRTL && "text-right")}>
                        {t.emailLabel}
                      </p>
                      <a href="mailto:info@axonlandscape.com" className="font-body text-sm text-charcoal-700 hover:text-forest-600 transition-colors">
                        info@axonlandscape.com
                      </a>
                    </div>
                  </li>

                  {/* Address */}
                  <li className={cn("flex gap-4", isRTL && "flex-row-reverse")}>
                    <div className="w-11 h-11 rounded-full bg-forest-50 border border-forest-200 flex items-center justify-center shrink-0 text-forest-700">
                      <MapPinIcon />
                    </div>
                    <div className="pt-0.5">
                      <p className={cn("font-body text-[10px] font-semibold tracking-[0.15em] uppercase text-charcoal-400 mb-1", isRTL && "text-right")}>
                        {t.addressLabel}
                      </p>
                      <p className={cn("font-body text-sm text-charcoal-700 leading-relaxed", isRTL && "text-right")}>
                        {t.address}
                      </p>
                    </div>
                  </li>

                </ul>
              </div>

              {/* Google Maps link */}
              <div>
                <p className={cn("font-body text-[10px] font-semibold tracking-[0.15em] uppercase text-charcoal-400 mb-3", isRTL && "text-right")}>
                  {t.locationLabel}
                </p>
                
                <a
                  href="https://maps.google.com/maps?q=Al-Muhafaza+Aleppo+Syria"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={cn(
                    "group flex items-center gap-3 bg-sand-50 border border-sand-200 rounded-xl px-5 py-4 hover:border-forest-300 hover:shadow-sm transition-all duration-200",
                    isRTL && "flex-row-reverse"
                  )}
                >
                  <div className="w-8 h-8 rounded-full bg-forest-100 border border-forest-200 flex items-center justify-center shrink-0 text-forest-700">
                    <MapPinIcon />
                  </div>
                  <span className="font-body text-sm text-charcoal-600 group-hover:text-forest-700 transition-colors">
                    {t.mapsLink}
                  </span>
                </a>
              </div>

              {/* Reassurance strip */}
              <div className="bg-forest-50 border border-forest-100 rounded-2xl px-6 py-5">
                <div className={cn("flex items-start gap-4", isRTL && "flex-row-reverse")}>
                  <div className="w-10 h-10 rounded-full bg-forest-100 border border-forest-200 flex items-center justify-center shrink-0 text-forest-700">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75 11.25 15 15 9.75m-3-7.036A11.959 11.959 0 0 1 3.598 6 11.99 11.99 0 0 0 3 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285Z" />
                    </svg>
                  </div>
                  <p className={cn("font-body text-sm text-charcoal-600 leading-relaxed", isRTL && "text-right")}>
                    {t.reassurance}{" "}
                    <span className="font-semibold text-charcoal-800">{t.hours}</span>
                    {t.reassurance2}
                  </p>
                </div>
              </div>

            </aside>
          </div>
        </Container>
      </Section>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Icons                                                               */
/* ------------------------------------------------------------------ */
function PhoneIcon() {
  return (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24" aria-hidden>
      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 3.6 1.27h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 8.91a16 16 0 0 0 6 6l.91-.91a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z" />
    </svg>
  );
}
function EnvelopeIcon() {
  return (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24" aria-hidden>
      <rect width="20" height="16" x="2" y="4" rx="2" />
      <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
    </svg>
  );
}
function MapPinIcon() {
  return (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24" aria-hidden>
      <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
      <circle cx="12" cy="10" r="3" />
    </svg>
  );
}

function ContactIllustration() {
  return (
    <svg
      className="w-72 h-72 text-forest-300 opacity-60"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.2}
      viewBox="0 0 140 160"
      aria-hidden="true"
    >
      <rect x="15" y="45" width="95" height="68" rx="5" />
      <path d="M15 45 L62 85 L110 45" strokeLinejoin="round" />
      <line x1="15" y1="113" x2="48" y2="82" strokeLinecap="round" />
      <line x1="110" y1="113" x2="77" y2="82" strokeLinecap="round" />
      <line x1="38" y1="98" x2="62" y2="98" strokeLinecap="round" strokeOpacity="0.5" />
      <line x1="38" y1="106" x2="55" y2="106" strokeLinecap="round" strokeOpacity="0.5" />
    </svg>
  );
}