import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { Skeleton } from "@/components/ui/Skeleton";

export default function ProjectsLoading() {
  return (
    <>
      <div className="bg-charcoal-950 pt-40 pb-20 md:pt-48 md:pb-28">
        <Container>
          <Skeleton className="h-4 w-28 mb-4 bg-charcoal-800" />
          <Skeleton className="h-14 w-1/2 bg-charcoal-800" />
          <Skeleton className="h-4 w-2/3 mt-4 bg-charcoal-800" />
        </Container>
      </div>

      <Section spacing="lg">
        <Container>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {Array.from({ length: 9 }).map((_, i) => (
              <Skeleton key={i} className="aspect-portrait w-full" />
            ))}
          </div>
        </Container>
      </Section>
    </>
  );
}
