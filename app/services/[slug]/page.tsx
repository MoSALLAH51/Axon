"use client";

import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { ServiceFAQ } from "@/components/sections/ServiceFAQ";
import { useLocaleContext } from "@/components/providers/LocaleProvider";
import { cn } from "@/lib/utils";

/* ------------------------------------------------------------------ */
/*  Types                                                               */
/* ------------------------------------------------------------------ */
interface PageProps {
  params: { slug: string };
}

interface BilingualText {
  en: string;
  ar: string;
}

interface IncludedItem {
  icon: JSX.Element;
  title: BilingualText;
  desc: BilingualText;
}

interface ProcessStep {
  step: number;
  title: BilingualText;
  desc: BilingualText;
}

interface WhyItem {
  icon: JSX.Element;
  title: BilingualText;
  desc: BilingualText;
}

interface FAQItem {
  q: BilingualText;
  a: BilingualText;
}

interface ServiceData {
  slug: string;
  title: BilingualText;
  description: BilingualText;
  overview: BilingualText;
  hero_image: string;
  overview_image: string;
  included: IncludedItem[];
  process: ProcessStep[];
  why: WhyItem[];
  faq: FAQItem[];
}

/* ------------------------------------------------------------------ */
/*  Static UI translations                                              */
/* ------------------------------------------------------------------ */
const T = {
  en: {
    breadcrumbHome: "Home",
    breadcrumbServices: "Services",
    overview: "Overview",
    whatsIncluded: "What's Included",
    ourProcess: "Our Process",
    whyAxon: "Why Choose Axon",
    featuredWorks: "Featured Design Works",
    faq: "FAQ",
    cta: "Request Consultation →",
  },
  ar: {
    breadcrumbHome: "الرئيسية",
    breadcrumbServices: "الخدمات",
    overview: "نظرة عامة",
    whatsIncluded: "ما يشمله",
    ourProcess: "آلية عملنا",
    whyAxon: "لماذا تختار أكسون",
    featuredWorks: "أبرز أعمال التصميم",
    faq: "الأسئلة الشائعة",
    cta: "طلب استشارة ←",
  },
};

/* ------------------------------------------------------------------ */
/*  Services Mock Data                                                  */
/* ------------------------------------------------------------------ */
const SERVICES: ServiceData[] = [
  /* ──────────────────────────────────────────────────────────────── */
  /*  1. Landscape Design                                               */
  /* ──────────────────────────────────────────────────────────────── */
  {
    slug: "landscape-design",
    title: { en: "Landscape Design", ar: "تصميم المناظر الطبيعية" },
    description: {
      en: "We create functional, elegant outdoor spaces that reflect your lifestyle and elevate every moment outdoors.",
      ar: "نصمم مساحات خارجية أنيقة وعملية تعكس أسلوب حياتك وترتقي بكل لحظة في الهواء الطلق.",
    },
    overview: {
      en: "Our Landscape Design service delivers thoughtfully crafted outdoor environments that balance beauty, functionality, and sustainability. From concept to detailed plans, we design spaces that enhance well-being and add lasting value.",
      ar: "تقدم خدمة تصميم المناظر الطبيعية بيئات خارجية مدروسة توازن بين الجمال والوظيفة والاستدامة. من المفهوم إلى الخطط التفصيلية، نصمم مساحات تعزز الراحة وتضيف قيمة دائمة.",
    },
    hero_image: "/images/services/landscape-design.jpg",
    overview_image: "/images/services/overview.jpg",
    included: [
      {
        icon: <SearchIcon />,
        title: { en: "Site Analysis", ar: "تحليل الموقع" },
        desc: {
          en: "Understanding your site's conditions, opportunities, and constraints.",
          ar: "فهم ظروف موقعك وإمكانياته وقيوده.",
        },
      },
      {
        icon: <GridIcon />,
        title: { en: "Space Planning", ar: "تخطيط الفضاء" },
        desc: {
          en: "Optimized layouts that enhance flow, function, and experience.",
          ar: "تخطيطات محسّنة تعزز الحركة والوظيفة والتجربة.",
        },
      },
      {
        icon: <LeafIcon />,
        title: { en: "Plant Selection", ar: "اختيار النباتات" },
        desc: {
          en: "Curated plant schemes suited to climate, style, and purpose.",
          ar: "مجموعات نباتية مختارة تتناسب مع المناخ والأسلوب والغرض.",
        },
      },
      {
        icon: <DropIcon />,
        title: { en: "Irrigation & Lighting", ar: "الري والإضاءة" },
        desc: {
          en: "Efficient irrigation and lighting plans for beauty and performance.",
          ar: "خطط ري وإضاءة فعّالة للجمال والأداء.",
        },
      },
      {
        icon: <PaletteIcon />,
        title: { en: "Material Palette", ar: "لوحة المواد" },
        desc: {
          en: "Premium materials selected for durability and visual harmony.",
          ar: "مواد فاخرة مختارة للمتانة والانسجام البصري.",
        },
      },
      {
        icon: <CubeIcon />,
        title: { en: "3D Visualization", ar: "التصور ثلاثي الأبعاد" },
        desc: {
          en: "Realistic 3D views that bring your future landscape to life.",
          ar: "مشاهد ثلاثية الأبعاد واقعية تُحيي مناظرك المستقبلية.",
        },
      },
    ],
    process: [
      { step: 1, title: { en: "Consultation", ar: "الاستشارة" }, desc: { en: "We listen to your vision, needs, and goals.", ar: "نستمع إلى رؤيتك واحتياجاتك وأهدافك." } },
      { step: 2, title: { en: "Site Analysis", ar: "تحليل الموقع" }, desc: { en: "We study your site and gather key insights.", ar: "ندرس موقعك ونجمع الرؤى الأساسية." } },
      { step: 3, title: { en: "Concept Development", ar: "تطوير المفهوم" }, desc: { en: "Creative concepts that capture your vision.", ar: "مفاهيم إبداعية تعكس رؤيتك." } },
      { step: 4, title: { en: "Detailed Planning", ar: "التخطيط التفصيلي" }, desc: { en: "Comprehensive plans, selections, and specifications.", ar: "خطط شاملة واختيارات ومواصفات دقيقة." } },
      { step: 5, title: { en: "Review & Approval", ar: "المراجعة والموافقة" }, desc: { en: "We refine the design with your feedback.", ar: "نصقل التصميم بناءً على ملاحظاتك." } },
      { step: 6, title: { en: "Final Delivery", ar: "التسليم النهائي" }, desc: { en: "Final plans delivered for seamless execution.", ar: "تسليم الخطط النهائية لتنفيذ سلس." } },
    ],
    why: [
      { icon: <TeamIcon />, title: { en: "Experienced Team", ar: "فريق متمرس" }, desc: { en: "Skilled designers and horticulturists with diverse expertise.", ar: "مصممون وخبراء نباتات ذوو كفاءة وخبرة متنوعة." } },
      { icon: <LeafIcon />, title: { en: "Tailored Solutions", ar: "حلول مخصصة" }, desc: { en: "Custom designs crafted around your lifestyle and site.", ar: "تصاميم مخصصة حول أسلوب حياتك وموقعك." } },
      { icon: <ShieldIcon />, title: { en: "Quality Standards", ar: "معايير الجودة" }, desc: { en: "Premium materials and meticulous attention to detail.", ar: "مواد فاخرة واهتمام دقيق بكل تفصيل." } },
      { icon: <EcoIcon />, title: { en: "Sustainable Design", ar: "تصميم مستدام" }, desc: { en: "Environmentally responsible solutions that last.", ar: "حلول مسؤولة بيئياً تدوم طويلاً." } },
    ],
    faq: [
      {
        q: { en: "What does the Landscape Design service include?", ar: "ماذا تشمل خدمة تصميم المناظر الطبيعية؟" },
        a: {
          en: "Our service covers site analysis, space planning, plant selection, irrigation and lighting design, material palette curation, and 3D visualization — everything from concept to final delivery documents.",
          ar: "تشمل خدمتنا تحليل الموقع، وتخطيط الفضاء، واختيار النباتات، وتصميم الري والإضاءة، ولوحة المواد، والتصور ثلاثي الأبعاد — كل ما يلزم من المفهوم حتى وثائق التسليم النهائية.",
        },
      },
      {
        q: { en: "How long does the design process take?", ar: "كم يستغرق عملية التصميم؟" },
        a: {
          en: "Timelines vary by project scale. A typical residential design takes 4–8 weeks from consultation to final delivery.",
          ar: "تتفاوت المدد حسب حجم المشروع. يستغرق التصميم السكني المعتاد من 4 إلى 8 أسابيع من الاستشارة حتى التسليم النهائي.",
        },
      },
      {
        q: { en: "Can you work with existing landscapes?", ar: "هل يمكنكم العمل على مناظر طبيعية قائمة؟" },
        a: {
          en: "Absolutely. We assess your current landscape and propose designs that enhance or transform what's already there.",
          ar: "بالتأكيد. نقيّم مناظرك الطبيعية الحالية ونقترح تصاميم تعزز أو تحوّل ما هو موجود.",
        },
      },
    ],
  },

  /* ──────────────────────────────────────────────────────────────── */
  /*  2. Landscape Construction                                         */
  /* ──────────────────────────────────────────────────────────────── */
  {
    slug: "landscape-construction",
    title: { en: "Landscape Construction", ar: "تنفيذ المناظر الطبيعية" },
    description: {
      en: "From groundwork to finishing touches, we bring landscape designs to life with precision, craftsmanship, and care.",
      ar: "من الأعمال الأساسية إلى اللمسات النهائية، ننفّذ تصاميم المناظر الطبيعية بدقة وحرفية واهتمام.",
    },
    overview: {
      en: "Our Landscape Construction service translates approved designs into reality. Our skilled crews handle hardscaping, softscaping, structures, and finishing work with a focus on quality, timelines, and site safety.",
      ar: "تترجم خدمة تنفيذ المناظر الطبيعية التصاميم المعتمدة إلى واقع ملموس. فرقنا المتمرسة تتولى الأعمال الصلبة والزراعية والإنشاءات والتشطيبات مع التركيز على الجودة والمواعيد وسلامة الموقع.",
    },
    hero_image: "/images/services/landscape-construction.jpg",
    overview_image: "/images/services/construction-overview.jpg",
    included: [
      {
        icon: <GridIcon />,
        title: { en: "Site Preparation", ar: "تجهيز الموقع" },
        desc: {
          en: "Clearing, grading, and groundwork to set a solid foundation.",
          ar: "تنظيف وتسوية وأعمال أساسية لإعداد قاعدة متينة.",
        },
      },
      {
        icon: <CubeIcon />,
        title: { en: "Hardscaping", ar: "الأعمال الصلبة" },
        desc: {
          en: "Paving, decking, walls, and structural elements built to last.",
          ar: "أرصفة وممرات وجدران وعناصر إنشائية مصممة للمتانة.",
        },
      },
      {
        icon: <LeafIcon />,
        title: { en: "Softscaping", ar: "الأعمال الزراعية" },
        desc: {
          en: "Planting, turf laying, and soil preparation for healthy growth.",
          ar: "زراعة النباتات وتمديد العشب وتجهيز التربة لنمو صحي.",
        },
      },
      {
        icon: <DropIcon />,
        title: { en: "Irrigation Installation", ar: "تركيب أنظمة الري" },
        desc: {
          en: "Full installation of irrigation lines, valves, and controllers.",
          ar: "تركيب كامل لخطوط الري والصمامات ووحدات التحكم.",
        },
      },
      {
        icon: <PaletteIcon />,
        title: { en: "Lighting & Electrical", ar: "الإضاءة والكهرباء" },
        desc: {
          en: "Outdoor lighting and electrical work installed to specification.",
          ar: "تركيب الإضاءة الخارجية والأعمال الكهربائية حسب المواصفات.",
        },
      },
      {
        icon: <ShieldIcon />,
        title: { en: "Quality Handover", ar: "تسليم بالجودة" },
        desc: {
          en: "Final inspections and walkthroughs before project handover.",
          ar: "فحوصات نهائية وجولات تفتيش قبل تسليم المشروع.",
        },
      },
    ],
    process: [
      { step: 1, title: { en: "Project Kickoff", ar: "انطلاق المشروع" }, desc: { en: "Reviewing approved plans and mobilizing the team.", ar: "مراجعة الخطط المعتمدة وتجهيز الفريق." } },
      { step: 2, title: { en: "Site Preparation", ar: "تجهيز الموقع" }, desc: { en: "Clearing, grading, and setting out the site.", ar: "تنظيف وتسوية وتحديد معالم الموقع." } },
      { step: 3, title: { en: "Hardscape Works", ar: "الأعمال الصلبة" }, desc: { en: "Building paving, walls, and structural features.", ar: "إنشاء الأرصفة والجدران والعناصر الإنشائية." } },
      { step: 4, title: { en: "Planting & Turfing", ar: "الزراعة والتعشيب" }, desc: { en: "Installing plants, trees, and turf areas.", ar: "زراعة النباتات والأشجار ومناطق العشب." } },
      { step: 5, title: { en: "Systems Integration", ar: "تكامل الأنظمة" }, desc: { en: "Connecting irrigation, lighting, and electrical systems.", ar: "ربط أنظمة الري والإضاءة والكهرباء." } },
      { step: 6, title: { en: "Final Handover", ar: "التسليم النهائي" }, desc: { en: "Quality checks and project handover to the client.", ar: "فحوصات الجودة وتسليم المشروع للعميل." } },
    ],
    why: [
      { icon: <TeamIcon />, title: { en: "Skilled Crews", ar: "فرق متمرسة" }, desc: { en: "Trained construction teams with hands-on landscape expertise.", ar: "فرق تنفيذ مدربة وذات خبرة عملية في المناظر الطبيعية." } },
      { icon: <ShieldIcon />, title: { en: "Built to Last", ar: "بناء يدوم" }, desc: { en: "Durable materials and proven construction techniques.", ar: "مواد متينة وتقنيات بناء مثبتة." } },
      { icon: <CubeIcon />, title: { en: "On-Time Delivery", ar: "التزام بالمواعيد" }, desc: { en: "Clear schedules and proactive project management.", ar: "جداول واضحة وإدارة مشاريع استباقية." } },
      { icon: <EcoIcon />, title: { en: "Safe & Responsible", ar: "أمان ومسؤولية" }, desc: { en: "Strict safety standards and respect for the surrounding site.", ar: "معايير سلامة صارمة واحترام للموقع المحيط." } },
    ],
    faq: [
      {
        q: { en: "Do you work from our existing design plans?", ar: "هل تعملون وفق خطط التصميم الموجودة لدينا؟" },
        a: {
          en: "Yes, we can construct from your existing approved designs, or from our in-house Landscape Design service for a seamless handoff.",
          ar: "نعم، يمكننا التنفيذ بناءً على تصاميمكم المعتمدة، أو من خدمة تصميم المناظر الطبيعية الخاصة بنا لانتقال سلس.",
        },
      },
      {
        q: { en: "How long does construction typically take?", ar: "كم تستغرق أعمال التنفيذ عادةً؟" },
        a: {
          en: "Duration depends on project size and complexity, ranging from a few weeks for small gardens to several months for large estates.",
          ar: "تعتمد المدة على حجم المشروع وتعقيده، وتتراوح من بضعة أسابيع للحدائق الصغيرة إلى عدة أشهر للمشاريع الكبيرة.",
        },
      },
      {
        q: { en: "Do you provide a warranty on the work?", ar: "هل تقدمون ضماناً على الأعمال؟" },
        a: {
          en: "Yes, all our construction work comes with a workmanship warranty, with details specified in your project contract.",
          ar: "نعم، تأتي جميع أعمالنا بضمان على الجودة، مع تفاصيل محددة في عقد مشروعك.",
        },
      },
    ],
  },

  /* ──────────────────────────────────────────────────────────────── */
  /*  3. Maintenance                                                    */
  /* ──────────────────────────────────────────────────────────────── */
  {
    slug: "maintenance",
    title: { en: "Landscape Maintenance", ar: "صيانة المناظر الطبيعية" },
    description: {
      en: "Keep your outdoor spaces healthy, tidy, and thriving year-round with our dedicated maintenance programs.",
      ar: "حافظ على مساحاتك الخارجية صحية ومنظمة ومزدهرة على مدار العام مع برامج الصيانة المخصصة لدينا.",
    },
    overview: {
      en: "Our Maintenance service keeps your landscape looking its best through every season. From routine care to seasonal upkeep, our teams ensure your investment continues to grow and thrive.",
      ar: "تحافظ خدمة الصيانة على مظهر مناظرك الطبيعية في أفضل حالاتها على مدار الفصول. من العناية الدورية إلى الصيانة الموسمية، تضمن فرقنا استمرار نمو وازدهار استثمارك.",
    },
    hero_image: "/images/services/landscape-maintenance.jpg",
    overview_image: "/images/services/maintenance-overview.jpg",
    included: [
      {
        icon: <LeafIcon />,
        title: { en: "Pruning & Trimming", ar: "التقليم والتشذيب" },
        desc: {
          en: "Regular pruning to keep plants healthy and well-shaped.",
          ar: "تقليم دوري للحفاظ على صحة النباتات وشكلها الجيد.",
        },
      },
      {
        icon: <GridIcon />,
        title: { en: "Lawn Care", ar: "العناية بالعشب" },
        desc: {
          en: "Mowing, aeration, and feeding for a lush, healthy lawn.",
          ar: "جز وتهوية وتغذية للحصول على عشب صحي وكثيف.",
        },
      },
      {
        icon: <DropIcon />,
        title: { en: "Irrigation Checks", ar: "فحص أنظمة الري" },
        desc: {
          en: "Routine inspection and adjustment of irrigation systems.",
          ar: "فحص وضبط دوري لأنظمة الري.",
        },
      },
      {
        icon: <ShieldIcon />,
        title: { en: "Pest & Disease Control", ar: "مكافحة الآفات والأمراض" },
        desc: {
          en: "Proactive monitoring and treatment to protect your plants.",
          ar: "مراقبة ومعالجة استباقية لحماية نباتاتك.",
        },
      },
      {
        icon: <SearchIcon />,
        title: { en: "Seasonal Inspections", ar: "فحوصات موسمية" },
        desc: {
          en: "Regular site visits to assess and adjust care plans.",
          ar: "زيارات دورية للموقع لتقييم وتعديل خطط العناية.",
        },
      },
      {
        icon: <PaletteIcon />,
        title: { en: "Seasonal Planting", ar: "الزراعة الموسمية" },
        desc: {
          en: "Refreshing planters and beds with seasonal color and variety.",
          ar: "تجديد الأحواض والمساحات بألوان وتنوع موسمي.",
        },
      },
    ],
    process: [
      { step: 1, title: { en: "Initial Assessment", ar: "التقييم الأولي" }, desc: { en: "We evaluate your landscape's current condition and needs.", ar: "نقيّم الحالة الراهنة لمناظرك الطبيعية واحتياجاتها." } },
      { step: 2, title: { en: "Care Plan", ar: "خطة العناية" }, desc: { en: "A tailored maintenance schedule built around your space.", ar: "جدول صيانة مخصص يناسب مساحتك." } },
      { step: 3, title: { en: "Routine Visits", ar: "زيارات دورية" }, desc: { en: "Scheduled visits for pruning, lawn care, and upkeep.", ar: "زيارات مجدولة للتقليم والعناية بالعشب والصيانة." } },
      { step: 4, title: { en: "Seasonal Adjustments", ar: "تعديلات موسمية" }, desc: { en: "Updating care based on seasonal needs and conditions.", ar: "تحديث العناية حسب الاحتياجات والظروف الموسمية." } },
      { step: 5, title: { en: "Issue Resolution", ar: "حل المشكلات" }, desc: { en: "Quick response to pests, disease, or irrigation issues.", ar: "استجابة سريعة لمشاكل الآفات أو الأمراض أو الري." } },
      { step: 6, title: { en: "Ongoing Reporting", ar: "تقارير مستمرة" }, desc: { en: "Regular updates on the health and progress of your landscape.", ar: "تحديثات دورية عن صحة وتقدم مناظرك الطبيعية." } },
    ],
    why: [
      { icon: <TeamIcon />, title: { en: "Dedicated Crews", ar: "فرق مخصصة" }, desc: { en: "Consistent teams familiar with your landscape's needs.", ar: "فرق ثابتة على دراية باحتياجات مناظرك الطبيعية." } },
      { icon: <LeafIcon />, title: { en: "Plant Health Focus", ar: "تركيز على صحة النباتات" },desc: { en: "Proactive care that prevents issues before they grow.", ar: "عناية استباقية تمنع تفاقم المشكلات." } },
      { icon: <ShieldIcon />, title: { en: "Reliable Schedules", ar: "جداول موثوقة" }, desc: { en: "Consistent visits you can count on, season after season.", ar: "زيارات منتظمة يمكنك الاعتماد عليها على مدار الفصول." } },
      { icon: <EcoIcon />, title: { en: "Eco-Friendly Practices", ar: "ممارسات صديقة للبيئة" }, desc: { en: "Sustainable products and methods that protect the environment.", ar: "منتجات وأساليب مستدامة تحافظ على البيئة." } },
    ],
    faq: [
      {
        q: { en: "How often will my landscape be visited?", ar: "كم مرة سيتم زيارة مناظري الطبيعية؟" },
        a: {
          en: "Visit frequency depends on your landscape's size and needs, typically ranging from weekly to monthly visits as agreed in your plan.",
          ar: "يعتمد تكرار الزيارات على حجم مناظرك الطبيعية واحتياجاتها، وتتراوح عادةً من أسبوعية إلى شهرية كما هو متفق عليه في خطتك.",
        },
      },
      {
        q: { en: "Can maintenance plans be customized?", ar: "هل يمكن تخصيص خطط الصيانة؟" },
        a: {
          en: "Yes, every maintenance plan is tailored to your landscape's specific plants, features, and your preferences.",
          ar: "نعم، يتم تخصيص كل خطة صيانة بحسب نباتات ومعالم مناظرك الطبيعية وتفضيلاتك.",
        },
      },
      {
        q: { en: "What happens if a plant gets damaged or sick?", ar: "ماذا يحدث إذا تعرضت نبتة للتلف أو المرض؟" },
        a: {
          en: "Our team identifies issues early and applies the appropriate treatment, or recommends replacement if needed.",
          ar: "يحدد فريقنا المشكلات مبكراً ويطبق العلاج المناسب، أو يوصي بالاستبدال عند الحاجة.",
        },
      },
    ],
  },

  /* ──────────────────────────────────────────────────────────────── */
  /*  4. Irrigation Design                                              */
  /* ──────────────────────────────────────────────────────────────── */
  {
    slug: "irrigation-design",
    title: { en: "Irrigation Design", ar: "تصميم أنظمة الري" },
    description: {
      en: "Smart, efficient irrigation systems engineered to keep your landscape healthy while conserving water.",
      ar: "أنظمة ري ذكية وفعّالة مصممة للحفاظ على صحة مناظرك الطبيعية مع توفير المياه.",
    },
    overview: {
      en: "Our Irrigation Design service engineers water-efficient systems tailored to your site's plants, soil, and climate. We design layouts that minimize waste while ensuring every zone gets exactly what it needs.",
      ar: "تصمم خدمة تصميم أنظمة الري أنظمة فعّالة في استخدام المياه ومُكيّفة مع نباتات موقعك وتربته ومناخه. نصمم تخطيطات تقلل من الهدر وتضمن حصول كل منطقة على ما تحتاجه بالضبط.",
    },
    hero_image: "/images/services/irrigation-design.jpg",
    overview_image: "/images/services/irrigation-overview.jpg",
    included: [
      {
        icon: <SearchIcon />,
        title: { en: "Water Audit", ar: "تدقيق استهلاك المياه" },
        desc: {
          en: "Assessing water source, pressure, and existing system performance.",
          ar: "تقييم مصدر المياه والضغط وأداء النظام الحالي.",
        },
      },
      {
        icon: <GridIcon />,
        title: { en: "Zoning Plans", ar: "تخطيط المناطق" },
        desc: {
          en: "Dividing your landscape into zones based on plant water needs.",
          ar: "تقسيم مناظرك الطبيعية إلى مناطق حسب احتياجات النباتات المائية.",
        },
      },
      {
        icon: <DropIcon />,
        title: { en: "Drip & Spray Systems", ar: "أنظمة التنقيط والرش" },
        desc: {
          en: "Selecting the right delivery method for each planting area.",
          ar: "اختيار طريقة التوصيل المناسبة لكل منطقة زراعة.",
        },
      },
      {
        icon: <CubeIcon />,
        title: { en: "Smart Controllers", ar: "وحدات تحكم ذكية" },
        desc: {
          en: "Automated scheduling that adapts to weather and season.",
          ar: "جدولة تلقائية تتكيف مع الطقس والموسم.",
        },
      },
      {
        icon: <PaletteIcon />,
        title: { en: "Pipe & Layout Plans", ar: "مخططات الأنابيب والتخطيط" },
        desc: {
          en: "Detailed technical drawings for accurate installation.",
          ar: "مخططات فنية تفصيلية لتركيب دقيق.",
        },
      },
      {
        icon: <ShieldIcon />,
        title: { en: "Water Conservation", ar: "ترشيد استهلاك المياه" },
        desc: {
          en: "Strategies and equipment that reduce water usage long-term.",
          ar: "استراتيجيات ومعدات تقلل استهلاك المياه على المدى الطويل.",
        },
      },
    ],
    process: [
      { step: 1, title: { en: "Site Survey", ar: "مسح الموقع" }, desc: { en: "Measuring water pressure, flow, and site layout.", ar: "قياس ضغط المياه والتدفق وتخطيط الموقع." } },
      { step: 2, title: { en: "Water Needs Analysis", ar: "تحليل الاحتياجات المائية" }, desc: { en: "Calculating requirements based on plants and soil type.", ar: "حساب الاحتياجات بناءً على النباتات ونوع التربة." } },
      { step: 3, title: { en: "System Design", ar: "تصميم النظام" }, desc: { en: "Creating zoning and pipe layout plans.", ar: "إنشاء مخططات تقسيم المناطق والأنابيب." } },
      { step: 4, title: { en: "Equipment Selection", ar: "اختيار المعدات" }, desc: { en: "Choosing controllers, valves, and emitters.", ar: "اختيار وحدات التحكم والصمامات والرشاشات." } },
      { step: 5, title: { en: "Plan Review", ar: "مراجعة الخطة" }, desc: { en: "Finalizing the design with you before implementation.", ar: "إنهاء التصميم معك قبل التنفيذ." } },
      { step: 6, title: { en: "Documentation Handover", ar: "تسليم الوثائق" }, desc: { en: "Delivering complete technical drawings and specifications.", ar: "تسليم المخططات الفنية الكاملة والمواصفات." } },
    ],
    why: [
      { icon: <DropIcon />, title: { en: "Water Efficient", ar: "كفاءة في استهلاك المياه" }, desc: { en: "Designs that minimize waste while maximizing plant health.", ar: "تصاميم تقلل الهدر وتعزز صحة النباتات." } },
      { icon: <CubeIcon />, title: { en: "Smart Technology", ar: "تقنية ذكية" }, desc: { en: "Modern controllers and sensors for automated precision.", ar: "وحدات تحكم وأجهزة استشعار حديثة لدقة تلقائية." } },
      { icon: <TeamIcon />, title: { en: "Specialist Engineers", ar: "مهندسون متخصصون" }, desc: { en: "Irrigation experts who understand UAE soil and climate.", ar: "خبراء ري على دراية بتربة ومناخ الإمارات." } },
      { icon: <EcoIcon />, title: { en: "Sustainability Focused", ar: "تركيز على الاستدامة" }, desc: { en: "Systems designed to support long-term water conservation goals.", ar: "أنظمة مصممة لدعم أهداف ترشيد المياه طويلة الأمد." } },
    ],
    faq: [
      {
        q: { en: "Can you upgrade an existing irrigation system?", ar: "هل يمكنكم تطوير نظام ري موجود؟" },
        a: {
          en: "Yes, we can assess your current system and design upgrades to improve efficiency and coverage.",
          ar: "نعم، يمكننا تقييم نظامك الحالي وتصميم تحسينات لزيادة الكفاءة والتغطية.",
        },
      },
      {
        q: { en: "Do smart controllers really save water?", ar: "هل توفر وحدات التحكم الذكية المياه فعلاً؟" },
        a: {
          en: "Yes, smart controllers adjust watering based on weather and soil moisture, often reducing water usage significantly compared to fixed schedules.",
          ar: "نعم، تضبط وحدات التحكم الذكية الري بناءً على الطقس ورطوبة التربة، وغالباً ما تقلل استهلاك المياه بشكل ملحوظ مقارنة بالجداول الثابتة.",
        },
      },
      {
        q: { en: "Is irrigation design included with landscape design?", ar: "هل يشمل تصميم المناظر الطبيعية تصميم الري؟" },
        a: {
          en: "Basic irrigation planning is part of our Landscape Design service, while this dedicated service offers in-depth engineering for larger or more complex sites.",
          ar: "يشمل تصميم المناظر الطبيعية تخطيطاً أساسياً للري، بينما تقدم هذه الخدمة المخصصة تصميماً هندسياً متعمقاً للمواقع الأكبر أو الأكثر تعقيداً.",
        },
      },
    ],
  },

  /* ──────────────────────────────────────────────────────────────── */
  /*  5. Plant Nursery / Supply                                         */
  /* ──────────────────────────────────────────────────────────────── */
  {
    slug: "plant-nursery",
    title: { en: "Plant Nursery & Supply", ar: "المشتل وتوريد النباتات" },
    description: {
      en: "A wide selection of healthy, climate-suited plants and trees, sourced and cared for to thrive in the UAE.",
      ar: "تشكيلة واسعة من النباتات والأشجار الصحية والمناسبة للمناخ، مصدرها وعناية بها لتزدهر في الإمارات.",
    },
    overview: {
      en: "Our Plant Nursery & Supply service provides a curated range of trees, shrubs, and plants — all grown and maintained to thrive in the UAE's climate. Whether for a small garden or a large-scale project, we supply quality stock backed by expert guidance.",
      ar: "تقدم خدمة المشتل وتوريد النباتات تشكيلة مختارة من الأشجار والشجيرات والنباتات — جميعها مزروعة ومُعتنى بها لتزدهر في مناخ الإمارات. سواء لحديقة صغيرة أو مشروع كبير، نوفر مخزوناً عالي الجودة مدعوماً بإرشاد متخصص.",
    },
    hero_image: "/images/services/plant-nursery.jpg",
    overview_image: "/images/services/nursery-overview.jpg",
    included: [
      {
        icon: <LeafIcon />,
        title: { en: "Tree & Shrub Selection", ar: "اختيار الأشجار والشجيرات" },
        desc: {
          en: "A wide variety of climate-suited trees and shrubs in stock.",
          ar: "تشكيلة واسعة من الأشجار والشجيرات المناسبة للمناخ متوفرة لدينا.",
        },
      },
      {
        icon: <PaletteIcon />,
        title: { en: "Seasonal Flowers", ar: "أزهار موسمية" },
        desc: {
          en: "Fresh seasonal color options for beds, planters, and borders.",
          ar: "خيارات ألوان موسمية طازجة للأحواض والمساحات والحدود.",
        },
      },
      {
        icon: <GridIcon />,
        title: { en: "Bulk Supply", ar: "التوريد بالجملة" },
        desc: {
          en: "Large-quantity supply for commercial and public projects.",
          ar: "توريد بكميات كبيرة للمشاريع التجارية والعامة.",
        },
      },
      {
        icon: <SearchIcon />,
        title: { en: "Plant Health Inspection", ar: "فحص صحة النباتات" },
        desc: {
          en: "Every plant is inspected for health before leaving the nursery.",
          ar: "يتم فحص كل نبتة للتأكد من صحتها قبل مغادرة المشتل.",
        },
      },
      {
        icon: <CubeIcon />,
        title: { en: "Delivery & Handling", ar: "التوصيل والمعالجة" },
        desc: {
          en: "Careful transport and handling to keep plants in top condition.",
          ar: "نقل ومعالجة بعناية للحفاظ على النباتات في أفضل حالاتها.",
        },
      },
      {
        icon: <ShieldIcon />,
        title: { en: "Expert Guidance", ar: "إرشاد متخصص" },
        desc: {
          en: "Advice on selection, placement, and care for long-term success.",
          ar: "نصائح حول الاختيار والوضع والعناية لنجاح طويل الأمد.",
        },
      },
    ],
    process: [
      { step: 1, title: { en: "Needs Discussion", ar: "مناقشة الاحتياجات" }, desc: { en: "We discuss your project's plant and quantity requirements.", ar: "نناقش متطلبات مشروعك من النباتات والكميات." } },
      { step: 2, title: { en: "Stock Selection", ar: "اختيار المخزون" }, desc: { en: "Choosing plants suited to your site and design.", ar: "اختيار النباتات المناسبة لموقعك وتصميمك." } },
      { step: 3, title: { en: "Quality Inspection", ar: "فحص الجودة" }, desc: { en: "Checking each plant for health and condition.", ar: "فحص كل نبتة للتأكد من صحتها وحالتها." } },
      { step: 4, title: { en: "Scheduling", ar: "الجدولة" }, desc: { en: "Planning delivery timing to match your project phase.", ar: "تخطيط توقيت التوصيل بما يتناسب مع مرحلة مشروعك." } },
      { step: 5, title: { en: "Delivery", ar: "التوصيل" }, desc: { en: "Safe transport of plants to your site.", ar: "نقل آمن للنباتات إلى موقعك." } },
      { step: 6, title: { en: "Aftercare Advice", ar: "نصائح العناية اللاحقة" }, desc: { en: "Guidance to help new plants establish successfully.", ar: "إرشادات لمساعدة النباتات الجديدة على التأصل بنجاح." } },
    ],
    why: [
      { icon: <LeafIcon />, title: { en: "Climate-Suited Stock", ar: "مخزون مناسب للمناخ" }, desc: { en: "Plants chosen and grown to thrive in UAE conditions.", ar: "نباتات مختارة ومزروعة لتزدهر في ظروف الإمارات." } },
      { icon: <ShieldIcon />, title: { en: "Healthy Guarantee", ar: "ضمان الصحة" }, desc: { en: "Every plant inspected before delivery for top condition.", ar: "كل نبتة مفحوصة قبل التوصيل لضمان أفضل حالة." } },
      { icon: <GridIcon />, title: { en: "Wide Selection", ar: "تشكيلة واسعة" }, desc: { en: "From small shrubs to mature trees, all in one place.", ar: "من الشجيرات الصغيرة إلى الأشجار الكبيرة، كل ذلك في مكان واحد." } },
      { icon: <TeamIcon />, title: { en: "Expert Advice", ar: "نصائح الخبراء" }, desc: { en: "Our team helps you choose the right plants for your space.", ar: "يساعدك فريقنا في اختيار النباتات المناسبة لمساحتك." } },
    ],
    faq: [
      {
        q: { en: "Can I visit the nursery to choose plants in person?", ar: "هل يمكنني زيارة المشتل لاختيار النباتات شخصياً؟" },
        a: {
          en: "Yes, visits can be arranged so you can see and select plants directly with guidance from our team.",
          ar: "نعم، يمكن ترتيب زيارات لرؤية واختيار النباتات مباشرة مع إرشاد من فريقنا.",
        },
      },
      {
        q: { en: "Do you supply for large commercial projects?", ar: "هل توردون للمشاريع التجارية الكبيرة؟" },
        a: {
          en: "Yes, we handle bulk orders for commercial, public, and developer projects of all sizes.",
          ar: "نعم، نتعامل مع الطلبات الكبيرة للمشاريع التجارية والعامة ومشاريع المطورين بجميع أحجامها.",
        },
      },
      {
        q: { en: "What if a plant doesn't survive after delivery?", ar: "ماذا لو لم تنجُ النبتة بعد التوصيل؟" },
        a: {
          en: "We provide aftercare guidance, and replacement options can be discussed depending on the cause and terms agreed at purchase.",
          ar: "نقدم إرشادات للعناية اللاحقة، ويمكن مناقشة خيارات الاستبدال حسب السبب والشروط المتفق عليها عند الشراء.",
        },
      },
    ],
  },
];

/* ------------------------------------------------------------------ */
/*  Page                                                                */
/* ------------------------------------------------------------------ */
export default function ServiceDetailPage({ params }: PageProps) {
  const { locale } = useLocaleContext();
  const isRTL = locale === "ar";
  const t = T[locale];

  const service = SERVICES.find((s) => s.slug === params.slug);
  if (!service) notFound();

  // Featured projects — static placeholders until API integration
  const projects = [
    { id: 1, slug: "al-barsha-villa-garden", thumbnail: "/images/projects/project-1.jpg", title_en: "Project 1" },
    { id: 2, slug: "downtown-corporate-plaza", thumbnail: "/images/projects/project-2.jpg", title_en: "Project 2" },
    { id: 3, slug: "jumeirah-rooftop-terrace", thumbnail: "/images/projects/project-3.jpg", title_en: "Project 3" },
    { id: 4, slug: "business-bay-hotel-grounds", thumbnail: "/images/projects/project-4.jpg", title_en: "Project 4" },
  ];

  return (
    <div dir={isRTL ? "rtl" : "ltr"}>
      {/* ── BREADCRUMB ── */}
      <nav className="bg-white border-b border-sand-100 py-3">
        <Container>
          <ol className={cn("flex items-center gap-2 text-xs text-charcoal-400 font-body", isRTL && "flex-row-reverse")}>
            <li><Link href="/" className="hover:text-forest-700 transition-colors">{t.breadcrumbHome}</Link></li>
            <li className="opacity-40">{isRTL ? "‹" : "›"}</li>
            <li><Link href="/services" className="hover:text-forest-700 transition-colors">{t.breadcrumbServices}</Link></li>
            <li className="opacity-40">{isRTL ? "‹" : "›"}</li>
            <li className="text-charcoal-700 font-medium">{service.title[locale]}</li>
          </ol>
        </Container>
      </nav>

      {/* ── HERO ── */}
      <section className="relative min-h-[520px] md:min-h-[600px] flex items-end overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src={service.hero_image}
            alt={service.title[locale]}
            fill
            priority
            className="object-cover"
          />
          <div className={cn(
            "absolute inset-0 bg-gradient-to-r from-black/70 via-black/40 to-transparent",
            isRTL && "bg-gradient-to-l"
          )} />
        </div>

        <Container className="relative z-10 pb-16 pt-40 md:pt-48">
          <div className={cn("max-w-xl", isRTL && "text-right ml-auto")}>
            <h1 className="font-display text-5xl md:text-7xl text-white leading-tight">
              {service.title[locale]}
            </h1>

            <div className={cn("w-14 h-0.5 bg-forest-400 my-6", isRTL && "mr-0 ml-auto")} />

            <p className="font-body text-base md:text-lg text-white/80 leading-relaxed">
              {service.description[locale]}
            </p>

            <div className="mt-8">
              <Button href="/contact" size="lg">
                {t.cta}
              </Button>
            </div>
          </div>
        </Container>
      </section>

      {/* ── OVERVIEW ── */}
      <section className="bg-white py-20 md:py-28">
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className={cn(isRTL && "lg:order-2 text-right")}>
              <h2 className="font-display text-4xl md:text-5xl text-charcoal-900 mb-4">
                {t.overview}
              </h2>
              <div className={cn("w-10 h-0.5 bg-forest-600 mb-6", isRTL && "mr-0 ml-auto")} />
              <p className="font-body text-base text-charcoal-500 leading-relaxed">
                {service.overview[locale]}
              </p>
            </div>

            <div className={cn("relative aspect-[4/3] rounded-2xl overflow-hidden shadow-xl", isRTL && "lg:order-1")}>
              <Image
                src={service.overview_image}
                alt={t.overview}
                fill
                className="object-cover"
              />
            </div>
          </div>
        </Container>
      </section>

      {/* ── WHAT'S INCLUDED ── */}
      <section className="bg-sand-50 py-20 md:py-28 border-y border-sand-200">
        <Container>
          <div className="text-center mb-14">
            <h2 className="font-display text-4xl md:text-5xl text-charcoal-900">
              {t.whatsIncluded}
            </h2>
            <div className="w-10 h-0.5 bg-forest-600 mx-auto mt-4" />
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
            {service.included.map((item, i) => (
              <div
                key={i}
                className="flex flex-col items-center text-center gap-4 bg-white border border-sand-200 rounded-2xl px-4 py-8 hover:border-forest-300 hover:shadow-md transition-all duration-300"
              >
                <div className="w-12 h-12 flex items-center justify-center text-forest-700">
                  {item.icon}
                </div>
                <h3 className="font-semibold text-sm text-charcoal-900 leading-snug">
                  {item.title[locale]}
                </h3>
                <p className="text-xs text-charcoal-500 leading-relaxed">
                  {item.desc[locale]}
                </p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* ── OUR PROCESS ── */}
      <section className="bg-white py-20 md:py-28">
        <Container>
          <div className="text-center mb-16">
            <h2 className="font-display text-4xl md:text-5xl text-charcoal-900">
              {t.ourProcess}
            </h2>
            <div className="w-10 h-0.5 bg-forest-600 mx-auto mt-4" />
          </div>

          {/* Desktop: horizontal timeline */}
          <div className="hidden md:block">
            <div className="relative flex items-start justify-between gap-0">
              <div className="absolute top-5 left-[calc(100%/12)] right-[calc(100%/12)] h-0.5 bg-forest-200 z-0" />

              {service.process.map((step, i) => (
                <div key={i} className="relative z-10 flex flex-col items-center text-center flex-1 px-2">
                  <div className="w-10 h-10 rounded-full bg-forest-700 text-white flex items-center justify-center font-display text-sm font-semibold mb-5 shadow-md">
                    {step.step}
                  </div>
                  <h3 className="font-semibold text-sm text-charcoal-900 mb-2 leading-snug">
                    {step.title[locale]}
                  </h3>
                  <p className="text-xs text-charcoal-500 leading-relaxed max-w-[120px]">
                    {step.desc[locale]}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Mobile: vertical list */}
          <div className="md:hidden flex flex-col gap-6">
            {service.process.map((step, i) => (
              <div key={i} className={cn("flex items-start gap-4", isRTL && "flex-row-reverse text-right")}>
                <div className="w-9 h-9 rounded-full bg-forest-700 text-white flex items-center justify-center font-display text-sm font-semibold shrink-0 mt-0.5">
                  {step.step}
                </div>
                <div>
                  <h3 className="font-semibold text-sm text-charcoal-900 mb-1">{step.title[locale]}</h3>
                  <p className="text-xs text-charcoal-500 leading-relaxed">{step.desc[locale]}</p>
                </div>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* ── WHY CHOOSE AXON ── */}
      <section className="bg-sand-50 py-20 md:py-28 border-y border-sand-200">
        <Container>
          <div className="text-center mb-14">
            <h2 className="font-display text-4xl md:text-5xl text-charcoal-900">
              {t.whyAxon}
            </h2>
            <div className="w-10 h-0.5 bg-forest-600 mx-auto mt-4" />
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            {service.why.map((item, i) => (
              <div
                key={i}
                className="flex flex-col items-center text-center gap-4 bg-white border border-sand-200 rounded-2xl px-6 py-10 hover:border-forest-300 hover:shadow-md transition-all duration-300"
              >
                <div className="w-14 h-14 flex items-center justify-center text-forest-700">
                  {item.icon}
                </div>
                <h3 className="font-semibold text-sm text-charcoal-900">{item.title[locale]}</h3>
                <p className="text-xs text-charcoal-500 leading-relaxed">{item.desc[locale]}</p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* ── FEATURED DESIGN WORKS ── */}
      {projects.length > 0 && (
        <section className="bg-white py-20 md:py-28">
          <Container>
            <div className="text-center mb-14">
              <h2 className="font-display text-4xl md:text-5xl text-charcoal-900">
                {t.featuredWorks}
              </h2>
              <div className="w-10 h-0.5 bg-forest-600 mx-auto mt-4" />
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {projects.map((project) => (
                <Link
                  key={project.id}
                  href={`/projects/${project.slug}`}
                  className="group relative aspect-square rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-shadow duration-300"
                >
                  <Image
                    src={project.thumbnail}
                    alt={project.title_en}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-colors duration-300" />
                </Link>
              ))}
            </div>
          </Container>
        </section>
      )}

      {/* ── FAQ ── */}
      <section className="bg-sand-50 py-20 md:py-28 border-t border-sand-200">
        <Container size="md">
          <div className="text-center mb-14">
            <h2 className="font-display text-4xl md:text-5xl text-charcoal-900">
              {t.faq}
            </h2>
            <div className="w-10 h-0.5 bg-forest-600 mx-auto mt-4" />
          </div>

          <ServiceFAQ
            items={service.faq.map((item) => ({
              q: item.q[locale],
              a: item.a[locale],
            }))}
          />
        </Container>
      </section>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  SVG Icons                                                           */
/* ------------------------------------------------------------------ */
function SearchIcon() {
  return (
    <svg className="w-8 h-8" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
    </svg>
  );
}
function GridIcon() {
  return (
    <svg className="w-8 h-8" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6A2.25 2.25 0 0 1 6 3.75h2.25A2.25 2.25 0 0 1 10.5 6v2.25a2.25 2.25 0 0 1-2.25 2.25H6a2.25 2.25 0 0 1-2.25-2.25V6ZM3.75 15.75A2.25 2.25 0 0 1 6 13.5h2.25a2.25 2.25 0 0 1 2.25 2.25V18a2.25 2.25 0 0 1-2.25 2.25H6A2.25 2.25 0 0 1 3.75 18v-2.25ZM13.5 6a2.25 2.25 0 0 1 2.25-2.25H18A2.25 2.25 0 0 1 20.25 6v2.25A2.25 2.25 0 0 1 18 10.5h-2.25a2.25 2.25 0 0 1-2.25-2.25V6ZM13.5 15.75a2.25 2.25 0 0 1 2.25-2.25H18a2.25 2.25 0 0 1 2.25 2.25V18A2.25 2.25 0 0 1 18 20.25h-2.25A2.25 2.25 0 0 1 13.5 18v-2.25Z" />
    </svg>
  );
}
function LeafIcon() {
  return (
    <svg className="w-8 h-8" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 18.75a6 6 0 0 0 6-6v-1.5m-6 7.5a6 6 0 0 1-6-6v-1.5m6 7.5v3.75m-3.75 0h7.5M12 15.75a3 3 0 0 1-3-3V4.5a3 3 0 1 1 6 0v8.25a3 3 0 0 1-3 3Z" />
    </svg>
  );
}
function DropIcon() {
  return (
    <svg className="w-8 h-8" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" d="M15.362 5.214A8.252 8.252 0 0 1 12 21 8.25 8.25 0 0 1 6.038 7.047 8.287 8.287 0 0 0 9 9.601a8.983 8.983 0 0 1 3.361-6.867 8.21 8.21 0 0 0 3 2.48Z" />
    </svg>
  );
}
function PaletteIcon() {
  return (
    <svg className="w-8 h-8" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" d="M4.098 19.902a3.75 3.75 0 0 0 5.304 0l6.401-6.402M6.75 21A3.75 3.75 0 0 1 3 17.25V4.125C3 3.504 3.504 3 4.125 3h5.25c.621 0 1.125.504 1.125 1.125v4.072M6.75 21a3.75 3.75 0 0 0 3.75-3.75V8.197M6.75 21h13.125c.621 0 1.125-.504 1.125-1.125v-5.25c0-.621-.504-1.125-1.125-1.125h-4.072M10.5 8.197l2.88-2.88c.438-.439 1.15-.439 1.59 0l3.712 3.713c.44.44.44 1.152 0 1.59l-2.879 2.88M6.75 17.25h.008v.008H6.75v-.008Z" />
    </svg>
  );
}
function CubeIcon() {
  return (
    <svg className="w-8 h-8" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" d="m21 7.5-9-5.25L3 7.5m18 0-9 5.25m9-5.25v9l-9 5.25M3 7.5l9 5.25M3 7.5v9l9 5.25m0-9v9" />
    </svg>
  );
}
function TeamIcon() {
  return (
    <svg className="w-10 h-10" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" d="M18 18.72a9.094 9.094 0 0 0 3.741-.479 3 3 0 0 0-4.682-2.72m.94 3.198.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0 1 12 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 0 1 6 18.719m12 0a5.971 5.971 0 0 0-.941-3.197m0 0A5.995 5.995 0 0 0 12 12.75a5.995 5.995 0 0 0-5.058 2.772m0 0a3 3 0 0 0-4.681 2.72 8.986 8.986 0 0 0 3.74.477m.94-3.197a5.971 5.971 0 0 0-.94 3.197M15 6.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Zm6 3a2.25 2.25 0 1 1-4.5 0 2.25 2.25 0 0 1 4.5 0Zm-13.5 0a2.25 2.25 0 1 1-4.5 0 2.25 2.25 0 0 1 4.5 0Z" />
    </svg>
  );
}
function ShieldIcon() {
  return (
    <svg className="w-10 h-10" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75 11.25 15 15 9.75m-3-7.036A11.959 11.959 0 0 1 3.598 6 11.99 11.99 0 0 0 3 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285Z" />
    </svg>
  );
}
function EcoIcon() {
  return (
    <svg className="w-10 h-10" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 21a9.004 9.004 0 0 0 8.716-6.747M12 21a9.004 9.004 0 0 1-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 0 1 7.843 4.582M12 3a8.997 8.997 0 0 0-7.843 4.582m15.686 0A11.953 11.953 0 0 1 12 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0 1 21 12c0 .778-.099 1.533-.284 2.253" />
    </svg>
  );
}