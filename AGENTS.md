<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

# 247 Ops Dashboard Agent Rules

This repository is the unified command center for 247ROI operations.

## Product Direction

- Build an operator-grade command center, not a generic analytics dashboard.
- The app should help decide what to do next: publish, clean up, investigate, iterate, scale, or stop.
- Preserve lightweight learning records. Do not build a permanent archive of heavy media files.
- Heavy production assets are temporary by default and expire after 3 days unless explicitly marked `keep`.

## Module Ownership

- `src/modules/social` belongs to Hermes and covers social strategy, production, PostFast, metrics, hooks, experiments, and cleanup.
- `src/modules/seo` is reserved for the SEO / AI visibility / web manager agent.
- Shared UI and utilities belong in `src/components`, `src/lib`, and `src/data`.
- Do not create a new top-level app pattern for a module. Add module data, components, and routes inside the existing shell.

## Route Map

- `/` is the command-center overview.
- `/social` is the social media command center.
- `/seo` is a placeholder route for SEO / AI visibility.
- `/settings` is for integrations, retention, and account state.

## Data Rules

- Supabase project ref: `zptpvfcjhziglhdkuwhm`.
- Use current Supabase key language: publishable key for browser-safe client use; secret key for server-only privileged actions.
- Never expose `SUPABASE_SECRET_KEY`, `POSTFAST_API_KEY`, Vercel token, Supabase access token, or database credentials to client components.
- API wrappers for external services belong under `src/lib/*` and should be server-only unless explicitly browser-safe.

## Social Module Principles

- PostFast is the default publishing layer.
- Social records should keep scripts, hooks, tags, post IDs, published URLs, metrics snapshots, verdicts, and lessons.
- Raw generations, temp clips, failed edits, and draft exports are disposable.
- The core operating loop is: idea -> hook -> script -> shot plan -> production -> QC -> schedule -> publish -> metrics -> verdict -> remix.
- Key social surfaces: Daily War Room, Hook Lab, Content Kill Room, Creative DNA Tags, 3-Day Asset Burn System, PostFast Control Panel, and Performance-Driven Remix Queue.

## UI Rules

- Operational density beats marketing flourish.
- Use restrained, high-contrast interface styling that feels serious enough for successful business owners.
- Cards are allowed for individual repeated items and dashboard panels; do not create nested card stacks.
- Use lucide icons for controls/status where useful.
- Avoid one-note color palettes and decorative background blobs.
