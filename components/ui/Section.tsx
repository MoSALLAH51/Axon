import { cn } from "@/lib/utils";

interface SectionProps extends React.HTMLAttributes<HTMLElement> {
  as?: "section" | "div" | "article" | "aside";
  spacing?: "sm" | "md" | "lg";
}

const spacingClasses = {
  sm: "py-12 md:py-16",
  md: "py-16 md:py-24",
  lg: "py-24 md:py-32",
};

export function Section({
  as: Tag = "section",
  spacing = "md",
  className,
  children,
  ...props
}: SectionProps) {
  return (
    <Tag className={cn(spacingClasses[spacing], className)} {...props}>
      {children}
    </Tag>
  );
}
