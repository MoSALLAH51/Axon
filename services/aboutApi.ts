import { apiGet } from "@/lib/api";
import type { ApiResponse, Certificate, CompanyProfile, License } from "@/types";

const ABOUT_TAG = "about";

export async function getCompanyProfile(): Promise<CompanyProfile> {
  const res = await apiGet<ApiResponse<CompanyProfile>>("/about/profile", {
    tags: [ABOUT_TAG, "company-profile"],
    revalidate: 86400, // 24 hours — rarely changes
  });
  return res.data;
}

export async function getLicenses(): Promise<License[]> {
  const res = await apiGet<ApiResponse<License[]>>("/about/licenses", {
    tags: [ABOUT_TAG, "licenses"],
    revalidate: 86400,
  });
  return res.data;
}

export async function getCertificates(): Promise<Certificate[]> {
  const res = await apiGet<ApiResponse<Certificate[]>>("/about/certificates", {
    tags: [ABOUT_TAG, "certificates"],
    revalidate: 86400,
  });
  return res.data;
}
