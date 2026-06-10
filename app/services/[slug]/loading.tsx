import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { Skeleton } from "@/components/ui/Skeleton";

export default function ServiceDetailLoading() {
  return (
    <>
      <div className="bg-charcoal-950 pt-40 pb-20 md:pt-48 md:pb-28">
        <Container>
          <Skeleton className="h-4 w-24 mb-4 bg-charcoal-800" />
          <Skeleton className="h-14 w-3/4 bg-charcoal-800" />
          <Skeleton className="h-4 w-1/2 mt-4 bg-charcoal-800" />
        </Container>
      </div>

      <Section spacing="lg">
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            <div className="space-y-4">
              <Skeleton className="h-4 w-24" />
              <Skeleton className="h-10 w-3/4" />
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-2/3" />
              <Skeleton className="h-12 w-40 mt-6" />
            </div>
            <Skeleton className="aspect-landscape w-full" />
          </div>
        </Container>
      </Section>
    </>
  );
}
