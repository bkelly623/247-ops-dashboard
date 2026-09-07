alter table site_events
  add column if not exists excluded_from_metrics boolean not null default false,
  add column if not exists exclusion_reason text;

create index if not exists idx_site_events_excluded_created
  on site_events (excluded_from_metrics, created_at desc);
