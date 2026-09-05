/**
 * Level 2 — Application. Verbatim learner-facing copy, the readiness-scorecard
 * anchors, the three options' numbers, and the pure calculation functions that
 * drive the panels, the comparison table, and the exported Calculation Note.
 * No React here — keep this importable from the server page too.
 */

import type { IconKey } from "@/lib/module3";

export const LEVEL2_TITLE = "Level 2 — Application: Where Should Solenne Move First?";

export const PREREQ = {
  message:
    "Complete Level 1 first — this task builds directly on your Diagnostic Note.",
  cta: "Go to Level 1",
  href: "/module-3/level-1",
} as const;

export const STORY2 = {
  kicker: "The brief",
  paragraphs: [
    "Your Diagnostic Note reached Solenne's CIO. The response was direct: \"You've told me what's wrong. Now tell me what to do about it — and what it will cost.\"",
    "Budget and staff time are limited. The board expects a visible result within the year. Client sustainability demands keep increasing. Data on lifecycle impact and supply chain origin is still incomplete. Procurement is worried that new criteria will slow purchasing down and add complexity they don't have capacity for.",
    "You have three moves available. You cannot fund all three this year. Decide which one goes first — and be ready to say, in numbers, what it costs and what it buys.",
  ],
  referenceTitle: "Your Diagnostic Note",
  referenceHint: "From Level 1 — expand to review. Reviewing it unlocks two locked sliders.",
  gapsLabel: "Three biggest strategic gaps",
  opsLabel: "Operational weakness vs. strategic deficit",
} as const;

export type Level2Card = {
  id: string;
  icon: IconKey;
  title: string;
  body: string;
  usedIn: string;
};

export const MATERIAL2: { kicker: string; title: string; intro: string; cards: Level2Card[] } = {
  kicker: "Study material",
  title: "Five tools for the decision",
  intro:
    "Each card is a tool you use in the task below — the label shows where. Open the one you need as you go.",
  cards: [
    {
      id: "l2m1",
      icon: "target",
      title: "Ready to act vs. important",
      body: "An area can be strategically critical and still not be where you should move first if the organization isn't ready to execute there yet. Readiness and importance are two different questions — score them separately.",
      usedIn: "Readiness Scorecard",
    },
    {
      id: "l2m2",
      icon: "lever",
      title: "Why procurement compounds",
      body: "A one-time investment fixes one instance. A binding procurement criterion applies to every purchase after it — its impact compounds over each future cycle, which is why it scores differently on long-term leverage than it first appears to.",
      usedIn: "Option B",
    },
    {
      id: "l2m3",
      icon: "coins",
      title: "Diminishing returns in hardware investment",
      body: "Replacing the most energy-inefficient devices first yields the largest CO2 gain per euro. Past a certain volume, you're replacing devices that were already reasonably efficient — the same euro buys less.",
      usedIn: "Option C",
    },
    {
      id: "l2m4",
      icon: "cart",
      title: "Reading a price premium correctly",
      body: "A stricter supplier requirement can raise short-term procurement cost while lowering total lifecycle cost. The two numbers answer different questions — don't let one silently stand in for the other.",
      usedIn: "Option B",
    },
    {
      id: "l2m5",
      icon: "gavel",
      title: "Why single moves still need governance",
      body: "A strategy document has no direct, measurable output this year. Its value is that it makes every later decision faster and more consistent — without it, options B and C are one-off actions with no binding logic behind them.",
      usedIn: "Option A",
    },
  ],
};

// --- Readiness scorecard ---------------------------------------------------

export type ScoreArea = {
  id: string;
  label: string;
  /** Locked until the Level 1 reference has been reviewed once. */
  locked: boolean;
  anchors: { 1: string; 3: string; 5: string };
};

export const SCORE_AREAS: ScoreArea[] = [
  {
    id: "target",
    label: "Target Picture",
    locked: false,
    anchors: {
      1: "No sustainability in the target picture at all.",
      3: "Mentioned as a value, not tied to objectives.",
      5: "A defined sustainability objective inside the IT target picture.",
    },
  },
  {
    id: "governance",
    label: "Governance",
    locked: true,
    anchors: {
      1: "No one owns sustainability outcomes.",
      3: "Owned informally, not in a job description.",
      5: "Named accountability with a reporting line to leadership.",
    },
  },
  {
    id: "investment",
    label: "Investment Logic",
    locked: false,
    anchors: {
      1: "Approvals look only at cost and speed.",
      3: "Lifecycle cost raised occasionally, not required.",
      5: "Lifecycle and end-of-life cost required in every approval.",
    },
  },
  {
    id: "procurement",
    label: "Procurement",
    locked: true,
    anchors: {
      1: "Purchasing decided only on price.",
      3: "Some suppliers pre-screened informally.",
      5: "Sustainability criteria binding in every tender.",
    },
  },
  {
    id: "supplier",
    label: "Supplier Control",
    locked: false,
    anchors: {
      1: "Suppliers never assessed on sustainability.",
      3: "Ad-hoc questions to some suppliers.",
      5: "All key suppliers scored against set criteria.",
    },
  },
];

export const SCORECARD = {
  kicker: "3.1 · Readiness Scorecard",
  title: "Score each area 1–5 for readiness to act",
  intro:
    "This is readiness, not importance. Move each slider; the shape redraws as you go. There is no correct profile — the shape is the point.",
  lockedTooltip: "Review your Diagnostic Note first.",
  scale: { min: 1, max: 5, default: 3 },
} as const;

// --- The three options -----------------------------------------------------

export const BUDGET_CEILING = 120000;
export const BUDGET_CEILING_LABEL =
  "Solenne's available budget for this initiative this year: €120,000.";

export const OPTION_A = {
  id: "a",
  key: "Option A",
  label: "Formalize a complete sustainable IT strategy",
  input: { basicLabel: "Basic scope", fullLabel: "Full scope" },
  budget: { basic: 35000, full: 55000 },
  timeMonths: { basic: 4, full: 6 },
  co2Label: "0 t direct — unlocks future reductions",
  co2Info:
    "A strategy has no emissions of its own. Its effect shows up in how much of Option B and C's impact actually gets realized and sustained.",
  risk: "Governance risk — becomes shelf documentation without an assigned owner.",
} as const;

export const OPTION_B = {
  id: "b",
  key: "Option B",
  label: "Introduce binding sustainability criteria in procurement",
  tiers: [1, 2, 3] as const,
  suppliersFailingPct: { 1: 15, 2: 35, 3: 60 } as Record<number, number>,
  pricePremiumPct: { 1: 3, 2: 7, 3: 12 } as Record<number, number>,
  budget: 15000,
  co2Pct: { 1: 4, 2: 7, 3: 10 } as Record<number, number>,
  timeMonths: { 1: 2, 2: 2, 3: 3 } as Record<number, number>,
} as const;

export const OPTION_C = {
  id: "c",
  key: "Option C",
  label: "Investment program to replace energy-intensive components",
  min: 0,
  max: 500,
  step: 10,
  default: 100,
  costPerUnit: 800,
  co2PerUnit: 0.18, // t CO2 / year, per-unit energy delta (stated on-page)
  energyValuePerTon: 40, // € / t assumed energy saving, for payback
  trapThreshold: 250,
  trapRisk: "Budget risk — CO2 per euro drops sharply past ~250 units.",
} as const;

export type OptAResult = { budget: number; timeMonths: number; co2Label: string; risk: string };
export type OptBResult = {
  suppliersFailingPct: number;
  pricePremiumPct: number;
  budget: number;
  co2Pct: number;
  timeMonths: number;
  risk: string;
};
export type OptCResult = {
  budget: number;
  co2Tons: number;
  paybackMonths: number | null;
  timeMonths: number;
  risk: string;
};

export function computeA(scope: "basic" | "full"): OptAResult {
  return {
    budget: OPTION_A.budget[scope],
    timeMonths: OPTION_A.timeMonths[scope],
    co2Label: OPTION_A.co2Label,
    risk: OPTION_A.risk,
  };
}

export function computeB(tier: number): OptBResult {
  const failing = OPTION_B.suppliersFailingPct[tier];
  return {
    suppliersFailingPct: failing,
    pricePremiumPct: OPTION_B.pricePremiumPct[tier],
    budget: OPTION_B.budget,
    co2Pct: OPTION_B.co2Pct[tier],
    timeMonths: OPTION_B.timeMonths[tier],
    risk: `Supply chain friction — ${failing}% of current suppliers would not qualify today.`,
  };
}

export function computeC(units: number): OptCResult {
  const budget = units * OPTION_C.costPerUnit;
  const co2Tons = +(units * OPTION_C.co2PerUnit).toFixed(2);
  const annualSaving = co2Tons * OPTION_C.energyValuePerTon;
  const paybackMonths = annualSaving > 0 ? Math.round((budget / annualSaving) * 12) : null;
  const timeMonths = Math.ceil(units / 100) * 2;
  return {
    budget,
    co2Tons,
    paybackMonths,
    timeMonths,
    risk: units > OPTION_C.trapThreshold ? OPTION_C.trapRisk : "",
  };
}

export const eur = (n: number) => "€" + n.toLocaleString("en-US");

export const TASK2 = {
  kicker: "Task 2",
  heading: "Task 2 — Where should Solenne move first?",
  subtext: "Explore each option's real cost and impact before you commit.",
  simulatorKicker: "3.2 · Consequence Simulator",
  simulatorTitle: "Open each option and move its inputs",
  tableKicker: "3.3 · Comparison",
  tableTitle: "The numbers, side by side",
  tableCols: { budget: "Budget", co2: "CO₂ / yr", time: "Time", risk: "Risk" },
  co2Footnote:
    "The three options report impact differently: a strategy has none of its own, procurement acts on the share of new spend, and the investment program saves absolute tonnes. They are not directly comparable — that is part of the read.",
  reflection: {
    kicker: "3.4 · Written reflection — judged",
    lockedLabel:
      "Open all three option panels and set every readiness slider to unlock the written reflection.",
    fieldA: {
      key: "l2:choice",
      label: "Which option do you prioritize first, and why?",
      hint: "Reference at least one number from the comparison table above (Budget, CO2, Time, or Risk).",
      placeholder: "Option [A/B/C] first, because...",
    },
    fieldB: {
      key: "l2:notFix",
      label:
        "What does this choice NOT fix? Name the conflict or gap you are consciously leaving unresolved for now.",
      hint: "Name one real conflict or gap your choice leaves open — both sides of it, not a restatement of the choice.",
      placeholder: "This does not fix...",
    },
  },
  export: {
    controlsTitle: "Calculation Note",
    controlsIntro:
      "When both reflection fields are filled, export a one-page Calculation Note. It is saved to this device and pulled forward into Level 3.",
    disabledHint: "Fill both reflection fields to enable the export.",
    openLabel: "Export Calculation Note",
    docWatermark: "AION · Green IT · Module 3 · Level 2",
    docHeading: "Calculation Note",
    docSubheading: "Solenne Industrial Technik AG — where to move first",
    docRadarTitle: "Readiness profile",
    docTableTitle: "Option comparison",
    docFieldATitle: "Priority and reasoning",
    docFieldBTitle: "What this choice does not fix",
    docNotFilled: "— not completed —",
    downloadLabel: "Download as PDF",
    closeLabel: "Close",
    taskLabel: "calculation-note",
  },
} as const;

// --- Store key helpers -----------------------------------------------------

export const L2 = {
  materialKey: "l2:material",
  refOpenedKey: "l2:refOpened",
  scorePrefix: "l2:score:",
  scoresTouchedKey: "l2:scores",
  panelsKey: "l2:panels",
  aScope: "l2:A:scope",
  bTier: "l2:B:tier",
  cUnits: "l2:C:units",
  fieldA: TASK2.reflection.fieldA.key,
  fieldB: TASK2.reflection.fieldB.key,
} as const;

export const scoreKey = (areaId: string) => `${L2.scorePrefix}${areaId}`;
