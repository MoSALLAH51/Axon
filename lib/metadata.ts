import type { Metadata } from "next";
import type { Locale } from "@/types";

const SITE_URL = process.env.NEXT_PUBLIC_WEBSITE_URL ?? "https://axonlandscape.com";
const SITE_NAME = "AXON Landscape";
const DEFAULT_OG_IMAGE = `${SITE_URL}/og/default.jpg`;

interface BuildMetadataOptions {
  title: string;
  description: string;
  locale?: Locale;
  path?: string;
  ogImage?: string;
  noIndex?: boolean;
}

export function buildMetadata({
  title,
  description,
  locale = "en",
  path = "",
  ogImage = DEFAULT_OG_IMAGE,
  noIndex = false,
}: BuildMetadataOptions): Metadata {
  const url = `${SITE_URL}${path}`;

  return {
    title: `${title} | ${SITE_NAME}`,
    description,
    metadataBase: new URL(SITE_URL),
    alternates: {
      canonical: url,
      languages: {
        en: `${SITE_URL}${path}`,
        ar: `${SITE_URL}${path}`,
      },
    },
    openGraph: {
      title: `${title} | ${SITE_NAME}`,
      description,
      url,
      siteName: SITE_NAME,
      locale: locale === "ar" ? "ar_AE" : "en_AE",
      type: "website",
      images: [
        {
          url: ogImage,
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: `${title} | ${SITE_NAME}`,
      description,
      images: [ogImage],
    },
    robots: noIndex
      ? { index: false, follow: false }
      : { index: true, follow: true, googleBot: { index: true, follow: true } },
  };
}

// ─── Static page metadata presets ──────────────────────────────────────────

export const HOME_METADATA: Metadata = buildMetadata({
  title: "Premium Landscape Architecture",
  description:
    "AXON Landscape — Award-winning landscape architecture, design, and nursery services across the UAE.",
  path: "/",
});

export const SERVICES_METADATA: Metadata = buildMetadata({
  title: "Our Services",
  description:
    "Explore AXON Landscape's full range of services: landscape design, softscaping, hardscaping, nursery, and more.",
  path: "/services",
});

export const PROJECTS_METADATA: Metadata = buildMetadata({
  title: "Our Projects",
  description:
    "Browse AXON Landscape's portfolio of completed projects across residential, commercial, and public spaces in the UAE.",
  path: "/projects",
});

export const CONTACT_METADATA: Metadata = buildMetadata({
  title: "Contact Us",
  description:
    "Get in touch with AXON Landscape for inquiries, quotes, and consultations.",
  path: "/contact",
});

export const ABOUT_METADATA: Metadata = buildMetadata({
  title: "About AXON Landscape",
  description:
    "Learn about AXON Landscape — our story, vision, mission, licenses, and certifications.",
  path: "/about",
});
