import Link from "next/link";
import { Facebook, Instagram } from "lucide-react";
import { services } from "@/lib/services";
import { contactInfo } from "@/lib/contact";
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
              Based in Franklin Lakes, serving discerning homeowners across Bergen, Morris, and Essex counties.
            </p>
            <div className="flex items-center gap-3">
              <a
                href={contactInfo.facebookUrl}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Sam's Painting on Facebook"
                className="flex h-9 w-9 items-center justify-center rounded-full border border-neutral-800 text-neutral-400 hover:text-accent-300 hover:border-neutral-700 transition-colors"
              >
                <Facebook size={16} className="stroke-[2.5]" />
              </a>
              <a
                href={contactInfo.instagramUrl}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Sam's Painting on Instagram"
                className="flex h-9 w-9 items-center justify-center rounded-full border border-neutral-800 text-neutral-400 hover:text-accent-300 hover:border-neutral-700 transition-colors"
              >
                <Instagram size={16} className="stroke-[2.5]" />
              </a>
            </div>
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
            <address className="not-italic space-y-2.5 text-sm text-neutral-400">
              <p className="font-bold text-white">{contactInfo.businessName}</p>
              <p>
                <a
                  href={contactInfo.mapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-accent-300 transition-colors"
                >
                  {contactInfo.address.street}
                  <br />
                  {contactInfo.address.city}, {contactInfo.address.state} {contactInfo.address.zip}
                </a>
              </p>
              <p>
                <a href={contactInfo.phoneHref} className="hover:text-accent-300 transition-colors">
                  {contactInfo.phone}
                </a>
              </p>
              <p>
                <a
                  href={contactInfo.instagramUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-accent-300 transition-colors"
                >
                  {contactInfo.instagramHandle}
                </a>
              </p>
            </address>
          </div>
        </div>

        <div className="mt-12 pt-6 border-t border-neutral-800 text-center text-[11px] text-neutral-500">
          <p>© 2026 {contactInfo.businessName}. Licensed, Bonded &amp; Fully Insured. {contactInfo.license}</p>
        </div>
      </div>
    </footer>
  );
}
