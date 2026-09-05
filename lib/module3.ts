/**
 * Module 3 / Day 4 content. All learner-facing copy lives here so components
 * stay presentational. Level 1 is fully authored (Route 1 — Knowledge);
 * Levels 2 and 3 exist as separate routes but carry no task content yet.
 *
 * Company case used throughout the whole module: Solenne Industrial Technik AG.
 */

export const CASE = {
  company: "Solenne Industrial Technik AG",
  module: "Module 3 · Day 4",
  moduleTitle: "Green IT in IT Strategy & Procurement",
} as const;

/** Icon keys resolved by components/icons/LineIcons.tsx. */
export type IconKey =
  | "compass"
  | "puzzle"
  | "link"
  | "gearLeaf"
  | "shield"
  | "cart"
  | "lever"
  | "target"
  | "gavel"
  | "coins"
  | "supplier";

export type Level = {
  n: 1 | 2 | 3;
  slug: string;
  href: string;
  tag: string; // "Level 1 — Knowledge"
  title: string; // page H1
  cardTitle: string; // landing card title
  cardBlurb: string; // landing card one-liner
  deliverable: string; // what the level produces
  available: boolean;
};

export const LEVELS: Level[] = [
  {
    n: 1,
    slug: "level-1",
    href: "/module-3/level-1",
    tag: "Level 1 — Knowledge",
    title: "Level 1 — Knowledge: Reading Solenne's IT Strategy",
    cardTitle: "Reading Solenne's IT Strategy",
    cardBlurb:
      "Read what is already in the strategy and decide what it is actually telling you. Produces a Diagnostic Note.",
    deliverable: "Diagnostic Note",
    available: true,
  },
  {
    n: 2,
    slug: "level-2",
    href: "/module-3/level-2",
    tag: "Level 2 — Application",
    title: "Level 2 — Application",
    cardTitle: "Application",
    cardBlurb:
      "Choose between options whose consequences you measured yourself — with the numbers in front of you.",
    deliverable: "Calculation Note",
    available: true,
  },
  {
    n: 3,
    slug: "level-3",
    href: "/module-3/level-3",
    tag: "Level 3 — Management decision",
    title: "Level 3 — Management decision",
    cardTitle: "Management decision",
    cardBlurb:
      "Decide with resources that are deliberately insufficient, and state out loud what you give up.",
    deliverable: "Decision Memo",
    available: true,
  },
];

// ---------------------------------------------------------------------------
// LEVEL 1 — Knowledge
// ---------------------------------------------------------------------------

/** Section 1 — story intro, three verbatim paragraphs. */
export const STORY_INTRO = {
  kicker: "The situation",
  paragraphs: [
    "Solenne Industrial Technik AG is a mid-size industrial technology company — around 950 employees, headquartered in Germany, with operations expanding across Central Europe. For the past three years, IT has been treated as the company's growth engine: every year brings a new wave of investment in systems, platforms, and user devices, all justified by speed-to-market and innovation.",
    "Sustainability shows up constantly in leadership communication — annual reports, town halls, the careers page. But inside IT, it has never been translated into anything operational. There is no sustainability line in the IT strategy document. No one owns it. It is a value the company states, not a logic that controls decisions.",
    "You are stepping into this organization today — not as an outsider auditing it, but as the person who has to read what's already there and decide what it's actually telling you.",
  ],
} as const;

/** Section 2 — seven self-study cards. */
export type MaterialCard = {
  id: string;
  icon: IconKey;
  title: string;
  body: string;
};

export const MATERIAL: {
  kicker: string;
  title: string;
  intro: string;
  cards: MaterialCard[];
  lockedLabel: string;
} = {
  kicker: "Study material",
  title: "Seven ideas before you read the strategy",
  intro:
    "Open each card. The task below stays locked until you have read all seven — the sort only makes sense once you hold the whole frame.",
  lockedLabel: "Read all material to unlock",
  cards: [
    {
      id: "m1",
      icon: "compass",
      title: "What makes an IT strategy sustainable",
      body: "Not a separate chapter, but sustainability folded into the target picture, architecture, investment logic, and governance itself.",
    },
    {
      id: "m2",
      icon: "puzzle",
      title: "Single action vs. strategic embedding",
      body: "Buying efficient laptops once is an action; requiring energy efficiency in every procurement cycle is a strategy.",
    },
    {
      id: "m3",
      icon: "link",
      title:
        "The link between corporate strategy, sustainability goals, and IT strategy",
      body: "When this link is missing, IT initiatives and sustainability commitments run in parallel and never meet.",
    },
    {
      id: "m4",
      icon: "gearLeaf",
      title: "Typical fields of action",
      body: "Infrastructure, procurement, lifecycle, operations, software, governance, KPIs.",
    },
    {
      id: "m5",
      icon: "shield",
      title: "Why this is not just an environmental topic",
      body: "It's a risk topic (supply chain, regulation), a cost topic (lifecycle TCO), and a competitiveness topic (client tenders increasingly ask for it).",
    },
    {
      id: "m6",
      icon: "cart",
      title: "Introduction to sustainable procurement in IT",
      body: "Reviewing purchases beyond price and performance: lifecycle, repairability, energy efficiency, origin, supply chain, disposability.",
    },
    {
      id: "m7",
      icon: "lever",
      title: "Why procurement is a control lever",
      body: "It is the one recurring decision point where sustainability criteria can be made binding, not optional.",
    },
  ],
};

/** Section 3 — Task 1: Diagnostic Note. */
export type Bucket = {
  id: string;
  label: string;
  icon: IconKey;
};

export const BUCKETS: Bucket[] = [
  { id: "target", label: "Target Picture", icon: "target" },
  { id: "governance", label: "Governance", icon: "gavel" },
  { id: "investment", label: "Investment Logic", icon: "coins" },
  { id: "procurement", label: "Procurement", icon: "cart" },
  { id: "supplier", label: "Supplier Control", icon: "supplier" },
];

export type Signal = { id: string; n: number; text: string };

export const SIGNALS: Signal[] = [
  { id: "s1", n: 1, text: "IT projects are evaluated primarily on innovation, speed, and budget." },
  { id: "s2", n: 2, text: "The IT strategy document contains no explicit sustainability targets." },
  { id: "s3", n: 3, text: "Procurement decisions are made mainly on price, availability, and standardization." },
  { id: "s4", n: 4, text: "Management is now demanding visible, measurable contributions to sustainability." },
  { id: "s5", n: 5, text: "IT leadership considers sustainability important but has never made it a formal priority." },
  { id: "s6", n: 6, text: "Suppliers are not evaluated against any sustainability criteria." },
  { id: "s7", n: 7, text: "Next year's IT roadmap (cloud migration, new ERP) carries no sustainability KPI." },
  { id: "s8", n: 8, text: "Devices are refreshed on a warranty-expiry schedule, not an energy-efficiency one." },
  { id: "s9", n: 9, text: "No one in IT or procurement is formally accountable for sustainability outcomes." },
  { id: "s10", n: 10, text: "Investment approvals never ask about lifecycle cost or end-of-life disposal." },
];

export const TASK1 = {
  kicker: "Task 1",
  heading: "Task 1 — Is Solenne's IT strategy actually sustainable?",
  subtext: "Sort what you see. The pattern will tell you where the gap is.",
  board: {
    inboxTitle: "Inbox — signals to sort",
    inboxHelp:
      "Drag a signal into the bucket it belongs in — or tap a signal, then tap a bucket. No answer is marked right or wrong. Re-sort any card at any time.",
    chartTitle: "Signals per bucket",
    chartEmpty: "The chart fills as you sort.",
    tapHint: "Selected — now tap a bucket",
  },
  reflection: {
    lockedLabel: "Sort all 10 signals to unlock the written reflection.",
    kicker: "Written reflection — judged",
    intro:
      "This part is judged, not auto-scored. Reference the buckets your findings came from.",
    fieldA: {
      key: "l1:gaps",
      label: "Name the three biggest strategic gaps you found.",
      placeholder:
        "e.g. 'Gap 1 relates to [bucket] because...'  Name three, and say which bucket each came from.",
    },
    fieldB: {
      key: "l1:opsVsStrategic",
      label:
        "Which of these findings is a single operational weakness, and which is a strategic deficit? Explain the difference for at least two of your findings.",
      placeholder:
        "Take at least two findings. For each, say whether it is a one-off operational weakness or a structural strategic deficit — and why the two are not the same.",
    },
  },
  export: {
    controlsTitle: "Diagnostic Note",
    controlsIntro:
      "When both reflection fields are filled, export a one-page Diagnostic Note. It is saved to this device and pulled forward into Level 2.",
    disabledHint: "Fill both reflection fields to enable the export.",
    openLabel: "Export Diagnostic Note",
    nameLabel: "Learner name",
    namePlaceholder: "Your name",
    // Printable document
    docWatermark: "AION · Green IT · Module 3 · Level 1",
    docHeading: "Diagnostic Note",
    docSubheading: "Solenne Industrial Technik AG — IT strategy diagnosis",
    docChartTitle: "Signals per bucket",
    docFieldATitle: "Three biggest strategic gaps",
    docFieldBTitle: "Operational weakness vs. strategic deficit",
    docNotFilled: "— not completed —",
    downloadLabel: "Download as PDF",
    closeLabel: "Close",
    taskLabel: "diagnostic-note",
  },
} as const;
