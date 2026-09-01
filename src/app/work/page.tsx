import { ArrowUpRight, GitCommitHorizontal, ListChecks } from "lucide-react";
import { AppShell } from "@/components/app-shell";
import { DashboardCard, PageHeader, StatusBadge } from "@/components/dashboard-card";
import { workLedger } from "@/data/work-ledger";

function statusTone(status: string) {
  if (status === "verified") return "good";
  if (status === "needs-data" || status === "pending") return "warn";
  if (status === "blocked") return "danger";
  return "neutral";
}

export default function WorkPage() {
  const verified = workLedger.filter((entry) => entry.evidenceStatus === "verified").length;
  const waiting = workLedger.filter((entry) => entry.evidenceStatus !== "verified").length;

  return (
    <AppShell>
      <PageHeader
        eyebrow="Work Ledger"
        title="Every meaningful 247ROI change gets a why, an expected effect, and a follow-up."
        description="This replaces scattered chat history and git-log archaeology with an operator-readable ledger of shipped work."
        action={<StatusBadge tone="gold">{workLedger.length} tracked changes</StatusBadge>}
      />

      <div className="mb-5 grid gap-4 sm:grid-cols-3">
        {[
          { label: "Tracked changes", value: workLedger.length, note: "Seeded from recent public-site and dashboard commits." },
          { label: "Verified", value: verified, note: "The implementation or measurement outcome is confirmed." },
          { label: "Needs proof", value: waiting, note: "Shipped work waiting on traffic, screenshots, ranking checks, or distribution." },
        ].map((metric) => (
          <DashboardCard key={metric.label} title={metric.label}>
            <p className="text-4xl font-semibold text-[#171511]">{metric.value}</p>
            <p className="mt-3 text-sm leading-6 text-[#665d4e]">{metric.note}</p>
          </DashboardCard>
        ))}
      </div>

      <DashboardCard title="Ledger" eyebrow="Newest first">
        <div className="space-y-4">
          {workLedger.map((entry) => (
            <article key={`${entry.repo}-${entry.commit}`} className="rounded-md border border-[#ded6c8] bg-white/55 p-4">
              <div className="flex flex-col gap-3 lg:flex-row lg:items-start lg:justify-between">
                <div>
                  <div className="flex flex-wrap items-center gap-2">
                    <StatusBadge tone={statusTone(entry.evidenceStatus)}>{entry.evidenceStatus}</StatusBadge>
                    <span className="text-xs font-semibold uppercase tracking-[0.14em] text-[#8b6a22]">
                      {entry.date} / {entry.area} / {entry.repo}
                    </span>
                  </div>
                  <h2 className="mt-3 text-lg font-semibold text-[#171511]">{entry.title}</h2>
                </div>
                <div className="flex items-center gap-2 rounded-md bg-[#171511] px-3 py-2 text-sm font-semibold text-[#d6a034]">
                  <GitCommitHorizontal size={16} />
                  {entry.commit}
                </div>
              </div>

              <div className="mt-4 grid gap-4 lg:grid-cols-[0.95fr_1.05fr]">
                <div className="space-y-3 text-sm leading-6 text-[#665d4e]">
                  <p>
                    <span className="font-semibold text-[#171511]">Why: </span>
                    {entry.why}
                  </p>
                  <p>
                    <span className="font-semibold text-[#171511]">Expected effect: </span>
                    {entry.expectedEffect}
                  </p>
                  <p>
                    <span className="font-semibold text-[#171511]">Evidence: </span>
                    {entry.evidence}
                  </p>
                  <p>
                    <span className="font-semibold text-[#171511]">Follow-up: </span>
                    {entry.followUp}
                  </p>
                </div>
                <div className="rounded-md border border-[#eee7da] bg-[#fbf6ea] p-3">
                  <div className="mb-3 flex items-center gap-2 text-sm font-semibold text-[#171511]">
                    <ListChecks size={16} className="text-[#8b6a22]" />
                    Changed surfaces
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {entry.changed.map((item) => (
                      <span key={item} className="inline-flex items-center gap-1 rounded bg-[#ece5d7] px-2 py-1 text-xs font-semibold text-[#615746]">
                        {item.startsWith("/") ? <ArrowUpRight size={13} /> : null}
                        {item}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </article>
          ))}
        </div>
      </DashboardCard>
    </AppShell>
  );
}
