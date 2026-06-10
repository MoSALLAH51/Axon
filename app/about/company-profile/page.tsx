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
/*  Card icons — Mission / Vision / Values                             */
/* ------------------------------------------------------------------ */

/**
 * Mission — a seedling breaking through soil: purposeful growth,
 * the act of nurturing something from the ground up.
 */
function MissionIcon() {
  return (
    <svg className="w-7 h-7" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
      {/* stem */}
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 21V11" />
      {/* left leaf */}
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 15c-2 0-5-1.5-5-5 0 0 2.5.5 5 2.5" />
      {/* right leaf */}
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 12c2-1.5 5-2.5 5-2.5 0 3.5-3 5-5 5" />
      {/* ground */}
      <path strokeLinecap="round" strokeLinejoin="round" d="M8 21h8" />
    </svg>
  );
}

/**
 * Vision — a telescope pointed at the horizon: long-range ambition,
 * scanning for what is possible ahead.
 */
function VisionIcon() {
  return (
    <svg className="w-7 h-7" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
      {/* telescope barrel */}
      <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 15L12 9l7.5-3" />
      {/* eyepiece end (wide) */}
      <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5l3-3" />
      {/* objective end (narrow) */}
      <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 6l1.5-1.5" />
      {/* stand / tripod leg */}
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v6" />
      {/* base feet */}
      <path strokeLinecap="round" strokeLinejoin="round" d="M9.5 21h5" />
      {/* horizon line */}
      <path strokeLinecap="round" strokeLinejoin="round" d="M3 19.5h18" strokeOpacity="0.3" />
    </svg>
  );
}

/**
 * Values — an open hand cradling a leaf: care for nature and people,
 * the human touch behind every value the company holds.
 */
function ValuesIcon() {
  return (
    <svg className="w-7 h-7" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
      {/* cupped hand — open palm arc */}
      <path strokeLinecap="round" strokeLinejoin="round" d="M6.5 14.5c-.5-2 0-5 2-6.5 1-1 2.5-.5 3 .5" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M17.5 14.5c.5-2 0-5-2-6.5-1-1-2.5-.5-3 .5" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M6.5 14.5c1 2.5 3 4 5.5 4s4.5-1.5 5.5-4" />
      {/* leaf sitting in the palm */}
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 14c0 0-2-2-1-4.5 0 0 1.5 1 2 2.5 .5-1.5 2-2.5 2-2.5 1 2.5-1 4.5-3 4.5Z" />
    </svg>
  );
}

/* ------------------------------------------------------------------ */
/*  Stat icons — Years / Projects / Satisfaction                       */
/* ------------------------------------------------------------------ */

/**
 * Years of Experience — tree rings / a mature tree:
 * age, growth, and accumulated wisdom over time.
 */
function YearsIcon() {
  return (
    <svg className="w-7 h-7" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
      {/* trunk */}
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 21v-7" />
      {/* canopy outer */}
      <path strokeLinecap="round" strokeLinejoin="round" d="M6 14c0-3.314 2.686-6 6-6s6 2.686 6 6H6Z" />
      {/* canopy inner layer */}
      <path strokeLinecap="round" strokeLinejoin="round" d="M8.5 14c0-1.933 1.567-3.5 3.5-3.5S15.5 12.067 15.5 14" />
      {/* ground */}
      <path strokeLinecap="round" strokeLinejoin="round" d="M9 21h6" />
    </svg>
  );
}

/**
 * Projects Completed — a shovel breaking ground:
 * the act of building, starting work, and completing projects.
 */
function ProjectsIcon() {
  return (
    <svg className="w-7 h-7" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
      {/* shovel handle */}
      <path strokeLinecap="round" strokeLinejoin="round" d="M15.5 4.5L9 11" />
      {/* shovel blade */}
      <path strokeLinecap="round" strokeLinejoin="round" d="M9 11l-1.5 1.5a2.121 2.121 0 0 0 3 3L12 14l2.5 2.5" />
      {/* blade face */}
      <path strokeLinecap="round" strokeLinejoin="round" d="M7.5 12.5a2.121 2.121 0 0 0 3 3" />
      {/* grip top */}
      <path strokeLinecap="round" strokeLinejoin="round" d="M14 5l1.5-1.5a1 1 0 0 1 1.5 0l1 1a1 1 0 0 1 0 1.5L16.5 7.5" />
      {/* ground line */}
      <path strokeLinecap="round" strokeLinejoin="round" d="M5 19h14" strokeOpacity="0.35" />
      {/* dirt mound */}
      <path strokeLinecap="round" strokeLinejoin="round" d="M10 19c0-1.5 1-2.5 2.5-2.5S15 17.5 15 19" />
    </svg>
  );
}

/**
 * Client Satisfaction — a blooming flower:
 * the end result of great work — beauty, happiness, fulfilment.
 */
function SatisfactionIcon() {
  return (
    <svg className="w-7 h-7" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
      {/* stem */}
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 21v-9" />
      {/* left leaf on stem */}
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 16c-1.5 0-3.5-1-3-3 0 0 1.5.5 3 1.5" />
      {/* center of flower */}
      <circle cx="12" cy="9" r="1.5" />
      {/* petals */}
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 5.5V7" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 11v1.5" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M8.5 9H7" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M15.5 9H17" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M9.4 6.4L8.5 5.5" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M14.6 6.4l.9-.9" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M9.4 11.6l-.9.9" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M14.6 11.6l.9.9" />
      {/* ground */}
      <path strokeLinecap="round" strokeLinejoin="round" d="M9 21h6" />
    </svg>
  );
}

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
                    {i === 0 && <MissionIcon />}
                    {i === 1 && <VisionIcon />}
                    {i === 2 && <ValuesIcon />}
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
                      {i === 0 && <YearsIcon />}
                      {i === 1 && <ProjectsIcon />}
                      {i === 2 && <SatisfactionIcon />}
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