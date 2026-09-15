import Link from "next/link";
import { AppShell } from "@/components/app-shell";
import { AgentSections } from "@/components/agent-sections";
export default function AgentsPage() {
  return (
    <AppShell>
      <div className="page-title">
        <div>
          <h1>Agent command sections</h1>
          <p>
            Each agent keeps its own operating area. Shared command coordinates
            across them.
          </p>
        </div>
      </div>
      <AgentSections expanded />
      <section className="panel">
        <div className="panel-head">
          <h2>Shared command infrastructure</h2>
        </div>
        <div className="panel-body">
          <div className="flex flex-wrap gap-3">
            {[
              { href: "/", label: "Situation room" },
              { href: "/work", label: "Shared orders & evidence" },
              { href: "/automation", label: "Automation watch" },
              { href: "/decisions", label: "Strategy & doctrine" },
              { href: "/settings", label: "Connections & retention" },
            ].map((i) => (
              <Link className="button" href={i.href} key={i.href}>
                {i.label} →
              </Link>
            ))}
          </div>
          <p className="source-note mb-0">
            These are the agent-owned sections documented in this repository.
            Module ownership is not a live agent-presence indicator. An agent’s
            internal pipeline is not automatically included in the shared order
            counts.
          </p>
        </div>
      </section>
    </AppShell>
  );
}
