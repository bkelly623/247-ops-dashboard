import { ArrowUpRight, Search } from "lucide-react";
import { AppShell } from "@/components/app-shell";
import { DashboardCard, PageHeader, StatusBadge } from "@/components/dashboard-card";
import { commandState } from "@/data/command-center-state";

function metric(value: number | null) {
  if (typeof value !== "number") return "Pending";
  return value.toLocaleString();
}

function position(value: number | null) {
  if (typeof value !== "number") return "Pending";
  return value.toFixed(value >= 10 ? 1 : 2);
}

export default function SeoPipelinePage() {
  return (
    <AppShell>
      <PageHeader
        eyebrow="SEO / Page Pipeline"
        title="Planned and live pages with target query, rank evidence, and next action."
        description="This view keeps page work tied to Search Console evidence instead of creating pages from vague ideas."
        action={<StatusBadge tone="gold">{commandState.pipelines.seo.length} tracked pages</StatusBadge>}
      />

      <DashboardCard title="Page Pipeline" eyebrow="Evidence before expansion">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[920px] border-separate border-spacing-0 text-left text-sm">
            <thead className="text-xs uppercase tracking-[0.14em] text-[#ff8a3d]">
              <tr>
                <th className="border-b border-white/10 px-3 py-3">Page</th>
                <th className="border-b border-white/10 px-3 py-3">Target query</th>
                <th className="border-b border-white/10 px-3 py-3">Status</th>
                <th className="border-b border-white/10 px-3 py-3">Impr.</th>
                <th className="border-b border-white/10 px-3 py-3">Clicks</th>
                <th className="border-b border-white/10 px-3 py-3">Avg rank</th>
                <th className="border-b border-white/10 px-3 py-3">Next action</th>
              </tr>
            </thead>
            <tbody className="text-[#d8d8d8]">
              {commandState.pipelines.seo.map((item) => (
                <tr key={item.id} className="align-top">
                  <td className="border-b border-white/10 px-3 py-4 font-semibold text-white">
                    <span className="inline-flex items-center gap-2">
                      <ArrowUpRight size={14} className="text-[#ff8a3d]" />
                      {item.page}
                    </span>
                  </td>
                  <td className="border-b border-white/10 px-3 py-4">{item.targetQuery}</td>
                  <td className="border-b border-white/10 px-3 py-4">
                    <StatusBadge tone={item.status.includes("Needs") ? "warn" : "good"}>{item.status}</StatusBadge>
                  </td>
                  <td className="border-b border-white/10 px-3 py-4">{metric(item.impressions)}</td>
                  <td className="border-b border-white/10 px-3 py-4">{metric(item.clicks)}</td>
                  <td className="border-b border-white/10 px-3 py-4">{position(item.averagePosition)}</td>
                  <td className="border-b border-white/10 px-3 py-4">
                    <div className="flex gap-2">
                      <Search className="mt-1 shrink-0 text-[#ff8a3d]" size={16} />
                      <span>{item.nextAction}</span>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </DashboardCard>
    </AppShell>
  );
}
