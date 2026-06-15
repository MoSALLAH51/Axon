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
  { id: 1, title_en: "Riverside Park",        title_ar: "حديقة ريفرسايد",          location_en: "City Park",            location_ar: "الحديقة المدينية",        year: 2023, featured: true,  cover_image: { url: "/images/projects/project_1_1.png", alt_en: "Riverside Park",        alt_ar: "حديقة ريفرسايد",          id: 0, width: 0, height: 0 } },
  { id: 2, title_en: "Botanical Garden",      title_ar: "الحديقة النباتية",        location_en: "Botanical Garden",     location_ar: "حديقة نباتية",            year: 2022, featured: false, cover_image: { url: "/images/projects/project_2_1.png", alt_en: "Botanical Garden",      alt_ar: "الحديقة النباتية",         id: 0, width: 0, height: 0 } },
  { id: 3, title_en: "Greenfield Plaza",      title_ar: "ساحة جرين فيلد",          location_en: "Public Square",        location_ar: "ساحة عامة",               year: 2023, featured: true,  cover_image: { url: "/images/projects/project_3_1.png", alt_en: "Greenfield Plaza",      alt_ar: "ساحة جرين فيلد",           id: 0, width: 0, height: 0 } },
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