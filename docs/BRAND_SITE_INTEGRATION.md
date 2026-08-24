# Brand Site Integration

## Boundary

Keep the public brand website and private command center separate.

- Public brand site: `/home/precision_focused_solutions/247ROI`
- Private command center: `/home/precision_focused_solutions/247-ops-dashboard`

The brand site owns the visitor experience, landing pages, AI Opportunity Audit, Infrastructure Blueprint audit, report pages, SEO pages, schema, sitemap, and public tracking events.

The command center owns private operations: dashboards, SEO/GEO management, funnel review, authority backlog, content decisions, and internal metrics.

## Integration Pattern

Use server-only data flow.

1. The brand site writes events and sessions to its production systems.
2. The command center reads selected metrics from backend routes.
3. No service-role keys are exposed to browser components.
4. The command center stores derived snapshots and decisions in its own database later.

## Existing Brand-Site Data Sources

The brand site already persists:

- `scan_sessions`: Infrastructure Blueprint sessions, status, warm tier, report, viewed timestamps, and CTA clicks.
- `hire_sessions`: AI Opportunity Audit chat sessions, discovery state, proposal, contact fields, and unlock timestamps.
- `site_events`: page views, CTA clicks, phone clicks, email clicks, AI Opportunity Audit milestones, source/UTM context, anonymous visitor ID, anonymous session ID, and metadata.

Current migrations live in:

- `/home/precision_focused_solutions/247ROI/supabase/migrations/001_initial_schema.sql`
- `/home/precision_focused_solutions/247ROI/supabase/migrations/002_hire_audits.sql`
- `/home/precision_focused_solutions/247ROI/supabase/migrations/003_site_events.sql`

## Command Center Endpoint

Added:

- `/api/brand-site/overview`

It returns private aggregate counts for:

- Infrastructure Blueprint total sessions.
- Infrastructure Blueprint sessions in the last 30 days.
- Warm/hot/client Infrastructure Blueprint leads in the last 30 days.
- Infrastructure Blueprint CTA clicks in the last 30 days.
- AI Opportunity Audit total sessions.
- AI Opportunity Audit sessions in the last 30 days.
- AI Opportunity Audit unlocked reports in the last 30 days.
- Site-event readiness.
- Page views, CTA clicks, phone clicks, email clicks, AI Opportunity Audit starts, and AI Opportunity Audit unlocks in the last 7 days.

## Required Environment Variables

Set these in the command center deployment, not the public brand site:

```bash
BRAND_SUPABASE_URL=
BRAND_SUPABASE_SECRET_KEY=
```

`BRAND_SUPABASE_SECRET_KEY` must stay server-only. It is used only in backend routes.

## Next Integration Steps

1. Add a public-site event table for page views, CTA clicks, source attribution, and AI Opportunity Audit funnel steps.
2. Add a lightweight client event helper in the brand site that posts to a public API route.
3. Store events in Supabase with session ID, route, referrer, UTM fields, event name, and metadata.
4. Add command-center cards that call `/api/brand-site/overview`.
5. Add scheduled snapshots so weekly progress can be compared without recalculating everything live.
6. Add integrations for Search Console, Bing Webmaster, and deployment health.
