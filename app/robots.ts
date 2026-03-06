// app/robots.ts
// Generates robots.txt for search engine crawlers at /robots.txt
// Next.js automatically serves this at the /robots.txt route
// Reference: https://nextjs.org/docs/app/api-reference/file-conventions/metadata/robots
import { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  const baseUrl = "https://www.goldminecomm.net";

  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/admin/", "/api/"],
      },
    ],
    sitemap: `${baseUrl}/sitemap.xml`,
  };
}
