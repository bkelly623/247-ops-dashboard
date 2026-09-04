"use client";

import { useMemo, useState } from "react";

type SearchConsoleRow = {
  keys: string[];
  clicks: number;
  impressions: number;
  ctr: number;
  position: number;
};

type SeriesPoint = {
  date: string;
  position: number;
  impressions: number;
  clicks: number;
};

function formatDate(value: string) {
  const [, month, day] = value.split("-");
  return `${month}/${day}`;
}

function getTone(position: number) {
  if (position <= 10) return "text-[#86efac]";
  if (position <= 30) return "text-[#ffcf8a]";
  return "text-[#ff8a3d]";
}

export function KeywordRankChart({
  rows,
  fallbackQuery,
}: {
  rows: SearchConsoleRow[];
  fallbackQuery?: string;
}) {
  const grouped = useMemo(() => {
    const map = new Map<string, SeriesPoint[]>();

    rows.forEach((row) => {
      const date = row.keys[0];
      const query = row.keys[1];
      if (!date || !query) return;

      const current = map.get(query) ?? [];
      current.push({
        date,
        position: row.position,
        impressions: row.impressions,
        clicks: row.clicks,
      });
      map.set(query, current);
    });

    return [...map.entries()]
      .map(([query, points]) => ({
        query,
        points: points.sort((a, b) => a.date.localeCompare(b.date)),
        impressions: points.reduce((sum, point) => sum + point.impressions, 0),
        bestPosition: Math.min(...points.map((point) => point.position)),
        latestPosition: points.at(-1)?.position ?? 0,
      }))
      .sort((a, b) => b.impressions - a.impressions || a.bestPosition - b.bestPosition)
      .slice(0, 6);
  }, [rows]);

  const [selectedQuery, setSelectedQuery] = useState(fallbackQuery ?? grouped[0]?.query ?? "");
  const selected = grouped.find((item) => item.query === selectedQuery) ?? grouped[0];

  if (!selected || selected.points.length === 0) {
    return (
      <div className="rounded-md border border-white/10 bg-white/5 p-5 text-sm leading-6 text-[#c9c9c9]">
        Search Console has not returned enough daily query data for a rank chart yet.
      </div>
    );
  }

  const points = selected.points;
  const maxPosition = Math.max(100, ...points.map((point) => point.position));
  const width = 640;
  const height = 240;
  const plotTop = 20;
  const plotBottom = 205;
  const plotLeft = 28;
  const plotRight = 612;
  const xStep = points.length > 1 ? (plotRight - plotLeft) / (points.length - 1) : 0;
  const coords = points.map((point, index) => {
    const cappedPosition = Math.min(point.position, maxPosition);
    const y = plotTop + (cappedPosition / maxPosition) * (plotBottom - plotTop);
    return {
      ...point,
      x: plotLeft + index * xStep,
      y,
    };
  });
  const path = coords.map((point, index) => `${index === 0 ? "M" : "L"} ${point.x} ${point.y}`).join(" ");
  const areaPath = `${path} L ${coords.at(-1)?.x ?? plotLeft} ${plotBottom} L ${plotLeft} ${plotBottom} Z`;

  return (
    <div className="rounded-md border border-white/10 bg-black p-4">
      <div className="mb-4 flex flex-col gap-3 lg:flex-row lg:items-start lg:justify-between">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[#ff6a2a]">
            Ranking stock chart
          </p>
          <h3 className="mt-1 text-base font-semibold leading-6 text-white">{selected.query}</h3>
        </div>
        <div className="flex flex-wrap gap-2">
          {grouped.map((item) => (
            <button
              key={item.query}
              type="button"
              onClick={() => setSelectedQuery(item.query)}
              className={`rounded border px-3 py-2 text-xs font-semibold transition ${
                item.query === selected.query
                  ? "border-[#ff5a1f] bg-[#ff5a1f] text-white"
                  : "border-white/10 bg-white/5 text-[#d6d6d6] hover:border-[#ff5a1f]/60"
              }`}
            >
              {item.query}
            </button>
          ))}
        </div>
      </div>

      <div className="overflow-hidden rounded-md border border-white/10 bg-[#111111]">
        <svg viewBox={`0 0 ${width} ${height}`} role="img" className="h-72 w-full">
          <defs>
            <linearGradient id="rankFill" x1="0" x2="0" y1="0" y2="1">
              <stop offset="0%" stopColor="#ff5a1f" stopOpacity="0.42" />
              <stop offset="100%" stopColor="#ff5a1f" stopOpacity="0.03" />
            </linearGradient>
          </defs>
          {[10, 30, 60, 100].map((line) => {
            const y = plotTop + (line / maxPosition) * (plotBottom - plotTop);
            return (
              <g key={line}>
                <line x1={plotLeft} x2={plotRight} y1={y} y2={y} stroke="rgba(255,255,255,0.1)" />
                <text x={plotRight + 8} y={y + 4} fill="#8a8a8a" fontSize="11">
                  {line}
                </text>
              </g>
            );
          })}
          <path d={areaPath} fill="url(#rankFill)" />
          <path d={path} fill="none" stroke="#ff5a1f" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
          {coords.map((point) => (
            <g key={`${point.date}-${point.position}`}>
              <circle cx={point.x} cy={point.y} r="5" fill="#ffffff" stroke="#ff5a1f" strokeWidth="3" />
              <title>
                {point.date}: avg position {point.position.toFixed(1)}, {point.impressions} impressions
              </title>
            </g>
          ))}
          {coords.map((point, index) =>
            index % Math.ceil(Math.max(coords.length / 5, 1)) === 0 || index === coords.length - 1 ? (
              <text key={point.date} x={point.x - 14} y="230" fill="#8a8a8a" fontSize="11">
                {formatDate(point.date)}
              </text>
            ) : null,
          )}
        </svg>
      </div>

      <div className="mt-4 grid gap-3 sm:grid-cols-3">
        <div className="rounded-md border border-white/10 bg-white/5 p-3">
          <p className="text-xs uppercase tracking-[0.14em] text-[#ff6a2a]">Latest</p>
          <p className={`mt-1 text-2xl font-semibold ${getTone(selected.latestPosition)}`}>
            {selected.latestPosition.toFixed(1)}
          </p>
        </div>
        <div className="rounded-md border border-white/10 bg-white/5 p-3">
          <p className="text-xs uppercase tracking-[0.14em] text-[#ff6a2a]">Best</p>
          <p className={`mt-1 text-2xl font-semibold ${getTone(selected.bestPosition)}`}>
            {selected.bestPosition.toFixed(1)}
          </p>
        </div>
        <div className="rounded-md border border-white/10 bg-white/5 p-3">
          <p className="text-xs uppercase tracking-[0.14em] text-[#ff6a2a]">Impressions</p>
          <p className="mt-1 text-2xl font-semibold text-white">{selected.impressions}</p>
        </div>
      </div>
    </div>
  );
}
