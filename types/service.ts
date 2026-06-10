// types/service.ts
import type { Bilingual, MediaItem } from "./common";

export interface Service extends Bilingual {
  id: string;
  slug: string;
  thumbnail: MediaItem;
  gallery?: MediaItem[];
  featured: boolean;
  sort_order: number;
  created_at: string;
  updated_at: string;
}

export interface ServiceListItem
  extends Pick<Service, "id" | "slug" | "title_en" | "title_ar" | "description_en" | "description_ar" | "thumbnail" | "featured"> {}

// Add this — the full detail shape returned by getServiceBySlug
export interface ServiceDetail extends Service {
  hero_image: MediaItem;
  overview_en: string;
  overview_ar: string;
  included: { icon?: string; title_en: string; title_ar: string; description_en: string; description_ar: string }[];
  process: { step: number; title_en: string; title_ar: string; description_en: string; description_ar: string }[];
  why_axon: { icon?: string; point_en: string; point_ar: string }[];
  featured_works: { id: string; title_en: string; image: MediaItem; location?: string }[];
  faqs?: { question_en: string; question_ar: string; answer_en: string; answer_ar: string }[];
}