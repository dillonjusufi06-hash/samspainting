import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { PageHero } from "@/components/page-hero";
import { PaintCTA } from "@/components/paint-cta";
import { SubservicesSection } from "@/components/subservices-section";
import { FaqSection } from "@/components/faq-section";
import { ContactFormSection } from "@/components/contact-form-section";
import { TestimonialsSection } from "@/components/testimonials-section";
import { ServiceSchema } from "@/components/service-schema";
import { getServiceBySlug, services } from "@/lib/services";
import { getServiceFaqs } from "@/lib/service-faqs";
import { getTestimonialsForService } from "@/lib/testimonials";
import { buildPageMetadata, serviceSeo } from "@/lib/seo";

interface ServicePageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return services.map((service) => ({ slug: service.slug }));
}

export async function generateMetadata({ params }: ServicePageProps): Promise<Metadata> {
  const { slug } = await params;
  const service = getServiceBySlug(slug);

  if (!service) {
    return { title: "Service Not Found | Sam's Painting" };
  }

  const seo = serviceSeo[slug];

  return buildPageMetadata({
    title: seo?.title ?? `${service.title} | Sam's Painting`,
    description: seo?.description ?? service.tagline,
    path: `/service/${slug}`,
  });
}

const paintBrands = [
  { name: "Benjamin Moore", url: "/brands/benjamin-moore.svg" },
  { name: "Sherwin-Williams", url: "/brands/sherwin-williams.svg" },
  { name: "PPG Paints", url: "/brands/ppg.svg" },
  { name: "Valspar Paints", url: "/brands/valspar.svg" },
];

export default async function ServicePage({ params }: ServicePageProps) {
  const { slug } = await params;
  const service = getServiceBySlug(slug);

  if (!service) {
    notFound();
  }

  const seo = serviceSeo[slug];
  const heroHeadline = seo?.headline ?? service.title;

  return (
    <div className="min-h-screen bg-neutral-50 text-neutral-900 flex flex-col font-sans">
      <ServiceSchema slug={slug} />
      <SiteHeader />

      <main className="flex-1 z-10 relative">
        <PageHero
          imageSrc={service.image}
          imageAlt={service.title}
          headline={heroHeadline}
          tagline={service.tagline}
          locationLabel="New Jersey"
        />

        <section className="py-6 overflow-hidden relative z-20 bg-white">
          <div className="relative w-full flex overflow-hidden">
            <div className="absolute top-0 bottom-0 left-0 w-20 sm:w-40 bg-gradient-to-r from-white to-transparent z-10 pointer-events-none" />
            <div className="absolute top-0 bottom-0 right-0 w-20 sm:w-40 bg-gradient-to-l from-white to-transparent z-10 pointer-events-none" />
            <div className="flex animate-marquee py-2">
              {[...paintBrands, ...paintBrands, ...paintBrands, ...paintBrands].map((brand, i) => (
                <div key={i} className="flex items-center justify-center shrink-0 w-36 h-8 relative mx-3 sm:mx-8">
                  <Image
                    src={brand.url}
                    alt={brand.name}
                    fill
                    unoptimized
                    className="object-contain opacity-85 hover:opacity-100 saturate-50 hover:saturate-100 transition-all duration-300"
                    referrerPolicy="no-referrer"
                  />
                </div>
              ))}
            </div>
          </div>
        </section>

        <SubservicesSection
          serviceTitle={service.title}
          serviceImage={service.image}
          subservices={service.subservices}
        />

        <PaintCTA />

        <TestimonialsSection
          items={getTestimonialsForService(slug)}
          serviceTitle={service.title}
        />

        <PaintCTA />

        <FaqSection items={getServiceFaqs(slug)} serviceTitle={service.title} />

        <ContactFormSection />
      </main>

      <SiteFooter />
    </div>
  );
}
