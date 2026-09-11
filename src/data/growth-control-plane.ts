export type QueueStatus = "active" | "queued" | "blocked" | "waiting" | "held" | "done";
export type QueueArea =
  | "Strategy"
  | "Measurement"
  | "Acquisition"
  | "Authority"
  | "Conversion"
  | "Operations";

export type GrowthQueueItem = {
  area: QueueArea;
  title: string;
  status: QueueStatus;
  owner: "Athena" | "Athena + B";
  priority: "P0" | "P1" | "P2" | "P3";
  impact: string;
  evidenceSource: string;
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

export type GrowthLane = {
  name: QueueArea;
  status: "active" | "thin" | "held" | "building";
  purpose: string;
  currentRead: string;
  priority: string;
  commandCenterSurface: string;
};

export type CronJobRecord = {
  name: string;
  status: "active" | "candidate" | "held";
  schedule: string;
  delivery: string;
  lastRun: string;
  nextRun: string;
  purpose: string;
  operatingRule: string;
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

export const growthLanes: GrowthLane[] = [
  {
    name: "Strategy",
    status: "active",
    purpose: "Keep the commercial spine, audience, offer stack, and approval boundaries coherent.",
    currentRead: "One front door: AI Opportunity Audit. Supporting offers should feed the audit instead of competing with it.",
    priority: "Prevent scattered offer pivots and make every task map to the current thesis.",
    commandCenterSurface: "/strategy",
  },
  {
    name: "Measurement",
    status: "building",
    purpose: "Make traffic, rankings, audit starts, contacts, and visibility evidence visible enough to guide work.",
    currentRead: "Search Console and site events are live; AI visibility and lead/revenue attribution are still incomplete.",
    priority: "Run the first AI visibility baseline and keep Search Console snapshots comparable.",
    commandCenterSurface: "/, /seo, /visibility",
  },
  {
    name: "Acquisition",
    status: "active",
    purpose: "Create and tune pages that can earn qualified search, AI answer, and referral traffic.",
    currentRead: "The first useful GSC phrase family is AI employees for small business, but it is supporting evidence, not the whole strategy.",
    priority: "Compare recrawl movement, then build one high-intent page per week only from the queue.",
    commandCenterSurface: "/seo, /visibility",
  },
  {
    name: "Authority",
    status: "thin",
    purpose: "Build legitimate third-party trust signals: profiles, citations, partner pages, proof assets, and mentions.",
    currentRead: "Founder/entity and referral pages exist; external authority is still weak.",
    priority: "Create a vetted target list before outreach, submissions, paid placements, or public claims.",
    commandCenterSurface: "/strategy, /work",
  },
  {
    name: "Conversion",
    status: "held",
    purpose: "Improve the audit path, proof, CTAs, and contact flow when there is enough traffic to learn from.",
    currentRead: "Audit starts exist, but clicks, contact actions, unlocks, and traffic volume are too low for major redesign conclusions.",
    priority: "Add proof where it supports trust; hold broad redesigns until acquisition produces more data.",
    commandCenterSurface: "/, /work",
  },
  {
    name: "Operations",
    status: "building",
    purpose: "Keep tasks, cron jobs, work ledger, blockers, and recurring cadence visible in one place.",
    currentRead: "Two cron jobs exist; the command center needs to make their purpose, cadence, and next action obvious.",
    priority: "Make meaningful growth work incomplete until the command center reflects it.",
    commandCenterSurface: "/strategy, /work",
  },
];

export const cronJobs: CronJobRecord[] = [
  {
    name: "247ROI Autonomous Growth Operator",
    status: "active",
    schedule: "Weekdays at 14:00 UTC, up to 15 minutes stagger",
    delivery: "Telegram announcement to B when something meaningful ships, breaks, or needs approval",
    lastRun: "2026-09-10 14:11 UTC, ok",
    nextRun: "2026-09-11 14:11 UTC",
    purpose:
      "Inspect live metrics, read the control plane, choose one highest-leverage safe growth action, implement, verify, and update state.",
    operatingRule:
      "Pull from the queue. Do not invent a fresh strategy or resurrect deprioritized work such as Bing unless new evidence or B reopens it.",
  },
  {
    name: "247ROI Weekly Growth Report",
    status: "active",
    schedule: "Fridays at 16:00 UTC, up to 10 minutes stagger",
    delivery: "Telegram report to B",
    lastRun: "2026-09-04 16:00 UTC, ok",
    nextRun: "2026-09-11 16:00 UTC",
    purpose:
      "Summarize shipped work, verification, production status, blockers, and next week's focus.",
    operatingRule:
      "Report from the ledger, scorecard, live metrics, and queue. Do not create a second planning universe.",
  },
  {
    name: "Authority/GEO Operator",
    status: "candidate",
    schedule: "Weekly, after target list exists",
    delivery: "Report only; public action requires approval",
    lastRun: "Not created",
    nextRun: "Candidate",
    purpose:
      "Advance one vetted authority target, profile opportunity, partner target, or proof asset per run.",
    operatingRule:
      "Research and draft are allowed. Submissions, outreach, paid listings, and public claims require B approval.",
  },
  {
    name: "SEO Page Operator",
    status: "candidate",
    schedule: "Weekly, after the Growth OS queue is clean",
    delivery: "Report shipped page, verification, and next internal-link action",
    lastRun: "Not created",
    nextRun: "Candidate",
    purpose:
      "Build or improve one high-intent commercial or workflow page from Search Console evidence and approved strategy.",
    operatingRule:
      "One page per week, one intent per page, audit CTA preserved, sitemap and llms coverage verified.",
  },
  {
    name: "AI Visibility Snapshot",
    status: "candidate",
    schedule: "Monthly, after first baseline format is proven",
    delivery: "Command-center update plus short report",
    lastRun: "Not created",
    nextRun: "Candidate",
    purpose:
      "Capture repeatable answer-engine visibility for tracked prompts across AI/search surfaces.",
    operatingRule:
      "Store absence, citations, competitors, cited domains, and next improvement. No vague visibility claims.",
  },
];

export const growthQueue: GrowthQueueItem[] = [
  {
    area: "Operations",
    title: "Make command center the Growth OS source of truth",
    status: "active",
    owner: "Athena",
    priority: "P0",
    impact: "Stops strategy drift by making done/current/next/work lanes visible in one place.",
    evidenceSource: "B feedback on 2026-09-10 and 2026-09-11.",
    proof: "Command center shows lanes, queue, cron registry, ledger link, approval boundaries, and operating rules.",
    nextAction: "Treat any future meaningful 247ROI growth work as incomplete until the command center reflects it.",
  },
  {
    area: "Measurement",
    title: "Run first AI visibility baseline",
    status: "active",
    owner: "Athena",
    priority: "P0",
    impact: "Turns AI visibility from assumption into a repeatable baseline.",
    evidenceSource: "Missing baseline in /visibility and growth scorecard.",
    proof: "Prompt, answer engine, cited domains, competitors, 247ROI presence, citation status, and next improvement.",
    nextAction: "Record the first ChatGPT, Gemini, Perplexity, and Google AI-surface read for the tracked prompts.",
  },
  {
    area: "Acquisition",
    title: "Compare AI employees page after recrawl",
    status: "waiting",
    owner: "Athena",
    priority: "P1",
    impact: "Shows whether the 2026-09-10 page tuning moved a real query cluster.",
    evidenceSource: "GSC 2026-08-11 to 2026-09-08 performance rows.",
    proof: "GSC movement versus the 2026-09-09 and 2026-09-10 baselines.",
    nextAction: "Wait for the next Search Console window, then compare impressions, average position, and landing page.",
  },
  {
    area: "Acquisition",
    title: "Baseline commercial pages with no GSC rows",
    status: "active",
    owner: "Athena",
    priority: "P1",
    impact: "Finds whether important offer pages are invisible, too new, or internally under-supported.",
    evidenceSource: "Command-center GSC performance rows and manual visibility snapshots.",
    proof: "Indexed/not observed, target URL, query checked, and next internal-link/content action.",
    nextAction: "Check only important pages missing GSC evidence instead of rechecking everything.",
  },
  {
    area: "Authority",
    title: "Create vetted authority target list",
    status: "active",
    owner: "Athena",
    priority: "P0",
    impact: "Creates the backlog for legitimate authority work without jumping into spammy backlinks or unapproved outreach.",
    evidenceSource: "Authority score 2.5/10 and B request for systematic authority execution.",
    proof: "Target name, URL, type, relevance, authority rationale, submission path, risk, required assets, and approval need.",
    nextAction: "Use temporary research agents for a bounded target batch, then score and filter before any public action.",
  },
  {
    area: "Authority",
    title: "Build one workflow teardown proof asset",
    status: "queued",
    owner: "Athena",
    priority: "P2",
    impact: "Gives visitors, partners, and AI/search systems a concrete proof artifact without inventing client claims.",
    evidenceSource: "Trust/proof and conversion-proof scores remain weak.",
    proof: "Public page or asset showing problem, system shape, human approval points, measurable outcome, and audit CTA.",
    nextAction: "Choose lead follow-up, owner dashboard, inbox/admin handoff, or estimate follow-up.",
  },
  {
    area: "Acquisition",
    title: "Build one trade-specific workflow page",
    status: "queued",
    owner: "Athena",
    priority: "P2",
    impact: "Adds focused commercial reach for service-business workflows once measurement and authority setup are cleaner.",
    evidenceSource: "Strategy queue and long-tail service-business positioning.",
    proof: "Real workflow pain, specific examples, internal links, schema where useful, audit CTA, sitemap and llms coverage.",
    nextAction: "Start with plumbers or HVAC only after the current measurement and authority queue is cleaner.",
  },
  {
    area: "Conversion",
    title: "Hold major conversion redesigns",
    status: "held",
    owner: "Athena",
    priority: "P3",
    impact: "Avoids optimizing from noise while traffic is too low.",
    evidenceSource: "Current qualified traffic, CTA/contact clicks, and unlock counts.",
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
