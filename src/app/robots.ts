import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/api/", "/ip-portfolio"],
      },
    ],
    sitemap: "https://aragon-website-livid.vercel.app/sitemap.xml",
  };
}
