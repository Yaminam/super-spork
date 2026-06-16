import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/site-config";
import { BRAND_DETAILS } from "@/content/brands-detail";
import { ARTICLES } from "@/content/news";

/**
 * XML sitemap (§9, sitemap discipline). Next emits /sitemap.xml from this.
 * lastModified is a single build-stamp passed in by the runtime-safe default;
 * we keep priorities editorial, corporate entry points highest.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const u = (p: string) => `${SITE_URL}${p}`;

  const core: MetadataRoute.Sitemap = [
    { url: u("/"), changeFrequency: "weekly", priority: 1 },
    { url: u("/group"), changeFrequency: "monthly", priority: 0.9 },
    { url: u("/group/our-history"), changeFrequency: "yearly", priority: 0.6 },
    { url: u("/group/our-role-society"), changeFrequency: "monthly", priority: 0.7 },
    { url: u("/leadership"), changeFrequency: "monthly", priority: 0.8 },
    { url: u("/operations"), changeFrequency: "monthly", priority: 0.8 },
    { url: u("/brands"), changeFrequency: "monthly", priority: 0.9 },
    { url: u("/sustainability"), changeFrequency: "monthly", priority: 0.8 },
    { url: u("/investors"), changeFrequency: "weekly", priority: 0.8 },
    { url: u("/careers"), changeFrequency: "weekly", priority: 0.8 },
    { url: u("/news"), changeFrequency: "daily", priority: 0.9 },
    { url: u("/contact"), changeFrequency: "yearly", priority: 0.6 },
    { url: u("/documents"), changeFrequency: "monthly", priority: 0.6 },
    { url: u("/directory"), changeFrequency: "yearly", priority: 0.4 }];

  const brands: MetadataRoute.Sitemap = BRAND_DETAILS.map((b) => ({
    url: u(`/brands/${b.slug}`),
    changeFrequency: "monthly" as const,
    priority: 0.6,
  }));

  const news: MetadataRoute.Sitemap = ARTICLES.map((a) => ({
    url: u(`/news/${a.slug}`),
    lastModified: a.datePublished,
    changeFrequency: "yearly" as const,
    priority: 0.5,
  }));

  return [...core, ...brands, ...news];
}
