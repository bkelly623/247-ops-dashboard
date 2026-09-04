export type RankTrackingTool = {
  name: string;
  type: "open-source" | "free" | "freemium";
  fit: "best-fit" | "useful" | "watch";
  cost: string;
  strength: string;
  tradeoff: string;
  nextAction: string;
  sourceUrl: string;
};

export const rankTrackingTools: RankTrackingTool[] = [
  {
    name: "SerpBear",
    type: "open-source",
    fit: "best-fit",
    cost: "Self-hosted; needs a SERP source for stable checks",
    strength:
      "Purpose-built rank tracker with keyword history, Google position checks, and change notifications.",
    tradeoff:
      "Scraping Google directly is brittle; production use should pair it with a SERP API or careful low-volume checks.",
    nextAction:
      "Test as the owned rank-tracking layer for 247ROI once the keyword list is finalized.",
    sourceUrl: "https://github.com/towfiqi/serpbear",
  },
  {
    name: "Google Search Console",
    type: "free",
    fit: "best-fit",
    cost: "Free",
    strength:
      "Cleanest Google-owned source for queries, impressions, clicks, average position, pages, countries, and devices.",
    tradeoff:
      "Only shows data Google has collected; not a live SERP checker and requires site property access.",
    nextAction:
      "Connect GSC first because it gives the most defensible ranking trend data.",
    sourceUrl: "https://search.google.com/search-console/about",
  },
  {
    name: "SEOTesting Free Rank Tracker",
    type: "free",
    fit: "useful",
    cost: "Free tier for GSC-based rank tracking",
    strength:
      "Tracks up to 500 keywords from Search Console data with 7, 30, 90 day and yearly comparisons.",
    tradeoff:
      "Requires GSC access and sends data to a third-party SaaS.",
    nextAction:
      "Use only if we want a quick external GSC dashboard before building our own import.",
    sourceUrl: "https://seotesting.com/ranktracker/",
  },
  {
    name: "OpenSEO",
    type: "open-source",
    fit: "watch",
    cost: "Open-source; may use pay-as-you-go data sources",
    strength:
      "Broader SEO platform direction: rank tracking, competitor insights, and agent-friendly workflows.",
    tradeoff:
      "Newer and broader than our immediate need; likely more setup than SerpBear for simple rank history.",
    nextAction:
      "Evaluate after the first command-center baseline is working.",
    sourceUrl: "https://github.com/every-app/open-seo",
  },
  {
    name: "RankTank",
    type: "open-source",
    fit: "useful",
    cost: "Free Google Sheets style checker",
    strength:
      "Simple keyword rank checking workflow that can export into a spreadsheet.",
    tradeoff:
      "Small project footprint and less suitable as the durable command-center source of truth.",
    nextAction:
      "Keep as a fallback for quick spot checks, not the main system.",
    sourceUrl: "https://github.com/RankTank-Free-SEO-Tools/free-keyword-rank-checker-tool",
  },
];

