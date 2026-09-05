/**
 * Level 3 — Management Decision. Verbatim copy, the five memo-component configs
 * (each with its own accent colour), the budget items, the sequencing chips,
 * and small pure validators. No React here so the server page can import it.
 */

export const LEVEL3_TITLE = "Level 3 — Management Decision: What Do You Tell the Board?";

export const PREREQ3 = {
  missingL1: "Complete Level 1 first — this memo builds on your Diagnostic Note.",
  missingL2: "Complete Level 2 first — this memo builds on your Calculation Note.",
  ctaL1: "Go to Level 1",
  ctaL2: "Go to Level 2",
  hrefL1: "/module-3/level-1",
  hrefL2: "/module-3/level-2",
} as const;

export const STORY3 = {
  kicker: "The final brief",
  paragraphs: [
    "Your Calculation Note reached Solenne's CIO. The response: \"You've told me what to do and what it costs. Now write the memo I take into the boardroom.\"",
    "The budget ceiling from your analysis still applies: €120,000 for this initiative this year. But the board doesn't fund technical moves in isolation — they expect ownership, a review structure, and a stated target, funded from the same pool. The number that looked sufficient at the calculation stage will not cover everything a real recommendation requires.",
    "Decide what gets funded now, what gets formally assigned but not yet resourced, and what you are consciously choosing to postpone — and be ready to defend that choice under questioning.",
  ],
  refL1Title: "Your Diagnostic Note",
  refL1Hint: "Level 1 — your own prior work.",
  refL2Title: "Your Calculation Note",
  refL2Hint: "Level 2 — your own prior work.",
} as const;

/** Five component accent colours, reused between each card tag and its memo field. */
export const COMPONENT_COLORS = {
  target: "#0E7A5A",
  governance: "#2E5F8A",
  investment: "#9A6A1F",
  supplier: "#6D5AA6",
  accountability: "#A63D5B",
} as const;

export type ComponentKey = keyof typeof COMPONENT_COLORS;

export type DiagramKey = "timeline" | "orgchart" | "stagegate" | "suppliercycle" | "accountability";

export type Level3Card = {
  id: string;
  component: ComponentKey;
  diagram: DiagramKey;
  title: string;
  usedIn: string;
  body: string;
};

export const MATERIAL3: { kicker: string; title: string; intro: string; cards: Level3Card[] } = {
  kicker: "Study material",
  title: "Five building blocks of the memo",
  intro:
    "Each card maps to exactly one field in the memo builder — the colour tag matches. Open the one you need as you draft.",
  cards: [
    {
      id: "l3m1",
      component: "target",
      diagram: "timeline",
      title: "Target Picture",
      usedIn: "Target Picture field",
      body: "A target picture is not an aspiration (\"greener IT\") — it's a baseline, a target year, and a measurable metric. This is the same structure real companies use for emissions targets (a baseline year, a target year, a stated % reduction — the pattern behind frameworks like the GHG Protocol and Science Based Targets).",
    },
    {
      id: "l3m2",
      component: "governance",
      diagram: "orgchart",
      title: "Governance",
      usedIn: "Governance field",
      body: "Governance means naming who decides, who is consulted, and who is only informed — the RACI pattern used in IT governance frameworks like COBIT and in corporate ESG steering committees. A structure with more than one \"Accountable\" person functions, in practice, like a structure with none.",
    },
    {
      id: "l3m3",
      component: "investment",
      diagram: "stagegate",
      title: "Investment Logic",
      usedIn: "Investment Logic field",
      body: "Sustainability criteria work when they sit inside an investment decision gate, not attached after the decision is already made — the stage-gate pattern standard in corporate IT investment governance, where a business case must pass a defined checkpoint before funding is released.",
    },
    {
      id: "l3m4",
      component: "supplier",
      diagram: "suppliercycle",
      title: "Supplier Control",
      usedIn: "Supplier Control field",
      body: "One-time vetting is weak. Industry practice (the pattern behind ISO 20400 sustainable procurement guidance) treats supplier control as a repeating cycle: selection, onboarding, periodic review, re-certification — and back to selection at contract renewal.",
    },
    {
      id: "l3m5",
      component: "accountability",
      diagram: "accountability",
      title: "Accountability",
      usedIn: "Accountability field",
      body: "Accountable is not the same as responsible. Accountable means one named person ultimately answers for the outcome, even when the work is delegated. \"Everyone is responsible\" functions, in practice, as no one being accountable.",
    },
  ],
};

// --- Task 3 -----------------------------------------------------------------

export const BUDGET_CEILING_3 = 120000;

export const BUDGET_ITEMS = {
  chosen: { key: "l3:fund:chosen", label: "Chosen initiative (from your Calculation Note)", defaultOn: true },
  governance: { key: "l3:fund:governance", label: "Governance & accountability setup", amount: 25000, defaultOn: true },
  audit: { key: "l3:fund:audit", label: "Supply chain / lifecycle data audit (optional)", amount: 20000, defaultOn: false },
} as const;

export const STAGE_GATES = ["Idea", "Business Case", "Approval", "Execution", "Review"] as const;
export const SUPPLIER_CADENCE = ["Annual", "Biannual", "Continuous monitoring"] as const;
export const REVIEW_CADENCE = ["Quarterly", "Biannual", "Annual"] as const;
export const TARGET_YEARS = [2028, 2029, 2030, 2032, 2035] as const;

export const SEQUENCE_COLUMNS = [
  { id: "short", label: "Short-term" },
  { id: "medium", label: "Medium-term" },
  { id: "structural", label: "Structural" },
] as const;

export type SeqChip = { id: string; text: string; correct: "short" | "medium" | "structural" };

export const SEQUENCE_CHIPS: SeqChip[] = [
  { id: "q1", text: "Assign a named accountable owner", correct: "short" },
  { id: "q2", text: "Stand up the sustainability steering committee", correct: "short" },
  { id: "q3", text: "Publish the target picture company-wide", correct: "short" },
  { id: "q4", text: "Insert the sustainability gate into investment approval", correct: "medium" },
  { id: "q5", text: "Introduce binding sustainability criteria in the next tender", correct: "medium" },
  { id: "q6", text: "Run the supply chain / lifecycle data audit", correct: "medium" },
  { id: "q7", text: "Formalize the supplier re-certification cycle", correct: "structural" },
  { id: "q8", text: "Establish quarterly emissions reporting to the board", correct: "structural" },
  { id: "q9", text: "Embed lifecycle cost in every investment approval", correct: "structural" },
];

export const TASK3 = {
  kicker: "Task 3",
  heading: "Task 3 — What do you tell the board?",
  subtext: "Build the recommendation. Watch the budget as you commit it.",
  budgetTitle: "3.1 · Budget allocator",
  budgetCeilingLabel: "Ceiling: €120,000 this year",
  remainingLabel: "Remaining",
  overBudgetLabel: "Over budget — uncheck an item to submit",
  fieldsTitle: "3.2 · Memo components",
  seqTitle: "3.3 · Implementation sequence",
  seqIntro:
    "Sort each action into when it happens. The order flows straight into the memo's roadmap — an illogical sequence will read as one there.",
  seqTrayLabel: "Unsorted actions",
  closingTitle: "3.4 · The measure you postponed",
  closing: {
    key: "l3:postponed",
    label: "The measure you consciously postponed",
    hint: "Name what you are not funding or resourcing this year, and why that is defensible.",
    placeholder: "Not funding [X] this year because...",
  },
  memoTitle: "Decision memo",
  previewToggle: "Preview memo",
  export: {
    controlsTitle: "Submit Decision Memo",
    controlsIntro:
      "When every field is complete, the sequence is sorted, and the budget balances, submit the memo. The export bundles all three notes into one portfolio.",
    disabledHint: "Complete every field, sort the sequence, and clear any over-budget balance.",
    openLabel: "Submit Decision Memo",
    downloadLabel: "Download portfolio as PDF",
    closeLabel: "Close",
    portfolioTitle: "Solenne Industrial Technik AG — Module 3 Portfolio",
    taskLabel: "module-3-portfolio",
  },
} as const;

// --- Field configs (labels + memo templates) --------------------------------

export const FIELDS = {
  target: {
    key: "target",
    label: "Target Picture",
    baselineKey: "l3:tp:baseline",
    pctKey: "l3:tp:pct",
    yearKey: "l3:tp:year",
    rationaleKey: "l3:tp:rationale",
    baselineLabel: "Baseline emissions (t CO₂e / yr)",
    pctLabel: "Target reduction (%)",
    yearLabel: "Target year",
    rationaleLabel: "Rationale",
    rationaleHint: "Say why this target is credible for Solenne, given what you already found.",
    rationalePlaceholder: "Credible because...",
  },
  governance: {
    key: "governance",
    label: "Governance",
    ownerKey: "l3:gov:owner",
    cadenceKey: "l3:gov:cadence",
    escalationKey: "l3:gov:escalation",
    ownerLabel: "Accountable owner (one named role)",
    ownerPlaceholder: "e.g. Head of IT Sustainability",
    cadenceLabel: "Review cadence",
    escalationLabel: "Escalation trigger",
    escalationHint: "State a concrete trigger — a number, a date, or a named event that forces a board conversation.",
    escalationPlaceholder: "Escalates when...",
    oneAccountableNote: "Only one role can be Accountable — name the single owner, not a department.",
  },
  investment: {
    key: "investment",
    label: "Investment Logic",
    stageKey: "l3:inv:stage",
    rationaleKey: "l3:inv:rationale",
    stageLabel: "At which stage should the sustainability check become mandatory?",
    rationaleLabel: "Rationale",
    rationaleHint: "Say why this stage — and why not an earlier or later one.",
    rationalePlaceholder: "This stage, because...",
  },
  supplier: {
    key: "supplier",
    label: "Supplier Control",
    cadenceKey: "l3:sup:cadence",
    rationaleKey: "l3:sup:rationale",
    cadenceLabel: "Supplier review cadence",
    rationaleLabel: "Rationale",
    rationaleHint: "Reference a risk flag from your Calculation Note.",
    rationalePlaceholder: "Because our Calculation Note flagged...",
  },
  accountability: {
    key: "accountability",
    label: "Accountability",
    roleKey: "l3:acc:role",
    roleLabel: "Named accountable role",
    roleHint: "One named role — not a department or a team.",
    rolePlaceholder: "e.g. Head of IT Sustainability",
    invalidMessage: "Name a role, not a department.",
  },
} as const;

// --- Validation -------------------------------------------------------------

const GENERIC_ROLES = [
  "it team",
  "procurement department",
  "management",
  "it department",
  "the team",
  "procurement",
  "it",
  "board",
  "everyone",
  "staff",
  "leadership",
  "operations",
];

/** True when a role name is too generic to be a real accountable owner. */
export function isGenericRole(v: string): boolean {
  const n = v.trim().toLowerCase();
  if (!n) return false;
  if (GENERIC_ROLES.includes(n)) return true;
  return /\b(department|team)$/.test(n);
}

// --- Memo templates ---------------------------------------------------------

export function targetLine(baseline: string, pct: string, year: string): string {
  if (!baseline || !pct || !year) return "";
  return `By ${year}, Solenne will reduce IT-related emissions by ${pct}% from the ${baseline} t CO₂e/yr baseline.`;
}

export const eur3 = (n: number) => "€" + n.toLocaleString("en-US");

// --- Store keys -------------------------------------------------------------

export const L3 = {
  materialKey: "l3:material",
  refL1Key: "l3:refL1",
  refL2Key: "l3:refL2",
  chosenOptKey: "l3:chosenOpt",
  seqPrefix: "l3:seq:",
} as const;

export const seqKey = (chipId: string) => `${L3.seqPrefix}${chipId}`;
