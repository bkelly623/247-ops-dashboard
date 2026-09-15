import Link from "next/link";
import { ArrowRight, ArrowUpRight, CheckCheck, ChevronRight, Crosshair, FileCheck2, Plus, ShieldAlert, Users, Workflow } from "lucide-react";
import { AppShell } from "@/components/app-shell";
import type { CommandWorkItem } from "@/data/command-center-state";
import { getCommandStateReport } from "@/lib/command-state/server";
import { getBrandSiteOverview } from "@/lib/brand-site/server";
import { getSearchConsolePerformance } from "@/lib/search-console/server";

export const dynamic = "force-dynamic";
const number = (value: number | null | undefined) => value == null ? "—" : value.toLocaleString("en-US");
const taskHref = (item: CommandWorkItem) => `/work?task=${encodeURIComponent(item.id)}`;
const priority = (a: CommandWorkItem, b: CommandWorkItem) => a.priority.localeCompare(b.priority) || a.title.localeCompare(b.title);
const agents = [
  { name: "Athena", role: "Growth / search / web", runtime: "OpenClaw", href: "/seo", label: "Growth module" },
  { name: "Hermes", role: "Social / media", runtime: "OpenClaw", href: "/social", label: "Social module" },
  { name: "Flint", role: "Prospecting", runtime: "OpenClaw", href: "/work?owner=Flint", label: "Prospecting orders" },
  { name: "Slim", role: "Delivery / engineering", runtime: "Hermes", href: "/work?owner=Slim", label: "Delivery orders" },
  { name: "Lumen", role: "Systems / field support", runtime: "OpenClaw", href: "/automation", label: "Automation evidence" },
];
function safeEvidence(href: string) {
  return /^https?:\/\//i.test(href) || (href.startsWith("/") && !href.startsWith("//"));
}

export default async function Home() {
  const [report, brand, search] = await Promise.all([
    getCommandStateReport(), getBrandSiteOverview().catch(() => null), getSearchConsolePerformance().catch(() => null),
  ]);
  const state = report.state;
  const approvals = state.workItems.filter(i => i.status === "Needs B Approval").sort(priority);
  const blocked = state.workItems.filter(i => i.status === "Waiting / Blocked").sort(priority);
  const attention = [...approvals, ...blocked];
  const executing = state.workItems.filter(i => i.status === "In Progress").sort(priority);
  const ready = state.workItems.filter(i => i.status === "This Week").sort(priority);
  const active = [...executing, ...ready];
  const done = state.workItems.filter(i => i.status === "Done").sort((a, b) => (b.completedAt ?? "").localeCompare(a.completedAt ?? "") || priority(a, b));
  const focus = executing[0] ?? ready[0];
  const events = brand?.siteEvents;
  const updated = new Date(state.updatedAt);
  const dateLabel = Number.isNaN(updated.getTime()) ? "Date unavailable" : updated.toLocaleString("en-GB", { day: "2-digit", month: "short", hour: "2-digit", minute: "2-digit", timeZone: "UTC" }) + " UTC";

  return <AppShell><div className="mission-console">
    <div className="mission-heading">
      <div><p className="eyebrow"><Crosshair size={12} aria-hidden="true" /> 247ROI / Operations command</p><h1>Mission control<span>.</span></h1><p className="mission-subtitle">Decide. Delegate. Verify.</p></div>
      <Link className="button primary" href="/work?new=1"><Plus size={16} aria-hidden="true" /> New order</Link>
    </div>

    <div className="mission-primary-grid">
      <section className="panel decision-panel" aria-labelledby="attention-title">
        <div className="panel-head"><div className="section-heading"><ShieldAlert size={17} aria-hidden="true" /><h2 id="attention-title">Your move</h2><span className="pill amber">{attention.length}</span></div><Link href="/decisions">Decision desk <ArrowUpRight size={14} aria-hidden="true" /></Link></div>
        <div className="decision-caption">{approvals.length} awaiting approval <span>/</span> {blocked.length} waiting or blocked</div>
        {attention.length ? attention.slice(0, 3).map(item => <Link href={taskHref(item)} className="decision-row" key={item.id}>
          <div className="decision-row-top"><span className="eyebrow">{item.priority} / {item.owner}</span><span className={`pill ${item.status === "Needs B Approval" ? "amber" : "red"}`}>{item.status === "Needs B Approval" ? "Approval needed" : "Waiting / blocked"}</span></div>
          <h3>{item.title}</h3><p>{item.why || item.expectedImpact}</p><span className="decision-action">{item.status === "Needs B Approval" ? "Review & decide" : "Inspect blocker"}<ArrowRight size={14} aria-hidden="true" /></span>
        </Link>) : <div className="mission-clear"><CheckCheck size={24} aria-hidden="true" /><h3>No decisions or blockers recorded.</h3><p>Review the work board to assign the next order.</p><Link href="/work" className="button">Open work board <ArrowRight size={14} /></Link></div>}
        {attention.length > 3 && <Link className="panel-footer-link" href="/work?view=attention">View all {attention.length} attention items <ArrowRight size={14} /></Link>}
      </section>
      <aside className="mission-directive" aria-labelledby="directive-title">
        <div className="directive-kicker"><span className="eyebrow">{executing.length ? "Priority operation / recorded" : "Next ready operation"}</span><Crosshair size={24} aria-hidden="true" /></div>
        <h2 id="directive-title">{focus?.title ?? "Set the next objective."}</h2>
        <p>{focus?.expectedImpact ?? "Create an order with an owner, intended outcome, and required proof."}</p>
        {focus ? <><div className="focus-criteria"><span className="eyebrow">Success criteria / {focus.owner}</span><p>{focus.proofRequired}</p></div><Link className="button" href={taskHref(focus)}>Inspect mission brief <ArrowRight size={14}/></Link></> : <Link className="button" href="/work?new=1">Define an objective <Plus size={14}/></Link>}
        <div className="command-counts">
          {[{ label: "In progress", value: executing.length, href: "/work?view=active" }, { label: "This week", value: ready.length, href: "/work?view=active" }, { label: "Reported done", value: done.length, href: "/work?view=done" }].map(metric => <Link href={metric.href} key={metric.label}><strong>{number(metric.value)}</strong><span>{metric.label}</span></Link>)}
        </div>
        <div className="record-stamp"><span className="eyebrow">{report.source === "persistent" ? "Saved command record" : "Baseline plan / not a saved snapshot"}</span><time dateTime={Number.isNaN(updated.getTime()) ? undefined : state.updatedAt}>{dateLabel}</time><small>Recorded work states. Not live agent telemetry.</small></div>
      </aside>
    </div>
    {report.warning && <div className="notice" role="status">{report.warning}</div>}

    <section className="panel mission-section" aria-labelledby="operations-title">
      <div className="panel-head"><div className="section-heading"><Workflow size={17} aria-hidden="true" /><h2 id="operations-title">Active operations</h2><span className="pill">{active.length}</span></div><Link href="/work?view=active">Work board <ArrowUpRight size={14} /></Link></div>
      {active.length ? active.slice(0, 5).map((item, index) => <Link key={item.id} href={taskHref(item)} className="mission-order">
        <span className="order-number">{String(index + 1).padStart(2, "0")}</span><div className="order-main"><div className="mission-order-tags"><span className="eyebrow">{item.owner} / {item.lane}</span><span className="pill">{item.priority}</span></div><h3>{item.title}</h3><p>{item.expectedImpact}</p></div><div className="mission-order-status"><span className={`pill ${item.status === "In Progress" ? "cyan" : ""}`}>{item.status}</span><small>{item.dueOrCadence || "No due date recorded"}</small></div><ChevronRight className="row-chevron" size={16} aria-hidden="true" />
      </Link>) : <p className="empty">No in-progress or this-week orders recorded. <Link href="/work?new=1">Create an order →</Link></p>}
      {active.length > 5 && <Link className="panel-footer-link" href="/work?view=active">View all {active.length} active operations <ArrowRight size={14} /></Link>}
    </section>

    <section className="panel mission-section" aria-labelledby="roster-title">
      <div className="panel-head"><div className="section-heading"><Users size={17} aria-hidden="true" /><h2 id="roster-title">Agent roster</h2></div><Link href="/agents">All agent sections <ArrowUpRight size={14} /></Link></div>
      <div className="mission-roster">{agents.map(agent => {
        const orders = state.workItems.filter(item => item.owner.split(/[^a-z]+/i).some(token => token.toLowerCase() === agent.name.toLowerCase()));
        const underway = orders.filter(item => item.status === "In Progress").length;
        const waiting = orders.filter(item => item.status === "Waiting / Blocked" || item.status === "Needs B Approval").length;
        return <article className="roster-agent" key={agent.name}><div className="roster-identity"><span className="agent-monogram" aria-hidden="true">{agent.name.slice(0, 2).toUpperCase()}</span><span className="eyebrow">{agent.runtime}</span></div><h3>{agent.name}</h3><p>{agent.role}</p><div className="roster-record"><strong>{orders.length ? `${orders.length} shared orders` : "No shared orders"}</strong><small>{orders.length ? `${underway} in progress · ${waiting} need attention` : "Execution telemetry not connected"}</small></div><Link href={`/work?owner=${encodeURIComponent(agent.name)}`} className="roster-orders">View orders <ArrowRight size={13} /></Link><Link className="roster-module" href={agent.href}>{agent.label}<ArrowUpRight size={13} /></Link></article>;
      })}</div><p className="roster-note">Counts match named owners in the shared order book. Specialist pipelines remain separate; no shared orders does not mean an agent is idle.</p>
    </section>

    <div className="mission-secondary-grid">
      <section className="panel" aria-labelledby="evidence-title"><div className="panel-head"><div className="section-heading"><FileCheck2 size={17} aria-hidden="true" /><h2 id="evidence-title">Completed / evidence</h2></div><Link href="/work?view=done">All completed <ArrowUpRight size={14} /></Link></div>
        {done.length ? done.slice(0, 3).map(item => <article key={item.id} className="evidence-row"><div className="decision-row-top"><span className="eyebrow">{item.owner}</span><span className="pill">Reported done</span></div><Link href={taskHref(item)}><h3>{item.title}<ArrowUpRight size={14} /></h3></Link><p>{item.completionEvidence || "No completion evidence recorded. Inspect the order before treating this as verified."}</p><div className="evidence-links"><Link href={taskHref(item)}>Inspect order <ArrowRight size={13} /></Link>{item.links.filter(safeEvidence).slice(0, 2).map((href, index) => <a key={`${href}-${index}`} href={href} target="_blank" rel="noopener noreferrer">Linked artifact {index + 1}<ArrowUpRight size={13} /></a>)}</div></article>) : <p className="empty">No completed orders recorded. Completed work and its evidence will appear here.</p>}
      </section>
      <section className="panel" aria-labelledby="brief-title"><div className="panel-head"><h2 id="brief-title">Recorded growth briefing</h2><Link href="/seo">Athena / growth <ArrowUpRight size={14} /></Link></div><div className="mission-brief"><p className="eyebrow">Bottleneck / recorded assessment</p><p>{state.ownerSnapshot.currentBottleneck || "No assessment recorded."}</p><p className="eyebrow">Next move / growth scope</p><p>{state.ownerSnapshot.nextMove || "No next move recorded."}</p><div className="brief-links"><Link href="/automation">Automation evidence <ArrowUpRight size={14} /></Link><Link href="/settings">Connections <ArrowUpRight size={14} /></Link></div></div></section>
    </div>

    <section className="mission-section website-signals" aria-labelledby="signals-title"><div className="signals-heading"><div><p className="eyebrow">Secondary intelligence / website only</p><h2 id="signals-title">Acquisition signals</h2></div><Link href="/seo">Inspect source <ArrowUpRight size={14} /></Link></div><div className="metric-strip">
      {[{ label: "Page views", value: events?.tableReady ? number(events.pageViews7Days) : "—", unit: "Tracked events / 7 days", note: "Not qualified leads" }, { label: "Search reach", value: search?.configured ? number(search.impressions) : "—", unit: "Google impressions", note: search?.configured ? `${number(search.clicks)} clicks · ${search.startDate} → ${search.endDate}` : "Search feed unavailable" }, { label: "Audit engagement", value: events?.tableReady ? number(events.aiOpportunityAuditStarts7Days) : "—", unit: "Audit starts / 7 days", note: events?.tableReady ? `${number(events.aiOpportunityAuditUnlocks7Days)} reports unlocked / 7 days` : "Site feed unavailable" }, { label: "Contact intent", value: !events?.tableReady || events.phoneClicks7Days == null || events.emailClicks7Days == null ? "—" : number(events.phoneClicks7Days + events.emailClicks7Days), unit: "Phone + email clicks / 7 days", note: "Click events, not confirmed enquiries" }].map(metric => <div className="metric-cell" key={metric.label}><p className="eyebrow">{metric.label}</p><div className="metric-number">{metric.value}</div><small>{metric.unit}</small><small>{metric.note}</small></div>)}
    </div><p className="source-note">Missing measurements stay unknown. Website signals are not company-wide revenue, delivery or social performance.</p></section>
  </div></AppShell>;
}
