import { LockKeyhole, RotateCcw } from "lucide-react";
import { AppShell } from "@/components/app-shell";
import { DashboardCard, PageHeader, StatusBadge } from "@/components/dashboard-card";
import { getCommandState } from "@/lib/command-state/server";

export const dynamic = "force-dynamic";

export default async function DecisionsPage() {
  const commandState = await getCommandState();
  const locked = commandState.decisions.filter((decision) => decision.status === "Locked").length;

  return (
    <AppShell>
      <PageHeader
        eyebrow="Decision Log"
        title="Locked strategy decisions so settled issues do not keep reopening."
        description="A decision can be reopened only when the recorded condition is met. Otherwise it governs the Work Board and cron runs."
        action={<StatusBadge tone="gold">{locked} locked</StatusBadge>}
      />

      <div className="grid gap-4 xl:grid-cols-2">
        {commandState.decisions.map((decision) => (
          <DashboardCard key={decision.id} title={decision.decision} eyebrow={decision.date}>
            <div className="flex flex-wrap items-center gap-2">
              <StatusBadge tone={decision.status === "Locked" ? "good" : "warn"}>{decision.status}</StatusBadge>
            </div>
            <div className="mt-5 space-y-4 text-sm leading-6 text-[#c9c9c9]">
              <div className="flex gap-3">
                <LockKeyhole className="mt-1 shrink-0 text-[#86efac]" size={18} />
                <p>
                  <span className="font-semibold text-white">Reason: </span>
                  {decision.reason}
                </p>
              </div>
              <div className="flex gap-3 rounded-md border border-white/10 bg-white/5 p-3">
                <RotateCcw className="mt-1 shrink-0 text-[#ff8a3d]" size={18} />
                <p>
                  <span className="font-semibold text-white">Reopen only if: </span>
                  {decision.reopenCondition}
                </p>
              </div>
            </div>
          </DashboardCard>
        ))}
      </div>
    </AppShell>
  );
}
