import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { Skeleton } from "@/components/ui/Skeleton";

export default function ContactLoading() {
  return (
    <>
      <div className="bg-charcoal-950 pt-40 pb-20 md:pt-48 md:pb-28">
        <Container>
          <Skeleton className="h-4 w-20 mb-4 bg-charcoal-800" />
          <Skeleton className="h-14 w-1/3 bg-charcoal-800" />
          <Skeleton className="h-4 w-1/2 mt-4 bg-charcoal-800" />
        </Container>
      </div>

      <Section spacing="lg">
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-16">
            {/* Form skeleton */}
            <div className="lg:col-span-3 space-y-6">
              <Skeleton className="h-4 w-32" />
              <div className="grid grid-cols-2 gap-6">
                <Skeleton className="h-12 w-full" />
                <Skeleton className="h-12 w-full" />
                <Skeleton className="h-12 w-full" />
                <Skeleton className="h-12 w-full" />
                <Skeleton className="h-12 w-full col-span-2" />
              </div>
              <Skeleton className="h-36 w-full" />
              <Skeleton className="h-12 w-40" />
            </div>

            {/* Sidebar skeleton */}
            <div className="lg:col-span-2 space-y-6">
              <Skeleton className="h-4 w-24" />
              {Array.from({ length: 4 }).map((_, i) => (
                <div key={i} className="flex gap-4">
                  <Skeleton className="shrink-0 w-8 h-8" />
                  <div className="flex-1 space-y-2">
                    <Skeleton className="h-3 w-20" />
                    <Skeleton className="h-4 w-full" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </Container>
      </Section>
    </>
  );
}
