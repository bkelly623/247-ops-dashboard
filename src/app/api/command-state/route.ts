import { NextRequest, NextResponse } from "next/server";
import { workColumns, type WorkStatus } from "@/data/command-center-state";
import { getCommandState, updateWorkItemStatus } from "@/lib/command-state/server";
import { getServerEnv } from "@/lib/env";

type PatchBody = {
  workItemId?: unknown;
  status?: unknown;
  reason?: unknown;
  token?: unknown;
};

function clean(value: unknown, max = 500) {
  if (typeof value !== "string") return "";
  return value.trim().slice(0, max);
}

function isWorkStatus(value: unknown): value is WorkStatus {
  return typeof value === "string" && (workColumns as string[]).includes(value);
}

function hasWriteAccess(req: NextRequest, body: PatchBody) {
  const expected = getServerEnv().commandCenterWriteToken;
  if (!expected) return false;

  const headerToken = req.headers.get("x-command-center-write-token");
  const bodyToken = clean(body.token, 300);
  return headerToken === expected || bodyToken === expected;
}

export async function GET() {
  const state = await getCommandState();
  return NextResponse.json({ ok: true, state });
}

export async function PATCH(req: NextRequest) {
  let body: PatchBody = {};
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ ok: false, error: "invalid_json" }, { status: 400 });
  }

  if (!hasWriteAccess(req, body)) {
    return NextResponse.json({ ok: false, error: "write_token_required" }, { status: 401 });
  }

  const workItemId = clean(body.workItemId, 120);
  if (!workItemId) {
    return NextResponse.json({ ok: false, error: "workItemId_required" }, { status: 400 });
  }

  if (!isWorkStatus(body.status)) {
    return NextResponse.json({ ok: false, error: "invalid_status" }, { status: 400 });
  }

  try {
    const state = await updateWorkItemStatus(
      workItemId,
      body.status,
      clean(body.reason, 500),
    );
    return NextResponse.json({ ok: true, state });
  } catch (error) {
    return NextResponse.json(
      {
        ok: false,
        error: error instanceof Error ? error.message : "state_update_failed",
      },
      { status: 500 },
    );
  }
}
