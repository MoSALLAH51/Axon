"use client";

import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { useLocaleContext } from "@/components/providers/LocaleProvider";
import { cn } from "@/lib/utils";

/* ------------------------------------------------------------------ */
/*  Static data                                                         */
/* ------------------------------------------------------------------ */

const LICENSE_CARDS = {
  en: [
    { title: "Trade License",                  description: "Authorizes us to conduct landscape contracting and related services.",               status: "Valid" },
    { title: "Municipality Approval",           description: "Approved by local municipality for landscape design and implementation services.",   status: "Valid" },
    { title: "Safety Compliance Certificate",   description: "Certified for workplace safety and health regulatory compliance.",                   status: "Valid" },
    { title: "Environmental Permit",            description: "Authorized to implement landscape and irrigation works responsibly.",                 status: "Valid" },
    { title: "Water Authority Approval",        description: "Approved for irrigation system design and water conservation compliance.",           status: "Valid" },
    { title: "Waste Management Approval",       description: "Approved for sustainable waste management practices.",                               status: "Valid" },
  ],
  ar: [
    { title: "الرخصة التجارية",                 description: "تخوّلنا تنفيذ أعمال مقاولات المناظر الطبيعية والخدمات ذات الصلة.",                  status: "سارية" },
    { title: "موافقة البلدية",                  description: "معتمدون من البلدية المحلية لخدمات تصميم وتنفيذ المناظر الطبيعية.",                   status: "سارية" },
    { title: "شهادة الامتثال للسلامة",          description: "معتمدون في مجال السلامة المهنية والامتثال للوائح الصحية.",                           status: "سارية" },
    { title: "التصريح البيئي",                  description: "مرخصون لتنفيذ أعمال المناظر الطبيعية والري بمسؤولية بيئية.",                        status: "سارية" },
    { title: "موافقة هيئة المياه",              description: "معتمدون لتصميم أنظمة الري والامتثال لمعايير ترشيد المياه.",                          status: "سارية" },
    { title: "موافقة إدارة النفايات",           description: "معتمدون لتطبيق ممارسات مستدامة في إدارة النفايات.",                                  status: "سارية" },
  ],
};

const DOCUMENTS = {
  en: [
    { title: "Trade License Certificate",     size: "1.2 MB" },
    { title: "Municipality Approval Letter",  size: "1.1 MB" },
    { title: "Environmental Permit",          size: "1.3 MB" },
    { title: "Safety Compliance Certificate", size: "1.0 MB" },
  ],
  ar: [
    { title: "شهادة الرخصة التجارية",          size: "1.2 MB" },
    { title: "خطاب موافقة البلدية",             size: "1.1 MB" },
    { title: "التصريح البيئي",                  size: "1.3 MB" },
    { title: "شهادة الامتثال للسلامة",          size: "1.0 MB" },
  ],
};

const T = {
  en: {
    badge:          "Licenses",
    heroTitle:      "Licensed. Compliant. Trusted.",
    heroDesc:       "We hold all required licenses and approvals to operate with integrity, ensuring every project meets legal and regulatory standards.",
    documentsTitle: "Documents",
    complianceText: "We are committed to full compliance with all applicable laws and regulations, ensuring safety, quality, and environmental responsibility in every project we deliver.",
    backLink:       "← Back to About",
  },
  ar: {
    badge:          "التراخيص",
    heroTitle:      "مرخصون. ملتزمون. موثوقون.",
    heroDesc:       "نمتلك جميع التراخيص والموافقات اللازمة للعمل بنزاهة، لضمان أن كل مشروع يلبي المعايير القانونية والتنظيمية.",
    documentsTitle: "الوثائق",
    complianceText: "نلتزم بالامتثال الكامل لجميع القوانين واللوائح المعمول بها، لضمان السلامة والجودة والمسؤولية البيئية في كل مشروع ننفذه.",
    backLink:       "→ العودة إلى من نحن",
  },
};

/* ------------------------------------------------------------------ */
/*  Component                                                           */
/* ------------------------------------------------------------------ */

export default function LicensesPage() {
  const { locale } = useLocaleContext();
  const isRTL      = locale === "ar";
  const t          = T[locale];
  const cards      = LICENSE_CARDS[locale];
  const documents  = DOCUMENTS[locale];

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

        <div className={cn(
          "absolute top-10 bottom-0 items-center pointer-events-none hidden lg:flex",
          isRTL ? "left-0 pl-12" : "right-0 pr-12"
        )}>
          <ClipboardIllustration />
        </div>
      </div>

      <Section spacing="lg">
        <Container>

          {/* ── License Cards Grid ── */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 mb-16">
            {cards.map((card, i) => (
              <div
                key={i}
                className="flex flex-col items-center text-center gap-4 bg-white border border-sand-200 rounded-2xl px-6 py-10 hover:border-forest-300 hover:shadow-md transition-all duration-300"
              >
                <div className="w-16 h-16 rounded-full border border-forest-200 bg-forest-50 flex items-center justify-center text-forest-700 shrink-0">
                  {i === 0 && <TradeLicenseIcon />}
                  {i === 1 && <MunicipalityIcon />}
                  {i === 2 && <SafetyIcon />}
                  {i === 3 && <EnvPermitIcon />}
                  {i === 4 && <WaterIcon />}
                  {i === 5 && <WasteIcon />}
                </div>
                <div className="flex-1">
                  <h3 className="font-body font-semibold text-sm text-charcoal-900 mb-2 leading-snug">
                    {card.title}
                  </h3>
                  <p className="font-body text-xs text-charcoal-500 leading-relaxed mb-5">
                    {card.description}
                  </p>
                </div>
                <span className="inline-flex items-center gap-1.5 border border-forest-300 text-forest-700 text-xs font-body font-medium px-3 py-1 rounded-full">
                  <svg className="w-3 h-3" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 12.75 6 6 9-13.5" />
                  </svg>
                  {card.status}
                </span>
              </div>
            ))}
          </div>

          {/* ── Documents Section ── */}
          <div className="mb-16">
            <h2 className={cn("font-body font-semibold text-xl text-charcoal-900 mb-1", isRTL && "text-right")}>
              {t.documentsTitle}
            </h2>
            <div className={cn("w-10 h-0.5 bg-forest-400 mb-6", isRTL && "mr-0")} />
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              {documents.map((doc, i) => (
                <button
                  key={i}
                  className={cn(
                    "flex items-center gap-3 bg-white border border-sand-200 rounded-xl px-4 py-4 hover:border-forest-300 hover:shadow-sm transition-all duration-200",
                    isRTL ? "text-right flex-row-reverse" : "text-left"
                  )}
                >
                  <div className="shrink-0 text-charcoal-400">
                    <svg className="w-8 h-8" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 0 0-3.375-3.375h-1.5A1.125 1.125 0 0 1 13.5 7.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H8.25m2.25 0H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 0 0-9-9Z" />
                    </svg>
                  </div>
                  <div className="min-w-0">
                    <p className="font-body text-xs font-medium text-charcoal-800 leading-snug mb-0.5 truncate">
                      {doc.title}
                    </p>
                    <p className="font-body text-[10px] text-charcoal-400">
                      PDF · {doc.size}
                    </p>
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* ── Compliance Banner ── */}
          <div className={cn("flex items-start gap-5 bg-forest-50 border border-forest-100 rounded-2xl px-6 py-6 mb-16", isRTL && "flex-row-reverse text-right")}>
            <div className="w-12 h-12 rounded-full bg-forest-100 flex items-center justify-center shrink-0 text-forest-700">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75 11.25 15 15 9.75m-3-7.036A11.959 11.959 0 0 1 3.598 6 11.99 11.99 0 0 0 3 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285Z" />
              </svg>
            </div>
            <p className="font-body text-sm text-charcoal-600 leading-relaxed">
              {t.complianceText}
            </p>
          </div>

          {/* ── Back link ── */}
          <div className={cn("pt-8 border-t border-sand-200", isRTL && "text-right")}>
            <Link
              href="/about"
              className="inline-flex items-center gap-2 font-body text-sm text-charcoal-500 hover:text-forest-700 transition-colors"
            >
              {t.backLink}
            </Link>
          </div>

        </Container>
      </Section>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Decorative illustration                                             */
/* ------------------------------------------------------------------ */
function ClipboardIllustration() {
  return (
    <svg className="w-72 h-72 text-forest-300 opacity-60" fill="none" stroke="currentColor" strokeWidth={1.2} viewBox="0 0 120 140" aria-hidden="true">
      <rect x="15" y="20" width="80" height="100" rx="6" />
      <rect x="38" y="12" width="34" height="16" rx="4" />
      <line x1="28" y1="52" x2="82" y2="52" strokeLinecap="round" />
      <line x1="28" y1="65" x2="82" y2="65" strokeLinecap="round" />
      <line x1="28" y1="78" x2="60" y2="78" strokeLinecap="round" />
      <circle cx="76" cy="96" r="16" />
      <path strokeLinecap="round" strokeLinejoin="round" d="m68 96 5 6 10-13" />
      <path d="M95 30 C105 20, 118 25, 112 38 C106 50, 95 45, 95 30Z" strokeLinejoin="round" />
      <path d="M104 38 C114 28, 124 36, 118 48" strokeLinecap="round" />
      <path d="M95 30 L104 50" strokeLinecap="round" />
    </svg>
  );
}

/* ------------------------------------------------------------------ */
/*  Icons                                                               */
/* ------------------------------------------------------------------ */

/**
 * Trade License — a stamped scroll/permit: the formal document that
 * authorises the business to operate.
 */
function TradeLicenseIcon() {
  return (
    <svg className="w-7 h-7" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
      {/* scroll body */}
      <path strokeLinecap="round" strokeLinejoin="round" d="M7 4.5A2.5 2.5 0 0 1 9.5 2h9A1.5 1.5 0 0 1 20 3.5v15a1.5 1.5 0 0 1-1.5 1.5H9.5A2.5 2.5 0 0 1 7 17.5v-13Z" />
      {/* left curl */}
      <path strokeLinecap="round" strokeLinejoin="round" d="M7 17.5A2.5 2.5 0 0 1 4.5 20 2.5 2.5 0 0 1 7 17.5Z" />
      {/* text lines on scroll */}
      <path strokeLinecap="round" strokeLinejoin="round" d="M11 7h6M11 10h6M11 13h4" />
      {/* stamp seal */}
      <circle cx="16.5" cy="16.5" r="2" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M15.5 15.5l2 2" />
    </svg>
  );
}

/**
 * Municipality Approval — a city skyline with a checkmark:
 * official urban authority sign-off on landscape work.
 */
function MunicipalityIcon() {
  return (
    <svg className="w-7 h-7" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
      {/* buildings silhouette */}
      <path strokeLinecap="round" strokeLinejoin="round" d="M3 21h18" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M5 21V10l4-3v14" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M9 21V7l6-4v18" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M15 21V11l4 2v8" />
      {/* approval check badge top-right */}
      <circle cx="18.5" cy="5.5" r="3" />
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 5.5l1 1.2 1.8-2" />
    </svg>
  );
}

/**
 * Safety Compliance — a hard hat: the universal symbol for
 * workplace safety on construction and landscape sites.
 */
function SafetyIcon() {
  return (
    <svg className="w-7 h-7" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
      {/* hard hat dome */}
      <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 13C4.5 8.306 7.91 4.5 12 4.5S19.5 8.306 19.5 13" />
      {/* brim */}
      <path strokeLinecap="round" strokeLinejoin="round" d="M3 13h18" />
      {/* underbrim band */}
      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13v1.5a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V13" />
      {/* centre stripe on dome */}
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5V13" strokeOpacity="0.4" />
    </svg>
  );
}

/**
 * Environmental Permit — a leaf inside a circle:
 * authorisation to work in harmony with the environment.
 */
function EnvPermitIcon() {
  return (
    <svg className="w-7 h-7" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
      {/* outer circle = permit boundary */}
      <circle cx="12" cy="12" r="9" />
      {/* leaf shape */}
      <path strokeLinecap="round" strokeLinejoin="round" d="M8 16c3-5 6-8 10-9-1 4-4 7-10 9Z" />
      {/* leaf vein */}
      <path strokeLinecap="round" strokeLinejoin="round" d="M8 16l4.5-4.5" />
    </svg>
  );
}

/**
 * Water Authority Approval — irrigation sprinkler arc with droplets:
 * directly represents the water / irrigation domain of this licence.
 */
function WaterIcon() {
  return (
    <svg className="w-7 h-7" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
      {/* sprinkler head base */}
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 14v5" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M9 19h6" />
      {/* pivot point */}
      <circle cx="12" cy="13" r="1" />
      {/* spray arcs */}
      <path strokeLinecap="round" strokeLinejoin="round" d="M6 10c1-2 3-3.5 6-3.5" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M18 10c-1-2-3-3.5-6-3.5" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M4 8c1.5-3 4-5 8-5" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M20 8c-1.5-3-4-5-8-5" />
      {/* droplets */}
      <path strokeLinecap="round" strokeLinejoin="round" d="M7 12.5c0 .8-.6 1.5-1 1.5s-1-.7-1-1.5c0-1 1-2.5 1-2.5s1 1.5 1 2.5Z" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M19 12.5c0 .8-.6 1.5-1 1.5s-1-.7-1-1.5c0-1 1-2.5 1-2.5s1 1.5 1 2.5Z" />
    </svg>
  );
}

/**
 * Waste Management Approval — a recycling loop with a leaf:
 * sustainable circular waste practices in a green context.
 */
function WasteIcon() {
  return (
    <svg className="w-7 h-7" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
      {/* top arc arrow */}
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 4c-2.5 0-4.7 1.3-6 3.2" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 9.5 6 7.2l2 .8" />
      {/* bottom-right arc arrow */}
      <path strokeLinecap="round" strokeLinejoin="round" d="M18 7.2c1.2 1.4 2 3.2 2 5.2 0 1-.2 2-.5 2.8" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M17.5 17.5l2 .8.5-2.5" />
      {/* bottom-left arc arrow */}
      <path strokeLinecap="round" strokeLinejoin="round" d="M6 15.2A7.95 7.95 0 0 0 12 20c1.4 0 2.8-.4 4-1" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M6.5 17.8l-2-.8.3 2.5" />
      {/* centre leaf */}
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 14c0 0-1.5-1.5-.5-3.5 0 0 1 .8 1.5 2 .5-1.2 1.5-2 1.5-2 1 2-.5 3.5-2.5 3.5Z" />
    </svg>
  );
}