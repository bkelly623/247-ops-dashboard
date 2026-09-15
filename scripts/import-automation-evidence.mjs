// Accept a reviewed, sanitized export obtained through authorized OpenClaw tools.
// Never pass raw job payloads, session transcripts, delivery targets, or credentials.
import { readFile } from "node:fs/promises";
import { createClient } from "@supabase/supabase-js";
if (!process.argv[2])
  throw new Error(
    "Usage: node --env-file=.env.local scripts/import-automation-evidence.mjs <reviewed-json>",
  );
const evidence = JSON.parse(await readFile(process.argv[2], "utf8"));
if (!evidence.observedAt || !evidence.scope || !Array.isArray(evidence.jobs))
  throw new Error("Invalid evidence document");
const db = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SECRET_KEY,
  { auth: { persistSession: false } },
);
const { error } = await db
  .from("site_events")
  .insert({
    event_name: "automation_evidence_snapshot",
    source: "command_center",
    metadata: { evidence },
  });
if (error) throw new Error("Evidence import failed");
console.log(
  `Imported ${evidence.jobs.length} job records; scope ${evidence.scope}.`,
);
