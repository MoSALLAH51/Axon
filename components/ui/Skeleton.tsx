import { cn } from "@/lib/utils";

interface SkeletonProps extends React.HTMLAttributes<HTMLDivElement> {}

export function Skeleton({ className, ...props }: SkeletonProps) {
  return (
    <div
      className={cn(
        "animate-pulse rounded-sm bg-gradient-to-r from-charcoal-100 via-charcoal-50 to-charcoal-100 bg-[length:200%_100%] animate-shimmer",
        className,
      )}
      {...props}
    />
  );
}
