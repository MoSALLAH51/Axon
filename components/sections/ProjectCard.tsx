import Image from "next/image";
import Link from "next/link";
import type { ProjectListItem } from "@/types";
import { cn } from "@/lib/utils";

interface ProjectCardProps {
  project: ProjectListItem;
  locale?: "en" | "ar";
  className?: string;
}

export function ProjectCard({ project, locale = "en", className }: ProjectCardProps) {
  const title    = locale === "ar" ? project.title_ar    : project.title_en;
  const location = locale === "ar" ? project.location_ar : project.location_en;

  return (
    <Link
      href={`/projects/${project.id}`}
      className={cn(
        "group relative block overflow-hidden aspect-portrait bg-charcoal-900",
        className,
      )}
    >
      {/* Image */}
      {project.cover_image?.url ? (
        <Image
          src={project.cover_image.url}
          alt={locale === "ar" ? project.cover_image.alt_ar : project.cover_image.alt_en}
          fill
          className="object-cover transition-transform duration-700 group-hover:scale-105"
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
        />
      ) : (
        <div className="absolute inset-0 bg-forest-900" />
      )}

      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-charcoal-950/90 via-charcoal-950/20 to-transparent" />

      {/* Content */}
      <div className="absolute bottom-0 left-0 right-0 p-6">
        {project.year && (
          <span className="block text-[10px] font-body font-semibold tracking-[0.2em] uppercase text-sand-300 mb-2">
            {project.year}
          </span>
        )}
        <h3 className="font-display text-xl text-sand-50 leading-tight">{title}</h3>
        {location && (
          <p className="mt-1 font-body text-xs text-sand-400">{location}</p>
        )}
      </div>
    </Link>
  );
}
