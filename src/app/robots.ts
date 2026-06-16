import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/site-config";

/**
 * robots.txt (§9). We explicitly welcome the major answer-engine crawlers
 * (GEO/AEO) for public corporate content, alongside standard search bots.
 * Confidential or regulated paths would be disallowed here at launch.
 */
export default function robots(): MetadataRoute.Robots {
  const answerEngines = ["GPTBot", "OAI-SearchBot", "ChatGPT-User", "PerplexityBot", "Google-Extended", "Claude-Web", "ClaudeBot", "Applebot-Extended"];

  return {
    rules: [
      { userAgent: "*", allow: "/" },
      ...answerEngines.map((ua) => ({ userAgent: ua, allow: "/" })),
    ],
    sitemap: `${SITE_URL}/sitemap.xml`,
    host: SITE_URL,
  };
}
