import type React from "react";
import { cn } from "@/lib/utils";

export function DashboardCard({
  title,
  eyebrow,
  children,
  className,
}: {
  title: string;
  eyebrow?: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <section
      className={cn(
        "rounded-lg border border-white/10 bg-[#111111] p-5 text-white shadow-[0_18px_60px_rgba(0,0,0,0.28)]",
        className,
      )}
    >
      <div className="mb-4">
        {eyebrow ? (
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#ff6a2a]">
            {eyebrow}
          </p>
        ) : null}
        <h2 className="mt-1 text-lg font-semibold text-white">{title}</h2>
      </div>
      {children}
    </section>
  );
}

export function StatusBadge({
  children,
  tone = "neutral",
}: {
  children: React.ReactNode;
  tone?: "neutral" | "good" | "warn" | "danger" | "gold";
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded px-2 py-1 text-xs font-semibold",
        tone === "neutral" && "bg-white/10 text-[#d6d6d6]",
        tone === "good" && "bg-[#16a34a]/18 text-[#86efac]",
        tone === "warn" && "bg-[#ff8a3d]/18 text-[#ffb37a]",
        tone === "danger" && "bg-[#ef4444]/18 text-[#fca5a5]",
        tone === "gold" && "bg-[#ff5a1f] text-white",
      )}
    >
      {children}
    </span>
  );
}

export function PageHeader({
  eyebrow,
  title,
  description,
  action,
}: {
  eyebrow: string;
  title: string;
  description: string;
  action?: React.ReactNode;
}) {
  return (
    <div className="mb-7 flex flex-col gap-4 border-b border-white/10 pb-6 lg:flex-row lg:items-end lg:justify-between">
      <div>
        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#ff6a2a]">
          {eyebrow}
        </p>
        <h1 className="mt-2 max-w-4xl text-3xl font-semibold tracking-normal text-white sm:text-4xl">
          {title}
        </h1>
        <p className="mt-3 max-w-3xl text-base leading-7 text-[#c9c9c9]">
          {description}
        </p>
      </div>
      {action ? <div className="shrink-0">{action}</div> : null}
    </div>
  );
}
