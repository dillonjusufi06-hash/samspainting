"use client";

import { FilloutStandardEmbed } from "@fillout/react";
import { filloutFormId } from "@/lib/contact";

export function ContactForm() {
  return (
    <div className="w-full min-h-[320px]">
      <FilloutStandardEmbed filloutId={filloutFormId} dynamicResize inheritParameters />
    </div>
  );
}
