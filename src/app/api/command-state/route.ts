import { NextRequest, NextResponse } from "next/server";
import { randomUUID, timingSafeEqual } from "node:crypto";
import { CommandConflictError, getCommandStateReport, saveCommandState } from "@/lib/command-state/server";
import { getServerEnv } from "@/lib/env";
import { applyCommandAction } from "@/lib/command-state/actions";
export async function GET() {
  const report = await getCommandStateReport();
  return NextResponse.json({ ok: true, ...report }, { headers: { "Cache-Control": "no-store" } });
}
export async function PATCH(req: NextRequest) {
  const expected = getServerEnv().commandCenterWriteToken;
  const provided = req.headers.get("x-command-center-write-token") ?? "";
  if (!expected || Buffer.byteLength(provided) !== Buffer.byteLength(expected) || !timingSafeEqual(Buffer.from(provided), Buffer.from(expected)))
    return NextResponse.json({ ok: false, error: "Unlock controls with a valid operator token." }, { status: 401 });
  let body: Record<string, unknown>;
  try {
    const text = await req.text();
    if (text.length > 64000) throw new Error();
    const parsed = JSON.parse(text);
    if (!parsed || typeof parsed !== "object" || Array.isArray(parsed)) throw new Error();
    body = parsed;
  } catch {
    return NextResponse.json({ ok: false, error: "Invalid request." }, { status: 400 });
  }
  const report = await getCommandStateReport();
  if (report.source !== "persistent")
    return NextResponse.json({ ok: false, error: "Persistent state unavailable. Changes are disabled to protect saved work." }, { status: 503 });
  const state = report.state;
  if (body.expectedUpdatedAt !== state.updatedAt)
    return NextResponse.json({ ok: false, error: "Operations changed since you opened this view. Reload before saving; copy any unsaved edits first." }, { status: 409 });
  try {
    const at = new Date(Math.max(Date.now(), Date.parse(state.updatedAt) + 1)).toISOString();
    const next = applyCommandAction(state, body, at, randomUUID());
    await saveCommandState(next, `${String(body.action ?? "status")} order from Operations`, state.updatedAt);
    return NextResponse.json({ ok: true, state: next });
  } catch (error) {
    return NextResponse.json({ ok: false, error: error instanceof Error ? error.message : "Unable to save order." }, { status: error instanceof CommandConflictError ? 409 : 400 });
  }
}
