"use client";

import Link from "next/link";
import { PREREQ3 } from "@/lib/level3";
import { useLevel1Note } from "@/lib/level1";
import { useLevel2 } from "@/components/level2/useLevel2";
import { ArrowRight, Lock } from "@/components/icons/LineIcons";

/**
 * Prerequisite gate: Level 3 builds on BOTH the Level 1 Diagnostic Note and the
 * Level 2 Calculation Note. If either is missing, block with a banner naming the
 * missing one.
 */
export function Level3Gate({ children }: { children: React.ReactNode }) {
  const l1 = useLevel1Note();
  const l2 = useLevel2();

  if (!l1.hydrated || !l2.hydrated) {
    return <div className="py-16 text-center text-caption text-ash">Loading your session…</div>;
  }

  const missing = !l1.hasNote ? "l1" : !l2.reflectionComplete ? "l2" : null;

  if (missing) {
    const isL1 = missing === "l1";
    return (
      <div className="my-10 rounded-2xl border-l-4 border-warn bg-warn/10 p-6">
        <p className="flex items-center gap-2 text-h3 text-ink">
          <Lock className="h-5 w-5 text-warn" /> {isL1 ? "Level 1 required" : "Level 2 required"}
        </p>
        <p className="mt-2 max-w-prose text-body text-ink">{isL1 ? PREREQ3.missingL1 : PREREQ3.missingL2}</p>
        <Link href={isL1 ? PREREQ3.hrefL1 : PREREQ3.hrefL2} className="btn-accent mt-4 inline-flex items-center gap-1.5">
          {isL1 ? PREREQ3.ctaL1 : PREREQ3.ctaL2} <ArrowRight className="h-4 w-4" />
        </Link>
      </div>
    );
  }

  return <>{children}</>;
}
