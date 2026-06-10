import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { Skeleton } from "@/components/ui/Skeleton";

export default function AboutLoading() {
  return (
    <>
      <div className="bg-charcoal-950 pt-40 pb-20 md:pt-48 md:pb-28">
        <Container>
          <Skeleton className="h-4 w-24 mb-4 bg-charcoal-800" />
          <Skeleton className="h-14 w-1/2 bg-charcoal-800" />
          <Skeleton className="h-4 w-2/3 mt-4 bg-charcoal-800" />
        </Container>
      </div>

      <Section spacing="lg">
        <Container>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="border border-sand-200 p-6 space-y-3">
                <Skeleton className="h-6 w-3/4" />
                <Skeleton className="h-4 w-1/2" />
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-2/3" />
              </div>
            ))}
          </div>
        </Container>
      </Section>
    </>
  );
}
