"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { Container } from "@/components/ui/Container";
import { LocaleSwitcher } from "@/components/ui/LocaleSwitcher";
import { useLocaleContext } from "@/components/providers/LocaleProvider";
import { t } from "@/lib/i18n";

interface NavItem {
  labelKey: string;
  href: string;
  children?: { labelKey: string; href: string }[];
}

const navItems: NavItem[] = [
  { labelKey: "nav.home", href: "/" },
  {
    labelKey: "nav.about",
    href: "/about",
    children: [
      { labelKey: "nav.companyProfile", href: "/about/company-profile" },
      { labelKey: "nav.licenses",       href: "/about/licenses" },
      { labelKey: "nav.certificates",   href: "/about/certificates" },
    ],
  },
  { labelKey: "nav.services", href: "/services" },
  { labelKey: "nav.projects", href: "/projects" },
  { labelKey: "nav.contact",  href: "/contact" },
];

export function Navbar() {
  const pathname = usePathname();
  const { locale } = useLocaleContext();
  const [open, setOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);

  // Close mobile menu on route change
  useEffect(() => {
    setOpen(false);
    setActiveDropdown(null);
  }, [pathname]);

  const isRTL = locale === "ar";

  return (
    <header className="fixed top-0 inset-x-0 z-50 bg-white shadow-md">
      <Container>
        <nav className="flex items-center justify-between h-18 md:h-22">

          {/* Logo */}
          <Link
            href="/"
            className="flex items-center gap-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-forest-500 focus-visible:ring-offset-2"
          >
            <span className="font-display text-2xl font-semibold tracking-tight text-charcoal-950">
              AXON
            </span>
            <span className="hidden sm:block text-[10px] font-body font-medium tracking-[0.25em] uppercase text-charcoal-500 leading-none mt-1">
              Landscape
            </span>
          </Link>

          {/* Desktop Nav */}
          <ul className={cn("hidden lg:flex items-center gap-1", isRTL && "flex-row-reverse")}>
            {navItems.map((item) => (
              <li
                key={item.href}
                className="relative"
                onMouseEnter={() => item.children && setActiveDropdown(item.href)}
                onMouseLeave={() => setActiveDropdown(null)}
              >
                <Link
                  href={item.href}
                  className={cn(
                    "px-4 py-2 font-body text-sm tracking-wide transition-colors duration-150",
                    "text-charcoal-700 hover:text-charcoal-950",
                    (pathname === item.href || pathname.startsWith(item.href + "/"))
                      ? "text-charcoal-950 font-medium"
                      : "",
                  )}
                >
                  {t(item.labelKey, locale)}
                  {item.children && (
                    <span className="ml-1 text-xs opacity-60">▾</span>
                  )}
                </Link>

                {/* Dropdown */}
                {item.children && activeDropdown === item.href && (
                  <div className={cn(
                    "absolute top-full min-w-[200px] bg-white border border-sand-200 shadow-2xl py-2",
                    isRTL ? "right-0" : "left-0",
                  )}>
                    {item.children.map((child) => (
                      <Link
                        key={child.href}
                        href={child.href}
                        className={cn(
                          "block px-5 py-2.5 font-body text-sm transition-colors duration-150",
                          "text-charcoal-600 hover:text-charcoal-950 hover:bg-sand-50",
                          isRTL && "text-right",
                          pathname === child.href && "text-charcoal-950 bg-sand-50",
                        )}
                      >
                        {t(child.labelKey, locale)}
                      </Link>
                    ))}
                  </div>
                )}
              </li>
            ))}
          </ul>

          {/* CTA + Locale Switcher + Hamburger */}
          <div className={cn("flex items-center gap-3", isRTL && "flex-row-reverse")}>
            <LocaleSwitcher className="hidden lg:flex" />
            <Link
              href="/contact"
              className={cn(
                "hidden lg:inline-flex items-center px-5 py-2.5",
                "bg-forest-400 hover:bg-forest-500 text-white",
                "font-body text-sm font-medium tracking-wide rounded-sm",
                "transition-colors duration-200",
              )}
            >
              {locale === "ar" ? "احصل على عرض" : "Get a Quote"}
            </Link>

            <button
              aria-label={open ? "Close menu" : "Open menu"}
              aria-expanded={open}
              onClick={() => setOpen((v) => !v)}
              className="lg:hidden flex flex-col justify-center items-center w-10 h-10 gap-[5px] text-charcoal-950 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-forest-500"
            >
              <span className={cn("block w-6 h-[1.5px] bg-current transition-all duration-300", open && "translate-y-[7px] rotate-45")} />
              <span className={cn("block w-6 h-[1.5px] bg-current transition-all duration-300", open && "opacity-0")} />
              <span className={cn("block w-6 h-[1.5px] bg-current transition-all duration-300", open && "-translate-y-[7px] -rotate-45")} />
            </button>
          </div>
        </nav>
      </Container>

      {/* Mobile Menu */}
      <div className={cn("lg:hidden overflow-hidden transition-all duration-300 ease-in-out", open ? "max-h-screen" : "max-h-0")}>
        <div className="bg-white border-t border-sand-200">
          <Container>
            <ul className="py-4 flex flex-col">
              {navItems.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className={cn(
                      "block py-3 font-body text-base tracking-wide border-b border-sand-200",
                      "text-charcoal-700 hover:text-charcoal-950 transition-colors",
                      isRTL && "text-right",
                      pathname === item.href && "text-charcoal-950 font-medium",
                    )}
                  >
                    {t(item.labelKey, locale)}
                  </Link>
                  {item.children && (
                    <ul className={cn("pl-4", isRTL && "pl-0 pr-4")}>
                      {item.children.map((child) => (
                        <li key={child.href}>
                          <Link
                            href={child.href}
                            className={cn(
                              "block py-2.5 font-body text-sm border-b border-sand-200",
                              "text-charcoal-500 hover:text-charcoal-900 transition-colors",
                              isRTL && "text-right",
                              pathname === child.href && "text-charcoal-950",
                            )}
                          >
                            {t(child.labelKey, locale)}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  )}
                </li>
              ))}

              {/* Mobile locale switcher */}
              <li className="pt-4 pb-2">
                <LocaleSwitcher />
              </li>

              <li className="pt-2">
                <Link
                  href="/contact"
                  className="inline-flex items-center px-6 py-3 bg-forest-400 text-white font-body text-sm font-medium hover:bg-forest-500 transition-colors rounded-sm"
                >
                  {locale === "ar" ? "احصل على عرض" : "Get a Quote"}
                </Link>
              </li>
            </ul>
          </Container>
        </div>
      </div>
    </header>
  );
}