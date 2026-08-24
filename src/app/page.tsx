import Link from "next/link";
import { ArrowUpRight, Clock3, ShieldAlert } from "lucide-react";
import { AppShell } from "@/components/app-shell";
import { DashboardCard, PageHeader, StatusBadge } from "@/components/dashboard-card";
import {
  moduleCards,
  operatingPrinciples,
  overviewMetrics,
  pipelineItems,
  recentPosts,
} from "@/data/command-center";

export default function Home() {
  return (
    <AppShell>
      <PageHeader
        eyebrow="Command Center"
        title="Today decides what gets built, published, cleaned, and scaled."
        description="The 247ROI dashboard is the operating layer for social, SEO, visibility, web, and growth work. It preserves the learning, burns the mess, and keeps every agent inside one system."
        action={<StatusBadge tone="gold">Initial scaffold</StatusBadge>}
      />

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {overviewMetrics.map((metric) => {
          const Icon = metric.icon;

          return (
            <DashboardCard key={metric.label} title={metric.label}>
              <div className="flex items-end justify-between gap-4">
                <div>
                  <p className="text-3xl font-semibold">{metric.value}</p>
                  <p className="mt-2 text-sm text-[#665d4e]">{metric.delta}</p>
                </div>
                <div className="flex size-11 items-center justify-center rounded-md bg-[#171511] text-[#d6a034]">
                  <Icon size={21} />
                </div>
              </div>
            </DashboardCard>
          );
        })}
      </div>

      <div className="mt-5 grid gap-5 xl:grid-cols-[1.1fr_0.9fr]">
        <DashboardCard title="Module Map" eyebrow="Agent handoff zones">
          <div className="grid gap-3">
            {moduleCards.map((module) => {
              const Icon = module.icon;

              return (
                <Link
                  key={module.href}
                  href={module.href}
                  className="group flex items-start gap-4 rounded-md border border-[#ded6c8] bg-white/55 p-4 transition hover:border-[#d6a034] hover:bg-white"
                >
                  <div className="flex size-10 shrink-0 items-center justify-center rounded-md bg-[#171511] text-[#d6a034]">
                    <Icon size={20} />
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="flex flex-wrap items-center gap-2">
                      <h3 className="font-semibold">{module.title}</h3>
                      <StatusBadge
                        tone={module.status === "Active build" ? "gold" : "neutral"}
                      >
                        {module.status}
                      </StatusBadge>
                    </div>
                    <p className="mt-2 text-sm leading-6 text-[#665d4e]">
                      {module.description}
                    </p>
                  </div>
                  <ArrowUpRight
                    size={18}
                    className="mt-1 text-[#7a6e5b] transition group-hover:text-[#171511]"
                  />
                </Link>
              );
            })}
          </div>
        </DashboardCard>

        <DashboardCard title="Daily War Room" eyebrow="What matters now">
          <div className="space-y-4">
            <div className="rounded-md border border-[#ded6c8] bg-white/55 p-4">
              <div className="flex items-center gap-2 text-sm font-semibold">
                <Clock3 size={16} className="text-[#8b6a22]" />
                Today&apos;s production constraint
              </div>
              <p className="mt-2 text-sm leading-6 text-[#665d4e]">
                Ship the command-center shell, then move social posts through the
                proof-first pipeline instead of creating more loose files.
              </p>
            </div>
            <div className="rounded-md border border-[#ded6c8] bg-white/55 p-4">
              <div className="flex items-center gap-2 text-sm font-semibold">
                <ShieldAlert size={16} className="text-[#8b6a22]" />
                Cleanup doctrine
              </div>
              <p className="mt-2 text-sm leading-6 text-[#665d4e]">
                Heavy files expire after 3 days. Hooks, scripts, metrics, and
                verdicts stay because they compound.
              </p>
            </div>
          </div>
        </DashboardCard>
      </div>

      <div className="mt-5 grid gap-5 xl:grid-cols-3">
        <DashboardCard title="Active Pipeline" eyebrow="Social production">
          <div className="space-y-3">
            {pipelineItems.slice(0, 3).map((item) => (
              <div
                key={item.title}
                className="rounded-md border border-[#ded6c8] bg-white/55 p-3"
              >
                <div className="flex items-center justify-between gap-3">
                  <p className="text-sm font-semibold">{item.title}</p>
                  <StatusBadge tone={item.risk === "High" ? "danger" : "neutral"}>
                    {item.stage}
                  </StatusBadge>
                </div>
                <p className="mt-2 text-xs text-[#665d4e]">
                  {item.owner} / {item.due}
                </p>
              </div>
            ))}
          </div>
        </DashboardCard>

        <DashboardCard title="Latest Verdicts" eyebrow="Kill / iterate / scale">
          <div className="space-y-3">
            {recentPosts.map((post) => (
              <div
                key={post.title}
                className="rounded-md border border-[#ded6c8] bg-white/55 p-3"
              >
                <div className="flex items-center justify-between gap-3">
                  <p className="text-sm font-semibold">{post.title}</p>
                  <StatusBadge tone={post.verdict === "Scale" ? "good" : "warn"}>
                    {post.verdict}
                  </StatusBadge>
                </div>
                <p className="mt-2 text-xs text-[#665d4e]">
                  {post.platform} / {post.views} views / {post.engagement}
                </p>
              </div>
            ))}
          </div>
        </DashboardCard>

        <DashboardCard title="Operating Principles" eyebrow="Do not drift">
          <div className="space-y-3">
            {operatingPrinciples.map((principle) => {
              const Icon = principle.icon;

              return (
                <div key={principle.title} className="flex gap-3">
                  <div className="mt-1 flex size-8 shrink-0 items-center justify-center rounded-md bg-[#ece5d7] text-[#8b6a22]">
                    <Icon size={16} />
                  </div>
                  <div>
                    <p className="text-sm font-semibold">{principle.title}</p>
                    <p className="mt-1 text-sm leading-6 text-[#665d4e]">
                      {principle.description}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </DashboardCard>
      </div>
    </AppShell>
  );
}
