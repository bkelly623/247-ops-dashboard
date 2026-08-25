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

export const seoKeywordTargets: SeoKeywordTarget[] = [
  {
    term: "AI opportunity audit",
    intent: "conversion",
    priority: "P1",
    targetPage: "/hire",
    status: "needs-upgrade",
    baseline: "Baseline needed",
    current: "Not yet tracked",
    nextAction: "Make /hire a crawlable audit landing page with output, examples, FAQs, and schema.",
  },
  {
    term: "business automation audit",
    intent: "conversion",
    priority: "P1",
    targetPage: "/hire",
    status: "needs-upgrade",
    baseline: "Baseline needed",
    current: "Not yet tracked",
    nextAction: "Add audit positioning that maps bottlenecks to AI, automation, dashboards, apps, or custom software.",
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
    status: "page-needed",
    baseline: "No target page",
    current: "Not ranking by design yet",
    nextAction: "Create an AI agents page with real roles: inbox, reporting, research, CRM updates, follow-up, and approvals.",
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
    status: "page-needed",
    baseline: "No target page",
    current: "Not ranking by design yet",
    nextAction: "Build a practical AI visibility page anchored in SEO, entity clarity, schema, citations, and answer-ready pages.",
  },
  {
    term: "generative engine optimization consultant",
    intent: "authority",
    priority: "P2",
    targetPage: "/generative-engine-optimization-consultant",
    status: "page-needed",
    baseline: "No target page",
    current: "Not ranking by design yet",
    nextAction: "Create a GEO explainer that avoids hype and maps the work to technical SEO plus AI visibility checks.",
  },
  {
    term: "custom business dashboard",
    intent: "service",
    priority: "P2",
    targetPage: "/custom-business-dashboard",
    status: "page-needed",
    baseline: "No target page",
    current: "Not ranking by design yet",
    nextAction: "Build dashboard/internal-app use cases for owner KPIs, lead tracking, pipeline, and weekly reporting.",
  },
  {
    term: "internal tools for small business",
    intent: "service",
    priority: "P2",
    targetPage: "/internal-tools-for-small-business",
    status: "page-needed",
    baseline: "No target page",
    current: "Not ranking by design yet",
    nextAction: "Build page around replacing spreadsheet chaos and disconnected tools with focused internal apps.",
  },
  {
    term: "AI automation consultant for small business",
    intent: "service",
    priority: "P2",
    targetPage: "/ai-automation-consultant-small-business",
    status: "page-needed",
    baseline: "No target page",
    current: "Not ranking by design yet",
    nextAction: "Target broad AI automation demand while keeping copy specific to bottlenecks and ROI.",
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
    currentVisibility: "Not yet checked",
    nextAction: "Publish target page, then check ChatGPT, Gemini, Perplexity, and Google AI surfaces monthly.",
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
    currentVisibility: "Not yet checked",
    nextAction: "Publish AI visibility page that explains SEO-first GEO work without overclaiming.",
  },
  {
    prompt: "How do I make my company show up in AI search results?",
    priority: "P2",
    targetPage: "/ai-visibility-optimization",
    currentVisibility: "Not yet checked",
    nextAction: "Add answer-ready sections, schema, citation plan, and recurring answer-engine checks.",
  },
];

export const growthActions: GrowthAction[] = [
  {
    name: "Create target pages for selected P1 keywords",
    cadence: "one-time",
    owner: "Athena",
    status: "active",
    proof: "Target page exists, sitemap/llms coverage, metadata, schema, internal links, build passes.",
    nextAction: "Finish AI Opportunity Audit, custom AI agents, and AI visibility pages after business-process page.",
  },
  {
    name: "Connect authoritative measurement sources",
    cadence: "one-time",
    owner: "Athena + B",
    status: "blocked",
    proof: "Search Console, Bing Webmaster, analytics, and event ingestion appear in dashboard.",
    nextAction: "Needs access/credentials for Search Console, Bing, Vercel env, and analytics connection.",
  },
  {
    name: "Baseline target keyword rankings",
    cadence: "monthly",
    owner: "Athena",
    status: "queued",
    proof: "Each selected term has observed position, target URL, date checked, and SERP notes.",
    nextAction: "Run first manual baseline while measurement APIs are unavailable.",
  },
  {
    name: "Run AI visibility checks",
    cadence: "monthly",
    owner: "Athena",
    status: "queued",
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
    nextAction: "Add internal links from homepage/services/articles to each new target page.",
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
