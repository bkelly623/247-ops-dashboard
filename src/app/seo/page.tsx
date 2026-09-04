import {
  Activity,
  ArrowUpRight,
  BarChart3,
  CheckCircle2,
  Eye,
  FileSearch,
  Gauge,
  Link2,
  ListChecks,
  Map,
  MousePointerClick,
  Route,
  Search,
  ShieldCheck,
  Sparkles,
  Target,
  Telescope,
  TrendingUp,
  Waypoints,
} from "lucide-react";
import { AppShell } from "@/components/app-shell";
import { DashboardCard, PageHeader, StatusBadge } from "@/components/dashboard-card";
import { HorizontalBar, SegmentedBar } from "@/components/visualizations";
import {
  aiVisibilityTargets,
  authorityTargets,
  growthActions,
  hirePageInterfacePlan,
  seoKeywordTargets,
} from "@/data/seo-targets";
import { standingScores } from "@/data/growth-standing";
import { searchBaselines } from "@/data/search-baselines";
import { getBrandSiteOverview } from "@/lib/brand-site/server";
import { getSearchConsolePerformance, type SearchConsoleRow } from "@/lib/search-console/server";

export const dynamic = "force-dynamic";

const operatingMetrics = [
  {
    label: "Acquisition",
    value: "Build demand",
    note: "Keywords, SERPs, competitor examples, answer pages, social frameworks, and qualified traffic.",
    icon: Search,
  },
  {
    label: "Conversion",
    value: "Improve action",
    note: "Audit starts, report unlocks, CTA clicks, calls, lead quality, and page friction.",
    icon: Activity,
  },
  {
    label: "Authority / GEO",
    value: "Earn trust",
    note: "Schema, llms.txt, entity clarity, internal links, proof assets, citations, and backlinks.",
    icon: Link2,
  },
  {
    label: "Taste",
    value: "Avoid sludge",
    note: "External examples, B's corrections, objections, founder POV, and high-performing adjacent formats.",
    icon: BarChart3,
  },
];

const priorityBacklog = [
  "Add fast triage to /hire so visitors can pick the bottleneck first, then enter the guided audit with context.",
  "Publish /ai-visibility-optimization as the Package #2 money page and connect it to the AI visibility prompt tracker.",
  "Baseline the selected SEO keywords and record date, position, ranking URL, SERP notes, and next improvement.",
  "Run the first AI answer snapshot for tracked prompts across ChatGPT, Gemini, Perplexity, and Google AI surfaces.",
  "Create a reusable diagnostic asset: What should your business automate first?",
  "Add internal links from homepage, services, /hire, articles, and related service pages into every P1 target page.",
];

const moduleRules = [
  "Do not treat this module as monitoring only; every review must produce a next action or a deliberate hold.",
  "Keep 247ROI positioned as business systems using AI, automation, custom software, dashboards, internal apps, and agents.",
  "Use AI Employees as a sales metaphor and content cluster, not the whole front-door category.",
  "Anchor conversion around the AI Opportunity Audit.",
  "Avoid spam backlinks, thin AI pages, fake proof, and overclaiming AI results.",
];

const externalInputs = [
  "Competitor landing pages and posts",
  "SERPs and People Also Ask patterns",
  "ChatGPT, Gemini, Perplexity, and AI Overview answers",
  "Business-owner language from calls, forums, reviews, and objections",
  "B's corrections, opinions, phrases, and examples",
  "Adjacent high-performing posts with reusable structure",
];

const contentRules = [
  "Hook first; the opening line must create curiosity, urgency, frustration, or recognition.",
  "Use short lines and visible structure. No walls of text.",
  "Never use generic AI filler: delve, testament, revolutionize, tapestry, in conclusion.",
  "Every page section or post must teach, provoke, demonstrate, clarify, or convert.",
  "Extract frameworks from examples without copying the wording.",
];

const thirtyDayMap = [
  {
    week: "Week 1",
    title: "Foundation and Audit",
    actions: "Fix event ingestion, audit conversion flow, inventory schema/internal links, define page gaps.",
  },
  {
    week: "Week 2",
    title: "Money Pages",
    actions: "Improve homepage and AI Opportunity Audit path; build or upgrade core service pages.",
  },
  {
    week: "Week 3",
    title: "Answer Engine Cluster",
    actions: "Publish answer pages for bottleneck workflows and AI employee use cases.",
  },
  {
    week: "Week 4",
    title: "Authority and Iteration",
    actions: "Add proof assets, start authority target list, run AI visibility checks, improve pages with signal.",
  },
];

const keywordSelectionRead = [
  {
    title: "High competition / high value",
    description: "Flagship category terms we want long term, but should not expect to win quickly.",
    next: "Keep pages live, build authority, earn links, and support with narrower pages.",
  },
  {
    title: "Medium competition / high value",
    description: "Commercial terms where a focused page can start getting impressions before the brand is strong.",
    next: "Use Search Console queries to tune H1s, titles, answer blocks, FAQs, and internal links.",
  },
  {
    title: "Low competition / useful long tail",
    description: "Specific questions and pain-language searches that can create the first clicks and AI citations.",
    next: "Publish helpful answer pages and route them into the AI Opportunity Audit.",
  },
];

async function loadBrandOverview() {
  try {
    return await getBrandSiteOverview();
  } catch {
    return null;
  }
}

async function loadSearchConsolePerformance() {
  try {
    return await getSearchConsolePerformance();
  } catch {
    return null;
  }
}

function metricValue(value: number | null | undefined) {
  if (typeof value !== "number") return "Pending";
  return value.toLocaleString();
}

function statusTone(status: string) {
  if (status === "live") return "good";
  if (status === "next") return "warn";
  if (status === "page-live") return "good";
  if (status === "active") return "good";
  if (status === "needs-upgrade") return "warn";
  if (status === "queued") return "warn";
  if (status === "done") return "neutral";
  if (status === "needed") return "danger";
  if (status === "blocked") return "danger";
  return "danger";
}

function trendTone(trend: string) {
  if (trend === "improving") return "good";
  if (trend === "baseline") return "gold";
  if (trend === "stalled") return "warn";
  return "danger";
}

function pct(value: number | null | undefined) {
  if (typeof value !== "number") return "Pending";
  return `${(value * 100).toFixed(value > 0 && value < 0.01 ? 2 : 1)}%`;
}

function pos(value: number | null | undefined) {
  if (typeof value !== "number") return "Pending";
  return value.toFixed(value >= 10 ? 1 : 2);
}

function rankingTone(position: number) {
  if (position <= 10) return "good";
  if (position <= 30) return "gold";
  if (position <= 60) return "warn";
  return "danger";
}

function pageLabel(url: string) {
  try {
    const parsed = new URL(url);
    return parsed.pathname === "/" ? "/" : parsed.pathname;
  } catch {
    return url;
  }
}

function playTone(play: string) {
  if (play === "flagship") return "danger";
  if (play === "commercial") return "gold";
  if (play === "long-tail") return "good";
  return "warn";
}

function competitionTone(competition: string) {
  if (competition === "high") return "danger";
  if (competition === "medium") return "gold";
  return "good";
}

function SearchConsoleRowCard({ row, index }: { row: SearchConsoleRow; index: number }) {
  const query = row.keys[0] ?? "Unknown query";
  const width = Math.max(4, Math.min(100, (100 - Math.min(row.position, 100)) * 0.9));

  return (
    <div className="rounded-md border border-white/10 bg-white/5 p-4">
      <div className="mb-3 flex items-start justify-between gap-4">
        <div className="flex min-w-0 items-start gap-3">
          <div className="flex size-8 shrink-0 items-center justify-center rounded-md bg-[#ffffff] text-sm font-semibold text-[#ff5a1f]">
            {index + 1}
          </div>
          <div className="min-w-0">
            <p className="text-sm font-semibold leading-6 text-[#ffffff]">{query}</p>
            <p className="mt-1 text-xs font-semibold uppercase tracking-[0.14em] text-[#ff6a2a]">
              {row.impressions} impressions / {row.clicks} clicks / CTR {pct(row.ctr)}
            </p>
          </div>
        </div>
        <StatusBadge tone={rankingTone(row.position)}>Avg {pos(row.position)}</StatusBadge>
      </div>
      <div className="h-3 overflow-hidden rounded-full bg-[rgba(255,255,255,0.12)]">
        <div className="h-full rounded-full bg-[#ff5a1f]" style={{ width: `${width}%` }} />
      </div>
      <p className="mt-3 text-sm leading-6 text-[#c9c9c9]">
        {row.position <= 20
          ? "Near enough to deserve supporting links and a sharper answer block."
          : row.impressions >= 10
            ? "Google is testing the topic, but the page needs more authority and relevance."
            : "Early discovery signal. Track it, but do not over-optimize from one row."}
      </p>
    </div>
  );
}

export default async function SeoPage() {
  const brandOverview = await loadBrandOverview();
  const searchConsole = await loadSearchConsolePerformance();
  const averageStanding =
    standingScores.reduce((sum, item) => sum + item.score, 0) / standingScores.length;
  const targetAverage =
    standingScores.reduce((sum, item) => sum + item.targetScore, 0) / standingScores.length;
  const pageLiveTargets = seoKeywordTargets.filter((target) => target.status === "page-live").length;
  const needsUpgradeTargets = seoKeywordTargets.filter((target) => target.status === "needs-upgrade").length;
  const pageNeededTargets = seoKeywordTargets.filter((target) => target.status === "page-needed").length;
  const aiPendingTargets = aiVisibilityTargets.filter((target) =>
    target.currentVisibility.toLowerCase().includes("pending"),
  ).length;
  const authorityDoneTargets = authorityTargets.filter((target) => target.status === "done").length;
  const authorityOpenTargets = authorityTargets.length - authorityDoneTargets;
  const highCompetitionTargets = seoKeywordTargets.filter((target) => target.competition === "high").length;
  const mediumCompetitionTargets = seoKeywordTargets.filter((target) => target.competition === "medium").length;
  const lowCompetitionTargets = seoKeywordTargets.filter((target) => target.competition === "low").length;
  const highValueTargets = seoKeywordTargets.filter((target) => target.value === "high").length;
  const flagshipTargets = seoKeywordTargets.filter((target) => target.play === "flagship").length;
  const commercialTargets = seoKeywordTargets.filter((target) => target.play === "commercial").length;
  const longTailTargets = seoKeywordTargets.filter((target) => target.play === "long-tail").length;
  const wedgeTargets = seoKeywordTargets.filter((target) => target.play === "wedge").length;
  const queryRows = [...(searchConsole?.queries ?? [])].sort(
    (a, b) => b.impressions - a.impressions || a.position - b.position,
  );
  const pageRows = [...(searchConsole?.pages ?? [])].sort(
    (a, b) => b.impressions - a.impressions || a.position - b.position,
  );
  const queryPageRows = [...(searchConsole?.queryPages ?? [])].sort(
    (a, b) => b.impressions - a.impressions || a.position - b.position,
  );
  const topQuery = queryRows[0];
  const topPage = pageRows[0];
  const strikingDistanceQueries = queryRows.filter((row) => row.position <= 20).length;
  const buriedQueries = queryRows.filter((row) => row.position > 50).length;
  const impressionNoClickQueries = queryRows.filter((row) => row.impressions > 0 && row.clicks === 0).length;
  const pagesWithImpressions = pageRows.length;
  const aiReadyTargets = aiVisibilityTargets.length - aiPendingTargets;
  const proofActions = [
    {
      title: "Rewrite the AI employee page title/meta around the exact query Google is already testing.",
      proof: topQuery ? `${topQuery.keys[0]} has ${topQuery.impressions} impressions` : "Waiting for query data",
      icon: FileSearch,
    },
    {
      title: "Push the operations coordinator page because it is closest to page-one visibility.",
      proof:
        queryRows.find((row) => row.keys[0]?.includes("operations coordinator"))
          ? "Average position 11 for the live query"
          : "Use the closest GSC query once available",
      icon: TrendingUp,
    },
    {
      title: "Build supporting internal links from homepage/services/articles into the pages Google is testing.",
      proof: `${pagesWithImpressions} pages have impressions`,
      icon: Route,
    },
    {
      title: "Run AI answer snapshots so the visibility module stops guessing about ChatGPT/Gemini/Perplexity.",
      proof: `${aiPendingTargets} prompt checks still pending`,
      icon: Telescope,
    },
  ];
  const progressMarkers = [
    {
      label: "GSC wired",
      value: "Done",
      detail: "Search Console is live in the command center.",
      tone: "good" as const,
    },
    {
      label: "Google signal",
      value: metricValue(searchConsole?.impressions),
      detail: "Impressions in the current GSC window.",
      tone: "gold" as const,
    },
    {
      label: "First click",
      value: metricValue(searchConsole?.clicks),
      detail: "Not earned yet. This is the next visible milestone.",
      tone: searchConsole?.clicks ? ("good" as const) : ("warn" as const),
    },
    {
      label: "AI proof",
      value: `${aiReadyTargets}/${aiVisibilityTargets.length}`,
      detail: "Prompt targets with some visibility status recorded.",
      tone: aiPendingTargets ? ("warn" as const) : ("good" as const),
    },
  ];
  const liveMetrics = [
    {
      label: "Page views",
      value: metricValue(brandOverview?.siteEvents.pageViews7Days),
      note: "Last 7 days from command-center-owned site events.",
      icon: Activity,
    },
    {
      label: "CTA clicks",
      value: metricValue(brandOverview?.siteEvents.ctaClicks7Days),
      note: "Last 7 days across tracked audit and nav CTAs.",
      icon: CheckCircle2,
    },
    {
      label: "Audit starts",
      value: metricValue(brandOverview?.siteEvents.aiOpportunityAuditStarts7Days),
      note: "AI Opportunity Audit sessions started in the last 7 days.",
      icon: Search,
    },
    {
      label: "Audit unlocks",
      value: metricValue(brandOverview?.siteEvents.aiOpportunityAuditUnlocks7Days),
      note: "AI Opportunity Audit reports unlocked in the last 7 days.",
      icon: BarChart3,
    },
    {
      label: "30d visitors",
      value: metricValue(brandOverview?.siteEvents.uniqueVisitorEvents30Days),
      note: "Distinct tracked visitor IDs from command-center-owned site events.",
      icon: Target,
    },
    {
      label: "GSC clicks",
      value: metricValue(searchConsole?.clicks),
      note: searchConsole?.siteUrl
        ? `${searchConsole.startDate} to ${searchConsole.endDate} from Search Console.`
        : "Pending Search Console service-account credentials.",
      icon: FileSearch,
    },
    {
      label: "GSC impressions",
      value: metricValue(searchConsole?.impressions),
      note: searchConsole?.siteUrl
        ? `${searchConsole.startDate} to ${searchConsole.endDate} from Search Console.`
        : "Pending Search Console service-account credentials.",
      icon: Sparkles,
    },
  ];

  return (
    <AppShell>
      <PageHeader
        eyebrow="SEO / GEO Command"
        title="Google is testing 247ROI. Now turn impressions into proof."
        description="This tab translates Search Console, site events, ranking gaps, AI visibility, and authority work into the next moves that should improve discovery and demand."
        action={
          <div className="flex flex-wrap gap-2">
            <StatusBadge tone="good">GSC live</StatusBadge>
            <StatusBadge tone="gold">Active owner: Athena</StatusBadge>
          </div>
        }
      />

      <div className="mb-5 grid gap-5 xl:grid-cols-[1.2fr_0.8fr]">
        <section className="rounded-lg border border-[#ff5a1f]/35 bg-black p-5 text-white shadow-[0_0_60px_rgba(255,90,31,0.14)]">
          <div className="flex flex-col gap-5 lg:flex-row lg:items-start lg:justify-between">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#ff5a1f]">
                Search Console read
              </p>
              <h2 className="mt-2 max-w-3xl text-2xl font-semibold leading-tight sm:text-3xl">
                {searchConsole?.impressions
                  ? `${searchConsole.impressions} impressions, ${searchConsole.clicks ?? 0} clicks`
                  : "Waiting for usable Google demand"}
              </h2>
              <p className="mt-3 max-w-3xl text-sm leading-6 text-[#d9cfbd]">
                {searchConsole?.siteUrl
                  ? `${searchConsole.startDate} to ${searchConsole.endDate}. Google is showing 247ROI for AI employee and operations-coordinator searches, but the current job is relevance and authority, not conversion optimization.`
                  : "Search Console is not returning usable data yet. The SEO page should stay in setup mode until impressions appear."}
              </p>
            </div>
            <div className="grid min-w-64 grid-cols-2 gap-3">
              <div className="rounded-md border border-white/12 bg-white/8 p-4">
                <div className="flex items-center gap-2 text-[#ff5a1f]">
                  <Eye size={17} />
                  <span className="text-xs font-semibold uppercase tracking-[0.14em]">Impressions</span>
                </div>
                <p className="mt-3 text-3xl font-semibold">{metricValue(searchConsole?.impressions)}</p>
              </div>
              <div className="rounded-md border border-white/12 bg-white/8 p-4">
                <div className="flex items-center gap-2 text-[#ff5a1f]">
                  <MousePointerClick size={17} />
                  <span className="text-xs font-semibold uppercase tracking-[0.14em]">CTR</span>
                </div>
                <p className="mt-3 text-3xl font-semibold">{pct(searchConsole?.ctr)}</p>
              </div>
              <div className="rounded-md border border-white/12 bg-white/8 p-4">
                <div className="flex items-center gap-2 text-[#ff5a1f]">
                  <Gauge size={17} />
                  <span className="text-xs font-semibold uppercase tracking-[0.14em]">Avg pos</span>
                </div>
                <p className="mt-3 text-3xl font-semibold">{pos(searchConsole?.averagePosition)}</p>
              </div>
              <div className="rounded-md border border-white/12 bg-white/8 p-4">
                <div className="flex items-center gap-2 text-[#ff5a1f]">
                  <Search size={17} />
                  <span className="text-xs font-semibold uppercase tracking-[0.14em]">Queries</span>
                </div>
                <p className="mt-3 text-3xl font-semibold">{queryRows.length}</p>
              </div>
            </div>
          </div>
        </section>

        <DashboardCard title="Operator Read" eyebrow="What this means">
          <div className="space-y-4">
            <div className="rounded-md border border-white/10 bg-white/5 p-4">
              <p className="text-xs font-semibold uppercase tracking-[0.14em] text-[#ff6a2a]">
                Best current signal
              </p>
              <p className="mt-2 text-lg font-semibold leading-7 text-[#ffffff]">
                {topQuery?.keys[0] ?? "No query signal yet"}
              </p>
              <p className="mt-2 text-sm leading-6 text-[#c9c9c9]">
                {topQuery
                  ? `${topQuery.impressions} impressions at average position ${pos(topQuery.position)}.`
                  : "Need Search Console rows before picking a query to improve."}
              </p>
            </div>
            <div className="rounded-md border border-white/10 bg-white/5 p-4">
              <p className="text-xs font-semibold uppercase tracking-[0.14em] text-[#ff6a2a]">
                Best current page
              </p>
              <p className="mt-2 text-lg font-semibold leading-7 text-[#ffffff]">
                {topPage ? pageLabel(topPage.keys[0] ?? "") : "No page signal yet"}
              </p>
              <p className="mt-2 text-sm leading-6 text-[#c9c9c9]">
                {topPage
                  ? `${topPage.impressions} impressions. Use it as the first page to tune from real demand.`
                  : "Need page-level GSC data before choosing the first page."}
              </p>
            </div>
          </div>
        </DashboardCard>
      </div>

      {brandOverview?.siteEvents.feedStatus === "partial" && (
        <div className="mb-5 rounded-md border border-[#ff5a1f]/35 bg-[#ff5a1f]/10 px-4 py-3 text-sm leading-6 text-[#f2f2f2]">
          Command-center event feed is returning production metrics, but at least
          one metric query is currently unresolved. Treat visible counts as live
          and recheck before making conversion decisions.
        </div>
      )}

      {brandOverview?.siteEvents.feedStatus === "unavailable" && (
        <div className="mb-5 rounded-md border border-[#ff5a1f]/35 bg-[#ff5a1f]/10 px-4 py-3 text-sm leading-6 text-[#f2f2f2]">
          Command-center event feed is waiting on the `site_events` migration,
          `COMMAND_CENTER_EVENTS_SECRET`, and the public site&apos;s
          `COMMAND_CENTER_EVENTS_URL`.
        </div>
      )}

      <div className="mb-5 grid gap-5 xl:grid-cols-[0.85fr_1.15fr]">
        <DashboardCard title="Progress Arcade" eyebrow="What changed">
          <div className="grid gap-3 sm:grid-cols-2">
            {progressMarkers.map((marker) => (
              <div key={marker.label} className="rounded-md border border-white/10 bg-white/5 p-4">
                <div className="flex items-center justify-between gap-3">
                  <p className="text-xs font-semibold uppercase tracking-[0.14em] text-[#ff6a2a]">
                    {marker.label}
                  </p>
                  <StatusBadge tone={marker.tone}>{marker.value}</StatusBadge>
                </div>
                <p className="mt-4 text-sm leading-6 text-[#c9c9c9]">{marker.detail}</p>
              </div>
            ))}
          </div>
        </DashboardCard>

        <DashboardCard title="Keyword Portfolio" eyebrow="Are we targeting the right mix?">
          <div className="grid gap-5 lg:grid-cols-[0.9fr_1.1fr]">
            <div className="space-y-4">
              <SegmentedBar
                segments={[
                  { label: "high competition", value: highCompetitionTargets, tone: "danger" },
                  { label: "medium", value: mediumCompetitionTargets, tone: "gold" },
                  { label: "low", value: lowCompetitionTargets, tone: "good" },
                ]}
              />
              <SegmentedBar
                segments={[
                  { label: "flagship", value: flagshipTargets, tone: "danger" },
                  { label: "commercial", value: commercialTargets, tone: "gold" },
                  { label: "long tail", value: longTailTargets, tone: "good" },
                  { label: "wedge", value: wedgeTargets, tone: "warn" },
                ]}
              />
              <div className="rounded-md border border-[#ff5a1f]/30 bg-[#ff5a1f]/10 p-4">
                <p className="text-sm font-semibold text-white">Blunt read</p>
                <p className="mt-2 text-sm leading-6 text-[#c9c9c9]">
                  {highValueTargets}/{seoKeywordTargets.length} targets are high-value. The mix is directionally right, but we should lean harder into
                  long-tail proof pages until clicks appear. The flagship terms
                  are worth owning, not worth expecting to win early.
                </p>
              </div>
            </div>
            <div className="grid gap-3">
              {keywordSelectionRead.map((item) => (
                <div key={item.title} className="rounded-md border border-white/10 bg-black p-4">
                  <div className="flex items-start gap-3">
                    <Map size={18} className="mt-1 shrink-0 text-[#ff5a1f]" />
                    <div>
                      <p className="text-sm font-semibold text-white">{item.title}</p>
                      <p className="mt-1 text-sm leading-6 text-[#c9c9c9]">{item.description}</p>
                      <p className="mt-2 text-xs font-semibold uppercase tracking-[0.14em] text-[#ff8a3d]">
                        {item.next}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </DashboardCard>
      </div>

      <div className="mb-5 grid gap-5 xl:grid-cols-[0.95fr_1.05fr]">
        <DashboardCard title="Ranking Distance" eyebrow="How close are we?">
          <div className="space-y-4">
            <HorizontalBar
              label="Near page one"
              value={strikingDistanceQueries}
              max={Math.max(queryRows.length, 1)}
              detail={`${strikingDistanceQueries}/${queryRows.length} queries at avg position 20 or better`}
              tone={strikingDistanceQueries > 0 ? "good" : "warn"}
            />
            <HorizontalBar
              label="Buried"
              value={buriedQueries}
              max={Math.max(queryRows.length, 1)}
              detail={`${buriedQueries}/${queryRows.length} queries past position 50`}
              tone={buriedQueries > 0 ? "danger" : "good"}
            />
            <HorizontalBar
              label="No-click demand"
              value={impressionNoClickQueries}
              max={Math.max(queryRows.length, 1)}
              detail={`${impressionNoClickQueries}/${queryRows.length} queries shown with no clicks`}
              tone={impressionNoClickQueries > 0 ? "warn" : "good"}
            />
          </div>
          <p className="mt-5 text-sm leading-6 text-[#c9c9c9]">
            This is the fast read: green means push harder, gold means tune,
            red means the page needs more relevance, support, or authority.
          </p>
        </DashboardCard>

        <DashboardCard title="Proof Funnel" eyebrow="Demand to action">
          <div className="grid gap-4 md:grid-cols-4">
            {[
              {
                label: "Google impressions",
                value: metricValue(searchConsole?.impressions),
                detail: "Discovery signal",
                icon: Eye,
              },
              {
                label: "Clicks",
                value: metricValue(searchConsole?.clicks),
                detail: "Search result pull",
                icon: MousePointerClick,
              },
              {
                label: "Audit starts",
                value: metricValue(brandOverview?.siteEvents.aiOpportunityAuditStarts7Days),
                detail: "Intent captured",
                icon: Search,
              },
              {
                label: "Audit unlocks",
                value: metricValue(brandOverview?.siteEvents.aiOpportunityAuditUnlocks7Days),
                detail: "Lead proof",
                icon: CheckCircle2,
              },
            ].map((step, index) => {
              const Icon = step.icon;

              return (
                <div key={step.label} className="relative rounded-md border border-white/10 bg-white/5 p-4">
                  {index < 3 ? (
                    <ArrowUpRight className="absolute right-3 top-3 text-[#ff6a2a]" size={16} />
                  ) : null}
                  <Icon size={20} className="text-[#ff6a2a]" />
                  <p className="mt-4 text-2xl font-semibold text-[#ffffff]">{step.value}</p>
                  <p className="mt-1 text-sm font-semibold text-[#ffffff]">{step.label}</p>
                  <p className="mt-1 text-xs uppercase tracking-[0.12em] text-[#ff6a2a]">{step.detail}</p>
                </div>
              );
            })}
          </div>
        </DashboardCard>
      </div>

      <div className="mb-5 grid gap-5 xl:grid-cols-[1.15fr_0.85fr]">
        <DashboardCard title="Live Query Opportunities" eyebrow="From Google Search Console">
          {queryRows.length > 0 ? (
            <div className="space-y-3">
              {queryRows.slice(0, 6).map((row, index) => (
                <SearchConsoleRowCard key={row.keys.join("-")} row={row} index={index} />
              ))}
            </div>
          ) : (
            <p className="text-sm leading-6 text-[#c9c9c9]">
              No query rows returned yet. Once Google has more data, this area
              becomes the weekly page-improvement queue.
            </p>
          )}
        </DashboardCard>

        <div className="space-y-5">
          <DashboardCard title="Immediate Moves" eyebrow="What I should do next">
            <div className="space-y-3">
              {proofActions.map((action) => {
                const Icon = action.icon;

                return (
                  <div key={action.title} className="rounded-md border border-white/10 bg-white/5 p-4">
                    <div className="flex gap-3">
                      <div className="flex size-9 shrink-0 items-center justify-center rounded-md bg-[#ffffff] text-[#ff5a1f]">
                        <Icon size={18} />
                      </div>
                      <div>
                        <p className="text-sm font-semibold leading-6 text-[#ffffff]">{action.title}</p>
                        <p className="mt-1 text-xs font-semibold uppercase tracking-[0.14em] text-[#ff6a2a]">
                          {action.proof}
                        </p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </DashboardCard>

          <DashboardCard title="Target Coverage" eyebrow="Supply vs proof">
            <div className="space-y-5">
              <div>
                <p className="mb-3 text-sm font-semibold text-[#ffffff]">SEO page inventory</p>
                <SegmentedBar
                  segments={[
                    { label: "page live", value: pageLiveTargets, tone: "good" },
                    { label: "needs upgrade", value: needsUpgradeTargets, tone: "warn" },
                    { label: "page needed", value: pageNeededTargets, tone: "danger" },
                  ]}
                />
              </div>
              <div>
                <p className="mb-3 text-sm font-semibold text-[#ffffff]">Authority and AI visibility</p>
                <SegmentedBar
                  segments={[
                    { label: "authority done", value: authorityDoneTargets, tone: "good" },
                    { label: "authority open", value: authorityOpenTargets, tone: "danger" },
                    { label: "AI checks ready", value: aiReadyTargets, tone: "neutral" },
                    { label: "AI checks pending", value: aiPendingTargets, tone: "warn" },
                  ]}
                />
              </div>
            </div>
          </DashboardCard>
        </div>
      </div>

      <DashboardCard title="Pages Google Is Testing" eyebrow="Query to URL fit" className="mb-5">
        <div className="grid gap-3 xl:grid-cols-2">
          {queryPageRows.length > 0 ? (
            queryPageRows.slice(0, 8).map((row) => (
              <div key={row.keys.join("-")} className="rounded-md border border-white/10 bg-white/5 p-4">
                <div className="flex flex-wrap items-center gap-2">
                  <StatusBadge tone={rankingTone(row.position)}>Avg {pos(row.position)}</StatusBadge>
                  <span className="text-xs font-semibold uppercase tracking-[0.14em] text-[#ff6a2a]">
                    {row.impressions} impressions
                  </span>
                </div>
                <p className="mt-3 text-sm font-semibold leading-6 text-[#ffffff]">{row.keys[0]}</p>
                <p className="mt-2 text-sm leading-6 text-[#c9c9c9]">{pageLabel(row.keys[1] ?? "")}</p>
              </div>
            ))
          ) : (
            <p className="text-sm leading-6 text-[#c9c9c9]">No query-page rows returned yet.</p>
          )}
        </div>
      </DashboardCard>

      <div className="mb-5 grid gap-5 xl:grid-cols-[1fr_1fr]">
        <DashboardCard title="Growth Score Shape" eyebrow="Visual baseline">
          <div className="space-y-4">
            <HorizontalBar
              label="Current average"
              value={Number(averageStanding.toFixed(1))}
              max={10}
              detail={`${averageStanding.toFixed(1)}/10`}
              tone="gold"
            />
            <HorizontalBar
              label="Target average"
              value={Number(targetAverage.toFixed(1))}
              max={10}
              detail={`${targetAverage.toFixed(1)}/10`}
              tone="good"
            />
            {standingScores
              .filter((item) => item.score < 5)
              .map((item) => (
                <HorizontalBar
                  key={item.id}
                  label={item.area}
                  value={item.score}
                  max={10}
                  detail={`${item.score}/10`}
                  tone={item.score < 3 ? "danger" : "warn"}
                />
              ))}
          </div>
        </DashboardCard>

        <DashboardCard title="Live Site Demand" eyebrow="Traffic and conversion">
          <div className="grid gap-3 sm:grid-cols-2">
            {liveMetrics.map((metric) => {
              const Icon = metric.icon;

              return (
                <div key={metric.label} className="rounded-md border border-white/10 bg-white/5 p-4">
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <p className="text-xs font-semibold uppercase tracking-[0.14em] text-[#ff6a2a]">
                        {metric.label}
                      </p>
                      <p className="mt-2 text-2xl font-semibold text-[#ffffff]">{metric.value}</p>
                    </div>
                    <Icon size={18} className="text-[#ff6a2a]" />
                  </div>
                  <p className="mt-3 text-sm leading-6 text-[#c9c9c9]">{metric.note}</p>
                </div>
              );
            })}
          </div>
        </DashboardCard>
      </div>

      <DashboardCard title="Current Standing" eyebrow="Baseline scorecard" className="mb-5">
        <div className="mb-4 rounded-md border border-white/10 bg-white/5 p-3 text-sm leading-6 text-[#c9c9c9]">
          Scores are deliberately blunt operator ratings. They stay useful only
          when tied to proof: rankings, traffic, AI answer presence, audit
          starts, unlocks, qualified conversations, backlinks, and shipped page
          improvements.
        </div>
        <div className="grid gap-3 xl:grid-cols-5">
          {standingScores.map((item) => (
            <div key={item.id} className="rounded-md border border-white/10 bg-white/5 p-4">
              <div className="flex items-start justify-between gap-3">
                <div>
                  <p className="text-sm font-semibold text-[#ffffff]">{item.area}</p>
                  <p className="mt-2 text-4xl font-semibold tracking-normal text-[#ffffff]">
                    {item.score}
                    <span className="text-base font-medium text-[#c9c9c9]">/10</span>
                  </p>
                </div>
                <StatusBadge tone={trendTone(item.trend)}>
                  {item.trend}
                </StatusBadge>
              </div>
              <div className="mt-4 h-2 overflow-hidden rounded-full bg-[rgba(255,255,255,0.12)]">
                <div
                  className="h-full rounded-full bg-[#ff5a1f]"
                  style={{ width: `${Math.min(item.score * 10, 100)}%` }}
                />
              </div>
              <p className="mt-3 text-xs font-semibold uppercase tracking-[0.14em] text-[#ff6a2a]">
                Target: {item.targetScore}/10 / Updated {item.lastUpdated}
              </p>
              <p className="mt-3 text-sm leading-6 text-[#c9c9c9]">{item.currentStanding}</p>
              <p className="mt-3 text-sm leading-6 text-[#c9c9c9]">
                <span className="font-semibold text-[#ffffff]">Proof have: </span>
                {item.proofHave}
              </p>
              <p className="mt-3 text-sm leading-6 text-[#c9c9c9]">
                <span className="font-semibold text-[#ffffff]">Proof missing: </span>
                {item.proofMissing}
              </p>
              <p className="mt-3 text-sm leading-6 text-[#c9c9c9]">
                <span className="font-semibold text-[#ffffff]">Next: </span>
                {item.nextAction}
              </p>
            </div>
          ))}
        </div>
      </DashboardCard>

      <DashboardCard title="/hire Interface Plan" eyebrow="Conversion destination" className="mb-5">
        <div className="mb-4 rounded-md border border-white/10 bg-white/5 p-3 text-sm leading-6 text-[#c9c9c9]">
          The most effective traffic destination is still /hire, but it should
          work as a diagnostic landing page, not just a chat screen. SEO and
          useful tools should feed it; the interface should quickly sort the
          visitor into the right bottleneck path.
        </div>
        <div className="grid gap-3 xl:grid-cols-5">
          {hirePageInterfacePlan.map((item) => (
            <div key={item.layer} className="rounded-md border border-white/10 bg-white/5 p-4">
              <div className="flex flex-wrap items-center gap-2">
                <StatusBadge tone={statusTone(item.status)}>{item.status}</StatusBadge>
                <span className="text-xs font-semibold uppercase tracking-[0.14em] text-[#ff6a2a]">
                  {item.layer}
                </span>
              </div>
              <p className="mt-3 text-sm leading-6 text-[#c9c9c9]">{item.purpose}</p>
              <p className="mt-3 text-sm leading-6 text-[#c9c9c9]">
                <span className="font-semibold text-[#ffffff]">Build: </span>
                {item.implementation}
              </p>
              <p className="mt-3 text-sm leading-6 text-[#c9c9c9]">
                <span className="font-semibold text-[#ffffff]">Metric: </span>
                {item.successMetric}
              </p>
            </div>
          ))}
        </div>
      </DashboardCard>

      <div className="mb-5 grid gap-5 xl:grid-cols-[1.1fr_0.9fr]">
        <DashboardCard title="Selected SEO Targets" eyebrow="Rank, track, iterate">
          <div className="mb-4 rounded-md border border-white/10 bg-white/5 p-3 text-sm leading-6 text-[#c9c9c9]">
            These are the active ranking targets. Baselines move from pending
            to measured after Search Console/Bing access and first manual SERP
            checks are connected to this board.
          </div>
          <div className="overflow-x-auto">
            <table className="w-full min-w-[1040px] border-separate border-spacing-0 text-left text-sm">
              <thead className="text-xs uppercase tracking-[0.14em] text-[#ff6a2a]">
                <tr>
                  <th className="border-b border-white/10 px-3 py-2 font-semibold">Keyword</th>
                  <th className="border-b border-white/10 px-3 py-2 font-semibold">Priority</th>
                  <th className="border-b border-white/10 px-3 py-2 font-semibold">Play</th>
                  <th className="border-b border-white/10 px-3 py-2 font-semibold">Difficulty</th>
                  <th className="border-b border-white/10 px-3 py-2 font-semibold">Target page</th>
                  <th className="border-b border-white/10 px-3 py-2 font-semibold">Status</th>
                  <th className="border-b border-white/10 px-3 py-2 font-semibold">Baseline</th>
                  <th className="border-b border-white/10 px-3 py-2 font-semibold">Next action</th>
                </tr>
              </thead>
              <tbody>
                {seoKeywordTargets.map((target) => (
                  <tr key={target.term} className="align-top">
                    <td className="border-b border-white/10 px-3 py-3 font-semibold text-[#ffffff]">
                      {target.term}
                    </td>
                    <td className="border-b border-white/10 px-3 py-3">
                      <StatusBadge tone={target.priority === "P1" ? "gold" : "neutral"}>
                        {target.priority}
                      </StatusBadge>
                    </td>
                    <td className="border-b border-white/10 px-3 py-3">
                      <StatusBadge tone={playTone(target.play)}>
                        {target.play.replace("-", " ")}
                      </StatusBadge>
                    </td>
                    <td className="border-b border-white/10 px-3 py-3">
                      <div className="flex flex-wrap gap-2">
                        <StatusBadge tone={competitionTone(target.competition)}>
                          {target.competition}
                        </StatusBadge>
                        <StatusBadge tone={target.value === "high" ? "gold" : "neutral"}>
                          {target.value} value
                        </StatusBadge>
                      </div>
                    </td>
                    <td className="border-b border-white/10 px-3 py-3 text-[#c9c9c9]">
                      {target.targetPage}
                    </td>
                    <td className="border-b border-white/10 px-3 py-3">
                      <StatusBadge tone={statusTone(target.status)}>
                        {target.status.replace("-", " ")}
                      </StatusBadge>
                    </td>
                    <td className="border-b border-white/10 px-3 py-3 text-[#c9c9c9]">
                      {target.baseline}
                    </td>
                    <td className="border-b border-white/10 px-3 py-3 leading-6 text-[#c9c9c9]">
                      {target.nextAction}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </DashboardCard>

        <DashboardCard title="AI Visibility Targets" eyebrow="Answer-engine checks">
          <div className="space-y-3">
            {aiVisibilityTargets.map((target) => (
              <div key={target.prompt} className="rounded-md border border-white/10 bg-white/5 p-3">
                <div className="flex flex-wrap items-center gap-2">
                  <StatusBadge tone={target.priority === "P1" ? "gold" : "neutral"}>
                    {target.priority}
                  </StatusBadge>
                  <span className="text-xs font-semibold uppercase tracking-[0.14em] text-[#ff6a2a]">
                    {target.currentVisibility}
                  </span>
                </div>
                <p className="mt-3 text-sm font-semibold leading-6 text-[#ffffff]">
                  {target.prompt}
                </p>
                <p className="mt-2 text-sm leading-6 text-[#c9c9c9]">
                  Target: {target.targetPage}
                </p>
                <p className="mt-2 text-sm leading-6 text-[#c9c9c9]">
                  {target.nextAction}
                </p>
              </div>
            ))}
          </div>
        </DashboardCard>
      </div>

      <DashboardCard title="One-Time Setup vs Recurring Growth Work" eyebrow="Automation map" className="mb-5">
        <div className="grid gap-3 xl:grid-cols-2">
          {growthActions.map((action) => (
            <div key={action.name} className="rounded-md border border-white/10 bg-white/5 p-4">
              <div className="flex flex-wrap items-center gap-2">
                <StatusBadge tone={action.cadence === "one-time" ? "neutral" : "gold"}>
                  {action.cadence}
                </StatusBadge>
                <StatusBadge tone={statusTone(action.status)}>
                  {action.status}
                </StatusBadge>
                <span className="text-xs font-semibold uppercase tracking-[0.14em] text-[#ff6a2a]">
                  {action.owner}
                </span>
              </div>
              <h3 className="mt-3 text-base font-semibold text-[#ffffff]">{action.name}</h3>
              <p className="mt-2 text-sm leading-6 text-[#c9c9c9]">
                <span className="font-semibold text-[#ffffff]">Proof: </span>
                {action.proof}
              </p>
              <p className="mt-2 text-sm leading-6 text-[#c9c9c9]">
                <span className="font-semibold text-[#ffffff]">Next: </span>
                {action.nextAction}
              </p>
            </div>
          ))}
        </div>
      </DashboardCard>

      <DashboardCard title="Authority Target List" eyebrow="Trust and citations" className="mb-5">
        <div className="mb-4 rounded-md border border-white/10 bg-white/5 p-3 text-sm leading-6 text-[#c9c9c9]">
          Authority is the weakest controllable area right now. This list keeps
          backlinks, mentions, profiles, partner traffic, and proof assets
          attached to specific actions instead of vague SEO wishes.
        </div>
        <div className="grid gap-3 xl:grid-cols-5">
          {authorityTargets.map((target) => (
            <div key={target.name} className="rounded-md border border-white/10 bg-white/5 p-4">
              <div className="flex flex-wrap items-center gap-2">
                <StatusBadge tone={target.priority === "P1" ? "gold" : "neutral"}>
                  {target.priority}
                </StatusBadge>
                <StatusBadge tone={statusTone(target.status)}>
                  {target.status}
                </StatusBadge>
                <span className="text-xs font-semibold uppercase tracking-[0.14em] text-[#ff6a2a]">
                  {target.type}
                </span>
              </div>
              <h3 className="mt-3 text-sm font-semibold text-[#ffffff]">{target.name}</h3>
              <p className="mt-3 text-sm leading-6 text-[#c9c9c9]">{target.rationale}</p>
              <p className="mt-3 text-sm leading-6 text-[#c9c9c9]">
                <span className="font-semibold text-[#ffffff]">Next: </span>
                {target.nextAction}
              </p>
            </div>
          ))}
        </div>
      </DashboardCard>

      <DashboardCard title="Manual Search Baseline" eyebrow="Indexing proof" className="mb-5">
        <div className="mb-4 rounded-md border border-white/10 bg-white/5 p-3 text-sm leading-6 text-[#c9c9c9]">
          This is the first manual search baseline while Search Console and Bing are not connected.
          It prevents the growth loop from pretending rankings are measured when they are not.
        </div>
        <div className="grid gap-3 xl:grid-cols-2">
          {searchBaselines.map((baseline) => (
            <div key={baseline.query} className="rounded-md border border-white/10 bg-white/5 p-4">
              <div className="flex flex-wrap items-center gap-2">
                <StatusBadge tone={baseline.standing === "indexed" ? "good" : baseline.standing === "stale-result" ? "warn" : "danger"}>
                  {baseline.standing.replace("-", " ")}
                </StatusBadge>
                <span className="text-xs font-semibold uppercase tracking-[0.14em] text-[#ff6a2a]">
                  {baseline.checkedAt}
                </span>
              </div>
              <h3 className="mt-3 text-sm font-semibold text-[#ffffff]">{baseline.query}</h3>
              <p className="mt-3 text-sm leading-6 text-[#c9c9c9]">{baseline.notes}</p>
              {baseline.observed247RoiUrls.length > 0 ? (
                <p className="mt-3 text-sm leading-6 text-[#c9c9c9]">
                  <span className="font-semibold text-[#ffffff]">Observed: </span>
                  {baseline.observed247RoiUrls.join(", ")}
                </p>
              ) : null}
              <p className="mt-3 text-sm leading-6 text-[#c9c9c9]">
                <span className="font-semibold text-[#ffffff]">Next: </span>
                {baseline.nextAction}
              </p>
            </div>
          ))}
        </div>
      </DashboardCard>

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {operatingMetrics.map((metric) => {
          const Icon = metric.icon;

          return (
            <DashboardCard key={metric.label} title={metric.label}>
              <div className="flex min-h-44 flex-col justify-between gap-4">
                <div className="flex items-start justify-between gap-4">
                  <p className="text-2xl font-semibold leading-tight">{metric.value}</p>
                  <div className="flex size-10 shrink-0 items-center justify-center rounded-md bg-[#ffffff] text-[#ff5a1f]">
                    <Icon size={20} />
                  </div>
                </div>
                <p className="text-sm leading-6 text-[#c9c9c9]">{metric.note}</p>
              </div>
            </DashboardCard>
          );
        })}
      </div>

      <div className="mt-5 grid gap-5 xl:grid-cols-[1.15fr_0.85fr]">
        <DashboardCard title="Priority Backlog" eyebrow="Next actions">
          <div className="space-y-3">
            {priorityBacklog.map((item, index) => (
              <div
                key={item}
                className="flex gap-3 rounded-md border border-white/10 bg-white/5 p-3"
              >
                <div className="flex size-7 shrink-0 items-center justify-center rounded-md bg-[rgba(255,255,255,0.12)] text-sm font-semibold text-[#ff6a2a]">
                  {index + 1}
                </div>
                <p className="text-sm leading-6 text-[#c9c9c9]">{item}</p>
              </div>
            ))}
          </div>
        </DashboardCard>

        <div className="space-y-5">
          <DashboardCard title="30-Day Execution Map" eyebrow="Growth cycle">
            <div className="space-y-3">
              {thirtyDayMap.map((item) => (
                <div key={item.week} className="rounded-md border border-white/10 bg-white/5 p-3">
                  <div className="flex items-center justify-between gap-3">
                    <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[#ff6a2a]">
                      {item.week}
                    </p>
                    <ListChecks size={16} className="text-[#ff6a2a]" />
                  </div>
                  <p className="mt-2 text-sm font-semibold text-[#ffffff]">{item.title}</p>
                  <p className="mt-1 text-sm leading-6 text-[#c9c9c9]">{item.actions}</p>
                </div>
              ))}
            </div>
          </DashboardCard>

          <DashboardCard title="Operating Rule" eyebrow="Module contract">
            <div className="space-y-4 text-sm leading-6 text-[#c9c9c9]">
              <div className="flex gap-3">
                <ShieldCheck size={18} className="mt-1 shrink-0 text-[#ff6a2a]" />
                <p>
                  Every SEO, GEO, content, backlink, and site-quality action
                  must map to traffic, AI understanding, trust, audit requests,
                  booked calls, pipeline, or authority.
                </p>
              </div>
              <div className="flex gap-3">
                <Waypoints size={18} className="mt-1 shrink-0 text-[#ff6a2a]" />
                <p>
                  Social, outbound, and site pages should share the same source
                  of truth: 247ROI finds the bottleneck worth fixing first, then
                  builds practical systems that save time and create ROI.
                </p>
              </div>
            </div>
          </DashboardCard>
        </div>
      </div>

      <div className="mt-5 grid gap-5 xl:grid-cols-2">
        <DashboardCard title="External Inputs" eyebrow="Anti echo chamber">
          <div className="grid gap-3 sm:grid-cols-2">
            {externalInputs.map((input) => (
              <div key={input} className="flex gap-3 rounded-md border border-white/10 bg-white/5 p-3">
                <Sparkles size={16} className="mt-1 shrink-0 text-[#ff6a2a]" />
                <p className="text-sm leading-6 text-[#c9c9c9]">{input}</p>
              </div>
            ))}
          </div>
        </DashboardCard>

        <DashboardCard title="Voice and Quality Gates" eyebrow="No generic AI output">
          <ul className="space-y-3 text-sm leading-6 text-[#c9c9c9]">
            {[...contentRules, ...moduleRules].map((rule) => (
              <li key={rule} className="flex gap-3">
                <FileSearch size={16} className="mt-1 shrink-0 text-[#ff6a2a]" />
                <span>{rule}</span>
              </li>
            ))}
          </ul>
        </DashboardCard>
      </div>
    </AppShell>
  );
}
