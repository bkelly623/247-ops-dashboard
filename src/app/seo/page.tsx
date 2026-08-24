import { Search, Waypoints } from "lucide-react";
import { AppShell } from "@/components/app-shell";
import { DashboardCard, PageHeader, StatusBadge } from "@/components/dashboard-card";

export default function SeoPage() {
  return (
    <AppShell>
      <PageHeader
        eyebrow="Reserved Module"
        title="SEO, AI visibility, and web management plug in here."
        description="This route is intentionally scaffolded for the SEO / AI visibility / web manager agent. It shares the same shell, design language, and data rules as the social module."
        action={<StatusBadge tone="neutral">Awaiting owner agent</StatusBadge>}
      />

      <div className="grid gap-5 lg:grid-cols-2">
        <DashboardCard title="Expected Responsibilities" eyebrow="Module contract">
          <div className="space-y-4 text-sm leading-6 text-[#665d4e]">
            <div className="flex gap-3">
              <Search size={18} className="mt-1 shrink-0 text-[#8b6a22]" />
              <p>
                Track search visibility, AI answer visibility, website health,
                audits, technical fixes, and high-value page opportunities.
              </p>
            </div>
            <div className="flex gap-3">
              <Waypoints size={18} className="mt-1 shrink-0 text-[#8b6a22]" />
              <p>
                Expose clean handoffs to Social when a search insight should
                become content, a landing page, or an outbound angle.
              </p>
            </div>
          </div>
        </DashboardCard>

        <DashboardCard title="Shared Rules" eyebrow="Do not fork the app">
          <ul className="space-y-3 text-sm leading-6 text-[#665d4e]">
            <li>Use shared components from `src/components`.</li>
            <li>Put module code under `src/modules/seo` when added.</li>
            <li>Keep API clients server-side unless browser-safe.</li>
            <li>Preserve the command-center style and route structure.</li>
          </ul>
        </DashboardCard>
      </div>
    </AppShell>
  );
}
