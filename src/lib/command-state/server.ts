import "server-only";
import { commandStateSeed, type CommandState, type WorkStatus } from "@/data/command-center-state";
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

export async function getCommandState(): Promise<CommandState> {
  try {
    const supabase = createSupabaseAdminClient();
    const { data, error } = await supabase
      .from("site_events")
      .select("created_at,metadata")
      .eq("event_name", "command_state_snapshot")
      .eq("source", "command_center")
      .order("created_at", { ascending: false })
      .limit(1);

    if (error) return commandStateSeed;

    const row = ((data ?? []) as CommandStateEventRow[])[0];
    return stateFromMetadata(row?.metadata) ?? commandStateSeed;
  } catch {
    return commandStateSeed;
  }
}

export async function saveCommandState(state: CommandState, reason: string) {
  const supabase = createSupabaseAdminClient();
  const { error } = await supabase.from("site_events").insert({
    event_name: "command_state_snapshot",
    source: "command_center",
    metadata: {
      reason,
      state,
    },
  });

  if (error) {
    throw new Error(`Command state snapshot failed: ${error.message}`);
  }
}

export async function updateWorkItemStatus(
  workItemId: string,
  status: WorkStatus,
  reason: string,
) {
  const state = await getCommandState();
  const workItem = state.workItems.find((item) => item.id === workItemId);

  if (!workItem) {
    throw new Error("Unknown work item.");
  }

  const nextState: CommandState = {
    ...state,
    updatedAt: new Date().toISOString(),
    workItems: state.workItems.map((item) =>
      item.id === workItemId ? { ...item, status } : item,
    ),
  };

  await saveCommandState(nextState, reason || `Updated ${workItem.title} to ${status}.`);
  return nextState;
}
