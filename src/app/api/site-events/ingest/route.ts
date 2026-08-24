import { NextRequest, NextResponse } from "next/server";
import { getServerEnv } from "@/lib/env";
import { createSupabaseAdminClient } from "@/lib/supabase/server";

type EventBody = {
  eventName?: unknown;
  path?: unknown;
  url?: unknown;
  referrer?: unknown;
  source?: unknown;
  sessionId?: unknown;
  visitorId?: unknown;
  ipHash?: unknown;
  userAgent?: unknown;
  metadata?: unknown;
};

function clean(value: unknown, max = 500) {
  if (typeof value !== "string") return null;
  const trimmed = value.trim();
  if (!trimmed) return null;
  return trimmed.slice(0, max);
}

export async function POST(req: NextRequest) {
  const expectedSecret = getServerEnv().commandCenterEventsSecret;
  const providedSecret = req.headers.get("x-247roi-events-secret");

  if (!expectedSecret || providedSecret !== expectedSecret) {
    return NextResponse.json({ ok: false, error: "unauthorized" }, { status: 401 });
  }

  let body: EventBody = {};
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ ok: false, error: "invalid_json" }, { status: 400 });
  }

  const eventName = clean(body.eventName, 80);
  if (!eventName) {
    return NextResponse.json({ ok: false, error: "eventName required" }, { status: 400 });
  }

  const metadata =
    body.metadata && typeof body.metadata === "object" && !Array.isArray(body.metadata)
      ? body.metadata
      : {};

  const supabase = createSupabaseAdminClient();
  const { error } = await supabase.from("site_events").insert({
    event_name: eventName,
    path: clean(body.path, 500),
    url: clean(body.url, 1000),
    referrer: clean(body.referrer, 1000),
    source: clean(body.source, 120),
    session_id: clean(body.sessionId, 160),
    visitor_id: clean(body.visitorId, 160),
    ip_hash: clean(body.ipHash, 160),
    user_agent: clean(body.userAgent, 500),
    metadata,
  });

  if (error) {
    console.warn("command-center site_events insert failed:", error.message);
    return NextResponse.json({ ok: false, error: "event_not_recorded" }, { status: 500 });
  }

  return NextResponse.json({ ok: true });
}
