import { ArrowUpRight, GitCommitHorizontal, ListChecks } from "lucide-react";
import { AppShell } from "@/components/app-shell";
import { DashboardCard, PageHeader, StatusBadge } from "@/components/dashboard-card";
import { commandState, workColumns, type CommandWorkItem, type WorkPriority, type WorkStatus } from "@/data/command-center-state";
import { workLedger } from "@/data/work-ledger";

function priorityTone(priority: WorkPriority) {
  if (priority === "P0") return "danger";
  if (priority === "P1") return "gold";
  if (priority === "P2") return "warn";
  return "neutral";
}

function statusTone(status: WorkStatus | string) {
  if (status === "Done" || status === "verified") return "good";
  if (status === "This Week" || status === "In Progress" || status === "pending" || status === "needs-data") return "warn";
  if (status === "Needs B Approval" || status === "Waiting / Blocked" || status === "blocked") return "danger";
  return "neutral";
}

function itemsFor(status: WorkStatus) {
  return commandState.workItems.filter((item) => item.status === status);
}

function WorkCard({ item }: { item: CommandWorkItem }) {
  return (
    <article className="rounded-md border border-white/10 bg-white/5 p-4">
      <div className="flex flex-wrap items-center gap-2">
        <StatusBadge tone={priorityTone(item.priority)}>{item.priority}</StatusBadge>
        <StatusBadge tone={statusTone(item.status)}>{item.status}</StatusBadge>
        <StatusBadge tone="neutral">{item.lane}</StatusBadge>
      </div>
      <h2 className="mt-3 text-base font-semibold leading-6 text-white">{item.title}</h2>
      <div className="mt-3 space-y-2 text-sm leading-6 text-[#c9c9c9]">
        <p>
          <span className="font-semibold text-white">Why: </span>
          {item.why}
        </p>
        <p>
          <span className="font-semibold text-white">Expected impact: </span>
          {item.expectedImpact}
        </p>
        <p>
          <span className="font-semibold text-white">Proof required: </span>
          {item.proofRequired}
        </p>
        <p>
          <span className="font-semibold text-white">Owner: </span>
          {item.owner}
        </p>
        <p>
          <span className="font-semibold text-white">Due/cadence: </span>
          {item.dueOrCadence}
        </p>
      </div>
      <div className="mt-3 flex flex-wrap gap-2">
        {item.links.map((link) => (
          <span key={link} className="inline-flex items-center gap-1 rounded bg-white/10 px-2 py-1 text-xs font-semibold text-[#d6d6d6]">
            {link.startsWith("/") ? <ArrowUpRight size={13} /> : null}
            {link}
          </span>
        ))}
      </div>
      <p className="mt-3 text-xs font-semibold uppercase tracking-[0.14em] text-[#ff8a3d]">
        Watch: {item.metricToWatch}
      </p>
    </article>
  );
}

export default function WorkPage() {
  const inMotion = commandState.workItems.filter((item) => item.status === "This Week" || item.status === "In Progress").length;
  const approvals = itemsFor("Needs B Approval").length;
  const blocked = itemsFor("Waiting / Blocked").length;
  const latestLedger = workLedger.slice(0, 8);

  return (
    <AppShell>
      <PageHeader
        eyebrow="Work Board"
        title="The command center starts here: backlog, this week, in progress, blocked, approvals, and done."
        description="This board is backed by command-center state, not chat memory. Cron jobs and operator runs should pull from these items."
        action={<StatusBadge tone="gold">State updated {new Date(commandState.updatedAt).toISOString().slice(0, 10)}</StatusBadge>}
      />

      <div className="mb-5 grid gap-4 md:grid-cols-4">
        {[
          { label: "Board items", value: commandState.workItems.length, note: "Persistent command-state tasks." },
          { label: "In motion", value: inMotion, note: "This Week or In Progress." },
          { label: "Needs approval", value: approvals, note: "External-facing work cannot proceed alone." },
          { label: "Waiting/blocked", value: blocked, note: "Paused for data, crawl delay, or proof." },
        ].map((metric) => (
          <DashboardCard key={metric.label} title={metric.label}>
            <p className="text-4xl font-semibold text-white">{metric.value}</p>
            <p className="mt-3 text-sm leading-6 text-[#c9c9c9]">{metric.note}</p>
          </DashboardCard>
        ))}
      </div>

      <DashboardCard title="Board" eyebrow="Cron and operator source of truth" className="mb-5">
        <div className="grid gap-4 xl:grid-cols-3 2xl:grid-cols-6">
          {workColumns.map((column) => (
            <section key={column} className="min-h-40 rounded-md border border-white/10 bg-black/35 p-3">
              <div className="mb-3 flex items-center justify-between gap-2">
                <h2 className="text-sm font-semibold text-white">{column}</h2>
                <StatusBadge tone={statusTone(column)}>{itemsFor(column).length}</StatusBadge>
              </div>
              <div className="space-y-3">
                {itemsFor(column).map((item) => (
                  <WorkCard key={item.id} item={item} />
                ))}
                {itemsFor(column).length === 0 ? (
                  <p className="rounded-md border border-dashed border-white/10 p-3 text-sm leading-6 text-[#8f8f8f]">
                    Empty by design. Add work here only when it has a clear proof requirement.
                  </p>
                ) : null}
              </div>
            </section>
          ))}
        </div>
      </DashboardCard>

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
