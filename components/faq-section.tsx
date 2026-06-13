"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { ChevronDown } from "lucide-react";
import type { FaqItem } from "@/lib/service-faqs";

interface FaqSectionProps {
  items: FaqItem[];
  serviceTitle?: string;
}

export function FaqSection({ items, serviceTitle }: FaqSectionProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  if (items.length === 0) return null;

  return (
    <section className="py-24 bg-neutral-50 border-t border-neutral-100 transition-colors duration-300 relative">
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-accent-500/[0.015] rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-4xl mx-auto px-4 sm:px-8 relative z-10">
        <div className="text-center space-y-4 mb-12">
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-neutral-900 font-sans">
            Frequently Asked Questions
          </h2>
          <p className="text-sm max-w-2xl mx-auto text-neutral-600 font-normal font-sans leading-relaxed">
            {serviceTitle
              ? `Common questions about ${serviceTitle.toLowerCase()} from Sam's Painting.`
              : "Have questions before starting your painting project? Here are some common questions homeowners ask Sam's Painting."}
          </p>
        </div>

        <div className="space-y-4">
          {items.map((item, idx) => {
            const isOpen = openIndex === idx;
            return (
              <div
                key={idx}
                className="border border-neutral-200/80 rounded-2xl bg-neutral-50/40 hover:bg-neutral-50/80 transition-colors duration-200 overflow-hidden"
              >
                <button
                  onClick={() => setOpenIndex(isOpen ? null : idx)}
                  className="w-full text-left py-5 px-6 sm:px-8 flex items-center justify-between gap-4 font-sans cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-accent-500"
                  aria-expanded={isOpen}
                >
                  <span className="text-base font-extrabold text-neutral-900 tracking-tight leading-snug">
                    {item.question}
                  </span>
                  <span
                    className={`p-1 rounded-lg bg-neutral-100 border border-neutral-200/60 text-neutral-600 transition-all duration-300 shrink-0 ${isOpen ? "rotate-180 bg-accent-50 border-accent-200 text-accent-600" : ""}`}
                  >
                    <ChevronDown size={16} className="stroke-[2.5]" />
                  </span>
                </button>

                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.25, ease: "easeInOut" }}
                    >
                      <div className="px-6 sm:px-8 pb-5 text-sm text-neutral-600 font-sans leading-relaxed border-t border-neutral-100 pt-3">
                        {item.answer}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
