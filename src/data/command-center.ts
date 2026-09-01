import {
  Activity,
  BadgeCheck,
  CalendarClock,
  Flame,
  Gauge,
  LucideIcon,
  Radar,
  Recycle,
  Send,
  ShieldCheck,
  Sparkles,
  Target,
  Trash2,
  TrendingUp,
} from "lucide-react";

export type Platform = "LinkedIn" | "Instagram" | "Facebook" | "TikTok" | "X";

export type PipelineStage =
  | "Idea"
  | "Hook"
  | "Script"
  | "Production"
  | "QC"
  | "Scheduled"
  | "Published"
  | "Verdict";

export type Verdict = "Kill" | "Iterate" | "Scale";

export type MetricCard = {
  label: string;
  value: string;
  delta: string;
  icon: LucideIcon;
};

export type PipelineItem = {
  title: string;
  stage: PipelineStage;
  owner: string;
  due: string;
  risk: "Low" | "Medium" | "High";
};

export type HookCandidate = {
  hook: string;
  audience: string;
  trigger: string;
  proof: string;
  score: number;
};

export type Experiment = {
  name: string;
  hypothesis: string;
  signal: string;
  verdict: Verdict;
};

export type AssetCleanupItem = {
  name: string;
  type: string;
  size: string;
  expiresIn: string;
  status: "Delete" | "Review" | "Keep";
};

export type RecentPost = {
  title: string;
  platform: Platform;
  format: string;
  views: string;
  engagement: string;
  verdict: Verdict;
};

export const overviewMetrics: MetricCard[] = [
  {
    label: "Publishing tempo",
    value: "3/day",
    delta: "Target cadence",
    icon: Send,
  },
  {
    label: "Active experiments",
    value: "6",
    delta: "2 need verdicts",
    icon: Radar,
  },
  {
    label: "Asset burn risk",
    value: "18h",
    delta: "Next cleanup window",
    icon: Trash2,
  },
  {
    label: "Scale candidates",
    value: "4",
    delta: "Ready for remix",
    icon: TrendingUp,
  },
];

export const moduleCards = [
  {
    title: "Social",
    href: "/social",
    status: "Active build",
    description:
      "Publishing, hooks, production, PostFast sync, analytics, cleanup, and creative verdicts.",
    icon: Flame,
  },
  {
    title: "Work Ledger",
    href: "/work",
    status: "Active build",
    description:
      "Shipped changes, why they happened, expected effect, evidence status, commits, and follow-up work.",
    icon: BadgeCheck,
  },
  {
    title: "SEO / Growth",
    href: "/seo",
    status: "Active build",
    description:
      "Site quality, SEO targets, conversion path, authority, and recurring growth actions.",
    icon: Target,
  },
  {
    title: "Rank Proof",
    href: "/visibility",
    status: "Active build",
    description:
      "Manual and future connected checks for Google, Bing, ChatGPT, Gemini, Perplexity, and AI surfaces.",
    icon: Radar,
  },
  {
    title: "Visual Progress",
    href: "/progress",
    status: "Active build",
    description:
      "Before/after page improvements, screenshot queue, and visual evidence for meaningful site changes.",
    icon: Activity,
  },
  {
    title: "Settings",
    href: "/settings",
    status: "Foundation",
    description:
      "Integration health, retention policy, secrets checklist, and operating defaults.",
    icon: ShieldCheck,
  },
];

export const pipelineItems: PipelineItem[] = [
  {
    title: "What should I automate first checklist",
    stage: "Scheduled",
    owner: "Athena",
    due: "Today",
    risk: "Low",
  },
  {
    title: "Owner DM: bottleneck worth fixing first",
    stage: "Script",
    owner: "Athena",
    due: "Today",
    risk: "Low",
  },
  {
    title: "Workflow teardown: lead follow-up queue",
    stage: "QC",
    owner: "Athena",
    due: "Tomorrow",
    risk: "Medium",
  },
  {
    title: "AI visibility wedge for owner-led firms",
    stage: "Hook",
    owner: "Athena + B",
    due: "Tomorrow",
    risk: "Low",
  },
];

export const hookCandidates: HookCandidate[] = [
  {
    hook: "Do not automate the annoying task first. Automate the expensive bottleneck first.",
    audience: "Owner-led service businesses",
    trigger: "Useful contrarian advice",
    proof: "Checklist page routes owners through frequency, value, clarity, and control before the audit CTA.",
    score: 96,
  },
  {
    hook: "Your business is making humans do robot work.",
    audience: "Successful SMB owners",
    trigger: "Status threat",
    proof: "Show manual inbox-to-CRM workflow replaced by AI employee",
    score: 94,
  },
  {
    hook: "This $18/hour admin task is costing you $180k a year.",
    audience: "Owner-operators",
    trigger: "Hidden loss",
    proof: "Time leakage math plus before/after dashboard",
    score: 91,
  },
  {
    hook: "Your competitor will not hire another admin. They will deploy one.",
    audience: "Growth-focused owners",
    trigger: "Competitive fear",
    proof: "AI employee handles lead capture, follow-up, and reporting",
    score: 89,
  },
];

export const experiments: Experiment[] = [
  {
    name: "Diagnostic checklist warm traffic",
    hypothesis:
      "A useful 'what should I automate first' asset will earn more warm clicks and replies than a direct audit pitch.",
    signal: "Page views, CTA clicks, audit starts, and reply quality from warm-network sharing.",
    verdict: "Iterate",
  },
  {
    name: "Confrontational owner truth",
    hypothesis:
      "Blunt diagnosis will outperform polite education for business-owner attention.",
    signal: "3-second hold and comment quality",
    verdict: "Iterate",
  },
  {
    name: "Workflow teardown",
    hypothesis:
      "Before/after screen recordings will create more trust than cinematic AI visuals.",
    signal: "Profile clicks and saves",
    verdict: "Scale",
  },
  {
    name: "AI visibility wedge",
    hypothesis:
      "Timely AI search fear can open the door to broader AI employee conversations.",
    signal: "DMs and booked audits",
    verdict: "Iterate",
  },
];

export const cleanupQueue: AssetCleanupItem[] = [
  {
    name: "robot-work-manifesto-draft-v3.mp4",
    type: "Draft export",
    size: "384 MB",
    expiresIn: "18h",
    status: "Review",
  },
  {
    name: "admin-follow-up-raw-generations",
    type: "Raw clips",
    size: "1.2 GB",
    expiresIn: "1d 6h",
    status: "Delete",
  },
  {
    name: "approved-brand-face-intro.mov",
    type: "Finished production",
    size: "212 MB",
    expiresIn: "2d 4h",
    status: "Keep",
  },
];

export const recentPosts: RecentPost[] = [
  {
    title: "Stop hiring humans for robot work",
    platform: "LinkedIn",
    format: "Founder take",
    views: "1.8k",
    engagement: "7.2%",
    verdict: "Iterate",
  },
  {
    title: "AI employee handles the messy follow-up",
    platform: "TikTok",
    format: "Demo short",
    views: "4.6k",
    engagement: "5.9%",
    verdict: "Scale",
  },
  {
    title: "Your CRM is where leads go to die",
    platform: "Instagram",
    format: "Reel",
    views: "2.1k",
    engagement: "4.1%",
    verdict: "Iterate",
  },
];

export const platformMix = [
  { platform: "LinkedIn", role: "Authority and founder arguments", cadence: "2/day" },
  { platform: "Instagram", role: "Reels, credibility, visual proof", cadence: "1/day" },
  { platform: "Facebook", role: "SMB owner reach and retargeting base", cadence: "1/day" },
  { platform: "TikTok", role: "Pattern interrupts and demos", cadence: "1/day" },
  { platform: "X", role: "Sharp daily takes and script testing", cadence: "3-5/day" },
];

export const integrationStatus = [
  {
    name: "GitHub",
    state: "Connected",
    detail: "SSH push access works as bkelly623.",
    icon: BadgeCheck,
  },
  {
    name: "Vercel",
    state: "Connected",
    detail: "Project linked and Supabase env configured.",
    icon: Gauge,
  },
  {
    name: "Supabase",
    state: "Connected",
    detail: "Project zptpvfcjhziglhdkuwhm linked locally.",
    icon: Activity,
  },
  {
    name: "PostFast",
    state: "Pending key",
    detail: "Add POSTFAST_API_KEY to enable scheduling and analytics.",
    icon: CalendarClock,
  },
];

export const operatingPrinciples = [
  {
    title: "Broad discovery, specific conversion",
    description:
      "Content opens with painful computer-work problems, then points to the exact AI employee that solves them.",
    icon: Sparkles,
  },
  {
    title: "Proof beats hype",
    description:
      "Every strong post needs a visible workflow, teardown, before/after, metric, or concrete business consequence.",
    icon: BadgeCheck,
  },
  {
    title: "Clean shop by default",
    description:
      "Heavy files burn after 3 days unless marked keep. Learning records survive because they compound.",
    icon: Recycle,
  },
];
