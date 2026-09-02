export type StandingArea =
  | "overall"
  | "positioning"
  | "technical"
  | "crawlability"
  | "seo"
  | "ranking"
  | "ai-visibility"
  | "content"
  | "warm-traffic"
  | "conversion-path"
  | "conversion-proof"
  | "authority"
  | "measurement"
  | "trust-proof";

export type StandingScore = {
  id: StandingArea;
  area: string;
  score: number;
  targetScore: number;
  trend: "baseline" | "improving" | "stalled" | "declining";
  lastUpdated: string;
  currentStanding: string;
  proofHave: string;
  proofMissing: string;
  nextAction: string;
  evidence: string[];
};

export const standingScores: StandingScore[] = [
  {
    id: "overall",
    area: "Overall Site",
    score: 6,
    targetScore: 8,
    trend: "improving",
    lastUpdated: "2026-09-01",
    currentStanding:
      "The site is live, clearer, internally linked, and now has diagnostic, service, AI visibility, proof, and referral assets. The weak point is proof of demand.",
    proofHave:
      "Recent pages are deployed, sitemap dates are current, event ingestion is live, and Google sees several core pages.",
    proofMissing:
      "Sustained traffic, target keyword positions, Search Console query data, AI answer mentions, backlinks, calls, and report unlocks.",
    nextAction:
      "Turn the command center into the source of truth, then baseline visibility and build proof assets from measured gaps.",
    evidence: ["/", "/seo", "https://www.get247roi.com/sitemap.xml"],
  },
  {
    id: "positioning",
    area: "Positioning",
    score: 7,
    targetScore: 8.5,
    trend: "improving",
    lastUpdated: "2026-09-01",
    currentStanding:
      "The front-door message is coherent: find the bottleneck worth fixing first, then build practical systems with AI, automation, dashboards, apps, and agents.",
    proofHave:
      "Homepage, About, Services, audit, and service pages now use business-systems and bottleneck-first language.",
    proofMissing:
      "Buyer-language validation from warm replies, audit conversations, sales objections, and qualified inbound leads.",
    nextAction:
      "Keep cutting tool-first language and use the Work Ledger to connect messaging changes to traffic or replies.",
    evidence: ["https://www.get247roi.com/", "https://www.get247roi.com/about"],
  },
  {
    id: "technical",
    area: "Technical Health",
    score: 8,
    targetScore: 9,
    trend: "improving",
    lastUpdated: "2026-09-01",
    currentStanding:
      "Core production pages respond, builds have been passing, sitemap and llms files work, and event forwarding is configured.",
    proofHave:
      "Production APIs are live and command-center integration status reports Supabase, PostFast, and brand-site tracking configured.",
    proofMissing:
      "Search Console coverage, Bing Webmaster coverage, production error monitoring, and a cleaner lint baseline.",
    nextAction: "Add the technical checks to the weekly command-center review.",
    evidence: ["/settings", "https://247-ops-dashboard.vercel.app/api/integrations/status"],
  },
  {
    id: "crawlability",
    area: "Crawlability",
    score: 7.5,
    targetScore: 9,
    trend: "improving",
    lastUpdated: "2026-09-01",
    currentStanding:
      "Strategic pages are crawlable and included in the sitemap and llms files. Internal links support the newer pages.",
    proofHave:
      "Sitemap includes the current core service, audit, article, referral, and AI visibility pages with Sep 1 timestamps.",
    proofMissing: "Search Console and Bing indexing status for newer commercial pages.",
    nextAction: "Submit and inspect P1 URLs once account-level webmaster access is available.",
    evidence: ["https://www.get247roi.com/sitemap.xml", "https://www.get247roi.com/llms.txt"],
  },
  {
    id: "seo",
    area: "SEO",
    score: 5,
    targetScore: 8,
    trend: "improving",
    lastUpdated: "2026-09-01",
    currentStanding:
      "Target pages exist for the main commercial clusters, but true ranking and impression data is still not connected.",
    proofHave:
      "P1 and P2 page list exists; manual site searches show Google has discovered the domain and several core URLs.",
    proofMissing:
      "Keyword positions, query impressions, click data, ranking URL matches, and monthly deltas.",
    nextAction: "Run manual baselines now and replace them with Search Console/Bing data later.",
    evidence: ["/seo", "/visibility"],
  },
  {
    id: "ranking",
    area: "Ranking Proof",
    score: 3,
    targetScore: 8,
    trend: "baseline",
    lastUpdated: "2026-09-01",
    currentStanding:
      "Google sees the site, but newer money pages are not reliably observed in manual checks and true rank positions are not stored.",
    proofHave:
      "Homepage, About, Services, Contact, AI employee, lead-response, transcript, and legal pages appear in site searches.",
    proofMissing:
      "Exact positions, non-site-restricted rankings, local intent SERPs, and Search Console confirmations.",
    nextAction: "Keep a dated rank-proof record for every manual or connected query check.",
    evidence: ["/visibility"],
  },
  {
    id: "ai-visibility",
    area: "AI Visibility",
    score: 4,
    targetScore: 8,
    trend: "improving",
    lastUpdated: "2026-09-01",
    currentStanding:
      "The site has llms files, schema, and AI visibility pages, but answer-engine presence has not been proven.",
    proofHave: "Dedicated AI visibility and GEO pages are live.",
    proofMissing:
      "ChatGPT, Gemini, Perplexity, Bing, and Google AI answer snapshots for tracked prompts.",
    nextAction: "Run the first AI answer snapshot and store absence as useful evidence, not failure.",
    evidence: ["/visibility", "https://www.get247roi.com/ai-visibility-optimization"],
  },
  {
    id: "conversion-proof",
    area: "Conversion Proof",
    score: 2,
    targetScore: 8,
    trend: "baseline",
    lastUpdated: "2026-09-01",
    currentStanding:
      "The site has a clearer audit path, but there is too little traffic to judge conversion performance.",
    proofHave:
      "Command-center events show 2 AI Opportunity Audit starts and working event ingestion.",
    proofMissing:
      "CTA clicks, phone clicks, email clicks, report unlocks, booked calls, lead quality notes, and enough qualified sessions.",
    nextAction: "Drive qualified traffic before making fine conversion judgments.",
    evidence: ["https://247-ops-dashboard.vercel.app/api/brand-site/overview"],
  },
  {
    id: "authority",
    area: "Authority",
    score: 2.5,
    targetScore: 8,
    trend: "baseline",
    lastUpdated: "2026-09-01",
    currentStanding:
      "The referral-partner page gives warm introductions a home, but external authority is still thin.",
    proofHave: "Referral partner asset is live and can support introductions.",
    proofMissing:
      "Consistent founder/company profiles, third-party mentions, citations, partner links, backlinks, and proof examples.",
    nextAction: "Create a legitimate authority target list and avoid low-quality backlink work.",
    evidence: ["https://www.get247roi.com/referral-partners"],
  },
  {
    id: "measurement",
    area: "Measurement",
    score: 6.5,
    targetScore: 8.5,
    trend: "improving",
    lastUpdated: "2026-09-02",
    currentStanding:
      "Public event ingestion is live and visible in the command center. The overview API now separates 7-day and 30-day audit counts and reports partial metric failures without calling the whole feed unready.",
    proofHave:
      "Supabase, PostFast, and brand-site integration status are configured; site event counts return from production with a clearer feed health status.",
    proofMissing:
      "Search Console, Bing Webmaster, keyword baseline automation, AI snapshot automation, booked-call attribution, and revenue attribution.",
    nextAction: "Use manual proof tracking until account-level sources are connected, then replace partial API counts with connected search and lead data.",
    evidence: ["/settings", "https://247-ops-dashboard.vercel.app/api/brand-site/overview"],
  },
];
