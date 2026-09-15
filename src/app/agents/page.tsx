import Link from "next/link";
import { ArrowUpRight, Crosshair } from "lucide-react";
import { AppShell } from "@/components/app-shell";
import { getCommandStateReport } from "@/lib/command-state/server";
export const dynamic = "force-dynamic";
const roster = [
  {name:"Flint", role:"Prospecting & reconnaissance", runtime:"OpenClaw", href:"/work?owner=Flint", label:"Prospecting orders", remit:"Research prospects, identify business pain, and prepare your next conversation.", limitation:"Prospect database and agent telemetry are not connected."},
  {name:"Athena", role:"Growth & web intelligence", runtime:"OpenClaw", href:"/seo", label:"Growth workspace", remit:"Website, search visibility, authority, measurement, and conversion evidence.", limitation:"Search/site data connected separately; order status is recorded, not agent liveness."},
  {name:"Hermes", role:"Social & creative production", runtime:"OpenClaw", href:"/social", label:"Social workspace", remit:"Hooks, scripts, production, publishing, and creative review. Distinct from Slim.", limitation:"Planning workspace; live publishing telemetry is not connected."},
  {name:"Slim", role:"Engineering & delivery", runtime:"Hermes Agent", href:"/work?owner=Slim", label:"Delivery orders", remit:"Build working systems, integrate tools, and verify finished deliverables.", limitation:"No automatic task dispatch or live execution telemetry yet."},
  {name:"Lumen", role:"Systems & field support", runtime:"OpenClaw", href:"/automation", label:"Automation watch", remit:"Medic and handyman: diagnose failures, recover operations, and maintain systems.", limitation:"Automation view is a scoped dated import, not Lumen's live health feed."},
];
export default async function AgentsPage() {
  const report = await getCommandStateReport();
  return <AppShell>
    <div className="page-title"><div><p className="eyebrow">247ROI / task force</p><h1>Specialists. One mission.</h1><p>Clear ownership without pretending every agent is connected.</p></div><Link href="/work?new=1" className="button primary">Assign an order <ArrowUpRight size={15}/></Link></div>
    {report.warning ? <div className="notice">{report.warning}</div> : null}
    <div className="grid gap-4 lg:grid-cols-2">
      {roster.map(agent => {
        const orders = report.state.workItems.filter(i => i.owner.toLowerCase().split(/\s*\+\s*/).includes(agent.name.toLowerCase()));
        return <section key={agent.name} className="panel">
          <div className="panel-head"><div><p className="eyebrow">{agent.role}</p><h2 className="mt-2">{agent.name}</h2></div><span className="pill">{agent.runtime}</span></div>
          <div className="panel-body"><p className="text-sm leading-6">{agent.remit}</p><div className="flex flex-wrap gap-2 my-4"><span className="pill">{orders.length} shared orders</span><span className="pill amber">{orders.filter(i => ["Needs B Approval", "Waiting / Blocked"].includes(i.status)).length} need attention</span></div>
          <p className="source-note">{agent.limitation}</p><div className="flex flex-wrap gap-2"><Link className="button primary" href={agent.href}>{agent.label} <ArrowUpRight size={14}/></Link><Link className="button" href={`/work?new=1&owner=${agent.name}`}><Crosshair size={14}/>New order</Link></div></div>
        </section>;
      })}
    </div>
    <section className="panel mt-5"><div className="panel-head"><h2>Outside the active 247ROI task force</h2><span className="pill">No agents replaced</span></div><div className="panel-body text-sm leading-7 muted">DCIS remains a separate museum project. Critic remains an on-demand reviewer. ROI CEO is an experimental clone-building lab. Learn, KimiTwin, and Automagixx are not represented as active operational modules here. This view does not disable, migrate, or control any of them.</div></section>
  </AppShell>;
}
