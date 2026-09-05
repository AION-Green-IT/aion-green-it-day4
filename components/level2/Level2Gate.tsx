"use client";

import Link from "next/link";
import { PREREQ } from "@/lib/level2";
import { useLevel1Note } from "@/lib/level1";
import { ArrowRight, Lock } from "@/components/icons/LineIcons";

/**
 * Prerequisite gate: Level 2 builds on the saved Level 1 Diagnostic Note. If
 * none exists in learner storage, block the task with a banner and a link back.
 * Renders nothing until hydration so the banner never flashes for a valid note.
 */
export function Level2Gate({ children }: { children: React.ReactNode }) {
  const { hydrated, hasNote } = useLevel1Note();

  if (!hydrated) {
    return <div className="py-16 text-center text-caption text-ash">Loading your session…</div>;
  }

  if (!hasNote) {
    return (
      <div className="my-10 rounded-2xl border-l-4 border-warn bg-warn/10 p-6">
        <p className="flex items-center gap-2 text-h3 text-ink">
          <Lock className="h-5 w-5 text-warn" /> Level 1 required
        </p>
        <p className="mt-2 max-w-prose text-body text-ink">{PREREQ.message}</p>
        <Link href={PREREQ.href} className="btn-accent mt-4 inline-flex items-center gap-1.5">
          {PREREQ.cta} <ArrowRight className="h-4 w-4" />
        </Link>
      </div>
    );
  }

  return <>{children}</>;
}
