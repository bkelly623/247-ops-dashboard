import { Bot, Search } from "lucide-react";
import { AppShell } from "@/components/app-shell";
import { DashboardCard, PageHeader, StatusBadge } from "@/components/dashboard-card";
import { visibilitySnapshots } from "@/data/visibility-snapshots";
import { searchBaselines } from "@/data/search-baselines";

function statusTone(status: string) {
  if (status === "present" || status === "indexed") return "good";
  if (status === "stale" || status === "stale-result" || status === "pending") return "warn";
  if (status === "absent" || status === "not-observed") return "danger";
  return "neutral";
}

export default function VisibilityPage() {
  const present = visibilitySnapshots.filter((item) => item.standing === "present").length;
  const absent = visibilitySnapshots.filter((item) => item.standing === "absent").length;
  const pending = visibilitySnapshots.filter((item) => item.standing === "pending").length;

  return (
    <AppShell>
      <PageHeader
        eyebrow="Rank Proof"
        title="Track what search engines and AI answer engines actually show."
        description="This board separates discovery, ranking, stale results, absence, and pending checks so visibility work stays honest."
        action={<StatusBadge tone="gold">Manual baseline active</StatusBadge>}
      />

      <div className="mb-5 grid gap-4 sm:grid-cols-3">
        {[
          { label: "Present", value: present, note: "247ROI or the target page was observed." },
          { label: "Absent", value: absent, note: "The target was not observed in the checked result set." },
          { label: "Pending AI checks", value: pending, note: "Answer-engine snapshots still need to be run." },
        ].map((metric) => (
          <DashboardCard key={metric.label} title={metric.label}>
            <p className="text-4xl font-semibold text-[#171511]">{metric.value}</p>
            <p className="mt-3 text-sm leading-6 text-[#665d4e]">{metric.note}</p>
          </DashboardCard>
        ))}
      </div>

      <DashboardCard title="Visibility Snapshots" eyebrow="Search and AI answer checks" className="mb-5">
        <div className="space-y-4">
          {visibilitySnapshots.map((snapshot) => (
            <article key={`${snapshot.engine}-${snapshot.queryOrPrompt}`} className="rounded-md border border-[#ded6c8] bg-white/55 p-4">
              <div className="flex flex-col gap-3 lg:flex-row lg:items-start lg:justify-between">
                <div>
                  <div className="flex flex-wrap items-center gap-2">
                    <StatusBadge tone={statusTone(snapshot.standing)}>{snapshot.standing}</StatusBadge>
                    <span className="text-xs font-semibold uppercase tracking-[0.14em] text-[#8b6a22]">
                      {snapshot.checkedAt} / {snapshot.engine}
                    </span>
                  </div>
                  <h2 className="mt-3 text-base font-semibold leading-7 text-[#171511]">{snapshot.queryOrPrompt}</h2>
                </div>
                <div className="flex items-center gap-2 rounded-md bg-[#171511] px-3 py-2 text-sm font-semibold text-[#d6a034]">
                  {snapshot.engine === "Google" || snapshot.engine === "Bing" ? <Search size={16} /> : <Bot size={16} />}
                  {snapshot.targetPage}
                </div>
              </div>

              <div className="mt-4 grid gap-4 lg:grid-cols-2">
                <div className="space-y-3 text-sm leading-6 text-[#665d4e]">
                  <p>
                    <span className="font-semibold text-[#171511]">Position: </span>
                    {snapshot.position}
                  </p>
                  <p>
                    <span className="font-semibold text-[#171511]">Observed URL: </span>
                    {snapshot.observedUrl ?? "None"}
                  </p>
                  <p>
                    <span className="font-semibold text-[#171511]">Competitors/entities: </span>
                    {snapshot.competitorsOrEntities}
                  </p>
                </div>
                <div className="space-y-3 text-sm leading-6 text-[#665d4e]">
                  <p>
                    <span className="font-semibold text-[#171511]">Summary: </span>
                    {snapshot.answerSummary}
                  </p>
                  <p>
                    <span className="font-semibold text-[#171511]">Next: </span>
                    {snapshot.nextAction}
                  </p>
                </div>
              </div>
            </article>
          ))}
        </div>
      </DashboardCard>

      <DashboardCard title="Legacy Manual Search Baselines" eyebrow="Imported from SEO board">
        <div className="grid gap-3 xl:grid-cols-2">
          {searchBaselines.map((baseline) => (
            <div key={baseline.query} className="rounded-md border border-[#ded6c8] bg-white/55 p-4">
              <div className="flex flex-wrap items-center gap-2">
                <StatusBadge tone={statusTone(baseline.standing)}>
                  {baseline.standing.replace("-", " ")}
                </StatusBadge>
                <span className="text-xs font-semibold uppercase tracking-[0.14em] text-[#8b6a22]">
                  {baseline.checkedAt}
                </span>
              </div>
              <p className="mt-3 text-sm font-semibold leading-6 text-[#171511]">{baseline.query}</p>
              <p className="mt-2 text-sm leading-6 text-[#665d4e]">{baseline.notes}</p>
              <p className="mt-2 text-sm leading-6 text-[#665d4e]">
                <span className="font-semibold text-[#171511]">Observed: </span>
                {baseline.observed247RoiUrls.length ? baseline.observed247RoiUrls.join(", ") : "None"}
              </p>
              <p className="mt-2 text-sm leading-6 text-[#665d4e]">
                <span className="font-semibold text-[#171511]">Next: </span>
                {baseline.nextAction}
              </p>
            </div>
          ))}
        </div>
      </DashboardCard>
    </AppShell>
  );
}
