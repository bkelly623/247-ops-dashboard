# Agent sections and follow-through · 2026-09-15

## Correction

The shared shell must preserve agent-owned sections. The first upgrade did not delete Social, SEO, Rank Proof, or Visual Progress, but hid important entry points and overrepresented growth operations on the shared home.

- Restored first-class Hermes / Social and Athena / Growth navigation and home entry points.
- Added `/agents`, using `src/data/agent-sections.ts` as the shared directory.
- Restored `/visibility` and `/progress` navigation.
- Preserved Social and SEO module implementation and data.
- Shared board has an owner filter and no default owner for new orders. Its counts explicitly exclude independent module pipelines.

## Follow-through

- Automation now reads sanitized actual scheduler evidence from Supabase, separate from old planning notes. Current import is caller-scoped to Athena, retrieved with authorized automations tools; no attempt to bypass gateway-wide inventory restrictions.
- Observed latest growth run: provider billing failure. No provider credentials, model configuration, or schedules were changed.
- Import is dated, not automatic polling. Update without deployment using `node --env-file=.env.local scripts/import-automation-evidence.mjs <reviewed-json>` after obtaining authorized tool results. Do not import raw payloads, delivery routes, session identifiers or secrets.
- Concurrent order saves now use a deterministic successor UUID based on the parent version. The existing primary-key constraint atomically permits one successor; stale/losing writes receive HTTP 409. This supersedes the prior release's concurrent-writer limitation for writers following this protocol. No database migration is required.
- Future command-state writers must use the same protocol. Random-ID direct inserts bypass it.

## Remaining integration boundaries

- Cross-agent gateway inventory requires an authenticated administrator view; this session cannot verify Hermes' schedules.
- Social's existing plan data is not live PostFast telemetry.
- Confirmed enquiries and cohort conversion measurement remain unconnected.

## Verified

- Lint, production build/TypeScript, clean diff checks.
- Playwright confirmed Hermes' eight original sections and SEO keyword/rank/history/query components, agent entry points, rank proof, visual progress, settings, owner filtering, and 390px mobile navigation without overflow.
- Browser screenshots reviewed; preserved light-theme modules now receive a shared dark-theme compatibility layer, without changing their source/data.
- Two simultaneous authenticated no-op saves yielded exactly one 200 and one 409; order count and content preserved.
