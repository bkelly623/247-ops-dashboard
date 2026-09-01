import Link from "next/link";
import { Camera, ExternalLink, Monitor, Smartphone } from "lucide-react";
import { AppShell } from "@/components/app-shell";
import { DashboardCard, PageHeader, StatusBadge } from "@/components/dashboard-card";
import { visualProgressItems } from "@/data/visual-progress";

function statusTone(status: string) {
  if (status === "captured" || status === "visual") return "good";
  if (status === "queued" || status === "needs-traffic") return "warn";
  return "danger";
}

function ViewportIcon({ viewport }: { viewport: string }) {
  if (viewport === "mobile") return <Smartphone size={16} />;
  if (viewport === "desktop") return <Monitor size={16} />;
  return (
    <>
      <Monitor size={16} />
      <Smartphone size={16} />
    </>
  );
}

export default function ProgressPage() {
  const queued = visualProgressItems.filter((item) => item.screenshotStatus === "queued").length;
  const needsTraffic = visualProgressItems.filter((item) => item.evidenceStatus === "needs-traffic").length;

  return (
    <AppShell>
      <PageHeader
        eyebrow="Visual Progress"
        title="See what improved on the public site instead of trying to remember it."
        description="This page tracks meaningful design, clarity, proof, and conversion changes that deserve before/after screenshots."
        action={<StatusBadge tone="gold">{queued} screenshot sets queued</StatusBadge>}
      />

      <div className="mb-5 grid gap-4 sm:grid-cols-3">
        {[
          { label: "Tracked visual changes", value: visualProgressItems.length, note: "Meaningful public-site changes with before/after notes." },
          { label: "Screenshot queue", value: queued, note: "Desktop or mobile evidence still needs capture." },
          { label: "Needs traffic proof", value: needsTraffic, note: "Visual change is live, but business effect is not known." },
        ].map((metric) => (
          <DashboardCard key={metric.label} title={metric.label}>
            <p className="text-4xl font-semibold text-[#171511]">{metric.value}</p>
            <p className="mt-3 text-sm leading-6 text-[#665d4e]">{metric.note}</p>
          </DashboardCard>
        ))}
      </div>

      <DashboardCard title="Before / After Queue" eyebrow="Public site progress">
        <div className="grid gap-4 xl:grid-cols-2">
          {visualProgressItems.map((item) => (
            <article key={`${item.date}-${item.page}`} className="rounded-md border border-[#ded6c8] bg-white/55 p-4">
              <div className="flex flex-col gap-3 lg:flex-row lg:items-start lg:justify-between">
                <div>
                  <div className="flex flex-wrap items-center gap-2">
                    <StatusBadge tone={statusTone(item.screenshotStatus)}>{item.screenshotStatus}</StatusBadge>
                    <StatusBadge tone={statusTone(item.evidenceStatus)}>{item.evidenceStatus}</StatusBadge>
                    <span className="text-xs font-semibold uppercase tracking-[0.14em] text-[#8b6a22]">
                      {item.date}
                    </span>
                  </div>
                  <h2 className="mt-3 text-lg font-semibold text-[#171511]">{item.page}</h2>
                  <p className="mt-1 text-sm font-semibold text-[#665d4e]">{item.title}</p>
                </div>
                <div className="flex items-center gap-2 rounded-md bg-[#171511] px-3 py-2 text-sm font-semibold text-[#d6a034]">
                  <ViewportIcon viewport={item.viewport} />
                  {item.viewport}
                </div>
              </div>

              <div className="mt-4 grid gap-3 md:grid-cols-2">
                <div className="rounded-md border border-[#eee7da] bg-[#fbf6ea] p-3">
                  <p className="text-xs font-semibold uppercase tracking-[0.14em] text-[#8b6a22]">Before</p>
                  <p className="mt-2 text-sm leading-6 text-[#665d4e]">{item.before}</p>
                </div>
                <div className="rounded-md border border-[#d6dfd2] bg-[#f5fbf2] p-3">
                  <p className="text-xs font-semibold uppercase tracking-[0.14em] text-[#2f5a2e]">After</p>
                  <p className="mt-2 text-sm leading-6 text-[#4f624a]">{item.after}</p>
                </div>
              </div>

              <div className="mt-4 flex flex-col gap-3 border-t border-[#eee7da] pt-4 md:flex-row md:items-center md:justify-between">
                <p className="text-sm leading-6 text-[#665d4e]">
                  <span className="font-semibold text-[#171511]">Why it matters: </span>
                  {item.whyItMatters}
                </p>
                <Link
                  href={item.url}
                  className="inline-flex shrink-0 items-center justify-center gap-2 rounded-md bg-[#171511] px-3 py-2 text-sm font-semibold text-[#f7f1e3] transition hover:bg-[#2a261f]"
                >
                  <ExternalLink size={16} />
                  Open page
                </Link>
              </div>
            </article>
          ))}
        </div>
      </DashboardCard>

      <div className="mt-5">
        <DashboardCard title="Screenshot Standard" eyebrow="What counts as proof">
          <div className="grid gap-3 md:grid-cols-3">
            {[
              "Capture desktop and mobile for homepage, /hire, services, proof/demo, and major new assets.",
              "Only track changes that affect clarity, trust, conversion, SEO/GEO, or buyer confidence.",
              "Pair screenshots with the Work Ledger so every visual improvement has a reason and follow-up.",
            ].map((item) => (
              <div key={item} className="flex gap-3 rounded-md border border-[#ded6c8] bg-white/55 p-4">
                <Camera size={18} className="mt-1 shrink-0 text-[#8b6a22]" />
                <p className="text-sm leading-6 text-[#665d4e]">{item}</p>
              </div>
            ))}
          </div>
        </DashboardCard>
      </div>
    </AppShell>
  );
}
