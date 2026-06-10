// ─── Locale ────────────────────────────────────────────────────────────────

export type Locale = "en" | "ar";

/**
 * All bilingual content fields follow this pattern.
 * Use `getLocalizedField(item, "title", locale)` from lib/i18n.ts.
 */
export interface Bilingual {
  title_en: string;
  title_ar: string;
  description_en: string;
  description_ar: string;
}

// ─── API Envelope ──────────────────────────────────────────────────────────

export interface ApiResponse<T> {
  data: T;
  message?: string;
  success: boolean;
}

export interface PaginatedResponse<T> {
  data: T[];
  total: number;
  page: number;
  per_page: number;
  last_page: number;
}

// ─── Media ─────────────────────────────────────────────────────────────────

export interface MediaItem {
  id: number;
  url: string;
  alt_en: string;
  alt_ar: string;
  width: number;
  height: number;
}

// ─── Navigation ─────────────────────────────────────────────────────────────

export interface NavLink {
  label_en: string;
  label_ar: string;
  href: string;
  children?: NavLink[];
}
