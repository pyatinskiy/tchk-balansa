"use client";

type ProgressBarProps = {
  currentTime: number;
  duration: number;
  onSeek: (value: number) => void;
};


export default function ProgressBar({
  currentTime,
  duration,
  onSeek,
}: ProgressBarProps) {


  function handleChange(
    event: React.ChangeEvent<HTMLInputElement>
  ) {

    onSeek(Number(event.target.value));

  }



  return (

    <div className="w-full">

      <input
        type="range"
        min="0"
        max={duration || 0}
        value={currentTime}
        onChange={handleChange}
        className="
          w-full
          accent-orange-500
          cursor-pointer
        "
      />


    </div>

  );

}