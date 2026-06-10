"use client";

import { useEffect } from "react";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { Button } from "@/components/ui/Button";

interface ErrorPageProps {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function ErrorPage({ error, reset }: ErrorPageProps) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <Section spacing="lg" className="min-h-[60vh] flex items-center">
      <Container size="sm">
        <div className="text-center">
          <span className="inline-block mb-6 font-body text-xs font-semibold tracking-[0.2em] uppercase text-forest-600">
            Error
          </span>
          <h1 className="font-display text-display-xl text-charcoal-900 mb-4">
            Something went wrong
          </h1>
          <p className="font-body text-base text-charcoal-500 mb-10 max-w-md mx-auto leading-relaxed">
            We couldn&apos;t load this page. Please try again or navigate to another section.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Button onClick={reset} variant="primary" size="lg">
              Try Again
            </Button>
            <Button href="/" variant="outline" size="lg">
              Go Home
            </Button>
          </div>
          {error.digest && (
            <p className="mt-8 font-body text-xs text-charcoal-300">
              Error ID: {error.digest}
            </p>
          )}
        </div>
      </Container>
    </Section>
  );
}
