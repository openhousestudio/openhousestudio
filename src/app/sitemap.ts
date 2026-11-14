import type { MetadataRoute } from "next";
import { site } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  return [
    { url: site.url, lastModified: now, changeFrequency: "weekly", priority: 1 },
    { url: `${site.url}/community`, lastModified: now, changeFrequency: "weekly", priority: 0.8 },
    { url: `${site.url}/legal/privacy`, lastModified: now, priority: 0.2 },
    { url: `${site.url}/legal/terms`, lastModified: now, priority: 0.2 },
  ];
}
