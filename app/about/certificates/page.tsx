"use client";

import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { useLocaleContext } from "@/components/providers/LocaleProvider";
import { cn } from "@/lib/utils";

/* ------------------------------------------------------------------ */
/*  Static data                                                         */
/* ------------------------------------------------------------------ */

const CERT_CARDS = {
  en: [
    { title: "ISO 9001:2015",                        subtitle: "Quality Management System",      description: "Ensuring consistent quality in our processes and services.",                   status: "Certified" },
    { title: "ISO 14001:2015",                       subtitle: "Environmental Management",       description: "Committed to reducing environmental impact and promoting sustainability.",      status: "Certified" },
    { title: "ISO 45001:2018",                       subtitle: "Occupational Health & Safety",   description: "Ensuring a safe and healthy work environment for our team.",                   status: "Certified" },
    { title: "Irrigation Association Member",        subtitle: "",                               description: "Recognized member promoting efficient water management.",                      status: "Certified" },
    { title: "Sustainable Landscape Council Member", subtitle: "",                               description: "Committed to sustainable landscape practices and biodiversity.",               status: "Certified" },
    { title: "CPD Certified Professionals",          subtitle: "",                               description: "Our team is certified in continuous professional development.",                status: "Certified" },
  ],
  ar: [
    { title: "ISO 9001:2015",                        subtitle: "نظام إدارة الجودة",              description: "ضمان الجودة المتسقة في عملياتنا وخدماتنا.",                                  status: "معتمد" },
    { title: "ISO 14001:2015",                       subtitle: "الإدارة البيئية",                description: "ملتزمون بتقليل الأثر البيئي وتعزيز الاستدامة.",                             status: "معتمد" },
    { title: "ISO 45001:2018",                       subtitle: "الصحة والسلامة المهنية",         description: "ضمان بيئة عمل آمنة وصحية لفريقنا.",                                        status: "معتمد" },
    { title: "عضو جمعية الري",                       subtitle: "",                               description: "عضو معتمد يعزز الإدارة الفعّالة للمياه.",                                   status: "معتمد" },
    { title: "عضو مجلس المناظر الطبيعية المستدامة", subtitle: "",                               description: "ملتزمون بممارسات المناظر الطبيعية المستدامة والتنوع البيولوجي.",             status: "معتمد" },
    { title: "محترفون معتمدو CPD",                   subtitle: "",                               description: "فريقنا معتمد في التطوير المهني المستمر.",                                   status: "معتمد" },
  ],
};

const SHOWCASE_CERTS = {
  en: [
    { title: "ISO 9001:2015",                 sub: "Quality Management System"    },
    { title: "ISO 14001:2015",                sub: "Environmental Management"     },
    { title: "ISO 45001:2018",                sub: "Occupational Health & Safety" },
    { title: "Irrigation Association Member", sub: ""                             },
  ],
  ar: [
    { title: "ISO 9001:2015",                 sub: "نظام إدارة الجودة"           },
    { title: "ISO 14001:2015",                sub: "الإدارة البيئية"             },
    { title: "ISO 45001:2018",                sub: "الصحة والسلامة المهنية"      },
    { title: "عضو جمعية الري",                sub: ""                             },
  ],
};

const HIGHLIGHTS = {
  en: [
    { title: "Trusted Standards",     desc: "Certified to international standards and best practices."          },
    { title: "Expert Team",           desc: "Qualified professionals committed to excellence in every project." },
    { title: "Sustainable Practices", desc: "Building greener, healthier spaces for a better tomorrow."         },
  ],
  ar: [
    { title: "معايير موثوقة",  desc: "معتمدون وفق المعايير الدولية وأفضل الممارسات."           },
    { title: "فريق متخصص",    desc: "محترفون مؤهلون ملتزمون بالتميز في كل مشروع."             },
    { title: "ممارسات مستدامة", desc: "نبني مساحات أكثر خضرةً وصحةً من أجل غدٍ أفضل."        },
  ],
};

const T = {
  en: {
    badge:         "Certificates",
    heroTitle:     "Certified for Quality\nand Excellence",
    heroDesc:      "Our certifications reflect our commitment to quality, sustainability, and industry best practices.",
    showcaseTitle: "Certificate Showcase",
    backLink:      "← Back to About",
  },
  ar: {
    badge:         "الشهادات",
    heroTitle:     "معتمدون للجودة\nوالتميز",
    heroDesc:      "تعكس شهاداتنا التزامنا بالجودة والاستدامة وأفضل الممارسات في المجال.",
    showcaseTitle: "عرض الشهادات",
    backLink:      "→ العودة إلى من نحن",
  },
};

/* ------------------------------------------------------------------ */
/*  Icon sources (black-source SVGs, recolored via mask)               */
/* ------------------------------------------------------------------ */

const CERT_ICONS = [
  "/images/certificates/iso_8790297.svg",        // ISO 14001 – Environmental
  "/images/certificates/iso_4667049.svg",        // ISO 9001 – Quality
  "/images/certificates/photo-camera_570373.svg",    // ISO 45001 – Health & Safety
  "/images/certificates/oil_5303175.svg",        // Irrigation Association Member
  "/images/certificates/nature_14165373.svg",// Sustainable Landscape Council
  "/images/certificates/professional_12622516.svg", // CPD Certified Professionals
];

const HIGHLIGHT_ICONS = [
  "/images/certificates/2/best-employee_15220001.svg", // Trusted Standards
  "/images/certificates/2/ecology_1530511.svg",         // Expert Team
  "/images/certificates/2/guarantee_13707801.svg",      // Sustainable Practices
];

/* ------------------------------------------------------------------ */
/*  Component                                                           */
/* ------------------------------------------------------------------ */

export default function CertificatesPage() {
  const { locale } = useLocaleContext();
  const isRTL      = locale === "ar";
  const t          = T[locale];
  const certCards  = CERT_CARDS[locale];
  const showcase   = SHOWCASE_CERTS[locale];
  const highlights = HIGHLIGHTS[locale];

  return (
    <div dir={isRTL ? "rtl" : "ltr"}>

      {/* ── PAGE HEADER ── */}
      <div className="bg-sand-50 border-b border-sand-100 relative overflow-hidden min-h-[280px] md:min-h-[320px] flex items-center">
        <Container className="py-30 md:py-34">
          <div className={cn("max-w-2xl", isRTL && "text-right")}>
            <p className="font-body text-[10px] font-semibold tracking-[0.22em] uppercase text-forest-500 mb-5">
              {t.badge}
            </p>
            <h1 className="font-display text-5xl md:text-6xl lg:text-7xl text-charcoal-900 leading-[1.05] mb-6 whitespace-pre-line">
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
          <MedalIllustration />
        </div>
      </div>

      <Section spacing="lg">
        <Container>

          {/* ── Certificate Cards Grid ── */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 mb-16">
            {certCards.map((card, i) => (
              <div key={i} className="flex flex-col items-center text-center gap-4 bg-white border border-sand-200 rounded-2xl px-6 py-10 hover:border-forest-300 hover:shadow-md transition-all duration-300">
                <div className="w-16 h-16 rounded-full border border-forest-200 bg-forest-50 flex items-center justify-center text-forest-700 shrink-0">
                  <IconMask src={CERT_ICONS[i]} className="w-7 h-7" />
                </div>
                <div className="flex-1">
                  <h3 className="font-body font-semibold text-sm text-charcoal-900 leading-snug">
                    {card.title}
                  </h3>
                  {card.subtitle && (
                    <p className="font-body text-sm text-charcoal-900 leading-snug mb-1">
                      {card.subtitle}
                    </p>
                  )}
                  <p className="font-body text-xs text-charcoal-500 leading-relaxed mt-2 mb-5">
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

          {/* ── Certificate Showcase ── */}
          <div className="mb-16">
            <h2 className={cn("font-body font-semibold text-xl text-charcoal-900 mb-1", isRTL && "text-right")}>
              {t.showcaseTitle}
            </h2>
            <div className={cn("w-10 h-0.5 bg-forest-400 mb-8", isRTL && "mr-0")} />
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              {showcase.map((cert, i) => (
                <div
                  key={i}
                  className="relative bg-white flex flex-col items-center justify-between text-center px-4 py-6 overflow-hidden"
                  style={{ border: "6px solid #c8a96e", borderRadius: "4px", boxShadow: "inset 0 0 0 2px #e8d5b0, 0 2px 8px rgba(0,0,0,0.08)", minHeight: "160px" }}
                >
                  <div className="absolute inset-2 pointer-events-none" style={{ border: "1px solid #dfc080", borderRadius: "2px" }} />
                  <div className="relative z-10 flex flex-col items-center gap-2 w-full">
                    <div className="text-forest-300 mb-1">
                      <svg className="w-8 h-5" fill="none" stroke="currentColor" strokeWidth={1.2} viewBox="0 0 40 24">
                        <path d="M20 22 C10 18, 2 10, 8 4 C14 -2, 20 6, 20 22Z" />
                        <path d="M20 22 C30 18, 38 10, 32 4 C26 -2, 20 6, 20 22Z" />
                        <line x1="20" y1="22" x2="20" y2="4" strokeLinecap="round" />
                      </svg>
                    </div>
                    <p className="font-body font-bold text-xs text-charcoal-800 leading-tight">{cert.title}</p>
                    {cert.sub && (
                      <p className="font-body text-[10px] text-charcoal-500 leading-tight">{cert.sub}</p>
                    )}
                    <div className="w-full mt-3 space-y-1">
                      <div className="h-px bg-sand-200 w-3/4 mx-auto" />
                      <div className="h-px bg-sand-200 w-1/2 mx-auto" />
                    </div>
                    <div className="mt-3 w-8 h-8 rounded-full border-2 border-forest-400 bg-forest-50 flex items-center justify-center text-forest-600">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 12.75 6 6 9-13.5" />
                      </svg>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* ── Highlights Bar ── */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 bg-sand-50 border border-sand-200 rounded-2xl px-8 py-8 mb-16">
            {highlights.map((h, i) => (
              <div key={i} className={cn("flex items-start gap-4", isRTL && "flex-row-reverse text-right")}>
                <div className="w-11 h-11 rounded-full bg-forest-100 border border-forest-200 flex items-center justify-center shrink-0 text-forest-700">
                  <IconMask src={HIGHLIGHT_ICONS[i]} className="w-5 h-5" />
                </div>
                <div>
                  <p className="font-body font-semibold text-sm text-charcoal-900 mb-1">{h.title}</p>
                  <p className="font-body text-xs text-charcoal-500 leading-relaxed">{h.desc}</p>
                </div>
              </div>
            ))}
          </div>

          {/* ── Back link ── */}
          <div className={cn("pt-8 border-t border-sand-200", isRTL && "text-right")}>
            <Link href="/about" className="inline-flex items-center gap-2 font-body text-sm text-charcoal-500 hover:text-forest-700 transition-colors">
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
function MedalIllustration() {
  return (
    <svg className="w-72 h-72 text-forest-300 opacity-60" fill="none" stroke="currentColor" strokeWidth={1.2} viewBox="0 0 140 160" aria-hidden="true">
      <path d="M55 20 L45 55 L70 45 L55 20Z" />
      <path d="M85 20 L95 55 L70 45 L85 20Z" />
      <circle cx="70" cy="95" r="38" />
      <circle cx="70" cy="95" r="30" />
      <path d="M70 70 L74 83 L88 83 L77 91 L81 104 L70 97 L59 104 L63 91 L52 83 L66 83 Z" />
      <path d="M105 18 C116 8, 130 14, 124 28 C118 40, 105 35, 105 18Z" />
      <path d="M114 28 C126 16, 138 24, 130 38" strokeLinecap="round" />
      <path d="M105 18 L116 42" strokeLinecap="round" />
      <path d="M118 12 C126 4, 138 10, 133 22" strokeLinecap="round" />
    </svg>
  );
}

/* ------------------------------------------------------------------ */
/*  Generic icon: recolors a black-source SVG via CSS mask so it        */
/*  inherits `currentColor` from its parent (e.g. text-forest-700).     */
/* ------------------------------------------------------------------ */
function IconMask({ src, className }: { src: string; className?: string }) {
  return (
    <span
      className={cn("inline-block bg-current", className)}
      style={{
        WebkitMaskImage: `url(${src})`,
        maskImage: `url(${src})`,
        WebkitMaskRepeat: "no-repeat",
        maskRepeat: "no-repeat",
        WebkitMaskSize: "contain",
        maskSize: "contain",
        WebkitMaskPosition: "center",
        maskPosition: "center",
      }}
      aria-hidden="true"
    />
  );
}