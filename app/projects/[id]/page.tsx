import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { getProjectById, getAllProjectIds } from "@/services/projectsApi";
import { buildMetadata } from "@/lib/metadata";
import { ApiError } from "@/lib/api";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { Button } from "@/components/ui/Button";
import { PageHeader } from "@/components/layout/PageHeader";

interface ProjectPageProps {
  params: { id: string };
}

// ─── Static Params ───────────────────────────────────────────────────────────

export async function generateStaticParams(): Promise<{ id: string }[]> {
  try {
    const ids = await getAllProjectIds();
    return ids.map((id) => ({ id: String(id) }));
  } catch {
    return [];
  }
}

// ─── Metadata ────────────────────────────────────────────────────────────────

export async function generateMetadata({ params }: ProjectPageProps): Promise<Metadata> {
  const id = parseInt(params.id, 10);
  if (isNaN(id)) return {};

  try {
    const project = await getProjectById(id);
    return buildMetadata({
      title: project.title_en,
      description: project.description_en,
      path: `/projects/${id}`,
      ogImage: project.cover_image?.url,
    });
  } catch {
    return buildMetadata({
      title: "Project",
      description: "AXON Landscape project.",
      path: `/projects/${params.id}`,
    });
  }
}

// ─── Page ────────────────────────────────────────────────────────────────────

export default async function ProjectDetailPage({ params }: ProjectPageProps) {
  const id = parseInt(params.id, 10);
  if (isNaN(id)) notFound();

  let project;
  try {
    project = await getProjectById(id);
  } catch (err) {
    if (err instanceof ApiError && err.status === 404) notFound();
    throw err;
  }

  const specs: { label: string; value: string | number | undefined }[] = [
    { label: "Location",  value: project.location_en },
    { label: "Area",      value: project.area },
    { label: "Year",      value: project.year },
    { label: "Client",    value: project.client_en },
  ].filter((s) => s.value);

  return (
    <>
      <PageHeader
        label="Projects"
        title={project.title_en}
        subtitle={project.location_en}
      />

      <Section spacing="lg">
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-16">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-10">
              {/* Cover Image */}
              {project.cover_image?.url && (
                <div className="relative aspect-wide overflow-hidden bg-sand-100 border border-sand-200">
                  <Image
                    src={project.cover_image.url}
                    alt={project.cover_image.alt_en}
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
                  Project Overview
                </span>
                <div className="font-body text-base text-charcoal-600 leading-relaxed space-y-4">
                  <p>{project.description_en}</p>
                </div>
              </div>

              {/* Gallery */}
              {project.gallery && project.gallery.length > 0 && (
                <div>
                  <span className="inline-block mb-6 text-xs font-body font-semibold tracking-[0.2em] uppercase text-forest-600">
                    Gallery
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
                          alt={img.alt_en}
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

            {/* Sidebar */}
            <aside className="lg:col-span-1 space-y-8">
              {/* Project Specs */}
              <div className="border border-sand-200 p-8">
                <h3 className="font-body text-xs font-semibold tracking-[0.2em] uppercase text-charcoal-400 mb-6">
                  Project Details
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
                  Interested in a similar project?
                </h3>
                <p className="font-body text-sm text-forest-200 leading-relaxed">
                  Tell us about your vision and we&apos;ll create a tailored proposal for you.
                </p>
                <Button href="/contact" variant="secondary" size="md" className="w-full justify-center">
                  Get in Touch
                </Button>
              </div>

              {/* Back link */}
              <Link
                href="/projects"
                className="inline-flex items-center gap-2 font-body text-sm text-charcoal-500 hover:text-forest-700 transition-colors"
              >
                ← Back to Projects
              </Link>
            </aside>
          </div>
        </Container>
      </Section>
    </>
  );
}
