"use client";

import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { Button } from "@/components/ui/Button";
import { useLocaleContext } from "@/components/providers/LocaleProvider";
import { cn } from "@/lib/utils";

/* ------------------------------------------------------------------ */
/*  Static data                                                         */
/* ------------------------------------------------------------------ */

const ABOUT_LINKS = {
  en: [
    { label: "Company Profile", description: "Our story, vision, mission, and founding values.",                          href: "/about/company-profile", number: "01" },
    { label: "Licenses",        description: "Official trade and professional licenses issued by UAE authorities.",        href: "/about/licenses",        number: "02" },
    { label: "Certificates",    description: "International and local certifications that validate our expertise.",        href: "/about/certificates",    number: "03" },
  ],
  ar: [
    { label: "ملف الشركة",  description: "قصتنا، رؤيتنا، مهمتنا، وقيمنا التأسيسية.",                   href: "/about/company-profile", number: "01" },
    { label: "التراخيص",    description: "التراخيص التجارية والمهنية الرسمية الصادرة عن الجهات الإماراتية.", href: "/about/licenses",        number: "02" },
    { label: "الشهادات",    description: "الشهادات الدولية والمحلية التي تُثبت كفاءتنا وخبرتنا.",          href: "/about/certificates",    number: "03" },
  ],
};

const STATS = {
  en: [
    { value: "2010",  label: "Year Founded" },
    { value: "50+",   label: "Team Members" },
    { value: "250+",  label: "Projects Completed" },
    { value: "2", label: "Countries Served" },
  ],
  ar: [
    { value: "2010",  label: "سنة التأسيس" },
    { value: "50+",   label: "أعضاء الفريق" },
    { value: "250+",  label: "مشروع منجز" },
    { value: "2", label: "دول نخدمها" },
  ],
};

const VALUES = {
  en: [
    { title: "Sustainability", desc: "Designing with nature, not against it." },
    { title: "Excellence",     desc: "Uncompromising quality in every detail." },
    { title: "Partnership",    desc: "Your vision guides every decision we make." },
  ],
  ar: [
    { title: "الاستدامة",   desc: "نصمم مع الطبيعة، لا ضدها." },
    { title: "التميز",      desc: "جودة لا تقبل المساومة في كل تفصيل." },
    { title: "الشراكة",     desc: "رؤيتك هي التي تقود كل قراراتنا." },
  ],
};

const T = {
  en: {
    badge:        "About Us",
    heroTitle:    "Who We Are",
    heroDesc:     "We are a landscape architecture firm passionate about transforming outdoor environments into extraordinary spaces.",
    viewBtn:      "View →",
    visionLabel:  "Our Vision",
    missionLabel: "Our Mission",
    ctaBtn:       "Work With Us",
  },
  ar: {
    badge:        "من نحن",
    heroTitle:    "تعرّف علينا",
    heroDesc:     "نحن شركة هندسة مناظر طبيعية شغوفة بتحويل البيئات الخارجية إلى مساحات استثنائية.",
    viewBtn:      "عرض ←",
    visionLabel:  "رؤيتنا",
    missionLabel: "مهمتنا",
    ctaBtn:       "تواصل معنا",
  },
};

/* ------------------------------------------------------------------ */
/*  Component                                                           */
/* ------------------------------------------------------------------ */

export default function AboutPage() {
  const { locale } = useLocaleContext();
  const isRTL = locale === "ar";
  const t          = T[locale];
  const aboutLinks = ABOUT_LINKS[locale];
  const stats      = STATS[locale];
  const values     = VALUES[locale];

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
            <div className={cn("w-10 h-0.5 bg-forest-400 mb-6", isRTL && "mr-0")} />
            <p className="font-body text-sm md:text-base text-charcoal-500 leading-relaxed max-w-lg">
              {t.heroDesc}
            </p>
          </div>
        </Container>

        {/* Decorative illustration */}
        <div className={cn(
          "absolute top-20 bottom-0 items-center pointer-events-none hidden lg:flex",
          isRTL ? "left-0 pl-12" : "right-0 pr-12"
        )}>
          <AboutIllustration />
        </div>
      </div>

      <Section spacing="lg">
        <Container>

          {/* ── Stats Row ── */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-20 pb-20 border-b border-sand-200">
            {stats.map((stat) => (
              <div key={stat.label} className="text-center">
                <p className="font-display text-display-lg text-forest-600">{stat.value}</p>
                <p className="mt-1 font-body text-xs font-medium tracking-[0.15em] uppercase text-charcoal-400">
                  {stat.label}
                </p>
              </div>
            ))}
          </div>

          {/* ── Sub-page Navigation Cards ── */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-24">
            {aboutLinks.map(({ label, description, href, number }, i) => (
              <Link
                key={href}
                href={href}
                className="group relative flex flex-col bg-white border border-sand-200 rounded-2xl p-8 hover:border-forest-300 hover:shadow-md transition-all duration-300"
              >
                <span className="block font-display text-5xl text-sand-200 group-hover:text-forest-100 transition-colors mb-6 leading-none">
                  {number}
                </span>
                {/* Icon per card */}
                <div className="w-12 h-12 rounded-xl bg-forest-50 border border-forest-100 flex items-center justify-center mb-5 text-forest-700 transition-all duration-300 group-hover:bg-forest-100">
                  {i === 0 && <CompanyProfileIcon />}
                  {i === 1 && <LicenseIcon />}
                  {i === 2 && <CertificateIcon />}
                </div>
                <h2 className={cn("font-display text-2xl text-charcoal-900 mb-3 leading-snug", isRTL && "text-right")}>
                  {label}
                </h2>
                <p className={cn("font-body text-sm text-charcoal-500 leading-relaxed mb-6 flex-1", isRTL && "text-right")}>
                  {description}
                </p>
                <span className={cn("inline-flex items-center gap-1.5 text-xs font-body font-semibold tracking-[0.15em] uppercase text-forest-700 group-hover:text-forest-500 transition-colors", isRTL && "flex-row-reverse")}>
                  {t.viewBtn}
                </span>
              </Link>
            ))}
          </div>

          {/* ── Vision / Mission ── */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-16">
            <div className="bg-forest-900 rounded-2xl p-10">
              <span className="inline-block mb-4 text-[10px] font-body font-semibold tracking-[0.22em] uppercase text-forest-400">
                {t.visionLabel}
              </span>
              <p className={cn("font-display text-2xl md:text-3xl text-sand-50 leading-snug", isRTL && "text-right")}>
                {locale === "ar"
                  ? "أن نكون المرجع الأول في تصميم وتطوير البيئات الخارجية في المنطقة."
                  : "To be the leading reference in designing and developing outdoor environments across the UAE and the region."}
              </p>
            </div>
            <div className="bg-sand-100 border border-sand-200 rounded-2xl p-10">
              <span className="inline-block mb-4 text-[10px] font-body font-semibold tracking-[0.22em] uppercase text-forest-600">
                {t.missionLabel}
              </span>
              <p className={cn("font-display text-2xl md:text-3xl text-charcoal-800 leading-snug", isRTL && "text-right")}>
                {locale === "ar"
                  ? "تقديم بيئات خارجية جميلة ومستدامة ترفع جودة الحياة وتُلهم المجتمعات."
                  : "Delivering beautiful, sustainable outdoor environments that elevate quality of life and inspire communities."}
              </p>
            </div>
          </div>

          {/* ── Values Strip ── */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 bg-sand-50 border border-sand-200 rounded-2xl px-8 py-8 mb-16">
            {values.map((v, i) => (
              <div key={i} className={cn("flex items-start gap-4", isRTL && "flex-row-reverse text-right")}>
                <div className="w-11 h-11 rounded-full bg-forest-100 border border-forest-200 flex items-center justify-center shrink-0 text-forest-700">
                  {i === 0 && <SustainabilityIcon />}
                  {i === 1 && <ExcellenceIcon />}
                  {i === 2 && <PartnershipIcon />}
                </div>
                <div>
                  <p className="font-body font-semibold text-sm text-charcoal-900 mb-1">{v.title}</p>
                  <p className="font-body text-xs text-charcoal-500 leading-relaxed">{v.desc}</p>
                </div>
              </div>
            ))}
          </div>

          {/* ── CTA ── */}
          <div className="text-center pt-4">
            <Button href="/contact" variant="primary" size="lg">
              {t.ctaBtn}
            </Button>
          </div>

        </Container>
      </Section>
    </div>
  );
}

function AboutIllustration() {
  return (
    <svg
      className="w-72 h-72 text-forest-300 opacity-60"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.2}
      viewBox="0 0 140 160"
      aria-hidden="true"
    >
      <path d="M30 140 C20 100, 10 60, 45 30 C60 20, 70 40, 55 70 C45 90, 35 115, 30 140Z" />
      <line x1="30" y1="140" x2="50" y2="50" strokeLinecap="round" />


      <path d="M95 135 C88 95, 82 55, 112 28 C125 18, 135 38, 120 65 C110 85, 98 110, 95 135Z" />
      <line x1="95" y1="135" x2="112" y2="48" strokeLinecap="round" />

      <line
        x1="15"
        y1="148"
        x2="125"
        y2="148"
        strokeLinecap="round"
        strokeOpacity="0.4"
      />
    </svg>
  );
}
/* ------------------------------------------------------------------ */
/*  Navigation card icons                                               */
/* ------------------------------------------------------------------ */

/**
 * Company Profile — sprouting seedling: growth, origins, living brand.
 */
function CompanyProfileIcon() {
  return (
    <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
      {/* stem */}
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 22V12" />
      {/* left leaf */}
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 16c-2 0-5-1.5-5-5 0 0 2.5.5 5 2.5" />
      {/* right leaf */}
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 13c2-1.5 5-2.5 5-2.5 0 3.5-3 5-5 5" />
      {/* ground line */}
      <path strokeLinecap="round" strokeLinejoin="round" d="M9 22h6" />
    </svg>
  );
}

/**
 * License — shield with checkmark: official approval, compliance, trust.
 */
function LicenseIcon() {
  return (
    <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M12 3l7.5 3v5c0 4.5-3.5 8-7.5 9.5C8.5 19 4.5 15.5 4.5 11V6L12 3Z"
      />
      <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4" />
    </svg>
  );
}

/**
 * Certificate — award rosette / medal: quality accreditation symbol.
 */
function CertificateIcon() {
  return (
    <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
      {/* medal circle */}
      <circle cx="12" cy="9" r="4.5" />
      {/* inner star detail */}
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 7l.75 1.5H14.5l-1.375 1 .5 1.75L12 10.25l-1.625 1 .5-1.75L9.5 8.5h1.75L12 7Z" />
      {/* left ribbon tail */}
      <path strokeLinecap="round" strokeLinejoin="round" d="M9 13.5L7.5 21l4.5-2.5" />
      {/* right ribbon tail */}
      <path strokeLinecap="round" strokeLinejoin="round" d="M15 13.5L16.5 21 12 18.5" />
    </svg>
  );
}

/* ------------------------------------------------------------------ */
/*  Values strip icons                                                  */
/* ------------------------------------------------------------------ */

/**
 * Sustainability — a leaf: the core symbol of eco-conscious landscaping.
 */
function SustainabilityIcon() {
  return (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
      {/* leaf shape */}
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M4.5 19.5c4-8 9-13.5 15-15C18 10 13 15.5 4.5 19.5Z"
      />
      {/* leaf vein / stem */}
      <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 19.5L12 12" />
    </svg>
  );
}

/**
 * Excellence — a rising sun over a horizon: radiance, brilliance,
 * the aspiration to always rise above — more evocative than a generic star.
 */
function ExcellenceIcon() {
  return (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
      {/* horizon line */}
      <path strokeLinecap="round" strokeLinejoin="round" d="M3 17h18" />
      {/* sun arc rising above horizon */}
      <path strokeLinecap="round" strokeLinejoin="round" d="M6.5 17a5.5 5.5 0 0 1 11 0" />
      {/* top ray */}
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 5v2" />
      {/* left rays */}
      <path strokeLinecap="round" strokeLinejoin="round" d="M6.2 7.2l1.4 1.4" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M4 12H6" />
      {/* right rays */}
      <path strokeLinecap="round" strokeLinejoin="round" d="M17.8 7.2l-1.4 1.4" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M20 12h-2" />
    </svg>
  );
}

/**
 * Partnership — two hands in a handshake: collaboration, client focus,
 * shared goals between Axon and its clients.
 */
function PartnershipIcon() {
  return (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M15.75 9.75H18a2.25 2.25 0 0 1 0 4.5h-.75m-9.75 0H6a2.25 2.25 0 0 1 0-4.5h2.25m7.5 0v4.5m-7.5-4.5v4.5m7.5-4.5H8.25"
      />
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M9 9.75V7.5a3 3 0 0 1 6 0v2.25"
      />
    </svg>
  );
}