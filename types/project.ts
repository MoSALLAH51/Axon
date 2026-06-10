import type { Bilingual, MediaItem } from "./common";

export interface Project extends Bilingual {
  id: number;
  location_en: string;
  location_ar: string;
  area: string;          // e.g. "5,200 sqm"
  year: number;
  client_en?: string;
  client_ar?: string;
  cover_image: MediaItem;
  gallery: MediaItem[];
  service_id?: number;   // related service
  featured: boolean;
  created_at: string;
  updated_at: string;
}

export interface ProjectListItem
  extends Pick<Project, "id" | "title_en" | "title_ar" | "location_en" | "location_ar" | "year" | "cover_image" | "featured"> {}
