"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import type React from "react";
import {
  Crosshair,
  LayoutDashboard,
  ListChecks,
  Search,
  ShieldCheck,
  Eye,
  Workflow,
  Compass,
  Radio,
  Settings,
  ArrowUpRight,
  Filter,
  Users,
  MonitorUp,
} from "lucide-react";
import { agentSections } from "@/data/agent-sections";
const groups = [
  {
    label: "COMMAND",
    items: [
      { href: "/", label: "Mission control", icon: LayoutDashboard },
      { href: "/work", label: "Work orders", icon: ListChecks },
      { href: "/decisions", label: "Decision desk", icon: Compass },
      { href: "/agents", label: "Agent roster", icon: Users },
      { href: "/automation", label: "Automation", icon: Workflow },
    ],
  },
  {
    label: "AGENT SECTIONS",
    items: [
      ...agentSections.map((agent) => ({
        href: agent.href,
        label: `${agent.name} · ${agent.id === "hermes" ? "Social" : "Growth"}`,
        icon: agent.id === "hermes" ? Radio : Search,
      })),
    ],
  },
  {
    label: "GROWTH PIPELINES",
    items: [
      { href: "/pipeline/seo", label: "Search acquisition", icon: Search },
      {
        href: "/pipeline/authority",
        label: "Authority & trust",
        icon: ShieldCheck,
      },
      { href: "/pipeline/visibility", label: "AI visibility", icon: Eye },
      { href: "/pipeline/conversion", label: "Conversion", icon: Filter },
    ],
  },
  {
    label: "SYSTEMS",
    items: [
      { href: "/visibility", label: "Rank proof", icon: Eye },
      { href: "/progress", label: "Visual progress", icon: MonitorUp },
      { href: "/settings", label: "Connections", icon: Settings },
    ],
  },
];
export function AppShell({ children }: { children: React.ReactNode }) {
  const path = usePathname();
  const current = groups.flatMap((g) => g.items).find((i) => i.href === path);
  return (
    <div className="command-shell">
      <a className="skip-link" href="#command-content">Skip to content</a>
      <aside className="command-nav">
        <Link href="/" className="brand">
          <span className="brand-mark">
            <Crosshair size={23} />
          </span>
          <span>
            <strong>247ROI</strong>
            <small>COMMAND CENTER</small>
          </span>
        </Link>
        <nav aria-label="Main navigation">
          {groups.map((g) => (
            <div className="nav-group" key={g.label}>
              <p>{g.label}</p>
              {g.items.map((i) => (
                <Link
                  key={i.href}
                  href={i.href}
                  aria-current={path === i.href ? "page" : undefined}
                  className={path === i.href ? "nav-link selected" : "nav-link"}
                >
                  <i.icon size={17} />
                  {i.label}
                </Link>
              ))}
            </div>
          ))}
        </nav>
        <div className="nav-foot">
          Orders → decisions → evidence
          <Link
            href="https://www.get247roi.com"
            target="_blank"
            rel="noreferrer"
          >
            Open public site <ArrowUpRight size={14} />
          </Link>
        </div>
      </aside>
      <div className="command-main">
        <header className="command-top">
          <span>
            <span className="muted">247ROI / </span>
            {current?.label ?? "Intelligence"}
          </span>
          <span className="top-note">
            Operator workspace
          </span>
        </header>
        <details className="mobile-menu" key={path}>
          <summary>Navigate · {current?.label ?? "Command"}</summary>
          <nav aria-label="Mobile navigation">
            {groups
              .flatMap((g) => g.items)
              .map((i) => (
                <Link
                  key={i.href}
                  href={i.href}
                  aria-current={path === i.href ? "page" : undefined}
                >
                  {i.label}
                </Link>
              ))}
          </nav>
        </details>
        <main
          id="command-content"
          tabIndex={-1}
          className={`command-content ${["/social", "/seo", "/visibility", "/progress", "/settings"].includes(path) ? "legacy-module" : ""}`}
        >
          {children}
        </main>
      </div>
    </div>
  );
}
