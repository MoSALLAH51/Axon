import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { Skeleton } from "@/components/ui/Skeleton";

export default function ProjectDetailLoading() {
  return (
    <>
      <div className="bg-charcoal-950 pt-40 pb-20 md:pt-48 md:pb-28">
        <Container>
          <Skeleton className="h-4 w-24 mb-4 bg-charcoal-800" />
          <Skeleton className="h-14 w-2/3 bg-charcoal-800" />
          <Skeleton className="h-4 w-1/3 mt-4 bg-charcoal-800" />
        </Container>
      </div>

      <Section spacing="lg">
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-16">
            <div className="lg:col-span-2 space-y-8">
              <Skeleton className="aspect-wide w-full" />
              <div className="space-y-3">
                <Skeleton className="h-4 w-32" />
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-3/4" />
              </div>
            </div>
            <div className="space-y-6">
              <Skeleton className="h-64 w-full" />
              <Skeleton className="h-40 w-full" />
            </div>
          </div>
        </Container>
      </Section>
    </>
  );
}
