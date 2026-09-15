/** Shared directory, not a replacement for agent-owned modules. */
export const agentSections = [
  {
    id: "hermes",
    name: "Hermes",
    role: "Social & media",
    href: "/social",
    description:
      "Publishing, production, hooks, experiments, cleanup, and creative verdicts.",
    components: [
      "Publishing plan",
      "PostFast control",
      "Production pipeline",
      "Hook Lab",
      "Asset Burn System",
      "Content Kill Room",
      "Platform Mix",
      "Experiment Board",
    ],
    source:
      "Existing social module · recorded planning data, not live publishing telemetry",
    links: [{ label: "Social command center", href: "/social" }],
  },
  {
    id: "athena",
    name: "Athena",
    role: "Growth, search & web",
    href: "/seo",
    description:
      "Search strategy, website growth, authority, AI visibility, conversion, and evidence.",
    components: [
      "Keyword portfolio",
      "Rank chart",
      "Snapshot history",
      "Offer strategy",
      "Long-tail campaigns",
      "Authority pipeline",
      "Live query table",
      "Page performance",
    ],
    source:
      "Existing growth module · connected search data plus recorded plans",
    links: [
      { label: "Growth command center", href: "/seo" },
      { label: "Rank proof", href: "/visibility" },
      { label: "Visual progress", href: "/progress" },
    ],
  },
] as const;
