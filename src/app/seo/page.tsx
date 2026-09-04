import {
  ArrowUpRight,
  CalendarClock,
  CheckCircle2,
  Eye,
  Flag,
  Link2,
  MousePointerClick,
  Radar,
  Route,
  Search,
  Target,
  TrendingUp,
} from "lucide-react";
import { AppShell } from "@/components/app-shell";
import { DashboardCard, PageHeader, StatusBadge } from "@/components/dashboard-card";
import { KeywordRankChart } from "@/components/keyword-rank-chart";
import { HorizontalBar, SegmentedBar } from "@/components/visualizations";
import {
  authorityTargets,
  growthActions,
  longTailCampaigns,
  offerLanguageTracks,
  recurringOperatorRoles,
  seoKeywordTargets,
} from "@/data/seo-targets";
import { getBrandSiteOverview } from "@/lib/brand-site/server";
import { getSearchConsolePerformance, type SearchConsoleRow } from "@/lib/search-console/server";

export const dynamic = "force-dynamic";

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

function pct(value: number | null | undefined) {
  if (typeof value !== "number") return "Pending";
  return `${(value * 100).toFixed(value > 0 && value < 0.01 ? 2 : 1)}%`;
}

function pos(value: number | null | undefined) {
  if (typeof value !== "number") return "Pending";
  return value.toFixed(value >= 10 ? 1 : 2);
}

function pageLabel(url: string) {
  try {
    const parsed = new URL(url);
    return parsed.pathname === "/" ? "/" : parsed.pathname;
  } catch {
    return url;
  }
}

function statusTone(status: string) {
  if (status === "active" || status === "done" || status === "page-live") return "good";
  if (status === "queued" || status === "planned" || status === "needs-upgrade") return "warn";
  return "danger";
}

function rankingTone(position: number) {
  if (position <= 10) return "good";
  if (position <= 30) return "gold";
  if (position <= 60) return "warn";
  return "danger";
}

function keywordMatch(query: string, target: string) {
  const normalizedQuery = query.toLowerCase();
  const normalizedTarget = target.toLowerCase();
  return (
    normalizedQuery.includes(normalizedTarget) ||
    normalizedTarget.includes(normalizedQuery.replace(" for small business", ""))
  );
}

function chooseFirstTuneTarget(rows: SearchConsoleRow[]) {
  return rows
    .filter((row) => row.impressions > 0)
    .sort((a, b) => b.impressions - a.impressions || a.position - b.position)[0];
}

export default async function SeoPage() {
  const [brandOverview, searchConsole] = await Promise.all([
    loadBrandOverview(),
    loadSearchConsolePerformance(),
  ]);
  const queryRows = [...(searchConsole?.queries ?? [])].sort(
    (a, b) => b.impressions - a.impressions || a.position - b.position,
  );
  const pageRows = [...(searchConsole?.pages ?? [])].sort(
    (a, b) => b.impressions - a.impressions || a.position - b.position,
  );
  const queryPageRows = [...(searchConsole?.queryPages ?? [])].sort(
    (a, b) => b.impressions - a.impressions || a.position - b.position,
  );
  const firstTuneTarget = chooseFirstTuneTarget(queryRows);
  const aiEmployeeSignal = queryRows.find((row) =>
    keywordMatch(row.keys[0] ?? "", "AI employees for small business"),
  );
  const highCompetitionTargets = seoKeywordTargets.filter((target) => target.competition === "high").length;
  const mediumCompetitionTargets = seoKeywordTargets.filter((target) => target.competition === "medium").length;
  const lowCompetitionTargets = seoKeywordTargets.filter((target) => target.competition === "low").length;
  const flagshipTargets = seoKeywordTargets.filter((target) => target.play === "flagship").length;
  const commercialTargets = seoKeywordTargets.filter((target) => target.play === "commercial").length;
  const longTailTargets = seoKeywordTargets.filter((target) => target.play === "long-tail").length;
  const wedgeTargets = seoKeywordTargets.filter((target) => target.play === "wedge").length;
  const activeActions = growthActions.filter((action) => action.status === "active");
  const doneActions = growthActions.filter((action) => action.status === "done").length;
  const activeAuthorityTargets = authorityTargets.filter((target) => target.status !== "done");

  const commanderRead = aiEmployeeSignal
    ? "AI employees for small business is the first page to tune because Google is already testing that phrase family. Keep flagship terms alive, but win through long-tail support pages."
    : firstTuneTarget
      ? `${firstTuneTarget.keys[0]} is the strongest current GSC signal. Tune the matching page first, then build support around it.`
      : "No usable query signal yet. Keep building long-tail proof pages and wait for GSC rows.";

  const proofFunnel = [
    {
      label: "Impressions",
      value: metricValue(searchConsole?.impressions),
      note: "Google discovery",
      icon: Eye,
    },
    {
      label: "Clicks",
      value: metricValue(searchConsole?.clicks),
      note: "SERP pull",
      icon: MousePointerClick,
    },
    {
      label: "Audit starts",
      value: metricValue(brandOverview?.siteEvents.aiOpportunityAuditStarts7Days),
      note: "Visitor intent",
      icon: Search,
    },
    {
      label: "Audit unlocks",
      value: metricValue(brandOverview?.siteEvents.aiOpportunityAuditUnlocks7Days),
      note: "Lead proof",
      icon: CheckCircle2,
    },
  ];

  return (
    <AppShell>
      <PageHeader
        eyebrow="247ROI SEO Command"
        title="Target, build, rank, report."
        description="Live Search Console signal, keyword campaigns, recurring operator work, authority targets, and next actions in one command surface."
        action={
          <div className="flex flex-wrap gap-2">
            <StatusBadge tone="good">GSC live</StatusBadge>
            <StatusBadge tone="gold">Athena active</StatusBadge>
          </div>
        }
      />

      <div className="mb-5 grid gap-5 xl:grid-cols-[1.15fr_0.85fr]">
        <section className="rounded-lg border border-[#ff5a1f]/35 bg-black p-5 text-white shadow-[0_0_70px_rgba(255,90,31,0.16)]">
          <div className="flex flex-col gap-5 lg:flex-row lg:items-start lg:justify-between">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#ff5a1f]">
                Commander read
              </p>
              <h2 className="mt-2 max-w-3xl text-2xl font-semibold leading-tight sm:text-3xl">
                {commanderRead}
              </h2>
              <p className="mt-3 max-w-3xl text-sm leading-6 text-[#d9cfbd]">
                Current GSC window: {searchConsole?.startDate ?? "pending"} to {searchConsole?.endDate ?? "pending"}.
                The job is not passive tracking. The loop is pick target, tune page, add supporting assets, update tasks, then watch movement.
              </p>
            </div>
            <div className="grid min-w-64 grid-cols-2 gap-3">
              <div className="rounded-md border border-white/12 bg-white/8 p-4">
                <p className="text-xs font-semibold uppercase tracking-[0.14em] text-[#ff6a2a]">Impressions</p>
                <p className="mt-3 text-3xl font-semibold">{metricValue(searchConsole?.impressions)}</p>
              </div>
              <div className="rounded-md border border-white/12 bg-white/8 p-4">
                <p className="text-xs font-semibold uppercase tracking-[0.14em] text-[#ff6a2a]">Avg rank</p>
                <p className="mt-3 text-3xl font-semibold">{pos(searchConsole?.averagePosition)}</p>
              </div>
              <div className="rounded-md border border-white/12 bg-white/8 p-4">
                <p className="text-xs font-semibold uppercase tracking-[0.14em] text-[#ff6a2a]">Clicks</p>
                <p className="mt-3 text-3xl font-semibold">{metricValue(searchConsole?.clicks)}</p>
              </div>
              <div className="rounded-md border border-white/12 bg-white/8 p-4">
                <p className="text-xs font-semibold uppercase tracking-[0.14em] text-[#ff6a2a]">CTR</p>
                <p className="mt-3 text-3xl font-semibold">{pct(searchConsole?.ctr)}</p>
              </div>
            </div>
          </div>
        </section>

        <DashboardCard title="First Target" eyebrow="Correct priority?">
          <div className="rounded-md border border-[#ff5a1f]/30 bg-[#ff5a1f]/10 p-4">
            <div className="flex items-start gap-3">
              <Flag className="mt-1 shrink-0 text-[#ff5a1f]" size={20} />
              <div>
                <p className="text-base font-semibold text-white">Yes, tune the AI employees small-business page first.</p>
                <p className="mt-2 text-sm leading-6 text-[#c9c9c9]">
                  It has the strongest live query proof. This does not mean it is the only target; it means it is the first evidence-backed target.
                </p>
              </div>
            </div>
          </div>
          <div className="mt-3 grid gap-3">
            <HorizontalBar
              label="AI employee signal"
              value={aiEmployeeSignal?.impressions ?? 0}
              max={Math.max(firstTuneTarget?.impressions ?? 1, aiEmployeeSignal?.impressions ?? 1)}
              detail={`${aiEmployeeSignal?.impressions ?? 0} impressions`}
              tone="gold"
            />
            <HorizontalBar
              label="Position work left"
              value={Math.max(0, 100 - (aiEmployeeSignal?.position ?? 100))}
              max={100}
              detail={`avg ${pos(aiEmployeeSignal?.position)}`}
              tone={aiEmployeeSignal ? rankingTone(aiEmployeeSignal.position) : "warn"}
            />
          </div>
        </DashboardCard>
      </div>

      <div className="mb-5 grid gap-5 xl:grid-cols-[0.8fr_1.2fr]">
        <DashboardCard title="Proof Funnel" eyebrow="Demand to ROI">
          <div className="grid gap-3 sm:grid-cols-2">
            {proofFunnel.map((step) => {
              const Icon = step.icon;
              return (
                <div key={step.label} className="rounded-md border border-white/10 bg-white/5 p-4">
                  <div className="flex items-center justify-between gap-3">
                    <Icon className="text-[#ff6a2a]" size={19} />
                    <ArrowUpRight className="text-white/40" size={16} />
                  </div>
                  <p className="mt-4 text-3xl font-semibold text-white">{step.value}</p>
                  <p className="mt-1 text-sm font-semibold text-white">{step.label}</p>
                  <p className="mt-1 text-xs uppercase tracking-[0.13em] text-[#ff6a2a]">{step.note}</p>
                </div>
              );
            })}
          </div>
        </DashboardCard>

        <DashboardCard title="Keyword Portfolio" eyebrow="General in command">
          <div className="grid gap-5 lg:grid-cols-2">
            <div className="space-y-5">
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
            </div>
            <div className="rounded-md border border-white/10 bg-black p-4">
              <Target className="text-[#ff5a1f]" size={22} />
              <p className="mt-3 text-base font-semibold text-white">The mix is right, but the attack plan matters.</p>
              <p className="mt-2 text-sm leading-6 text-[#c9c9c9]">
                High-value flagship terms stay on the map. Long-tail pages create the first wins, internal links, examples, and AI-answer evidence that help the harder terms climb.
              </p>
            </div>
          </div>
        </DashboardCard>
      </div>

      <DashboardCard title="Keyword Rank Chart" eyebrow="Toggle the target" className="mb-5">
        <KeywordRankChart
          rows={searchConsole?.dailyQueries ?? []}
          fallbackQuery={aiEmployeeSignal?.keys[0] ?? firstTuneTarget?.keys[0]}
        />
      </DashboardCard>

      <DashboardCard title="Offer Language Strategy" eyebrow="What we are testing" className="mb-5">
        <div className="grid gap-3 xl:grid-cols-5">
          {offerLanguageTracks.map((track) => (
            <div key={track.label} className="rounded-md border border-white/10 bg-white/5 p-4">
              <div className="flex flex-wrap gap-2">
                <StatusBadge tone={track.status === "core" ? "good" : track.status === "supporting" ? "gold" : "neutral"}>
                  {track.status}
                </StatusBadge>
              </div>
              <h3 className="mt-3 text-sm font-semibold text-white">{track.label}</h3>
              <p className="mt-2 text-sm leading-6 text-[#c9c9c9]">{track.strength}</p>
              <p className="mt-3 text-xs font-semibold uppercase tracking-[0.14em] text-[#ff6a2a]">Risk</p>
              <p className="mt-1 text-sm leading-6 text-[#c9c9c9]">{track.risk}</p>
              <p className="mt-3 text-xs font-semibold uppercase tracking-[0.14em] text-[#ff6a2a]">Best use</p>
              <p className="mt-1 text-sm leading-6 text-[#c9c9c9]">{track.bestUse}</p>
            </div>
          ))}
        </div>
      </DashboardCard>

      <div className="mb-5 grid gap-5 xl:grid-cols-[1.05fr_0.95fr]">
        <DashboardCard title="Long-Tail Campaigns" eyebrow="Plan, not vibes">
          <div className="grid gap-3 xl:grid-cols-2">
            {longTailCampaigns.map((campaign) => (
              <div key={campaign.cluster} className="rounded-md border border-white/10 bg-white/5 p-4">
                <div className="flex flex-wrap items-center gap-2">
                  <StatusBadge tone={statusTone(campaign.status)}>{campaign.status}</StatusBadge>
                  <StatusBadge tone="neutral">{campaign.targetPage}</StatusBadge>
                </div>
                <h3 className="mt-3 text-sm font-semibold text-white">{campaign.cluster}</h3>
                <p className="mt-2 text-sm leading-6 text-[#c9c9c9]">{campaign.proofSource}</p>
                <div className="mt-3 flex flex-wrap gap-2">
                  {campaign.supportingPages.map((page) => (
                    <span key={page} className="rounded border border-white/10 bg-black px-2 py-1 text-xs text-[#d6d6d6]">
                      {page}
                    </span>
                  ))}
                </div>
                <p className="mt-3 text-sm leading-6 text-[#c9c9c9]">
                  <span className="font-semibold text-white">Next: </span>
                  {campaign.nextAction}
                </p>
              </div>
            ))}
          </div>
        </DashboardCard>

        <DashboardCard title="Active Task Board" eyebrow="Gets updated">
          <div className="mb-4 grid grid-cols-3 gap-3">
            <div className="rounded-md border border-white/10 bg-white/5 p-3">
              <p className="text-2xl font-semibold text-white">{activeActions.length}</p>
              <p className="text-xs uppercase tracking-[0.13em] text-[#ff6a2a]">active</p>
            </div>
            <div className="rounded-md border border-white/10 bg-white/5 p-3">
              <p className="text-2xl font-semibold text-white">{doneActions}</p>
              <p className="text-xs uppercase tracking-[0.13em] text-[#ff6a2a]">done</p>
            </div>
            <div className="rounded-md border border-white/10 bg-white/5 p-3">
              <p className="text-2xl font-semibold text-white">{activeAuthorityTargets.length}</p>
              <p className="text-xs uppercase tracking-[0.13em] text-[#ff6a2a]">authority open</p>
            </div>
          </div>
          <div className="space-y-3">
            {activeActions.slice(0, 5).map((action) => (
              <div key={action.name} className="rounded-md border border-white/10 bg-white/5 p-4">
                <div className="flex flex-wrap items-center gap-2">
                  <StatusBadge tone={action.cadence === "one-time" ? "neutral" : "gold"}>
                    {action.cadence}
                  </StatusBadge>
                  <StatusBadge tone={statusTone(action.status)}>{action.status}</StatusBadge>
                  <span className="text-xs font-semibold uppercase tracking-[0.14em] text-[#ff6a2a]">
                    {action.owner}
                  </span>
                </div>
                <p className="mt-3 text-sm font-semibold text-white">{action.name}</p>
                <p className="mt-2 text-sm leading-6 text-[#c9c9c9]">{action.nextAction}</p>
              </div>
            ))}
          </div>
        </DashboardCard>
      </div>

      <div className="mb-5 grid gap-5 xl:grid-cols-[0.95fr_1.05fr]">
        <DashboardCard title="Recurring Roles" eyebrow="What is actually active">
          <div className="space-y-3">
            {recurringOperatorRoles.map((role) => (
              <div key={role.role} className="rounded-md border border-white/10 bg-white/5 p-4">
                <div className="flex flex-wrap items-center gap-2">
                  <StatusBadge tone={statusTone(role.status)}>{role.status}</StatusBadge>
                  <StatusBadge tone="gold">{role.mechanism}</StatusBadge>
                </div>
                <div className="mt-3 flex gap-3">
                  <CalendarClock className="mt-1 shrink-0 text-[#ff5a1f]" size={19} />
                  <div>
                    <p className="text-sm font-semibold text-white">{role.role}</p>
                    <p className="mt-1 text-sm leading-6 text-[#c9c9c9]">{role.cadence}</p>
                    <p className="mt-2 text-xs font-semibold uppercase tracking-[0.14em] text-[#ff6a2a]">
                      {role.sourceOfTruth}
                    </p>
                    <p className="mt-2 text-sm leading-6 text-[#c9c9c9]">{role.responsibility}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </DashboardCard>

        <DashboardCard title="Authority Pipeline" eyebrow="Not stagnant">
          <div className="grid gap-3 sm:grid-cols-2">
            {authorityTargets.map((target) => (
              <div key={target.name} className="rounded-md border border-white/10 bg-white/5 p-4">
                <div className="flex flex-wrap items-center gap-2">
                  <StatusBadge tone={target.priority === "P1" ? "gold" : "neutral"}>{target.priority}</StatusBadge>
                  <StatusBadge tone={statusTone(target.status)}>{target.status}</StatusBadge>
                </div>
                <div className="mt-3 flex gap-3">
                  <Link2 className="mt-1 shrink-0 text-[#ff5a1f]" size={18} />
                  <div>
                    <p className="text-sm font-semibold text-white">{target.name}</p>
                    <p className="mt-2 text-sm leading-6 text-[#c9c9c9]">{target.nextAction}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </DashboardCard>
      </div>

      <div className="grid gap-5 xl:grid-cols-[1.1fr_0.9fr]">
        <DashboardCard title="Live Query Table" eyebrow="Google says this">
          <div className="space-y-3">
            {queryRows.slice(0, 6).map((row, index) => (
              <div key={row.keys.join("-")} className="rounded-md border border-white/10 bg-white/5 p-4">
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <div className="flex items-start gap-3">
                    <div className="grid size-8 shrink-0 place-items-center rounded-md bg-white text-sm font-semibold text-[#ff5a1f]">
                      {index + 1}
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-white">{row.keys[0]}</p>
                      <p className="mt-1 text-xs uppercase tracking-[0.13em] text-[#ff6a2a]">
                        {row.impressions} impressions / {row.clicks} clicks
                      </p>
                    </div>
                  </div>
                  <StatusBadge tone={rankingTone(row.position)}>Avg {pos(row.position)}</StatusBadge>
                </div>
              </div>
            ))}
          </div>
        </DashboardCard>

        <DashboardCard title="Pages Google Is Testing" eyebrow="Query to URL">
          <div className="space-y-3">
            {queryPageRows.slice(0, 6).map((row) => (
              <div key={row.keys.join("-")} className="rounded-md border border-white/10 bg-white/5 p-4">
                <div className="flex flex-wrap items-center gap-2">
                  <StatusBadge tone={rankingTone(row.position)}>Avg {pos(row.position)}</StatusBadge>
                  <span className="text-xs font-semibold uppercase tracking-[0.14em] text-[#ff6a2a]">
                    {row.impressions} impressions
                  </span>
                </div>
                <p className="mt-3 text-sm font-semibold text-white">{row.keys[0]}</p>
                <p className="mt-2 flex items-center gap-2 text-sm leading-6 text-[#c9c9c9]">
                  <Route size={15} className="text-[#ff5a1f]" />
                  {pageLabel(row.keys[1] ?? "")}
                </p>
              </div>
            ))}
            {pageRows.length > 0 ? (
              <div className="rounded-md border border-[#ff5a1f]/30 bg-[#ff5a1f]/10 p-4">
                <div className="flex gap-3">
                  <TrendingUp className="mt-1 shrink-0 text-[#ff5a1f]" size={18} />
                  <p className="text-sm leading-6 text-[#c9c9c9]">
                    Strongest page signal: <span className="font-semibold text-white">{pageLabel(pageRows[0].keys[0] ?? "")}</span> with {pageRows[0].impressions} impressions.
                  </p>
                </div>
              </div>
            ) : null}
          </div>
        </DashboardCard>
      </div>

      <div className="mt-5 rounded-lg border border-white/10 bg-[#111111] p-5 text-sm leading-6 text-[#c9c9c9]">
        <div className="flex gap-3">
          <Radar className="mt-1 shrink-0 text-[#ff5a1f]" size={20} />
          <p>
            Operating rule: old tasks should be marked done or removed when completed, new tasks should be added from GSC, site events, AI visibility checks, authority work, or B&apos;s strategic direction, and recurring cron output should update memory/scorecards when meaningful work ships.
          </p>
        </div>
      </div>
    </AppShell>
  );
}
