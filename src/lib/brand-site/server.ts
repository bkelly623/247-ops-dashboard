import "server-only";
import { createSupabaseAdminClient } from "@/lib/supabase/server";

type CountResult = {
  count: number | null;
  error: { message: string } | null;
};

type VisitorIdResult = {
  data: { visitor_id: string | null }[] | null;
  error: { message: string } | null;
};

function daysAgo(days: number) {
  const date = new Date();
  date.setUTCDate(date.getUTCDate() - days);
  return date.toISOString();
}

async function optionalCountQuery(query: PromiseLike<CountResult>) {
  const { count, error } = await query;
  if (error) return null;
  return count ?? 0;
}

async function optionalUniqueVisitorCount(query: PromiseLike<VisitorIdResult>) {
  const { data, error } = await query;
  if (error) return null;

  return new Set((data ?? []).map((row) => row.visitor_id).filter(Boolean)).size;
}

export async function getBrandSiteOverview() {
  const supabase = createSupabaseAdminClient();
  const since7 = daysAgo(7);
  const since30 = daysAgo(30);

  const [
    pageViews7d,
    pageViews30d,
    ctaClicks7d,
    ctaClicks30d,
    phoneClicks7d,
    emailClicks7d,
    hireStarts7d,
    hireUnlocks7d,
    uniqueVisitors30d,
  ] = await Promise.all([
    optionalCountQuery(
      supabase
        .from("site_events")
        .select("id", { count: "exact", head: true })
        .eq("event_name", "page_view")
        .gte("created_at", since7),
    ),
    optionalCountQuery(
      supabase
        .from("site_events")
        .select("id", { count: "exact", head: true })
        .eq("event_name", "page_view")
        .gte("created_at", since30),
    ),
    optionalCountQuery(
      supabase
        .from("site_events")
        .select("id", { count: "exact", head: true })
        .eq("event_name", "cta_click")
        .gte("created_at", since7),
    ),
    optionalCountQuery(
      supabase
        .from("site_events")
        .select("id", { count: "exact", head: true })
        .eq("event_name", "cta_click")
        .gte("created_at", since30),
    ),
    optionalCountQuery(
      supabase
        .from("site_events")
        .select("id", { count: "exact", head: true })
        .eq("event_name", "phone_click")
        .gte("created_at", since7),
    ),
    optionalCountQuery(
      supabase
        .from("site_events")
        .select("id", { count: "exact", head: true })
        .eq("event_name", "email_click")
        .gte("created_at", since7),
    ),
    optionalCountQuery(
      supabase
        .from("site_events")
        .select("id", { count: "exact", head: true })
        .eq("event_name", "hire_session_started")
        .gte("created_at", since7),
    ),
    optionalCountQuery(
      supabase
        .from("site_events")
        .select("id", { count: "exact", head: true })
        .eq("event_name", "hire_report_unlocked")
        .gte("created_at", since7),
    ),
    optionalUniqueVisitorCount(
      supabase
        .from("site_events")
        .select("visitor_id")
        .not("visitor_id", "is", null)
        .gte("created_at", since30),
    ),
  ]);

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
      last30Days: hireStarts7d,
      unlockedLast30Days: hireUnlocks7d,
      source: "command_center_site_events",
    },
    siteEvents: {
      tableReady: pageViews7d !== null,
      pageViews7Days: pageViews7d,
      pageViews30Days: pageViews30d,
      ctaClicks7Days: ctaClicks7d,
      ctaClicks30Days: ctaClicks30d,
      phoneClicks7Days: phoneClicks7d,
      emailClicks7Days: emailClicks7d,
      aiOpportunityAuditStarts7Days: hireStarts7d,
      aiOpportunityAuditUnlocks7Days: hireUnlocks7d,
      uniqueVisitorEvents30Days: uniqueVisitors30d,
    },
  };
}
