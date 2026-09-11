import Link from "next/link";
import {
  AlertTriangle,
  ArrowUpRight,
  CheckCircle2,
  CircleDot,
  Eye,
  ListChecks,
  MousePointerClick,
  PhoneCall,
  Search,
  TrendingUp,
} from "lucide-react";
import { AppShell } from "@/components/app-shell";
import { DashboardCard, PageHeader, StatusBadge } from "@/components/dashboard-card";
import { standingScores } from "@/data/growth-standing";
import { workLedger } from "@/data/work-ledger";
import { visibilitySnapshots } from "@/data/visibility-snapshots";
import { visualProgressItems } from "@/data/visual-progress";
import { getBrandSiteOverview } from "@/lib/brand-site/server";
import { getCommandState } from "@/lib/command-state/server";
import { getSearchConsolePerformance } from "@/lib/search-console/server";

export const dynamic = "force-dynamic";

function metricValue(value: number | null | undefined) {
  if (typeof value !== "number") return "Pending";
  return value.toLocaleString();
}

function pos(value: number | null | undefined) {
  if (typeof value !== "number") return "Pending";
  return value.toFixed(value >= 10 ? 1 : 2);
}

function pageLabel(url: string | undefined) {
  if (!url) return "Pending";
  try {
    const parsed = new URL(url);
    return parsed.pathname === "/" ? "/" : parsed.pathname;
  } catch {
    return url;
  }
}

function statusTone(status: string) {
  if (status === "verified" || status === "present" || status === "captured") return "good";
  if (status === "needs-data" || status === "stale" || status === "queued") return "warn";
  if (status === "blocked" || status === "absent" || status === "needed") return "danger";
  return "neutral";
}

function trendTone(trend: string) {
  if (trend === "improving") return "good";
  if (trend === "baseline") return "gold";
  if (trend === "stalled") return "warn";
  return "danger";
}

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

export default async function Home() {
  const [brandOverview, searchConsole, commandState] = await Promise.all([
    loadBrandOverview(),
    loadSearchConsolePerformance(),
    getCommandState(),
  ]);
  const latestWork = workLedger.slice(0, 4);
  const weakestScores = [...standingScores].sort((a, b) => a.score - b.score).slice(0, 4);
  const activeVisibility = visibilitySnapshots.slice(0, 4);
  const queuedVisuals = visualProgressItems.filter((item) => item.screenshotStatus !== "captured").slice(0, 3);
  const topQuery = [...(searchConsole?.queries ?? [])].sort(
    (a, b) => b.impressions - a.impressions || a.position - b.position,
  )[0];
  const topPage = [...(searchConsole?.pages ?? [])].sort(
    (a, b) => b.impressions - a.impressions || a.position - b.position,
  )[0];

  const liveMetrics = [
    {
      label: "7d page views",
      value: metricValue(brandOverview?.siteEvents.pageViews7Days),
      note: "Public-site page views captured by command-center events.",
      icon: TrendingUp,
    },
    {
      label: "30d visitors",
      value: metricValue(brandOverview?.siteEvents.uniqueVisitorEvents30Days),
      note: "Deduped tracked visitor IDs, not raw event count.",
      icon: Eye,
    },
    {
      label: "GSC impressions",
      value: metricValue(searchConsole?.impressions),
      note: `Google Search Console window: ${searchConsole?.startDate ?? "pending"} to ${searchConsole?.endDate ?? "pending"}.`,
      icon: Search,
    },
    {
      label: "Avg rank",
      value: pos(searchConsole?.averagePosition),
      note: "Average Google position across the connected Search Console query set.",
      icon: TrendingUp,
    },
    {
      label: "Audit starts",
      value: metricValue(brandOverview?.siteEvents.aiOpportunityAuditStarts7Days),
      note: "AI Opportunity Audit starts in the last 7 days.",
      icon: ListChecks,
    },
    {
      label: "CTA clicks",
      value: metricValue(brandOverview?.siteEvents.ctaClicks7Days),
      note: "Tracked audit, nav, and offer actions in the last 7 days.",
      icon: MousePointerClick,
    },
    {
      label: "Phone/email",
      value: `${metricValue(brandOverview?.siteEvents.phoneClicks7Days)} / ${metricValue(
        brandOverview?.siteEvents.emailClicks7Days,
      )}`,
      note: "Tracked contact actions in the last 7 days.",
      icon: PhoneCall,
    },
  ];

  return (
    <AppShell>
      <PageHeader
        eyebrow="Owner Snapshot"
        title="Qualified attention, search movement, funnel signal, authority progress, bottleneck, and next move."
        description="This is the first readout. It should tell B where 247ROI stands before anyone opens a board, pipeline, or ledger."
        action={<StatusBadge tone="gold">Source of truth</StatusBadge>}
      />

      <div className="mb-5 grid gap-4 sm:grid-cols-2 xl:grid-cols-6">
        {liveMetrics.map((metric) => {
          const Icon = metric.icon;

          return (
            <DashboardCard key={metric.label} title={metric.label}>
              <div className="flex min-h-32 flex-col justify-between gap-4">
                <div className="flex items-start justify-between gap-3">
                  <p className="text-3xl font-semibold leading-tight">{metric.value}</p>
                  <div className="flex size-10 shrink-0 items-center justify-center rounded-md bg-[#171511] text-[#d6a034]">
                    <Icon size={20} />
                  </div>
                </div>
                <p className="text-sm leading-6 text-[#c9c9c9]">{metric.note}</p>
              </div>
            </DashboardCard>
          );
        })}
      </div>

      <div className="mb-5 grid gap-5 xl:grid-cols-[1.1fr_0.9fr]">
        <DashboardCard title="Current Read" eyebrow="Where we stand">
          <div className="grid gap-3 md:grid-cols-3">
            <div className="rounded-md border border-[#ded6c8] bg-white/55 p-4">
              <div className="flex items-center gap-2 text-sm font-semibold text-[#171511]">
                <CheckCircle2 size={17} className="text-[#2f5a2e]" />
                Working
              </div>
              <p className="mt-3 text-sm leading-6 text-[#665d4e]">
                The site is live, tracked, internally linked, and Search Console is connected.
              </p>
            </div>
            <div className="rounded-md border border-[#ded6c8] bg-white/55 p-4">
              <div className="flex items-center gap-2 text-sm font-semibold text-[#171511]">
                <AlertTriangle size={17} className="text-[#8b6a22]" />
                Current bottleneck
              </div>
              <p className="mt-3 text-sm leading-6 text-[#665d4e]">
                {commandState.ownerSnapshot.currentBottleneck}
              </p>
            </div>
            <div className="rounded-md border border-[#ded6c8] bg-white/55 p-4">
              <div className="flex items-center gap-2 text-sm font-semibold text-[#171511]">
                <CircleDot size={17} className="text-[#8b6a22]" />
                Next move
              </div>
              <p className="mt-3 text-sm leading-6 text-[#665d4e]">
                {commandState.ownerSnapshot.nextMove}
              </p>
            </div>
          </div>
          <div className="mt-4 grid gap-3 lg:grid-cols-2">
            <div className="rounded-md border border-[#ff5a1f]/30 bg-[#ff5a1f]/10 p-4">
              <p className="text-xs font-semibold uppercase tracking-[0.14em] text-[#ff6a2a]">Top Google query</p>
              <p className="mt-2 text-base font-semibold text-white">{topQuery?.keys[0] ?? "Pending"}</p>
              <p className="mt-2 text-sm leading-6 text-[#c9c9c9]">
                {metricValue(topQuery?.impressions)} impressions, avg position {pos(topQuery?.position)}.
              </p>
            </div>
            <div className="rounded-md border border-[#ff5a1f]/30 bg-[#ff5a1f]/10 p-4">
              <p className="text-xs font-semibold uppercase tracking-[0.14em] text-[#ff6a2a]">Top Google page</p>
              <p className="mt-2 text-base font-semibold text-white">{pageLabel(topPage?.keys[0])}</p>
              <p className="mt-2 text-sm leading-6 text-[#c9c9c9]">
                {metricValue(topPage?.impressions)} impressions, avg position {pos(topPage?.position)}.
              </p>
            </div>
          </div>
        </DashboardCard>

        <DashboardCard title="Control Surfaces" eyebrow="Use these to manage work">
          <div className="grid gap-3">
            {[
              { href: "/work", label: "Work Board", note: "Backlog, this week, in progress, blocked, approvals, and done." },
              { href: "/pipeline/seo", label: "SEO/Page Pipeline", note: "Pages, target queries, impressions, rank, and next action." },
              { href: "/pipeline/authority", label: "Authority Pipeline", note: "Targets, risk, approval gates, required assets, and proof." },
              { href: "/pipeline/visibility", label: "AI Visibility Pipeline", note: "Prompts, engines, presence, cited competitors, and fixes." },
              { href: "/automation", label: "Automation Center", note: "Cron purpose, run history, next work, and retire rules." },
              { href: "/decisions", label: "Decision Log", note: "Locked decisions so settled issues stop reopening." },
            ].map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="group flex items-center justify-between gap-4 rounded-md border border-[#ded6c8] bg-white/55 p-4 transition hover:border-[#d6a034] hover:bg-white"
              >
                <div>
                  <p className="font-semibold text-[#171511]">{item.label}</p>
                  <p className="mt-1 text-sm leading-6 text-[#665d4e]">{item.note}</p>
                </div>
                <ArrowUpRight size={18} className="text-[#7a6e5b] group-hover:text-[#171511]" />
              </Link>
            ))}
          </div>
        </DashboardCard>
      </div>

      <div className="mb-5 grid gap-5 xl:grid-cols-[1fr_1fr]">
        <DashboardCard title="Changed Since Last Week" eyebrow="Concrete movement">
          <div className="space-y-3">
            {commandState.ownerSnapshot.changedSinceLastWeek.map((item) => (
              <div key={item} className="flex gap-3 rounded-md border border-[#ded6c8] bg-white/55 p-4">
                <CheckCircle2 className="mt-1 shrink-0 text-[#2f5a2e]" size={17} />
                <p className="text-sm leading-6 text-[#665d4e]">{item}</p>
              </div>
            ))}
          </div>
          <div className="mt-4 rounded-md border border-[#ff5a1f]/30 bg-[#ff5a1f]/10 p-4">
            <p className="text-xs font-semibold uppercase tracking-[0.14em] text-[#ff8a3d]">Authority progress</p>
            <p className="mt-2 text-sm leading-6 text-[#d8d8d8]">
              {commandState.ownerSnapshot.authority.completed} completed / {commandState.ownerSnapshot.authority.planned} planned. {commandState.ownerSnapshot.authority.read}
            </p>
          </div>
        </DashboardCard>

        <DashboardCard title="Latest Work" eyebrow="What changed">
          <div className="space-y-3">
            {latestWork.map((entry) => (
              <div key={`${entry.repo}-${entry.commit}`} className="rounded-md border border-[#ded6c8] bg-white/55 p-4">
                <div className="flex flex-wrap items-center gap-2">
                  <StatusBadge tone={statusTone(entry.evidenceStatus)}>{entry.evidenceStatus}</StatusBadge>
                  <span className="text-xs font-semibold uppercase tracking-[0.14em] text-[#8b6a22]">
                    {entry.date} / {entry.area}
                  </span>
                </div>
                <p className="mt-3 font-semibold text-[#171511]">{entry.title}</p>
                <p className="mt-2 text-sm leading-6 text-[#665d4e]">{entry.why}</p>
              </div>
            ))}
          </div>
        </DashboardCard>

        <DashboardCard title="Weakest Scores" eyebrow="Where attention goes">
          <div className="grid gap-3 sm:grid-cols-2">
            {weakestScores.map((item) => (
              <div key={item.id} className="rounded-md border border-[#ded6c8] bg-white/55 p-4">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <p className="text-sm font-semibold text-[#171511]">{item.area}</p>
                    <p className="mt-2 text-4xl font-semibold">
                      {item.score}
                      <span className="text-base text-[#7a6e5b]">/10</span>
                    </p>
                  </div>
                  <StatusBadge tone={trendTone(item.trend)}>{item.trend}</StatusBadge>
                </div>
                <p className="mt-3 text-sm leading-6 text-[#665d4e]">{item.nextAction}</p>
              </div>
            ))}
          </div>
        </DashboardCard>
      </div>

      <div className="grid gap-5 xl:grid-cols-[1fr_1fr]">
        <DashboardCard title="Visibility Proof" eyebrow="Ranking and AI answers">
          <div className="space-y-3">
            {activeVisibility.map((snapshot) => (
              <div key={`${snapshot.engine}-${snapshot.queryOrPrompt}`} className="rounded-md border border-[#ded6c8] bg-white/55 p-4">
                <div className="flex flex-wrap items-center gap-2">
                  <StatusBadge tone={statusTone(snapshot.standing)}>{snapshot.standing}</StatusBadge>
                  <span className="text-xs font-semibold uppercase tracking-[0.14em] text-[#8b6a22]">
                    {snapshot.engine}
                  </span>
                </div>
                <p className="mt-3 text-sm font-semibold leading-6 text-[#171511]">{snapshot.queryOrPrompt}</p>
                <p className="mt-2 text-sm leading-6 text-[#665d4e]">{snapshot.answerSummary}</p>
              </div>
            ))}
          </div>
        </DashboardCard>

        <DashboardCard title="Visual Queue" eyebrow="Before and after">
          <div className="space-y-3">
            {queuedVisuals.map((item) => (
              <div key={`${item.page}-${item.date}`} className="rounded-md border border-[#ded6c8] bg-white/55 p-4">
                <div className="flex flex-wrap items-center gap-2">
                  <StatusBadge tone={statusTone(item.screenshotStatus)}>{item.screenshotStatus}</StatusBadge>
                  <span className="text-xs font-semibold uppercase tracking-[0.14em] text-[#8b6a22]">
                    {item.page} / {item.viewport}
                  </span>
                </div>
                <p className="mt-3 text-sm font-semibold leading-6 text-[#171511]">{item.title}</p>
                <p className="mt-2 text-sm leading-6 text-[#665d4e]">{item.whyItMatters}</p>
              </div>
            ))}
          </div>
        </DashboardCard>
      </div>
    </AppShell>
  );
}
