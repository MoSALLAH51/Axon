// app/services/[slug]/page.tsx
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getServiceBySlug } from "@/services/servicesApi";
import { getFeaturedProjects } from "@/services/projectsApi";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { ServiceFAQ } from "@/components/sections/ServiceFAQ";

/* ------------------------------------------------------------------ */
/*  Types                                                               */
/* ------------------------------------------------------------------ */
interface PageProps {
  params: { slug: string };
}

/* ------------------------------------------------------------------ */
/*  Metadata                                                            */
/* ------------------------------------------------------------------ */
export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  try {
    const service = await getServiceBySlug(params.slug);
    return {
      title: `${service.title_en} | AXON Landscape`,
      description: service.description_en,
    };
  } catch {
    return { title: "Service | AXON Landscape" };
  }
}

/* ------------------------------------------------------------------ */
/*  Static fallback data (used when API fields are missing)            */
/* ------------------------------------------------------------------ */
const FALLBACK_INCLUDED = [
  { icon: <SearchIcon />,   title: "Site Analysis",        desc: "Understanding your site's conditions, opportunities, and constraints." },
  { icon: <GridIcon />,     title: "Space Planning",       desc: "Optimized layouts that enhance flow, function, and experience." },
  { icon: <LeafIcon />,     title: "Plant Selection",      desc: "Curated plant schemes suited to climate, style, and purpose." },
  { icon: <DropIcon />,     title: "Irrigation & Lighting",desc: "Efficient irrigation and lighting plans for beauty and performance." },
  { icon: <PaletteIcon />,  title: "Material Palette",     desc: "Premium materials selected for durability and visual harmony." },
  { icon: <CubeIcon />,     title: "3D Visualization",     desc: "Realistic 3D views that bring your future landscape to life." },
];

const FALLBACK_PROCESS = [
  { step: 1, title: "Consultation",        desc: "We listen to your vision, needs, and goals." },
  { step: 2, title: "Site Analysis",       desc: "We study your site and gather key insights." },
  { step: 3, title: "Concept Development", desc: "Creative concepts that capture your vision." },
  { step: 4, title: "Detailed Planning",   desc: "Comprehensive plans, selections, and specifications." },
  { step: 5, title: "Review & Approval",   desc: "We refine the design with your feedback." },
  { step: 6, title: "Final Delivery",      desc: "Final plans delivered for seamless execution." },
];

const FALLBACK_WHY = [
  { icon: <TeamIcon />,      title: "Experienced Team",    desc: "Skilled designers and horticulturists with diverse expertise." },
  { icon: <LeafIcon />,      title: "Tailored Solutions",  desc: "Custom designs crafted around your lifestyle and site." },
  { icon: <ShieldIcon />,    title: "Quality Standards",   desc: "Premium materials and meticulous attention to detail." },
  { icon: <EcoIcon />,       title: "Sustainable Design",  desc: "Environmentally responsible solutions that last." },
];

const FALLBACK_FAQ = [
  { q: "What does the Landscape Design service include?",   a: "Our service covers site analysis, space planning, plant selection, irrigation and lighting design, material palette curation, and 3D visualization — everything from concept to final delivery documents." },
  { q: "How long does the design process take?",            a: "Timelines vary by project scale. A typical residential design takes 4–8 weeks from consultation to final delivery." },
  { q: "Can you work with existing landscapes?",            a: "Absolutely. We assess your current landscape and propose designs that enhance or transform what's already there." },
];

/* ------------------------------------------------------------------ */
/*  Page                                                                */
/* ------------------------------------------------------------------ */
export default async function ServiceDetailPage({ params }: PageProps) {
  let service: any = null;
  try {
    service = await getServiceBySlug(params.slug);
  } catch {
    notFound();
  }

  let projects: any[] = [];
  try {
    const all = await getFeaturedProjects();
    projects = all.slice(0, 4);
  } catch {}

  const included = service?.included ?? FALLBACK_INCLUDED;
  const process  = service?.process  ?? FALLBACK_PROCESS;
  const why      = service?.why      ?? FALLBACK_WHY;
  const faq      = service?.faq      ?? FALLBACK_FAQ;
  const heroImage     = service?.hero_image?.url     ?? "/images/services/landscape-design.jpg";
  const overviewImage = service?.overview_image?.url ?? "/images/services/overview.jpg";

  return (
    <>
      {/* ── BREADCRUMB ── */}
      <nav className="bg-white border-b border-sand-100 py-3">
        <Container>
          <ol className="flex items-center gap-2 text-xs text-charcoal-400 font-body">
            <li><Link href="/" className="hover:text-forest-700 transition-colors">Home</Link></li>
            <li className="opacity-40">›</li>
            <li><Link href="/services" className="hover:text-forest-700 transition-colors">Services</Link></li>
            <li className="opacity-40">›</li>
            <li className="text-charcoal-700 font-medium">{service?.title_en ?? "Landscape Design"}</li>
          </ol>
        </Container>
      </nav>

      {/* ── HERO ── */}
      <section className="relative min-h-[520px] md:min-h-[600px] flex items-end overflow-hidden">
        {/* Background image */}
        <div className="absolute inset-0">
          <Image
            src={heroImage}
            alt={service?.title_en ?? "Landscape Design"}
            fill
            priority
            className="object-cover"
          />
          {/* Gradient overlay — left heavy so text is readable */}
          <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/40 to-transparent" />
        </div>

        <Container className="relative z-10 pb-16 pt-40 md:pt-48">
          <div className="max-w-xl">
            <h1 className="font-display text-5xl md:text-7xl text-white leading-tight">
              {service?.title_en ?? "Landscape Design"}
            </h1>

            {/* Decorative line */}
            <div className="w-14 h-0.5 bg-forest-400 my-6" />

            <p className="font-body text-base md:text-lg text-white/80 leading-relaxed">
              {service?.description_en ?? "We create functional, elegant outdoor spaces that reflect your lifestyle and elevate every moment outdoors."}
            </p>

            <div className="mt-8">
              <Button href="/contact" size="lg">
                Request Consultation →
              </Button>
            </div>
          </div>
        </Container>
      </section>

      {/* ── OVERVIEW ── */}
      <section className="bg-white py-20 md:py-28">
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Text */}
            <div>
              <h2 className="font-display text-4xl md:text-5xl text-charcoal-900 mb-4">
                Overview
              </h2>
              <div className="w-10 h-0.5 bg-forest-600 mb-6" />
              <p className="font-body text-base text-charcoal-500 leading-relaxed">
                {service?.overview_en ?? "Our Landscape Design service delivers thoughtfully crafted outdoor environments that balance beauty, functionality, and sustainability. From concept to detailed plans, we design spaces that enhance well-being and add lasting value."}
              </p>
            </div>

            {/* Image */}
            <div className="relative aspect-[4/3] rounded-2xl overflow-hidden shadow-xl">
              <Image
                src={overviewImage}
                alt="Overview"
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
              What's Included
            </h2>
            <div className="w-10 h-0.5 bg-forest-600 mx-auto mt-4" />
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
            {included.map((item: any, i: number) => (
              <div
                key={i}
                className="flex flex-col items-center text-center gap-4 bg-white border border-sand-200 rounded-2xl px-4 py-8 hover:border-forest-300 hover:shadow-md transition-all duration-300"
              >
                <div className="w-12 h-12 flex items-center justify-center text-forest-700">
                  {item.icon}
                </div>
                <h3 className="font-semibold text-sm text-charcoal-900 leading-snug">
                  {item.title}
                </h3>
                <p className="text-xs text-charcoal-500 leading-relaxed">
                  {item.desc}
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
              Our Process
            </h2>
            <div className="w-10 h-0.5 bg-forest-600 mx-auto mt-4" />
          </div>

          {/* Desktop: horizontal timeline */}
          <div className="hidden md:block">
            {/* Connector line */}
            <div className="relative flex items-start justify-between gap-0">
              {/* Background line */}
              <div className="absolute top-5 left-[calc(100%/12)] right-[calc(100%/12)] h-0.5 bg-forest-200 z-0" />

              {process.map((step: any, i: number) => (
                <div key={i} className="relative z-10 flex flex-col items-center text-center flex-1 px-2">
                  {/* Circle */}
                  <div className="w-10 h-10 rounded-full bg-forest-700 text-white flex items-center justify-center font-display text-sm font-semibold mb-5 shadow-md">
                    {step.step}
                  </div>
                  <h3 className="font-semibold text-sm text-charcoal-900 mb-2 leading-snug">
                    {step.title}
                  </h3>
                  <p className="text-xs text-charcoal-500 leading-relaxed max-w-[120px]">
                    {step.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Mobile: vertical list */}
          <div className="md:hidden flex flex-col gap-6">
            {process.map((step: any, i: number) => (
              <div key={i} className="flex items-start gap-4">
                <div className="w-9 h-9 rounded-full bg-forest-700 text-white flex items-center justify-center font-display text-sm font-semibold shrink-0 mt-0.5">
                  {step.step}
                </div>
                <div>
                  <h3 className="font-semibold text-sm text-charcoal-900 mb-1">{step.title}</h3>
                  <p className="text-xs text-charcoal-500 leading-relaxed">{step.desc}</p>
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
              Why Choose Axon
            </h2>
            <div className="w-10 h-0.5 bg-forest-600 mx-auto mt-4" />
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            {why.map((item: any, i: number) => (
              <div
                key={i}
                className="flex flex-col items-center text-center gap-4 bg-white border border-sand-200 rounded-2xl px-6 py-10 hover:border-forest-300 hover:shadow-md transition-all duration-300"
              >
                <div className="w-14 h-14 flex items-center justify-center text-forest-700">
                  {item.icon}
                </div>
                <h3 className="font-semibold text-sm text-charcoal-900">{item.title}</h3>
                <p className="text-xs text-charcoal-500 leading-relaxed">{item.desc}</p>
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
                Featured Design Works
              </h2>
              <div className="w-10 h-0.5 bg-forest-600 mx-auto mt-4" />
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {projects.map((project: any) => (
                <Link
                  key={project.id}
                  href={`/projects/${project.slug}`}
                  className="group relative aspect-square rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-shadow duration-300"
                >
                  <Image
                    src={project.thumbnail?.url ?? "/images/projects/placeholder.jpg"}
                    alt={project.title_en ?? "Project"}
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
              FAQ
            </h2>
            <div className="w-10 h-0.5 bg-forest-600 mx-auto mt-4" />
          </div>

          <ServiceFAQ items={faq} />
        </Container>
      </section>
    </>
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