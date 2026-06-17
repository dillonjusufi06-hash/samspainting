import type { Metadata } from "next";
import { Clock, MapPin, Phone, Shield } from "lucide-react";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { PageHero } from "@/components/page-hero";
import { ContactFormBlock } from "@/components/contact-form-section";
import { contactInfo } from "@/lib/contact";
import { buildPageMetadata, contactMetadata, heroHeadlines } from "@/lib/seo";

export const metadata: Metadata = buildPageMetadata({
  title: contactMetadata.title as string,
  description: contactMetadata.description as string,
  path: "/contact",
});

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-neutral-50 text-neutral-900 flex flex-col font-sans">
      <SiteHeader />

      <main className="flex-1">
        <PageHero
          imageSrc="/banner.jpg"
          imageAlt="Contact Sam's Painting"
          headline={heroHeadlines.contact}
          tagline="Call or send a message below for a free, no-pressure estimate from North Jersey's most trusted painting crew."
          showLocation
          showPhoneCta={false}
        />

        <section className="py-16 sm:py-24">
          <div className="max-w-7xl mx-auto px-4 sm:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-12 lg:items-stretch">
              <div className="space-y-8">
                <div className="space-y-3">
                  <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-neutral-900">
                    Get in Touch
                  </h2>
                  <p className="text-sm text-neutral-600 leading-relaxed max-w-md">
                    The fastest way to get started is a quick phone call. We answer questions, schedule free estimates, and give you a clear price before any work begins.
                  </p>
                </div>

                <ul className="space-y-5">
                  <li>
                    <a
                      href={contactInfo.phoneHref}
                      className="flex items-start gap-4 group"
                    >
                      <span className="p-2.5 rounded-xl bg-accent-50 border border-accent-100 text-accent-500 shrink-0">
                        <Phone size={18} className="stroke-[2.5]" />
                      </span>
                      <span>
                        <span className="block text-xs font-bold uppercase tracking-wider text-neutral-500 mb-0.5">
                          Phone
                        </span>
                        <span className="text-base font-extrabold text-neutral-900 group-hover:text-accent-600 transition-colors">
                          {contactInfo.phone}
                        </span>
                      </span>
                    </a>
                  </li>

                  <li>
                    <a
                      href={contactInfo.mapsUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-start gap-4 group"
                    >
                      <span className="p-2.5 rounded-xl bg-accent-50 border border-accent-100 text-accent-500 shrink-0">
                        <MapPin size={18} className="stroke-[2.5]" />
                      </span>
                      <span>
                        <span className="block text-xs font-bold uppercase tracking-wider text-neutral-500 mb-0.5">
                          Office
                        </span>
                        <span className="text-base font-extrabold text-neutral-900 group-hover:text-accent-600 transition-colors">
                          {contactInfo.fullAddress}
                        </span>
                      </span>
                    </a>
                  </li>

                  <li className="flex items-start gap-4">
                    <span className="p-2.5 rounded-xl bg-accent-50 border border-accent-100 text-accent-500 shrink-0">
                      <Clock size={18} className="stroke-[2.5]" />
                    </span>
                    <span>
                      <span className="block text-xs font-bold uppercase tracking-wider text-neutral-500 mb-0.5">
                        Hours
                      </span>
                      <span className="text-base font-extrabold text-neutral-900">
                        {contactInfo.hours}
                      </span>
                    </span>
                  </li>

                  <li className="flex items-start gap-4">
                    <span className="p-2.5 rounded-xl bg-accent-50 border border-accent-100 text-accent-500 shrink-0">
                      <Shield size={18} className="stroke-[2.5]" />
                    </span>
                    <span>
                      <span className="block text-xs font-bold uppercase tracking-wider text-neutral-500 mb-0.5">
                        Licensed &amp; Insured
                      </span>
                      <span className="text-base font-extrabold text-neutral-900">
                        {contactInfo.license}
                      </span>
                    </span>
                  </li>
                </ul>
              </div>

              <div className="rounded-2xl overflow-hidden border border-neutral-200 shadow-md bg-white h-[280px] sm:h-[320px] lg:h-full min-h-[280px]">
                <iframe
                  title={`Sam's Painting — ${contactInfo.fullAddress}`}
                  src={`${contactInfo.mapsUrl}&z=14&output=embed`}
                  className="w-full h-full border-0"
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  allowFullScreen
                />
              </div>
            </div>

            <div className="mt-16 sm:mt-20">
              <ContactFormBlock />
            </div>
          </div>
        </section>
      </main>

      <SiteFooter />
    </div>
  );
}
