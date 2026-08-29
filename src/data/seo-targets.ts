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

export type AuthorityTarget = {
  name: string;
  type: "profile" | "directory" | "partner" | "proof";
  priority: "P1" | "P2" | "P3";
  status: "needed" | "queued" | "blocked" | "done";
  rationale: string;
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
    area: "Overall site",
    score: 5.8,
    targetScore: 8,
    trend: "improving",
    currentStanding:
      "Technically live, strategically clearer, and now has a shareable warm-traffic asset, but rankings, traffic, proof, and conversion evidence are still immature.",
    proofNeeded: "Sustained qualified visits, indexed money pages, AI answer visibility, audit starts, report unlocks, calls, backlinks, and real proof assets.",
    nextAction: "Keep shipping acquisition/proof assets and use live behavior to decide which money pages to improve.",
  },
  {
    area: "Positioning",
    score: 7,
    targetScore: 8.5,
    trend: "improving",
    currentStanding:
      "The front-door message is now coherent: find the bottleneck worth fixing first, then build practical systems with AI, automation, dashboards, apps, and agents.",
    proofNeeded: "More buyer-language validation from real conversations, replies, audit starts, and warm traffic.",
    nextAction: "Keep using the bottleneck-first language across every traffic asset and cut anything that sounds tool-first.",
  },
  {
    area: "Technical health",
    score: 8,
    targetScore: 9,
    trend: "improving",
    currentStanding:
      "Core production pages return 200, builds pass, sitemap/robots/llms files work, and event forwarding is live.",
    proofNeeded: "Ongoing production checks, lower lint noise, Search Console coverage, and error monitoring.",
    nextAction: "Clean existing lint warnings and connect Search Console/Bing when credentials are available.",
  },
  {
    area: "Crawlability",
    score: 7.5,
    targetScore: 9,
    trend: "improving",
    currentStanding:
      "Strategic pages are crawlable and included in sitemap plus llms files. Internal links now support the newer pages.",
    proofNeeded: "Search Console indexing status, Bing indexing status, and recrawl confirmation for newer pages.",
    nextAction: "Submit/check the new diagnostic and commercial URLs when Search Console/Bing access is connected.",
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
    area: "Ranking proof",
    score: 3,
    targetScore: 8,
    trend: "baseline",
    currentStanding:
      "Search sees 247ROI and several core pages, but newer commercial pages are not reliably observed yet and true positions are not stored.",
    proofNeeded: "Keyword positions, target URL matches, impressions, clicks, indexed status, and monthly baseline deltas.",
    nextAction: "Run manual SERP baselines now and replace them with Search Console/Bing data once connected.",
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
    area: "Content quality",
    score: 6,
    targetScore: 8,
    trend: "improving",
    currentStanding:
      "Core pages are more specific and the first diagnostic checklist asset is live, but there are not enough high-utility teardown/proof assets yet.",
    proofNeeded: "Useful tools, teardown pages, checklists, original examples, saves, shares, backlinks, and qualified traffic.",
    nextAction: "Build the next workflow teardown asset and use warm replies to decide the example.",
  },
  {
    area: "Warm traffic",
    score: 6,
    targetScore: 8,
    trend: "improving",
    currentStanding:
      "The checklist page and share kit are ready, but actual distribution still needs approved sharing or connected publishing.",
    proofNeeded: "Warm-network clicks, replies, introductions, post engagement, and assisted audit starts.",
    nextAction: "Use the starter kit with B-approved posts, direct shares, and referral-partner notes.",
  },
  {
    area: "Conversion path",
    score: 6,
    targetScore: 8,
    trend: "improving",
    currentStanding:
      "/hire is technically built with triage, guided chat, examples, and tracking. The site has CTA paths from major pages.",
    proofNeeded: "CTA clicks, audit starts, completion rate, report unlocks, calls, email clicks, and lead quality.",
    nextAction: "Drive more qualified traffic before polishing further; improve only when behavior shows friction.",
  },
  {
    area: "Conversion proof",
    score: 2,
    targetScore: 8,
    trend: "baseline",
    currentStanding:
      "Command-center events show tiny volume: 5 page views in 7 days, 1 audit start in 30 days, and no CTA/phone/email/report unlock proof yet.",
    proofNeeded: "At least 100 qualified page views, multiple audit starts, report unlocks, calls/emails, and lead-quality notes.",
    nextAction: "Prioritize traffic and proof before drawing conversion conclusions.",
  },
  {
    area: "Authority",
    score: 2,
    targetScore: 8,
    trend: "baseline",
    currentStanding:
      "No meaningful backlink, directory, partner, third-party mention, or public profile baseline is connected yet.",
    proofNeeded: "Quality citations, founder profiles, partner/referral pages, directory listings, mentions, and real proof assets.",
    nextAction: "Create and work an authority target list; avoid spam backlinks.",
  },
  {
    area: "Measurement",
    score: 6.5,
    targetScore: 8.5,
    trend: "improving",
    currentStanding:
      "Public event ingestion is live, command-center metrics work, and 30-day visitor IDs are deduped. Search Console, Bing, and revenue attribution remain missing.",
    proofNeeded: "Search Console, Bing Webmaster, keyword baselines, AI visibility snapshots, lead quality, bookings, and revenue attribution.",
    nextAction: "Manual baseline until account-level data sources are connected.",
  },
  {
    area: "Trust/proof assets",
    score: 3.5,
    targetScore: 8,
    trend: "baseline",
    currentStanding:
      "The site has example workflows and sample outputs, but not enough public proof, real before/after artifacts, case examples, or third-party credibility.",
    proofNeeded: "Named proof when available, anonymized teardowns, screenshots, before/after workflow artifacts, and referral/partner validation.",
    nextAction: "Add proof ladder and publish one workflow teardown that shows the system output without inventing client claims.",
  },
];

export const authorityTargets: AuthorityTarget[] = [
  {
    name: "Brendan Kelly founder profile",
    type: "profile",
    priority: "P1",
    status: "queued",
    rationale:
      "Search and AI systems need consistent entity signals connecting Brendan Kelly, 247ROI, business systems, AI automation, and get247roi.com.",
    nextAction:
      "Create a public founder/profile asset and use the same description across approved LinkedIn, business listings, and referral outreach.",
  },
  {
    name: "Referral partner one-pager",
    type: "partner",
    priority: "P1",
    status: "queued",
    rationale:
      "Warm traffic should come from people who already serve SMB owners but do not build custom AI/business systems.",
    nextAction:
      "Publish a partner-facing page explaining when to refer 247ROI and which bottlenecks are a fit.",
  },
  {
    name: "Local and professional directories",
    type: "directory",
    priority: "P1",
    status: "needed",
    rationale:
      "Clean citations help entity clarity and give prospects third-party places to verify the business.",
    nextAction:
      "Build a directory checklist for Google Business Profile, Bing Places, LinkedIn company page, Crunchbase-style profiles if appropriate, and relevant local/business directories.",
  },
  {
    name: "Anonymized workflow teardown",
    type: "proof",
    priority: "P1",
    status: "queued",
    rationale:
      "The site needs proof-style artifacts that show useful output without fabricating client results.",
    nextAction:
      "Build one teardown for lead follow-up, owner dashboard, or inbox/admin handoff and link it from demo, services, and the checklist page.",
  },
  {
    name: "Podcast/newsletter outreach list",
    type: "profile",
    priority: "P2",
    status: "needed",
    rationale:
      "Relevant appearances and expert quotes can create warm traffic plus credible mentions.",
    nextAction:
      "Create a vetted list of SMB, contractor, ops, AI-for-business, and local business shows/newsletters with pitch angles.",
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
    term: "what should my business automate first",
    intent: "conversion",
    priority: "P1",
    targetPage: "/what-should-my-business-automate-first",
    status: "page-live",
    baseline: "Diagnostic landing page and shareable article shipped 2026-08-29",
    current: "Awaiting production deploy, index/rank baseline, and warm-traffic clicks",
    nextAction:
      "Use this as the first warm-traffic link for owners who are curious but not ready for a sales page; measure page views, CTA clicks, and audit starts.",
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
    targetPage: "/workflow-automation-consultant",
    status: "page-live",
    baseline: "Dedicated consultant-intent page shipped 2026-08-27",
    current: "Awaiting index/rank baseline",
    nextAction: "Measure indexation and rankings, then improve from manual SERP review, Search Console queries, and AI answer checks.",
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
    currentVisibility: "Target page live; first answer-engine snapshot pending",
    nextAction: "Check answer-engine surfaces after indexing, then improve examples, citations, and internal links where 247ROI is absent.",
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
    status: "active",
    proof: "Search Console, Bing Webmaster, analytics, and event ingestion appear in dashboard.",
    nextAction: "Event ingestion is live and verified. Next blocker is account-level Search Console and Bing Webmaster access; B needs to grant/add access or provide verification/API credentials.",
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
    nextAction: "Use live command-center site events for behavioral signals; use manual search baselines until Search Console and Bing data are connected.",
  },
  {
    name: "Produce content people would actually view",
    cadence: "weekly",
    owner: "Athena",
    status: "active",
    proof: "Content has a concrete buyer problem, useful example, strong hook, internal links, and conversion path.",
    nextAction:
      "First diagnostic checklist asset is now queued for production: /what-should-my-business-automate-first plus matching article. Next: use it in warm outreach and build one workflow teardown asset.",
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
