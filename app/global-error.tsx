"use client";

import { useEffect } from "react";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";

interface GlobalErrorProps {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function GlobalError({ error, reset }: GlobalErrorProps) {
  useEffect(() => {
    // Log to your error reporting service here
    console.error(error);
  }, [error]);

  return (
    <html lang="en">
      <body className="bg-sand-50 font-body antialiased">
        <div className="min-h-screen flex items-center justify-center">
          <Container size="sm">
            <div className="text-center py-24">
              <span className="inline-block mb-6 font-display text-8xl text-sand-200">!</span>
              <h1 className="font-display text-display-xl text-charcoal-900 mb-4">
                Something went wrong
              </h1>
              <p className="font-body text-base text-charcoal-500 mb-10 max-w-md mx-auto leading-relaxed">
                An unexpected error occurred. Please try again, or return to the home page.
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
        </div>
      </body>
    </html>
  );
}
