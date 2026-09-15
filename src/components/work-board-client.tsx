"use client";
import { useEffect, useRef, useState } from "react";
import {
  Plus,
  X,
  Search,
  LockKeyhole,
  LayoutList,
  Columns3,
} from "lucide-react";
import {
  workColumns,
  type CommandState,
  type CommandWorkItem,
} from "@/data/command-center-state";
const lanes = [
  "SEO",
  "Authority",
  "Conversion",
  "Measurement",
  "Content",
  "Ops",
  "Prospecting",
  "Engineering",
];
const blank = (): CommandWorkItem => ({
  id: crypto.randomUUID(),
  title: "",
  lane: "Ops",
  status: "Backlog",
  priority: "P2",
  why: "",
  expectedImpact: "",
  proofRequired: "",
  owner: "",
  dueOrCadence: "This week",
  links: [],
  metricToWatch: "",
  completionEvidence: "",
});
const tone = (status: string) =>
  status === "Done"
    ? "green"
    : status === "Waiting / Blocked"
      ? "red"
      : status === "Needs B Approval"
        ? "amber"
        : "";
export function WorkBoardClient({
  initialState,
  initialTask,
  initialView,
  initialOwner,
  initialNew = false,
}: {
  initialState: CommandState;
  initialTask?: string;
  initialView?: string;
  initialOwner?: string;
  initialNew?: boolean;
}) {
  const [state, setState] = useState(initialState),
    [token, setToken] = useState(""),
    [access, setAccess] = useState(false),
    [query, setQuery] = useState(""),
    [lane, setLane] = useState("All fronts"),
    [owner, setOwner] = useState(initialOwner ?? "All owners"),
    [view, setView] = useState(initialView ?? "all"),
    [board, setBoard] = useState(false),
    [item, setItem] = useState<CommandWorkItem | null>(
      () => initialNew ? {...blank(), owner: initialOwner ?? ""} : initialState.workItems.find((i) => i.id === initialTask) ?? null,
    ),
    [creating, setCreating] = useState(initialNew),
    [decisionNote, setDecisionNote] = useState(""),
    [message, setMessage] = useState(""),
    [saving, setSaving] = useState(false);
  const drawer = useRef<HTMLDivElement>(null);
  const recordedItem = item ? state.workItems.find(i => i.id === item.id) : undefined;
  const dirty = !!item && JSON.stringify(item) !== JSON.stringify(recordedItem);
  useEffect(() => {
    if (!item) return;
    const previous = document.activeElement as HTMLElement | null;
    drawer.current?.focus();
    const old = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = old;
      previous?.focus();
    };
  }, [item?.id]); // eslint-disable-line react-hooks/exhaustive-deps
  const visible = state.workItems
    .filter(
      (i) =>
        (lane === "All fronts" || i.lane === lane) &&
        (owner === "All owners" || i.owner.toLowerCase() === owner.toLowerCase() || i.owner.toLowerCase().split(/\s*\+\s*/).includes(owner.toLowerCase())) &&
        (!query ||
          `${i.title} ${i.owner} ${i.why}`
            .toLowerCase()
            .includes(query.toLowerCase())) &&
        (view === "all" ||
          (view === "active" &&
            ["This Week", "In Progress"].includes(i.status)) ||
          (view === "attention" &&
            ["Needs B Approval", "Waiting / Blocked"].includes(i.status)) ||
          (view === "done" && i.status === "Done")),
    )
    .sort((a, b) => a.priority.localeCompare(b.priority));
  const edit = (i: CommandWorkItem) => {
    setItem({ ...i, links: [...i.links] });
    setCreating(false);
    setDecisionNote("");
    setMessage("");
  };
  async function save(action?: "approve" | "request-changes") {
    if (!item) return;
    if (action && JSON.stringify(item) !== JSON.stringify(state.workItems.find(i => i.id === item.id))) {
      setMessage("Save or discard your order edits before deciding on the recorded scope."); return;
    }
    setSaving(true);
    setMessage("");
    try {
      const response = await fetch("/api/command-state", {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          "x-command-center-write-token": token,
        },
        body: JSON.stringify({
          action: action ?? (creating ? "create" : "update"),
          workItemId: item.id,
          note: action ? decisionNote : undefined,
          item,
          expectedUpdatedAt: state.updatedAt,
        }),
      });
      const payload = await response.json();
      if (!response.ok) throw new Error(payload.error ?? "Save failed");
      setState(payload.state);
      setItem(null);
      setMessage(action === "approve" ? "Approval recorded for this scope. Ready for agent handoff; nothing was dispatched." : action === "request-changes" ? "Changes requested. Order returned to backlog." : "Order saved to operations.");
      setDecisionNote("");
    } catch (e) {
      setMessage(
        e instanceof Error
          ? e.message
          : "Connection lost. Your edits are still here; retry saving.",
      );
    } finally {
      setSaving(false);
    }
  }
  function field(key: keyof CommandWorkItem, value: string) {
    setItem((i) => (i ? { ...i, [key]: value } : i));
  }
  return (
    <>
      <p className="source-note">
        Shared orders only. Agent-specific pipelines remain in their own command
        sections; they are not silently merged into this board.
      </p>
      <datalist id="agent-owners">{["Athena", "Hermes", "Flint", "Slim", "Lumen"].map(name => <option key={name} value={name} />)}</datalist>
      <div className="toolbar">
        <Search size={17} className="muted" />
        <input
          aria-label="Search orders"
          className="field"
          placeholder="Find an order, owner, or objective…"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <select
          aria-label="Filter owner"
          className="field"
          value={owner}
          onChange={(e) => setOwner(e.target.value)}
        >
          <option>All owners</option>
          {[...new Set(["Athena", "Hermes", "Flint", "Slim", "Lumen", ...state.workItems.map((i) => i.owner)])].sort().map((o) => (
            <option key={o}>{o}</option>
          ))}
        </select>
        <select
          aria-label="Filter front"
          className="field"
          value={lane}
          onChange={(e) => setLane(e.target.value)}
        >
          <option>All fronts</option>
          {lanes.map((l) => (
            <option key={l}>{l}</option>
          ))}
        </select>
        <button className="button" onClick={() => setAccess(!access)}>
          <LockKeyhole size={14} />
          {token ? "Edit operator token" : "Unlock controls"}
        </button>
        <button
          className="button primary"
          onClick={() => {
            setItem(blank());
            setCreating(true);
            setMessage("");
          }}
        >
          <Plus size={14} />
          New order
        </button>
      </div>
      {access ? (
        <div className="panel panel-body mb-4">
          <label className="text-xs muted">
            Operator token{" "}
            <input
              type="password"
              autoComplete="off"
              className="field ml-3"
              value={token}
              onChange={(e) => setToken(e.target.value)}
            />
          </label>
          <p className="source-note mb-0">
            Token is held only for this page session. Authorization is checked
            when you save.
          </p>
        </div>
      ) : null}
      <div className="flex justify-between gap-3 flex-wrap">
        <div className="view-tabs">
          {[
            ["all", "All orders"],
            ["active", "Active"],
            ["attention", "Needs attention"],
            ["done", "Completed"],
          ].map(([id, label]) => (
            <button
              className={view === id ? "active" : ""}
              key={id}
              onClick={() => setView(id)}
            >
              {label}
            </button>
          ))}
        </div>
        <div className="view-tabs">
          <button
            aria-label="List view"
            className={!board ? "active" : ""}
            onClick={() => setBoard(false)}
          >
            <LayoutList size={17} />
          </button>
          <button
            aria-label="Board view"
            className={board ? "active" : ""}
            onClick={() => setBoard(true)}
          >
            <Columns3 size={17} />
          </button>
        </div>
      </div>
      {!item && message ? (
        <p role="status" className="notice">
          {message}
        </p>
      ) : null}
      {board ? (
        <div className="kanban">
          {workColumns.map((c) => (
            <section className="kanban-column" key={c}>
              <h2>
                {c}
                <span className="muted">
                  {visible.filter((i) => i.status === c).length}
                </span>
              </h2>
              {visible
                .filter((i) => i.status === c)
                .map((i) => (
                  <button
                    key={i.id}
                    className="kanban-item"
                    onClick={() => edit(i)}
                  >
                    <span className="pill">
                      {i.priority} · {i.lane}
                    </span>
                    <strong>{i.title}</strong>
                    <small>{i.owner}</small>
                  </button>
                ))}
            </section>
          ))}
        </div>
      ) : (
        <section className="panel table-wrap">
          <table className="ops-table">
            <thead>
              <tr>
                <th>Order / intended outcome</th>
                <th>Front</th>
                <th>Status</th>
                <th>Owner</th>
                <th>Timing</th>
              </tr>
            </thead>
            <tbody>
              {visible.map((i) => (
                <tr key={i.id}>
                  <td>
                    <button className="task-link" onClick={() => edit(i)}>
                      {i.title}
                    </button>
                    <p className="muted text-xs mt-1 leading-5">
                      {i.priority} · {i.expectedImpact}
                    </p>
                  </td>
                  <td>{i.lane}</td>
                  <td>
                    <span className={`pill ${tone(i.status)}`}>{i.status}</span>
                  </td>
                  <td>{i.owner}</td>
                  <td className="muted">{i.dueOrCadence}</td>
                </tr>
              ))}
            </tbody>
          </table>
          {!visible.length ? (
            <p className="empty">
              No orders match this view. Adjust the filters or create an order.
            </p>
          ) : null}
        </section>
      )}
      <p className="source-note">
        {visible.length} orders shown · Saved{" "}
        {new Date(state.updatedAt).toISOString().slice(0, 16).replace("T", " ")}{" "}
        UTC · Marking an order Done requires completion evidence.
      </p>
      <section className="panel mb-5" aria-label="Command activity">
        <div className="panel-head"><h2>Command activity</h2><span className="pill">Recorded actions</span></div>
        {(state.commandLog ?? []).length ? [...state.commandLog!].reverse().slice(0, 12).map(event => (
          <button type="button" className="order-row w-full text-left" key={event.id} onClick={() => { const target = state.workItems.find(i => i.id === event.orderId); if (target) edit(target); }}>
            <div className="order-main"><h3>{event.title}</h3><p>{event.action === "approve" ? "Approved" : event.action === "request-changes" ? "Changes requested" : event.action === "create" ? "Order created" : "Order updated"} · {event.from ? `${event.from} → ` : ""}{event.to}</p><p>{event.note}</p><small className="muted">{event.at.slice(0,16).replace("T", " ")} UTC · {event.actor}</small></div>
          </button>
        )) : <p className="empty">New order changes and approval decisions will appear here. Older work is in the historical ledger below.</p>}
        <p className="source-note px-5">Shared credential attribution, not verified personal identity. Latest 12 actions shown; retained in operational snapshots.</p>
      </section>
      {item ? (
        <div
          className="drawer-backdrop"
          onClick={(e) => {
            if (e.target === e.currentTarget && !saving) setItem(null);
          }}
        >
          <div
            ref={drawer}
            className="drawer"
            role="dialog"
            aria-modal="true"
            aria-labelledby="order-heading"
            tabIndex={-1}
            onKeyDown={(e) => {
              if (e.key === "Escape" && !saving) setItem(null);
              if (e.key === "Tab") {
                const elements = drawer.current?.querySelectorAll<HTMLElement>(
                  "button:not(:disabled), input, select, textarea, a[href]",
                );
                if (!elements?.length) return;
                const first = elements[0],
                  last = elements[elements.length - 1];
                if (
                  e.shiftKey &&
                  (document.activeElement === first ||
                    document.activeElement === drawer.current)
                ) {
                  e.preventDefault();
                  last.focus();
                } else if (!e.shiftKey && document.activeElement === last) {
                  e.preventDefault();
                  first.focus();
                }
              }
            }}
          >
            <div className="flex justify-between items-center">
              <div>
                <p className="eyebrow">Operational order</p>
                <h2 id="order-heading">
                  {creating ? "Create an order" : "Review & direct"}
                </h2>
              </div>
              <button
                className="button"
                disabled={saving}
                aria-label="Close order"
                onClick={() => setItem(null)}
              >
                <X size={18} />
              </button>
            </div>
            {!creating ? (
              <section className="order-brief">
                <span className={`pill ${tone(item.status)}`}>{item.status}</span>
                <h3 className="text-xl font-semibold mt-3">{item.title}</h3>
                <p className="muted text-sm leading-6 mt-2">{item.why}</p>
                <p className="eyebrow mt-4">Success criteria</p>
                <p className="text-sm leading-6 mt-2">{item.proofRequired}</p>
                <p className="source-note">{item.owner} · {item.priority} · {item.dueOrCadence}</p>
                {item.completionEvidence ? <div className="notice"><strong>Reported evidence</strong><p>{item.completionEvidence}</p><small>Not independently verified by the console.</small></div> : null}
                {item.approval && !dirty ? <div className="notice"><strong>{item.approval.verdict === "approved" ? "Scope approved" : "Changes requested"}</strong><p>{item.approval.note}</p><small>{item.approval.at.slice(0, 16).replace("T", " ")} UTC · Operator credential</small></div> : null}
                {dirty ? <p className="notice">Unsaved changes. Save this specification before making a decision or copying an agent handoff.</p> : null}
                <button type="button" className="button" disabled={dirty} onClick={async () => {
                  if (dirty) return;
                  try {
                    await navigator.clipboard.writeText(`Operational handoff — ${item.title}\nOrder: ${item.id}\nOwner: ${item.owner}\nPriority: ${item.priority}\nStatus: ${item.status}\nObjective: ${item.expectedImpact}\nWhy: ${item.why}\nAcceptance: ${item.proofRequired}\nTiming: ${item.dueOrCadence}\nReferences: ${item.links.join(", ")}\nApproval: ${item.approval?.verdict ?? "not recorded"}\nApproval note: ${item.approval?.note ?? "none"}\nRead the current order before acting. Acknowledge ownership, report blockers, and return concrete verification. Do not interpret this handoff as approval for public, destructive, or paid actions.`);
                    setMessage("Handoff copied. Paste into the assigned agent’s chat; no agent was started.");
                  } catch { setMessage("Clipboard unavailable. Copy the order details manually."); }
                }}>Copy agent handoff</button>
                {item.status === "Needs B Approval" ? <div className="notice">
                  <strong>Decision required</strong>
                  <p className="text-xs mt-2">Approve the recorded scope or return it for revision. Approval is logged, not an execution trigger.</p>
                  <label>Decision reason / constraints<textarea className="field" maxLength={2000} value={decisionNote} onChange={e => setDecisionNote(e.target.value)} /></label>
                  <label>Operator token<input className="field" type="password" autoComplete="off" value={token} onChange={e => setToken(e.target.value)} /></label>
                  <div className="flex flex-wrap gap-2">
                    <button className="button primary" type="button" disabled={saving || !token || !decisionNote.trim()} onClick={() => save("approve")}>Approve order</button>
                    <button className="button" type="button" disabled={saving || !token || !decisionNote.trim()} onClick={() => save("request-changes")}>Request changes</button>
                  </div>
                </div> : null}
                {message ? <p role="status" className="notice">{message}</p> : null}
              </section>
            ) : null}
            <details open={creating} className="order-edit">
            <summary className="button mt-4">{creating ? "Order specification" : "Edit order specification"}</summary>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                save();
              }}
            >
              <label>
                Order title
                <input
                  required
                  maxLength={200}
                  className="field"
                  value={item.title}
                  onChange={(e) => field("title", e.target.value)}
                />
              </label>
              <div className="form-pair">
                <label>
                  Status
                  <select
                    className="field"
                    value={item.status}
                    onChange={(e) => field("status", e.target.value)}
                  >
                    {workColumns.map((c) => (
                      <option key={c}>{c}</option>
                    ))}
                  </select>
                </label>
                <label>
                  Priority
                  <select
                    className="field"
                    value={item.priority}
                    onChange={(e) => field("priority", e.target.value)}
                  >
                    {["P0", "P1", "P2", "P3"].map((p) => (
                      <option key={p}>{p}</option>
                    ))}
                  </select>
                </label>
              </div>
              <div className="form-pair">
                <label>
                  Front
                  <select
                    className="field"
                    value={item.lane}
                    onChange={(e) => field("lane", e.target.value)}
                  >
                    {lanes.map((l) => (
                      <option key={l}>{l}</option>
                    ))}
                  </select>
                </label>
                <label>
                  Owner
                  <input
                    list="agent-owners"
                    required
                    className="field"
                    value={item.owner}
                    onChange={(e) => field("owner", e.target.value)}
                  />
                </label>
              </div>
              {(
                [
                  ["why", "Why this matters"],
                  ["expectedImpact", "Expected outcome"],
                  ["proofRequired", "Acceptance criteria"],
                  ["metricToWatch", "Metric to watch"],
                  ["dueOrCadence", "Due date / cadence"],
                ] as const
              ).map(([key, label]) => (
                <label key={key}>
                  {label}
                  <textarea
                    required
                    className="field"
                    value={item[key]}
                    onChange={(e) => field(key, e.target.value)}
                  />
                </label>
              ))}
              <label>
                References · one per line
                <textarea
                  className="field"
                  value={item.links.join("\n")}
                  onChange={(e) =>
                    setItem({ ...item, links: e.target.value.split("\n") })
                  }
                />
              </label>
              <div className="flex gap-2 flex-wrap">
                {item.links
                  .filter(
                    (l) =>
                      /^https?:\/\//.test(l) ||
                      (l.startsWith("/") && !l.startsWith("//")),
                  )
                  .map((l, n) => (
                    <a
                      key={`${l}-${n}`}
                      className="button"
                      href={l}
                      target="_blank"
                      rel="noreferrer"
                    >
                      Open reference {n + 1} ↗
                    </a>
                  ))}
              </div>
              <label>
                Completion evidence · required for Done
                <textarea
                  className="field"
                  required={item.status === "Done"}
                  placeholder="What shipped, verification performed, and evidence reference"
                  value={item.completionEvidence ?? ""}
                  onChange={(e) => field("completionEvidence", e.target.value)}
                />
              </label>
              {(
                <label>
                  Unlock to save
                  <input
                    className="field"
                    type="password"
                    autoComplete="off"
                    placeholder="Operator token"
                    value={token}
                    onChange={(e) => setToken(e.target.value)}
                  />
                </label>
              )}
              {message ? (
                <p className="notice" role="alert">
                  {message}
                </p>
              ) : null}
              <p className="source-note">
                Changing status records a decision. It does not execute an
                automation or publish external work.
              </p>
              <button
                className="button primary"
                disabled={saving || !token}
                type="submit"
              >
                {saving ? "Saving…" : "Save order"}
              </button>
            </form>
            </details>
          </div>
        </div>
      ) : null}
    </>
  );
}
