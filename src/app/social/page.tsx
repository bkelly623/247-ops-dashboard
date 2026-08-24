import {
  CalendarDays,
  FlaskConical,
  Gauge,
  RadioTower,
  Sparkles,
  Trash2,
} from "lucide-react";
import { AppShell } from "@/components/app-shell";
import { DashboardCard, PageHeader, StatusBadge } from "@/components/dashboard-card";
import {
  cleanupQueue,
  experiments,
  hookCandidates,
  integrationStatus,
  pipelineItems,
  platformMix,
  recentPosts,
} from "@/data/command-center";

const stageTone = {
  Idea: "neutral",
  Hook: "gold",
  Script: "warn",
  Production: "warn",
  QC: "danger",
  Scheduled: "good",
  Published: "good",
  Verdict: "neutral",
} as const;

export default function SocialPage() {
  return (
    <AppShell>
      <PageHeader
        eyebrow="Social Command Center"
        title="Build the 247ROI media machine without letting the mess win."
        description="This is the control surface for bold content, PostFast publishing, production cleanup, hook experiments, and performance-driven remixes."
        action={<StatusBadge tone="gold">Hermes-owned module</StatusBadge>}
      />

      <div className="grid gap-5 xl:grid-cols-[1.35fr_0.65fr]">
        <DashboardCard title="Today's Publishing Plan" eyebrow="Daily war room">
          <div className="grid gap-3 md:grid-cols-3">
            {[
              {
                label: "Post target",
                value: "3 videos",
                detail: "One proof demo, one owner truth, one remix.",
                icon: CalendarDays,
              },
              {
                label: "Creative test",
                value: "Status threat",
                detail: "Does blunt owner diagnosis beat education?",
                icon: FlaskConical,
              },
              {
                label: "Main risk",
                value: "Weak proof",
                detail: "Reject anything that only says AI is cool.",
                icon: Gauge,
              },
            ].map((item) => {
              const Icon = item.icon;

              return (
                <div
                  key={item.label}
                  className="rounded-md border border-[#ded6c8] bg-white/55 p-4"
                >
                  <div className="flex items-center justify-between gap-3">
                    <p className="text-xs font-semibold uppercase tracking-[0.15em] text-[#8b6a22]">
                      {item.label}
                    </p>
                    <Icon size={18} className="text-[#8b6a22]" />
                  </div>
                  <p className="mt-3 text-2xl font-semibold">{item.value}</p>
                  <p className="mt-2 text-sm leading-6 text-[#665d4e]">
                    {item.detail}
                  </p>
                </div>
              );
            })}
          </div>
        </DashboardCard>

        <DashboardCard title="PostFast Control" eyebrow="Publishing rail">
          <div className="space-y-3">
            {integrationStatus
              .filter((item) => item.name === "PostFast")
              .map((item) => {
                const Icon = item.icon;

                return (
                  <div
                    key={item.name}
                    className="rounded-md border border-[#ded6c8] bg-white/55 p-4"
                  >
                    <div className="flex items-center justify-between gap-3">
                      <div className="flex items-center gap-2">
                        <Icon size={18} className="text-[#8b6a22]" />
                        <p className="font-semibold">{item.name}</p>
                      </div>
                      <StatusBadge tone="warn">{item.state}</StatusBadge>
                    </div>
                    <p className="mt-3 text-sm leading-6 text-[#665d4e]">
                      {item.detail}
                    </p>
                  </div>
                );
              })}
          </div>
        </DashboardCard>
      </div>

      <div className="mt-5 grid gap-5 xl:grid-cols-[0.9fr_1.1fr]">
        <DashboardCard title="Production Pipeline" eyebrow="Idea to verdict">
          <div className="space-y-3">
            {pipelineItems.map((item) => (
              <div
                key={item.title}
                className="grid gap-3 rounded-md border border-[#ded6c8] bg-white/55 p-4 md:grid-cols-[1fr_auto]"
              >
                <div>
                  <p className="font-semibold">{item.title}</p>
                  <p className="mt-1 text-sm text-[#665d4e]">
                    Owner: {item.owner} / Due: {item.due} / Risk: {item.risk}
                  </p>
                </div>
                <StatusBadge tone={stageTone[item.stage]}>{item.stage}</StatusBadge>
              </div>
            ))}
          </div>
        </DashboardCard>

        <DashboardCard title="Hook Lab" eyebrow="Attention before production">
          <div className="space-y-3">
            {hookCandidates.map((candidate) => (
              <div
                key={candidate.hook}
                className="rounded-md border border-[#ded6c8] bg-white/55 p-4"
              >
                <div className="flex flex-col gap-3 lg:flex-row lg:items-start lg:justify-between">
                  <div>
                    <p className="text-lg font-semibold leading-7">
                      {candidate.hook}
                    </p>
                    <p className="mt-2 text-sm leading-6 text-[#665d4e]">
                      {candidate.audience} / {candidate.trigger}
                    </p>
                  </div>
                  <div className="flex h-12 min-w-16 items-center justify-center rounded-md bg-[#171511] px-3 text-lg font-semibold text-[#d6a034]">
                    {candidate.score}
                  </div>
                </div>
                <p className="mt-3 text-sm leading-6 text-[#4f473a]">
                  Proof: {candidate.proof}
                </p>
              </div>
            ))}
          </div>
        </DashboardCard>
      </div>

      <div className="mt-5 grid gap-5 xl:grid-cols-3">
        <DashboardCard title="Asset Burn System" eyebrow="3-day cleanup">
          <div className="space-y-3">
            {cleanupQueue.map((asset) => (
              <div
                key={asset.name}
                className="rounded-md border border-[#ded6c8] bg-white/55 p-3"
              >
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <p className="text-sm font-semibold">{asset.name}</p>
                    <p className="mt-1 text-xs text-[#665d4e]">
                      {asset.type} / {asset.size} / expires {asset.expiresIn}
                    </p>
                  </div>
                  <StatusBadge
                    tone={
                      asset.status === "Keep"
                        ? "good"
                        : asset.status === "Review"
                          ? "warn"
                          : "danger"
                    }
                  >
                    {asset.status}
                  </StatusBadge>
                </div>
              </div>
            ))}
          </div>
        </DashboardCard>

        <DashboardCard title="Content Kill Room" eyebrow="Verdicts">
          <div className="space-y-3">
            {recentPosts.map((post) => (
              <div
                key={post.title}
                className="rounded-md border border-[#ded6c8] bg-white/55 p-3"
              >
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <p className="text-sm font-semibold">{post.title}</p>
                    <p className="mt-1 text-xs text-[#665d4e]">
                      {post.platform} / {post.format} / {post.views}
                    </p>
                  </div>
                  <StatusBadge tone={post.verdict === "Scale" ? "good" : "warn"}>
                    {post.verdict}
                  </StatusBadge>
                </div>
              </div>
            ))}
          </div>
        </DashboardCard>

        <DashboardCard title="Platform Mix" eyebrow="Distribution roles">
          <div className="space-y-3">
            {platformMix.map((item) => (
              <div key={item.platform} className="flex gap-3">
                <div className="mt-1 flex size-8 shrink-0 items-center justify-center rounded-md bg-[#ece5d7] text-[#8b6a22]">
                  <RadioTower size={16} />
                </div>
                <div>
                  <div className="flex flex-wrap items-center gap-2">
                    <p className="text-sm font-semibold">{item.platform}</p>
                    <StatusBadge tone="neutral">{item.cadence}</StatusBadge>
                  </div>
                  <p className="mt-1 text-sm leading-6 text-[#665d4e]">
                    {item.role}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </DashboardCard>
      </div>

      <div className="mt-5 grid gap-5 xl:grid-cols-[1.1fr_0.9fr]">
        <DashboardCard title="Experiment Board" eyebrow="What we are learning">
          <div className="space-y-3">
            {experiments.map((experiment) => (
              <div
                key={experiment.name}
                className="rounded-md border border-[#ded6c8] bg-white/55 p-4"
              >
                <div className="flex flex-col gap-2 lg:flex-row lg:items-start lg:justify-between">
                  <div>
                    <p className="font-semibold">{experiment.name}</p>
                    <p className="mt-2 text-sm leading-6 text-[#665d4e]">
                      {experiment.hypothesis}
                    </p>
                  </div>
                  <StatusBadge
                    tone={experiment.verdict === "Scale" ? "good" : "warn"}
                  >
                    {experiment.verdict}
                  </StatusBadge>
                </div>
                <p className="mt-3 text-sm text-[#4f473a]">
                  Signal: {experiment.signal}
                </p>
              </div>
            ))}
          </div>
        </DashboardCard>

        <DashboardCard title="Next Genius Layer" eyebrow="High ROI automation">
          <div className="space-y-4 text-sm leading-6 text-[#665d4e]">
            <div className="flex gap-3">
              <Sparkles size={18} className="mt-1 shrink-0 text-[#8b6a22]" />
              <p>
                Score hooks by owner pain, novelty, visual proof, and conversion
                proximity before a video enters production.
              </p>
            </div>
            <div className="flex gap-3">
              <Trash2 size={18} className="mt-1 shrink-0 text-[#8b6a22]" />
              <p>
                Auto-expire heavy assets and surface the cleanup queue before
                storage waste becomes invisible.
              </p>
            </div>
            <div className="flex gap-3">
              <FlaskConical size={18} className="mt-1 shrink-0 text-[#8b6a22]" />
              <p>
                Turn every scaled post into a remix queue: new hook, new vertical,
                new proof angle, same winning core.
              </p>
            </div>
          </div>
        </DashboardCard>
      </div>
    </AppShell>
  );
}
