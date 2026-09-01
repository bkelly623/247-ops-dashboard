export type VisibilityEngine =
  | "Google"
  | "Bing"
  | "ChatGPT"
  | "Gemini"
  | "Perplexity"
  | "Google AI Surface";

export type VisibilitySnapshot = {
  checkedAt: string;
  engine: VisibilityEngine;
  queryOrPrompt: string;
  targetPage: string;
  observedUrl: string | null;
  standing: "present" | "absent" | "stale" | "pending";
  position: string;
  answerSummary: string;
  competitorsOrEntities: string;
  nextAction: string;
};

export const visibilitySnapshots: VisibilitySnapshot[] = [
  {
    checkedAt: "2026-09-01",
    engine: "Google",
    queryOrPrompt: "site:get247roi.com 247ROI",
    targetPage: "/",
    observedUrl: "/",
    standing: "present",
    position: "Observed in site-restricted result set",
    answerSummary:
      "Google is crawling the current homepage and describing 247ROI around AI employees, workflow automation, and business systems.",
    competitorsOrEntities: "247ROI, Brendan Kelly, AI employees, workflow automation",
    nextAction:
      "Use non-site-restricted commercial queries next; site-restricted presence only proves discovery.",
  },
  {
    checkedAt: "2026-09-01",
    engine: "Google",
    queryOrPrompt: 'site:get247roi.com "AI visibility optimization"',
    targetPage: "/ai-visibility-optimization",
    observedUrl: null,
    standing: "absent",
    position: "Not observed in first manual check",
    answerSummary:
      "The target page is live and crawlable, but manual search did not yet show reliable discovery for the exact phrase.",
    competitorsOrEntities: "Not captured",
    nextAction:
      "Strengthen entity links, submit/check in Search Console when available, and recheck after crawl delay.",
  },
  {
    checkedAt: "2026-09-01",
    engine: "Google",
    queryOrPrompt: 'site:get247roi.com "business process automation consultant"',
    targetPage: "/business-process-automation-consultant",
    observedUrl: "/ai-employees-for-small-business",
    standing: "stale",
    position: "Wrong 247ROI page observed",
    answerSummary:
      "Google sees 247ROI content for the topic, but not consistently the dedicated page that should own the query.",
    competitorsOrEntities: "247ROI AI employee page",
    nextAction:
      "Add stronger internal links and recheck which page Google chooses after recrawl.",
  },
  {
    checkedAt: "2026-09-01",
    engine: "Google",
    queryOrPrompt: 'site:get247roi.com "what should my business automate first"',
    targetPage: "/what-should-my-business-automate-first",
    observedUrl: null,
    standing: "absent",
    position: "Not observed in first manual check",
    answerSummary:
      "The diagnostic asset is live, but fresh enough that absence in manual search is not surprising yet.",
    competitorsOrEntities: "Not captured",
    nextAction:
      "Use the page in warm traffic and recheck indexation after more crawl time.",
  },
  {
    checkedAt: "2026-09-01",
    engine: "ChatGPT",
    queryOrPrompt: "Who builds custom AI agents for small businesses?",
    targetPage: "/ai-agents-for-business",
    observedUrl: null,
    standing: "pending",
    position: "Snapshot not run",
    answerSummary:
      "No answer-engine baseline has been captured yet. This is a measurement gap, not proof of absence.",
    competitorsOrEntities: "Pending",
    nextAction:
      "Run first answer snapshot across ChatGPT, Gemini, Perplexity, and Google AI surfaces.",
  },
  {
    checkedAt: "2026-09-01",
    engine: "Perplexity",
    queryOrPrompt: "Who can optimize my business for ChatGPT and AI search recommendations?",
    targetPage: "/ai-visibility-optimization",
    observedUrl: null,
    standing: "pending",
    position: "Snapshot not run",
    answerSummary:
      "No citation or answer baseline is stored yet for 247ROI's AI visibility offer.",
    competitorsOrEntities: "Pending",
    nextAction:
      "Capture cited domains and missing proof signals, then decide whether to add citations, examples, or authority pages.",
  },
];
