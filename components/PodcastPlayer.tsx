"use client";

import { Episode } from "@/lib/rss";

export default function PodcastPlayer({
  episode,
}: {
  episode: Episode;
}) {
  return (
    <div className="mt-10 rounded-3xl border border-zinc-200 p-6 text-left bg-white shadow-sm">

      <div className="flex gap-5 items-center">

        {episode.image && (
          <img
            src={episode.image}
            alt={episode.title}
            className="w-20 h-20 rounded-2xl object-cover"
          />
        )}

        <div>
          <p className="text-sm text-zinc-400">
            Последний выпуск
          </p>

          <h3 className="text-xl font-semibold">
            {episode.title}
          </h3>
        </div>

      </div>


      <audio
        controls
        className="w-full mt-6"
        src={episode.audio}
      />

    </div>
  );
}