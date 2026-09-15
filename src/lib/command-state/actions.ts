import type { CommandState, CommandWorkItem, WorkStatus } from "@/data/command-center-state";
import { validateOrder } from "./validation";

/** Canonical approved scope. Status/evidence can change without changing the order. */
export function orderScope(item: CommandWorkItem): string {
  return JSON.stringify([item.title, item.owner, item.lane, item.priority, item.why,
    item.expectedImpact, item.proofRequired, item.dueOrCadence, item.links, item.metricToWatch]);
}

/** Pure state transition. Authentication, optimistic locking and persistence live in route/server. */
export function applyCommandAction(state: CommandState, body: Record<string, unknown>, at: string, eventId: string): CommandState {
  const action = body.action ?? "status";
  if (!["create", "update", "status", "approve", "request-changes"].includes(String(action)))
    throw new Error("Unknown command action.");
  const note = typeof body.note === "string" ? body.note.trim() : "";
  if (note.length > 2000) throw new Error("Decision note must be under 2000 characters.");
  let saved: CommandWorkItem;
  let existing: CommandWorkItem | undefined;
  if (action === "create" || action === "update") {
    const item = validateOrder(body.item);
    existing = state.workItems.find(i => i.id === item.id);
    if (action === "create" && existing) throw new Error("Order ID already exists.");
    if (action === "update" && !existing) throw new Error("Order no longer exists.");
    if (existing?.status === "Needs B Approval" && item.status !== "Needs B Approval")
      throw new Error("Use Approve order or Request changes to resolve this approval.");
    const scopeChanged = !!existing?.approval && orderScope(existing) !== orderScope(item);
    const needsReview = !!existing?.approval && (scopeChanged || item.status === "Needs B Approval");
    saved = {
      ...item,
      status: needsReview ? "Needs B Approval" : item.status,
      approval: needsReview ? undefined : existing?.approval,
      completedAt: !needsReview && item.status === "Done" ? (existing?.completedAt ?? at) : undefined,
    };
  } else {
    existing = state.workItems.find(i => i.id === body.workItemId);
    if (!existing) throw new Error("Order no longer exists.");
    if (action === "approve" || action === "request-changes") {
      if (existing.status !== "Needs B Approval") throw new Error("This order is not awaiting approval.");
      if (!note) throw new Error("Record a reason or constraints for this decision.");
      saved = { ...existing,
        status: action === "approve" ? "This Week" : "Backlog",
        approval: { verdict: action === "approve" ? "approved" : "changes-requested", note, at, scope: orderScope(existing) },
        completedAt: undefined,
      };
    } else {
      if (existing.status === "Needs B Approval") throw new Error("Resolve the approval explicitly before changing status.");
      saved = validateOrder({ ...existing, status: body.status as WorkStatus });
      saved.approval = body.status === "Needs B Approval" ? undefined : existing.approval;
      saved.completedAt = body.status === "Done" ? (existing.completedAt ?? at) : undefined;
    }
  }
  // A returned order cannot skip a fresh review via a status dropdown.
  if (saved.approval?.verdict === "changes-requested" && !["Backlog", "Needs B Approval"].includes(saved.status))
    throw new Error("Changes were requested. Return the revised order for approval before advancing.");
  if (saved.status === "Done" && !saved.completionEvidence?.trim())
    throw new Error("Record completion evidence before marking an order Done.");
  const log = {
    id: eventId, at, orderId: saved.id, title: saved.title, action: String(action),
    actor: "Operator credential" as const, from: existing?.status, to: saved.status,
    note: note || (saved.status === "Needs B Approval" && existing?.approval
      ? "Scope changed; approval must be renewed." : action === "create" ? "Order recorded. Agent dispatch is not connected." : "Order updated."),
  };
  return { ...state, updatedAt: at,
    workItems: action === "create" ? [...state.workItems, saved] : state.workItems.map(i => i.id === saved.id ? saved : i),
    // Historical full snapshots remain append-only; cap the hot operational read model.
    commandLog: [...(state.commandLog ?? []), log].slice(-200),
  };
}
