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
} from "lucide-react";
const groups = [
  {
    label: "COMMAND",
    items: [
      { href: "/", label: "Situation room", icon: LayoutDashboard },
      { href: "/work", label: "Operations", icon: ListChecks },
      { href: "/decisions", label: "Strategy & doctrine", icon: Compass },
    ],
  },
  {
    label: "FRONTS",
    items: [
      { href: "/pipeline/seo", label: "Search acquisition", icon: Search },
      {
        href: "/pipeline/authority",
        label: "Authority & trust",
        icon: ShieldCheck,
      },
      { href: "/pipeline/visibility", label: "AI visibility", icon: Eye },
      { href: "/pipeline/conversion", label: "Conversion", icon: Filter },
      { href: "/social", label: "Social operations", icon: Radio },
    ],
  },
  {
    label: "SYSTEMS",
    items: [
      { href: "/automation", label: "Automation watch", icon: Workflow },
      { href: "/settings", label: "Connections", icon: Settings },
    ],
  },
];
export function AppShell({ children }: { children: React.ReactNode }) {
  const path = usePathname();
  const current = groups.flatMap((g) => g.items).find((i) => i.href === path);
  return (
    <div className="command-shell">
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
          <span className="signal-dot" /> Strategy → execution → evidence
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
            Owner operations <span className="signal-dot" />
          </span>
        </header>
        <details className="mobile-menu">
          <summary>Navigate · {current?.label ?? "Command"}</summary>
          <nav>
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
        <main className="command-content">{children}</main>
      </div>
    </div>
  );
}
