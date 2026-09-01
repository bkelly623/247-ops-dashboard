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
  TrendingUp,
} from "lucide-react";
import { AppShell } from "@/components/app-shell";
import { DashboardCard, PageHeader, StatusBadge } from "@/components/dashboard-card";
import { standingScores } from "@/data/growth-standing";
import { workLedger } from "@/data/work-ledger";
import { visibilitySnapshots } from "@/data/visibility-snapshots";
import { visualProgressItems } from "@/data/visual-progress";
import { getBrandSiteOverview } from "@/lib/brand-site/server";

export const dynamic = "force-dynamic";

function metricValue(value: number | null | undefined) {
  if (typeof value !== "number") return "Pending";
  return value.toLocaleString();
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

export default async function Home() {
  const brandOverview = await loadBrandOverview();
  const latestWork = workLedger.slice(0, 4);
  const weakestScores = [...standingScores].sort((a, b) => a.score - b.score).slice(0, 4);
  const activeVisibility = visibilitySnapshots.slice(0, 4);
  const queuedVisuals = visualProgressItems.filter((item) => item.screenshotStatus !== "captured").slice(0, 3);

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
        eyebrow="Executive Snapshot"
        title="Track what changed, what moved, what is blocked, and what gets built next."
        description="This is the owner view for 247ROI growth work: shipped changes, current proof, ranking visibility, conversion signals, and visual progress."
        action={<StatusBadge tone="gold">Source of truth</StatusBadge>}
      />

      <div className="mb-5 grid gap-4 sm:grid-cols-2 xl:grid-cols-5">
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
                <p className="text-sm leading-6 text-[#665d4e]">{metric.note}</p>
              </div>
            </DashboardCard>
          );
        })}
      </div>

      <div className="mb-5 grid gap-5 xl:grid-cols-[1.1fr_0.9fr]">
        <DashboardCard title="Current Read" eyebrow="What matters now">
          <div className="grid gap-3 md:grid-cols-3">
            <div className="rounded-md border border-[#ded6c8] bg-white/55 p-4">
              <div className="flex items-center gap-2 text-sm font-semibold text-[#171511]">
                <CheckCircle2 size={17} className="text-[#2f5a2e]" />
                Working
              </div>
              <p className="mt-3 text-sm leading-6 text-[#665d4e]">
                The site is live, clearer, tracked, internally linked, and indexed enough for Google to see core pages.
              </p>
            </div>
            <div className="rounded-md border border-[#ded6c8] bg-white/55 p-4">
              <div className="flex items-center gap-2 text-sm font-semibold text-[#171511]">
                <AlertTriangle size={17} className="text-[#8b6a22]" />
                Weakest Point
              </div>
              <p className="mt-3 text-sm leading-6 text-[#665d4e]">
                Proof is thin: low traffic, no CTA/contact clicks, no report unlocks, and no connected Search Console or Bing data.
              </p>
            </div>
            <div className="rounded-md border border-[#ded6c8] bg-white/55 p-4">
              <div className="flex items-center gap-2 text-sm font-semibold text-[#171511]">
                <CircleDot size={17} className="text-[#8b6a22]" />
                Next Priority
              </div>
              <p className="mt-3 text-sm leading-6 text-[#665d4e]">
                Make every shipped change visible in the Work Ledger, then capture visual proof and manual visibility snapshots.
              </p>
            </div>
          </div>
        </DashboardCard>

        <DashboardCard title="Fast Links" eyebrow="Control surfaces">
          <div className="grid gap-3">
            {[
              { href: "/work", label: "Work Ledger", note: "What shipped, why, evidence, and follow-up." },
              { href: "/seo", label: "Growth Standing", note: "Scores, targets, authority, and recurring growth work." },
              { href: "/visibility", label: "Rank Proof", note: "Google, Bing, AI answer checks, and next fixes." },
              { href: "/progress", label: "Visual Progress", note: "Before/after changes and screenshot queue." },
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
