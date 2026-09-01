# Command Center Clarity Upgrade

Purpose: make the 247ROI command center the single place B can see what changed, what it did for the business, what is planned next, and where the site actually stands.

## Current State

The command center already has the right foundation:

- `/` gives a top-level command-center overview.
- `/seo` tracks site quality, SEO targets, AI visibility targets, authority targets, manual search baselines, and live event metrics.
- `/social` tracks social hooks, production pipeline, experiments, cleanup, and verdicts.
- `/settings` shows integration health, secrets posture, and retention policy.
- Live event ingestion is working through the command-center Supabase project.

As of 2026-09-01 17:09 UTC, the production API reported:

- 6 page views in the last 7 days.
- 6 page views in the last 30 days.
- 8 tracked visitor IDs in the last 30 days.
- 0 tracked CTA clicks in the last 7 and 30 days.
- 0 tracked phone clicks.
- 0 tracked email clicks.
- 2 AI Opportunity Audit starts.
- 0 AI Opportunity Audit unlocks.

Recent public-site changes since 2026-08-24 include:

- Event tracking foundation and command-center event forwarding.
- Sharper homepage audit conversion path.
- Business process automation, AI agents, AI automation consultant, AI visibility, GEO, dashboard, internal tools, and workflow automation landing pages.
- `/hire` audit conversion-flow improvements.
- Internal-link and audit-language consistency work.
- IndexNow key file.
- Warm traffic starter kit.
- Diagnostic "what should my business automate first" content.
- Proof ladder on the demo page.
- Referral partner growth page.

Recent command-center changes since 2026-08-24 include:

- Brand-site metrics connected to the dashboard.
- Command-center-owned site growth events.
- SEO and AI visibility target tracking.
- SEO standing scorecard.
- Manual search baselines.
- Hire conversion tracker.
- Recurring growth action tracker.
- Event ingestion and measurement fixes.
- Expanded authority targets and scorecard updates.

## Problem

B cannot easily track the work because the information is split across:

- Git history.
- Static TypeScript data files.
- Docs.
- Memory notes.
- Production event metrics.
- Manual search checks.
- Future operator cron work.

The dashboard shows some of the state, but it does not yet explain the operating story:

- What changed this week?
- Why did we do it?
- What improved visually?
- What improved technically?
- What rankings or indexing signals moved?
- What is still unknown?
- What is planned next?
- Which items are blocked by access, traffic, or proof?

## Recommended Product Shape

Turn the command center into five practical surfaces.

## 1. Executive Snapshot

Goal: answer "where are we right now?" in under 30 seconds.

Show:

- Site quality score.
- Search/indexing standing.
- AI visibility standing.
- Conversion standing.
- Authority/proof standing.
- Measurement health.
- Current top priority.
- Current blocker.
- Last meaningful shipped improvement.

This should be the first screen of `/`, replacing generic scaffold language with a compact owner/operator view.

## 2. Work Ledger

Goal: make shipped work visible without reading git logs.

Each record should include:

- Date.
- Area: site, SEO, GEO, conversion, authority, social, measurement, funnel.
- Change title.
- Changed URLs or files.
- Why it was done.
- Expected effect.
- Evidence status: pending, verified, no effect, negative effect.
- Before/after screenshot links when visual.
- Related commit SHA.
- Next follow-up date.

This becomes the answer to "what have you done?"

## 3. Growth Standing Board

Goal: separate opinions from proof.

For each area, show:

- Score.
- Trend.
- Proof we have.
- Proof missing.
- Next action.
- Last updated.
- Evidence links.

Current areas:

- Overall site.
- Positioning.
- Technical health.
- Crawlability.
- SEO.
- Ranking proof.
- AI visibility.
- Content quality.
- Warm traffic.
- Conversion path.
- Conversion proof.
- Authority.
- Measurement.
- Trust/proof assets.

The current `/seo` scorecard is the right start, but it should be elevated and timestamped so it feels like a living standing report.

## 4. Ranking And AI Visibility Tracker

Goal: make "are we ranking?" concrete.

Track:

- Query or prompt.
- Target page.
- Engine: Google, Bing, ChatGPT, Gemini, Perplexity, Google AI surface.
- Date checked.
- Observed position or visibility.
- Observed URL.
- Snippet or AI-answer summary.
- Whether 247ROI was mentioned.
- Competitors/entities shown.
- Next content/authority fix.

Manual checks are acceptable until Search Console, Bing Webmaster, and API-based AI snapshot tools are connected.

## 5. Visual Progress Gallery

Goal: let B see improvements rather than infer them.

Capture:

- Homepage before/after.
- `/hire` before/after.
- Service page before/after.
- New SEO pages.
- Demo/proof changes.
- Mobile and desktop screenshots.
- Short notes explaining what changed visually and why.

This should not become a design museum. It should show only meaningful changes that affect clarity, trust, conversion, or SEO/GEO.

## Data Model To Add

Start with local versioned data files before creating new database tables.

Suggested files:

- `src/data/work-ledger.ts`
- `src/data/growth-standing.ts`
- `src/data/visibility-snapshots.ts`
- `src/data/visual-progress.ts`

Move the current hardcoded scorecard and baseline data into these clearer domains. Keep Supabase for live event metrics and future ingestion-heavy data.

## Dashboard Route Changes

Add or reshape routes:

- `/` becomes the executive snapshot.
- `/work` becomes the work ledger.
- `/seo` remains the SEO/GEO operating board.
- `/visibility` becomes ranking and AI answer snapshots.
- `/progress` becomes visual before/after progress.
- `/social` stays Hermes-owned.
- `/settings` stays integration and risk state.

## Operating Cadence

Daily:

- Check event ingestion health.
- Add any shipped work to the work ledger.
- Flag one current priority and one blocker.

Weekly:

- Update standing scores only with evidence.
- Capture visual screenshots for meaningful public-site changes.
- Run manual search baselines while Search Console/Bing remain disconnected.
- Run AI visibility prompt snapshots.
- Pick one acquisition, one authority, and one conversion action.

Monthly:

- Compare ranking/search snapshots against the prior month.
- Decide which pages to improve, consolidate, expand, or de-prioritize.
- Publish or improve one proof asset.

## Immediate Build Order

1. Build `/work` from git history and recent command-center notes.
2. Replace the generic overview with a compact executive snapshot.
3. Add `/progress` with the first set of public-site screenshots.
4. Split ranking and AI-answer tracking out of `/seo` into `/visibility`.
5. Add update dates and evidence links to every standing score.
6. Later, connect Search Console and Bing Webmaster once account access is available.

## Success Criteria

B should be able to open the command center and answer:

- What did Athena/Hermes ship recently?
- What is the current state of traffic, conversion, rankings, AI visibility, and authority?
- What changed visually on the site?
- What is planned next?
- What is blocked?
- Which actions are based on proof versus judgment?

If the dashboard does not answer those questions quickly, it is not doing its job.
