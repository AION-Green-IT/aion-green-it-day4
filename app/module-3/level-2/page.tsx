import type { Metadata } from "next";
import { LEVELS } from "@/lib/module3";
import { LevelPlaceholder } from "@/components/chrome/LevelPlaceholder";

const LEVEL = LEVELS[1];

export const metadata: Metadata = {
  title: `AION Green IT — ${LEVEL.tag}`,
};

export default function Level2Page() {
  return <LevelPlaceholder level={LEVEL} />;
}
