import type { Metadata } from "next";
import { HomePage } from "@/components/home-page";
import { buildPageMetadata, homeMetadata } from "@/lib/seo";

export const metadata: Metadata = buildPageMetadata({
  title: homeMetadata.title as string,
  description: homeMetadata.description as string,
  path: "/",
});

export default function Page() {
  return <HomePage />;
}
