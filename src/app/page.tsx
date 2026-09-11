import Link from "next/link";
import {
  ArrowUpRight,
  CheckCircle2,
} from "lucide-react";
import { AppShell } from "@/components/app-shell";
import { DashboardCard, StatusBadge } from "@/components/dashboard-card";
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

function priorityRank(priority: string) {
  if (priority === "P0") return 0;
  if (priority === "P1") return 1;
  if (priority === "P2") return 2;
  return 3;
}

function readoutTone(value: number | null | undefined, warningAt = 1) {
  if (typeof value !== "number") return "border-white/10 bg-white/[0.04]";
  if (value >= warningAt) return "border-[#16a34a]/40 bg-[#16a34a]/10";
  return "border-[#ef4444]/45 bg-[#ef4444]/10";
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
  const activeWork = [...commandState.workItems]
    .filter((item) => item.status !== "Done")
    .sort((a, b) => priorityRank(a.priority) - priorityRank(b.priority));
  const operatorNext = activeWork.find((item) => item.status === "This Week" || item.status === "In Progress") ?? activeWork[0];
  const approvalItems = commandState.workItems.filter((item) => item.status === "Needs B Approval");
  const blockedItems = commandState.workItems.filter((item) => item.status === "Waiting / Blocked");
  const thisWeekItems = commandState.workItems.filter((item) => item.status === "This Week" || item.status === "In Progress");
  const topQuery = [...(searchConsole?.queries ?? [])].sort(
    (a, b) => b.impressions - a.impressions || a.position - b.position,
  )[0];
  const topPage = [...(searchConsole?.pages ?? [])].sort(
    (a, b) => b.impressions - a.impressions || a.position - b.position,
  )[0];

  return (
    <AppShell>
      <section className="mb-5 overflow-hidden rounded-md border border-white/10 bg-[#0b0b0b] text-white shadow-[0_18px_70px_rgba(0,0,0,0.35)]">
        <div className="flex flex-col gap-3 border-b border-white/10 bg-black px-4 py-3 lg:flex-row lg:items-center lg:justify-between">
          <div className="flex flex-wrap items-center gap-2">
            <StatusBadge tone="gold">Owner Console</StatusBadge>
            <StatusBadge tone={approvalItems.length ? "danger" : "good"}>
              {approvalItems.length} approval{approvalItems.length === 1 ? "" : "s"}
            </StatusBadge>
            <StatusBadge tone={blockedItems.length ? "warn" : "good"}>
              {blockedItems.length} blocked
            </StatusBadge>
            <StatusBadge tone="neutral">{thisWeekItems.length} active</StatusBadge>
          </div>
          <p className="text-sm text-[#c9c9c9]">
            State snapshot {new Date(commandState.updatedAt).toLocaleString("en-US", { dateStyle: "medium", timeStyle: "short" })}
          </p>
        </div>

        <div className="grid border-b border-white/10 xl:grid-cols-[1.1fr_0.9fr]">
          <div className="border-b border-white/10 p-4 xl:border-b-0 xl:border-r">
            <p className="text-xs font-semibold uppercase tracking-[0.14em] text-[#ff6a2a]">Current Bottleneck</p>
            <p className="mt-2 text-xl font-semibold leading-8 text-white">
              {commandState.ownerSnapshot.currentBottleneck}
            </p>
          </div>
          <div className="p-4">
            <p className="text-xs font-semibold uppercase tracking-[0.14em] text-[#ff6a2a]">Next Move</p>
            <p className="mt-2 text-xl font-semibold leading-8 text-white">
              {commandState.ownerSnapshot.nextMove}
            </p>
          </div>
        </div>

        <div className="grid md:grid-cols-2 xl:grid-cols-4">
          <div className="border-b border-white/10 p-4 md:border-r xl:border-b-0">
            <p className="text-xs font-semibold uppercase tracking-[0.14em] text-[#8e8e8e]">Traffic</p>
            <div className="mt-3 flex items-end gap-3">
              <p className="text-4xl font-semibold">{metricValue(brandOverview?.siteEvents.pageViews7Days)}</p>
              <p className="pb-1 text-sm text-[#bdbdbd]">7d page views</p>
            </div>
            <p className="mt-2 text-sm text-[#c9c9c9]">
              {metricValue(brandOverview?.siteEvents.uniqueVisitorEvents30Days)} tracked 30d visitors.
            </p>
          </div>

          <div className="border-b border-white/10 p-4 xl:border-b-0 xl:border-r">
            <p className="text-xs font-semibold uppercase tracking-[0.14em] text-[#8e8e8e]">Search</p>
            <div className="mt-3 flex items-end gap-3">
              <p className="text-4xl font-semibold">{metricValue(searchConsole?.impressions)}</p>
              <p className="pb-1 text-sm text-[#bdbdbd]">impressions</p>
            </div>
            <p className="mt-2 text-sm text-[#c9c9c9]">
              {metricValue(searchConsole?.clicks)} clicks, avg rank {pos(searchConsole?.averagePosition)}.
            </p>
          </div>

          <div className="border-b border-white/10 p-4 md:border-r xl:border-b-0">
            <p className="text-xs font-semibold uppercase tracking-[0.14em] text-[#8e8e8e]">Funnel</p>
            <div className="mt-3 flex items-end gap-3">
              <p className="text-4xl font-semibold">{metricValue(brandOverview?.siteEvents.aiOpportunityAuditStarts7Days)}</p>
              <p className="pb-1 text-sm text-[#bdbdbd]">audit starts</p>
            </div>
            <p className="mt-2 text-sm text-[#c9c9c9]">
              {metricValue(brandOverview?.siteEvents.ctaClicks7Days)} CTA, {metricValue(brandOverview?.siteEvents.phoneClicks7Days)} phone, {metricValue(brandOverview?.siteEvents.emailClicks7Days)} email.
            </p>
          </div>

          <div className="p-4">
            <p className="text-xs font-semibold uppercase tracking-[0.14em] text-[#8e8e8e]">Authority</p>
            <div className="mt-3 flex items-end gap-3">
              <p className="text-4xl font-semibold">{commandState.ownerSnapshot.authority.completed}/{commandState.ownerSnapshot.authority.planned}</p>
              <p className="pb-1 text-sm text-[#bdbdbd]">complete</p>
            </div>
            <p className="mt-2 text-sm text-[#c9c9c9]">{commandState.ownerSnapshot.authority.read}</p>
          </div>
        </div>

        <div className="grid border-t border-white/10 xl:grid-cols-[0.85fr_1.15fr]">
          <div className="border-b border-white/10 p-4 xl:border-b-0 xl:border-r">
            <p className="text-xs font-semibold uppercase tracking-[0.14em] text-[#ff6a2a]">Active Operator Item</p>
            <div className="mt-3 flex flex-wrap items-center gap-2">
              {operatorNext ? <StatusBadge tone={statusTone(operatorNext.status)}>{operatorNext.status}</StatusBadge> : null}
              {operatorNext ? <StatusBadge tone="neutral">{operatorNext.priority}</StatusBadge> : null}
              {operatorNext ? <StatusBadge tone="neutral">{operatorNext.lane}</StatusBadge> : null}
            </div>
            <p className="mt-3 text-lg font-semibold text-white">{operatorNext?.title ?? "No active board item"}</p>
            <p className="mt-2 text-sm leading-6 text-[#c9c9c9]">
              {operatorNext?.proofRequired ?? "Add one board item with a proof requirement before new operator work starts."}
            </p>
          </div>

          <div className="grid md:grid-cols-2">
            <div className="border-b border-white/10 p-4 md:border-b-0 md:border-r">
              <div className="flex items-center justify-between gap-3">
                <p className="text-xs font-semibold uppercase tracking-[0.14em] text-[#ff6a2a]">Needs Approval</p>
                <StatusBadge tone={approvalItems.length ? "danger" : "good"}>{approvalItems.length}</StatusBadge>
              </div>
              <div className="mt-3 space-y-2">
                {(approvalItems.length ? approvalItems : commandState.workItems.filter((item) => item.status === "Done").slice(0, 1)).map((item) => (
                  <div key={item.id} className={`rounded-md border p-3 ${readoutTone(approvalItems.length, 1)}`}>
                    <p className="text-sm font-semibold text-white">
                      {approvalItems.length ? item.title : "No approval item is currently waiting."}
                    </p>
                    <p className="mt-1 text-sm leading-6 text-[#c9c9c9]">
                      {approvalItems.length ? item.expectedImpact : "Public submissions and outreach stay locked until approved."}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            <div className="p-4">
              <div className="flex items-center justify-between gap-3">
                <p className="text-xs font-semibold uppercase tracking-[0.14em] text-[#ff6a2a]">Blocked / Waiting</p>
                <StatusBadge tone={blockedItems.length ? "warn" : "good"}>{blockedItems.length}</StatusBadge>
              </div>
              <div className="mt-3 space-y-2">
                {(blockedItems.length ? blockedItems : thisWeekItems.slice(0, 1)).map((item) => (
                  <div key={item.id} className={`rounded-md border p-3 ${blockedItems.length ? "border-[#ff8a3d]/40 bg-[#ff8a3d]/10" : "border-[#16a34a]/40 bg-[#16a34a]/10"}`}>
                    <p className="text-sm font-semibold text-white">
                      {blockedItems.length ? item.title : "Nothing is currently marked blocked."}
                    </p>
                    <p className="mt-1 text-sm leading-6 text-[#c9c9c9]">
                      {blockedItems.length ? item.why : "Use the Work Board if that changes."}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="mb-5 grid gap-5 xl:grid-cols-[0.85fr_1.15fr]">
        <DashboardCard title="Command Routes" eyebrow="Where to operate">
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
                className="group flex items-center justify-between gap-4 rounded-md border border-white/10 bg-white/[0.04] p-4 transition hover:border-[#ff5a1f]/55 hover:bg-[#ff5a1f]/10"
              >
                <div>
                  <p className="font-semibold text-white">{item.label}</p>
                  <p className="mt-1 text-sm leading-6 text-[#c9c9c9]">{item.note}</p>
                </div>
                <ArrowUpRight size={18} className="text-[#8e8e8e] group-hover:text-white" />
              </Link>
            ))}
          </div>
        </DashboardCard>

        <DashboardCard title="Search Movement" eyebrow="Live Google signal">
          <div className="grid gap-3 lg:grid-cols-2">
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
          <div className="mt-3 rounded-md border border-white/10 bg-white/[0.04] p-4">
            <div className="flex items-center gap-2 text-sm font-semibold text-white">
              <CheckCircle2 size={17} className="text-[#86efac]" />
              Working
            </div>
            <p className="mt-2 text-sm leading-6 text-[#c9c9c9]">
              The public site is live, tracked, internally linked, and Search Console is connected.
            </p>
          </div>
        </DashboardCard>
      </div>

      <div className="mb-5 grid gap-5 xl:grid-cols-[1fr_1fr]">
        <DashboardCard title="Changed Since Last Week" eyebrow="Concrete movement">
          <div className="space-y-3">
            {commandState.ownerSnapshot.changedSinceLastWeek.map((item) => (
              <div key={item} className="flex gap-3 rounded-md border border-white/10 bg-white/[0.04] p-4">
                <CheckCircle2 className="mt-1 shrink-0 text-[#86efac]" size={17} />
                <p className="text-sm leading-6 text-[#c9c9c9]">{item}</p>
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
              <div key={`${entry.date}-${entry.repo}-${entry.title}`} className="rounded-md border border-white/10 bg-white/[0.04] p-4">
                <div className="flex flex-wrap items-center gap-2">
                  <StatusBadge tone={statusTone(entry.evidenceStatus)}>{entry.evidenceStatus}</StatusBadge>
                  <span className="text-xs font-semibold uppercase tracking-[0.14em] text-[#8b6a22]">
                    {entry.date} / {entry.area}
                  </span>
                </div>
                <p className="mt-3 font-semibold text-white">{entry.title}</p>
                <p className="mt-2 text-sm leading-6 text-[#c9c9c9]">{entry.why}</p>
              </div>
            ))}
          </div>
        </DashboardCard>

        <DashboardCard title="Weakest Scores" eyebrow="Where attention goes">
          <div className="grid gap-3 sm:grid-cols-2">
            {weakestScores.map((item) => (
              <div key={item.id} className="rounded-md border border-white/10 bg-white/[0.04] p-4">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <p className="text-sm font-semibold text-white">{item.area}</p>
                    <p className="mt-2 text-4xl font-semibold">
                      {item.score}
                      <span className="text-base text-[#8e8e8e]">/10</span>
                    </p>
                  </div>
                  <StatusBadge tone={trendTone(item.trend)}>{item.trend}</StatusBadge>
                </div>
                <p className="mt-3 text-sm leading-6 text-[#c9c9c9]">{item.nextAction}</p>
              </div>
            ))}
          </div>
        </DashboardCard>
      </div>

      <div className="grid gap-5 xl:grid-cols-[1fr_1fr]">
        <DashboardCard title="Visibility Proof" eyebrow="Ranking and AI answers">
          <div className="space-y-3">
            {activeVisibility.map((snapshot) => (
              <div key={`${snapshot.engine}-${snapshot.queryOrPrompt}`} className="rounded-md border border-white/10 bg-white/[0.04] p-4">
                <div className="flex flex-wrap items-center gap-2">
                  <StatusBadge tone={statusTone(snapshot.standing)}>{snapshot.standing}</StatusBadge>
                  <span className="text-xs font-semibold uppercase tracking-[0.14em] text-[#8b6a22]">
                    {snapshot.engine}
                  </span>
                </div>
                <p className="mt-3 text-sm font-semibold leading-6 text-white">{snapshot.queryOrPrompt}</p>
                <p className="mt-2 text-sm leading-6 text-[#c9c9c9]">{snapshot.answerSummary}</p>
              </div>
            ))}
          </div>
        </DashboardCard>

        <DashboardCard title="Visual Queue" eyebrow="Before and after">
          <div className="space-y-3">
            {queuedVisuals.map((item) => (
              <div key={`${item.page}-${item.date}`} className="rounded-md border border-white/10 bg-white/[0.04] p-4">
                <div className="flex flex-wrap items-center gap-2">
                  <StatusBadge tone={statusTone(item.screenshotStatus)}>{item.screenshotStatus}</StatusBadge>
                  <span className="text-xs font-semibold uppercase tracking-[0.14em] text-[#8b6a22]">
                    {item.page} / {item.viewport}
                  </span>
                </div>
                <p className="mt-3 text-sm font-semibold leading-6 text-white">{item.title}</p>
                <p className="mt-2 text-sm leading-6 text-[#c9c9c9]">{item.whyItMatters}</p>
              </div>
            ))}
          </div>
        </DashboardCard>
      </div>
    </AppShell>
  );
}
