import { localBusinessJsonLd } from "@/lib/seo";

export function LocalBusinessSchema() {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessJsonLd()) }}
    />
  );
}
