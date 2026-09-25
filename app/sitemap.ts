import type { MetadataRoute } from "next";
import { siteUrl } from "@/content/profile";
import { projects } from "@/content/projects";

export default function sitemap(): MetadataRoute.Sitemap {
  const paths = ["/", "/projects", "/resume", ...projects.map((p) => `/projects/${p.slug}`)];
  return paths.map((path) => ({ url: new URL(path, siteUrl).toString() }));
}
