# AION Green IT — Module 3, Day 4

**Green IT in IT Strategy & Procurement** — the interactive working companion for
Module 3. One business case (fictional **Solenne Industrial Technik AG**) is
carried through three levels, each on its own route and each producing a document
a professional would actually hand over.

- **Stack:** Next.js 14 (App Router) · TypeScript · Tailwind · Zustand
- **State:** `localStorage` only — no backend, no auth, no accounts
- **Output:** static export (`out/`), deploy-ready to any static host

---

## Routes

| Route | Level | Deliverable | Status |
|---|---|---|---|
| `/` | Module overview | — | built |
| `/module-3/level-1` | L1 — Knowledge | Diagnostic Note | **built** |
| `/module-3/level-2` | L2 — Application | Calculation Note | **built** |
| `/module-3/level-3` | L3 — Management decision | Decision Memo + Portfolio | **built** |

The three levels are deliberately separate routes so each can be built and
navigated independently. All three carry full task content and chain forward:
Level 2 reads Level 1's Diagnostic Note, and Level 3 reads both and refuses to
run without them.

## Level 1 — Knowledge (built)

`Level 1 — Knowledge: Reading Solenne's IT Strategy`

1. **Story intro** — the case, beside a network motif whose "sustainability"
   node is greyed out and only loosely tethered (fade-in on scroll).
2. **Study material** — 7 expand cards with line icons; 7 progress dots gate the
   task, which stays locked until all cards are opened.
3. **Task 1 — Diagnostic Note**
   - Sorting board: 10 draggable signals → 5 buckets (Target Picture,
     Governance, Investment Logic, Procurement, Supplier Control), with a live
     horizontal bar chart. No right/wrong. Drag **or** tap-to-select + tap-to-place.
   - Written reflection (judged): two fields, unlocked once all 10 are sorted.
   - Export: a one-page **Diagnostic Note** (preview modal → Save as PDF),
     persisted to this browser and available to Level 2.

## Level 2 — Application (built)

`Level 2 — Application: Where Should Solenne Move First?`

- **Prerequisite gate** — reads the Level 1 Diagnostic Note from storage; with
  none, it blocks with a banner and a link back.
- **Story continuation** — same motif with the Procurement lever pulsing, plus a
  collapsible read-only copy of the learner's own Diagnostic Note. Opening it
  unlocks two otherwise-locked sliders.
- **5 material cards**, each tagged with the task part it feeds ("Used in: …").
- **Task 2 — Calculation Note**
  - Readiness Scorecard: 5 sliders (1–5) with 1/3/5 anchor tooltips and a live
    5-axis radar; Procurement & Governance stay locked until the note is reviewed.
  - Consequence Simulator: 3 accordion panels (A toggle / B tier slider / C
    device slider) with transparent inline formulas. Panel C hides a
    "CO₂-per-euro" risk flag that only appears past 250 units.
  - Live comparison table against a fixed €120,000 budget ceiling.
  - Judged 2-field reflection, unlocked once all panels are opened and every
    slider is set.
  - Export: a one-page **Calculation Note** (radar + comparison + answers),
    persisted for Level 3.

## Level 3 — Management Decision (built)

`Level 3 — Management Decision: What Do You Tell the Board?`

- **Prerequisite gate** — needs BOTH the Level 1 Diagnostic Note and the Level 2
  Calculation Note; a missing one is named in the banner.
- **Story continuation** — the motif is now fully wired with a dashed, pulsing
  "Board Decision" node; below it, both prior notes are shown read-only.
- **5 material cards**, each colour-tagged to one memo component and holding an
  animated SVG (target timeline, RACI org-chart, stage-gate, supplier cycle,
  accountability) that plays on open.
- **Task 3 — Decision Memo (split-screen builder)**
  - Left = builder, right = the memo assembling live in reading order, opening by
    quoting the learner's own Level 1 gaps and Level 2 priority.
  - Budget allocator against the €120,000 ceiling; the bar and remaining balance
    turn red and block submit when over budget.
  - Five colour-coded component fields (Target / Governance / Investment /
    Supplier / Accountability) with validation ("name a role, not a department").
  - Sequencing widget: drag/tap 9 actions into Short / Medium / Structural; the
    order feeds the memo's roadmap silently.
  - Mandatory "measure you postponed" closing field.
  - **Submit** → a combined three-note **Portfolio** PDF (Diagnostic +
    Calculation + Decision Memo) under one header.

## Run it

```bash
npm install
npm run dev        # http://localhost:3000
```

```bash
npm run build      # static export → ./out
npm run typecheck  # tsc --noEmit
```

## Where things live

- `lib/module3.ts` — all Level 1 copy (verbatim), the case, and the level list.
- `lib/level1.ts` — maps Level 1's mechanics onto the generic progress store.
- `lib/store.ts` — the generic Zustand + `localStorage` store (key
  `aion-greenit-day4`).
- `components/level1/*` — the Level 1 mechanics (cards, sorting board,
  reflection, export).
- `components/visuals/*` — the network motif and the bucket bar chart.
