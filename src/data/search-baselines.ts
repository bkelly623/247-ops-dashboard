export type SearchBaseline = {
  query: string;
  checkedAt: string;
  source: "manual-search";
  observed247RoiUrls: string[];
  standing: "indexed" | "not-observed" | "stale-result";
  notes: string;
  nextAction: string;
};

export const searchBaselines: SearchBaseline[] = [
  {
    query: "site:get247roi.com 247ROI",
    checkedAt: "2026-08-26T22:59:00Z",
    source: "manual-search",
    observed247RoiUrls: [
      "/",
      "/ai-employees-for-small-business",
      "/terms-of-service",
      "/ai-employees-for-service-businesses",
      "/ai-lead-response-system",
      "/about",
      "/contact",
      "/ai-employees/ai-operations-coordinator",
      "/transcripts/missed-calls-12740-week",
      "/services",
    ],
    standing: "indexed",
    notes:
      "Manual search shows Google has discovered several current 247ROI pages, including homepage, AI employee pages, lead response, About, services, and transcript content.",
    nextAction:
      "Keep expanding internal links and submit/check newer commercial pages once Search Console or manual indexing checks are available.",
  },
  {
    query: 'site:get247roi.com "AI automation consultant for small business"',
    checkedAt: "2026-08-26T22:59:00Z",
    source: "manual-search",
    observed247RoiUrls: [],
    standing: "not-observed",
    notes:
      "The new AI automation consultant page was live in production but not observed in the first manual search result set immediately after launch.",
    nextAction:
      "Check indexation again after crawl delay, strengthen internal links, and submit in Search Console once access is available.",
  },
  {
    query: 'site:get247roi.com "custom business dashboard"',
    checkedAt: "2026-08-26T22:59:00Z",
    source: "manual-search",
    observed247RoiUrls: [],
    standing: "not-observed",
    notes:
      "The new custom business dashboard page was live in production but not observed in the first manual search result set immediately after launch.",
    nextAction:
      "Add/support internal links from services, automation, internal tools, and dashboard-adjacent pages; recheck indexation after crawl delay.",
  },
  {
    query: 'site:get247roi.com "generative engine optimization consultant"',
    checkedAt: "2026-08-26T22:59:00Z",
    source: "manual-search",
    observed247RoiUrls: [],
    standing: "not-observed",
    notes:
      "The new GEO consultant page was live in production but not observed in the first manual search result set immediately after launch.",
    nextAction:
      "Strengthen links from AI visibility optimization and About/entity pages, then recheck after crawl delay.",
  },
  {
    query: "site:get247roi.com contact 247ROI",
    checkedAt: "2026-08-26T22:59:00Z",
    source: "manual-search",
    observed247RoiUrls: ["/contact"],
    standing: "stale-result",
    notes:
      "The search result snippet still showed older AI Employee Audit/Pricing language, while production HTML now shows AI Opportunity Audit copy. This appears to be a stale Google result.",
    nextAction:
      "Keep contact copy consistent, recheck after recrawl, and avoid using /contact as a primary SEO landing page.",
  },
];
