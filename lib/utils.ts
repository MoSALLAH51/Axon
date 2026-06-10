import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * Merge Tailwind classes safely, resolving conflicts.
 */
export function cn(...inputs: ClassValue[]): string {
  return twMerge(clsx(inputs));
}

/**
 * Truncate a string to a max length, appending an ellipsis.
 */
export function truncate(str: string, maxLength: number): string {
  if (str.length <= maxLength) return str;
  return str.slice(0, maxLength).trimEnd() + "…";
}

/**
 * Format a full ISO date string to a readable year, e.g. "2023".
 */
export function formatYear(dateString: string): string {
  return new Date(dateString).getFullYear().toString();
}

/**
 * Format an ISO date string to a localized date, e.g. "March 2023".
 */
export function formatMonthYear(dateString: string, locale = "en"): string {
  return new Date(dateString).toLocaleDateString(locale === "ar" ? "ar-AE" : "en-AE", {
    year: "numeric",
    month: "long",
  });
}

/**
 * Build a full image URL from a relative path returned by the API.
 */
export function apiImageUrl(path: string): string {
  const base = process.env.NEXT_PUBLIC_API_URL ?? "";
  if (path.startsWith("http")) return path;
  return `${base}/storage/${path}`;
}
