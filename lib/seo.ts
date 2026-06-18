import type { Metadata } from "next";
import { contactInfo } from "@/lib/contact";
import { getServiceBySlug, services } from "@/lib/services";

export const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.samspaintingnj.com";

export const siteConfig = {
  name: "Sam's Painting",
  ogImage: "/banner.jpg",
  favicon: "/favicon.svg",
};

export const heroHeadlines = {
  home: "Professional Painting Services",
  homeTagline:
    "Based in Franklin Lakes and serving all of New Jersey. We show up on time, do clean work, use quality paint, and leave your home looking fresh.",
  contact: "#1 Rated Painting Contractor",
} as const;

export const serviceSeo: Record<
  string,
  { title: string; description: string; headline: string }
> = {
  "interior-painting": {
    title: "Interior Painting Services | North Jersey Home Painters",
    description:
      "Flawless walls, trim, and ceilings. Dust-free prep and premium paints for your North Jersey home. Call for a free design & color estimate.",
    headline: "Interior Painting Services You Can Trust",
  },
  "exterior-painting": {
    title: "Exterior House Painting & Prep Experts | North Jersey",
    description:
      "Weather-resistant exterior painting engineered for NJ climates. Power washing, thorough scraping, and long-lasting finishes.",
    headline: "Exterior Painting Services You Can Trust",
  },
  "commercial-painting": {
    title: "Commercial Painting Contractors | North Jersey Offices",
    description:
      "Office, retail, and light commercial painting. Flexible after-hours scheduling, minimal business disruption, and durable coatings.",
    headline: "Commercial Painting Services You Can Trust",
  },
  "deck-and-fence-staining": {
    title: "Deck & Fence Staining Services | Bergen & Morris County",
    description:
      "Protect your outdoor wood. Professional power washing, sanding, and premium deep-penetrating staining to withstand NJ winters.",
    headline: "Deck and Fence Staining Services You Can Trust",
  },
  "epoxy-floor-coatings": {
    title: "Garage Epoxy Floor Coatings | North Jersey Installation",
    description:
      "Turn your garage into a clean workspace. Heavy-duty, slip-resistant industrial epoxy floors built to resist oil and tire marks.",
    headline: "Epoxy Floor Coating Services You Can Trust",
  },
  "cabinet-painting": {
    title: "Kitchen Cabinet Painting & Refinishing | North Jersey",
    description:
      "Get a luxury factory-smooth kitchen remodel at a fraction of the cost of replacement. Durable, scratch-resistant cabinet finishes.",
    headline: "Cabinet Painting Services You Can Trust",
  },
};

export const homeMetadata: Metadata = {
  title: "Professional House Painters in North Jersey | Sam's Painting",
  description:
    "Premium interior & exterior painting in Franklin Lakes, Ridgewood, and North Jersey's finest neighborhoods. Fully licensed & insured. Free estimates.",
};

export const contactMetadata: Metadata = {
  title: "Request a Free Painting Estimate | Sam's Painting NJ",
  description:
    "Ready to transform your space? Call (201) 903-2872 or message us online for a free, transparent estimate in North Jersey.",
};

export function buildPageMetadata({
  title,
  description,
  path = "",
}: {
  title: string;
  description: string;
  path?: string;
}): Metadata {
  const url = `${siteUrl}${path}`;

  return {
    title,
    description,
    icons: {
      icon: [{ url: siteConfig.favicon, type: "image/svg+xml" }],
      shortcut: [siteConfig.favicon],
      apple: [{ url: siteConfig.favicon, type: "image/svg+xml" }],
    },
    openGraph: {
      title,
      description,
      url,
      siteName: siteConfig.name,
      locale: "en_US",
      type: "website",
      images: [
        {
          url: `${siteUrl}${siteConfig.ogImage}`,
          width: 1200,
          height: 630,
          alt: "Sam's Painting — North Jersey house painters",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [`${siteUrl}${siteConfig.ogImage}`],
    },
  };
}

const areaServedSchema = [
  { "@type": "AdministrativeArea", name: "Bergen County" },
  { "@type": "AdministrativeArea", name: "Morris County" },
  { "@type": "AdministrativeArea", name: "Essex County" },
];

function absoluteImageUrl(image: string) {
  return image.startsWith("http") ? image : `${siteUrl}${image.startsWith("/") ? image : `/${image}`}`;
}

export function serviceJsonLd(slug: string) {
  const service = getServiceBySlug(slug);
  if (!service) return null;

  const seo = serviceSeo[slug];
  const path = `/service/${slug}`;
  const url = `${siteUrl}${path}`;

  return {
    "@context": "https://schema.org",
    "@type": "Service",
    "@id": `${url}#service`,
    name: service.title,
    description: seo?.description ?? service.tagline,
    url,
    image: absoluteImageUrl(service.image),
    serviceType: service.title,
    category: "Painting",
    provider: {
      "@type": ["LocalBusiness", "PaintingContractor"],
      "@id": `${siteUrl}/#localbusiness`,
      name: contactInfo.businessName,
      url: siteUrl,
      telephone: "+12019032872",
    },
    areaServed: areaServedSchema,
    offers: {
      "@type": "Offer",
      url: `${siteUrl}/contact`,
      priceCurrency: "USD",
      availability: "https://schema.org/InStock",
      description: "Free estimates available",
    },
  };
}

export function localBusinessJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": ["LocalBusiness", "PaintingContractor"],
    name: contactInfo.businessName,
    image: `${siteUrl}${siteConfig.ogImage}`,
    "@id": `${siteUrl}/#localbusiness`,
    url: siteUrl,
    telephone: "+12019032872",
    priceRange: "$$",
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: "5.0",
      reviewCount: "821",
    },
    address: {
      "@type": "PostalAddress",
      streetAddress: contactInfo.address.street,
      addressLocality: contactInfo.address.city,
      addressRegion: contactInfo.address.state,
      postalCode: contactInfo.address.zip,
      addressCountry: "US",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: 41.0164,
      longitude: -74.2057,
    },
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: [
          "Monday",
          "Tuesday",
          "Wednesday",
          "Thursday",
          "Friday",
          "Saturday",
          "Sunday",
        ],
        opens: "00:00",
        closes: "23:59",
      },
    ],
    areaServed: areaServedSchema,
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "Painting Services",
      itemListElement: services.map((service, index) => ({
        "@type": "Offer",
        position: index + 1,
        itemOffered: {
          "@type": "Service",
          name: service.title,
          description: service.tagline,
          url: `${siteUrl}/service/${service.slug}`,
        },
      })),
    },
    sameAs: [contactInfo.instagramUrl],
  };
}
