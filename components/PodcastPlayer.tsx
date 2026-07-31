"use client";

import type { Episode } from "@/app/lib/rss";

export default function PodcastPlayer({
  episode,
  onClose,
}: {
  episode: Episode;
  onClose: () => void;
}) {
  return (
    <div className="relative overflow-hidden rounded-[32px] border border-zinc-300 bg-white p-8 shadow-2xl">

      {/* фирменная внутренняя рамка */}
      <div className="pointer-events-none absolute inset-3 rounded-[24px] border border-orange-200" />

      <button
        onClick={onClose}
        className="absolute right-6 top-6 z-20 flex h-10 w-10 items-center justify-center rounded-full border border-zinc-200 bg-white text-xl text-zinc-500 transition hover:border-orange-400 hover:text-orange-500"
        aria-label="Закрыть"
      >
        ×
      </button>

      <div className="relative flex items-center gap-6">
        {episode.image && (
          <img
            src={episode.image}
            alt={episode.title}
            className="h-24 w-24 rounded-2xl object-cover"
          />
        )}

        <div className="pr-12 text-left">
          <div className="flex items-center gap-2 text-sm text-zinc-500">
            <span className="text-orange-500">●</span>
            Последний выпуск
          </div>

          <h3 className="mt-3 text-2xl font-semibold leading-tight">
            {episode.title}
          </h3>
        </div>
      </div>

      <audio
        controls
        src={episode.audio}
        className="relative mt-8 w-full"
      />
    </div>
  );
}