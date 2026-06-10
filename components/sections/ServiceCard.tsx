// components/sections/ServiceCard.tsx
import Image from "next/image";
import Link from "next/link";
import type { ServiceListItem } from "@/types/service"; // adjust path as needed

export function ServiceCard({ service }: { service: ServiceListItem }) {
  return (
    <Link
      href={`/services/${service.slug}`}
      className="group relative flex flex-col overflow-hidden rounded-2xl bg-white border border-sand-200 hover:border-forest-300 hover:shadow-xl transition-all duration-300"
    >
      <div className="relative aspect-[4/3] overflow-hidden">
        <Image
          src={service.thumbnail.url}
          alt={(service.thumbnail as any).alt ?? service.title_en}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-105"
        />
      </div>
      <div className="flex flex-col gap-2 p-6 flex-1">
        <h3 className="font-semibold text-charcoal-900 group-hover:text-forest-700 transition-colors">
          {service.title_en}
        </h3>
        <p className="text-charcoal-500 text-sm leading-relaxed flex-1 line-clamp-3">
          {service.description_en}
        </p>
        <span className="inline-flex items-center gap-1 mt-3 text-sm font-semibold text-forest-700 group-hover:gap-2 transition-all">
          Read More →
        </span>
      </div>
    </Link>
  );
}