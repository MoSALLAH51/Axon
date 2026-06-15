"use client";

import { useLocaleContext } from "@/components/providers/LocaleProvider";
import { getProjects } from "@/services/projectsApi";
import type { ProjectListItem } from "@/types";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { ProjectCard } from "@/components/sections/ProjectCard";
import { cn } from "@/lib/utils";
import { useEffect, useState } from "react";

/* ------------------------------------------------------------------ */
/*  Mock fallback data                                                  */
/* ------------------------------------------------------------------ */
const MOCK_PROJECTS: ProjectListItem[] = [
  { id: 1,  title_en: "Al Barsha Villa Garden",       title_ar: "حديقة فيلا البرشاء",            location_en: "Al Barsha, Dubai",          location_ar: "البرشاء، دبي",            year: 2023, featured: true,  cover_image: { url: "/images/projects/project_1_1.png", alt_en: "Al Barsha Villa Garden",       alt_ar: "حديقة فيلا البرشاء",            id: 0, width: 0, height: 0 } },
  { id: 2,  title_en: "Downtown Corporate Plaza",     title_ar: "ساحة داون تاون التجارية",       location_en: "Downtown Dubai",            location_ar: "وسط مدينة دبي",           year: 2023, featured: false, cover_image: { url: "/images/projects/project_2_1.png", alt_en: "Downtown Corporate Plaza",     alt_ar: "ساحة داون تاون التجارية",       id: 0, width: 0, height: 0 } },
  { id: 3,  title_en: "Jumeirah Rooftop Terrace",     title_ar: "تراس سطح جميرا",                location_en: "Jumeirah, Dubai",           location_ar: "جميرا، دبي",              year: 2022, featured: true,  cover_image: { url: "/images/projects/project_3_1.png", alt_en: "Jumeirah Rooftop Terrace",     alt_ar: "تراس سطح جميرا",                id: 0, width: 0, height: 0 } },
  { id: 4,  title_en: "Sharjah Public Park",          title_ar: "حديقة الشارقة العامة",          location_en: "Sharjah",                   location_ar: "الشارقة",                 year: 2022, featured: false, cover_image: { url: "/images/projects/project_4_1.png", alt_en: "Sharjah Public Park",          alt_ar: "حديقة الشارقة العامة",          id: 0, width: 0, height: 0 } },
  { id: 5,  title_en: "Mirdif Community Garden",      title_ar: "حديقة مجتمع مردف",              location_en: "Mirdif, Dubai",             location_ar: "مردف، دبي",               year: 2022, featured: false, cover_image: { url: "/images/projects/project_5_1.png", alt_en: "Mirdif Community Garden",      alt_ar: "حديقة مجتمع مردف",              id: 0, width: 0, height: 0 } },
  { id: 6,  title_en: "Business Bay Hotel Grounds",   title_ar: "أرض فندق بيزنس باي",           location_en: "Business Bay, Dubai",       location_ar: "بيزنس باي، دبي",          year: 2023, featured: true,  cover_image: { url: "/images/projects/project_6_1.png", alt_en: "Business Bay Hotel Grounds",   alt_ar: "أرض فندق بيزنس باي",           id: 0, width: 0, height: 0 } },
  { id: 7,  title_en: "Arabian Ranches Landscape",    title_ar: "تنسيق المزارع العربية",         location_en: "Arabian Ranches, Dubai",    location_ar: "المزارع العربية، دبي",    year: 2021, featured: false, cover_image: { url: "/images/projects/project_7_1.png", alt_en: "Arabian Ranches Landscape",    alt_ar: "تنسيق المزارع العربية",         id: 0, width: 0, height: 0 } },
  { id: 8,  title_en: "Abu Dhabi Civic Boulevard",    title_ar: "شارع أبوظبي المدني",            location_en: "Abu Dhabi",                 location_ar: "أبوظبي",                  year: 2023, featured: true,  cover_image: { url: "/images/projects/project_8_1.png", alt_en: "Abu Dhabi Civic Boulevard",    alt_ar: "شارع أبوظبي المدني",            id: 0, width: 0, height: 0 } },
  { id: 9,  title_en: "Palm Jumeirah Beachfront",     title_ar: "واجهة نخلة جميرا البحرية",      location_en: "Palm Jumeirah, Dubai",      location_ar: "نخلة جميرا، دبي",         year: 2022, featured: true,  cover_image: { url: "/images/projects/project_9_1.png", alt_en: "Palm Jumeirah Beachfront",     alt_ar: "واجهة نخلة جميرا البحرية",      id: 0, width: 0, height: 0 } },
  { id: 10, title_en: "Deira Retail Courtyard",       title_ar: "فناء ديرة التجاري",             location_en: "Deira, Dubai",              location_ar: "ديرة، دبي",               year: 2021, featured: false, cover_image: { url: "/images/projects/project_10_1.png", alt_en: "Deira Retail Courtyard",       alt_ar: "فناء ديرة التجاري",             id: 0, width: 0, height: 0 } },
  { id: 11, title_en: "Al Ain Resort Grounds",        title_ar: "أرض منتجع العين",               location_en: "Al Ain, Abu Dhabi",         location_ar: "العين، أبوظبي",           year: 2021, featured: false, cover_image: { url: "/images/projects/project_11_1.png", alt_en: "Al Ain Resort Grounds",        alt_ar: "أرض منتجع العين",               id: 0, width: 0, height: 0 } },
  { id: 12, title_en: "Dubai Hills Estate Garden",    title_ar: "حديقة مجمع دبي هيلز",          location_en: "Dubai Hills, Dubai",        location_ar: "دبي هيلز، دبي",           year: 2023, featured: true,  cover_image: { url: "/images/projects/project_12_1.png", alt_en: "Dubai Hills Estate Garden",    alt_ar: "حديقة مجمع دبي هيلز",          id: 0, width: 0, height: 0 } },
];

/* ------------------------------------------------------------------ */
/*  Translations                                                        */
/* ------------------------------------------------------------------ */
const T = {
  en: {
    badge:    "Our Portfolio",
    title:    "Projects",
    desc:     "Explore our completed landscape works across residential, commercial, and public spaces throughout the UAE.",
    empty:    "No projects available at this time.",
    prev:     "←",
    next:     "→",
  },
  ar: {
    badge:    "معرض أعمالنا",
    title:    "المشاريع",
    desc:     "استعرض أعمالنا المنجزة في المناظر الطبيعية عبر المساحات السكنية والتجارية والعامة في الإمارات.",
    empty:    "لا توجد مشاريع متاحة حالياً.",
    prev:     "→",
    next:     "←",
  },
};

/* ------------------------------------------------------------------ */
/*  Component                                                           */
/* ------------------------------------------------------------------ */
export default function ProjectsPage() {
  const { locale } = useLocaleContext();
  const isRTL = locale === "ar";
  const t = T[locale];

  const [projects, setProjects]     = useState<ProjectListItem[]>(MOCK_PROJECTS);
  const [currentPage, setCurrentPage] = useState(1);
  const [lastPage, setLastPage]     = useState(1);

  useEffect(() => {
    getProjects(currentPage, 12)
      .then((result) => {
        if (result && result.data.length > 0) {
          setProjects(result.data);
          setLastPage(result.last_page ?? 1);
        }
      })
      .catch(() => {
        setProjects(MOCK_PROJECTS);
      });
  }, [currentPage]);

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
              {t.title}
            </h1>
            <div className="w-10 h-0.5 bg-forest-400 mb-6" />
            <p className="font-body text-sm md:text-base text-charcoal-500 leading-relaxed max-w-lg">
              {t.desc}
            </p>
          </div>
        </Container>

        {/* Decorative illustration */}
<div className={cn(
  "absolute top-20 bottom-0 items-center pointer-events-none hidden lg:flex",
  isRTL ? "left-0 pl-12" : "right-0 pr-12"
)}>     
          <ProjectsIllustration />
        </div>
      </div>

      <Section spacing="lg">
        <Container>
          {projects.length === 0 ? (
            <p className="text-center font-body text-charcoal-500 py-16">{t.empty}</p>
          ) : (
            <>
              {/* Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
{projects.map((project) => (
  <ProjectCard 
    key={project.id} 
    project={project}
    locale={locale}  
  />
))}
              </div>

              {/* Pagination */}
              {lastPage > 1 && (
                <nav aria-label="Projects pagination" className="mt-16 flex items-center justify-center gap-2">
                  {currentPage > 1 && (
                    <button
                      onClick={() => setCurrentPage(currentPage - 1)}
                      className="w-10 h-10 flex items-center justify-center rounded-full border border-sand-200 text-charcoal-500 hover:border-forest-300 hover:text-forest-700 transition-colors font-body text-sm"
                    >
                      {t.prev}
                    </button>
                  )}

                  {Array.from({ length: lastPage }, (_, i) => i + 1).map((page) => (
                    <button
                      key={page}
                      onClick={() => setCurrentPage(page)}
                      aria-current={page === currentPage ? "page" : undefined}
                      className={cn(
                        "w-10 h-10 flex items-center justify-center rounded-full font-body text-sm",
                        page === currentPage
                          ? "bg-forest-400 text-white font-semibold"
                          : "border border-sand-200 text-charcoal-600 hover:border-forest-300 hover:text-forest-700 transition-colors"
                      )}
                    >
                      {page}
                    </button>
                  ))}

                  {currentPage < lastPage && (
                    <button
                      onClick={() => setCurrentPage(currentPage + 1)}
                      className="w-10 h-10 flex items-center justify-center rounded-full border border-sand-200 text-charcoal-500 hover:border-forest-300 hover:text-forest-700 transition-colors font-body text-sm"
                    >
                      {t.next}
                    </button>
                  )}
                </nav>
              )}
            </>
          )}
        </Container>
      </Section>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Decorative illustration                                             */
/* ------------------------------------------------------------------ */
function ProjectsIllustration() {
  return (
    <svg
      className="w-72 h-72 text-forest-300 opacity-60"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.2}
      viewBox="0 0 140 160"
      aria-hidden="true"
    >
      <rect x="12" y="20" width="48" height="36" rx="3" />
      <rect x="68" y="20" width="48" height="36" rx="3" />
      <rect x="12" y="64" width="48" height="36" rx="3" />
      <rect x="68" y="64" width="48" height="36" rx="3" />

      <line x1="20" y1="46" x2="50" y2="46" strokeLinecap="round" strokeOpacity="0.5" />
      <line x1="20" y1="50" x2="40" y2="50" strokeLinecap="round" strokeOpacity="0.4" />
      <line x1="76" y1="46" x2="106" y2="46" strokeLinecap="round" strokeOpacity="0.5" />
      <line x1="76" y1="50" x2="96" y2="50" strokeLinecap="round" strokeOpacity="0.4" />

      <line x1="20" y1="90" x2="50" y2="90" strokeLinecap="round" strokeOpacity="0.5" />
      <line x1="20" y1="94" x2="40" y2="94" strokeLinecap="round" strokeOpacity="0.4" />
      <line x1="76" y1="90" x2="106" y2="90" strokeLinecap="round" strokeOpacity="0.5" />
      <line x1="76" y1="94" x2="96" y2="94" strokeLinecap="round" strokeOpacity="0.4" />

      <rect x="12" y="108" width="48" height="22" rx="3" />
      <rect x="68" y="108" width="48" height="22" rx="3" />
    </svg>
  );
}