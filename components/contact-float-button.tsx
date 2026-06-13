"use client";

import { useState } from "react";
import { FilloutPopupEmbed } from "@fillout/react";
import { contactInfo, filloutFormId, filloutPopupSize } from "@/lib/contact";

const floatButtonClass =
  "bg-accent-500 hover:bg-accent-600 active:bg-accent-700 text-white px-4 py-2 sm:px-5 sm:py-2.5 rounded-full text-sm font-extrabold tracking-wider transition-all shadow-xs hover:shadow-sm active:scale-95 whitespace-nowrap";

export function ContactFloatButton() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <div className="fixed bottom-5 right-5 sm:bottom-6 sm:right-6 z-50 flex flex-col items-end gap-2">
        <a href={contactInfo.phoneHref} className={floatButtonClass}>
          {contactInfo.phone}
        </a>
        <button
          type="button"
          onClick={() => setIsOpen(true)}
          className={`${floatButtonClass} cursor-pointer`}
          aria-label="Get Free Estimate"
        >
          Get Free Estimate
        </button>
      </div>

      <FilloutPopupEmbed
        filloutId={filloutFormId}
        inheritParameters
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        width={filloutPopupSize.width}
        height={filloutPopupSize.height}
      />
    </>
  );
}
