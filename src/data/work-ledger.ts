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
    followUp: "Connect Search Console, Bing, and lead/booking attribution so source-of-truth metrics cover acquisition and revenue.",
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
    changed: ["/hire"],
    why: "The AI Opportunity Audit needed to feel like a useful diagnostic path instead of a generic chat/intake.",
    expectedEffect: "More audit starts, better completion, and clearer lead context.",
    evidenceStatus: "needs-data",
    evidence: "Command center shows 2 audit starts but no unlocks yet.",
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
    followUp: "Check ChatGPT, Gemini, Perplexity, and Google/Bing visibility.",
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
