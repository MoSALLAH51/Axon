import type { MetadataRoute } from "next";
import { getAllServiceSlugs, getAllProjectIds } from "@/services";

const BASE_URL = process.env.NEXT_PUBLIC_WEBSITE_URL ?? "https://axonlandscape.com";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  // Static routes
  const staticRoutes: MetadataRoute.Sitemap = [
    { url: BASE_URL,                          priority: 1.0, changeFrequency: "weekly"  },
    { url: `${BASE_URL}/about`,               priority: 0.8, changeFrequency: "monthly" },
    { url: `${BASE_URL}/about/company-profile`, priority: 0.7, changeFrequency: "monthly" },
    { url: `${BASE_URL}/about/licenses`,      priority: 0.6, changeFrequency: "monthly" },
    { url: `${BASE_URL}/about/certificates`,  priority: 0.6, changeFrequency: "monthly" },
    { url: `${BASE_URL}/services`,            priority: 0.9, changeFrequency: "weekly"  },
    { url: `${BASE_URL}/projects`,            priority: 0.9, changeFrequency: "weekly"  },
    { url: `${BASE_URL}/contact`,             priority: 0.7, changeFrequency: "monthly" },
  ];

  // Dynamic service routes
  let serviceRoutes: MetadataRoute.Sitemap = [];
  try {
    const slugs = await getAllServiceSlugs();
    serviceRoutes = slugs.map((slug) => ({
      url: `${BASE_URL}/services/${slug}`,
      priority: 0.8,
      changeFrequency: "weekly" as const,
    }));
  } catch {
    // silently skip if API is unavailable during build
  }

  // Dynamic project routes
  let projectRoutes: MetadataRoute.Sitemap = [];
  try {
    const ids = await getAllProjectIds();
    projectRoutes = ids.map((id) => ({
      url: `${BASE_URL}/projects/${id}`,
      priority: 0.7,
      changeFrequency: "monthly" as const,
    }));
  } catch {
    // silently skip
  }

  return [...staticRoutes, ...serviceRoutes, ...projectRoutes];
}
