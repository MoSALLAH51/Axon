"use client";

import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { Button } from "@/components/ui/Button";

interface ErrorProps {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function ServiceDetailError({ reset }: ErrorProps) {
  return (
    <Section spacing="lg" className="min-h-[60vh] flex items-center">
      <Container size="sm">
        <div className="text-center">
          <h2 className="font-display text-display-md text-charcoal-900 mb-4">
            Unable to load this service
          </h2>
          <p className="font-body text-sm text-charcoal-500 mb-8 max-w-sm mx-auto">
            We couldn&apos;t fetch the service details. Please try again.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Button onClick={reset} variant="primary">Try Again</Button>
            <Button href="/services" variant="outline">All Services</Button>
          </div>
        </div>
      </Container>
    </Section>
  );
}
