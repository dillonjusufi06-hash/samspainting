import { serviceJsonLd } from "@/lib/seo";

interface ServiceSchemaProps {
  slug: string;
}

export function ServiceSchema({ slug }: ServiceSchemaProps) {
  const data = serviceJsonLd(slug);
  if (!data) return null;

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
