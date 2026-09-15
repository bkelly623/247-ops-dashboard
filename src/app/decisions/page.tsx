import Link from "next/link";
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
        title="Decision desk"
        description="Decide what moves forward. Inspect the exact scope, record constraints, or return an order for revision."
        action={<StatusBadge tone="gold">{locked} locked</StatusBadge>}
      />

      <section className="panel mb-5">
        <div className="panel-head"><h2>Awaiting your decision</h2><span className="pill amber">{commandState.workItems.filter(i => i.status === "Needs B Approval").length} pending</span></div>
        {commandState.workItems.filter(i => i.status === "Needs B Approval").map(i => <Link className="attention-item" href={`/work?task=${encodeURIComponent(i.id)}`} key={i.id}><span className="eyebrow">{i.priority} / {i.owner}</span><strong>{i.title}</strong><p>{i.expectedImpact}</p><p style={{color:"var(--accent)"}}>Inspect scope & decide →</p></Link>)}
        {!commandState.workItems.some(i => i.status === "Needs B Approval") && <p className="empty">No orders awaiting approval.</p>}
      </section>
      <section className="panel mb-5"><div className="panel-head"><h2>Decision history</h2><span className="pill">Recorded, not dispatched</span></div>
        {(commandState.commandLog ?? []).filter(e => ["approve", "request-changes"].includes(e.action)).reverse().slice(0,10).map(e => <Link key={e.id} href={`/work?task=${encodeURIComponent(e.orderId)}`} className="attention-item"><span className="eyebrow">{e.at.slice(0,16).replace("T"," ")} UTC / {e.actor}</span><strong>{e.title}</strong><p>{e.action === "approve" ? "Approved" : "Changes requested"} · {e.note}</p></Link>)}
        {!(commandState.commandLog ?? []).some(e => ["approve", "request-changes"].includes(e.action)) && <p className="empty">Approval decisions will appear here with their recorded reason and scope.</p>}
      </section>
      <details className="mb-5"><summary className="button">Growth strategy & locked doctrine</summary>
      <section className="panel mt-4 mb-5">
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
      </details>
    </AppShell>
  );
}
