"use client";

import Image from "next/image";
import Link from "next/link";
import { getServices } from "@/services/servicesApi";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { useLocaleContext } from "@/components/providers/LocaleProvider";
import { cn } from "@/lib/utils";

/* ------------------------------------------------------------------ */
/*  Static data                                                         */
/* ------------------------------------------------------------------ */

const FALLBACK_SERVICES = {
  en: [
    {
      id: "1", slug: "landscape-design",
      title: "Landscape Design",
      description: "Creative and functional designs tailored to your space and needs. From concept to detailed plans, we craft spaces that inspire.",
      thumbnail: { url: "/images/services/landscape-design.jpg", alt: "Landscape Design" },
    },
    {
      id: "2", slug: "landscape-maintenance",
      title: "Landscape Maintenance",
      description: "Professional maintenance to keep your landscape healthy, vibrant, and beautiful throughout every season.",
      thumbnail: { url: "/images/services/landscape-maintenance.jpg", alt: "Landscape Maintenance" },
    },
    {
      id: "3", slug: "nursery",
      title: "Nursery",
      description: "A wide variety of plants, trees, and flowers for every landscape — curated for the UAE climate.",
      thumbnail: { url: "/images/services/nursery.jpg", alt: "Nursery" },
    },
    {
      id: "4", slug: "hardscape",
      title: "Hardscape",
      description: "Durable and elegant hardscape solutions — pathways, patios, walls, and more — to complement your outdoor space.",
      thumbnail: { url: "/images/services/hardscape.jpg", alt: "Hardscape" },
    },
  ],
  ar: [
    {
      id: "1", slug: "landscape-design",
      title: "تصميم المناظر الطبيعية",
      description: "تصاميم إبداعية ووظيفية مخصصة لمساحتك واحتياجاتك. من الفكرة حتى الخطط التفصيلية، نصنع مساحات تُلهم.",
      thumbnail: { url: "/images/services/landscape-design.jpg", alt: "تصميم المناظر الطبيعية" },
    },
    {
      id: "2", slug: "landscape-maintenance",
      title: "صيانة المناظر الطبيعية",
      description: "صيانة احترافية للحفاظ على مناظرك الطبيعية نضرةً وجميلةً طوال فصول السنة.",
      thumbnail: { url: "/images/services/landscape-maintenance.jpg", alt: "صيانة المناظر الطبيعية" },
    },
    {
      id: "3", slug: "nursery",
      title: "المشتل",
      description: "مجموعة واسعة من النباتات والأشجار والزهور لكل بيئة — مختارة خصيصاً لمناخ الإمارات.",
      thumbnail: { url: "/images/services/nursery.jpg", alt: "المشتل" },
    },
    {
      id: "4", slug: "hardscape",
      title: "الأعمال الصلبة",
      description: "حلول صلبة متينة وأنيقة — ممرات، وأفنية، وجدران، والمزيد — لتكمل مساحتك الخارجية.",
      thumbnail: { url: "/images/services/hardscape.jpg", alt: "الأعمال الصلبة" },
    },
  ],
};

const WHATS_INCLUDED = {
  en: [
    { title: "Site Analysis",         desc: "Understanding your site's conditions, opportunities, and constraints." },
    { title: "Space Planning",        desc: "Optimized layouts that enhance flow, function, and experience." },
    { title: "Plant Selection",       desc: "Curated plant schemes suited to climate, style, and purpose." },
    { title: "Irrigation & Lighting", desc: "Efficient irrigation and lighting plans for beauty and performance." },
    { title: "Material Palette",      desc: "Premium materials selected for durability and visual harmony." },
    { title: "3D Visualization",      desc: "Realistic 3D views that bring your future landscape to life." },
  ],
  ar: [
    { title: "تحليل الموقع",          desc: "فهم ظروف موقعك وإمكانياته وقيوده." },
    { title: "تخطيط الفضاء",          desc: "تخطيطات محسّنة تعزز الحركة والوظيفة والتجربة." },
    { title: "اختيار النباتات",        desc: "مجموعات نباتية مختارة تتناسب مع المناخ والأسلوب والغرض." },
    { title: "الري والإضاءة",          desc: "خطط ري وإضاءة فعّالة للجمال والأداء." },
    { title: "لوحة المواد",            desc: "مواد فاخرة مختارة للمتانة والانسجام البصري." },
    { title: "التصور ثلاثي الأبعاد",   desc: "مشاهد ثلاثية الأبعاد واقعية تُحيي مناظرك المستقبلية." },
  ],
};

const PROCESS = {
  en: [
    { step: 1, title: "Consultation",        desc: "We listen to your vision, needs, and goals." },
    { step: 2, title: "Site Analysis",       desc: "We study your site and gather key insights." },
    { step: 3, title: "Concept Development", desc: "Creative concepts that capture your vision." },
    { step: 4, title: "Detailed Planning",   desc: "Comprehensive plans, selections, and specifications." },
    { step: 5, title: "Review & Approval",   desc: "We refine the design with your feedback." },
    { step: 6, title: "Final Delivery",      desc: "Final plans delivered for seamless execution." },
  ],
  ar: [
    { step: 1, title: "الاستشارة",           desc: "نستمع إلى رؤيتك واحتياجاتك وأهدافك." },
    { step: 2, title: "تحليل الموقع",        desc: "ندرس موقعك ونجمع الرؤى الأساسية." },
    { step: 3, title: "تطوير المفهوم",       desc: "مفاهيم إبداعية تعكس رؤيتك." },
    { step: 4, title: "التخطيط التفصيلي",    desc: "خطط شاملة واختيارات ومواصفات دقيقة." },
    { step: 5, title: "المراجعة والموافقة",  desc: "نصقل التصميم بناءً على ملاحظاتك." },
    { step: 6, title: "التسليم النهائي",     desc: "تسليم الخطط النهائية لتنفيذ سلس." },
  ],
};

const WHY_AXON = {
  en: [
    { title: "Experienced Team",    desc: "Skilled designers and horticulturists with diverse expertise." },
    { title: "Tailored Solutions",  desc: "Custom designs crafted around your lifestyle and site." },
    { title: "Quality Standards",   desc: "Premium materials and meticulous attention to detail." },
    { title: "Sustainable Design",  desc: "Environmentally responsible solutions that last." },
  ],
  ar: [
    { title: "فريق متمرس",           desc: "مصممون وخبراء نباتات ذوو كفاءة وخبرة متنوعة." },
    { title: "حلول مخصصة",           desc: "تصاميم مخصصة حول أسلوب حياتك وموقعك." },
    { title: "معايير الجودة",         desc: "مواد فاخرة واهتمام دقيق بكل تفصيل." },
    { title: "تصميم مستدام",          desc: "حلول مسؤولة بيئياً تدوم طويلاً." },
  ],
};

const FAQ = {
  en: [
    {
      q: "What does the Landscape Design service include?",
      a: "Our Landscape Design service includes site analysis, concept development, space planning, plant selection, material palette curation, irrigation and lighting design, and full 3D visualization — everything needed to bring your vision to life.",
    },
    {
      q: "How long does the design process take?",
      a: "Timelines vary depending on project scale, but a typical residential landscape design takes between 4 to 8 weeks from initial consultation to final plan delivery.",
    },
    {
      q: "Can you work with existing landscapes?",
      a: "Absolutely. We regularly work with existing outdoor spaces — whether it's a refresh, an expansion, or a full redesign — adapting our approach to what's already there.",
    },
  ],
  ar: [
    {
      q: "ماذا تشمل خدمة تصميم المناظر الطبيعية؟",
      a: "تشمل خدمتنا تحليل الموقع، وتطوير المفهوم، وتخطيط الفضاء، واختيار النباتات، ولوحة المواد، وتصميم الري والإضاءة، والتصور ثلاثي الأبعاد — كل ما يلزم لإحياء رؤيتك.",
    },
    {
      q: "كم يستغرق عملية التصميم؟",
      a: "تتفاوت المدد حسب حجم المشروع، لكن تصميم المناظر الطبيعية السكنية يستغرق عادةً من 4 إلى 8 أسابيع من الاستشارة الأولى حتى تسليم الخطة النهائية.",
    },
    {
      q: "هل يمكنكم العمل على مناظر طبيعية قائمة؟",
      a: "بالتأكيد. نعمل باستمرار على المساحات الخارجية القائمة — سواء كان تجديداً أو توسعةً أو إعادة تصميم كاملة — مع التكيف مع ما هو موجود.",
    },
  ],
};

const T = {
  en: {
    breadcrumbHome: "Home",
    breadcrumbServices: "Services",
    badge: "What We Offer",
    heroTitle: "Our Services",
    heroDesc: "Comprehensive landscape architecture, design, and nursery services for every scale of project across the UAE.",
    overviewTitle: "Overview",
    overviewDesc: "Our Landscape Design service delivers thoughtfully crafted outdoor environments that balance beauty, functionality, and sustainability. From concept to detailed plans, we design spaces that enhance well-being and add lasting value.",
    whatsIncluded: "What's Included",
    ourProcess: "Our Process",
    whyAxon: "Why Choose Axon",
    featuredWorks: "Featured Design Works",
    faq: "FAQ",
  },
  ar: {
    breadcrumbHome: "الرئيسية",
    breadcrumbServices: "الخدمات",
    badge: "ما نقدمه",
    heroTitle: "خدماتنا",
    heroDesc: "خدمات شاملة في هندسة المناظر الطبيعية والتصميم والمشتل لكل حجم من المشاريع في الإمارات.",
    overviewTitle: "نظرة عامة",
    overviewDesc: "تقدم خدمة تصميم المناظر الطبيعية لدينا بيئات خارجية مدروسة تجمع بين الجمال والوظيفة والاستدامة. من الفكرة حتى الخطط التفصيلية، نصمم مساحات ترفع جودة الحياة وتضيف قيمة دائمة.",
    whatsIncluded: "ما يشمله التصميم",
    ourProcess: "آلية عملنا",
    whyAxon: "لماذا تختار أكسون",
    featuredWorks: "أبرز أعمال التصميم",
    faq: "الأسئلة الشائعة",
  },
};

/* ------------------------------------------------------------------ */
/*  Icons — landscape-themed                                            */
/* ------------------------------------------------------------------ */

// What's Included icons:
// 1. Site Analysis      → magnifier over terrain/map contour lines
// 2. Space Planning     → floor-plan grid with measurements
// 3. Plant Selection    → leaf / botanical
// 4. Irrigation & Light → water drop + sun rays
// 5. Material Palette   → stone/paving swatches
// 6. 3D Visualization   → cube with perspective lines

const INCLUDED_ICONS = [
  /* 1 — Site Analysis: magnifier over topographic contour */
  <svg key="site-analysis" className="w-9 h-9" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24" aria-hidden="true">
    {/* contour lines */}
    <path strokeLinecap="round" strokeLinejoin="round" d="M3 14c1.5-1 3.5-1.5 5-1s3 1.5 4.5 1 2.5-1 3.5-1" />
    <path strokeLinecap="round" strokeLinejoin="round" d="M3 17c1.5-1 3.5-1.5 5-1s3 1.5 4.5 1 2.5-1 3.5-1" />
    {/* magnifier */}
    <circle cx="14.5" cy="8.5" r="4" />
    <path strokeLinecap="round" strokeLinejoin="round" d="M17.5 11.5 21 15" />
  </svg>,

  /* 2 — Space Planning: site plan / blueprint grid */
  <svg key="space-planning" className="w-9 h-9" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24" aria-hidden="true">
    <rect x="3" y="3" width="18" height="18" rx="1.5" />
    {/* inner room divisions */}
    <path strokeLinecap="round" d="M3 10h18" />
    <path strokeLinecap="round" d="M11 10v11" />
    {/* dimension tick marks */}
    <path strokeLinecap="round" d="M7 3v2M16 3v2M3 15h2M3 7h2" />
  </svg>,

  /* 3 — Plant Selection: botanical leaf with vein */
  <svg key="plant-selection" className="w-9 h-9" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24" aria-hidden="true">
    {/* leaf outline */}
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 21C12 21 4 16 4 9a8 8 0 0 1 16 0c0 7-8 12-8 12Z" />
    {/* central vein */}
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 21V9" />
    {/* side veins */}
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 13l-3-2.5M12 16l3-2" />
  </svg>,

  /* 4 — Irrigation & Lighting: water drop with sun rays */
  <svg key="irrigation-lighting" className="w-9 h-9" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24" aria-hidden="true">
    {/* sun */}
    <circle cx="17" cy="7" r="2.5" />
    <path strokeLinecap="round" d="M17 3.5V2M17 12v-1.5M20.5 7H22M12 7h1.5M19.6 4.4l1-1M14.4 9.6l-1 1M20.6 9.6l1 1M14.4 4.4l-1-1" />
    {/* water drop */}
    <path strokeLinecap="round" strokeLinejoin="round" d="M8 5c0 0-5 5.5-5 9a5 5 0 0 0 10 0c0-3.5-5-9-5-9Z" />
  </svg>,

  /* 5 — Material Palette: paving stones / tile grid */
  <svg key="material-palette" className="w-9 h-9" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24" aria-hidden="true">
    {/* large stone top-left */}
    <rect x="2.5" y="2.5" width="8" height="5" rx="0.75" />
    {/* large stone top-right */}
    <rect x="13.5" y="2.5" width="8" height="5" rx="0.75" />
    {/* offset middle row */}
    <rect x="7" y="10" width="10" height="5" rx="0.75" />
    <rect x="2.5" y="10" width="3" height="5" rx="0.75" />
    <rect x="18.5" y="10" width="3" height="5" rx="0.75" />
    {/* bottom row */}
    <rect x="2.5" y="17.5" width="8" height="4" rx="0.75" />
    <rect x="13.5" y="17.5" width="8" height="4" rx="0.75" />
  </svg>,

  /* 6 — 3D Visualization: isometric landscape cube */
  <svg key="3d-viz" className="w-9 h-9" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24" aria-hidden="true">
    {/* top face */}
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 3 21 8l-9 5-9-5 9-5Z" />
    {/* left face */}
    <path strokeLinecap="round" strokeLinejoin="round" d="M3 8v8l9 5V13L3 8Z" />
    {/* right face */}
    <path strokeLinecap="round" strokeLinejoin="round" d="M21 8v8l-9 5V13l9-5Z" />
    {/* subtle terrain lines on top face */}
    <path strokeLinecap="round" strokeLinejoin="round" strokeOpacity="0.5" d="M8 5.5l4 2.5 4-2.5" />
  </svg>,
];

// Why Choose Axon icons:
// 1. Experienced Team   → group of people / botanist silhouette
// 2. Tailored Solutions → ruler + pencil (custom drawing)
// 3. Quality Standards  → rosette / award badge
// 4. Sustainable Design → leaf recycling / eco cycle

const WHY_ICONS = [
  /* 1 — Experienced Team: people group with a plant */
  <svg key="team" className="w-10 h-10" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24" aria-hidden="true">
    {/* left person */}
    <circle cx="5.5" cy="7" r="2" />
    <path strokeLinecap="round" strokeLinejoin="round" d="M2 19c0-2 1.5-3.5 3.5-3.5S9 17 9 19" />
    {/* right person */}
    <circle cx="18.5" cy="7" r="2" />
    <path strokeLinecap="round" strokeLinejoin="round" d="M15 19c0-2 1.5-3.5 3.5-3.5S22 17 22 19" />
    {/* center person with plant/leaf crown — the expert */}
    <circle cx="12" cy="6" r="2.5" />
    <path strokeLinecap="round" strokeLinejoin="round" d="M7.5 19c0-2.5 2-4.5 4.5-4.5s4.5 2 4.5 4.5" />
    {/* small leaf above center person */}
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 3.5c0 0 1.5-1.5 2.5-.5s0 2.5-2.5 2.5-3.5-1.5-2.5-2.5S12 3.5 12 3.5Z" />
  </svg>,

  /* 2 — Tailored Solutions: ruler + pencil (bespoke design) */
  <svg key="tailored" className="w-10 h-10" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24" aria-hidden="true">
    {/* ruler */}
    <rect x="2" y="14" width="20" height="5" rx="1" transform="rotate(-45 2 14)" />
    <path strokeLinecap="round" d="M6.5 14.5v1.5M9.5 11.5v1.5M12.5 8.5v1.5M15.5 5.5v1.5" />
    {/* pencil tip */}
    <path strokeLinecap="round" strokeLinejoin="round" d="M19 5l-1.5 1.5" />
  </svg>,

  /* 3 — Quality Standards: rosette / award */
  <svg key="quality" className="w-10 h-10" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24" aria-hidden="true">
    {/* outer starburst / rosette */}
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 2l2.09 4.26L18.5 7l-3.5 3.4.83 4.85L12 13.1l-3.83 2.15L9 10.4 5.5 7l4.41-.74L12 2Z" />
    {/* inner circle */}
    <circle cx="12" cy="10" r="2.5" />
    {/* ribbon tail */}
    <path strokeLinecap="round" strokeLinejoin="round" d="M9 17l-1 5 4-2.5 4 2.5-1-5" />
  </svg>,

  /* 4 — Sustainable Design: eco leaf with circular arrow */
  <svg key="sustainable" className="w-10 h-10" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24" aria-hidden="true">
    {/* leaf */}
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 22C12 22 5 17 5 10.5A7 7 0 0 1 19 10.5c0 2.5-1.5 5-3 6.5" />
    {/* central vein */}
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 22v-9" />
    {/* recycling arc arrow */}
    <path strokeLinecap="round" strokeLinejoin="round" d="M16 19a5 5 0 0 1-8 0" />
    <path strokeLinecap="round" strokeLinejoin="round" d="M14.5 17.5l1.5 1.5-1.5 1.5" />
  </svg>,
];

/* ------------------------------------------------------------------ */
/*  Component                                                           */
/* ------------------------------------------------------------------ */

export default function ServicesPage() {
  const { locale } = useLocaleContext();
  const isRTL = locale === "ar";
  const t = T[locale];
  const whatsIncluded  = WHATS_INCLUDED[locale];
  const process        = PROCESS[locale];
  const whyAxon        = WHY_AXON[locale];
  const faq            = FAQ[locale];
  const fallback       = FALLBACK_SERVICES[locale];

  return (
    <div dir={isRTL ? "rtl" : "ltr"}>

      {/* ── HERO ── */}
      <section className="relative min-h-[420px] md:min-h-[520px] flex items-end overflow-hidden">
        <div className="absolute inset-0">
          <Image src="/images/services/landscape-maintenance.jpg" alt={t.heroTitle} fill priority className="object-cover" />
          <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/40 to-transparent" />
        </div>

        <Container className="relative z-10 pb-16 pt-40 md:pt-48">
          <nav className="flex items-center gap-2 text-xs text-white/60 font-body mb-6">
            <Link href="/" className="hover:text-white transition-colors">{t.breadcrumbHome}</Link>
            <span className="opacity-40">›</span>
            <span className="text-white/90 font-medium">{t.breadcrumbServices}</span>
          </nav>
          <div className={cn("max-w-xl", isRTL && "text-right")}>
            <span className="inline-block mb-4 text-xs font-semibold tracking-[0.25em] uppercase text-forest-300">
              {t.badge}
            </span>
            <h1 className="font-display text-5xl md:text-7xl text-white leading-tight">{t.heroTitle}</h1>
            <div className="w-14 h-0.5 bg-forest-400 my-6" />
            <p className="font-body text-base md:text-lg text-white/80 leading-relaxed">{t.heroDesc}</p>
          </div>
        </Container>
      </section>

      {/* ── SERVICE OVERVIEW ── */}
      <Section spacing="lg" className="bg-white">
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-14 items-center mb-20">
            <div className={cn("flex flex-col gap-6", isRTL && "text-right")}>
              <h2 className="font-display text-4xl md:text-5xl text-charcoal-900 leading-tight">{t.overviewTitle}</h2>
              <div className={cn("w-10 h-0.5 bg-forest-600", isRTL && "mr-0 ml-auto")} />
              <p className="font-body text-base text-charcoal-500 leading-relaxed">{t.overviewDesc}</p>
            </div>
            <div className="relative rounded-2xl overflow-hidden aspect-[4/3] shadow-lg">
              <Image src="/images/services/landscape-design.jpg" alt={t.overviewTitle} fill className="object-cover" />
            </div>
          </div>

          {/* What's Included */}
          <div className="text-center">
            <h2 className="font-display text-3xl md:text-4xl text-charcoal-900 mb-3">{t.whatsIncluded}</h2>
            <div className="w-10 h-0.5 bg-forest-600 mx-auto mb-12" />
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
              {whatsIncluded.map((item, i) => (
                <div key={item.title} className="group flex flex-col items-center gap-3 p-5 rounded-2xl border border-sand-200 bg-white hover:border-forest-300 hover:shadow-md transition-all duration-300">
                  <div className="text-forest-700">{INCLUDED_ICONS[i]}</div>
                  <h4 className="font-semibold text-sm text-charcoal-900 text-center leading-snug">{item.title}</h4>
                  <p className="font-body text-xs text-charcoal-500 leading-relaxed text-center">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </Container>
      </Section>

      {/* ── OUR PROCESS ── */}
      <section className="bg-sand-50 border-y border-sand-200 py-20 md:py-28">
        <Container>
          <div className="text-center mb-16">
            <h2 className="font-display text-3xl md:text-4xl text-charcoal-900 mb-3">{t.ourProcess}</h2>
            <div className="w-10 h-0.5 bg-forest-600 mx-auto" />
          </div>
          <div className="relative grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-6 gap-6">
            <div className="hidden lg:block absolute top-5 left-[8%] right-[8%] h-0.5 bg-forest-200 z-0" />
            {process.map((item) => (
              <div key={item.step} className="relative z-10 flex flex-col items-center text-center gap-4">
                <div className="w-10 h-10 rounded-full bg-forest-700 text-white flex items-center justify-center font-semibold text-sm shadow-md">
                  {item.step}
                </div>
                <div>
                  <h4 className="font-semibold text-sm text-charcoal-900 mb-1 leading-snug">{item.title}</h4>
                  <p className="font-body text-xs text-charcoal-500 leading-relaxed">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* ── WHY CHOOSE AXON ── */}
      <Section spacing="lg" className="bg-white">
        <Container>
          <div className="text-center mb-14">
            <h2 className="font-display text-3xl md:text-4xl text-charcoal-900 mb-3">{t.whyAxon}</h2>
            <div className="w-10 h-0.5 bg-forest-600 mx-auto" />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-4 gap-6">
            {whyAxon.map((item, i) => (
              <div key={item.title} className="group flex flex-col items-center text-center gap-4 p-7 rounded-2xl border border-sand-200 bg-white hover:border-forest-300 hover:shadow-md transition-all duration-300">
                <div className="text-forest-700">{WHY_ICONS[i]}</div>
                <div>
                  <h4 className="font-semibold text-charcoal-900 mb-1">{item.title}</h4>
                  <p className="font-body text-sm text-charcoal-500 leading-relaxed">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </Container>
      </Section>

      {/* ── FEATURED DESIGN WORKS ── */}
      <section className="bg-white py-20 md:py-28">
        <Container>
          <div className="text-center mb-12">
            <h2 className="font-display text-3xl md:text-4xl text-charcoal-900 mb-3">{t.featuredWorks}</h2>
            <div className="w-10 h-0.5 bg-forest-600 mx-auto" />
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              { src: "/images/projects/project-1.jpg", alt: "Project 1" },
              { src: "/images/projects/project-2.jpg", alt: "Project 2" },
              { src: "/images/projects/project-3.jpg", alt: "Project 3" },
              { src: "/images/projects/project-4.jpg", alt: "Project 4" },
            ].map((img, i) => (
              <div key={i} className="relative aspect-square rounded-2xl overflow-hidden group shadow-sm">
                <Image src={img.src} alt={img.alt} fill className="object-cover transition-transform duration-500 group-hover:scale-105" />
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* ── FAQ ── */}
      <section className="bg-sand-50 border-y border-sand-200 py-20 md:py-28">
        <Container size="md">
          <div className="text-center mb-12">
            <h2 className="font-display text-3xl md:text-4xl text-charcoal-900 mb-3">{t.faq}</h2>
            <div className="w-10 h-0.5 bg-forest-600 mx-auto" />
          </div>
          <div className="flex flex-col divide-y divide-sand-200 border border-sand-200 rounded-2xl bg-white overflow-hidden">
            {faq.map((item, i) => (
              <details key={i} className="group px-6 py-5 cursor-pointer">
                <summary className={cn("flex items-center justify-between gap-4 font-body text-sm font-medium text-charcoal-900 list-none [&::-webkit-details-marker]:hidden", isRTL && "flex-row-reverse")}>
                  {item.q}
                  <span className="shrink-0 text-forest-700 transition-transform duration-300 group-open:rotate-180">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="m19 9-7 7-7-7" />
                    </svg>
                  </span>
                </summary>
                <p className={cn("mt-4 font-body text-sm text-charcoal-500 leading-relaxed", isRTL && "text-right")}>
                  {item.a}
                </p>
              </details>
            ))}
          </div>
        </Container>
      </section>

    </div>
  );
}