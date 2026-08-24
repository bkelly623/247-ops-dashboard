import Link from "next/link";
import type React from "react";
import {
  BarChart3,
  Bot,
  CircleDot,
  Flame,
  LayoutDashboard,
  Search,
  Settings,
} from "lucide-react";

const navItems = [
  { href: "/", label: "Overview", icon: LayoutDashboard },
  { href: "/social", label: "Social", icon: Flame },
  { href: "/seo", label: "SEO / Visibility", icon: Search },
  { href: "/settings", label: "Settings", icon: Settings },
];

export function AppShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-[#f3f0e8] text-[#171511]">
      <div className="mx-auto flex min-h-screen w-full max-w-[1500px]">
        <aside className="hidden w-72 shrink-0 border-r border-[#d8d1c2] bg-[#111111] text-[#f7f1e3] lg:block">
          <div className="flex h-full flex-col px-5 py-6">
            <Link href="/" className="flex items-center gap-3">
              <div className="flex size-10 items-center justify-center rounded-md bg-[#d6a034] text-[#111111]">
                <Bot size={22} strokeWidth={2.4} />
              </div>
              <div>
                <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[#d6a034]">
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
                    className="flex items-center gap-3 rounded-md px-3 py-3 text-sm font-medium text-[#ded6c6] transition hover:bg-white/8 hover:text-white"
                  >
                    <Icon size={18} />
                    {item.label}
                  </Link>
                );
              })}
            </nav>

            <div className="mt-auto rounded-md border border-[#3a352d] bg-[#1c1b18] p-4">
              <div className="flex items-center gap-2 text-sm font-semibold text-[#f7f1e3]">
                <CircleDot size={16} className="text-[#d6a034]" />
                Build Status
              </div>
              <p className="mt-2 text-sm leading-6 text-[#b9b09f]">
                Initial command-center scaffold active. Social module is the
                first production surface.
              </p>
            </div>
          </div>
        </aside>

        <main className="flex min-w-0 flex-1 flex-col">
          <header className="sticky top-0 z-20 border-b border-[#d8d1c2] bg-[#f3f0e8]/92 px-4 py-3 backdrop-blur lg:hidden">
            <div className="flex items-center justify-between">
              <Link href="/" className="flex items-center gap-2 font-semibold">
                <span className="flex size-9 items-center justify-center rounded-md bg-[#111111] text-[#d6a034]">
                  <Bot size={20} />
                </span>
                247 Ops
              </Link>
              <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.14em] text-[#7a6e5b]">
                <BarChart3 size={16} />
                Command
              </div>
            </div>
            <nav className="mt-3 flex gap-2 overflow-x-auto">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="whitespace-nowrap rounded-md border border-[#d8d1c2] px-3 py-2 text-sm font-medium"
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
