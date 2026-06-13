"use client";

import { FilloutPopupEmbedButton } from "@fillout/react";
import { filloutFormId } from "@/lib/contact";

export function ContactFloatButton() {
  return (
    <FilloutPopupEmbedButton
      filloutId={filloutFormId}
      inheritParameters
      text="Get Free Estimate"
      color="#005eff"
      size="medium"
      float="bottomRight"
    />
  );
}
