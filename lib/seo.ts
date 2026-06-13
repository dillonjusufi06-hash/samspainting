import type { Metadata } from "next";
import { contactInfo } from "@/lib/contact";

export const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.samspaintingnj.com";

export const siteConfig = {
  name: "Sam's Painting",
  legalName: contactInfo.businessName,
  defaultTitle: "Sam's Painting",
  locationLabel: "North Jersey",
  ogImage: "/banner.jpg",
};

export const serviceArea = {
  hub: "Wyckoff",
  counties: ["Bergen County", "Morris County", "Essex County"],
  towns: [
    "Wyckoff",
    "Franklin Lakes",
    "Saddle River",
    "Alpine",
    "Ridgewood",
    "Ramsey",
    "Allendale",
    "Glen Rock",
    "Mahwah",
    "Tenafly",
    "Englewood Cliffs",
    "Ho-Ho-Kus",
    "Summit",
    "Short Hills",
    "Millburn",
    "Montclair",
    "Chatham",
    "Mendham",
  ],
};

export const serviceSeo: Record<
  string,
  { title: string; description: string; headline: string }
> = {
  "interior-painting": {
    title: "Interior Painting Services | North Jersey Home Painters",
    description:
      "Flawless walls, trim, and ceilings. Dust-free prep and premium paints for your North Jersey home. Call for a free design & color estimate.",
    headline: "Professional Interior Painting in North Jersey",
  },
  "exterior-painting": {
    title: "Exterior House Painting & Prep Experts | North Jersey",
    description:
      "Weather-resistant exterior painting engineered for NJ climates. Power washing, thorough scraping, and long-lasting finishes.",
    headline: "Exterior House Painting & Prep in North Jersey",
  },
  "commercial-painting": {
    title: "Commercial Painting Contractors | North Jersey Offices",
    description:
      "Office, retail, and light commercial painting. Flexible after-hours scheduling, minimal business disruption, and durable coatings.",
    headline: "Commercial Painting for North Jersey Businesses",
  },
  "deck-and-fence-staining": {
    title: "Deck & Fence Staining Services | Bergen & Morris County",
    description:
      "Protect your outdoor wood. Professional power washing, sanding, and premium deep-penetrating staining to withstand NJ winters.",
    headline: "Deck & Fence Staining in North Jersey",
  },
  "epoxy-floor-coatings": {
    title: "Garage Epoxy Floor Coatings | North Jersey Installation",
    description:
      "Turn your garage into a clean workspace. Heavy-duty, slip-resistant industrial epoxy floors built to resist oil and tire marks.",
    headline: "Garage Epoxy Floor Coatings in North Jersey",
  },
  "cabinet-painting": {
    title: "Kitchen Cabinet Painting & Refinishing | North Jersey",
    description:
      "Get a luxury factory-smooth kitchen remodel at a fraction of the cost of replacement. Durable, scratch-resistant cabinet finishes.",
    headline: "Kitchen Cabinet Painting in North Jersey",
  },
};

export const homeMetadata: Metadata = {
  title: "Professional House Painters in North Jersey | Sam's Painting",
  description:
    "Premium interior & exterior painting in Wyckoff, Franklin Lakes, Ridgewood, and North Jersey's finest neighborhoods. Fully licensed & insured. Free estimates.",
};

export const contactMetadata: Metadata = {
  title: "Request a Free Painting Estimate | Sam's Painting NJ",
  description:
    "Ready to transform your space? Call (201) 232-5978 or message us online for a free, transparent estimate in North Jersey.",
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

export function localBusinessJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "PaintingContractor",
    name: contactInfo.businessName,
    image: `${siteUrl}${siteConfig.ogImage}`,
    "@id": `${siteUrl}/#localbusiness`,
    url: siteUrl,
    telephone: "+12012325978",
    email: contactInfo.email,
    priceRange: "$$$",
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
      latitude: 41.0097,
      longitude: -74.1718,
    },
    openingHoursSpecification: {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
      opens: "07:00",
      closes: "18:00",
    },
    areaServed: serviceArea.counties.map((name) => ({
      "@type": "AdministrativeArea",
      name,
    })),
    sameAs: [contactInfo.facebookUrl],
  };
}
