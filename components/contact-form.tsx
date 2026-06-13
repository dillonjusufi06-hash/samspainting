"use client";

import { FilloutStandardEmbed } from "@fillout/react";
import { filloutFormId } from "@/lib/contact";

export function ContactForm() {
  return (
    <div className="w-full max-w-lg mx-auto">
      <FilloutStandardEmbed filloutId={filloutFormId} dynamicResize inheritParameters />
    </div>
  );
}
