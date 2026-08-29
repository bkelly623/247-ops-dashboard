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
    query: 'site:get247roi.com "what should my business automate first"',
    checkedAt: "2026-08-29T14:48:00Z",
    source: "manual-search",
    observed247RoiUrls: [],
    standing: "not-observed",
    notes:
      "The diagnostic page and article are live and in sitemap/llms files, but they were published today and have not been observed in search results yet.",
    nextAction:
      "Submit/check in Search Console when available, share through warm traffic now, and recheck indexation after crawl delay.",
  },
  {
    query: 'site:get247roi.com "business process automation consultant"',
    checkedAt: "2026-08-29T14:48:00Z",
    source: "manual-search",
    observed247RoiUrls: ["/ai-employees-for-small-business"],
    standing: "stale-result",
    notes:
      "Manual search did not surface the dedicated target page in the observed result set; search instead returned another 247ROI service page with broader business-systems language.",
    nextAction:
      "Strengthen internal links and recheck after crawl delay; submit the dedicated URL in Search Console when access is connected.",
  },
  {
    query: 'site:get247roi.com "custom AI agents for business"',
    checkedAt: "2026-08-29T14:48:00Z",
    source: "manual-search",
    observed247RoiUrls: ["/ai-employees-for-small-business"],
    standing: "stale-result",
    notes:
      "Manual search saw 247ROI content, but not the dedicated /ai-agents-for-business target page in the observed result set.",
    nextAction:
      "Add more supporting links and proof examples around custom AI agents; recheck indexation and rankings after recrawl.",
  },
  {
    query: 'site:get247roi.com "AI visibility optimization"',
    checkedAt: "2026-08-29T14:48:00Z",
    source: "manual-search",
    observed247RoiUrls: [],
    standing: "not-observed",
    notes:
      "The AI visibility page is live and technically available, but was not observed in the first manual search result set.",
    nextAction:
      "Strengthen entity/citation support from About, llms files, and authority profiles; recheck after crawl delay.",
  },
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
    query: 'site:get247roi.com "workflow automation consultant"',
    checkedAt: "2026-08-27T14:13:00Z",
    source: "manual-search",
    observed247RoiUrls: [],
    standing: "not-observed",
    notes:
      "Before this run, the command-center target pointed to workflow automation consultant intent, but the public site did not have a dedicated /workflow-automation-consultant URL.",
    nextAction:
      "Dedicated page is now being shipped; verify production, sitemap, and llms coverage, then recheck indexation after crawl delay.",
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
