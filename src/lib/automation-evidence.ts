import "server-only";
import { createSupabaseAdminClient } from "@/lib/supabase/server";
export type AutomationEvidence = {
  observedAt: string;
  scope: string;
  source: string;
  jobs: Array<{
    id: string;
    name: string;
    owner: string;
    enabled: boolean;
    schedule: string;
    nextRunAt: string | null;
    lastStatus: string;
    runs: Array<{
      at: string;
      status: string;
      durationMs: number;
      summary: string;
    }>;
  }>;
};
export async function getAutomationEvidence(): Promise<AutomationEvidence | null> {
  try {
    const { data, error } = await createSupabaseAdminClient()
      .from("site_events")
      .select("metadata")
      .eq("event_name", "automation_evidence_snapshot")
      .eq("source", "command_center")
      .order("created_at", { ascending: false })
      .limit(1);
    if (error) return null;
    const value = data?.[0]?.metadata?.evidence;
    if (
      !value ||
      typeof value.observedAt !== "string" ||
      !Array.isArray(value.jobs)
    )
      return null;
    return value as AutomationEvidence;
  } catch {
    return null;
  }
}
