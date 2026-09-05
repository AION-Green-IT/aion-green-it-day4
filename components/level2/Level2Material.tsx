"use client";

import { useState } from "react";
import clsx from "clsx";
import { MATERIAL2, L2 } from "@/lib/level2";
import { useProgress } from "@/lib/store";
import { useLevel2 } from "./useLevel2";
import { Icon, Check } from "@/components/icons/LineIcons";
import { Reveal } from "@/components/ui/Reveal";

/**
 * Section 2 — five tool cards, same expand pattern as Level 1. Each shows the
 * task part it feeds ("Used in: …") so the material reads as instruments, not
 * a reading assignment.
 */
export function Level2Material() {
  const markSeen = useProgress((s) => s.markSeen);
  const { materialOpened } = useLevel2();
  const [open, setOpen] = useState<Record<string, boolean>>({});

  const toggle = (id: string) => {
    setOpen((o) => ({ ...o, [id]: !o[id] }));
    if (!materialOpened.includes(id)) markSeen(L2.materialKey, id);
  };

  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {MATERIAL2.cards.map((card, i) => {
        const isOpen = !!open[card.id];
        const wasRead = materialOpened.includes(card.id);
        return (
          <Reveal key={card.id} delay={Math.min(i, 5) * 60}>
            <button
              type="button"
              onClick={() => toggle(card.id)}
              aria-expanded={isOpen}
              className={clsx(
                "flex h-full w-full flex-col rounded-2xl border bg-paper p-5 text-left shadow-sm transition-transform duration-150 hover:scale-[1.03] focus-visible:scale-[1.03]",
                isOpen ? "border-accent" : "border-line",
              )}
            >
              <div className="flex items-start gap-3">
                <span
                  className={clsx(
                    "flex h-10 w-10 shrink-0 items-center justify-center rounded-xl",
                    isOpen ? "bg-accent text-paper" : "bg-accentSoft text-accent",
                  )}
                >
                  <Icon name={card.icon} className="h-5 w-5" />
                </span>
                <div className="min-w-0 flex-1">
                  <h3 className="text-h3 leading-snug text-ink">{card.title}</h3>
                </div>
                {wasRead ? (
                  <span aria-label="Read" className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-accent text-paper">
                    <Check className="h-3.5 w-3.5" />
                  </span>
                ) : null}
              </div>

              {isOpen ? (
                <p className="reveal-in mt-3 text-body text-ash">{card.body}</p>
              ) : (
                <p className="mt-3 text-caption font-semibold text-accent">Tap to open →</p>
              )}

              <p className="mt-4 border-t border-line pt-3 text-micro font-semibold uppercase tracking-wide text-ash">
                Used in: <span className="text-accent">{card.usedIn}</span>
              </p>
            </button>
          </Reveal>
        );
      })}
    </div>
  );
}
