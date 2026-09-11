import {
  AlertTriangle,
  CheckCircle2,
  CircleDot,
  Clock3,
  ListChecks,
  ShieldAlert,
  Workflow,
} from "lucide-react";
import { AppShell } from "@/components/app-shell";
import { DashboardCard, PageHeader, StatusBadge } from "@/components/dashboard-card";
import { GrowthOperatingMap } from "@/components/growth-operating-map";
import {
  approvalBoundaries,
  cronJobs,
  growthLanes,
  growthQueue,
  northStar,
  offerStack,
  operatingLoops,
} from "@/data/growth-control-plane";
import { workLedger } from "@/data/work-ledger";

function statusTone(status: string) {
  if (status === "active" || status === "done") return "good";
  if (status === "candidate" || status === "queued" || status === "waiting" || status === "building" || status === "thin") return "warn";
  if (status === "held") return "neutral";
  return "danger";
}

function priorityTone(priority: string) {
  if (priority === "P0") return "danger";
  if (priority === "P1") return "gold";
  if (priority === "P2") return "warn";
  return "neutral";
}

export default function StrategyPage() {
  const activeQueue = growthQueue.filter((item) => item.status === "active");
  const queuedItems = growthQueue.filter((item) => item.status === "queued");
  const waitingItems = growthQueue.filter((item) => item.status === "waiting");
  const heldItems = growthQueue.filter((item) => item.status === "held");
  const latestWork = workLedger.slice(0, 5);

  return (
    <AppShell>
      <PageHeader
        eyebrow="247ROI Growth OS"
        title="What is done, where we stand, what is next, and who acts."
        description="This is the command-center control plane. Meaningful growth work is not complete unless this system reflects it."
        action={<StatusBadge tone="gold">Source of truth</StatusBadge>}
      />

      <div className="mb-5 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {[
          { label: "Active", value: activeQueue.length, tone: "good", note: "Work eligible for the next run." },
          { label: "Waiting", value: waitingItems.length, tone: "warn", note: "Work paused for crawl/data delay." },
          { label: "Queued", value: queuedItems.length, tone: "warn", note: "Real work, lower than active." },
          { label: "Held", value: heldItems.length, tone: "neutral", note: "Intentionally paused." },
        ].map((item) => (
          <DashboardCard key={item.label} title={item.label}>
            <StatusBadge tone={item.tone as "good" | "warn" | "neutral"}>{item.note}</StatusBadge>
            <p className="mt-4 text-4xl font-semibold text-white">{item.value}</p>
          </DashboardCard>
        ))}
      </div>

      <DashboardCard title="Operating Map" eyebrow="How work flows" className="mb-5">
        <GrowthOperatingMap />
      </DashboardCard>

      <DashboardCard title="Operating Lanes" eyebrow="Segments of work" className="mb-5">
        <div className="grid gap-3 xl:grid-cols-3">
          {growthLanes.map((lane) => (
            <article key={lane.name} className="rounded-md border border-white/10 bg-white/5 p-4">
              <div className="flex flex-wrap items-center gap-2">
                <StatusBadge tone={statusTone(lane.status)}>{lane.status}</StatusBadge>
                <span className="text-xs font-semibold uppercase tracking-[0.14em] text-[#ff6a2a]">
                  {lane.commandCenterSurface}
                </span>
              </div>
              <div className="mt-4 flex items-start gap-3">
                <Workflow className="mt-1 shrink-0 text-[#ff8a3d]" size={18} />
                <div>
                  <h2 className="text-base font-semibold text-white">{lane.name}</h2>
                  <p className="mt-2 text-sm leading-6 text-[#c9c9c9]">{lane.purpose}</p>
                </div>
              </div>
              <div className="mt-4 space-y-2 text-sm leading-6 text-[#c9c9c9]">
                <p>
                  <span className="font-semibold text-white">Now: </span>
                  {lane.currentRead}
                </p>
                <p>
                  <span className="font-semibold text-white">Priority: </span>
                  {lane.priority}
                </p>
              </div>
            </article>
          ))}
        </div>
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

      <div className="mb-5 grid gap-5 xl:grid-cols-[1.2fr_0.8fr]">
        <DashboardCard title="Task Queue" eyebrow="Prioritized work">
          <div className="space-y-3">
            {growthQueue.map((item) => (
              <article key={item.title} className="rounded-md border border-white/10 bg-white/5 p-4">
                <div className="flex flex-wrap items-center gap-2">
                  <StatusBadge tone={priorityTone(item.priority)}>{item.priority}</StatusBadge>
                  <StatusBadge tone={statusTone(item.status)}>{item.status}</StatusBadge>
                  <StatusBadge tone="neutral">{item.area}</StatusBadge>
                  <span className="text-xs font-semibold uppercase tracking-[0.14em] text-[#ff6a2a]">{item.owner}</span>
                </div>
                <p className="mt-3 text-base font-semibold text-white">{item.title}</p>
                <p className="mt-2 text-sm leading-6 text-[#c9c9c9]">
                  <span className="font-semibold text-white">Impact: </span>
                  {item.impact}
                </p>
                <p className="mt-2 text-sm leading-6 text-[#c9c9c9]">
                  <span className="font-semibold text-white">Evidence source: </span>
                  {item.evidenceSource}
                </p>
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
          <DashboardCard title="Cron Registry" eyebrow="Recurring work">
            <div className="space-y-3">
              {cronJobs.map((job) => (
                <article key={job.name} className="rounded-md border border-white/10 bg-white/5 p-4">
                  <div className="flex flex-wrap items-center gap-2">
                    <StatusBadge tone={statusTone(job.status)}>{job.status}</StatusBadge>
                    <span className="text-xs font-semibold uppercase tracking-[0.14em] text-[#ff6a2a]">
                      {job.schedule}
                    </span>
                  </div>
                  <p className="mt-3 font-semibold text-white">{job.name}</p>
                  <p className="mt-2 text-sm leading-6 text-[#c9c9c9]">{job.purpose}</p>
                  <div className="mt-3 grid gap-2 text-sm leading-6 text-[#c9c9c9]">
                    <p>
                      <span className="font-semibold text-white">Last: </span>
                      {job.lastRun}
                    </p>
                    <p>
                      <span className="font-semibold text-white">Next: </span>
                      {job.nextRun}
                    </p>
                    <p>
                      <span className="font-semibold text-white">Rule: </span>
                      {job.operatingRule}
                    </p>
                  </div>
                </article>
              ))}
            </div>
          </DashboardCard>

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
            <div className="space-y-3">
              {[
                {
                  icon: CircleDot,
                  text: "New ideas enter the queue. Cron jobs pull from the queue. Reports update the queue. Chat history is not the source of truth.",
                },
                {
                  icon: AlertTriangle,
                  text: "If Athena ships meaningful 247ROI growth work and the command center does not show it afterward, the work is incomplete.",
                },
                {
                  icon: Clock3,
                  text: "Do not add new recurring jobs until the lane has a stable playbook and visible state.",
                },
              ].map((rule) => {
                const Icon = rule.icon;

                return (
                  <div key={rule.text} className="flex gap-3">
                    <Icon className="mt-1 shrink-0 text-[#ff5a1f]" size={18} />
                    <p className="text-sm leading-6 text-[#c9c9c9]">{rule.text}</p>
                  </div>
                );
              })}
            </div>
          </DashboardCard>
        </div>
      </div>

      <DashboardCard title="Done Ledger" eyebrow="Newest visible work">
        <div className="grid gap-3 xl:grid-cols-5">
          {latestWork.map((entry) => (
            <article key={`${entry.repo}-${entry.commit}`} className="rounded-md border border-white/10 bg-white/5 p-4">
              <div className="flex flex-wrap items-center gap-2">
                <StatusBadge tone={statusTone(entry.evidenceStatus)}>{entry.evidenceStatus}</StatusBadge>
                <span className="text-xs font-semibold uppercase tracking-[0.14em] text-[#ff6a2a]">{entry.area}</span>
              </div>
              <p className="mt-3 text-sm font-semibold leading-6 text-white">{entry.title}</p>
              <div className="mt-3 flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.14em] text-[#c9c9c9]">
                <ListChecks size={14} />
                {entry.date} / {entry.commit}
              </div>
            </article>
          ))}
        </div>
      </DashboardCard>
    </AppShell>
  );
}
