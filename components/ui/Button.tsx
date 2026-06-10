import Link from "next/link";
import { cn } from "@/lib/utils";

type ButtonVariant = "primary" | "secondary" | "ghost" | "outline";
type ButtonSize = "sm" | "md" | "lg";

interface BaseProps {
  variant?: ButtonVariant;
  size?: ButtonSize;
  className?: string;
  children: React.ReactNode;
}

type ButtonAsButton = BaseProps &
  React.ButtonHTMLAttributes<HTMLButtonElement> & { href?: never };

type ButtonAsLink = BaseProps & { href: string; target?: string; rel?: string };

type ButtonProps = ButtonAsButton | ButtonAsLink;

const variantClasses: Record<ButtonVariant, string> = {
  primary:
    "bg-forest-700 text-sand-50 hover:bg-forest-800 active:bg-forest-900 border border-forest-700 hover:border-forest-800",
  secondary:
    "bg-sand-200 text-charcoal-900 hover:bg-sand-300 active:bg-sand-400 border border-sand-200 hover:border-sand-300",
  ghost:
    "bg-transparent text-charcoal-800 hover:bg-charcoal-50 active:bg-charcoal-100 border border-transparent",
  outline:
    "bg-transparent text-forest-700 hover:bg-forest-50 active:bg-forest-100 border border-forest-700",
};

const sizeClasses: Record<ButtonSize, string> = {
  sm:  "px-4 py-2 text-sm",
  md:  "px-6 py-3 text-sm",
  lg:  "px-8 py-4 text-base",
};

const baseClasses =
  "inline-flex items-center justify-center gap-2 font-body font-medium tracking-wide rounded-md transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-forest-600 focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none shadow-sm hover:shadow-lg";

export function Button({ variant = "primary", size = "md", className, children, ...props }: ButtonProps) {
  const classes = cn(baseClasses, variantClasses[variant], sizeClasses[size], className);

  if ("href" in props && props.href) {
    const { href, target, rel, ...rest } = props as ButtonAsLink;
    return (
      <Link href={href} target={target} rel={rel} className={classes} {...(rest as object)}>
        {children}
      </Link>
    );
  }

  return (
    <button className={classes} {...(props as ButtonAsButton)}>
      {children}
    </button>
  );
}
