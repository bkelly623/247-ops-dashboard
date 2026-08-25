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
    status: "page-needed",
    baseline: "No target page",
    current: "Not ranking by design yet",
    nextAction: "Build the core service page around messy workflows, operations, reporting, CRM, docs, and handoffs.",
  },
  {
    term: "workflow automation consultant",
    intent: "service",
    priority: "P1",
    targetPage: "/workflow-automation-consultant",
    status: "page-needed",
    baseline: "No target page",
    current: "Not ranking by design yet",
    nextAction: "Build answer sections for cost, use cases, what to automate, what not to automate, and timeline.",
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
    status: "page-needed",
    baseline: "No target page",
    current: "Not ranking by design yet",
    nextAction: "Create a focused wedge page for missed calls, slow follow-up, contractors, and service businesses.",
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
    nextAction: "Build workflow page with concrete messy-work examples and entity-consistent 247ROI language.",
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
