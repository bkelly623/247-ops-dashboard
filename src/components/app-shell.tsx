import Link from "next/link";
import type React from "react";
import {
  BarChart3,
  Bot,
  CircleDot,
  Eye,
  Flame,
  LayoutDashboard,
  ListChecks,
  MonitorUp,
  Search,
  Settings,
} from "lucide-react";

const navItems = [
  { href: "/", label: "Snapshot", icon: LayoutDashboard },
  { href: "/work", label: "Work Ledger", icon: ListChecks },
  { href: "/social", label: "Social", icon: Flame },
  { href: "/seo", label: "SEO / Visibility", icon: Search },
  { href: "/visibility", label: "Rank Proof", icon: Eye },
  { href: "/progress", label: "Visual Progress", icon: MonitorUp },
  { href: "/settings", label: "Settings", icon: Settings },
];

export function AppShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-[#050505] text-white">
      <div className="mx-auto flex min-h-screen w-full max-w-[1500px]">
        <aside className="hidden w-72 shrink-0 border-r border-white/10 bg-black text-white lg:block">
          <div className="flex h-full flex-col px-5 py-6">
            <Link href="/" className="flex items-center gap-3">
              <div className="flex size-10 items-center justify-center rounded-md bg-[#ff5a1f] text-white shadow-[0_0_28px_rgba(255,90,31,0.32)]">
                <Bot size={22} strokeWidth={2.4} />
              </div>
              <div>
                <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[#ff6a2a]">
                  247ROI
                </p>
                <p className="text-lg font-semibold">Ops Dashboard</p>
              </div>
            </Link>

            <nav className="mt-10 space-y-1">
              {navItems.map((item) => {
                const Icon = item.icon;

                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className="flex items-center gap-3 rounded-md px-3 py-3 text-sm font-medium text-[#d6d6d6] transition hover:bg-[#ff5a1f]/14 hover:text-white"
                  >
                    <Icon size={18} />
                    {item.label}
                  </Link>
                );
              })}
            </nav>

            <div className="mt-auto rounded-md border border-[#ff5a1f]/30 bg-[#ff5a1f]/10 p-4">
              <div className="flex items-center gap-2 text-sm font-semibold text-[#f7f1e3]">
                <CircleDot size={16} className="text-[#ff6a2a]" />
              Build Status
              </div>
              <p className="mt-2 text-sm leading-6 text-[#c9c9c9]">
                Rebuilt around work tracking, proof, blockers, and visual
                progress for 247ROI.
              </p>
            </div>
          </div>
        </aside>

        <main className="flex min-w-0 flex-1 flex-col">
          <header className="sticky top-0 z-20 border-b border-white/10 bg-black/92 px-4 py-3 backdrop-blur lg:hidden">
            <div className="flex items-center justify-between">
              <Link href="/" className="flex items-center gap-2 font-semibold">
                <span className="flex size-9 items-center justify-center rounded-md bg-[#ff5a1f] text-white">
                  <Bot size={20} />
                </span>
                247 Ops
              </Link>
              <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.14em] text-[#ff6a2a]">
                <BarChart3 size={16} />
                Command
              </div>
            </div>
            <nav className="mt-3 flex gap-2 overflow-x-auto">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="whitespace-nowrap rounded-md border border-white/10 bg-white/5 px-3 py-2 text-sm font-medium"
                >
                  {item.label}
                </Link>
              ))}
            </nav>
          </header>

          <div className="px-4 py-5 sm:px-6 lg:px-8 lg:py-8">{children}</div>
        </main>
      </div>
    </div>
  );
}
