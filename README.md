# 247 Ops Dashboard

Private command center for 247ROI operations.

The first module is the Social Command Center: pipeline control, PostFast publishing state, hook lab, asset cleanup, experiments, and performance verdicts. The app is designed for additional agents to add SEO, AI visibility, web, and ops modules without changing the shell.

## Stack

- Next.js App Router
- TypeScript
- Tailwind CSS
- Supabase
- Vercel
- PostFast API

## Routes

- `/` - daily command-center overview
- `/social` - social media command center
- `/seo` - reserved for SEO / AI visibility agent
- `/settings` - integrations and retention settings

## Local Setup

Install dependencies:

```bash
npm install
```

Run development server:

```bash
npm run dev
```

Verify before pushing:

```bash
npm run lint
npm run typecheck
npm run build
```

## Environment Variables

Local values live in `.env.local` and are ignored by Git.

Required now:

```bash
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY=
SUPABASE_SECRET_KEY=
SUPABASE_PROJECT_REF=
```

Required for PostFast integration:

```bash
POSTFAST_API_KEY=
```

Optional deployment/platform management values are stored outside the repo in the local Hermes config directory.

## Data Retention Rule

Heavy production files are temporary:

- raw generations expire after 3 days
- temp clips expire after 3 days
- failed edits expire after 3 days
- draft exports expire after 3 days
- finished production files expire after 3 days unless marked `keep`

Lightweight learning records stay:

- hooks
- scripts
- captions
- creative tags
- PostFast IDs
- published URLs
- metrics snapshots
- verdicts
- lessons

## Agent Boundaries

Hermes owns `src/modules/social`.

The SEO / AI visibility / web manager owns `src/modules/seo`.

Shared shell, UI primitives, environment helpers, and API clients live in `src/components`, `src/lib`, and `src/data`.
