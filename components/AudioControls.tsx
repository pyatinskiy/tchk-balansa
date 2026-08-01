"use client";

type AudioControlsProps = {
  isPlaying: boolean;
  speed: number;
  onToggle: () => void;
  onBack: () => void;
  onForward: () => void;
  onSpeedChange: (speed: number) => void;
};

const speeds = [1, 1.25, 1.5, 2];

export default function AudioControls({
  isPlaying,
  speed,
  onToggle,
  onBack,
  onForward,
  onSpeedChange,
}: AudioControlsProps) {
  return (
    <div className="mt-8 flex items-center justify-between">

      {/* Перемотка назад */}
      <button
        onClick={onBack}
        className="rounded-full border border-zinc-200 px-4 py-2 text-sm font-medium transition hover:border-orange-400 hover:text-orange-500"
      >
        ↺15
      </button>

      {/* Play / Pause */}
      <button
        onClick={onToggle}
        className="
          flex
          h-16
          w-16
          items-center
          justify-center
          rounded-full
          bg-black
          text-2xl
          text-white
          transition
          hover:bg-orange-500
        "
      >
        {isPlaying ? "❚❚" : "▶"}
      </button>

      {/* Перемотка вперед */}
      <button
        onClick={onForward}
        className="rounded-full border border-zinc-200 px-4 py-2 text-sm font-medium transition hover:border-orange-400 hover:text-orange-500"
      >
        15↻
      </button>

      {/* Скорость */}
      <select
        value={speed}
        onChange={(e) => onSpeedChange(Number(e.target.value))}
        className="
          rounded-full
          border
          border-zinc-200
          bg-white
          px-4
          py-2
          text-sm
          outline-none
          transition
          hover:border-orange-400
          focus:border-orange-500
        "
      >
        {speeds.map((item) => (
          <option key={item} value={item}>
            {item}×
          </option>
        ))}
      </select>

    </div>
  );
}