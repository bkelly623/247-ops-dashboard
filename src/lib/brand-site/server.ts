import "server-only";
import { createClient } from "@supabase/supabase-js";
import { getServerEnv } from "@/lib/env";

type CountResult = {
  count: number | null;
  error: { message: string } | null;
};

function daysAgo(days: number) {
  const date = new Date();
  date.setUTCDate(date.getUTCDate() - days);
  return date.toISOString();
}

function getBrandSupabaseClient() {
  const env = getServerEnv();
  const url = env.brandSupabaseUrl ?? env.supabaseUrl;
  const key = env.brandSupabaseSecretKey;

  if (!key) {
    throw new Error("BRAND_SUPABASE_SECRET_KEY is required to read private brand-site metrics.");
  }

  return createClient(url, key, {
    auth: {
      persistSession: false,
      autoRefreshToken: false,
    },
  });
}

async function countQuery(query: PromiseLike<CountResult>) {
  const { count, error } = await query;
  if (error) throw new Error(error.message);
  return count ?? 0;
}

async function optionalCountQuery(query: PromiseLike<CountResult>) {
  const { count, error } = await query;
  if (error) return null;
  return count ?? 0;
}

export async function getBrandSiteOverview() {
  const supabase = getBrandSupabaseClient();
  const since7 = daysAgo(7);
  const since30 = daysAgo(30);

  const [
    totalInfrastructureAudits,
    infrastructureAudits30d,
    hotInfrastructureLeads,
    ctaClicks30d,
    totalOpportunityAudits,
    opportunityAudits30d,
    unlockedOpportunityAudits30d,
    pageViews7d,
    ctaClicks7d,
    phoneClicks7d,
    emailClicks7d,
    hireStarts7d,
    hireUnlocks7d,
  ] = await Promise.all([
    countQuery(
      supabase
        .from("scan_sessions")
        .select("id", { count: "exact", head: true }),
    ),
    countQuery(
      supabase
        .from("scan_sessions")
        .select("id", { count: "exact", head: true })
        .gte("created_at", since30),
    ),
    countQuery(
      supabase
        .from("scan_sessions")
        .select("id", { count: "exact", head: true })
        .in("warm_tier", ["warm_a", "hot", "client"])
        .gte("created_at", since30),
    ),
    countQuery(
      supabase
        .from("scan_sessions")
        .select("id", { count: "exact", head: true })
        .not("cta_clicked_at", "is", null)
        .gte("created_at", since30),
    ),
    countQuery(
      supabase
        .from("hire_sessions")
        .select("id", { count: "exact", head: true }),
    ),
    countQuery(
      supabase
        .from("hire_sessions")
        .select("id", { count: "exact", head: true })
        .gte("created_at", since30),
    ),
    countQuery(
      supabase
        .from("hire_sessions")
        .select("id", { count: "exact", head: true })
        .not("unlocked_at", "is", null)
        .gte("created_at", since30),
    ),
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
        .eq("event_name", "cta_click")
        .gte("created_at", since7),
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
  ]);

  return {
    generatedAt: new Date().toISOString(),
    windows: {
      sevenDaysSince: since7,
      thirtyDaysSince: since30,
    },
    infrastructureBlueprint: {
      total: totalInfrastructureAudits,
      last30Days: infrastructureAudits30d,
      warmOrHotLast30Days: hotInfrastructureLeads,
      ctaClicksLast30Days: ctaClicks30d,
    },
    aiOpportunityAudit: {
      total: totalOpportunityAudits,
      last30Days: opportunityAudits30d,
      unlockedLast30Days: unlockedOpportunityAudits30d,
    },
    siteEvents: {
      tableReady: pageViews7d !== null,
      pageViews7Days: pageViews7d,
      ctaClicks7Days: ctaClicks7d,
      phoneClicks7Days: phoneClicks7d,
      emailClicks7Days: emailClicks7d,
      aiOpportunityAuditStarts7Days: hireStarts7d,
      aiOpportunityAuditUnlocks7Days: hireUnlocks7d,
    },
  };
}
