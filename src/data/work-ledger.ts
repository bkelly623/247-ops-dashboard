export type WorkArea =
  | "Site"
  | "SEO"
  | "GEO"
  | "Conversion"
  | "Authority"
  | "Measurement"
  | "Command Center"
  | "Content";

export type EvidenceStatus = "pending" | "verified" | "needs-data" | "blocked";

export type WorkLedgerEntry = {
  date: string;
  area: WorkArea;
  title: string;
  repo: "247ROI" | "247-ops-dashboard";
  commit: string;
  changed: string[];
  why: string;
  expectedEffect: string;
  evidenceStatus: EvidenceStatus;
  evidence: string;
  followUp: string;
};

export const workLedger: WorkLedgerEntry[] = [
  {
    date: "2026-09-11",
    area: "Command Center",
    title: "Added persisted Work Board updates",
    repo: "247-ops-dashboard",
    commit: "this commit",
    changed: [
      "/work",
      "/api/command-state",
      "src/lib/command-state/server.ts",
      "src/components/work-board-client.tsx",
      "COMMAND_CENTER_WRITE_TOKEN",
    ],
    why: "The command center needed to stop depending on code deploys for routine board status updates.",
    expectedEffect:
      "B and Athena can test moving board items between Backlog, This Week, In Progress, Waiting/Blocked, Needs B Approval, and Done while snapshots persist in Supabase.",
    evidenceStatus: "verified",
    evidence:
      "Local command-state GET and protected PATCH succeeded, using the existing Supabase event stream as append-only state storage. Typecheck, lint, and production build passed.",
    followUp:
      "Next upgrade is full item creation/editing from the dashboard and richer run history records for automation outputs.",
  },
  {
    date: "2026-09-11",
    area: "Command Center",
    title: "Rebuilt command center around a real Work Board and control pages",
    repo: "247-ops-dashboard",
    commit: "a4975f0",
    changed: [
      "/",
      "/work",
      "/automation",
      "/decisions",
      "/pipeline/seo",
      "/pipeline/authority",
      "/pipeline/visibility",
      "src/data/command-center-state.json",
    ],
    why: "B clarified that the command center should be an operating console, not a strategy poster. The foundation needed to move from a strategy map into a board, pipelines, automation visibility, and locked decisions.",
    expectedEffect:
      "Future operator and cron work can pull from one visible board, with separate pages for SEO, authority, AI visibility, automation run history, and decisions.",
    evidenceStatus: "verified",
    evidence:
      "Local typecheck, lint, production build, route checks, and Vercel production deployment passed for /, /work, /automation, /decisions, /pipeline/seo, /pipeline/authority, /pipeline/visibility, and /strategy redirecting to /work.",
    followUp:
      "Next upgrade is making command-state editable through the dashboard or a database-backed API instead of editing JSON directly.",
  },
  {
    date: "2026-09-11",
    area: "Measurement",
    title: "Stored first visibility baseline and authority target batch",
    repo: "247-ops-dashboard",
    commit: "this commit",
    changed: [
      "/visibility",
      "/seo",
      "/strategy",
      "src/data/visibility-snapshots.ts",
      "src/data/seo-targets.ts",
      "src/data/growth-control-plane.ts",
    ],
    why: "The growth queue needed a dated AI/search visibility baseline and a vetted authority backlog before more GEO or backlink work.",
    expectedEffect:
      "Future runs can compare visibility movement for custom AI agent and AI-search prompts, while authority work now has concrete targets, risks, required assets, and approval gates.",
    evidenceStatus: "verified",
    evidence:
      "Live command-center metrics checked first: 16 qualified 7-day page views, 24 qualified 30-day page views, 5 audit starts in 7 days, 8 in 30 days, 0 contact/CTA/unlock events; GSC current window still shows 96 impressions and 0 clicks.",
    followUp:
      "Run real ChatGPT/Gemini/Perplexity/Google AI-surface snapshots when available; next authority action is preparing Google Business Profile and LinkedIn field copy for B approval.",
  },
  {
    date: "2026-09-11",
    area: "Command Center",
    title: "Turned Strategy Map into Growth OS control plane",
    repo: "247-ops-dashboard",
    commit: "this commit",
    changed: ["/strategy", "src/data/growth-control-plane.ts", "src/data/work-ledger.ts"],
    why: "B needed the command center to show what has been done, where 247ROI stands, what is left, which work lanes exist, what recurring jobs run, and how priorities are chosen.",
    expectedEffect:
      "The command center becomes the daily operating surface instead of a loose dashboard, with visible lanes, queue status, priorities, cron registry, approval boundaries, and latest shipped work.",
    evidenceStatus: "verified",
    evidence:
      "Local typecheck, lint, and production build passed before deployment.",
    followUp:
      "Next command-center upgrade should make the queue editable/persistent instead of static TypeScript data.",
  },
  {
    date: "2026-09-10",
    area: "Command Center",
    title: "Rebuilt command center around strategy map and live operating read",
    repo: "247-ops-dashboard",
    commit: "10a4a8e",
    changed: [
      "/",
      "/strategy",
      "src/components/growth-operating-map.tsx",
      "src/data/growth-control-plane.ts",
      "src/data/growth-standing.ts",
      "src/data/seo-targets.ts",
    ],
    why: "The command center was not answering the owner questions clearly: where we stand, what has shipped, what metrics matter, what is blocked, and what gets built next.",
    expectedEffect:
      "B can open the command center and see live traffic/search metrics, top Google query/page rank context, the operating-system visual, active queue, approval boundaries, and current execution loops.",
    evidenceStatus: "verified",
    evidence:
      "Local lint and production build passed. Production deployment dpl_7XSdpwX5K3pf5JbLTDxPE13TTN4J is live with /strategy returning 200.",
    followUp:
      "Turn the remaining static queue records into an editable command-center state backend after the operating model proves useful.",
  },
  {
    date: "2026-09-10",
    area: "SEO",
    title: "Tuned AI employees small-business page from GSC signal",
    repo: "247ROI",
    commit: "10e35b9",
    changed: [
      "/ai-employees-for-small-business",
      "/ai-employees-for-service-businesses",
      "src/components/SeoLandingPage.tsx",
      "src/lib/seoLandingPages.ts",
    ],
    why: "Search Console shows the AI employee phrase family is the first query cluster earning impressions, while the AI Operations Coordinator role page has much stronger early ranking signal.",
    expectedEffect:
      "Better relevance for small-business AI employee searches and stronger crawlable internal support from role-specific workflow examples.",
    evidenceStatus: "verified",
    evidence:
      "Public lint and build passed; GSC window 2026-08-11 to 2026-09-08 showed 96 impressions, with /ai-employees-for-small-business at 68 page impressions and /ai-employees/ai-operations-coordinator at average position 15.38.",
    followUp:
      "Wait for recrawl, then compare the next GSC keyword snapshot for impressions, position movement, and whether small-business AI employee queries begin landing higher.",
  },
  {
    date: "2026-09-09",
    area: "Measurement",
    title: "Stored first Search Console keyword snapshot",
    repo: "247-ops-dashboard",
    commit: "this commit",
    changed: [
      "src/data/keyword-snapshots.ts",
      "/seo",
      "src/data/seo-targets.ts",
      "src/data/growth-standing.ts",
    ],
    why: "Search Console rows were live, but the operator needed durable dated baselines to compare future keyword movement instead of only reading the current API window.",
    expectedEffect:
      "Future runs can compare query/page movement against the first GSC baseline and choose page updates from evidence.",
    evidenceStatus: "verified",
    evidence:
      "Stored the 2026-08-10 to 2026-09-07 GSC baseline: 79 impressions, 0 clicks, average position 49.51; strongest query is ai employee for small business.",
    followUp:
      "Tune /ai-employees-for-small-business from the snapshot and run the first AI visibility prompt baseline.",
  },
  {
    date: "2026-09-08",
    area: "Measurement",
    title: "Exposed Search Console performance API",
    repo: "247-ops-dashboard",
    commit: "this commit",
    changed: [
      "/api/search-console/performance",
      "/api/integrations/status",
      "src/data/seo-targets.ts",
      "src/data/growth-standing.ts",
    ],
    why: "The recurring growth operator needed direct JSON access to Search Console query, page, and query-to-page rows instead of relying on the rendered SEO dashboard.",
    expectedEffect:
      "Cleaner recurring baselines for impressions, target URLs, average positions, and page-level query evidence.",
    evidenceStatus: "verified",
    evidence:
      "Command-center lint, typecheck, and build passed; production endpoint returned GSC performance rows for the connected get247roi.com property.",
    followUp:
      "Persist monthly keyword snapshots and keep manual SERP checks only for terms that have no GSC rows yet.",
  },
  {
    date: "2026-09-07",
    area: "Authority",
    title: "Added Brendan Kelly founder entity page",
    repo: "247ROI",
    commit: "4e17244",
    changed: ["/brendan-kelly", "/about", "sitemap.xml", "llms.txt", "llms-full.txt", "footer"],
    why: "247ROI needed a crawlable person-to-brand authority signal connecting Brendan Kelly, the company, and the business systems / AI consulting category.",
    expectedEffect:
      "Cleaner entity clarity for search and AI answer engines, stronger trust for warm referrals, and a canonical profile URL for approved external listings.",
    evidenceStatus: "verified",
    evidence:
      "Public lint/build passed with only pre-existing audit warnings; production /brendan-kelly returns 200, includes founder text and Person schema, and sitemap plus LLM files include the URL.",
    followUp: "Use the founder page as the canonical profile link in approved public profiles, directories, and referral partner materials.",
  },
  {
    date: "2026-09-07",
    area: "Command Center",
    title: "Closed founder-profile authority task",
    repo: "247-ops-dashboard",
    commit: "this commit",
    changed: ["src/data/seo-targets.ts", "src/data/work-ledger.ts"],
    why: "The recurring operator task loop needs completed authority work marked done instead of leaving old tasks in the queue.",
    expectedEffect: "A cleaner authority backlog and more accurate growth standing for future runs.",
    evidenceStatus: "verified",
    evidence: "Command-center lint, typecheck, and build passed; production /seo shows the founder-profile authority task.",
    followUp: "Keep the next authority task focused on clean directories, vetted profiles, or proof assets rather than spam backlink work.",
  },
  {
    date: "2026-09-02",
    area: "Measurement",
    title: "Corrected brand-site metric readiness",
    repo: "247-ops-dashboard",
    commit: "this commit",
    changed: ["src/lib/brand-site/server.ts", "/seo"],
    why: "The production overview could show live event counts while still labeling the site_events feed unready, which made the measurement layer look blocked when it was only partially unresolved.",
    expectedEffect:
      "More trustworthy operator metrics, clearer health status, and accurate 30-day audit start/unlock counts.",
    evidenceStatus: "verified",
    evidence: "Typecheck, lint, and build passed locally; production API recheck follows deployment.",
    followUp: "Use connected Search Console rows and add lead/booking attribution so source-of-truth metrics cover acquisition and revenue.",
  },
  {
    date: "2026-09-01",
    area: "Authority",
    title: "Added referral partner growth page",
    repo: "247ROI",
    commit: "90e9f59",
    changed: ["/referral-partners"],
    why: "Warm introductions need a dedicated page that explains who should refer 247ROI and how to frame the audit.",
    expectedEffect:
      "More credible partner shares, cleaner entity signals, and a route for non-cold traffic.",
    evidenceStatus: "pending",
    evidence: "Page is live and in sitemap; assisted traffic and introductions are not measured yet.",
    followUp: "Use in B-approved warm outreach and watch visits, replies, and audit starts.",
  },
  {
    date: "2026-09-01",
    area: "Command Center",
    title: "Updated growth scorecard for referral asset",
    repo: "247-ops-dashboard",
    commit: "bad5163",
    changed: ["/seo", "src/data/seo-targets.ts"],
    why: "The scorecard needed to reflect the new referral/authority asset instead of stale status.",
    expectedEffect: "Better current-state reporting for authority and warm traffic.",
    evidenceStatus: "verified",
    evidence: "Scorecard now includes referral-partner status and next actions.",
    followUp: "Attach actual traffic and reply evidence after distribution.",
  },
  {
    date: "2026-08-29",
    area: "Content",
    title: "Added warm traffic starter kit",
    repo: "247ROI",
    commit: "2291367",
    changed: ["docs/WARM_TRAFFIC_STARTER_KIT.md"],
    why: "247ROI needed a low-friction way to share diagnostic value with warm contacts.",
    expectedEffect: "More qualified conversations before direct sales asks.",
    evidenceStatus: "needs-data",
    evidence: "Asset exists; distribution and response data are not yet connected.",
    followUp: "Move the usable pieces into a tracked campaign view.",
  },
  {
    date: "2026-08-29",
    area: "SEO",
    title: "Added automation starting point content",
    repo: "247ROI",
    commit: "4a8d06b",
    changed: ["/what-should-my-business-automate-first"],
    why: "Owners need a practical filter before choosing AI, automation, dashboards, or process cleanup.",
    expectedEffect: "Qualified warm clicks, long-tail search reach, and a clearer audit handoff.",
    evidenceStatus: "pending",
    evidence: "Page is live and in sitemap; manual search had not observed it immediately after launch.",
    followUp: "Recheck indexation and use the page in warm distribution.",
  },
  {
    date: "2026-08-29",
    area: "Authority",
    title: "Added proof ladder to demo page",
    repo: "247ROI",
    commit: "929598c",
    changed: ["/demo"],
    why: "The site needed visible examples and proof-style artifacts without inventing client claims.",
    expectedEffect: "Higher trust and better conversion support for visitors who need to see work product.",
    evidenceStatus: "pending",
    evidence: "Visual/content improvement is live; conversion impact is not measured yet.",
    followUp: "Add this to the visual progress gallery and track demo-page assisted actions.",
  },
  {
    date: "2026-08-28",
    area: "Measurement",
    title: "Fixed unique visitor measurement",
    repo: "247-ops-dashboard",
    commit: "0582812",
    changed: ["src/lib/brand-site/server.ts"],
    why: "The dashboard needed deduped visitor counts instead of inflated event counts.",
    expectedEffect: "More honest 30-day traffic reporting.",
    evidenceStatus: "verified",
    evidence: "Production overview API now returns uniqueVisitorEvents30Days.",
    followUp: "Keep measurement health visible on the executive snapshot.",
  },
  {
    date: "2026-08-27",
    area: "SEO",
    title: "Added workflow automation consultant page",
    repo: "247ROI",
    commit: "3dc4843",
    changed: ["/workflow-automation-consultant"],
    why: "Workflow automation consultant intent deserved a dedicated page instead of relying on broader service pages.",
    expectedEffect: "Better relevance for consultant-intent searches and AI answer engines.",
    evidenceStatus: "pending",
    evidence: "Page is live; ranking/indexation baseline still needs recheck.",
    followUp: "Record the next manual SERP check in the visibility tracker.",
  },
  {
    date: "2026-08-27",
    area: "Measurement",
    title: "Activated tracking and documented growth cadence",
    repo: "247-ops-dashboard",
    commit: "3ddccb1",
    changed: ["/seo", "docs/247ROI_GOALS_AND_OPERATING_CADENCE.md"],
    why: "247ROI needed a weekly operating loop tied to proof, not loose improvement ideas.",
    expectedEffect: "More consistent measurement, prioritization, and scorecard updates.",
    evidenceStatus: "verified",
    evidence: "Cadence doc and dashboard tracking exist.",
    followUp: "Use the Work Ledger after every shipped change.",
  },
  {
    date: "2026-08-26",
    area: "SEO",
    title: "Added SEO traffic target pages",
    repo: "247ROI",
    commit: "39b1383",
    changed: [
      "/custom-business-dashboard",
      "/internal-tools-for-small-business",
      "/ai-automation-consultant-small-business",
      "/generative-engine-optimization-consultant",
    ],
    why: "The site needed crawlable pages for specific commercial and authority search clusters.",
    expectedEffect: "More query coverage and clearer AI/entity understanding.",
    evidenceStatus: "pending",
    evidence: "Pages are in sitemap; ranking proof is not yet connected.",
    followUp: "Baseline indexation and ranking for every target.",
  },
  {
    date: "2026-08-26",
    area: "Conversion",
    title: "Improved hire audit conversion flow",
    repo: "247ROI",
    commit: "fd2ad42",
    changed: ["/ai-opportunity-audit"],
    why: "The AI Opportunity Audit needed to feel like a useful diagnostic path instead of a generic chat/intake.",
    expectedEffect: "More audit starts, better completion, and clearer lead context.",
    evidenceStatus: "needs-data",
    evidence: "Command-center events are live; current audit starts and unlocks should be read from the dynamic snapshot.",
    followUp: "Capture before/after screenshots and wait for more qualified traffic before changing again.",
  },
  {
    date: "2026-08-25",
    area: "SEO",
    title: "Added AI agents SEO landing page",
    repo: "247ROI",
    commit: "93143a5",
    changed: ["/ai-agents-for-business"],
    why: "Custom AI agents for business is a core service-intent cluster for 247ROI.",
    expectedEffect: "More search relevance and a better answer-engine landing page.",
    evidenceStatus: "pending",
    evidence: "Page is live; AI answer and rank snapshots are pending.",
    followUp: "Check ChatGPT, Gemini, Perplexity, and Google AI visibility.",
  },
  {
    date: "2026-08-24",
    area: "Measurement",
    title: "Routed site events through command center",
    repo: "247ROI",
    commit: "2f42207",
    changed: ["/api/events", "docs/COMMAND_CENTER_EVENT_FLOW.md"],
    why: "Public-site behavior belongs in the command-center project, not the legacy audit backend.",
    expectedEffect: "A single operational source for page views, CTA clicks, audit starts, and conversion signals.",
    evidenceStatus: "verified",
    evidence: "Production APIs report site event counts from the command-center Supabase project.",
    followUp: "Expose event health and conversion counts on the executive snapshot.",
  },
];
