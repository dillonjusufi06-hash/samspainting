import { services } from "@/lib/services";
import { siteUrl } from "@/lib/seo";

export function GET() {
  const lastModified = new Date().toISOString();

  const pages = [
    { loc: siteUrl, priority: "1.0", changefreq: "weekly" },
    { loc: `${siteUrl}/contact`, priority: "0.9", changefreq: "monthly" },
    ...services.map((service) => ({
      loc: `${siteUrl}/service/${service.slug}`,
      priority: "0.8",
      changefreq: "monthly",
    })),
  ];

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${pages
  .map(
    (page) => `  <url>
    <loc>${page.loc}</loc>
    <lastmod>${lastModified}</lastmod>
    <changefreq>${page.changefreq}</changefreq>
    <priority>${page.priority}</priority>
  </url>`
  )
  .join("\n")}
</urlset>`;

  return new Response(xml, {
    headers: {
      "Content-Type": "application/xml",
    },
  });
}
