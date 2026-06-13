import type { Metadata } from "next";
import { Clock, Mail, MapPin, Phone, Shield } from "lucide-react";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { ContactForm } from "@/components/contact-form";
import { contactInfo, serviceAreaTowns } from "@/lib/contact";

export const metadata: Metadata = {
  title: "Contact Sam's Painting | Free Estimates in North Jersey",
  description:
    "Call (201) 232-5978 or send a message for a free painting estimate. Serving Wayne and North Jersey.",
};

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-neutral-50 text-neutral-900 flex flex-col font-sans">
      <SiteHeader />

      <main className="flex-1">
        <section className="py-14 sm:py-20 bg-neutral-100/30 border-b border-neutral-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-8 text-center space-y-3">
            <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-neutral-900">
              Contact Us
            </h1>
            <p className="text-sm max-w-xl mx-auto text-neutral-600 leading-relaxed">
              Call for a free estimate or send a quick message. We serve homeowners and small businesses across North Jersey.
            </p>
          </div>
        </section>

        <section className="py-16 sm:py-24">
          <div className="max-w-7xl mx-auto px-4 sm:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-12 items-start">
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
                        <span className="text-lg font-extrabold text-neutral-900 group-hover:text-accent-600 transition-colors">
                          {contactInfo.phone}
                        </span>
                      </span>
                    </a>
                  </li>

                  <li>
                    <a
                      href={`mailto:${contactInfo.email}`}
                      className="flex items-start gap-4 group"
                    >
                      <span className="p-2.5 rounded-xl bg-accent-50 border border-accent-100 text-accent-500 shrink-0">
                        <Mail size={18} className="stroke-[2.5]" />
                      </span>
                      <span>
                        <span className="block text-xs font-bold uppercase tracking-wider text-neutral-500 mb-0.5">
                          Email
                        </span>
                        <span className="text-base font-bold text-neutral-900 group-hover:text-accent-600 transition-colors">
                          {contactInfo.email}
                        </span>
                      </span>
                    </a>
                  </li>

                  <li className="flex items-start gap-4">
                    <span className="p-2.5 rounded-xl bg-accent-50 border border-accent-100 text-accent-500 shrink-0">
                      <MapPin size={18} className="stroke-[2.5]" />
                    </span>
                    <span>
                      <span className="block text-xs font-bold uppercase tracking-wider text-neutral-500 mb-0.5">
                        Service Area
                      </span>
                      <span className="text-base font-bold text-neutral-900">
                        {contactInfo.location}
                      </span>
                    </span>
                  </li>

                  <li className="flex items-start gap-4">
                    <span className="p-2.5 rounded-xl bg-accent-50 border border-accent-100 text-accent-500 shrink-0">
                      <Clock size={18} className="stroke-[2.5]" />
                    </span>
                    <span>
                      <span className="block text-xs font-bold uppercase tracking-wider text-neutral-500 mb-0.5">
                        Hours
                      </span>
                      <span className="text-base font-bold text-neutral-900">
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
                      <span className="text-base font-bold text-neutral-900">
                        {contactInfo.license}
                      </span>
                    </span>
                  </li>
                </ul>

                <div>
                  <p className="text-xs font-bold uppercase tracking-wider text-neutral-500 mb-3">
                    Towns We Serve
                  </p>
                  <p className="text-sm text-neutral-600 leading-relaxed">
                    {serviceAreaTowns.join(" • ")} and surrounding North Jersey communities.
                  </p>
                </div>
              </div>

              <div className="rounded-2xl overflow-hidden border border-neutral-200 shadow-md bg-white h-[320px] sm:h-[420px] lg:h-full lg:min-h-[480px]">
                <iframe
                  title="Sam's Painting service area map"
                  src="https://www.google.com/maps?q=Wayne,+NJ+07470&z=9&output=embed"
                  className="w-full h-full border-0"
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  allowFullScreen
                />
              </div>
            </div>

            <div className="mt-16 sm:mt-20 max-w-xl mx-auto">
              <div className="text-center space-y-2 mb-8">
                <h2 className="text-xl sm:text-2xl font-extrabold tracking-tight text-neutral-900">
                  Request a Free Estimate
                </h2>
                <p className="text-sm text-neutral-600">
                  Fill out the form below and we&apos;ll get back to you shortly.
                </p>
              </div>

              <ContactForm />
            </div>
          </div>
        </section>
      </main>

      <SiteFooter />
    </div>
  );
}
