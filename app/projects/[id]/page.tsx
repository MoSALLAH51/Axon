"use client";

import Image from "next/image";
import Link from "next/link";
import { notFound, useParams } from "next/navigation";
import { useLocaleContext } from "@/components/providers/LocaleProvider";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { Button } from "@/components/ui/Button";
import { PageHeader } from "@/components/layout/PageHeader";
import { cn } from "@/lib/utils";

// ─── Mock Data ────────────────────────────────────────────────────────────────

const MOCK_PROJECT = {
  title_en: "Al Barsha Villa Garden",
  title_ar: "حديقة فيلا البرشاء",
  location_en: "Al Barsha, Dubai",
  location_ar: "البرشاء، دبي",
  description_en:
    "A lush residential garden designed to blend seamlessly with the villa's contemporary architecture. The project combines native drought-resistant plants with a custom irrigation system, creating a sustainable yet visually rich outdoor living space. Shaded seating areas, a central water feature, and layered planting beds deliver year-round interest while respecting the UAE climate.",
  description_ar:
    "حديقة سكنية غنّاء صُممت لتتناغم بسلاسة مع الطابع المعماري المعاصر للفيلا. يجمع المشروع بين النباتات المحلية المتحملة للجفاف ونظام ري مخصص، لخلق مساحة خارجية مستدامة وغنية بصرياً. تمنح مناطق الجلوس المظللة، والنافورة المركزية، وأحواض الزراعة المتدرجة طابعاً مميزاً على مدار العام مع احترام مناخ الإمارات.",
  year: 2023,
  area: "1,200 sqm",
  area_ar: "1,200 متر مربع",
  client_en: "Private Client",
  client_ar: "عميل خاص",
  cover_image: {
    url: "/images/projects/project_1_1.png",
    alt_en: "Al Barsha Villa Garden — main view",
    alt_ar: "حديقة فيلا البرشاء — المنظر الرئيسي",
  },
  gallery: [
    { id: 1, url: "/images/projects/project_2_1.png", alt_en: "Garden seating area",   alt_ar: "منطقة الجلوس" },
    { id: 2, url: "/images/projects/project_3_1.png", alt_en: "Water feature detail",  alt_ar: "تفاصيل النافورة" },
    { id: 3, url: "/images/projects/project_4_1.png", alt_en: "Planting beds",         alt_ar: "أحواض الزراعة" },
    { id: 4, url: "/images/projects/project_5_1.png", alt_en: "Evening lighting",      alt_ar: "الإضاءة المسائية" },
  ],
};

// ─── Translations ─────────────────────────────────────────────────────────────

const T = {
  en: {
    label: "Projects",
    overview: "Project Overview",
    gallery: "Gallery",
    details: "Project Details",
    location: "Location",
    area: "Area",
    year: "Year",
    client: "Client",
    ctaTitle: "Interested in a similar project?",
    ctaDesc: "Tell us about your vision and we'll create a tailored proposal for you.",
    ctaButton: "Get in Touch",
    back: "Back to Projects",
    backArrow: "←",
  },
  ar: {
    label: "المشاريع",
    overview: "نظرة عامة على المشروع",
    gallery: "معرض الصور",
    details: "تفاصيل المشروع",
    location: "الموقع",
    area: "المساحة",
    year: "السنة",
    client: "العميل",
    ctaTitle: "مهتم بمشروع مماثل؟",
    ctaDesc: "أخبرنا عن رؤيتك وسنقوم بإعداد عرض مخصص لك.",
    ctaButton: "تواصل معنا",
    back: "العودة إلى المشاريع",
    backArrow: "→",
  },
};

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function ProjectDetailPage() {
  const params = useParams<{ id: string }>();
  const { locale } = useLocaleContext();
  const isRTL = locale === "ar";
  const t = T[locale];

  const id = parseInt(params.id, 10);
  if (isNaN(id)) notFound();

  const project = MOCK_PROJECT;

  const title = isRTL ? project.title_ar : project.title_en;
  const location = isRTL ? project.location_ar : project.location_en;
  const description = isRTL ? project.description_ar : project.description_en;
  const area = isRTL ? project.area_ar : project.area;
  const client = isRTL ? project.client_ar : project.client_en;
  const coverAlt = isRTL ? project.cover_image.alt_ar : project.cover_image.alt_en;

  const specs: { label: string; value: string | number | undefined }[] = [
    { label: t.location, value: location },
    { label: t.area,     value: area },
    { label: t.year,     value: project.year },
    { label: t.client,   value: client },
  ].filter((s) => s.value);

  return (
    <div dir={isRTL ? "rtl" : "ltr"}>


      <Section spacing="lg">
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-16">

            {/* ── Main Content ── */}
            <div className="lg:col-span-2 space-y-10">

              {/* Cover Image */}
              {project.cover_image?.url && (
                <div className="relative aspect-wide overflow-hidden bg-sand-100 border border-sand-200">
                  <Image
                    src={project.cover_image.url}
                    alt={coverAlt}
                    fill
                    priority
                    className="object-cover"
                    sizes="(max-width: 1024px) 100vw, 66vw"
                  />
                </div>
              )}

              {/* Description */}
              <div>
                <span className="inline-block mb-4 text-xs font-body font-semibold tracking-[0.2em] uppercase text-forest-600">
                  {t.overview}
                </span>
                <div className={cn(
                  "font-body text-base text-charcoal-600 leading-relaxed space-y-4",
                  isRTL && "text-right"
                )}>
                  <p>{description}</p>
                </div>
              </div>

              {/* Gallery */}
              {project.gallery.length > 0 && (
                <div>
                  <span className="inline-block mb-6 text-xs font-body font-semibold tracking-[0.2em] uppercase text-forest-600">
                    {t.gallery}
                  </span>
                  <div className="grid grid-cols-2 gap-3">
                    {project.gallery.map((img, idx) => (
                      <div
                        key={img.id}
                        className={[
                          "relative overflow-hidden bg-sand-100",
                          idx === 0 ? "col-span-2 aspect-wide" : "aspect-landscape",
                        ].join(" ")}
                      >
                        <Image
                          src={img.url}
                          alt={isRTL ? img.alt_ar : img.alt_en}
                          fill
                          className="object-cover hover:scale-105 transition-transform duration-500"
                          sizes="(max-width: 640px) 100vw, 50vw"
                        />
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* ── Sidebar ── */}
            <aside className={cn("lg:col-span-1 space-y-8", isRTL && "text-right")}>

              {/* Project Specs */}
              <div className="border border-sand-200 p-8">
                <h3 className="font-body text-xs font-semibold tracking-[0.2em] uppercase text-charcoal-400 mb-6">
                  {t.details}
                </h3>
                <dl className="space-y-5">
                  {specs.map(({ label, value }) => (
                    <div key={label} className="border-b border-sand-100 pb-5 last:border-0 last:pb-0">
                      <dt className="font-body text-xs font-medium tracking-wider uppercase text-charcoal-400 mb-1">
                        {label}
                      </dt>
                      <dd className="font-display text-lg text-charcoal-800">
                        {value}
                      </dd>
                    </div>
                  ))}
                </dl>
              </div>

              {/* CTA */}
              <div className="bg-forest-800 p-8 space-y-4">
                <h3 className="font-display text-xl text-sand-50">
                  {t.ctaTitle}
                </h3>
                <p className="font-body text-sm text-forest-200 leading-relaxed">
                  {t.ctaDesc}
                </p>
                <Button href="/contact" variant="secondary" size="md" className="w-full justify-center">
                  {t.ctaButton}
                </Button>
              </div>

              {/* Back link */}
              <Link
                href="/projects"
                className={cn(
                  "inline-flex items-center gap-2 font-body text-sm text-charcoal-500 hover:text-forest-700 transition-colors",
                  isRTL && "flex-row-reverse"
                )}
              >
                {t.backArrow} {t.back}
              </Link>
            </aside>
          </div>
        </Container>
      </Section>
    </div>
  );
}