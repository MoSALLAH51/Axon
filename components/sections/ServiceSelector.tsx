"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { useLocaleContext } from "@/components/providers/LocaleProvider";

/* ------------------------------------------------------------------ */
/*  Types                                                               */
/* ------------------------------------------------------------------ */

interface Service {
  slug: string;
  label: { en: string; ar: string };
  tag:   { en: string; ar: string };
  desc:  { en: string; ar: string };
  image: string;
  features: { en: string[]; ar: string[] };
}

/* ------------------------------------------------------------------ */
/*  Data                                                                */
/* ------------------------------------------------------------------ */

const SERVICES: Service[] = [
  {
    slug:  "landscape-design",
    label: { en: "Landscape Design",       ar: "تصميم المناظر الطبيعية" },
    tag:   { en: "Design",                 ar: "التصميم" },
    desc: {
      en: "Creative and functional outdoor environments — from concept sketches to detailed technical drawings — tailored to your site, vision, and the area climate.",
      ar: "بيئات خارجية إبداعية ووظيفية — من الرسومات الأولية حتى المخططات التقنية التفصيلية — مصممة خصيصاً لموقعك ورؤيتك ومناخ المنطة.",
    },
    image:    "/images/services/landscape-design.jpg",
    features: {
      en: ["Site analysis", "Concept development", "Plant selection", "3D visualization", "Irrigation planning", "Material palette"],
      ar: ["تحليل الموقع", "تطوير المفهوم", "اختيار النباتات", "تصور ثلاثي الأبعاد", "تخطيط الري", "لوحة المواد"],
    },
  },
  {
    slug:  "landscape-maintenance",
    label: { en: "Landscape Maintenance",  ar: "صيانة المناظر الطبيعية" },
    tag:   { en: "Maintenance",            ar: "الصيانة" },
    desc: {
      en: "Year-round professional care that keeps every outdoor space healthy, vibrant, and looking its best — from routine upkeep to seasonal programs.",
      ar: "رعاية احترافية على مدار العام تبقي كل مساحة خارجية بصحة جيدة ونضارة دائمة — من الصيانة الدورية إلى البرامج الموسمية.",
    },
    image:    "/images/services/landscape-maintenance.jpg",
    features: {
      en: ["Seasonal programs", "Pruning & shaping", "Soil health", "Irrigation service", "Pest management", "Lawn care"],
      ar: ["برامج موسمية", "تقليم وتشكيل", "صحة التربة", "خدمة الري", "مكافحة الآفات", "العناية بالعشب"],
    },
  },
  {
    slug:  "nursery",
    label: { en: "Nursery",                ar: "المشتل" },
    tag:   { en: "Nursery",                ar: "المشتل" },
    desc: {
      en: "A curated selection of trees, shrubs, palms, and flowering plants — all sourced and acclimated for the UAE environment.",
      ar: "تشكيلة مختارة من الأشجار والشجيرات والنخيل والنباتات المزهرة — مستوردة ومأقلمة خصيصاً لبيئة المنطة.",
    },
    image:    "/images/services/nursery.jpg",
    features: {
      en: ["Area-adapted plants", "Native species", "Indoor plants", "Rare varieties", "Expert advice", "Delivery & install"],
      ar: ["نباتات مأقلمة", "أنواع محلية", "نباتات داخلية", "أصناف نادرة", "استشارة متخصصة", "توصيل وتركيب"],
    },
  },
  {
    slug:  "hardscape",
    label: { en: "Hardscape",              ar: "الأعمال الصلبة" },
    tag:   { en: "Hardscape",              ar: "الأعمال الصلبة" },
    desc: {
      en: "Durable and elegant hardscape construction — pathways, patios, pergolas, retaining walls — that define and elevate your outdoor space.",
      ar: "إنشاءات صلبة متينة وأنيقة — ممرات وأفنية ومظلات وجدران استنادية — تحدد مساحتك الخارجية وترفع من قيمتها.",
    },
    image:    "/images/services/hardscape.jpg",
    features: {
      en: ["Paving & patios", "Water features", "Retaining walls", "Pergolas & shade", "Outdoor lighting", "Custom stonework"],
      ar: ["بلاط وأفنية", "عناصر مائية", "جدران استنادية", "مظلات وظلال", "إضاءة خارجية", "أعمال حجرية"],
    },
  },
  {
    slug:  "irrigation-system",
    label: { en: "Irrigation Systems",     ar: "أعمال الري" },
    tag:   { en: "Irrigation",             ar: "الري" },
    desc: {
      en: "Precision irrigation design and installation that delivers water exactly where it's needed — reducing consumption while keeping landscapes thriving.",
      ar: "تصميم وتركيب أنظمة ري دقيقة تُوصل المياه بالضبط حيث تُحتاج — تقليل الاستهلاك مع إبقاء المناظر الطبيعية مزدهرة.",
    },
    image:    "/images/services/irrigation-system.jpg",
    features: {
      en: ["Drip irrigation", "Smart controllers", "System audit", "Underground pipes", "Leak detection", "Seasonal setup"],
      ar: ["ري بالتنقيط", "وحدات تحكم ذكية", "تدقيق النظام", "أنابيب تحت الأرض", "كشف التسربات", "إعداد موسمي"],
    },
  },
];

/* ------------------------------------------------------------------ */
/*  Icons                                                               */
/* ------------------------------------------------------------------ */

const SERVICE_ICONS: Record<string, React.ReactNode> = {
  "landscape-design": (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24" aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 21C12 21 4 16 4 9a8 8 0 0 1 16 0c0 7-8 12-8 12Z" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 21V9" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 13l-3-2.5M12 16l3-2" />
    </svg>
  ),
  "landscape-maintenance": (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24" aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" d="M11.42 15.17 17.25 21A2.652 2.652 0 0 0 21 17.25l-5.877-5.877" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M11.42 15.17l2.496-3.03c.317-.384.74-.626 1.208-.766M11.42 15.17l-4.655 5.653a2.548 2.548 0 1 1-3.586-3.586l6.837-5.63" />
      <path strokeLinecap="round" strokeLinejoin="round" d="m14.5 4.5 5 5M6 20l4-4" />
    </svg>
  ),
  "nursery": (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24" aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904 9 18.75l-.813-2.846a4.5 4.5 0 0 0-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 0 0 3.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 0 0 3.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 0 0-3.09 3.09Z" />
    </svg>
  ),
  "hardscape": (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24" aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 21h19.5m-18-18v18m10.5-18v18m6-13.5V21M6.75 6.75h.75m-.75 3h.75m-.75 3h.75m3-6h.75m-.75 3h.75m-.75 3h.75M6.75 21v-3.375c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21" />
    </svg>
  ),
  "irrigation-system": (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24" aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" d="M15.362 5.214A8.252 8.252 0 0 1 12 21 8.25 8.25 0 0 1 6.038 7.047 8.287 8.287 0 0 0 9 9.601a8.983 8.983 0 0 1 3.361-6.867 8.21 8.21 0 0 0 3 2.48Z" />
    </svg>
  ),
};

/* ------------------------------------------------------------------ */
/*  Component                                                           */
/* ------------------------------------------------------------------ */

export function ServiceSelector() {
  const { locale } = useLocaleContext();
  const isRTL = locale === "ar";
  const [activeIdx, setActiveIdx] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const [visibleIdx, setVisibleIdx] = useState(0);

  const active = SERVICES[visibleIdx];

  const handleSelect = (idx: number) => {
    if (idx === activeIdx || isAnimating) return;
    setIsAnimating(true);
    setActiveIdx(idx);
    // short delay so the fade-out CSS transition plays
    setTimeout(() => {
      setVisibleIdx(idx);
      setIsAnimating(false);
    }, 220);
  };

  const handleNext = () => handleSelect((activeIdx + 1) % SERVICES.length);

  return (
    <div
      dir={isRTL ? "rtl" : "ltr"}
      className={cn(
        "grid overflow-hidden rounded-2xl border border-sand-200 shadow-sm",
        "grid-cols-1 md:grid-cols-[240px_1fr] lg:grid-cols-[260px_1fr]",
        "min-h-[520px]"
      )}
    >
      {/* ── SIDEBAR ── */}
      <aside className="bg-[#1a2e1a] flex flex-col">
        {/* Header — hidden on mobile */}
        <div className="hidden md:block px-6 pt-6 pb-4 border-b border-white/10">
          <p className="text-[10px] tracking-[0.2em] uppercase text-white/40 font-medium mb-1">
            {locale === "ar" ? "ما نقدمه" : "What We Offer"}
          </p>
          <p className="text-lg font-semibold text-white leading-tight">
            {locale === "ar" ? "خدماتنا" : "Our Services"}
          </p>
        </div>

        {/* Nav list */}
        <nav
          className={cn(
            "flex md:flex-col",
            "overflow-x-auto md:overflow-x-visible md:flex-1",
            "scrollbar-none",
            "p-0",
          )}
          aria-label={locale === "ar" ? "قائمة الخدمات" : "Services list"}
        >
          {SERVICES.map((svc, i) => {
            const isActive = i === activeIdx;
            return (
<button
  key={svc.slug}
  onClick={() => handleSelect(i)}
  aria-selected={isActive}
  className={cn(
    "group flex items-center gap-3 text-left",
    "px-3 py-3 md:px-6 md:py-[13px]",
    "relative transition-colors duration-200",
    "text-[13.5px] font-normal",
    isActive
      ? "text-white font-medium"
      : "text-white/50 hover:text-white/80",
    // mobile: column of horizontal tabs, fixed width, allow wrapping
    "flex-col md:flex-row items-center md:items-center",
    "w-[110px] shrink-0 md:w-full md:shrink",
  )}
>
                {/* Active indicator — bottom bar on mobile, left bar on desktop */}
                {isActive && (
                  <span
                    className={cn(
                      "absolute bg-forest-400",
                      isRTL
                        ? "md:right-0 md:top-0 md:bottom-0 md:w-[3px] md:h-auto bottom-0 left-0 right-0 h-[2.5px] md:rounded-l-sm"
                        : "md:left-0 md:top-0 md:bottom-0 md:w-[3px] md:h-auto bottom-0 left-0 right-0 h-[2.5px] md:rounded-r-sm",
                    )}
                    aria-hidden="true"
                  />
                )}

                {/* Icon chip */}
                <span
                  className={cn(
                    "flex items-center justify-center rounded-lg shrink-0",
                    "w-8 h-8 text-[15px] transition-colors duration-200",
                    isActive
                      ? "bg-forest-600/30 text-forest-300"
                      : "bg-white/[0.05] text-white/40 group-hover:bg-white/10 group-hover:text-white/60",
                  )}
                  aria-hidden="true"
                >
                  {SERVICE_ICONS[svc.slug]}
                </span>

                {/* Label */}
                <span className="md:flex-1 text-[11px] md:text-[13.5px] leading-snug text-center md:text-start">
                  {svc.label[locale]}
                </span>

                {/* Arrow — desktop only */}
                <span
                  className={cn(
                    "hidden md:block text-xs transition-all duration-200 shrink-0",
                    isActive ? "opacity-100" : "opacity-0 -translate-x-1 group-hover:opacity-70 group-hover:translate-x-0",
                    isRTL && "rotate-180",
                  )}
                  aria-hidden="true"
                >
                  ›
                </span>
              </button>
            );
          })}
        </nav>

        {/* CTA — hidden on mobile */}
        <div className="hidden md:block px-5 py-4 border-t border-white/10">
          <Link
            href="/contact"
            className="flex items-center justify-center w-full px-4 py-2.5 rounded-lg bg-forest-700 hover:bg-forest-600 text-white text-sm font-medium transition-colors duration-200"
          >
            {locale === "ar" ? "طلب استشارة ←" : "Request Consultation →"}
          </Link>
        </div>
      </aside>

      {/* ── CONTENT PANEL ── */}
      <div className="bg-white overflow-hidden flex flex-col">
        <div
          className={cn(
            "flex flex-col flex-1 transition-all duration-[220ms] ease-out",
            isAnimating ? "opacity-0 translate-x-2" : "opacity-100 translate-x-0",
            isRTL && isAnimating && "-translate-x-2 translate-x-0",
          )}
        >
          {/* Image */}
          <div className="relative h-[200px] md:h-[240px] overflow-hidden shrink-0">
            <Image
              src={active.image}
              alt={active.label[locale]}
              fill
              className="object-cover transition-transform duration-500 hover:scale-[1.03]"
              sizes="(max-width: 768px) 100vw, 70vw"
            />
            {/* Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />

            {/* Tag pill */}
            <span className="absolute top-4 start-4 bg-forest-800/90 text-forest-100 text-[10px] tracking-[0.15em] uppercase font-medium px-3 py-1.5 rounded-full">
              {active.tag[locale]}
            </span>

            {/* Large number watermark */}
            <span
              className={cn(
                "absolute bottom-3 end-5 font-bold text-white/20 leading-none select-none",
                "text-5xl md:text-6xl",
              )}
              aria-hidden="true"
            >
              {String(visibleIdx + 1).padStart(2, "0")}
            </span>
          </div>

          {/* Body */}
          <div className="flex flex-col flex-1 px-6 py-6 md:px-8 md:py-7 gap-0">
            <h3 className="font-display text-2xl md:text-[1.65rem] text-charcoal-900 leading-tight mb-2.5">
              {active.label[locale]}
            </h3>
            <p className="font-body text-sm text-charcoal-500 leading-relaxed mb-5">
              {active.desc[locale]}
            </p>

            {/* Feature pills */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 mb-6">
              {active.features[locale].map((feat) => (
                <div
                  key={feat}
                  className="flex items-center gap-2 px-3 py-2 rounded-lg bg-forest-50 border border-forest-100 text-xs text-forest-800 font-medium"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-forest-600 shrink-0" aria-hidden="true" />
                  {feat}
                </div>
              ))}
            </div>

            {/* Footer */}
            <div className="mt-auto flex items-center justify-between pt-4 border-t border-sand-100">
              {/* Progress dots */}
              <div className="flex items-center gap-1.5" role="tablist" aria-label={locale === "ar" ? "الخدمات" : "Services"}>
                {SERVICES.map((_, i) => (
                  <button
                    key={i}
                    role="tab"
                    aria-selected={i === activeIdx}
                    onClick={() => handleSelect(i)}
                    className={cn(
                      "h-1.5 rounded-full transition-all duration-300",
                      i === activeIdx
                        ? "w-5 bg-forest-600"
                        : "w-1.5 bg-sand-300 hover:bg-forest-300",
                    )}
                    aria-label={`${locale === "ar" ? "الخدمة" : "Service"} ${i + 1}`}
                  />
                ))}
              </div>

              {/* Next + Detail link */}
              <div className="flex items-center gap-3">
                <Link
                  href={`/services/${active.slug}`}
                  className="text-xs text-forest-700 font-medium hover:text-forest-900 transition-colors underline-offset-2 hover:underline"
                >
                  {locale === "ar" ? "تفاصيل الخدمة" : "View details"}
                </Link>
                <button
                  onClick={handleNext}
                  className="flex items-center gap-1.5 text-xs text-charcoal-500 font-medium hover:text-charcoal-900 transition-colors px-3 py-1.5 rounded-lg hover:bg-sand-50"
                >
                  {locale === "ar" ? "← التالي" : "Next →"}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}