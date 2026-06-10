import { apiGet } from "@/lib/api";
import type { ApiResponse, PaginatedResponse, Service, ServiceListItem,ServiceDetail  } from "@/types";

// Cache tags
const SERVICES_TAG = "services";

/**
 * Fetch all services (list view — lighter payload).
 */
export async function getServices(): Promise<ServiceListItem[]> {
  const res = await apiGet<ApiResponse<ServiceListItem[]>>("/services", {
    tags: [SERVICES_TAG],
    revalidate: 3600, // 1 hour
  });
  return res.data;
}

/**
 * Fetch a single service by its slug (detail view — full payload).
 */
export async function getServiceBySlug(slug: string): Promise<ServiceDetail> {
  const res = await apiGet<ApiResponse<ServiceDetail>>(`/services/${slug}`, {  // ← ServiceDetail, not Service
    tags: [SERVICES_TAG, `service-${slug}`],
    revalidate: 3600,
  });
  return res.data;
}

/**
 * Fetch all service slugs — used by generateStaticParams.
 */
export async function getAllServiceSlugs(): Promise<string[]> {
  const services = await getServices();
  return services.map((s) => s.slug);
}
