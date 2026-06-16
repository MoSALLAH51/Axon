import type { Metadata } from "next";
import type { Viewport } from "next";
// @ts-ignore: CSS module declaration not found but handled by Next.js
import "./globals.css";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { LocaleProvider } from "@/components/providers/LocaleProvider";

export const metadata: Metadata = {
  title: {
    default: "AXON Landscape — Premium Landscape Architecture, SYR",
    template: "%s | AXON Landscape",
  },
  description:
    "AXON Landscape delivers world-class landscape architecture, softscaping, hardscaping, and nursery services across the area.",
  metadataBase: new URL(process.env.NEXT_PUBLIC_WEBSITE_URL ?? "https://axonlandscape.com"),
  keywords: ["landscape architecture", "SYR", "landscape design", "softscaping", "hardscaping", "nursery", "Sharjah"],
  authors: [{ name: "AXON Landscape" }],
  creator: "AXON Landscape",
  openGraph: {
    type: "website",
    locale: "en_AE",
    url: process.env.NEXT_PUBLIC_WEBSITE_URL,
    siteName: "AXON Landscape",
  },
  twitter: {
    card: "summary_large_image",
  },
  icons: {
    icon: "/favicon.ico",
    apple: "/apple-touch-icon.png",
  },
  manifest: "/site.webmanifest",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#0f1f12",
};

interface RootLayoutProps {
  children: React.ReactNode;
}

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="en" dir="ltr" suppressHydrationWarning>
      <body className="min-h-screen flex flex-col bg-sand-50 antialiased grain-overlay">
        <LocaleProvider>
          <Navbar />
          <main className="flex-1">{children}</main>
          <Footer />
        </LocaleProvider>
      </body>
    </html>
  );
}