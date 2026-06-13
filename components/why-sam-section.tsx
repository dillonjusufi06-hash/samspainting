import { Shield, Star, Sparkles } from "lucide-react";

interface WhySamSectionProps {
  serviceTitle: string;
}

export function WhySamSection({ serviceTitle }: WhySamSectionProps) {
  return (
    <section className="py-16 sm:py-20 bg-white border-t border-neutral-100">
      <div className="max-w-4xl mx-auto px-4 sm:px-8 text-center">
        <span className="inline-block text-[10px] font-black tracking-wider uppercase text-accent-600 mb-4">
          Why Sam?
        </span>

        <h2 className="text-2xl sm:text-4xl font-extrabold tracking-tight leading-tight text-neutral-900 max-w-2xl mx-auto">
          The painter North Jersey{" "}
          <span className="bg-gradient-to-r from-amber-500 via-amber-400 to-yellow-500 bg-clip-text text-transparent">
            actually recommends.
          </span>
        </h2>

        <p className="text-sm sm:text-base text-neutral-600 leading-relaxed max-w-lg mx-auto mt-4">
          For {serviceTitle.toLowerCase()}, Sam&apos;s Painting brings careful prep, quality materials, and clean results — every time.
        </p>

        <div className="mt-10 grid grid-cols-1 sm:grid-cols-3 rounded-2xl border border-neutral-200 bg-neutral-50/80 overflow-hidden max-w-2xl mx-auto">
          <div className="flex flex-col items-center justify-center gap-1 px-6 py-5 sm:border-r border-neutral-200">
            <div className="flex items-center gap-1">
              {[...Array(5)].map((_, i) => (
                <Star key={i} size={14} className="fill-amber-400 text-amber-400" />
              ))}
            </div>
            <p className="text-2xl font-black text-neutral-900 leading-none">5.0</p>
            <p className="text-[10px] font-bold tracking-wider text-neutral-500 uppercase">Star Rated</p>
          </div>

          <div className="flex flex-col items-center justify-center gap-1 px-6 py-5 border-t border-neutral-200 sm:border-t-0 sm:border-r">
            <Shield size={18} className="text-accent-500 stroke-[2.5]" />
            <p className="text-2xl font-black text-neutral-900 leading-none">100%</p>
            <p className="text-[10px] font-bold tracking-wider text-neutral-500 uppercase">Insured</p>
          </div>

          <div className="flex flex-col items-center justify-center gap-1 px-6 py-5 border-t sm:border-t-0 border-neutral-200">
            <Sparkles size={18} className="text-accent-500 stroke-[2.5]" />
            <p className="text-2xl font-black text-neutral-900 leading-none">$0</p>
            <p className="text-[10px] font-bold tracking-wider text-neutral-500 uppercase">Estimates</p>
          </div>
        </div>
      </div>
    </section>
  );
}
