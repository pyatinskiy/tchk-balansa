"use client";

import type { Episode } from "@/app/lib/rss";
import { useAudioPlayer } from "@/hooks/useAudioPlayer";
import ProgressBar from "./ProgressBar";
import AudioControls from "./AudioControls";

function formatTime(seconds: number) {
  if (!seconds || Number.isNaN(seconds)) return "00:00";

  const min = Math.floor(seconds / 60);
  const sec = Math.floor(seconds % 60);

  return `${String(min).padStart(2, "0")}:${String(sec).padStart(2, "0")}`;
}

type PodcastPlayerProps = {
  episode: Episode;
  onClose: () => void;
};

export default function PodcastPlayer({
  episode,
  onClose,
}: PodcastPlayerProps) {

  const {
    isPlaying,
    currentTime,
    duration,
    speed,
    toggle,
    seek,
    skip,
    changeSpeed,
  } = useAudioPlayer(episode.audio);

  return (

    <div
      className="
        relative
        overflow-hidden
        rounded-[32px]
        bg-white
        shadow-2xl
        border
        border-zinc-300
      "
    >

      {/* внутренняя фирменная рамка */}

      <div
        className="
          pointer-events-none
          absolute
          inset-3
          rounded-[24px]
          border
          border-orange-200
        "
      />

      {/* крестик */}

      <button
        onClick={onClose}
        className="
          absolute
          right-5
          top-5
          z-20
          flex
          h-10
          w-10
          items-center
          justify-center
          rounded-full
          border
          border-zinc-200
          bg-white
          text-xl
          text-zinc-500
          transition
          hover:border-orange-500
          hover:text-orange-500
        "
      >
        ✕
      </button>

      <div className="relative p-8">

        <div className="flex gap-6">

          {episode.image && (

            <img
              src={episode.image}
              alt={episode.title}
              className="
                h-28
                w-28
                rounded-2xl
                object-cover
              "
            />

          )}

          <div className="flex-1">

            <div
              className="
                flex
                items-center
                gap-2
                text-sm
                text-zinc-500
              "
            >

              <span className="text-orange-500">
                ●
              </span>

              Новый выпуск

            </div>

            <h2
              className="
                mt-3
                text-2xl
                font-semibold
                leading-tight
              "
            >
              {episode.title}
            </h2>

          </div>

        </div>

        <div className="mt-8">

          <ProgressBar
            currentTime={currentTime}
            duration={duration}
            onSeek={seek}
          />

        </div>

        <div
          className="
            mt-2
            flex
            justify-between
            text-sm
            text-zinc-500
          "
        >

          <span>{formatTime(currentTime)}</span>

          <span>{formatTime(duration)}</span>

        </div>

        <AudioControls
          isPlaying={isPlaying}
          speed={speed}
          onToggle={toggle}
          onBack={() => skip(-15)}
          onForward={() => skip(15)}
          onSpeedChange={changeSpeed}
        />

      </div>

    </div>

  );

}