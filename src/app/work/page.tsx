import { ArrowUpRight, GitCommitHorizontal, ListChecks } from "lucide-react";
import { AppShell } from "@/components/app-shell";
import { DashboardCard, PageHeader, StatusBadge } from "@/components/dashboard-card";
import { WorkBoardClient } from "@/components/work-board-client";
import { workLedger } from "@/data/work-ledger";
import { getCommandState } from "@/lib/command-state/server";

function statusTone(status: string) {
  if (status === "Done" || status === "verified") return "good";
  if (status === "This Week" || status === "In Progress" || status === "pending" || status === "needs-data") return "warn";
  if (status === "Needs B Approval" || status === "Waiting / Blocked" || status === "blocked") return "danger";
  return "neutral";
}

export const dynamic = "force-dynamic";

export default async function WorkPage() {
  const commandState = await getCommandState();
  const latestLedger = workLedger.slice(0, 8);

  return (
    <AppShell>
      <PageHeader
        eyebrow="Work Board"
        title="The command center starts here: backlog, this week, in progress, blocked, approvals, and done."
        description="This board is backed by persisted command-center snapshots, not chat memory. Cron jobs and operator runs should pull from these items."
        action={<StatusBadge tone="gold">State updated {new Date(commandState.updatedAt).toISOString().slice(0, 10)}</StatusBadge>}
      />

      <WorkBoardClient initialState={commandState} />

      <DashboardCard title="Done Ledger" eyebrow="Proof of shipped work">
        <div className="space-y-4">
          {latestLedger.map((entry) => (
            <article key={`${entry.repo}-${entry.title}`} className="rounded-md border border-white/10 bg-white/5 p-4">
              <div className="flex flex-col gap-3 lg:flex-row lg:items-start lg:justify-between">
                <div>
                  <div className="flex flex-wrap items-center gap-2">
                    <StatusBadge tone={statusTone(entry.evidenceStatus)}>{entry.evidenceStatus}</StatusBadge>
                    <span className="text-xs font-semibold uppercase tracking-[0.14em] text-[#ff6a2a]">
                      {entry.date} / {entry.area} / {entry.repo}
                    </span>
                  </div>
                  <h2 className="mt-3 text-lg font-semibold text-white">{entry.title}</h2>
                </div>
                <div className="flex items-center gap-2 rounded-md bg-black px-3 py-2 text-sm font-semibold text-[#ff8a3d]">
                  <GitCommitHorizontal size={16} />
                  {entry.commit}
                </div>
              </div>

              <div className="mt-4 grid gap-4 lg:grid-cols-[0.95fr_1.05fr]">
                <div className="space-y-3 text-sm leading-6 text-[#c9c9c9]">
                  <p>
                    <span className="font-semibold text-white">Why: </span>
                    {entry.why}
                  </p>
                  <p>
                    <span className="font-semibold text-white">Verification: </span>
                    {entry.evidence}
                  </p>
                  <p>
                    <span className="font-semibold text-white">Metric to watch next: </span>
                    {entry.followUp}
                  </p>
                </div>
                <div className="rounded-md border border-white/10 bg-black/35 p-3">
                  <div className="mb-3 flex items-center gap-2 text-sm font-semibold text-white">
                    <ListChecks size={16} className="text-[#ff8a3d]" />
                    Changed surfaces
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {entry.changed.map((item) => (
                      <span key={item} className="inline-flex items-center gap-1 rounded bg-white/10 px-2 py-1 text-xs font-semibold text-[#d6d6d6]">
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
