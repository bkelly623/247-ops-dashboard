import { NextRequest, NextResponse } from "next/server";
import {
  getCommandStateReport,
  saveCommandState,
} from "@/lib/command-state/server";
import { validateOrder } from "@/lib/command-state/validation";
import { getServerEnv } from "@/lib/env";
import { workColumns, type WorkStatus } from "@/data/command-center-state";
export async function GET() {
  const report = await getCommandStateReport();
  return NextResponse.json({ ok: true, ...report });
}
export async function PATCH(req: NextRequest) {
  let body: Record<string, unknown>;
  try {
    const parsed = await req.json();
    if (!parsed || typeof parsed !== "object" || Array.isArray(parsed))
      throw new Error();
    body = parsed;
  } catch {
    return NextResponse.json(
      { ok: false, error: "Invalid request." },
      { status: 400 },
    );
  }
  const expected = getServerEnv().commandCenterWriteToken;
  if (!expected || req.headers.get("x-command-center-write-token") !== expected)
    return NextResponse.json(
      { ok: false, error: "Unlock controls with a valid operator token." },
      { status: 401 },
    );
  const report = await getCommandStateReport();
  if (report.source !== "persistent")
    return NextResponse.json(
      {
        ok: false,
        error:
          "Persistent state unavailable. Changes are disabled to protect saved work.",
      },
      { status: 503 },
    );
  const state = report.state;
  // Reject stale tabs before appending a new snapshot. This is not a database transaction.
  if (body.expectedUpdatedAt !== state.updatedAt)
    return NextResponse.json(
      {
        ok: false,
        error:
          "Operations changed since you opened this view. Reload before saving.",
      },
      { status: 409 },
    );
  try {
    let next;
    if (body.action === "create" || body.action === "update") {
      const item = validateOrder(body.item);
      const existing = state.workItems.find((i) => i.id === item.id);
      if (body.action === "create" && existing)
        throw new Error("Order ID already exists.");
      if (body.action === "update" && !existing)
        throw new Error("Order no longer exists.");
      const saved = {
        ...item,
        completedAt:
          item.status === "Done"
            ? (existing?.completedAt ?? new Date().toISOString())
            : undefined,
      };
      next = {
        ...state,
        workItems:
          body.action === "create"
            ? [...state.workItems, saved]
            : state.workItems.map((i) => (i.id === item.id ? saved : i)),
      };
    } else {
      const existing = state.workItems.find((i) => i.id === body.workItemId);
      if (!existing || !workColumns.includes(body.status as WorkStatus))
        throw new Error("Invalid order or status.");
      if (body.status === "Done" && !existing.completionEvidence)
        throw new Error("Open the order and record completion evidence first.");
      next = {
        ...state,
        workItems: state.workItems.map((i) =>
          i.id === existing.id
            ? {
                ...i,
                status: body.status as WorkStatus,
                completedAt:
                  body.status === "Done" ? new Date().toISOString() : undefined,
              }
            : i,
        ),
      };
    }
    next.updatedAt = new Date().toISOString();
    await saveCommandState(
      next,
      `${String(body.action ?? "status")} order from Operations`,
    );
    return NextResponse.json({ ok: true, state: next });
  } catch (error) {
    return NextResponse.json(
      {
        ok: false,
        error: error instanceof Error ? error.message : "Unable to save order.",
      },
      { status: 400 },
    );
  }
}
