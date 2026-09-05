"use client";

import { useState } from "react";
import clsx from "clsx";
import { MATERIAL3, COMPONENT_COLORS, L3 } from "@/lib/level3";
import { useProgress } from "@/lib/store";
import { useLevel3 } from "./useLevel3";
import { MaterialDiagram } from "./MaterialDiagrams";
import { Check, ChevronDown } from "@/components/icons/LineIcons";
import { Reveal } from "@/components/ui/Reveal";

/**
 * Section 2 — five cards, each colour-tagged to its memo component and holding
 * an animated diagram that plays when the card opens.
 */
export function Level3Material() {
  const markSeen = useProgress((s) => s.markSeen);
  const { materialOpened } = useLevel3();
  const [open, setOpen] = useState<Record<string, boolean>>({});

  const toggle = (id: string) => {
    setOpen((o) => ({ ...o, [id]: !o[id] }));
    if (!materialOpened.includes(id)) markSeen(L3.materialKey, id);
  };

  return (
    <div className="grid gap-4 lg:grid-cols-2">
      {MATERIAL3.cards.map((card, i) => {
        const isOpen = !!open[card.id];
        const color = COMPONENT_COLORS[card.component];
        const wasRead = materialOpened.includes(card.id);
        return (
          <Reveal key={card.id} delay={Math.min(i, 4) * 60}>
            <div
              className={clsx("card overflow-hidden", isOpen && "shadow-md")}
              style={{ borderLeftWidth: 3, borderLeftColor: color }}
            >
              <button type="button" onClick={() => toggle(card.id)} aria-expanded={isOpen} className="flex w-full items-start gap-3 p-4 text-left">
                <div className="min-w-0 flex-1">
                  <span className="inline-block rounded-full px-2 py-0.5 text-micro font-semibold uppercase tracking-wide" style={{ backgroundColor: color + "1A", color }}>
                    Used in: {card.usedIn}
                  </span>
                  <h3 className="mt-1.5 text-h3 leading-snug text-ink">{card.title}</h3>
                </div>
                {wasRead ? (
                  <span aria-label="Read" className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full text-paper" style={{ backgroundColor: color }}>
                    <Check className="h-3.5 w-3.5" />
                  </span>
                ) : (
                  <ChevronDown className={clsx("mt-0.5 h-5 w-5 shrink-0 text-ash transition-transform duration-200", isOpen && "rotate-180")} />
                )}
              </button>

              {isOpen ? (
                <div className="reveal-in space-y-3 border-t border-line p-4">
                  <p className="text-body text-ash">{card.body}</p>
                  <div className="rounded-xl border border-line bg-mist/40 p-3">
                    <MaterialDiagram name={card.diagram} color={color} />
                  </div>
                </div>
              ) : null}
            </div>
          </Reveal>
        );
      })}
    </div>
  );
}
