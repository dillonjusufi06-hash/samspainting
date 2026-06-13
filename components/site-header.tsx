import Link from "next/link";
import { Phone } from "lucide-react";
import { SiteLogo } from "./site-logo";

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-50 bg-white shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-8 py-4 flex items-center justify-between">
        <Link href="/" className="group transition-transform group-hover:scale-[1.02]">
          <SiteLogo />
        </Link>

        <div className="flex items-center space-x-6 sm:space-x-8">
          <nav className="hidden lg:flex items-center space-x-6 text-xs font-bold tracking-wider">
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
            href="tel:2012325978"
            className="flex items-center gap-2 bg-accent-500 hover:bg-accent-600 active:bg-accent-700 text-white px-4 py-2 sm:px-5 sm:py-2.5 rounded-full text-xs font-extrabold tracking-wider transition-all shadow-xs hover:shadow-sm active:scale-95 whitespace-nowrap"
          >
            <Phone size={13} className="stroke-[2.5]" />
            <span>(201) 232-5978</span>
          </a>
        </div>
      </div>
    </header>
  );
}
