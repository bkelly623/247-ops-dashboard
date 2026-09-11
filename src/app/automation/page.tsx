import { Clock3, History, Power, Workflow } from "lucide-react";
import { AppShell } from "@/components/app-shell";
import { DashboardCard, PageHeader, StatusBadge } from "@/components/dashboard-card";
import { commandState, type AutomationRecord } from "@/data/command-center-state";

function statusTone(status: AutomationRecord["status"]) {
  if (status === "Useful") return "good";
  if (status === "Candidate") return "warn";
  if (status === "Noisy") return "danger";
  return "neutral";
}

export default function AutomationPage() {
  return (
    <AppShell>
      <PageHeader
        eyebrow="Automation Center"
        title="Cron jobs, run history, next planned work, and retire rules."
        description="Automation is useful only if it pulls from the Work Board, records outputs, and stops creating disconnected strategy."
        action={<StatusBadge tone="gold">{commandState.automation.length} tracked jobs</StatusBadge>}
      />

      <div className="grid gap-5 xl:grid-cols-3">
        {commandState.automation.map((job) => (
          <DashboardCard key={job.id} title={job.name} eyebrow={job.schedule}>
            <div className="flex flex-wrap items-center gap-2">
              <StatusBadge tone={statusTone(job.status)}>{job.status}</StatusBadge>
              <StatusBadge tone="neutral">{job.nextPlannedRun}</StatusBadge>
            </div>
            <div className="mt-5 space-y-4 text-sm leading-6 text-[#c9c9c9]">
              <div className="flex gap-3">
                <Workflow className="mt-1 shrink-0 text-[#ff8a3d]" size={18} />
                <p>
                  <span className="font-semibold text-white">Purpose: </span>
                  {job.purpose}
                </p>
              </div>
              <div className="flex gap-3">
                <History className="mt-1 shrink-0 text-[#ff8a3d]" size={18} />
                <p>
                  <span className="font-semibold text-white">Last run: </span>
                  {job.lastRan}. {job.lastOutput}
                </p>
              </div>
              <div className="flex gap-3">
                <Clock3 className="mt-1 shrink-0 text-[#ff8a3d]" size={18} />
                <p>
                  <span className="font-semibold text-white">Next work: </span>
                  {job.nextPlannedWork}
                </p>
              </div>
              <div className="flex gap-3 rounded-md border border-white/10 bg-white/5 p-3">
                <Power className="mt-1 shrink-0 text-[#fca5a5]" size={18} />
                <p>
                  <span className="font-semibold text-white">Retire rule: </span>
                  {job.retireRule}
                </p>
              </div>
            </div>
          </DashboardCard>
        ))}
      </div>
    </AppShell>
  );
}
