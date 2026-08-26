import {
  Activity,
  BarChart3,
  CheckCircle2,
  FileSearch,
  Link2,
  ListChecks,
  Search,
  ShieldCheck,
  Sparkles,
  Target,
  Waypoints,
} from "lucide-react";
import { AppShell } from "@/components/app-shell";
import { DashboardCard, PageHeader, StatusBadge } from "@/components/dashboard-card";
import {
  aiVisibilityTargets,
  growthActions,
  hirePageInterfacePlan,
  seoKeywordTargets,
  siteStandingScores,
} from "@/data/seo-targets";
import { searchBaselines } from "@/data/search-baselines";
import { getBrandSiteOverview } from "@/lib/brand-site/server";

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

async function loadBrandOverview() {
  try {
    return await getBrandSiteOverview();
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
  return "danger";
}

function trendTone(trend: string) {
  if (trend === "improving") return "good";
  if (trend === "baseline") return "gold";
  if (trend === "stalled") return "warn";
  return "danger";
}

export default async function SeoPage() {
  const brandOverview = await loadBrandOverview();
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
      note: "Visitor event count until distinct visitor snapshots are added.",
      icon: Target,
    },
  ];

  return (
    <AppShell>
      <PageHeader
        eyebrow="SEO / GEO Command"
        title="Make 247ROI easier to find, understand, trust, and choose."
        description="This module owns website quality, technical SEO, AI visibility, content architecture, authority building, and the AI Opportunity Audit conversion path."
        action={<StatusBadge tone="gold">Active owner: Athena</StatusBadge>}
      />

      <div className="mb-5 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {liveMetrics.map((metric) => {
          const Icon = metric.icon;

          return (
            <DashboardCard key={metric.label} title={metric.label}>
              <div className="flex min-h-36 flex-col justify-between gap-4">
                <div className="flex items-start justify-between gap-4">
                  <p className="text-3xl font-semibold leading-tight">{metric.value}</p>
                  <div className="flex size-10 shrink-0 items-center justify-center rounded-md bg-[#171511] text-[#d6a034]">
                    <Icon size={20} />
                  </div>
                </div>
                <p className="text-sm leading-6 text-[#665d4e]">{metric.note}</p>
              </div>
            </DashboardCard>
          );
        })}
      </div>

      {!brandOverview?.siteEvents.tableReady && (
        <div className="mb-5 rounded-md border border-[#e2c16d] bg-[#fff7df] px-4 py-3 text-sm leading-6 text-[#665d4e]">
          Command-center event feed is waiting on the `site_events` migration,
          `COMMAND_CENTER_EVENTS_SECRET`, and the public site&apos;s
          `COMMAND_CENTER_EVENTS_URL`.
        </div>
      )}

      <DashboardCard title="Current Standing" eyebrow="Baseline scorecard" className="mb-5">
        <div className="mb-4 rounded-md border border-[#ded6c8] bg-white/55 p-3 text-sm leading-6 text-[#665d4e]">
          Scores are deliberately blunt operator ratings. They stay useful only
          when tied to proof: rankings, traffic, AI answer presence, audit
          starts, unlocks, qualified conversations, backlinks, and shipped page
          improvements.
        </div>
        <div className="grid gap-3 xl:grid-cols-5">
          {siteStandingScores.map((item) => (
            <div key={item.area} className="rounded-md border border-[#ded6c8] bg-white/55 p-4">
              <div className="flex items-start justify-between gap-3">
                <div>
                  <p className="text-sm font-semibold text-[#171511]">{item.area}</p>
                  <p className="mt-2 text-4xl font-semibold tracking-normal text-[#171511]">
                    {item.score}
                    <span className="text-base font-medium text-[#7a6e5b]">/10</span>
                  </p>
                </div>
                <StatusBadge tone={trendTone(item.trend)}>
                  {item.trend}
                </StatusBadge>
              </div>
              <div className="mt-4 h-2 overflow-hidden rounded-full bg-[#ece5d7]">
                <div
                  className="h-full rounded-full bg-[#d6a034]"
                  style={{ width: `${Math.min(item.score * 10, 100)}%` }}
                />
              </div>
              <p className="mt-3 text-xs font-semibold uppercase tracking-[0.14em] text-[#8b6a22]">
                Target: {item.targetScore}/10
              </p>
              <p className="mt-3 text-sm leading-6 text-[#665d4e]">{item.currentStanding}</p>
              <p className="mt-3 text-sm leading-6 text-[#665d4e]">
                <span className="font-semibold text-[#171511]">Proof needed: </span>
                {item.proofNeeded}
              </p>
              <p className="mt-3 text-sm leading-6 text-[#665d4e]">
                <span className="font-semibold text-[#171511]">Next: </span>
                {item.nextAction}
              </p>
            </div>
          ))}
        </div>
      </DashboardCard>

      <DashboardCard title="/hire Interface Plan" eyebrow="Conversion destination" className="mb-5">
        <div className="mb-4 rounded-md border border-[#ded6c8] bg-white/55 p-3 text-sm leading-6 text-[#665d4e]">
          The most effective traffic destination is still /hire, but it should
          work as a diagnostic landing page, not just a chat screen. SEO and
          useful tools should feed it; the interface should quickly sort the
          visitor into the right bottleneck path.
        </div>
        <div className="grid gap-3 xl:grid-cols-5">
          {hirePageInterfacePlan.map((item) => (
            <div key={item.layer} className="rounded-md border border-[#ded6c8] bg-white/55 p-4">
              <div className="flex flex-wrap items-center gap-2">
                <StatusBadge tone={statusTone(item.status)}>{item.status}</StatusBadge>
                <span className="text-xs font-semibold uppercase tracking-[0.14em] text-[#8b6a22]">
                  {item.layer}
                </span>
              </div>
              <p className="mt-3 text-sm leading-6 text-[#665d4e]">{item.purpose}</p>
              <p className="mt-3 text-sm leading-6 text-[#665d4e]">
                <span className="font-semibold text-[#171511]">Build: </span>
                {item.implementation}
              </p>
              <p className="mt-3 text-sm leading-6 text-[#665d4e]">
                <span className="font-semibold text-[#171511]">Metric: </span>
                {item.successMetric}
              </p>
            </div>
          ))}
        </div>
      </DashboardCard>

      <div className="mb-5 grid gap-5 xl:grid-cols-[1.1fr_0.9fr]">
        <DashboardCard title="Selected SEO Targets" eyebrow="Rank, track, iterate">
          <div className="mb-4 rounded-md border border-[#ded6c8] bg-white/55 p-3 text-sm leading-6 text-[#665d4e]">
            These are the active ranking targets. Baselines move from pending
            to measured after Search Console/Bing access and first manual SERP
            checks are connected to this board.
          </div>
          <div className="overflow-x-auto">
            <table className="w-full min-w-[840px] border-separate border-spacing-0 text-left text-sm">
              <thead className="text-xs uppercase tracking-[0.14em] text-[#8b6a22]">
                <tr>
                  <th className="border-b border-[#ded6c8] px-3 py-2 font-semibold">Keyword</th>
                  <th className="border-b border-[#ded6c8] px-3 py-2 font-semibold">Priority</th>
                  <th className="border-b border-[#ded6c8] px-3 py-2 font-semibold">Target page</th>
                  <th className="border-b border-[#ded6c8] px-3 py-2 font-semibold">Status</th>
                  <th className="border-b border-[#ded6c8] px-3 py-2 font-semibold">Baseline</th>
                  <th className="border-b border-[#ded6c8] px-3 py-2 font-semibold">Next action</th>
                </tr>
              </thead>
              <tbody>
                {seoKeywordTargets.map((target) => (
                  <tr key={target.term} className="align-top">
                    <td className="border-b border-[#eee7da] px-3 py-3 font-semibold text-[#171511]">
                      {target.term}
                    </td>
                    <td className="border-b border-[#eee7da] px-3 py-3">
                      <StatusBadge tone={target.priority === "P1" ? "gold" : "neutral"}>
                        {target.priority}
                      </StatusBadge>
                    </td>
                    <td className="border-b border-[#eee7da] px-3 py-3 text-[#665d4e]">
                      {target.targetPage}
                    </td>
                    <td className="border-b border-[#eee7da] px-3 py-3">
                      <StatusBadge tone={statusTone(target.status)}>
                        {target.status.replace("-", " ")}
                      </StatusBadge>
                    </td>
                    <td className="border-b border-[#eee7da] px-3 py-3 text-[#665d4e]">
                      {target.baseline}
                    </td>
                    <td className="border-b border-[#eee7da] px-3 py-3 leading-6 text-[#665d4e]">
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
              <div key={target.prompt} className="rounded-md border border-[#ded6c8] bg-white/55 p-3">
                <div className="flex flex-wrap items-center gap-2">
                  <StatusBadge tone={target.priority === "P1" ? "gold" : "neutral"}>
                    {target.priority}
                  </StatusBadge>
                  <span className="text-xs font-semibold uppercase tracking-[0.14em] text-[#8b6a22]">
                    {target.currentVisibility}
                  </span>
                </div>
                <p className="mt-3 text-sm font-semibold leading-6 text-[#171511]">
                  {target.prompt}
                </p>
                <p className="mt-2 text-sm leading-6 text-[#665d4e]">
                  Target: {target.targetPage}
                </p>
                <p className="mt-2 text-sm leading-6 text-[#665d4e]">
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
            <div key={action.name} className="rounded-md border border-[#ded6c8] bg-white/55 p-4">
              <div className="flex flex-wrap items-center gap-2">
                <StatusBadge tone={action.cadence === "one-time" ? "neutral" : "gold"}>
                  {action.cadence}
                </StatusBadge>
                <StatusBadge tone={statusTone(action.status)}>
                  {action.status}
                </StatusBadge>
                <span className="text-xs font-semibold uppercase tracking-[0.14em] text-[#8b6a22]">
                  {action.owner}
                </span>
              </div>
              <h3 className="mt-3 text-base font-semibold text-[#171511]">{action.name}</h3>
              <p className="mt-2 text-sm leading-6 text-[#665d4e]">
                <span className="font-semibold text-[#171511]">Proof: </span>
                {action.proof}
              </p>
              <p className="mt-2 text-sm leading-6 text-[#665d4e]">
                <span className="font-semibold text-[#171511]">Next: </span>
                {action.nextAction}
              </p>
            </div>
          ))}
        </div>
      </DashboardCard>

      <DashboardCard title="Manual Search Baseline" eyebrow="Indexing proof" className="mb-5">
        <div className="mb-4 rounded-md border border-[#ded6c8] bg-white/55 p-3 text-sm leading-6 text-[#665d4e]">
          This is the first manual search baseline while Search Console and Bing are not connected.
          It prevents the growth loop from pretending rankings are measured when they are not.
        </div>
        <div className="grid gap-3 xl:grid-cols-2">
          {searchBaselines.map((baseline) => (
            <div key={baseline.query} className="rounded-md border border-[#ded6c8] bg-white/55 p-4">
              <div className="flex flex-wrap items-center gap-2">
                <StatusBadge tone={baseline.standing === "indexed" ? "good" : baseline.standing === "stale-result" ? "warn" : "danger"}>
                  {baseline.standing.replace("-", " ")}
                </StatusBadge>
                <span className="text-xs font-semibold uppercase tracking-[0.14em] text-[#8b6a22]">
                  {baseline.checkedAt}
                </span>
              </div>
              <h3 className="mt-3 text-sm font-semibold text-[#171511]">{baseline.query}</h3>
              <p className="mt-3 text-sm leading-6 text-[#665d4e]">{baseline.notes}</p>
              {baseline.observed247RoiUrls.length > 0 ? (
                <p className="mt-3 text-sm leading-6 text-[#665d4e]">
                  <span className="font-semibold text-[#171511]">Observed: </span>
                  {baseline.observed247RoiUrls.join(", ")}
                </p>
              ) : null}
              <p className="mt-3 text-sm leading-6 text-[#665d4e]">
                <span className="font-semibold text-[#171511]">Next: </span>
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
                  <div className="flex size-10 shrink-0 items-center justify-center rounded-md bg-[#171511] text-[#d6a034]">
                    <Icon size={20} />
                  </div>
                </div>
                <p className="text-sm leading-6 text-[#665d4e]">{metric.note}</p>
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
                className="flex gap-3 rounded-md border border-[#ded6c8] bg-white/55 p-3"
              >
                <div className="flex size-7 shrink-0 items-center justify-center rounded-md bg-[#ece5d7] text-sm font-semibold text-[#8b6a22]">
                  {index + 1}
                </div>
                <p className="text-sm leading-6 text-[#665d4e]">{item}</p>
              </div>
            ))}
          </div>
        </DashboardCard>

        <div className="space-y-5">
          <DashboardCard title="30-Day Execution Map" eyebrow="Growth cycle">
            <div className="space-y-3">
              {thirtyDayMap.map((item) => (
                <div key={item.week} className="rounded-md border border-[#ded6c8] bg-white/55 p-3">
                  <div className="flex items-center justify-between gap-3">
                    <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[#8b6a22]">
                      {item.week}
                    </p>
                    <ListChecks size={16} className="text-[#8b6a22]" />
                  </div>
                  <p className="mt-2 text-sm font-semibold text-[#171511]">{item.title}</p>
                  <p className="mt-1 text-sm leading-6 text-[#665d4e]">{item.actions}</p>
                </div>
              ))}
            </div>
          </DashboardCard>

          <DashboardCard title="Operating Rule" eyebrow="Module contract">
            <div className="space-y-4 text-sm leading-6 text-[#665d4e]">
              <div className="flex gap-3">
                <ShieldCheck size={18} className="mt-1 shrink-0 text-[#8b6a22]" />
                <p>
                  Every SEO, GEO, content, backlink, and site-quality action
                  must map to traffic, AI understanding, trust, audit requests,
                  booked calls, pipeline, or authority.
                </p>
              </div>
              <div className="flex gap-3">
                <Waypoints size={18} className="mt-1 shrink-0 text-[#8b6a22]" />
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
              <div key={input} className="flex gap-3 rounded-md border border-[#ded6c8] bg-white/55 p-3">
                <Sparkles size={16} className="mt-1 shrink-0 text-[#8b6a22]" />
                <p className="text-sm leading-6 text-[#665d4e]">{input}</p>
              </div>
            ))}
          </div>
        </DashboardCard>

        <DashboardCard title="Voice and Quality Gates" eyebrow="No generic AI output">
          <ul className="space-y-3 text-sm leading-6 text-[#665d4e]">
            {[...contentRules, ...moduleRules].map((rule) => (
              <li key={rule} className="flex gap-3">
                <FileSearch size={16} className="mt-1 shrink-0 text-[#8b6a22]" />
                <span>{rule}</span>
              </li>
            ))}
          </ul>
        </DashboardCard>
      </div>
    </AppShell>
  );
}
