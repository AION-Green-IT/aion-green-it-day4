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
| `/module-3/level-2` | L2 — Application | Calculation Note | separated route, not yet authored |
| `/module-3/level-3` | L3 — Management decision | Decision Memo | separated route, not yet authored |

The three levels are deliberately separate routes so each can be built and
navigated independently. Only Level 1 carries task content at this stage.

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
