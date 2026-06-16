"use client";

import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ContactForm } from "@/components/sections/ContactForm";
import { RecentWorksSlider } from "@/components/sections/RecentWorksSlider";
import { ServiceCard } from "@/components/sections/ServiceCard";
import { ProjectCard } from "@/components/sections/ProjectCard";
import { useLocaleContext } from "@/components/providers/LocaleProvider";
import { cn } from "@/lib/utils";
import type { ServiceListItem, ProjectListItem } from "@/types";

/* ------------------------------------------------------------------ */
/*  Static data                                                         */
/* ------------------------------------------------------------------ */

const FEATURES = {
  en: [
    { title: "Sustainable",       desc: "Eco-friendly solutions for a better tomorrow." },
    { title: "Quality",           desc: "We deliver the highest standards of quality." },
    { title: "Experienced Team",  desc: "Our experts bring your vision to life." },
    { title: "Customer Focused",  desc: "Your satisfaction is our top priority." },
  ],
  ar: [
    { title: "الاستدامة",         desc: "حلول صديقة للبيئة من أجل غدٍ أفضل." },
    { title: "الجودة",            desc: "نقدم أعلى معايير الجودة في كل مشروع." },
    { title: "فريق متمرس",        desc: "خبراؤنا يحولون رؤيتك إلى واقع." },
    { title: "التركيز على العميل", desc: "رضاك هو أولويتنا القصوى." },
  ],
};

const STATS = {
  en: [
    { value: "10+",  label: "Years of Experience" },
    { value: "250+", label: "Projects Completed" },
    { value: "98%",  label: "Client Satisfaction" },
  ],
  ar: [
    { value: "10+",  label: "سنوات من الخبرة" },
    { value: "250+", label: "مشروع منجز" },
    { value: "98%",  label: "رضا العملاء" },
  ],
};

const LINKS = {
  en: [
    { title: "Company Profile", desc: "Get to know more about our company and values.", href: "/about/company-profile", cta: "Learn More" },
    { title: "Licenses",        desc: "We are fully licensed and compliant.",            href: "/about/licenses",        cta: "View Licenses" },
    { title: "Certificates",    desc: "Our quality is certified by trusted authorities.", href: "/about/certificates",   cta: "View Certificates" },
  ],
  ar: [
    { title: "ملف الشركة",   desc: "تعرّف أكثر على شركتنا وقيمنا.",            href: "/about/company-profile", cta: "اعرف أكثر" },
    { title: "التراخيص",     desc: "نحن مرخصون بالكامل ومتوافقون مع الأنظمة.", href: "/about/licenses",        cta: "عرض التراخيص" },
    { title: "الشهادات",     desc: "جودتنا معتمدة من جهات موثوقة.",            href: "/about/certificates",   cta: "عرض الشهادات" },
  ],
};

const FALLBACK_SERVICES = {
  en: [
    { id: "1", slug: "landscape-design",      title: "Landscape Design",      desc: "Creative and functional designs tailored to your space and needs.",         thumbnail: "/images/services/landscape-design.jpg" },
    { id: "2", slug: "landscape-maintenance", title: "Landscape Maintenance", desc: "Professional maintenance to keep your landscape healthy and beautiful.",    thumbnail: "/images/services/landscape-maintenance.jpg" },
    { id: "3", slug: "nursery",               title: "Nursery",               desc: "A wide variety of plants, trees, and flowers for every landscape.",         thumbnail: "/images/services/nursery.jpg" },
    { id: "4", slug: "hardscape",             title: "Hardscape",             desc: "Durable and elegant hardscape solutions to complement your outdoor space.", thumbnail: "/images/services/hardscape.jpg" },
    { id: "5", slug: "irrigation-system",     title: "Irrigation System",     desc: "Efficient irrigation systems designed to keep your landscape thriving.",     thumbnail: "/images/services/irrigation-system.jpg" },
  ],
  ar: [
    { id: "1", slug: "landscape-design",      title: "تصميم المناظر الطبيعية", desc: "تصاميم إبداعية ووظيفية مخصصة لمساحتك واحتياجاتك.",            thumbnail: "/images/services/landscape-design.jpg" },
    { id: "2", slug: "landscape-maintenance", title: "صيانة المناظر الطبيعية", desc: "صيانة احترافية للحفاظ على جمال مناظرك الطبيعية وصحتها.",       thumbnail: "/images/services/landscape-maintenance.jpg" },
    { id: "3", slug: "nursery",               title: "المشتل",                  desc: "مجموعة واسعة من النباتات والأشجار والزهور لكل بيئة خضراء.",   thumbnail: "/images/services/nursery.jpg" },
    { id: "4", slug: "hardscape",             title: "الأعمال الصلبة",          desc: "حلول صلبة متينة وأنيقة تكمل مساحتك الخارجية.",                thumbnail: "/images/services/hardscape.jpg" },
    { id: "5", slug: "irrigation-system",     title: "نظام الري",              desc: "أنظمة ري فعالة تحافظ على نضارة مناظرك الطبيعية.",             thumbnail: "/images/services/irrigation-system.jpg" },
  ],
};

/* ------------------------------------------------------------------ */
/*  Icon sources (black-source SVGs, recolored via mask)               */
/* ------------------------------------------------------------------ */

const FEATURE_ICONS = [
  "/images/home/leaf_497384.svg",       // Sustainable
  "/images/home/shield_1621638.svg",    // Quality
  "/images/home/group_18756681.svg",    // Experienced Team
  "/images/home/handshake_3562054.svg", // Customer Focused
];

const LINK_ICONS = [
  "/images/home/medal_3135490.svg",       // Company Profile
  "/images/home/construction_10941930.svg", // Licenses
  "/images/home/diploma_12493824.svg",    // Certificates
];

/* ------------------------------------------------------------------ */
/*  Props                                                               */
/* ------------------------------------------------------------------ */

interface HomePageClientProps {
  services: ServiceListItem[] | null;
  projects: ProjectListItem[] | null;
}

/* ------------------------------------------------------------------ */
/*  Component                                                           */
/* ------------------------------------------------------------------ */

export default function HomePageClient({ services, projects }: HomePageClientProps) {
  const { locale } = useLocaleContext();
  const isRTL = locale === "ar";

  const features         = FEATURES[locale];
  const stats            = STATS[locale];
  const links            = LINKS[locale];
  const fallbackServices = FALLBACK_SERVICES[locale];

  return (
    <>
      {/* ── HERO ── */}
      <section aria-label="Hero" className="relative min-h-screen overflow-hidden">
        <div className="absolute inset-0">
          <Image src="/images/hero-landscape.jpg" alt="Luxury Landscape" fill priority className="object-cover scale-105" />
        </div>
        <div className="absolute inset-0 bg-black/45" />

        <Container className="relative z-10 flex min-h-screen items-center">
          <div className={cn("max-w-2xl pt-24 md:pt-32", isRTL && "text-right")}>
            <span className="inline-block mb-5 text-xs font-semibold tracking-[0.25em] uppercase text-forest-300">
              {locale === "ar" ? "أكسون للمناظر الطبيعية · سوريا" : "AXON LANDSCAPE · SYR"}
            </span>

            <h1 className="font-display text-5xl md:text-7xl leading-[1.05] text-white text-balance">
              {locale === "ar" ? (
                <>
                  نصمم مساحات<br />خارجية<br />
                  <span className="text-forest-400">رائعة</span>
                </>
              ) : (
                <>
                  We Design<br />Beautiful Outdoor<br />
                  <span className="text-forest-400">Spaces</span>
                </>
              )}
            </h1>

            <p className="mt-7 max-w-xl text-base md:text-lg leading-relaxed text-white/80">
              {locale === "ar"
                ? "نبتكر بيئات خضراء صحية ومستدامة وملهمة ترتقي بأسلوب حياتك."
                : "Creating healthy, sustainable and inspiring landscapes that enhance your lifestyle."}
            </p>

            <div className="mt-10 flex flex-wrap gap-4">
              <Button href="/projects" size="lg">
                {locale === "ar" ? "اكتشف المزيد ←" : "Discover More →"}
              </Button>
            </div>
          </div>
        </Container>
      </section>

{/* ── PARTNER LOGOS ── */}
<div className="bg-white border-b border-sand-200 py-8 overflow-hidden">
  <style>{`
@keyframes marquee {
  0%   { transform: translateX(0); }
  100% { transform: translateX(-50%); }
}
.marquee-track {
  animation: marquee 25s linear infinite;
}
@media (max-width: 640px) {
  .marquee-track {
    animation-duration: 16s;
  }
}
  `}</style>

  <Container>
    <p className="text-center text-[10px] font-semibold tracking-[0.25em] uppercase text-charcoal-400 mb-6">
      {locale === "ar" ? "شركات المجموعة" : "Our Group Of Companies"}
    </p>
  </Container>

<div className="relative overflow-hidden">
  <div className="absolute left-0 top-0 bottom-0 w-16 sm:w-24 bg-gradient-to-r from-white to-transparent z-10 pointer-events-none" />
  <div className="absolute right-0 top-0 bottom-0 w-16 sm:w-24 bg-gradient-to-l from-white to-transparent z-10 pointer-events-none" />

  <div className="marquee-track flex w-max gap-8 sm:gap-16">
    {[1, 2, 3, 4, 5, 1, 2, 3, 4, 5].map((n, idx) => (
      <div key={idx} className="flex items-center justify-center shrink-0 h-20 w-32 sm:h-24 sm:w-48">
        <Image
          src={`/images/companies/${n}.png`}
          alt={`Company ${n}`}
          width={192}
          height={96}
          className="object-contain grayscale hover:grayscale-0 transition-all duration-300 max-h-20 sm:max-h-24 w-auto"
        />
      </div>
    ))}
  </div>
</div>
</div>
      {/* ── FEATURES ── */}
      <section className="bg-white border-b border-sand-200">
        <Container>
          <dl className="grid grid-cols-2 md:grid-cols-4 divide-x divide-sand-200">
            {features.map((f, i) => (
              <div key={f.title} className="group flex flex-col items-center text-center gap-4 px-6 py-12 transition-all duration-300 hover:bg-sand-50">
                <div className="w-14 h-14 rounded-full border border-forest-300 bg-forest-50 flex items-center justify-center text-forest-700 transition-transform duration-300 group-hover:scale-110">
                  <IconMask src={FEATURE_ICONS[i]} className="w-6 h-6" />
                </div>
                <dt className="font-semibold text-base text-charcoal-900">{f.title}</dt>
                <dd className="text-sm text-charcoal-500 leading-relaxed max-w-[220px]">{f.desc}</dd>
              </div>
            ))}
          </dl>
        </Container>
      </section>

      {/* ── ABOUT / STATS ── */}
      <Section spacing="lg" className="bg-white overflow-hidden">
        <Container>
          <div className={cn("grid grid-cols-1 lg:grid-cols-5 gap-16 items-center", isRTL && "direction-rtl")}>

            <div className={cn("lg:col-span-2 flex flex-col gap-6", isRTL && "text-right")}>
              <span className="text-xs font-semibold tracking-[0.2em] uppercase text-forest-600">
                {locale === "ar" ? "عن أكسون للمناظر الطبيعية" : "About Axon Landscape"}
              </span>
              <h2 className="font-display text-4xl md:text-5xl text-charcoal-900 leading-tight">
                {locale === "ar" ? <>نبني الطبيعة،<br />نُحسّن الحياة</> : <>Building Nature,<br />Enhancing Lives</>}
              </h2>
              <p className="text-charcoal-500 text-base leading-relaxed">
                {locale === "ar"
                  ? "في أكسون للمناظر الطبيعية، نتخصص في تهيئة بيئات خارجية جميلة وعملية ومستدامة. من الفكرة حتى التسليم، نحن معك في كل خطوة."
                  : "At Axon Landscape, we specialize in creating outdoor environments that are beautiful, functional and sustainable. From concept to completion, we are with you every step of the way."}
              </p>
              <div>
                <Button href="/about/company-profile" size="lg">
                  {locale === "ar" ? "تعرف علينا أكثر ←" : "Learn More About Us →"}
                </Button>
              </div>
            </div>

            <div className="lg:col-span-3 relative">
              <div className="relative aspect-[4/3] rounded-2xl overflow-hidden shadow-xl">
                <Image src="/images/about-landscape.jpg" alt="Axon Landscape Garden" fill className="object-cover" />
              </div>
              <div className={cn(
                "absolute top-1/2 -translate-y-1/2 bg-white/95 backdrop-blur-sm rounded-2xl px-7 py-6 flex flex-col gap-4 shadow-2xl w-52",
                isRTL ? "left-6" : "right-6",
              )}>
                {stats.map((stat, i) => (
                  <div
                    key={stat.label}
                    className={cn("flex flex-col gap-0.5", isRTL && "text-right", i !== stats.length - 1 ? "pb-4 border-b border-sand-200" : "")}
                  >
                    <span className="font-display text-4xl text-forest-700 leading-none">{stat.value}</span>
                    <span className="text-xs font-medium text-charcoal-500 tracking-wide">{stat.label}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </Container>
      </Section>

      {/* ── LINKS ── */}
      <section className="bg-sand-50 border-y border-sand-200">
        <Container>
          <dl className="grid grid-cols-1 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-sand-200">
            {links.map((l, i) => (
              <div key={i} className="group px-8 py-10 flex flex-row items-start gap-5 transition-all duration-300 hover:bg-sand-100">
                <div className="shrink-0 w-14 h-14 rounded-xl bg-forest-50 border border-forest-100 flex items-center justify-center transition-all duration-300 group-hover:bg-forest-100 text-forest-700">
                  <IconMask src={LINK_ICONS[i]} className="w-7 h-7" />
                </div>
                <div className={cn("flex flex-col gap-1.5", isRTL && "text-right")}>
                  <dt className="text-base font-semibold text-charcoal-900">{l.title}</dt>
                  <dd className="text-sm text-charcoal-500 leading-relaxed">{l.desc}</dd>
                  <a href={l.href} className="inline-flex items-center gap-1.5 mt-2 text-sm font-semibold text-forest-700 hover:gap-3 transition-all">
                    {l.cta} {isRTL ? "←" : "→"}
                  </a>
                </div>
              </div>
            ))}
          </dl>
        </Container>
      </section>

      {/* ── SERVICES ── */}
      <Section spacing="lg" className="bg-sand-50">
        <Container>
          <SectionHeading
            label={locale === "ar" ? "خدماتنا" : "Our Services"}
            title={locale === "ar" ? "حلول تنسيق شاملة" : "Comprehensive Landscaping Solutions"}
            align="center"
          />

          {services && services.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {services.slice(0, 4).map((service) => (
                <ServiceCard key={service.id} service={service} />
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {fallbackServices.map((service) => (
                <Link
                  key={service.id}
                  href={`/services/${service.slug}`}
                  className="group relative flex flex-col overflow-hidden rounded-2xl bg-white border border-sand-200 hover:border-forest-300 hover:shadow-xl transition-all duration-300"
                >
                  <div className="relative aspect-[4/3] overflow-hidden">
                    <Image src={service.thumbnail} alt={service.title} fill className="object-cover transition-transform duration-500 group-hover:scale-105" />
                  </div>
                  <div className={cn("flex flex-col gap-2 px-6 pt-6 pb-6 flex-1 text-center", isRTL && "text-right")}>
                    <h3 className="font-semibold text-charcoal-900 group-hover:text-forest-700 transition-colors">{service.title}</h3>
                    <p className="text-charcoal-500 text-sm leading-relaxed flex-1">{service.desc}</p>
                    <span className="inline-flex items-center justify-center gap-1 mt-3 text-sm font-semibold text-forest-700 group-hover:gap-2 transition-all">
                      {locale === "ar" ? "اقرأ المزيد ←" : "Read More →"}
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </Container>
      </Section>

      <RecentWorksSlider />

      {/* ── CONTACT ── */}
      <Section spacing="lg" className="bg-white border-t border-sand-200">
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 items-start">

            {/* Info */}
            <div className={cn("flex flex-col gap-6", isRTL && "text-right")}>
              <span className="text-xs font-semibold tracking-[0.2em] uppercase text-forest-600">
                {locale === "ar" ? "تواصل معنا" : "Contact Us"}
              </span>
              <h2 className="font-display text-4xl text-charcoal-900 leading-tight">
                {locale === "ar"
                  ? "لنبني شيئًا جميلًا معًا"
                  : "Let's Build Something Beautiful Together"}
              </h2>
              <p className="text-charcoal-500 text-sm leading-relaxed">
                {locale === "ar"
                  ? "يسعدنا سماع تفاصيل مشروعك. تواصل معنا اليوم."
                  : "We'd love to hear about your project. Get in touch with us today."}
              </p>

              <div className="flex flex-col gap-4 mt-2">





              </div>
            </div>

            {/* Form */}
            <div className="lg:col-span-1">
              <ContactForm />
            </div>

            {/* Map */}
            <div className="relative h-full min-h-[340px] rounded-2xl overflow-hidden shadow-md border border-sand-200">
              <iframe
                src="https://maps.google.com/maps?q=Al-Muhafaza%20Aleppo%20Syria&t=&z=14&ie=UTF8&iwloc=&output=embed"                width="100%"
                height="100%"
                style={{ border: 0, minHeight: "340px" }}
                loading="lazy"
                allowFullScreen
                className="absolute inset-0 w-full h-full"
              />
            </div>

          </div>
        </Container>
      </Section>
      {/* ── JOINT VENTURE NOTICE ── */}
<div className="bg-forest-700 border-b border-forest-800">
  <Container>
    <div className={cn("flex items-center justify-center gap-3 py-3.5", isRTL && "flex-row-reverse")}>
      {/* Dot decorator */}
      <span className="w-1.5 h-1.5 rounded-full bg-forest-300 shrink-0" />
      <p className="text-sm text-white font-medium tracking-wide">
        {locale === "ar"
          ? "تعد شركة اكسون لاندسكيب مشروعاً مشتركاً مع شركة الحلم الأخضر الزراعية في الإمارات العربية المتحدة"
          : "Axon Landscape is a Joint Venture with Green Dream Agricultural in UAE"}
      </p>
      <span className="w-1.5 h-1.5 rounded-full bg-forest-300 shrink-0" />
    </div>
  </Container>
</div>
    </>
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