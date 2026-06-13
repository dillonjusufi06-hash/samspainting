import Link from "next/link";
import { Instagram, Phone } from "lucide-react";
import { contactInfo } from "@/lib/contact";
import { SiteLogo } from "./site-logo";

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-50 bg-white shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-8 py-4 flex items-center justify-between">
        <Link href="/" className="group transition-transform group-hover:scale-[1.02]">
          <SiteLogo />
        </Link>

        <div className="flex items-center gap-2 sm:gap-4 lg:gap-6 shrink-0">
          <nav className="hidden lg:flex items-center gap-6 text-xs font-bold tracking-wider">
            <Link href="/#services" className="hover:text-accent-500 transition-colors text-neutral-700">
              Services
            </Link>
            <Link href="/#past-work" className="hover:text-accent-500 transition-colors text-neutral-700">
              Gallery
            </Link>
            <Link href="/#testimonials" className="hover:text-accent-500 transition-colors text-neutral-700">
              Testimonials
            </Link>
            <Link href="/contact" className="hover:text-accent-500 transition-colors text-neutral-700">
              Contact
            </Link>
          </nav>

          <a
            href={contactInfo.instagramUrl}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Sam's Painting on Instagram"
            className="flex h-9 w-9 items-center justify-center rounded-full text-neutral-700 hover:text-accent-500 hover:bg-neutral-100 transition-colors shrink-0"
          >
            <Instagram size={18} className="stroke-[2.5]" />
          </a>

          <a
            href={contactInfo.phoneHref}
            aria-label={`Call ${contactInfo.phone}`}
            className="flex h-9 w-9 sm:h-auto sm:w-auto items-center justify-center gap-2 bg-accent-500 hover:bg-accent-600 active:bg-accent-700 text-white sm:px-5 sm:py-2.5 rounded-full text-xs font-extrabold tracking-wider transition-all shadow-xs hover:shadow-sm active:scale-95 shrink-0"
          >
            <Phone size={15} className="stroke-[2.5]" />
            <span className="hidden sm:inline whitespace-nowrap">{contactInfo.phone}</span>
          </a>
        </div>
      </div>
    </header>
  );
}
