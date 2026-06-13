import Link from "next/link";
import { Phone } from "lucide-react";
import { services } from "@/lib/services";
import { SiteLogo } from "./site-logo";

export function SiteFooter() {
  return (
    <footer className="bg-neutral-950 text-neutral-300 border-t border-neutral-800 relative z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-8 py-14">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-8">
          <div className="space-y-4 sm:col-span-2 lg:col-span-1">
            <Link href="/" className="inline-block group transition-transform group-hover:scale-[1.02]">
              <SiteLogo dark />
            </Link>
            <p className="text-sm text-neutral-400 leading-relaxed max-w-xs">
              Professional painting in Wayne and North Jersey for homes and small businesses.
            </p>
            <a
              href="tel:2012325978"
              className="inline-flex items-center gap-2 text-xs font-bold tracking-wider text-white hover:text-accent-300 transition-colors"
            >
              <Phone size={13} className="stroke-[2.5]" />
              <span>(201) 232-5978</span>
            </a>
          </div>

          <div>
            <h4 className="text-xs font-black uppercase tracking-wider text-white mb-4">Services</h4>
            <ul className="space-y-2.5">
              {services.map((service) => (
                <li key={service.slug}>
                  <Link
                    href={`/service/${service.slug}`}
                    className="text-sm text-neutral-400 hover:text-accent-300 transition-colors"
                  >
                    {service.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-xs font-black uppercase tracking-wider text-white mb-4">Quick Links</h4>
            <ul className="space-y-2.5">
              <li>
                <Link href="/#services" className="text-sm text-neutral-400 hover:text-accent-300 transition-colors">
                  All Services
                </Link>
              </li>
              <li>
                <Link href="/#past-work" className="text-sm text-neutral-400 hover:text-accent-300 transition-colors">
                  Gallery
                </Link>
              </li>
              <li>
                <Link href="/#testimonials" className="text-sm text-neutral-400 hover:text-accent-300 transition-colors">
                  Reviews
                </Link>
              </li>
              <li>
                <Link href="/#faq" className="text-sm text-neutral-400 hover:text-accent-300 transition-colors">
                  FAQ
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-sm text-neutral-400 hover:text-accent-300 transition-colors">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-xs font-black uppercase tracking-wider text-white mb-4">Contact</h4>
            <ul className="space-y-2.5 text-sm text-neutral-400">
              <li>Wayne Metro Area • New Jersey</li>
              <li>
                <a href="tel:2012325978" className="hover:text-accent-300 transition-colors">
                  201-232-5978
                </a>
              </li>
              <li>
                <a href="mailto:sam@samthepainter.com" className="hover:text-accent-300 transition-colors">
                  sam@samthepainter.com
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-6 border-t border-neutral-800 text-center text-[11px] text-neutral-500">
          <p>© 2026 Sam&apos;s Painting LLC. Licensed, Bonded &amp; Fully Insured. NJ HIC #13VH09284100</p>
        </div>
      </div>
    </footer>
  );
}
