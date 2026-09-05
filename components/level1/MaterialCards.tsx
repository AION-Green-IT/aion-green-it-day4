"use client";

import { useState } from "react";
import clsx from "clsx";
import { MATERIAL } from "@/lib/module3";
import { useProgress } from "@/lib/store";
import { L1, useLevel1 } from "@/lib/level1";
import { Icon, Check, Lock } from "@/components/icons/LineIcons";
import { Reveal } from "@/components/ui/Reveal";

/**
 * Section 2 — seven self-study cards. Each expands on click/tap to reveal its
 * body, and the first open marks it read in the store. Light hover scale only.
 */
export function MaterialCards() {
  const round = useProgress((s) => s.sectionResets[L1.materialKey] ?? 0);
  const markSeen = useProgress((s) => s.markSeen);
  const { openedCards } = useLevel1();
  const [open, setOpen] = useState<Record<string, boolean>>({});

  const toggle = (id: string) => {
    setOpen((o) => ({ ...o, [id]: !o[id] }));
    if (!openedCards.includes(id)) markSeen(L1.materialKey, id);
  };

  return (
    <div key={`cards-${round}`} className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {MATERIAL.cards.map((card, i) => {
        const isOpen = !!open[card.id];
        const wasRead = openedCards.includes(card.id);
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
                  <p className="text-micro font-semibold uppercase tracking-wide text-ash">
                    Card {i + 1}
                  </p>
                  <h3 className="mt-0.5 text-h3 leading-snug text-ink">{card.title}</h3>
                </div>
                {wasRead ? (
                  <span
                    aria-label="Read"
                    className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-accent text-paper"
                  >
                    <Check className="h-3.5 w-3.5" />
                  </span>
                ) : null}
              </div>

              {isOpen ? (
                <p className="reveal-in mt-3 text-body text-ash">{card.body}</p>
              ) : (
                <p className="mt-3 text-caption font-semibold text-accent">
                  Tap to open →
                </p>
              )}
            </button>
          </Reveal>
        );
      })}
    </div>
  );
}

/**
 * Seven dots that fill as cards are opened, shown above the task. While any
 * card is unread the label reads "Read all material to unlock".
 */
export function MaterialProgress() {
  const { openedCount, allRead } = useLevel1();
  const total = MATERIAL.cards.length;

  return (
    <div className="flex flex-wrap items-center gap-3">
      <div className="flex items-center gap-1.5" aria-hidden="true">
        {Array.from({ length: total }).map((_, i) => (
          <span
            key={i}
            className={clsx(
              "h-2.5 w-2.5 rounded-full transition-colors duration-300",
              i < openedCount ? "bg-accent" : "bg-line",
            )}
          />
        ))}
      </div>
      <span
        className={clsx(
          "inline-flex items-center gap-1.5 text-caption font-semibold",
          allRead ? "text-accent" : "text-ash",
        )}
      >
        {allRead ? (
          <>
            <Check className="h-4 w-4" /> All material read
          </>
        ) : (
          <>
            <Lock className="h-4 w-4" /> {MATERIAL.lockedLabel} ({openedCount}/{total})
          </>
        )}
      </span>
    </div>
  );
}
