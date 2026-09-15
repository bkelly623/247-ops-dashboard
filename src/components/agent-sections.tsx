import Link from "next/link";
import { agentSections } from "@/data/agent-sections";
export function AgentSections({ expanded = false }: { expanded?: boolean }) {
  return (
    <section className="panel mb-5" aria-labelledby="agent-sections-title">
      <div className="panel-head">
        <h2 id="agent-sections-title">Agent command sections</h2>
        <span className="muted text-xs">
          Separate ownership · shared mission
        </span>
      </div>
      <div className="agent-grid">
        {agentSections.map((agent) => (
          <article className="agent-section" key={agent.id}>
            <div className="flex justify-between items-start gap-3">
              <div>
                <p className="eyebrow">{agent.role}</p>
                <h3>{agent.name}</h3>
              </div>
              <span className="pill">Module owner</span>
            </div>
            <p>{agent.description}</p>
            {expanded ? (
              <ul className="agent-components">
                {agent.components.map((component) => (
                  <li key={component}>{component}</li>
                ))}
              </ul>
            ) : null}
            <div className="flex flex-wrap gap-2 mt-4">
              {agent.links.map((link, index) => (
                <Link
                  className={index === 0 ? "button primary" : "button"}
                  href={link.href}
                  key={link.href}
                >
                  {link.label} →
                </Link>
              ))}
            </div>
            <small>{agent.source}</small>
          </article>
        ))}
      </div>
    </section>
  );
}
