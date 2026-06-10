import type { Bilingual, MediaItem } from "./common";

export interface CompanyProfile extends Bilingual {
  id: number;
  vision_en: string;
  vision_ar: string;
  mission_en: string;
  mission_ar: string;
  founded_year: number;
  team_size: number;
  hero_image: MediaItem;
  updated_at: string;
}

export interface License extends Bilingual {
  id: number;
  issuer_en: string;
  issuer_ar: string;
  license_number: string;
  issue_date: string;
  expiry_date: string;
  image?: MediaItem;
}

export interface Certificate extends Bilingual {
  id: number;
  issuer_en: string;
  issuer_ar: string;
  issued_date: string;
  image?: MediaItem;
}
