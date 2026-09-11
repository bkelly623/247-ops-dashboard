import { ShieldAlert } from "lucide-react";
import { AppShell } from "@/components/app-shell";
import { DashboardCard, PageHeader, StatusBadge } from "@/components/dashboard-card";
import { getCommandState } from "@/lib/command-state/server";

function riskTone(risk: string) {
  if (risk === "High") return "danger";
  if (risk === "Medium") return "warn";
  return "good";
}

export const dynamic = "force-dynamic";

export default async function AuthorityPipelinePage() {
  const commandState = await getCommandState();
  const needsApproval = commandState.pipelines.authority.filter((item) => item.approvalNeeded).length;

  return (
    <AppShell>
      <PageHeader
        eyebrow="Authority Pipeline"
        title="Authority targets with type, risk, required assets, approval status, and proof."
        description="This is where legitimate profile, citation, proof, and partner work lives before anything public happens."
        action={<StatusBadge tone="danger">{needsApproval} approval-gated</StatusBadge>}
      />

      <div className="grid gap-4 xl:grid-cols-3">
        {commandState.pipelines.authority.map((item) => (
          <DashboardCard key={item.id} title={item.target} eyebrow={item.type}>
            <div className="flex flex-wrap items-center gap-2">
              <StatusBadge tone={item.status.includes("Approval") ? "danger" : "warn"}>{item.status}</StatusBadge>
              <StatusBadge tone={riskTone(item.risk)}>{item.risk} risk</StatusBadge>
            </div>
            <div className="mt-5 space-y-3 text-sm leading-6 text-[#c9c9c9]">
              <p>
                <span className="font-semibold text-white">Required assets: </span>
                {item.requiredAssets}
              </p>
              <p>
                <span className="font-semibold text-white">Next action: </span>
                {item.nextAction}
              </p>
              <div className="flex gap-3 rounded-md border border-white/10 bg-white/5 p-3">
                <ShieldAlert className="mt-1 shrink-0 text-[#ff8a3d]" size={18} />
                <p>
                  <span className="font-semibold text-white">Proof: </span>
                  {item.proof}
                </p>
              </div>
            </div>
          </DashboardCard>
        ))}
      </div>
    </AppShell>
  );
}
