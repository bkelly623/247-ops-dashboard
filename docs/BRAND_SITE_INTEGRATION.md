# Brand Site Integration

## Boundary

Keep the public brand website and private command center separate.

- Public brand site: `/home/precision_focused_solutions/247ROI`
- Private command center: `/home/precision_focused_solutions/247-ops-dashboard`
- Command-center Supabase project: `zptpvfcjhziglhdkuwhm` (`247 ops dashboard`)
- Legacy public audit Supabase project: `ytdufsxqywkvtnpyetco` (`247ROI Audit App`)

The brand site owns visitor experience, public pages, AI Opportunity Audit UX, report pages, SEO pages, schema, sitemap, and `llms.txt`.

The command center owns operations: analytics, SEO/GEO backlog, content pipeline, AI visibility checks, authority work, conversion review, weekly priorities, and agent decisions.

## Correct Data Flow

New operational event data belongs to the command center.

1. Browser activity on the public site posts to `/api/events` on `get247roi.com`.
2. The public site's server forwards the event to the command-center ingestion endpoint.
3. The command center validates the shared secret.
4. The command center writes the event to its own Supabase `site_events` table.
5. Command-center dashboards and operating boards read from the command-center database.

Do not expose Supabase secret keys to browser components. Do not write new operational stats directly from the browser to Supabase.

## Required Environment Variables

Public brand site:

```bash
COMMAND_CENTER_EVENTS_URL=https://247-ops-dashboard.vercel.app/api/site-events/ingest
COMMAND_CENTER_EVENTS_SECRET=
```

Private command center:

```bash
COMMAND_CENTER_EVENTS_SECRET=
```

The same secret must be present in both apps. It is used only server-to-server.

## Legacy Audit Data

The old project `ytdufsxqywkvtnpyetco` appears to be the historical 247ROI audit-app backend. It contains, or was designed to contain:

- `scan_sessions`
- `hire_sessions`
- `audit_rate_limits`
- `rep_sessions`

Treat it as legacy until inventory confirms what live production still depends on.

Do not add new ops tables there. Do not use it as the command-center source of truth.

If historical audit data is still valuable, migrate or replicate the specific aggregates into the command-center database through an explicit job later.

## Command-Center Event Table

Migration:

- `/home/precision_focused_solutions/247-ops-dashboard/supabase/migrations/001_ops_site_events.sql`

Events currently tracked:

- `page_view`
- `cta_click`
- `phone_click`
- `email_click`
- `hire_session_started`
- `hire_chat_message_sent`
- `hire_gate_shown`
- `hire_gate_submit`
- `hire_report_unlocked`

## Operating Goal

The integration exists to support a growth operating system, not vanity analytics.

Every metric should help decide one of:

- improve a page
- build a page
- change a CTA
- fix technical SEO
- improve AI visibility/entity clarity
- add authority/proof
- create content from a proven framework
- follow up on lead quality
- deliberately hold because the signal is not strong enough
