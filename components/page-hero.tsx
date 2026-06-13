import Image from "next/image";
import { Phone, Shield, Star } from "lucide-react";
import { trustBadge } from "@/lib/contact";

interface PageHeroProps {
  imageSrc: string;
  imageAlt: string;
  headline: string;
  tagline: string;
  showBadge?: boolean;
  showLocation?: boolean;
  locationLabel?: string;
  showPhoneCta?: boolean;
  showRating?: boolean;
  ratingNote?: string;
  id?: string;
}

export function PageHero({
  imageSrc,
  imageAlt,
  headline,
  tagline,
  showBadge = true,
  showLocation = true,
  locationLabel = "North Jersey",
  showPhoneCta = true,
  showRating = false,
  ratingNote,
  id,
}: PageHeroProps) {
  return (
    <section
      id={id}
      className="relative overflow-hidden border-b border-neutral-200 py-14 sm:py-20 bg-neutral-900"
    >
      <div className="absolute inset-0 z-0">
        <Image
          src={imageSrc}
          alt={imageAlt}
          fill
          priority
          className="object-cover opacity-75 select-none pointer-events-none"
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 bg-neutral-950/30" />
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-8 relative z-10 w-full text-center space-y-6 sm:space-y-8">
        {showBadge && (
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 bg-black/60 border border-white/20 rounded-full w-fit mx-auto backdrop-blur-sm shadow-lg">
            <Shield size={14} className="stroke-[2.5] text-accent-400 shrink-0" />
            <span className="text-xs tracking-wider text-white font-bold">{trustBadge}</span>
          </div>
        )}

        <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight leading-[1.08] text-white">
          {headline}
          {showLocation && (
            <>
              {" "}
              <span className="bg-gradient-to-r from-amber-200 via-amber-400 to-yellow-500 bg-clip-text text-transparent font-black">
                in {locationLabel}
              </span>
            </>
          )}
        </h1>

        <p className="text-base sm:text-lg leading-relaxed text-white/90 max-w-xl mx-auto font-semibold">
          {tagline}
        </p>

        {showPhoneCta && (
          <a
            href="tel:2012325978"
            className="inline-flex items-center gap-2.5 px-4 py-2.5 sm:px-5 sm:py-3 bg-black/60 border border-white/20 rounded-full backdrop-blur-sm shadow-lg text-xs font-bold tracking-wider text-white hover:bg-black/75 hover:border-white/30 transition-all active:scale-[0.98]"
          >
            <Phone size={13} className="stroke-[2.5] text-accent-400" />
            <span>Call for Free Estimate — (201) 232-5978</span>
          </a>
        )}

        {showRating && (
          <div className="flex flex-col items-center gap-2 pt-6 sm:pt-8 border-t border-white/20 w-fit mx-auto">
            <div className="flex items-center space-x-1 justify-center">
              {[...Array(5)].map((_, i) => (
                <Star key={i} size={16} className="fill-amber-400 text-amber-400" />
              ))}
              <span className="text-sm font-black ml-2 text-white">5.0 Star Rated</span>
            </div>
            {ratingNote && (
              <span className="text-[11px] text-white/70 font-medium">{ratingNote}</span>
            )}
          </div>
        )}
      </div>
    </section>
  );
}
