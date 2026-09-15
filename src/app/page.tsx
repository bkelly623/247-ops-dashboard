import Link from "next/link";
import {
  ArrowRight,
  Crosshair,
  ShieldCheck,
  Search,
  Filter,
  Eye,
} from "lucide-react";
import { AppShell } from "@/components/app-shell";
import { getCommandStateReport } from "@/lib/command-state/server";
import { getBrandSiteOverview } from "@/lib/brand-site/server";
import { getSearchConsolePerformance } from "@/lib/search-console/server";
export const dynamic = "force-dynamic";
const number = (v: number | null | undefined) =>
  v == null ? "—" : v.toLocaleString();
export default async function Home() {
  const [report, brand, search] = await Promise.all([
    getCommandStateReport(),
    getBrandSiteOverview().catch(() => null),
    getSearchConsolePerformance().catch(() => null),
  ]);
  const s = report.state,
    e = brand?.siteEvents;
  const active = s.workItems
    .filter((i) => i.status === "In Progress" || i.status === "This Week")
    .sort((a, b) =>
      a.status === b.status
        ? a.priority.localeCompare(b.priority)
        : a.status === "In Progress"
          ? -1
          : 1,
    );
  const attention = s.workItems
    .filter(
      (i) =>
        i.status === "Needs B Approval" || i.status === "Waiting / Blocked",
    )
    .sort((a, b) => a.priority.localeCompare(b.priority));
  // Dynamic server page: freshness is evaluated per request, never on client rerenders.
  // eslint-disable-next-line react-hooks/purity
  const stale = Date.now() - Date.parse(s.updatedAt) > 48 * 3600000;
  const done = s.workItems.filter((i) => i.status === "Done");
  const fronts = [
    {
      name: "Search acquisition",
      icon: Search,
      href: "/pipeline/seo",
      read: `${s.pipelines.seo.length} tracked pages`,
      note: "Turn relevant searches into qualified attention.",
    },
    {
      name: "Authority & trust",
      icon: ShieldCheck,
      href: "/pipeline/authority",
      read: `${s.ownerSnapshot.authority.completed} / ${s.ownerSnapshot.authority.planned} planned assets`,
      note: "Build credible profiles and proof worth citing.",
    },
    {
      name: "AI visibility",
      icon: Eye,
      href: "/pipeline/visibility",
      read: `${s.pipelines.visibility.filter((i) => i.appears === true).length} present · ${s.pipelines.visibility.filter((i) => i.appears === null).length} unmeasured`,
      note: "Establish a measured presence in AI answers.",
    },
    {
      name: "Conversion",
      icon: Filter,
      href: "/pipeline/conversion",
      read: `${number(e?.aiOpportunityAuditUnlocks7Days)} audit unlocks / 7d`,
      note: "Turn attention into audits and conversations.",
    },
  ];
  return (
    <AppShell>
      <div className="page-title">
        <div>
          <h1>Situation room</h1>
          <p>The objective. The obstacles. The next move.</p>
        </div>
        <Link className="button primary" href="/work">
          Open operations <ArrowRight size={14} />
        </Link>
      </div>
      <div className="briefing">
        <div>
          <p className="eyebrow">Command intent</p>
          <p>
            Win qualified demand for 247ROI. Build discoverability and trust,
            then convert that attention through the AI Opportunity Audit.
          </p>
        </div>
        <div>
          <p className="eyebrow">
            Recorded assessment · not live intelligence
          </p>
          <p>{s.ownerSnapshot.currentBottleneck}</p>
        </div>
      </div>
      {report.warning ? <div className="notice">{report.warning}</div> : null}
      <div className="metric-strip">
        {[
          {
            label: "Attention",
            value: number(e?.pageViews7Days),
            unit: "tracked page views · 7 days",
            note: `${number(e?.uniqueVisitorEvents30Days)} tracked visitors / 30d · not qualified leads`,
          },
          {
            label: "Search reach",
            value: number(search?.impressions),
            unit: "Google impressions",
            note: search?.configured
              ? `${number(search.clicks)} clicks · ${search.averagePosition?.toFixed(1) ?? "—"} avg position`
              : "Search feed unavailable",
          },
          {
            label: "Audit engagement",
            value: number(e?.aiOpportunityAuditStarts7Days),
            unit: "audit starts · 7 days",
            note: `${number(e?.aiOpportunityAuditUnlocks7Days)} reports unlocked / 7d`,
          },
          {
            label: "Contact intent",
            value:
              e?.phoneClicks7Days == null || e.emailClicks7Days == null
                ? "—"
                : number(e.phoneClicks7Days + e.emailClicks7Days),
            unit: "phone + email clicks · 7 days",
            note: "Click events, not confirmed enquiries",
          },
        ].map((m) => (
          <div className="metric-cell" key={m.label}>
            <p className="eyebrow">{m.label}</p>
            <div className="metric-number">{m.value}</div>
            <small>{m.unit}</small>
            <small>{m.note}</small>
          </div>
        ))}
      </div>
      <div className="situation-grid">
        <section className="panel">
          <div className="panel-head">
            <h2>
              Priority orders <span className="muted">/ {active.length}</span>
            </h2>
            <Link href="/work?view=active">Manage queue →</Link>
          </div>
          {active.length ? (
            active.slice(0, 4).map((i, n) => (
              <Link
                key={i.id}
                href={`/work?task=${encodeURIComponent(i.id)}`}
                className="order-row"
              >
                <span className="order-number">
                  {String(n + 1).padStart(2, "0")}
                </span>
                <div className="order-main">
                  <h3>{i.title}</h3>
                  <p>{i.expectedImpact}</p>
                  <div className="order-meta">
                    <span>{i.owner}</span>
                    <span>•</span>
                    <span>{i.lane}</span>
                    <span>•</span>
                    <span>{i.dueOrCadence}</span>
                  </div>
                </div>
                <span
                  className={`pill ${i.status === "In Progress" ? "green" : ""}`}
                >
                  {i.status === "In Progress" ? "Executing" : i.priority}
                </span>
              </Link>
            ))
          ) : (
            <p className="empty">
              No active orders. Select a ready item from the backlog.
            </p>
          )}
          <div className="panel-body">
            <p className="eyebrow">Recorded next move</p>
            <p className="muted text-xs leading-6 mt-2">
              {s.ownerSnapshot.nextMove}
            </p>
          </div>
        </section>
        <section className="panel">
          <div className="panel-head">
            <h2>Command attention</h2>
            <span className="pill amber">{attention.length} items</span>
          </div>
          {attention.length ? (
            attention.slice(0, 3).map((i) => (
              <Link
                className="attention-item"
                key={i.id}
                href={`/work?task=${encodeURIComponent(i.id)}`}
              >
                <span
                  className={`pill ${i.status === "Needs B Approval" ? "amber" : "red"}`}
                >
                  {i.status === "Needs B Approval"
                    ? "Decision needed"
                    : "Blocked / waiting"}
                </span>
                <strong>{i.title}</strong>
                <p>
                  {i.status === "Needs B Approval" ? i.expectedImpact : i.why}
                </p>
                <p style={{ color: "var(--accent)" }}>Review order →</p>
              </Link>
            ))
          ) : (
            <p className="empty">No approvals or blockers recorded.</p>
          )}
        </section>
      </div>
      <section className="panel mb-5">
        <div className="panel-head">
          <h2>Campaign fronts</h2>
          <Link href="/decisions">Strategy & doctrine →</Link>
        </div>
        <div className="front-grid">
          {fronts.map((f) => (
            <div className="front" key={f.name}>
              <f.icon size={19} color="#8ac9ba" />
              <h3>{f.name}</h3>
              <span className="pill">{f.read}</span>
              <p className="mt-3">{f.note}</p>
              <Link href={f.href}>Inspect front →</Link>
            </div>
          ))}
        </div>
      </section>
      <div className="situation-grid">
        <section className="panel">
          <div className="panel-head">
            <h2>Completed orders</h2>
            <Link href="/work?view=done">Inspect evidence →</Link>
          </div>
          {done
            .slice(-3)
            .reverse()
            .map((i) => (
              <Link
                className="order-row"
                key={i.id}
                href={`/work?task=${encodeURIComponent(i.id)}`}
              >
                <Crosshair size={16} color="#8ac9ba" />
                <div className="order-main">
                  <h3>{i.title}</h3>
                  <p>{i.metricToWatch}</p>
                </div>
                <span className="pill">Reported done</span>
              </Link>
            ))}
          {!done.length ? (
            <p className="empty">No completed orders recorded.</p>
          ) : null}
        </section>
        <section className="panel">
          <div className="panel-head">
            <h2>Intelligence health</h2>
            <Link href="/settings">Connections →</Link>
          </div>
          <div className="panel-body space-y-3 text-xs">
            <p className="flex justify-between gap-3">
              <span>Operations record</span>
              <span className={`pill ${stale ? "amber" : "green"}`}>
                {stale ? "Review due" : "Recent"} · {s.updatedAt.slice(0, 10)}
              </span>
            </p>
            <p className="flex justify-between gap-3">
              <span>Site event feed</span>
              <span className="muted">
                {e?.tableReady ? "Connected" : "Unavailable"}
              </span>
            </p>
            <p className="flex justify-between gap-3">
              <span>Google window</span>
              <span className="muted">
                {search?.configured
                  ? `${search.startDate} → ${search.endDate}`
                  : "Unavailable"}
              </span>
            </p>
            <p className="muted leading-6">
              Plan and automation notes are recorded snapshots, not live
              execution telemetry. Missing measurements stay unknown.
            </p>
            <Link className="button" href="/automation">
              Inspect automation
            </Link>
          </div>
        </section>
      </div>
    </AppShell>
  );
}
