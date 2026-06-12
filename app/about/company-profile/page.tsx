"use client";

import Image from "next/image";
import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { useLocaleContext } from "@/components/providers/LocaleProvider";
import { cn } from "@/lib/utils";

/* ------------------------------------------------------------------ */
/*  Static data                                                         */
/* ------------------------------------------------------------------ */

const FALLBACK = {
  en: {
    title:       "Creating Landscapes That Inspire",
    description: "Axon Landscape is a leading landscape design and build company dedicated to creating sustainable, functional, and beautiful outdoor spaces that enhance life and environments.",
    mission:     "To deliver exceptional landscape solutions that combine creativity, quality, and sustainability.",
    vision:      "To be the region's most trusted landscape company, recognized for innovation and excellence.",
    values:      "Integrity, quality, sustainability, teamwork, and a commitment to our clients and community.",
  },
  ar: {
    title:       "نصنع مناظر طبيعية تُلهم",
    description: "أكسون للمناظر الطبيعية شركة رائدة في تصميم وتنفيذ المناظر الطبيعية، مكرّسة لإنشاء مساحات خارجية مستدامة وعملية وجميلة ترتقي بالحياة والبيئة.",
    mission:     "تقديم حلول استثنائية للمناظر الطبيعية تجمع بين الإبداع والجودة والاستدامة.",
    vision:      "أن نكون الشركة الأكثر ثقةً في المنطقة في مجال المناظر الطبيعية، معروفين بالابتكار والتميز.",
    values:      "النزاهة، الجودة، الاستدامة، العمل الجماعي، والالتزام بعملائنا ومجتمعنا.",
  },
};

const CARDS = {
  en: [
    { label: "Mission", text: FALLBACK.en.mission },
    { label: "Vision",  text: FALLBACK.en.vision  },
    { label: "Values",  text: FALLBACK.en.values  },
  ],
  ar: [
    { label: "مهمتنا", text: FALLBACK.ar.mission },
    { label: "رؤيتنا", text: FALLBACK.ar.vision  },
    { label: "قيمنا",  text: FALLBACK.ar.values  },
  ],
};

const STATS = {
  en: [
    { value: "15+",  title: "Years of Experience",  desc: "Delivering excellence since 2009" },
    { value: "500+", title: "Projects Completed",   desc: "Residential, commercial & public spaces" },
    { value: "98%",  title: "Client Satisfaction",  desc: "Building lasting relationships through quality" },
  ],
  ar: [
    { value: "15+",  title: "سنوات من الخبرة",    desc: "نقدم التميز منذ عام 2009" },
    { value: "500+", title: "مشروع منجز",          desc: "مساحات سكنية وتجارية وعامة" },
    { value: "98%",  title: "رضا العملاء",         desc: "بناء علاقات دائمة من خلال الجودة" },
  ],
};

const WORKS = {
  en: [
    { src: "/images/projects/project-1.jpg", title: "Modern Garden",   category: "Residential Landscape" },
    { src: "/images/projects/project-2.jpg", title: "Corporate Plaza", category: "Commercial Landscape"  },
    { src: "/images/projects/project-3.jpg", title: "Public Park",     category: "Public Landscape"      },
  ],
  ar: [
    { src: "/images/projects/project-1.jpg", title: "حديقة عصرية",    category: "مناظر طبيعية سكنية"  },
    { src: "/images/projects/project-2.jpg", title: "ساحة الشركة",    category: "مناظر طبيعية تجارية" },
    { src: "/images/projects/project-3.jpg", title: "حديقة عامة",     category: "مناظر طبيعية عامة"   },
  ],
};

const T = {
  en: {
    badge:    "About Us",
    ourWork:  "Our Work",
    backLink: "← Back to About",
  },
  ar: {
    badge:    "من نحن",
    ourWork:  "أعمالنا",
    backLink: "→ العودة إلى من نحن",
  },
};

/* ------------------------------------------------------------------ */
/*  Icon sources (black-source SVGs, recolored via mask)               */
/* ------------------------------------------------------------------ */

const CARD_ICONS = [
  "/images/company-profile/mission_1628441.svg", // Mission
  "/images/company-profile/eye_198002.svg",       // Vision
  "/images/company-profile/badge_1720441.svg",    // Values
];

const STAT_ICONS = [
  "/images/company-profile/2/15_5360491.svg",          // Years of Experience
  "/images/company-profile/2/briefcase_293298.svg",    // Projects Completed
  "/images/company-profile/2/satisfaction_12282490.svg", // Client Satisfaction
];

/* ------------------------------------------------------------------ */
/*  Component                                                           */
/* ------------------------------------------------------------------ */

export default function CompanyProfilePage() {
  const { locale } = useLocaleContext();
  const isRTL = locale === "ar";
  const t     = T[locale];
  const data  = FALLBACK[locale];
  const cards = CARDS[locale];
  const stats = STATS[locale];
  const works = WORKS[locale];

  return (
    <div dir={isRTL ? "rtl" : "ltr"}>
      <Section spacing="lg">
        <Container>
          <div className="space-y-16">

            {/* ── HERO: Text + Image ── */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div className={cn("flex flex-col gap-6", isRTL && "text-right")}>
                <span className="text-xs font-semibold tracking-[0.2em] uppercase text-forest-600 font-body">
                  {t.badge}
                </span>
                <h2 className="font-display text-4xl md:text-5xl text-charcoal-900 leading-tight">
                  {data.title}
                </h2>
                <div className="w-10 h-0.5 bg-forest-600" />
                <p className="font-body text-base text-charcoal-500 leading-relaxed">
                  {data.description}
                </p>
              </div>
              <div className="relative aspect-[4/3] rounded-2xl overflow-hidden shadow-lg">
                <Image
                  src="/images/services/landscape-design.jpg"
                  alt={data.title}
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  priority
                />
              </div>
            </div>

            {/* ── MISSION / VISION / VALUES ── */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              {cards.map((card, i) => (
                <div key={card.label} className="group flex flex-col items-center text-center gap-5 p-8 rounded-2xl border border-sand-200 bg-white hover:border-forest-300 hover:shadow-md transition-all duration-300">
                  <div className="w-14 h-14 rounded-full bg-forest-50 border border-forest-100 flex items-center justify-center text-forest-700 group-hover:bg-forest-100 transition-colors duration-300">
                    <IconMask src={CARD_ICONS[i]} className="w-7 h-7" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-charcoal-900 mb-2">{card.label}</h3>
                    <p className="font-body text-sm text-charcoal-500 leading-relaxed">{card.text}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* ── STATS ── */}
            <div className="bg-sand-50 border border-sand-200 rounded-2xl px-8 py-10">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
                {stats.map((stat, i) => (
                  <div key={stat.title} className={cn("flex items-center gap-5", isRTL && "flex-row-reverse text-right")}>
                    <div className="w-14 h-14 rounded-xl bg-white border border-sand-200 flex items-center justify-center text-forest-700 shrink-0">
                      <IconMask src={STAT_ICONS[i]} className="w-7 h-7" />
                    </div>
                    <div>
                      <p className="font-display text-3xl text-forest-700 font-semibold" dir="ltr">{stat.value}</p>
                      <p className="font-semibold text-sm text-charcoal-900 mt-0.5">{stat.title}</p>
                      <p className="font-body text-xs text-charcoal-500 mt-1">{stat.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* ── OUR WORK ── */}
            <div>
              <h2 className={cn("font-display text-3xl md:text-4xl text-charcoal-900 mb-3", isRTL && "text-right")}>
                {t.ourWork}
              </h2>
              <div className={cn("w-10 h-0.5 bg-forest-600 mb-10", isRTL && "mr-0")} />
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                {works.map((item) => (
                  <div key={item.title} className="flex flex-col gap-3">
                    <div className="relative aspect-square rounded-2xl overflow-hidden group shadow-sm">
                      <Image
                        src={item.src}
                        alt={item.title}
                        fill
                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                    </div>
                    <div className={cn(isRTL && "text-right")}>
                      <h4 className="font-semibold text-charcoal-900">{item.title}</h4>
                      <p className="font-body text-sm text-charcoal-500">{item.category}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

          </div>

          {/* ── Back link ── */}
          <div className={cn("mt-20 pt-8 border-t border-sand-200", isRTL && "text-right")}>
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