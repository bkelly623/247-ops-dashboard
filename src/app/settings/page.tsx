import { KeyRound, LockKeyhole, RotateCcw, TimerReset } from "lucide-react";
import { AppShell } from "@/components/app-shell";
import { DashboardCard, PageHeader, StatusBadge } from "@/components/dashboard-card";
import { integrationStatus } from "@/data/command-center";

export default function SettingsPage() {
  return (
    <AppShell>
      <PageHeader
        eyebrow="Settings"
        title="Integrations, retention, and secrets stay visible here."
        description="The command center should make operational risk obvious: which integrations are live, which keys are missing, and what will be deleted soon."
        action={<StatusBadge tone="warn">PostFast pending</StatusBadge>}
      />

      <div className="grid gap-5 xl:grid-cols-[1fr_0.9fr]">
        <DashboardCard title="Integration Status" eyebrow="Platform access">
          <div className="grid gap-3">
            {integrationStatus.map((item) => {
              const Icon = item.icon;
              const connected = item.state === "Connected";

              return (
                <div
                  key={item.name}
                  className="rounded-md border border-[#ded6c8] bg-white/55 p-4"
                >
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex gap-3">
                      <div className="flex size-9 shrink-0 items-center justify-center rounded-md bg-[#ece5d7] text-[#8b6a22]">
                        <Icon size={17} />
                      </div>
                      <div>
                        <p className="font-semibold">{item.name}</p>
                        <p className="mt-1 text-sm leading-6 text-[#665d4e]">
                          {item.detail}
                        </p>
                      </div>
                    </div>
                    <StatusBadge tone={connected ? "good" : "warn"}>
                      {item.state}
                    </StatusBadge>
                  </div>
                </div>
              );
            })}
          </div>
        </DashboardCard>

        <DashboardCard title="Secret Handling" eyebrow="Do not leak keys">
          <div className="space-y-4 text-sm leading-6 text-[#665d4e]">
            <div className="flex gap-3">
              <LockKeyhole size={18} className="mt-1 shrink-0 text-[#8b6a22]" />
              <p>
                Supabase secret, PostFast key, Vercel token, Supabase access
                token, and database credentials are server-only.
              </p>
            </div>
            <div className="flex gap-3">
              <KeyRound size={18} className="mt-1 shrink-0 text-[#8b6a22]" />
              <p>
                Local secrets live in ignored env files or private Hermes config.
                Vercel production secrets live in Vercel environment variables.
              </p>
            </div>
            <div className="flex gap-3">
              <RotateCcw size={18} className="mt-1 shrink-0 text-[#8b6a22]" />
              <p>
                Rotate Vercel and Supabase management tokens later because they
                were pasted through chat during setup.
              </p>
            </div>
          </div>
        </DashboardCard>
      </div>

      <div className="mt-5">
        <DashboardCard title="Retention Policy" eyebrow="3-day asset burn">
          <div className="grid gap-4 md:grid-cols-3">
            {[
              {
                label: "Raw and draft files",
                value: "3 days",
                detail: "Generated clips, temp exports, failed edits, and unused assets.",
              },
              {
                label: "Finished productions",
                value: "3 days",
                detail: "Deleted unless explicitly marked keep.",
              },
              {
                label: "Learning records",
                value: "Keep",
                detail: "Hooks, scripts, tags, metrics, published URLs, and verdicts.",
              },
            ].map((policy) => (
              <div
                key={policy.label}
                className="rounded-md border border-[#ded6c8] bg-white/55 p-4"
              >
                <div className="flex items-center justify-between gap-3">
                  <p className="text-sm font-semibold">{policy.label}</p>
                  <TimerReset size={18} className="text-[#8b6a22]" />
                </div>
                <p className="mt-3 text-2xl font-semibold">{policy.value}</p>
                <p className="mt-2 text-sm leading-6 text-[#665d4e]">
                  {policy.detail}
                </p>
              </div>
            ))}
          </div>
        </DashboardCard>
      </div>
    </AppShell>
  );
}
