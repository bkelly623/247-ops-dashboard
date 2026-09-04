import { cn } from "@/lib/utils";

type Tone = "good" | "warn" | "danger" | "gold" | "neutral";

const toneClasses: Record<Tone, string> = {
  good: "bg-[#22c55e]",
  warn: "bg-[#ff8a3d]",
  danger: "bg-[#ef4444]",
  gold: "bg-[#ff5a1f]",
  neutral: "bg-white/35",
};

export function HorizontalBar({
  label,
  value,
  max = 10,
  detail,
  tone = "gold",
}: {
  label: string;
  value: number;
  max?: number;
  detail?: string;
  tone?: Tone;
}) {
  const width = max > 0 ? Math.min(Math.max((value / max) * 100, 0), 100) : 0;

  return (
    <div>
      <div className="mb-2 flex items-center justify-between gap-3 text-sm">
        <span className="font-semibold text-white">{label}</span>
        <span className="shrink-0 text-[#c9c9c9]">{detail ?? `${value}/${max}`}</span>
      </div>
      <div className="h-3 overflow-hidden rounded-full bg-white/10">
        <div className={cn("h-full rounded-full", toneClasses[tone])} style={{ width: `${width}%` }} />
      </div>
    </div>
  );
}

export function DonutMetric({
  label,
  value,
  max,
  caption,
  tone = "gold",
}: {
  label: string;
  value: number;
  max: number;
  caption: string;
  tone?: Tone;
}) {
  const percent = max > 0 ? Math.min(Math.max((value / max) * 100, 0), 100) : 0;
  const color =
    tone === "good" ? "#22c55e" : tone === "warn" ? "#ff8a3d" : tone === "danger" ? "#ef4444" : "#ff5a1f";

  return (
    <div className="flex items-center gap-4 rounded-md border border-white/10 bg-white/5 p-4">
      <div
        className="grid size-24 shrink-0 place-items-center rounded-full"
        style={{ background: `conic-gradient(${color} ${percent}%, rgba(255,255,255,0.1) 0)` }}
      >
        <div className="grid size-16 place-items-center rounded-full bg-[#111111] text-lg font-semibold text-white">
          {value}
        </div>
      </div>
      <div>
        <p className="font-semibold text-white">{label}</p>
        <p className="mt-1 text-sm leading-6 text-[#c9c9c9]">{caption}</p>
      </div>
    </div>
  );
}

export function SegmentedBar({
  segments,
}: {
  segments: Array<{ label: string; value: number; tone: Tone }>;
}) {
  const total = segments.reduce((sum, segment) => sum + segment.value, 0);

  return (
    <div>
      <div className="flex h-4 overflow-hidden rounded-full bg-white/10">
        {segments.map((segment) => (
          <div
            key={segment.label}
            className={toneClasses[segment.tone]}
            style={{ width: total > 0 ? `${(segment.value / total) * 100}%` : "0%" }}
          />
        ))}
      </div>
      <div className="mt-3 grid gap-2 sm:grid-cols-3">
        {segments.map((segment) => (
          <div key={segment.label} className="flex items-center gap-2 text-sm text-[#c9c9c9]">
            <span className={cn("size-3 rounded-sm", toneClasses[segment.tone])} />
            <span className="font-semibold text-white">{segment.value}</span>
            <span>{segment.label}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
