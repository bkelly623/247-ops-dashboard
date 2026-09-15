import { workColumns, type CommandWorkItem } from "@/data/command-center-state";
export function validateOrder(input: unknown): CommandWorkItem {
  if (!input || typeof input !== "object" || Array.isArray(input))
    throw new Error("Order is required.");
  const r = input as Record<string, unknown>;
  const text = (key: string, max = 2000, required = true) => {
    const v = r[key];
    if (typeof v !== "string" || (required && !v.trim()) || v.length > max)
      throw new Error(
        `Check ${key}: ${required ? "required, " : ""}maximum ${max} characters.`,
      );
    return v.trim();
  };
  const item = {
    id: text("id", 120),
    title: text("title", 200),
    lane: text("lane", 30),
    status: text("status", 30),
    priority: text("priority", 2),
    why: text("why"),
    expectedImpact: text("expectedImpact"),
    proofRequired: text("proofRequired"),
    owner: text("owner", 120),
    dueOrCadence: text("dueOrCadence", 200),
    metricToWatch: text("metricToWatch"),
    completionEvidence:
      r.completionEvidence == null
        ? ""
        : text("completionEvidence", 4000, false),
    links: r.links,
  } as CommandWorkItem;
  if (!/^[a-zA-Z0-9_-]+$/.test(item.id)) throw new Error("Invalid order ID.");
  if (
    ![
      "SEO",
      "Authority",
      "Conversion",
      "Measurement",
      "Content",
      "Ops",
      "Prospecting",
      "Engineering",
    ].includes(item.lane) ||
    !workColumns.includes(item.status) ||
    !["P0", "P1", "P2", "P3"].includes(item.priority)
  )
    throw new Error("Invalid lane, status, or priority.");
  if (
    !Array.isArray(item.links) ||
    item.links.length > 20 ||
    item.links.some((l) => typeof l !== "string" || l.length > 500)
  )
    throw new Error("Use at most 20 references of 500 characters each.");
  if (item.status === "Done" && !item.completionEvidence)
    throw new Error("Record completion evidence before marking an order Done.");
  return item;
}
