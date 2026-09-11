"use client";

import { useMemo, useState } from "react";
import { ArrowUpRight, Loader2 } from "lucide-react";
import { DashboardCard, StatusBadge } from "@/components/dashboard-card";
import {
  workColumns,
  type CommandState,
  type CommandWorkItem,
  type WorkPriority,
  type WorkStatus,
} from "@/data/command-center-state";

function priorityTone(priority: WorkPriority) {
  if (priority === "P0") return "danger";
  if (priority === "P1") return "gold";
  if (priority === "P2") return "warn";
  return "neutral";
}

function statusTone(status: WorkStatus | string) {
  if (status === "Done" || status === "verified") return "good";
  if (status === "This Week" || status === "In Progress" || status === "pending" || status === "needs-data") return "warn";
  if (status === "Needs B Approval" || status === "Waiting / Blocked" || status === "blocked") return "danger";
  return "neutral";
}

function WorkCard({
  item,
  writeToken,
  onStatusChange,
}: {
  item: CommandWorkItem;
  writeToken: string;
  onStatusChange: (workItemId: string, status: WorkStatus) => Promise<void>;
}) {
  const [pendingStatus, setPendingStatus] = useState<WorkStatus | null>(null);

  async function updateStatus(status: WorkStatus) {
    setPendingStatus(status);
    try {
      await onStatusChange(item.id, status);
    } finally {
      setPendingStatus(null);
    }
  }

  return (
    <article className="rounded-md border border-white/10 bg-white/5 p-4">
      <div className="flex flex-wrap items-center gap-2">
        <StatusBadge tone={priorityTone(item.priority)}>{item.priority}</StatusBadge>
        <StatusBadge tone={statusTone(item.status)}>{item.status}</StatusBadge>
        <StatusBadge tone="neutral">{item.lane}</StatusBadge>
      </div>
      <h2 className="mt-3 text-base font-semibold leading-6 text-white">{item.title}</h2>
      <div className="mt-3 space-y-2 text-sm leading-6 text-[#c9c9c9]">
        <p>
          <span className="font-semibold text-white">Why: </span>
          {item.why}
        </p>
        <p>
          <span className="font-semibold text-white">Expected impact: </span>
          {item.expectedImpact}
        </p>
        <p>
          <span className="font-semibold text-white">Proof required: </span>
          {item.proofRequired}
        </p>
        <p>
          <span className="font-semibold text-white">Owner: </span>
          {item.owner}
        </p>
        <p>
          <span className="font-semibold text-white">Due/cadence: </span>
          {item.dueOrCadence}
        </p>
      </div>
      <div className="mt-3 flex flex-wrap gap-2">
        {item.links.map((link) => (
          <span key={link} className="inline-flex items-center gap-1 rounded bg-white/10 px-2 py-1 text-xs font-semibold text-[#d6d6d6]">
            {link.startsWith("/") ? <ArrowUpRight size={13} /> : null}
            {link}
          </span>
        ))}
      </div>
      <p className="mt-3 text-xs font-semibold uppercase tracking-[0.14em] text-[#ff8a3d]">
        Watch: {item.metricToWatch}
      </p>
      <div className="mt-4">
        <label className="text-xs font-semibold uppercase tracking-[0.14em] text-[#8f8f8f]" htmlFor={`status-${item.id}`}>
          Move item
        </label>
        <div className="mt-2 flex items-center gap-2">
          <select
            id={`status-${item.id}`}
            value={item.status}
            disabled={!writeToken || Boolean(pendingStatus)}
            onChange={(event) => updateStatus(event.target.value as WorkStatus)}
            className="min-w-0 flex-1 rounded-md border border-white/10 bg-black px-3 py-2 text-sm text-white disabled:cursor-not-allowed disabled:opacity-50"
          >
            {workColumns.map((status) => (
              <option key={status} value={status}>
                {status}
              </option>
            ))}
          </select>
          {pendingStatus ? <Loader2 className="animate-spin text-[#ff8a3d]" size={18} /> : null}
        </div>
      </div>
    </article>
  );
}

export function WorkBoardClient({ initialState }: { initialState: CommandState }) {
  const [state, setState] = useState(initialState);
  const [writeToken, setWriteToken] = useState(() =>
    typeof window === "undefined"
      ? ""
      : window.localStorage.getItem("command-center-write-token") ?? "",
  );
  const [message, setMessage] = useState("Enter write token to update board status.");

  const counts = useMemo(() => {
    return {
      boardItems: state.workItems.length,
      inMotion: state.workItems.filter((item) => item.status === "This Week" || item.status === "In Progress").length,
      approvals: state.workItems.filter((item) => item.status === "Needs B Approval").length,
      blocked: state.workItems.filter((item) => item.status === "Waiting / Blocked").length,
    };
  }, [state.workItems]);

  function itemsFor(status: WorkStatus) {
    return state.workItems.filter((item) => item.status === status);
  }

  async function updateStatus(workItemId: string, status: WorkStatus) {
    setMessage("Saving board update...");
    const response = await fetch("/api/command-state", {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        "x-command-center-write-token": writeToken,
      },
      body: JSON.stringify({
        workItemId,
        status,
        reason: `Moved ${workItemId} to ${status} from the Work Board UI.`,
      }),
    });

    const payload = (await response.json()) as { ok: boolean; state?: CommandState; error?: string };
    if (!response.ok || !payload.ok || !payload.state) {
      setMessage(payload.error ?? "Board update failed.");
      return;
    }

    setState(payload.state);
    setMessage(`Saved. State updated ${new Date(payload.state.updatedAt).toLocaleString()}.`);
  }

  function saveToken(value: string) {
    setWriteToken(value);
    window.localStorage.setItem("command-center-write-token", value);
  }

  return (
    <>
      <div className="mb-5 grid gap-4 md:grid-cols-4">
        {[
          { label: "Board items", value: counts.boardItems, note: "Persistent command-state tasks." },
          { label: "In motion", value: counts.inMotion, note: "This Week or In Progress." },
          { label: "Needs approval", value: counts.approvals, note: "External-facing work cannot proceed alone." },
          { label: "Waiting/blocked", value: counts.blocked, note: "Paused for data, crawl delay, or proof." },
        ].map((metric) => (
          <DashboardCard key={metric.label} title={metric.label}>
            <p className="text-4xl font-semibold text-white">{metric.value}</p>
            <p className="mt-3 text-sm leading-6 text-[#c9c9c9]">{metric.note}</p>
          </DashboardCard>
        ))}
      </div>

      <DashboardCard title="Board Controls" eyebrow="Protected writes" className="mb-5">
        <div className="grid gap-3 lg:grid-cols-[0.8fr_1.2fr]">
          <label className="block">
            <span className="text-xs font-semibold uppercase tracking-[0.14em] text-[#ff8a3d]">Write token</span>
            <input
              value={writeToken}
              onChange={(event) => saveToken(event.target.value)}
              type="password"
              placeholder="Paste token to enable status updates"
              className="mt-2 w-full rounded-md border border-white/10 bg-black px-3 py-2 text-sm text-white outline-none focus:border-[#ff8a3d]"
            />
          </label>
          <div className="rounded-md border border-white/10 bg-white/5 p-3 text-sm leading-6 text-[#c9c9c9]">
            {message}
          </div>
        </div>
      </DashboardCard>

      <DashboardCard title="Board" eyebrow="Cron and operator source of truth" className="mb-5">
        <div className="grid gap-4 xl:grid-cols-3 2xl:grid-cols-6">
          {workColumns.map((column) => (
            <section key={column} className="min-h-40 rounded-md border border-white/10 bg-black/35 p-3">
              <div className="mb-3 flex items-center justify-between gap-2">
                <h2 className="text-sm font-semibold text-white">{column}</h2>
                <StatusBadge tone={statusTone(column)}>{itemsFor(column).length}</StatusBadge>
              </div>
              <div className="space-y-3">
                {itemsFor(column).map((item) => (
                  <WorkCard
                    key={item.id}
                    item={item}
                    writeToken={writeToken}
                    onStatusChange={updateStatus}
                  />
                ))}
                {itemsFor(column).length === 0 ? (
                  <p className="rounded-md border border-dashed border-white/10 p-3 text-sm leading-6 text-[#8f8f8f]">
                    Empty by design. Add work here only when it has a clear proof requirement.
                  </p>
                ) : null}
              </div>
            </section>
          ))}
        </div>
      </DashboardCard>
    </>
  );
}
