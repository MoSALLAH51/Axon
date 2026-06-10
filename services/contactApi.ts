import { apiGet, apiPost } from "@/lib/api";
import type { ApiResponse, ContactFormPayload, ContactInfo } from "@/types";

export async function getContactInfo(): Promise<ContactInfo> {
  const res = await apiGet<ApiResponse<ContactInfo>>("/contact/info", {
    tags: ["contact-info"],
    revalidate: 86400,
  });
  return res.data;
}

export async function submitContactForm(payload: ContactFormPayload): Promise<void> {
  await apiPost<ApiResponse<null>>("/contact/submit", payload);
}
