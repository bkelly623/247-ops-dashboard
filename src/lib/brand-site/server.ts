import "server-only";
import { createSupabaseAdminClient } from "@/lib/supabase/server";

type SiteEventRow = {
  created_at: string;
  event_name: string;
  visitor_id: string | null;
  metadata: unknown;
};

function daysAgo(days: number) {
  const date = new Date();
  date.setUTCDate(date.getUTCDate() - days);
  return date.toISOString();
}

function isExcludedFromMetrics(row: SiteEventRow) {
  const metadata = row.metadata;
  if (!metadata || typeof metadata !== "object" || Array.isArray(metadata)) return false;

  const trafficClass = (metadata as Record<string, unknown>).trafficClass;
  if (!trafficClass || typeof trafficClass !== "object" || Array.isArray(trafficClass)) {
    return false;
  }

  return (trafficClass as Record<string, unknown>).excludedFromMetrics === true;
}

function countEvents(rows: SiteEventRow[], eventName: string, since: string) {
  return rows.filter(
    (row) =>
      row.event_name === eventName &&
      row.created_at >= since &&
      !isExcludedFromMetrics(row),
  ).length;
}

function uniqueVisitors(rows: SiteEventRow[], since: string) {
  return new Set(
    rows
      .filter((row) => row.created_at >= since && row.visitor_id && !isExcludedFromMetrics(row))
      .map((row) => row.visitor_id),
  ).size;
}

export async function getBrandSiteOverview() {
  const supabase = createSupabaseAdminClient();
  const since7 = daysAgo(7);
  const since30 = daysAgo(30);

  const { data, error } = await supabase
    .from("site_events")
    .select("created_at,event_name,visitor_id,metadata")
    .gte("created_at", since30)
    .order("created_at", { ascending: false })
    .limit(5000);

  const rows = (data ?? []) as SiteEventRow[];
  const siteEventsAvailable = !error;

  const pageViews7d = siteEventsAvailable ? countEvents(rows, "page_view", since7) : null;
  const pageViews30d = siteEventsAvailable ? countEvents(rows, "page_view", since30) : null;
  const ctaClicks7d = siteEventsAvailable ? countEvents(rows, "cta_click", since7) : null;
  const ctaClicks30d = siteEventsAvailable ? countEvents(rows, "cta_click", since30) : null;
  const phoneClicks7d = siteEventsAvailable ? countEvents(rows, "phone_click", since7) : null;
  const emailClicks7d = siteEventsAvailable ? countEvents(rows, "email_click", since7) : null;
  const hireStarts7d = siteEventsAvailable ? countEvents(rows, "hire_session_started", since7) : null;
  const hireStarts30d = siteEventsAvailable ? countEvents(rows, "hire_session_started", since30) : null;
  const hireUnlocks7d = siteEventsAvailable ? countEvents(rows, "hire_report_unlocked", since7) : null;
  const hireUnlocks30d = siteEventsAvailable ? countEvents(rows, "hire_report_unlocked", since30) : null;
  const uniqueVisitors30d = siteEventsAvailable ? uniqueVisitors(rows, since30) : null;
  const rawPageViews30d = siteEventsAvailable
    ? rows.filter((row) => row.event_name === "page_view" && row.created_at >= since30).length
    : null;
  const excludedEvents30d = siteEventsAvailable
    ? rows.filter((row) => row.created_at >= since30 && isExcludedFromMetrics(row)).length
    : null;

  return {
    generatedAt: new Date().toISOString(),
    windows: {
      sevenDaysSince: since7,
      thirtyDaysSince: since30,
    },
    infrastructureBlueprint: {
      total: null,
      last30Days: null,
      warmOrHotLast30Days: null,
      ctaClicksLast30Days: null,
      source: "legacy_audit_project_not_connected",
    },
    aiOpportunityAudit: {
      total: null,
      last30Days: hireStarts30d,
      unlockedLast30Days: hireUnlocks30d,
      source: "command_center_site_events",
    },
    siteEvents: {
      tableReady: siteEventsAvailable,
      feedStatus: siteEventsAvailable ? "ready" : "unavailable",
      pageViews7Days: pageViews7d,
      pageViews30Days: pageViews30d,
      ctaClicks7Days: ctaClicks7d,
      ctaClicks30Days: ctaClicks30d,
      phoneClicks7Days: phoneClicks7d,
      emailClicks7Days: emailClicks7d,
      aiOpportunityAuditStarts7Days: hireStarts7d,
      aiOpportunityAuditStarts30Days: hireStarts30d,
      aiOpportunityAuditUnlocks7Days: hireUnlocks7d,
      aiOpportunityAuditUnlocks30Days: hireUnlocks30d,
      uniqueVisitorEvents30Days: uniqueVisitors30d,
      rawPageViews30Days: rawPageViews30d,
      excludedEvents30Days: excludedEvents30d,
    },
  };
}
