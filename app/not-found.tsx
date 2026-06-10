import type { Metadata } from "next";
import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { Button } from "@/components/ui/Button";

export const metadata: Metadata = {
  title: "Page Not Found | AXON Landscape",
  robots: { index: false, follow: false },
};

const suggestions = [
  { label: "Home",     href: "/"         },
  { label: "Services", href: "/services" },
  { label: "Projects", href: "/projects" },
  { label: "Contact",  href: "/contact"  },
];

export default function NotFoundPage() {
  return (
    <Section spacing="lg" className="min-h-screen flex items-center bg-charcoal-950">
      <Container size="sm">
        <div className="text-center">
          {/* Large 404 display */}
          <p
            aria-hidden
            className="font-display leading-none text-[clamp(6rem,20vw,14rem)] text-charcoal-800 select-none mb-4"
          >
            404
          </p>

          <span className="inline-block mb-4 font-body text-xs font-semibold tracking-[0.2em] uppercase text-forest-400">
            Page Not Found
          </span>

          <h1 className="font-display text-display-lg text-sand-50 mb-4">
            This page doesn&apos;t exist
          </h1>
          <p className="font-body text-base text-sand-400 max-w-sm mx-auto leading-relaxed mb-10">
            The page you&apos;re looking for may have been moved, deleted, or never existed.
          </p>

          <div className="flex flex-wrap justify-center gap-4 mb-16">
            <Button href="/" variant="primary" size="lg">
              Back to Home
            </Button>
            <Button href="/contact" variant="outline" size="lg">
              Contact Us
            </Button>
          </div>

          {/* Quick links */}
          <div className="border-t border-charcoal-800 pt-10">
            <p className="font-body text-xs font-semibold tracking-[0.2em] uppercase text-charcoal-500 mb-5">
              Explore
            </p>
            <nav aria-label="Suggested pages" className="flex flex-wrap justify-center gap-x-6 gap-y-2">
              {suggestions.map(({ label, href }) => (
                <Link
                  key={href}
                  href={href}
                  className="font-body text-sm text-sand-400 hover:text-sand-100 transition-colors"
                >
                  {label}
                </Link>
              ))}
            </nav>
          </div>
        </div>
      </Container>
    </Section>
  );
}
