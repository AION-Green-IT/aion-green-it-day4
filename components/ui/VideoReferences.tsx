"use client";

import { useEffect, useState } from "react";
import type { VideoReference } from "@/lib/module3";
import { Play, Close } from "@/components/icons/LineIcons";

/**
 * A row of small "watch" chips — one per reference video. Clicking one opens
 * a modal with the video embedded and playing full-size, right on the page;
 * nothing navigates away to YouTube. Same modal conventions as the export
 * previews elsewhere (fixed overlay, Escape + backdrop-click to close).
 */
export function VideoReferences({ videos }: { videos: VideoReference[] }) {
  const [openId, setOpenId] = useState<string | null>(null);
  const open = videos.find((v) => v.id === openId) ?? null;

  return (
    <>
      <div className="flex flex-wrap items-center gap-2">
        {videos.map((v) => (
          <button
            key={v.id}
            type="button"
            onClick={() => setOpenId(v.id)}
            className="flex items-center gap-2 rounded-full border border-line bg-paper py-1.5 pl-1.5 pr-3 text-caption font-semibold text-ink shadow-sm transition-colors duration-150 hover:border-accent hover:text-accent"
          >
            <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-accent text-paper">
              <Play className="h-3 w-3" />
            </span>
            <span className="max-w-[220px] truncate sm:max-w-xs">{v.title}</span>
          </button>
        ))}
      </div>

      {open ? <VideoModal video={open} onClose={() => setOpenId(null)} /> : null}
    </>
  );
}

function VideoModal({ video, onClose }: { video: VideoReference; onClose: () => void }) {
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [onClose]);

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      style={{ backgroundColor: "var(--backdrop)" }}
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      <div role="dialog" aria-modal="true" aria-label={video.title} className="w-full max-w-3xl overflow-hidden rounded-2xl bg-ink shadow-lg">
        <div className="flex items-center justify-between gap-3 bg-slate px-4 py-2.5">
          <p className="truncate text-caption font-semibold text-paper">{video.title}</p>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close video"
            className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-paper/80 hover:bg-paper/10 hover:text-paper"
          >
            <Close className="h-5 w-5" />
          </button>
        </div>
        <div className="relative w-full" style={{ paddingTop: "56.25%" }}>
          <iframe
            src={`https://www.youtube-nocookie.com/embed/${video.youtubeId}?autoplay=1&rel=0`}
            title={video.title}
            className="absolute inset-0 h-full w-full"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        </div>
      </div>
    </div>
  );
}
