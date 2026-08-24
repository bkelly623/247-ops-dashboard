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
        "rounded-lg border border-[#d8d1c2] bg-[#fffaf0] p-5 shadow-[0_1px_0_rgba(17,17,17,0.04)]",
        className,
      )}
    >
      <div className="mb-4">
        {eyebrow ? (
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#8b6a22]">
            {eyebrow}
          </p>
        ) : null}
        <h2 className="mt-1 text-lg font-semibold text-[#171511]">{title}</h2>
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
        tone === "neutral" && "bg-[#ece5d7] text-[#615746]",
        tone === "good" && "bg-[#dce8d6] text-[#2f5a2e]",
        tone === "warn" && "bg-[#f5e5c8] text-[#76500c]",
        tone === "danger" && "bg-[#f1d7d2] text-[#7e2c22]",
        tone === "gold" && "bg-[#d6a034] text-[#171511]",
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
    <div className="mb-7 flex flex-col gap-4 border-b border-[#d8d1c2] pb-6 lg:flex-row lg:items-end lg:justify-between">
      <div>
        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#8b6a22]">
          {eyebrow}
        </p>
        <h1 className="mt-2 max-w-4xl text-3xl font-semibold tracking-normal text-[#171511] sm:text-4xl">
          {title}
        </h1>
        <p className="mt-3 max-w-3xl text-base leading-7 text-[#665d4e]">
          {description}
        </p>
      </div>
      {action ? <div className="shrink-0">{action}</div> : null}
    </div>
  );
}
