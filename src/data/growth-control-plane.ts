export type QueueStatus = "active" | "queued" | "held" | "done";
export type QueueArea = "Measurement" | "Acquisition" | "Authority" | "Conversion";

export type GrowthQueueItem = {
  area: QueueArea;
  title: string;
  status: QueueStatus;
  owner: "Athena" | "Athena + B";
  proof: string;
  nextAction: string;
};

export type OperatingLoop = {
  name: string;
  cadence: string;
  owner: string;
  status: "active" | "candidate" | "held";
  purpose: string;
};

export const northStar =
  "247ROI should make owners and operators understand the bottleneck worth fixing first, then route them into practical systems that save time and create ROI.";

export const offerStack = [
  {
    label: "Primary conversion spine",
    value: "AI Opportunity Audit",
    note: "One front door for diagnosis before implementation.",
  },
  {
    label: "Package 1",
    value: "Smart Site Foundation",
    note: "Fix the web infrastructure and entity layer AI/search need.",
  },
  {
    label: "Package 2",
    value: "AI Visibility Growth Program",
    note: "Support SEO, AI citations, schema, entity clarity, and proof.",
  },
  {
    label: "Implementation paths",
    value: "Automation, dashboards, internal tools, AI agents",
    note: "Built after the audit shows the highest-value bottleneck.",
  },
];

export const operatingLoops: OperatingLoop[] = [
  {
    name: "Athena Orchestrator",
    cadence: "Every 247ROI decision",
    owner: "Athena",
    status: "active",
    purpose: "Own strategy, prioritization, memory, approval boundaries, verification, and command-center state.",
  },
  {
    name: "Daily Growth Operator",
    cadence: "Weekdays at 14:00 UTC",
    owner: "OpenClaw cron",
    status: "active",
    purpose: "Pull metrics, choose one queue item, ship or record a precise blocker, then update state.",
  },
  {
    name: "Weekly Growth Report",
    cadence: "Fridays at 16:00 UTC",
    owner: "OpenClaw cron",
    status: "active",
    purpose: "Report what shipped, what moved, what is blocked, and what should happen next.",
  },
  {
    name: "Temporary Research Agents",
    cadence: "Only for bounded batches",
    owner: "Athena spawned workers",
    status: "candidate",
    purpose: "Research authority targets, compare opportunities, or prepare drafts. They do not own strategy.",
  },
];

export const growthQueue: GrowthQueueItem[] = [
  {
    area: "Measurement",
    title: "Run first AI visibility baseline",
    status: "active",
    owner: "Athena",
    proof: "Prompt, answer engine, cited domains, competitors, 247ROI presence, citation status, and next improvement.",
    nextAction: "Record the first ChatGPT, Gemini, Perplexity, and Google AI-surface read for the tracked prompts.",
  },
  {
    area: "Acquisition",
    title: "Compare AI employees page after recrawl",
    status: "active",
    owner: "Athena",
    proof: "GSC movement versus the 2026-09-09 and 2026-09-10 baselines.",
    nextAction: "Wait for the next Search Console window, then compare impressions, average position, and landing page.",
  },
  {
    area: "Acquisition",
    title: "Baseline commercial pages with no GSC rows",
    status: "active",
    owner: "Athena",
    proof: "Indexed/not observed, target URL, query checked, and next internal-link/content action.",
    nextAction: "Check only important pages missing GSC evidence instead of rechecking everything.",
  },
  {
    area: "Authority",
    title: "Create vetted authority target list",
    status: "active",
    owner: "Athena",
    proof: "Target name, URL, type, relevance, authority rationale, submission path, risk, required assets, and approval need.",
    nextAction: "Use temporary research agents for a bounded target batch, then score and filter before any public action.",
  },
  {
    area: "Authority",
    title: "Build one workflow teardown proof asset",
    status: "queued",
    owner: "Athena",
    proof: "Public page or asset showing problem, system shape, human approval points, measurable outcome, and audit CTA.",
    nextAction: "Choose lead follow-up, owner dashboard, inbox/admin handoff, or estimate follow-up.",
  },
  {
    area: "Acquisition",
    title: "Build one trade-specific workflow page",
    status: "queued",
    owner: "Athena",
    proof: "Real workflow pain, specific examples, internal links, schema where useful, audit CTA, sitemap and llms coverage.",
    nextAction: "Start with plumbers or HVAC only after the current measurement and authority queue is cleaner.",
  },
  {
    area: "Conversion",
    title: "Hold major conversion redesigns",
    status: "held",
    owner: "Athena",
    proof: "Current traffic is too low to infer conversion friction reliably.",
    nextAction: "Add proof to the audit path only where it improves trust without splitting the funnel.",
  },
];

export const approvalBoundaries = [
  "No public outreach without B approval.",
  "No profile or directory submissions without approval.",
  "No paid tools, ads, backlinks, or listings without approval.",
  "No claims, case studies, testimonials, or public statements that are not backed by real proof.",
];
