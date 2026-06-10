import { cn } from "@/lib/utils";
import { Container } from "@/components/ui/Container";

interface PageHeaderProps {
  label?: string;
  title: string;
  subtitle?: string;
  className?: string;
}

export function PageHeader({ label, title, subtitle, className }: PageHeaderProps) {
  return (
    <div
      className={cn(
        "relative bg-charcoal-950 pt-40 pb-20 md:pt-48 md:pb-28 overflow-hidden",
        className,
      )}
    >
      {/* Subtle texture overlay */}
      <div
        aria-hidden
        className="absolute inset-0 opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage:
            "repeating-linear-gradient(0deg, transparent, transparent 39px, rgba(255,255,255,0.5) 40px), repeating-linear-gradient(90deg, transparent, transparent 39px, rgba(255,255,255,0.5) 40px)",
        }}
      />

      {/* Accent line */}
      <div
        aria-hidden
        className="absolute left-0 top-0 h-full w-[3px] bg-forest-600"
      />

      <Container>
        {label && (
          <span className="inline-block mb-4 text-xs font-body font-semibold tracking-[0.2em] uppercase text-forest-400">
            {label}
          </span>
        )}
        <h1 className="font-display text-display-xl text-sand-50">{title}</h1>
        {subtitle && (
          <p className="mt-4 max-w-2xl font-body text-base text-sand-400 leading-relaxed">
            {subtitle}
          </p>
        )}
      </Container>
    </div>
  );
}
