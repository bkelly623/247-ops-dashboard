import { LockKeyhole, RotateCcw } from "lucide-react";
import { AppShell } from "@/components/app-shell";
import {
  DashboardCard,
  PageHeader,
  StatusBadge,
} from "@/components/dashboard-card";
import { getCommandState } from "@/lib/command-state/server";

export const dynamic = "force-dynamic";

export default async function DecisionsPage() {
  const commandState = await getCommandState();
  const locked = commandState.decisions.filter(
    (decision) => decision.status === "Locked",
  ).length;

  return (
    <AppShell>
      <PageHeader
        eyebrow="Decision Log"
        title="Strategy & doctrine"
        description="Win qualified demand through discoverability, credible proof, and the AI Opportunity Audit. These decisions keep execution aligned."
        action={<StatusBadge tone="gold">{locked} locked</StatusBadge>}
      />

      <section className="panel mb-5">
        <div className="panel-head">
          <h2>Campaign sequence</h2>
          <span className="pill">Operating direction</span>
        </div>
        {[
          {
            title: "01 / Establish the truth",
            body: "Measure search visibility, audit starts, unlocks, and contact intent. Baseline AI answers before claiming presence. Exit condition: repeatable measurements with sources and dates.",
          },
          {
            title: "02 / Earn discoverability and trust",
            body: "Improve evidence-backed pages and prepare legitimate authority profiles. Exit condition: approved assets are live with proof. Public submissions remain approval-gated.",
          },
          {
            title: "03 / Convert and compound",
            body: "Find the weakest observed step in the audit journey. Fix friction and measure the next comparable window. Scale only when outcomes support it, not because more work shipped.",
          },
        ].map((step) => (
          <div key={step.title} className="strategy-step">
            <h3>{step.title}</h3>
            <p>{step.body}</p>
          </div>
        ))}
      </section>
      <div className="grid gap-4 xl:grid-cols-2">
        {commandState.decisions.map((decision) => (
          <DashboardCard
            key={decision.id}
            title={decision.decision}
            eyebrow={decision.date}
          >
            <div className="flex flex-wrap items-center gap-2">
              <StatusBadge
                tone={decision.status === "Locked" ? "good" : "warn"}
              >
                {decision.status}
              </StatusBadge>
            </div>
            <div className="mt-5 space-y-4 text-sm leading-6 text-[#c9c9c9]">
              <div className="flex gap-3">
                <LockKeyhole
                  className="mt-1 shrink-0 text-[#86efac]"
                  size={18}
                />
                <p>
                  <span className="font-semibold text-white">Reason: </span>
                  {decision.reason}
                </p>
              </div>
              <div className="flex gap-3 rounded-md border border-white/10 bg-white/5 p-3">
                <RotateCcw className="mt-1 shrink-0 text-[#ff8a3d]" size={18} />
                <p>
                  <span className="font-semibold text-white">
                    Reopen only if:{" "}
                  </span>
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
