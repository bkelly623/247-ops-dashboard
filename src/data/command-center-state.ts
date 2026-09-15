import rawState from "@/data/command-center-state.json";

export type WorkLane =
  "SEO" | "Authority" | "Conversion" | "Measurement" | "Content" | "Ops";
export type WorkStatus =
  | "Backlog"
  | "This Week"
  | "In Progress"
  | "Waiting / Blocked"
  | "Needs B Approval"
  | "Done";
export type WorkPriority = "P0" | "P1" | "P2" | "P3";

export type CommandWorkItem = {
  id: string;
  title: string;
  lane: WorkLane;
  status: WorkStatus;
  priority: WorkPriority;
  why: string;
  expectedImpact: string;
  proofRequired: string;
  owner: string;
  dueOrCadence: string;
  links: string[];
  metricToWatch: string;
  completionEvidence?: string;
  completedAt?: string;
};

export type AutomationRecord = {
  id: string;
  name: string;
  status: "Useful" | "Noisy" | "Candidate" | "Retire";
  schedule: string;
  purpose: string;
  lastRan: string;
  lastOutput: string;
  nextPlannedRun: string;
  nextPlannedWork: string;
  retireRule: string;
};

export type DecisionRecord = {
  id: string;
  decision: string;
  reason: string;
  date: string;
  status: "Locked" | "Open";
  reopenCondition: string;
};

export type SeoPipelineItem = {
  id: string;
  page: string;
  targetQuery: string;
  status: string;
  impressions: number | null;
  clicks: number | null;
  averagePosition: number | null;
  nextAction: string;
  linkedWorkItem: string;
};

export type AuthorityPipelineItem = {
  id: string;
  target: string;
  type: string;
  status: string;
  risk: "Low" | "Medium" | "High";
  approvalNeeded: boolean;
  requiredAssets: string;
  nextAction: string;
  proof: string;
};

export type VisibilityPipelineItem = {
  id: string;
  prompt: string;
  engine: string;
  appears: boolean | null;
  competitorsCited: string;
  citedDomains: string;
  nextFix: string;
  linkedWorkItem: string;
};

export type CommandState = {
  updatedAt: string;
  ownerSnapshot: {
    currentBottleneck: string;
    nextMove: string;
    changedSinceLastWeek: string[];
    authority: {
      completed: number;
      planned: number;
      read: string;
    };
  };
  workItems: CommandWorkItem[];
  automation: AutomationRecord[];
  decisions: DecisionRecord[];
  pipelines: {
    seo: SeoPipelineItem[];
    authority: AuthorityPipelineItem[];
    visibility: VisibilityPipelineItem[];
  };
};

export const commandStateSeed = rawState as CommandState;
export const commandState = commandStateSeed;

export const workColumns: WorkStatus[] = [
  "Backlog",
  "This Week",
  "In Progress",
  "Waiting / Blocked",
  "Needs B Approval",
  "Done",
];
