# Mission Control — shared command upgrade

## Scope

The homepage prioritizes decisions, blocked work, the current priority operation, active orders, cross-agent ownership, and completed evidence. Growth metrics are secondary and explicitly scoped. Existing specialist routes are preserved. No agents are migrated, disabled, or replaced.

## Working controls

- `/work?new=1&owner=Flint` opens a new order with owner prefilled.
- `/work?owner=Slim` filters shared orders; the filter is not a live agent status.
- Orders have a read-first brief with criteria, reported evidence, a copyable agent handoff, and an expandable specification editor.
- `approve` and `request-changes` are explicit authenticated API actions with mandatory decision reasons. They only resolve pending approvals, preserving the exact approved scope.
- Scope changes to an approved order invalidate its approval and return it for review. Status updates cannot bypass pending or returned approval gates.
- Updates append a command activity record. The latest 200 are in the hot state; complete historical snapshots remain in the existing append-only store.
- `/decisions` shows pending order decisions and decision history before expandable growth doctrine.
- Unknown social metrics and imported automation records are not represented as live intelligence.

## Boundaries

This release does not dispatch, stop, or monitor agents automatically. The handoff is copied, not sent. Completion requires evidence text but is not independent artifact verification. Authentication retains the existing shared operator token: attribution says `Operator credential`, not a verified named user. Token input is not persisted by the UI. Read access retains the existing deployment policy; do not add client secrets or private customer data without a separate access-control review.

## Persistence

All writers must use `saveCommandState(next, reason, parentVersion)` in `src/lib/command-state/server.ts`. Its deterministic successor ID and database primary key reject concurrent updates. The API rejects stale `expectedUpdatedAt` values. Never bypass this by inserting random-ID snapshots. No storage migrations are required for optional `approval` and `commandLog` fields.

## Regression checks

- `npx --yes tsx --test scripts/command-actions.test.ts`
- `npm run typecheck`
- `npm run lint`
- `npm run build`
- Browser: homepage desktop/mobile, no document overflow, decision deep links, new-order owner prefill, owner filters, drawer Escape, preserved specialist routes.
- API: anonymous PATCH 401, stale version PATCH 409, authenticated real order creation and readback.

Do not seed fabricated customer or performance data to make the interface appear occupied. Empty and disconnected states are real operational information.
