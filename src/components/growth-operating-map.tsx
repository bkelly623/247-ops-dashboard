export function GrowthOperatingMap() {
  return (
    <div className="overflow-x-auto rounded-lg border border-white/10 bg-black p-4">
      <svg viewBox="0 0 1120 720" className="h-auto min-w-[1040px]" role="img" aria-label="247ROI growth operating system map">
        <defs>
          <marker id="map-arrow" markerWidth="10" markerHeight="10" refX="8" refY="3" orient="auto" markerUnits="strokeWidth">
            <path d="M0,0 L0,6 L8,3 z" fill="#9b927f" />
          </marker>
        </defs>

        <rect x="24" y="34" width="1072" height="114" rx="10" fill="none" stroke="#2a2a2a" />
        <text x="48" y="64" fill="#ff6a2a" fontSize="12" fontWeight="700">SOURCE OF TRUTH</text>
        {[
          ["Strategy", "offer, doctrine, ICP", 48],
          ["Live metrics", "GSC, events, audits", 306],
          ["Scorecard", "standing and blockers", 564],
          ["Control plane", "queue and rules", 822],
        ].map(([title, note, x]) => (
          <g key={title}>
            <rect x={Number(x)} y="84" width="210" height="46" rx="7" fill="#111" stroke="#3a3a3a" />
            <text x={Number(x) + 18} y="105" fill="#fff" fontSize="14" fontWeight="700">{title}</text>
            <text x={Number(x) + 18} y="122" fill="#c9c9c9" fontSize="12">{note}</text>
          </g>
        ))}
        <path d="M258 107 H306 M516 107 H564 M774 107 H822" stroke="#9b927f" strokeWidth="2" markerEnd="url(#map-arrow)" />

        <rect x="24" y="188" width="1072" height="154" rx="10" fill="none" stroke="#2a2a2a" />
        <text x="48" y="218" fill="#ff6a2a" fontSize="12" fontWeight="700">QUEUE</text>
        {[
          ["Measurement", "AI baseline, GSC snapshots", 48],
          ["Acquisition", "SEO pages, internal links", 306],
          ["Authority", "profiles, partners, proof", 564],
          ["Conversion", "audit proof, CTA paths", 822],
        ].map(([title, note, x]) => (
          <g key={title}>
            <rect x={Number(x)} y="238" width="210" height="70" rx="7" fill="#161616" stroke="#3a3a3a" />
            <text x={Number(x) + 18} y="263" fill="#fff" fontSize="15" fontWeight="700">{title}</text>
            <text x={Number(x) + 18} y="284" fill="#c9c9c9" fontSize="12">{note}</text>
          </g>
        ))}
        <path d="M927 130 V172 C927 188 927 206 927 238" stroke="#9b927f" strokeWidth="2" markerEnd="url(#map-arrow)" />
        <path d="M927 172 H153 V238 M927 172 H411 V238 M927 172 H669 V238" stroke="#6f675a" strokeWidth="1.6" strokeDasharray="6 5" markerEnd="url(#map-arrow)" />

        <rect x="24" y="382" width="1072" height="152" rx="10" fill="none" stroke="#2a2a2a" />
        <text x="48" y="412" fill="#ff6a2a" fontSize="12" fontWeight="700">EXECUTION</text>
        {[
          ["Athena orchestrates", "strategy, edits, verification", 48],
          ["Temporary agents", "bounded research batches", 320],
          ["Daily cron", "one useful action", 592],
          ["Weekly report", "shipped, blocked, next", 822],
        ].map(([title, note, x]) => (
          <g key={title}>
            <rect x={Number(x)} y="434" width={title === "Weekly report" ? 226 : 220} height="66" rx="7" fill={title === "Weekly report" ? "#181426" : "#1a1510"} stroke="#3a3a3a" />
            <text x={Number(x) + 18} y="460" fill="#fff" fontSize="15" fontWeight="700">{title}</text>
            <text x={Number(x) + 18} y="482" fill="#c9c9c9" fontSize="12">{note}</text>
          </g>
        ))}
        <path d="M153 308 V434 M411 308 V360 C411 394 236 398 194 434 M669 308 V360 C669 396 532 400 492 434 M927 308 V434" stroke="#9b927f" strokeWidth="2" markerEnd="url(#map-arrow)" />
        <path d="M268 467 H320 M540 467 H592 M812 467 H822" stroke="#9b927f" strokeWidth="2" markerEnd="url(#map-arrow)" />

        <rect x="24" y="574" width="1072" height="104" rx="10" fill="none" stroke="#2a2a2a" />
        <text x="48" y="604" fill="#ff6a2a" fontSize="12" fontWeight="700">APPROVAL AND FEEDBACK</text>
        <rect x="48" y="624" width="314" height="34" rx="7" fill="#2a1310" stroke="#55312a" />
        <text x="66" y="646" fill="#f7d2cb" fontSize="12">Ask B before outreach, submissions, paid actions, or public claims.</text>
        <rect x="408" y="624" width="276" height="34" rx="7" fill="#102016" stroke="#2e5138" />
        <text x="426" y="646" fill="#cdebd5" fontSize="12">Update dashboard, scorecard, control plane, and memory.</text>
        <rect x="730" y="624" width="318" height="34" rx="7" fill="#141c2a" stroke="#2d3d56" />
        <text x="748" y="646" fill="#d7e5ff" fontSize="12">Next run starts from state, not chat history.</text>
        <path d="M158 500 V624 M430 500 V624 M702 500 V604 C702 616 628 618 594 624 M935 500 V604 C935 616 892 618 882 624" stroke="#9b927f" strokeWidth="2" markerEnd="url(#map-arrow)" />
      </svg>
    </div>
  );
}
