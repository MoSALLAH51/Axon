import Image from "next/image";
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
    <a href={`/projects/${project.id}`} className="block">
      <div
        className={cn(
          "group relative overflow-hidden aspect-portrait bg-charcoal-900",
          className,
        )}
      >
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

        <div className="absolute inset-0 bg-gradient-to-t from-charcoal-950/90 via-charcoal-950/20 to-transparent" />

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
      </div>
    </a>
  );
}