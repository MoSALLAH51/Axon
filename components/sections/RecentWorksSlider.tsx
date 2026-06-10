"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { useLocaleContext } from "@/components/providers/LocaleProvider";
import { cn } from "@/lib/utils";

const RECENT_WORKS = {
  en: [
    { id: "1", title: "Villa Garden – Dubai Hills",   slug: "villa-garden-dubai-hills",   image: "/images/projects/project-1.jpg" },
    { id: "2", title: "Corporate Campus – Abu Dhabi", slug: "corporate-campus-abu-dhabi", image: "/images/projects/project-2.jpg" },
    { id: "3", title: "Rooftop Terrace – Sharjah",    slug: "rooftop-terrace-sharjah",    image: "/images/projects/project-3.jpg" },
    { id: "4", title: "Public Park – Al Ain",         slug: "public-park-al-ain",         image: "/images/projects/project-4.jpg" },
    { id: "5", title: "Residential Compound – RAK",   slug: "residential-compound-rak",   image: "/images/projects/project-5.jpg" },
  ],
  ar: [
    { id: "1", title: "حديقة فيلا – دبي هيلز",       slug: "villa-garden-dubai-hills",   image: "/images/projects/project-1.jpg" },
    { id: "2", title: "حرم شركة – أبوظبي",           slug: "corporate-campus-abu-dhabi", image: "/images/projects/project-2.jpg" },
    { id: "3", title: "تراس السطح – الشارقة",        slug: "rooftop-terrace-sharjah",    image: "/images/projects/project-3.jpg" },
    { id: "4", title: "حديقة عامة – العين",          slug: "public-park-al-ain",         image: "/images/projects/project-4.jpg" },
    { id: "5", title: "مجمع سكني – رأس الخيمة",      slug: "residential-compound-rak",   image: "/images/projects/project-5.jpg" },
  ],
};

const T = {
  en: {
    badge:    "Our Projects",
    title:    "Some Of Our Recent Works",
    cta:      "Send Message →",
    readMore: "Read More →",
  },
  ar: {
    badge:    "مشاريعنا",
    title:    "بعض من أحدث أعمالنا",
    cta:      "→ أرسل رسالة",
    readMore: "← اقرأ المزيد",
  },
};

const VISIBLE = 3;

export function RecentWorksSlider() {
  const { locale } = useLocaleContext();
  const isRTL = locale === "ar";
  const t = T[locale];
  const works = RECENT_WORKS[locale];

  const [current, setCurrent] = useState(0);
  const maxIndex = works.length - VISIBLE;

  const prev = () => setCurrent((c) => Math.max(c - 1, 0));
  const next = () => setCurrent((c) => Math.min(c + 1, maxIndex));

  return (
    <section
      aria-label={t.badge}
      className="bg-white border-t border-sand-200 py-20"
      dir="ltr"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* ── Header row — نعكسه يدوياً في RTL ── */}
        <div className={cn(
          "flex flex-col sm:flex-row sm:items-end sm:justify-between gap-6 mb-10",
          isRTL && "sm:flex-row-reverse"
        )}>
          <div className={cn(isRTL && "text-right")}>
            <span className="block text-xs font-semibold tracking-[0.2em] uppercase text-forest-600 mb-2">
              {t.badge}
            </span>
            <h2 className="font-display text-4xl md:text-5xl text-charcoal-900 leading-tight">
              {t.title}
            </h2>
          </div>

          <Button href="/contact" size="lg">
            {t.cta}
          </Button>
        </div>

        {/* ── Slider — transform يعمل بشكل صحيح لأن كل الـ ancestors هي ltr ── */}
        <div className="overflow-hidden">
          <div
            className="flex gap-4 transition-transform duration-500 ease-in-out"
            style={{
              transform: `translateX(calc(-${current} * (100% / ${VISIBLE} + (1rem / ${VISIBLE}))))`,
            }}
          >
            {works.map((project) => (
              <Link
                key={project.id}
                href={`/projects/${project.slug}`}
                className="group relative shrink-0 rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-shadow duration-300"
                style={{ width: `calc(100% / ${VISIBLE} - ${(VISIBLE - 1) / VISIBLE}rem)` }}
              >
                <div className="relative aspect-[4/3]">
                  <Image
                    src={project.image}
                    alt={project.title}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-colors duration-300" />
                </div>

                {/* ── نص الكارد — نعيد dir للنص العربي فقط هنا ── */}
                <div
                  className={cn(
                    "absolute bottom-0 left-0 right-0 px-5 py-4 translate-y-full group-hover:translate-y-0 transition-transform duration-300 bg-gradient-to-t from-black/80 to-transparent",
                    isRTL && "text-right"
                  )}
                  dir={isRTL ? "rtl" : "ltr"}
                >
                  <p className="text-white font-semibold text-sm">{project.title}</p>
                  <span className="text-forest-300 text-xs font-medium">{t.readMore}</span>
                </div>
              </Link>
            ))}
          </div>
        </div>

        {/* ── Controls ── */}
        <div className="flex items-center justify-center gap-4 mt-8">

          {/* زر السابق — في RTL يكون على اليمين بصرياً */}
          <button
            onClick={prev}
            disabled={current === 0}
            className="w-8 h-8 rounded-full border border-sand-200 flex items-center justify-center text-charcoal-500 hover:border-forest-300 hover:text-forest-700 transition disabled:opacity-30"
            aria-label="Previous"
          >
            ←
          </button>

          {/* Dots */}
          <div className="flex items-center gap-2">
            {Array.from({ length: maxIndex + 1 }).map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrent(i)}
                aria-label={`Slide ${i + 1}`}
                className={cn(
                  "h-2.5 rounded-full transition-all duration-300",
                  i === current
                    ? "bg-forest-700 w-6"
                    : "bg-sand-300 hover:bg-forest-400 w-2.5"
                )}
              />
            ))}
          </div>

          {/* زر التالي */}
          <button
            onClick={next}
            disabled={current === maxIndex}
            className="w-8 h-8 rounded-full border border-sand-200 flex items-center justify-center text-charcoal-500 hover:border-forest-300 hover:text-forest-700 transition disabled:opacity-30"
            aria-label="Next"
          >
            →
          </button>

        </div>

      </div>
    </section>
  );
}