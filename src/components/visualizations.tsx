import { cn } from "@/lib/utils";

type Tone = "good" | "warn" | "danger" | "gold" | "neutral";

const toneClasses: Record<Tone, string> = {
  good: "bg-[#477844]",
  warn: "bg-[#c7862b]",
  danger: "bg-[#b85646]",
  gold: "bg-[#d6a034]",
  neutral: "bg-[#9c917f]",
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
        <span className="font-semibold text-[#171511]">{label}</span>
        <span className="shrink-0 text-[#665d4e]">{detail ?? `${value}/${max}`}</span>
      </div>
      <div className="h-3 overflow-hidden rounded-full bg-[#ece5d7]">
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
    tone === "good" ? "#477844" : tone === "warn" ? "#c7862b" : tone === "danger" ? "#b85646" : "#d6a034";

  return (
    <div className="flex items-center gap-4 rounded-md border border-[#ded6c8] bg-white/55 p-4">
      <div
        className="grid size-24 shrink-0 place-items-center rounded-full"
        style={{ background: `conic-gradient(${color} ${percent}%, #ece5d7 0)` }}
      >
        <div className="grid size-16 place-items-center rounded-full bg-[#fffaf0] text-lg font-semibold text-[#171511]">
          {value}
        </div>
      </div>
      <div>
        <p className="font-semibold text-[#171511]">{label}</p>
        <p className="mt-1 text-sm leading-6 text-[#665d4e]">{caption}</p>
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
      <div className="flex h-4 overflow-hidden rounded-full bg-[#ece5d7]">
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
          <div key={segment.label} className="flex items-center gap-2 text-sm text-[#665d4e]">
            <span className={cn("size-3 rounded-sm", toneClasses[segment.tone])} />
            <span className="font-semibold text-[#171511]">{segment.value}</span>
            <span>{segment.label}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

