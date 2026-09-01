export type Viewport = "desktop" | "mobile" | "desktop + mobile";

export type VisualProgressItem = {
  date: string;
  page: string;
  url: string;
  viewport: Viewport;
  title: string;
  before: string;
  after: string;
  whyItMatters: string;
  screenshotStatus: "needed" | "queued" | "captured";
  evidenceStatus: "visual" | "needs-screenshot" | "needs-traffic";
};

export const visualProgressItems: VisualProgressItem[] = [
  {
    date: "2026-08-24",
    page: "Homepage",
    url: "https://www.get247roi.com/",
    viewport: "desktop + mobile",
    title: "Sharper audit conversion path",
    before:
      "The homepage leaned more heavily into broad AI employee positioning and did not make the diagnostic first step as clear.",
    after:
      "The first step is now framed around finding the bottleneck worth fixing before buying AI, automation, dashboards, or custom software.",
    whyItMatters:
      "The homepage now explains 247ROI as a business-systems operator instead of another AI-tool pitch.",
    screenshotStatus: "queued",
    evidenceStatus: "needs-screenshot",
  },
  {
    date: "2026-08-26",
    page: "AI Opportunity Audit",
    url: "https://www.get247roi.com/hire",
    viewport: "desktop + mobile",
    title: "Guided audit flow and triage",
    before:
      "The audit destination was closer to a chat/intake screen and did less to route owners by bottleneck.",
    after:
      "The page now uses diagnostic framing, bottleneck choices, examples, proof/routing, and conversion tracking.",
    whyItMatters:
      "This is the main conversion path, so clarity and trust here matter more than polishing secondary pages.",
    screenshotStatus: "queued",
    evidenceStatus: "needs-traffic",
  },
  {
    date: "2026-08-26",
    page: "Service Pages",
    url: "https://www.get247roi.com/services",
    viewport: "desktop + mobile",
    title: "Clearer commercial routes",
    before:
      "Core service intent was spread across fewer pages and relied on broader messaging.",
    after:
      "Dedicated pages now exist for business process automation, workflow automation, custom AI agents, custom dashboards, internal tools, AI automation consulting, AI visibility, and GEO.",
    whyItMatters:
      "Search engines, AI systems, and buyers need specific crawlable pages for specific problems.",
    screenshotStatus: "queued",
    evidenceStatus: "needs-screenshot",
  },
  {
    date: "2026-08-29",
    page: "Demo",
    url: "https://www.get247roi.com/demo",
    viewport: "desktop",
    title: "Proof ladder added",
    before:
      "The site did not have enough visible proof-style material to show how 247ROI thinks and what output looks like.",
    after:
      "The demo page now has stronger proof-ladder framing for example work without inventing client claims.",
    whyItMatters:
      "Trust/proof is one of the weakest current areas, so examples need to become more visible.",
    screenshotStatus: "queued",
    evidenceStatus: "needs-screenshot",
  },
  {
    date: "2026-09-01",
    page: "Referral Partners",
    url: "https://www.get247roi.com/referral-partners",
    viewport: "desktop + mobile",
    title: "Warm introduction asset",
    before:
      "There was no dedicated page for MSPs, consultants, CRM implementers, or trusted operators to refer 247ROI.",
    after:
      "Referral partners now have a page that explains fit, positioning, and the audit handoff.",
    whyItMatters:
      "Warm traffic and authority are weak spots; partner-friendly pages can support both.",
    screenshotStatus: "queued",
    evidenceStatus: "needs-traffic",
  },
];
