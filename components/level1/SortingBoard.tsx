"use client";

import { useState } from "react";
import clsx from "clsx";
import { BUCKETS, SIGNALS, TASK1, type Signal } from "@/lib/module3";
import { useProgress } from "@/lib/store";
import { bucketCounts, sortKey, useLevel1 } from "@/lib/level1";
import { BucketBarChart } from "@/components/visuals/BucketBarChart";
import { Icon, DragHandle } from "@/components/icons/LineIcons";

/** Fixed, non-sequential inbox order — "shuffled" but deterministic, so
 *  server and client render identically (no hydration flicker). */
const INBOX_ORDER = ["s4", "s9", "s1", "s7", "s2", "s10", "s5", "s3", "s8", "s6"];
const SIGNAL_BY_ID = Object.fromEntries(SIGNALS.map((s) => [s.id, s])) as Record<string, Signal>;

const INBOX = "inbox";

export function SortingBoard() {
  const choose = useProgress((s) => s.choose);
  const { placements, sortedCount, hydrated } = useLevel1();

  // Which card is being dragged / tap-selected, and which zone is hovered.
  const [dragId, setDragId] = useState<string | null>(null);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [overZone, setOverZone] = useState<string | null>(null);

  const counts = bucketCounts(placements, BUCKETS.map((b) => b.id));

  const place = (signalId: string, zone: string) => {
    choose(sortKey(signalId), zone === INBOX ? "" : zone);
    setSelectedId(null);
  };

  // Tap flow: tap a card to select, tap a zone to drop it there.
  const onCardTap = (signalId: string) => {
    setSelectedId((cur) => (cur === signalId ? null : signalId));
  };
  const onZoneTap = (zone: string) => {
    if (selectedId) place(selectedId, zone);
  };

  const inboxSignals = INBOX_ORDER.map((id) => SIGNAL_BY_ID[id]).filter(
    (s) => !placements[s.id],
  );

  const clearBoard = () => {
    for (const s of SIGNALS) choose(sortKey(s.id), "");
    setSelectedId(null);
  };

  return (
    <div className="space-y-6">
      {/* Live bar chart */}
      <div className="card p-4 sm:p-5">
        <div className="mb-3 flex flex-wrap items-baseline justify-between gap-2">
          <p className="text-h3 text-ink">{TASK1.board.chartTitle}</p>
          <p className="text-caption tabular-nums text-ash">
            {hydrated ? sortedCount : 0} / {SIGNALS.length} sorted
          </p>
        </div>
        <BucketBarChart buckets={BUCKETS} counts={counts} />
        {sortedCount === 0 ? (
          <p className="mt-1 text-caption text-ash">{TASK1.board.chartEmpty}</p>
        ) : null}
      </div>

      {/* Board: inbox + buckets */}
      <div className="grid gap-4 lg:grid-cols-[300px_1fr]">
        {/* Inbox */}
        <Zone
          id={INBOX}
          overZone={overZone}
          selected={!!selectedId}
          onOver={setOverZone}
          onDropSignal={place}
          onTap={onZoneTap}
          className="bg-mist/60"
        >
          <div className="mb-2 flex items-baseline justify-between gap-2">
            <p className="text-h3 text-ink">{TASK1.board.inboxTitle}</p>
            {sortedCount > 0 ? (
              <button
                type="button"
                onClick={clearBoard}
                className="text-caption font-semibold text-ash underline-offset-2 hover:text-ink hover:underline"
              >
                Clear board
              </button>
            ) : null}
          </div>
          <p className="mb-3 text-caption text-ash">{TASK1.board.inboxHelp}</p>
          <ul className="space-y-2">
            {inboxSignals.map((s) => (
              <SignalCard
                key={s.id}
                signal={s}
                dragId={dragId}
                selectedId={selectedId}
                onDragId={setDragId}
                onTap={onCardTap}
              />
            ))}
            {inboxSignals.length === 0 ? (
              <li className="rounded-xl border border-dashed border-line px-3 py-6 text-center text-caption text-ash">
                All signals sorted. Drag any back here to re-sort.
              </li>
            ) : null}
          </ul>
        </Zone>

        {/* Buckets */}
        <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
          {BUCKETS.map((b) => {
            const placed = INBOX_ORDER.map((id) => SIGNAL_BY_ID[id]).filter(
              (s) => placements[s.id] === b.id,
            );
            return (
              <Zone
                key={b.id}
                id={b.id}
                overZone={overZone}
                selected={!!selectedId}
                onOver={setOverZone}
                onDropSignal={place}
                onTap={onZoneTap}
              >
                <div className="mb-2 flex items-center gap-2">
                  <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-accentSoft text-accent">
                    <Icon name={b.icon} className="h-5 w-5" />
                  </span>
                  <p className="flex-1 text-h3 leading-tight text-ink">{b.label}</p>
                  <span className="flex h-6 min-w-6 items-center justify-center rounded-full bg-ink px-1.5 text-caption font-semibold tabular-nums text-paper">
                    {counts[b.id]}
                  </span>
                </div>
                <ul className="space-y-2">
                  {placed.map((s) => (
                    <SignalCard
                      key={s.id}
                      signal={s}
                      compact
                      dragId={dragId}
                      selectedId={selectedId}
                      onDragId={setDragId}
                      onTap={onCardTap}
                    />
                  ))}
                  {placed.length === 0 ? (
                    <li className="rounded-xl border border-dashed border-line px-3 py-4 text-center text-caption text-ash/80">
                      Drop signals here
                    </li>
                  ) : null}
                </ul>
              </Zone>
            );
          })}
        </div>
      </div>
    </div>
  );
}

/** A drop zone that accepts native drag and tap-to-place. */
function Zone({
  id,
  children,
  className,
  overZone,
  selected,
  onOver,
  onDropSignal,
  onTap,
}: {
  id: string;
  children: React.ReactNode;
  className?: string;
  overZone: string | null;
  selected: boolean;
  onOver: (zone: string | null) => void;
  onDropSignal: (signalId: string, zone: string) => void;
  onTap: (zone: string) => void;
}) {
  const isOver = overZone === id;
  return (
    <section
      onDragOver={(e) => {
        e.preventDefault();
        if (overZone !== id) onOver(id);
      }}
      onDragLeave={(e) => {
        // Only clear when the pointer actually leaves this zone's box.
        if (!e.currentTarget.contains(e.relatedTarget as Node)) onOver(null);
      }}
      onDrop={(e) => {
        e.preventDefault();
        const sid = e.dataTransfer.getData("text/plain");
        onOver(null);
        if (sid) onDropSignal(sid, id);
      }}
      onClick={() => onTap(id)}
      className={clsx(
        "rounded-2xl border p-3 transition-colors duration-150",
        isOver
          ? "border-accent bg-accentSoft"
          : selected
            ? "border-dashed border-accent/60"
            : "border-line",
        className,
      )}
    >
      {children}
    </section>
  );
}

/** A draggable, tappable signal card with a drag handle. */
function SignalCard({
  signal,
  compact = false,
  dragId,
  selectedId,
  onDragId,
  onTap,
}: {
  signal: Signal;
  compact?: boolean;
  dragId: string | null;
  selectedId: string | null;
  onDragId: (id: string | null) => void;
  onTap: (id: string) => void;
}) {
  const dragging = dragId === signal.id;
  const selected = selectedId === signal.id;

  return (
    <li>
      <div
        draggable
        role="button"
        tabIndex={0}
        aria-pressed={selected}
        onDragStart={(e) => {
          e.dataTransfer.setData("text/plain", signal.id);
          e.dataTransfer.effectAllowed = "move";
          onDragId(signal.id);
        }}
        onDragEnd={() => onDragId(null)}
        onClick={(e) => {
          e.stopPropagation();
          onTap(signal.id);
        }}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            onTap(signal.id);
          }
        }}
        className={clsx(
          "group flex cursor-grab items-start gap-2 rounded-xl border bg-paper p-3 shadow-sm transition-all duration-150 active:cursor-grabbing",
          dragging && "is-dragging shadow-lift",
          selected ? "border-accent ring-2 ring-accent/30" : "border-line hover:border-ash",
        )}
      >
        <span className="mt-0.5 text-ash/70 group-hover:text-ash">
          <DragHandle className="h-4 w-4" />
        </span>
        <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-mist text-micro font-semibold tabular-nums text-ash">
          {signal.n}
        </span>
        <p className={clsx("flex-1 text-ink", compact ? "text-caption" : "text-body")}>
          {signal.text}
        </p>
      </div>
      {selected ? (
        <p className="mt-1 pl-2 text-micro font-semibold uppercase tracking-wide text-accent">
          {TASK1.board.tapHint}
        </p>
      ) : null}
    </li>
  );
}
