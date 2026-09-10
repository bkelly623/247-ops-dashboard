import { CheckCircle2, CircleDot, ShieldAlert } from "lucide-react";
import { AppShell } from "@/components/app-shell";
import { DashboardCard, PageHeader, StatusBadge } from "@/components/dashboard-card";
import { GrowthOperatingMap } from "@/components/growth-operating-map";
import {
  approvalBoundaries,
  growthQueue,
  northStar,
  offerStack,
  operatingLoops,
} from "@/data/growth-control-plane";

function statusTone(status: string) {
  if (status === "active" || status === "done") return "good";
  if (status === "candidate" || status === "queued") return "warn";
  if (status === "held") return "neutral";
  return "danger";
}

export default function StrategyPage() {
  const activeQueue = growthQueue.filter((item) => item.status === "active");
  const queuedItems = growthQueue.filter((item) => item.status === "queued");
  const heldItems = growthQueue.filter((item) => item.status === "held");

  return (
    <AppShell>
      <PageHeader
        eyebrow="Growth Operating System"
        title="One strategy, one queue, controlled execution."
        description="This is the visual control plane for how 247ROI growth work is chosen, executed, approved, and reported."
        action={<StatusBadge tone="gold">Athena orchestrates</StatusBadge>}
      />

      <DashboardCard title="Operating Map" eyebrow="How work flows" className="mb-5">
        <GrowthOperatingMap />
      </DashboardCard>

      <div className="mb-5 grid gap-5 xl:grid-cols-[0.85fr_1.15fr]">
        <DashboardCard title="North Star" eyebrow="Commercial spine">
          <p className="text-base leading-7 text-[#d8d8d8]">{northStar}</p>
          <div className="mt-5 grid gap-3">
            {offerStack.map((item) => (
              <div key={item.label} className="rounded-md border border-white/10 bg-white/5 p-4">
                <p className="text-xs font-semibold uppercase tracking-[0.14em] text-[#ff6a2a]">{item.label}</p>
                <p className="mt-2 text-lg font-semibold text-white">{item.value}</p>
                <p className="mt-2 text-sm leading-6 text-[#c9c9c9]">{item.note}</p>
              </div>
            ))}
          </div>
        </DashboardCard>

        <DashboardCard title="Execution Loops" eyebrow="What is actually running">
          <div className="grid gap-3 lg:grid-cols-2">
            {operatingLoops.map((loop) => (
              <div key={loop.name} className="rounded-md border border-white/10 bg-white/5 p-4">
                <div className="flex flex-wrap items-center gap-2">
                  <StatusBadge tone={statusTone(loop.status)}>{loop.status}</StatusBadge>
                  <span className="text-xs font-semibold uppercase tracking-[0.14em] text-[#ff6a2a]">{loop.owner}</span>
                </div>
                <p className="mt-3 text-base font-semibold text-white">{loop.name}</p>
                <p className="mt-1 text-sm font-semibold text-[#d6d6d6]">{loop.cadence}</p>
                <p className="mt-3 text-sm leading-6 text-[#c9c9c9]">{loop.purpose}</p>
              </div>
            ))}
          </div>
        </DashboardCard>
      </div>

      <div className="mb-5 grid gap-5 xl:grid-cols-[1.15fr_0.85fr]">
        <DashboardCard title="Current Queue" eyebrow="What is left">
          <div className="mb-4 grid gap-3 sm:grid-cols-3">
            {[
              { label: "Active", value: activeQueue.length, tone: "good" },
              { label: "Queued", value: queuedItems.length, tone: "warn" },
              { label: "Held", value: heldItems.length, tone: "neutral" },
            ].map((item) => (
              <div key={item.label} className="rounded-md border border-white/10 bg-black p-4">
                <StatusBadge tone={item.tone as "good" | "warn" | "neutral"}>{item.label}</StatusBadge>
                <p className="mt-3 text-3xl font-semibold text-white">{item.value}</p>
              </div>
            ))}
          </div>
          <div className="space-y-3">
            {growthQueue.map((item) => (
              <article key={item.title} className="rounded-md border border-white/10 bg-white/5 p-4">
                <div className="flex flex-wrap items-center gap-2">
                  <StatusBadge tone={statusTone(item.status)}>{item.status}</StatusBadge>
                  <StatusBadge tone="neutral">{item.area}</StatusBadge>
                  <span className="text-xs font-semibold uppercase tracking-[0.14em] text-[#ff6a2a]">{item.owner}</span>
                </div>
                <p className="mt-3 text-base font-semibold text-white">{item.title}</p>
                <p className="mt-2 text-sm leading-6 text-[#c9c9c9]">
                  <span className="font-semibold text-white">Proof: </span>
                  {item.proof}
                </p>
                <p className="mt-2 text-sm leading-6 text-[#c9c9c9]">
                  <span className="font-semibold text-white">Next: </span>
                  {item.nextAction}
                </p>
              </article>
            ))}
          </div>
        </DashboardCard>

        <div className="space-y-5">
          <DashboardCard title="Agent Decision" eyebrow="Authority building">
            <div className="flex gap-3 rounded-md border border-[#16a34a]/30 bg-[#16a34a]/10 p-4">
              <CheckCircle2 className="mt-1 shrink-0 text-[#86efac]" size={20} />
              <div>
                <p className="font-semibold text-white">Athena remains the orchestrator.</p>
                <p className="mt-2 text-sm leading-6 text-[#c9c9c9]">
                  Use temporary agents for bounded authority research batches. Do not create another standing strategy owner yet.
                </p>
              </div>
            </div>
          </DashboardCard>

          <DashboardCard title="Approval Boundary" eyebrow="External actions">
            <div className="space-y-3">
              {approvalBoundaries.map((boundary) => (
                <div key={boundary} className="flex gap-3 rounded-md border border-white/10 bg-white/5 p-4">
                  <ShieldAlert className="mt-1 shrink-0 text-[#ff8a3d]" size={18} />
                  <p className="text-sm leading-6 text-[#d8d8d8]">{boundary}</p>
                </div>
              ))}
            </div>
          </DashboardCard>

          <DashboardCard title="Operating Rule" eyebrow="Anti-sprawl">
            <div className="flex gap-3">
              <CircleDot className="mt-1 shrink-0 text-[#ff5a1f]" size={18} />
              <p className="text-sm leading-6 text-[#c9c9c9]">
                New ideas enter the queue. Cron jobs pull from the queue. Reports update the queue. Chat history is not the source of truth.
              </p>
            </div>
          </DashboardCard>
        </div>
      </div>
    </AppShell>
  );
}
