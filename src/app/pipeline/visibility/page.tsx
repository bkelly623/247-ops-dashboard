import { Eye, SearchX } from "lucide-react";
import { AppShell } from "@/components/app-shell";
import { DashboardCard, PageHeader, StatusBadge } from "@/components/dashboard-card";
import { getCommandState } from "@/lib/command-state/server";

function appearsLabel(value: boolean | null) {
  if (value === true) return "appears";
  if (value === false) return "absent";
  return "pending";
}

function appearsTone(value: boolean | null) {
  if (value === true) return "good";
  if (value === false) return "danger";
  return "warn";
}

export const dynamic = "force-dynamic";

export default async function AiVisibilityPipelinePage() {
  const commandState = await getCommandState();

  return (
    <AppShell>
      <PageHeader
        eyebrow="AI Visibility Pipeline"
        title="Tracked prompts, engines, 247ROI presence, competitors, cited domains, and next fixes."
        description="Absence is useful evidence. It shows whether the next fix should be authority, proof, entity clarity, or page support."
        action={<StatusBadge tone="gold">{commandState.pipelines.visibility.length} tracked checks</StatusBadge>}
      />

      <div className="space-y-4">
        {commandState.pipelines.visibility.map((item) => (
          <DashboardCard key={item.id} title={item.prompt} eyebrow={item.engine}>
            <div className="grid gap-4 lg:grid-cols-[0.75fr_1.25fr]">
              <div>
                <StatusBadge tone={appearsTone(item.appears)}>{appearsLabel(item.appears)}</StatusBadge>
                <div className="mt-5 space-y-3 text-sm leading-6 text-[#c9c9c9]">
                  <p>
                    <span className="font-semibold text-white">Competitors cited: </span>
                    {item.competitorsCited}
                  </p>
                  <p>
                    <span className="font-semibold text-white">Cited domains: </span>
                    {item.citedDomains}
                  </p>
                </div>
              </div>
              <div className="flex gap-3 rounded-md border border-white/10 bg-white/5 p-4">
                {item.appears ? (
                  <Eye className="mt-1 shrink-0 text-[#86efac]" size={20} />
                ) : (
                  <SearchX className="mt-1 shrink-0 text-[#fca5a5]" size={20} />
                )}
                <p className="text-sm leading-6 text-[#d8d8d8]">
                  <span className="font-semibold text-white">Next fix: </span>
                  {item.nextFix}
                </p>
              </div>
            </div>
          </DashboardCard>
        ))}
      </div>
    </AppShell>
  );
}
