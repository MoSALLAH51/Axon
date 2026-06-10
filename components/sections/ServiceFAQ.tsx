"use client";

import { useState } from "react";

interface FAQItem {
  q: string;
  a: string;
}

export function ServiceFAQ({ items }: { items: FAQItem[] }) {
  const [open, setOpen] = useState<number | null>(null);

  return (
    <div className="flex flex-col divide-y divide-sand-200 border border-sand-200 rounded-2xl overflow-hidden bg-white">
      {items.map((item, i) => (
        <div key={i}>
          <button
            onClick={() => setOpen(open === i ? null : i)}
            className="w-full flex items-center justify-between gap-4 px-6 py-5 text-left hover:bg-sand-50 transition-colors"
            aria-expanded={open === i}
          >
            <span className="font-body text-sm font-medium text-charcoal-900">
              {item.q}
            </span>
            <span
              className={`shrink-0 w-5 h-5 flex items-center justify-center text-forest-700 transition-transform duration-300 ${
                open === i ? "rotate-180" : ""
              }`}
            >
              <svg fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24" className="w-4 h-4">
                <path strokeLinecap="round" strokeLinejoin="round" d="m19 9-7 7-7-7" />
              </svg>
            </span>
          </button>

          {open === i && (
            <div className="px-6 pb-5">
              <p className="font-body text-sm text-charcoal-500 leading-relaxed">
                {item.a}
              </p>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}