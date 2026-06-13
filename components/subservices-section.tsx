import type { Subservice } from "@/lib/services";
import { ServiceCard } from "@/components/service-card";

interface SubservicesSectionProps {
  serviceTitle: string;
  serviceImage: string;
  subservices: Subservice[];
}

export function SubservicesSection({
  serviceTitle,
  serviceImage,
  subservices,
}: SubservicesSectionProps) {
  return (
    <section className="py-24 bg-neutral-100/30 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        <div className="space-y-3 mb-16 text-center lg:text-left">
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-neutral-900">
            Our {serviceTitle} Services
          </h2>
          <p className="text-sm max-w-2xl text-neutral-600 font-normal leading-relaxed mx-auto lg:mx-0">
            We make {serviceTitle.toLowerCase()} simple. We prep the area, protect your space, use quality materials, and leave everything clean when the job is done.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5 md:gap-6">
          {subservices.map((sub) => (
            <ServiceCard
              key={sub.title}
              title={sub.title}
              description={sub.description}
              image={serviceImage}
              imageAlt={sub.title}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
