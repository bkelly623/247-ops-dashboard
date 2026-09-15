import "server-only";
import { createHash } from "node:crypto";
import {
  commandStateSeed,
  type CommandState,
} from "@/data/command-center-state";
import { createSupabaseAdminClient } from "@/lib/supabase/server";

type CommandStateEventRow = {
  created_at: string;
  metadata: unknown;
};

function isRecord(value: unknown): value is Record<string, unknown> {
  return Boolean(value && typeof value === "object" && !Array.isArray(value));
}

function stateFromMetadata(metadata: unknown): CommandState | null {
  if (!isRecord(metadata)) return null;
  const state = metadata.state;
  if (!isRecord(state)) return null;
  if (!Array.isArray(state.workItems)) return null;
  if (!isRecord(state.ownerSnapshot)) return null;
  if (!Array.isArray(state.automation)) return null;
  if (!Array.isArray(state.decisions)) return null;
  if (!isRecord(state.pipelines)) return null;
  return state as unknown as CommandState;
}

export async function getCommandStateReport(): Promise<{
  state: CommandState;
  source: "persistent" | "seed";
  warning: string | null;
}> {
  try {
    const supabase = createSupabaseAdminClient();
    const { data, error } = await supabase
      .from("site_events")
      .select("created_at,metadata")
      .eq("event_name", "command_state_snapshot")
      .eq("source", "command_center")
      .order("created_at", { ascending: false })
      .limit(1);
    if (error) throw new Error("State store unavailable");
    const state = stateFromMetadata(
      ((data ?? []) as CommandStateEventRow[])[0]?.metadata,
    );
    if (state) return { state, source: "persistent", warning: null };
    return {
      state: commandStateSeed,
      source: "seed",
      warning: "Showing baseline plan. No saved operational snapshot found.",
    };
  } catch {
    return {
      state: commandStateSeed,
      source: "seed",
      warning:
        "State connection unavailable. Showing the baseline plan; writes are disabled until the connection recovers.",
    };
  }
}
export async function getCommandState(): Promise<CommandState> {
  return (await getCommandStateReport()).state;
}

export class CommandConflictError extends Error {}

// One successor per version: the existing primary-key constraint makes competing
// inserts atomic. All command-state writers must use this function/protocol.
export async function saveCommandState(
  state: CommandState,
  reason: string,
  parentVersion: string,
) {
  const hash = createHash("sha256")
    .update(`247roi-command-successor:${parentVersion}`)
    .digest("hex");
  const id = `${hash.slice(0, 8)}-${hash.slice(8, 12)}-${hash.slice(12, 16)}-${hash.slice(16, 20)}-${hash.slice(20, 32)}`;
  const supabase = createSupabaseAdminClient();
  const { error } = await supabase.from("site_events").insert({
    id,
    event_name: "command_state_snapshot",
    source: "command_center",
    metadata: {
      reason,
      parentVersion,
      state,
    },
  });

  if (error) {
    if (error.code === "23505")
      throw new CommandConflictError(
        "Another operator saved first. Reload before saving your changes.",
      );
    throw new Error(
      "Command state could not be saved. Your edits have not been discarded.",
    );
  }
}
