import { Phone } from "lucide-react";
import { contactInfo } from "@/lib/contact";

export function PaintCTA() {
  return (
    <section className="py-16 bg-neutral-950 text-white relative overflow-hidden border-y border-neutral-800">
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-accent-500/[0.07] rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-8 relative z-10 flex flex-col lg:flex-row items-center justify-between gap-8">
        <div className="space-y-3 text-center lg:text-left">
          <span className="text-[10px] font-black tracking-wider bg-accent-500 text-white px-2.5 py-1 rounded uppercase inline-block">
            Free Estimate
          </span>
          <h3 className="text-2xl sm:text-3xl font-black tracking-tight leading-tight text-white max-w-2xl">
            Ready to Get Your Home Painted?
          </h3>
          <p className="text-xs sm:text-sm text-neutral-400 max-w-2xl font-medium leading-relaxed">
            Call Sam&apos;s Painting now. We will answer your questions, schedule a free estimate, and tell you the price before we start. No pressure.
          </p>
        </div>

        <a
          href={contactInfo.phoneHref}
          className="bg-accent-500 hover:bg-accent-600 active:bg-accent-700 text-white font-black text-xs tracking-wider py-4 px-8 rounded-full shadow-lg hover:shadow-accent-500/20 active:scale-95 transition-all text-center inline-flex items-center justify-center gap-2 shrink-0"
        >
          <Phone size={13} className="stroke-[2.5]" />
          <span>Call Now: {contactInfo.phone}</span>
        </a>
      </div>
    </section>
  );
}
