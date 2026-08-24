import {
  Activity,
  BarChart3,
  CheckCircle2,
  FileSearch,
  Link2,
  Search,
  ShieldCheck,
  Waypoints,
} from "lucide-react";
import { AppShell } from "@/components/app-shell";
import { DashboardCard, PageHeader, StatusBadge } from "@/components/dashboard-card";
import { getBrandSiteOverview } from "@/lib/brand-site/server";

export const dynamic = "force-dynamic";

const operatingMetrics = [
  {
    label: "Search visibility",
    value: "Needs live feed",
    note: "Google Search Console, Bing Webmaster, indexed pages, query movement, CTR, and sitemap coverage.",
    icon: Search,
  },
  {
    label: "AI visibility",
    value: "Manual checks first",
    note: "Track whether answer engines understand 247ROI as business systems, AI automation, dashboards, apps, and agents.",
    icon: Activity,
  },
  {
    label: "Authority",
    value: "Backlog open",
    note: "Directories, partner mentions, guest content, proof assets, case studies, and backlink quality.",
    icon: Link2,
  },
  {
    label: "Funnel impact",
    value: "Audit-led",
    note: "Tie SEO and content work back to AI Opportunity Audit starts, qualified leads, booked calls, and pipeline.",
    icon: BarChart3,
  },
];

const priorityBacklog = [
  "Connect Search Console, Bing Webmaster, analytics, and form/audit events.",
  "Audit current get247roi.com sitemap, robots.txt, schema, llms.txt, llms-full.txt, and internal links.",
  "Build the AI Opportunity Audit keyword cluster and make it the primary conversion path.",
  "Ship answer-style pages for bottlenecks: dropped leads, manual reporting, inbox/admin overload, CRM handoffs, spreadsheet operations, and research workflows.",
  "Create authority assets: sample audit report, bottleneck checklist, ROI calculator, contractor AI readiness checklist, and workflow before/after examples.",
  "Start a clean backlink/authority list focused on directories, contractor ecosystems, local business groups, partner blogs, podcasts, and useful resource pages.",
];

const moduleRules = [
  "Do not treat this module as monitoring only; every review must produce a next action or a deliberate hold.",
  "Keep 247ROI positioned as business systems using AI, automation, custom software, dashboards, internal apps, and agents.",
  "Use AI Employees as a sales metaphor and content cluster, not the whole front-door category.",
  "Anchor conversion around the AI Opportunity Audit.",
  "Avoid spam backlinks, thin AI pages, fake proof, and overclaiming AI results.",
];

async function loadBrandOverview() {
  try {
    return await getBrandSiteOverview();
  } catch {
    return null;
  }
}

function metricValue(value: number | null | undefined) {
  if (typeof value !== "number") return "Pending";
  return value.toLocaleString();
}

export default async function SeoPage() {
  const brandOverview = await loadBrandOverview();
  const liveMetrics = [
    {
      label: "Page views",
      value: metricValue(brandOverview?.siteEvents.pageViews7Days),
      note: "Last 7 days from public-site event tracking.",
      icon: Activity,
    },
    {
      label: "CTA clicks",
      value: metricValue(brandOverview?.siteEvents.ctaClicks7Days),
      note: "Last 7 days across tracked audit and nav CTAs.",
      icon: CheckCircle2,
    },
    {
      label: "Audit starts",
      value: metricValue(brandOverview?.siteEvents.aiOpportunityAuditStarts7Days),
      note: "AI Opportunity Audit sessions started in the last 7 days.",
      icon: Search,
    },
    {
      label: "Audit unlocks",
      value: metricValue(brandOverview?.siteEvents.aiOpportunityAuditUnlocks7Days),
      note: "AI Opportunity Audit reports unlocked in the last 7 days.",
      icon: BarChart3,
    },
  ];

  return (
    <AppShell>
      <PageHeader
        eyebrow="SEO / GEO Command"
        title="Make 247ROI easier to find, understand, trust, and choose."
        description="This module owns website quality, technical SEO, AI visibility, content architecture, authority building, and the AI Opportunity Audit conversion path."
        action={<StatusBadge tone="gold">Active owner: Athena</StatusBadge>}
      />

      <div className="mb-5 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {liveMetrics.map((metric) => {
          const Icon = metric.icon;

          return (
            <DashboardCard key={metric.label} title={metric.label}>
              <div className="flex min-h-36 flex-col justify-between gap-4">
                <div className="flex items-start justify-between gap-4">
                  <p className="text-3xl font-semibold leading-tight">{metric.value}</p>
                  <div className="flex size-10 shrink-0 items-center justify-center rounded-md bg-[#171511] text-[#d6a034]">
                    <Icon size={20} />
                  </div>
                </div>
                <p className="text-sm leading-6 text-[#665d4e]">{metric.note}</p>
              </div>
            </DashboardCard>
          );
        })}
      </div>

      {!brandOverview?.siteEvents.tableReady && (
        <div className="mb-5 rounded-md border border-[#e2c16d] bg-[#fff7df] px-4 py-3 text-sm leading-6 text-[#665d4e]">
          Brand-site event feed is waiting on credentials or the `site_events`
          migration. Existing audit-session aggregates can still be read once
          `BRAND_SUPABASE_URL` and `BRAND_SUPABASE_SECRET_KEY` are set.
        </div>
      )}

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {operatingMetrics.map((metric) => {
          const Icon = metric.icon;

          return (
            <DashboardCard key={metric.label} title={metric.label}>
              <div className="flex min-h-44 flex-col justify-between gap-4">
                <div className="flex items-start justify-between gap-4">
                  <p className="text-2xl font-semibold leading-tight">{metric.value}</p>
                  <div className="flex size-10 shrink-0 items-center justify-center rounded-md bg-[#171511] text-[#d6a034]">
                    <Icon size={20} />
                  </div>
                </div>
                <p className="text-sm leading-6 text-[#665d4e]">{metric.note}</p>
              </div>
            </DashboardCard>
          );
        })}
      </div>

      <div className="mt-5 grid gap-5 xl:grid-cols-[1.15fr_0.85fr]">
        <DashboardCard title="Priority Backlog" eyebrow="Next actions">
          <div className="space-y-3">
            {priorityBacklog.map((item, index) => (
              <div
                key={item}
                className="flex gap-3 rounded-md border border-[#ded6c8] bg-white/55 p-3"
              >
                <div className="flex size-7 shrink-0 items-center justify-center rounded-md bg-[#ece5d7] text-sm font-semibold text-[#8b6a22]">
                  {index + 1}
                </div>
                <p className="text-sm leading-6 text-[#665d4e]">{item}</p>
              </div>
            ))}
          </div>
        </DashboardCard>

        <div className="space-y-5">
          <DashboardCard title="Operating Rule" eyebrow="Module contract">
            <div className="space-y-4 text-sm leading-6 text-[#665d4e]">
              <div className="flex gap-3">
                <ShieldCheck size={18} className="mt-1 shrink-0 text-[#8b6a22]" />
                <p>
                  Every SEO, GEO, content, backlink, and site-quality action
                  must map to traffic, AI understanding, trust, audit requests,
                  booked calls, pipeline, or authority.
                </p>
              </div>
              <div className="flex gap-3">
                <Waypoints size={18} className="mt-1 shrink-0 text-[#8b6a22]" />
                <p>
                  Social, outbound, and site pages should share the same source
                  of truth: 247ROI finds the bottleneck worth fixing first, then
                  builds practical systems that save time and create ROI.
                </p>
              </div>
            </div>
          </DashboardCard>

          <DashboardCard title="Rules" eyebrow="Do not drift">
            <ul className="space-y-3 text-sm leading-6 text-[#665d4e]">
              {moduleRules.map((rule) => (
                <li key={rule} className="flex gap-3">
                  <FileSearch size={16} className="mt-1 shrink-0 text-[#8b6a22]" />
                  <span>{rule}</span>
                </li>
              ))}
            </ul>
          </DashboardCard>
        </div>
      </div>
    </AppShell>
  );
}
