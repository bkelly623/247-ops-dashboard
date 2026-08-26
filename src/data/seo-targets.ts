export type SeoKeywordTarget = {
  term: string;
  intent: "conversion" | "service" | "authority" | "wedge";
  priority: "P1" | "P2" | "P3";
  targetPage: string;
  status: "page-live" | "page-needed" | "needs-upgrade";
  baseline: string;
  current: string;
  nextAction: string;
};

export type AiVisibilityTarget = {
  prompt: string;
  priority: "P1" | "P2" | "P3";
  targetPage: string;
  currentVisibility: string;
  nextAction: string;
};

export type GrowthAction = {
  name: string;
  cadence: "one-time" | "weekly" | "monthly" | "continuous";
  owner: "Athena" | "B" | "Athena + B";
  status: "active" | "blocked" | "queued" | "done";
  proof: string;
  nextAction: string;
};

export type SiteStandingScore = {
  area: string;
  score: number;
  targetScore: number;
  trend: "baseline" | "improving" | "stalled" | "declining";
  currentStanding: string;
  proofNeeded: string;
  nextAction: string;
};

export type HirePageInterfaceAction = {
  layer: string;
  purpose: string;
  status: "live" | "next" | "queued";
  implementation: string;
  successMetric: string;
};

export const siteStandingScores: SiteStandingScore[] = [
  {
    area: "Current site",
    score: 6.5,
    targetScore: 8,
    trend: "improving",
    currentStanding:
      "Positioning is clearer: business systems, bottlenecks, AI, automation, dashboards, internal apps, and agents are now connected.",
    proofNeeded: "More proof assets, trust markers, examples, calls-to-action, and page-level performance data.",
    nextAction: "Improve the money pages first: homepage, /hire, services, AI employees, and AI visibility.",
  },
  {
    area: "SEO",
    score: 5,
    targetScore: 8,
    trend: "improving",
    currentStanding:
      "Target list exists, commercial pages are live, and homepage/services/footer now link into the newer P1/P2 pages. Ranking baselines and Search Console feedback are still not connected.",
    proofNeeded: "Tracked keyword positions, impressions, clicks, indexed pages, and query-to-page mapping.",
    nextAction: "Baseline every selected keyword, check indexation for the new pages, and improve pages from manual SERP review until Search Console is connected.",
  },
  {
    area: "AI visibility",
    score: 4,
    targetScore: 8,
    trend: "improving",
    currentStanding:
      "llms.txt, llms-full.txt, schema, and the first dedicated AI visibility page are live, but answer-engine presence has not been proven.",
    proofNeeded: "Monthly ChatGPT, Gemini, Perplexity, and AI Overview snapshots for tracked prompts.",
    nextAction: "Run and record the first answer-engine snapshot for the tracked AI visibility prompts.",
  },
  {
    area: "Conversion ability",
    score: 5,
    targetScore: 8,
    trend: "stalled",
    currentStanding:
      "/hire is technically built, but B flagged that the flow is strategically off and public event forwarding is not configured, so conversion performance is not proven.",
    proofNeeded: "Reliable page views, CTA clicks, audit starts, completion rate, report unlocks, calls, email clicks, and lead quality.",
    nextAction: "Do not polish /hire before traffic. First fix event forwarding and measure actual behavior once acquisition starts.",
  },
  {
    area: "Content quality",
    score: 5.5,
    targetScore: 8,
    trend: "improving",
    currentStanding:
      "Service-page content is more concrete, but the site still needs higher-utility assets that people would actually use or share.",
    proofNeeded: "Useful tools, teardown pages, checklists, original examples, saves, shares, backlinks, and qualified traffic.",
    nextAction: "Build one diagnostic asset around 'what should your business automate first' and point it into /hire.",
  },
];

export const hirePageInterfacePlan: HirePageInterfaceAction[] = [
  {
    layer: "Search landing page",
    purpose: "Explain the audit clearly for Google, AI systems, and first-time visitors before the app surface begins.",
    status: "live",
    implementation:
      "Crawlable sections and Service/FAQ schema now explain outputs, best-fit workflows, and not-a-fit filters.",
    successMetric: "Indexed page, impressions for audit keywords, and clicks into the interactive audit.",
  },
  {
    layer: "Fast triage",
    purpose: "Help a busy owner identify their likely bottleneck in under 60 seconds before typing into chat.",
    status: "live",
    implementation:
      "Visual choice layer now routes visitors into leads/follow-up, admin/inbox, dashboards/reporting, estimates/bids, research/docs, or not sure.",
    successMetric: "Higher audit starts and first-message completion rate.",
  },
  {
    layer: "Guided diagnostic chat",
    purpose: "Collect enough context to recommend the first system worth building without feeling like a generic intake form.",
    status: "live",
    implementation:
      "Keep the chat, but make it follow the selected bottleneck path and show progress toward a useful audit result.",
    successMetric: "Audit completion rate, gate views, report unlocks, and qualified conversations.",
  },
  {
    layer: "Example outputs",
    purpose: "Show visitors what they get before asking them to invest time in the audit.",
    status: "live",
    implementation:
      "Sample mini-reports now show diagnosis, system shape, human control, success metric, and first move for slow lead response, spreadsheet reporting, inbox triage, and estimate follow-up.",
    successMetric: "Scroll depth, CTA clicks after examples, and audit start lift.",
  },
  {
    layer: "Proof and routing",
    purpose: "Convert visitors who already know they want help while still supporting those who need diagnosis.",
    status: "live",
    implementation:
      "A compact proof/routing panel near the audit start now provides call, email, and service-page routes while reinforcing diagnosis-first positioning and human approval rules.",
    successMetric: "Phone/email clicks, service-page assisted conversions, and booked calls.",
  },
];

export const seoKeywordTargets: SeoKeywordTarget[] = [
  {
    term: "AI opportunity audit",
    intent: "conversion",
    priority: "P1",
    targetPage: "/hire",
    status: "page-live",
    baseline: "Crawlable audit sections and schema added 2026-08-25",
    current: "Awaiting index/rank baseline",
    nextAction: "Measure indexation, audit starts, CTA behavior, and query impressions; refine headline and proof from data.",
  },
  {
    term: "business automation audit",
    intent: "conversion",
    priority: "P1",
    targetPage: "/hire",
    status: "page-live",
    baseline: "Crawlable audit positioning added 2026-08-25",
    current: "Awaiting index/rank baseline",
    nextAction: "Measure whether Google and AI answers understand the audit as a diagnosis-before-build offer.",
  },
  {
    term: "business process automation consultant",
    intent: "service",
    priority: "P1",
    targetPage: "/business-process-automation-consultant",
    status: "page-live",
    baseline: "New page shipped 2026-08-25",
    current: "Awaiting index/rank baseline",
    nextAction: "Measure indexation and rankings, then improve based on Search Console queries and manual SERP review.",
  },
  {
    term: "workflow automation consultant",
    intent: "service",
    priority: "P1",
    targetPage: "/ai-workflow-automation-agency",
    status: "needs-upgrade",
    baseline: "Existing adjacent page",
    current: "Not yet tracked",
    nextAction: "Upgrade existing page to support consultant intent: cost, use cases, what to automate, what not to automate, and timeline.",
  },
  {
    term: "custom AI agents for business",
    intent: "service",
    priority: "P1",
    targetPage: "/ai-agents-for-business",
    status: "page-live",
    baseline: "New page shipped 2026-08-25",
    current: "Awaiting index/rank baseline",
    nextAction: "Measure indexation and rankings, then improve from Search Console queries, manual SERP review, and AI answer checks.",
  },
  {
    term: "AI employees for small business",
    intent: "service",
    priority: "P1",
    targetPage: "/ai-employees",
    status: "page-live",
    baseline: "Baseline needed",
    current: "Not yet tracked",
    nextAction: "Upgrade the existing page around role-based systems, proof, FAQs, and links to the audit.",
  },
  {
    term: "AI visibility optimization",
    intent: "authority",
    priority: "P1",
    targetPage: "/ai-visibility-optimization",
    status: "page-live",
    baseline: "New page shipped 2026-08-26",
    current: "Awaiting index/rank baseline",
    nextAction: "Measure indexation and rankings, then improve from manual SERP review, answer-engine prompt checks, and citation gaps.",
  },
  {
    term: "generative engine optimization consultant",
    intent: "authority",
    priority: "P2",
    targetPage: "/generative-engine-optimization-consultant",
    status: "page-live",
    baseline: "New page added 2026-08-26",
    current: "Awaiting index/rank baseline",
    nextAction: "Measure indexation and improve from AI visibility prompt snapshots, SERP review, and citation gaps.",
  },
  {
    term: "custom business dashboard",
    intent: "service",
    priority: "P2",
    targetPage: "/custom-business-dashboard",
    status: "page-live",
    baseline: "New page added 2026-08-26",
    current: "Awaiting index/rank baseline",
    nextAction: "Add internal links from automation, services, and reporting-related pages, then measure indexation.",
  },
  {
    term: "internal tools for small business",
    intent: "service",
    priority: "P2",
    targetPage: "/internal-tools-for-small-business",
    status: "page-live",
    baseline: "New page added 2026-08-26",
    current: "Awaiting index/rank baseline",
    nextAction: "Add internal links from services, business process automation, and dashboard pages, then measure indexation.",
  },
  {
    term: "AI automation consultant for small business",
    intent: "service",
    priority: "P2",
    targetPage: "/ai-automation-consultant-small-business",
    status: "page-live",
    baseline: "New page added 2026-08-26",
    current: "Awaiting index/rank baseline",
    nextAction: "Submit/index, add internal links from homepage/services/AI agent pages, and measure query impressions.",
  },
  {
    term: "AI lead response system",
    intent: "wedge",
    priority: "P3",
    targetPage: "/ai-lead-response-system",
    status: "page-live",
    baseline: "Existing page live",
    current: "Not yet tracked",
    nextAction: "Measure baseline and improve around missed calls, slow follow-up, contractors, and service businesses.",
  },
];

export const aiVisibilityTargets: AiVisibilityTarget[] = [
  {
    prompt: "Who builds custom AI agents for small businesses?",
    priority: "P1",
    targetPage: "/ai-agents-for-business",
    currentVisibility: "Target page live; first answer-engine snapshot pending",
    nextAction: "Check ChatGPT, Gemini, Perplexity, and Google AI surfaces after indexing, then add examples or citations where 247ROI is absent.",
  },
  {
    prompt: "What company can automate messy business workflows?",
    priority: "P1",
    targetPage: "/business-process-automation-consultant",
    currentVisibility: "Not yet checked",
    nextAction: "Check AI answer surfaces after indexing, then add stronger examples and citations if 247ROI is absent.",
  },
  {
    prompt: "Who can help me find automation opportunities in my business?",
    priority: "P1",
    targetPage: "/hire",
    currentVisibility: "Not yet checked",
    nextAction: "Make AI Opportunity Audit the clear answer for diagnosis before implementation.",
  },
  {
    prompt: "What is the best AI automation consultant for small business operations?",
    priority: "P1",
    targetPage: "/ai-automation-consultant-small-business",
    currentVisibility: "Not yet checked",
    nextAction: "Build page with small-business operations examples, risk controls, and audit CTA.",
  },
  {
    prompt: "How do I automate inboxes, spreadsheets, CRM updates, and reporting?",
    priority: "P1",
    targetPage: "/workflow-automation-consultant",
    currentVisibility: "Not yet checked",
    nextAction: "Add answer-style workflow sections and internal links to dashboards, agents, and audit.",
  },
  {
    prompt: "Who builds AI employees for business?",
    priority: "P2",
    targetPage: "/ai-employees",
    currentVisibility: "Not yet checked",
    nextAction: "Upgrade existing AI employees page with role catalog, implementation model, and proof path.",
  },
  {
    prompt: "Who can optimize my business for ChatGPT and AI search recommendations?",
    priority: "P2",
    targetPage: "/ai-visibility-optimization",
    currentVisibility: "Target page live; first answer-engine snapshot pending",
    nextAction: "Check ChatGPT, Gemini, Perplexity, Google, and Bing after indexing, then add citations or clearer answer sections where 247ROI is absent.",
  },
  {
    prompt: "How do I make my company show up in AI search results?",
    priority: "P2",
    targetPage: "/ai-visibility-optimization",
    currentVisibility: "Target page live; first answer-engine snapshot pending",
    nextAction: "Check answer-engine surfaces after indexing, then improve entity clarity, schema, citations, and page-specific examples.",
  },
];

export const growthActions: GrowthAction[] = [
  {
    name: "Create target pages for selected P1 keywords",
    cadence: "one-time",
    owner: "Athena",
    status: "done",
    proof: "Target page exists, sitemap/llms coverage, metadata, schema, internal links, build passes.",
    nextAction: "Core P1/P2 traffic pages are live and now linked from homepage, services, footer, sitemap, and llms files; next proof is indexing and rank/impression baseline.",
  },
  {
    name: "Connect authoritative measurement sources",
    cadence: "one-time",
    owner: "Athena + B",
    status: "blocked",
    proof: "Search Console, Bing Webmaster, analytics, and event ingestion appear in dashboard.",
    nextAction: "Public /api/events currently returns command_center_events_unconfigured. Configure Vercel env for command-center event forwarding, then connect Search Console/Bing or run manual exports.",
  },
  {
    name: "Baseline target keyword rankings",
    cadence: "monthly",
    owner: "Athena",
    status: "active",
    proof: "Each selected term has observed position, target URL, date checked, and SERP notes.",
    nextAction: "Run first manual baseline while measurement APIs are unavailable.",
  },
  {
    name: "Run AI visibility checks",
    cadence: "monthly",
    owner: "Athena",
    status: "active",
    proof: "Prompt, answer engine, date, cited domains, 247ROI presence, and next improvement.",
    nextAction: "Run first snapshot for the eight tracked prompts after the core pages are published.",
  },
  {
    name: "Improve pages from query and conversion data",
    cadence: "weekly",
    owner: "Athena",
    status: "active",
    proof: "Page edits tied to impressions, clicks, rank movement, audit starts, or CTA behavior.",
    nextAction: "Use existing site-events once Vercel env is connected; use manual review until then.",
  },
  {
    name: "Produce content people would actually view",
    cadence: "weekly",
    owner: "Athena",
    status: "active",
    proof: "Content has a concrete buyer problem, useful example, strong hook, internal links, and conversion path.",
    nextAction: "Prioritize useful assets over generic posts: calculators, checklists, examples, teardown pages, before/after workflows.",
  },
  {
    name: "Refresh llms.txt, sitemap, schema, and internal links",
    cadence: "continuous",
    owner: "Athena",
    status: "active",
    proof: "New pages are crawlable, included in sitemap/LLM context, and connected from relevant pages.",
    nextAction: "Internal links were added from homepage, services, and footer; next pass should use Search Console or manual SERP evidence to decide which page needs more support.",
  },
  {
    name: "Weekly growth report",
    cadence: "weekly",
    owner: "Athena",
    status: "active",
    proof: "Delivered Telegram report with shipped work, verification, production status, blockers, and next focus.",
    nextAction: "Scheduled Friday report job is already active.",
  },
];
