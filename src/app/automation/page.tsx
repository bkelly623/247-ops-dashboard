import { Clock3, History, Power, Workflow } from "lucide-react";
import { AppShell } from "@/components/app-shell";
import {
  DashboardCard,
  PageHeader,
  StatusBadge,
} from "@/components/dashboard-card";
import { type AutomationRecord } from "@/data/command-center-state";
import { getCommandState } from "@/lib/command-state/server";

function statusTone(status: AutomationRecord["status"]) {
  if (status === "Useful") return "good";
  if (status === "Candidate") return "warn";
  if (status === "Noisy") return "danger";
  return "neutral";
}

export const dynamic = "force-dynamic";

export default async function AutomationPage() {
  const commandState = await getCommandState();

  return (
    <AppShell>
      <PageHeader
        eyebrow="Automation Center"
        title="Automation watch"
        description="Recorded schedules and last reported outputs. This view is not a live scheduler connection; it cannot start or stop jobs."
        action={
          <StatusBadge tone="gold">
            {commandState.automation.length} tracked jobs
          </StatusBadge>
        }
      />

      <p className="notice">
        Snapshot recorded {commandState.updatedAt.slice(0, 10)}. Verify current
        execution in OpenClaw before relying on these schedules.
      </p>
      <div className="grid gap-5 xl:grid-cols-2">
        {commandState.automation.map((job) => (
          <DashboardCard key={job.id} title={job.name} eyebrow={job.schedule}>
            <div className="flex flex-wrap items-center gap-2">
              <StatusBadge tone={statusTone(job.status)}>
                {job.status}
              </StatusBadge>
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
                  <span className="font-semibold text-white">
                    Retire rule:{" "}
                  </span>
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
