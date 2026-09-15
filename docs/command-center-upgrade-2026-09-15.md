# Command center upgrade · 2026-09-15

## Operating surfaces

- Situation room: command intent, recorded assessment, live event/search signals, priority orders, attention queue, fronts, and intelligence health.
- Operations: searchable/filterable list and board, deep-linked order drawer, create/edit, ownership, acceptance criteria, references, evidence-gated completion.
- Strategy: campaign sequence and locked doctrine.
- Conversion: event-level view with explicit measurement boundaries.
- Shared shell: active navigation, muted slate/sea-green palette, mobile navigation, compact headers.

## Verification

- TypeScript, lint, production build.
- Playwright: desktop/mobile screenshots, no horizontal page overflow at 390px, navigation, filters, board, task drawer and route checks.
- Unauthorized write rejected; stale tab rejected; Done without evidence rejected.
- Authenticated no-op update of an existing active order persisted and reloaded. No test orders were added to production state.

## Boundaries

- Automation remains a dated registry, not scheduler telemetry or execution controls. UI says so.
- State uses existing append-only Supabase snapshots. Timestamp conflict checks reject stale tabs but are not atomic compare-and-swap: simultaneous writes remain a limitation of the snapshot architecture. A transactional row model is the next persistence upgrade.
- Token stays in component memory only; API validates each write. Existing historical completed orders are not retroactively claimed to have new evidence fields.
- Historical shipping ledger is separate from current completed orders.
- Contact clicks are not leads; event counts are not a cohort funnel; unconnected metrics remain unknown.
- This release does not alter public-site strategy, execute outreach, or change scheduled jobs.
