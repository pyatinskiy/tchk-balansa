import { useEffect, useRef, useState } from "react";

export function useAudioPlayer(src: string) {

  const audioRef = useRef<HTMLAudioElement | null>(null);


  const [isPlaying, setIsPlaying] = useState(false);

  const [currentTime, setCurrentTime] = useState(0);

  const [duration, setDuration] = useState(0);

  const [speed, setSpeed] = useState(1);



  useEffect(() => {

    const audio = new Audio(src);

    audioRef.current = audio;


    audio.addEventListener(
      "loadedmetadata",
      () => {
        setDuration(audio.duration);
      }
    );


    audio.addEventListener(
      "timeupdate",
      () => {
        setCurrentTime(audio.currentTime);
      }
    );


    audio.addEventListener(
      "ended",
      () => {
        setIsPlaying(false);
        setCurrentTime(0);
      }
    );



    return () => {

      audio.pause();

      audio.src = "";

    };


  }, [src]);





  function play() {

    if (!audioRef.current) return;


    audioRef.current.play();

    setIsPlaying(true);

  }





  function pause() {

    if (!audioRef.current) return;


    audioRef.current.pause();

    setIsPlaying(false);

  }





  function toggle() {

    if (isPlaying) {

      pause();

    } else {

      play();

    }

  }





  function seek(value: number) {

    if (!audioRef.current) return;


    audioRef.current.currentTime = value;

    setCurrentTime(value);

  }





  function skip(seconds: number) {

    if (!audioRef.current) return;


    audioRef.current.currentTime =
      Math.max(
        0,
        Math.min(
          duration,
          audioRef.current.currentTime + seconds
        )
      );

  }





  function changeSpeed(value: number) {

    if (!audioRef.current) return;


    audioRef.current.playbackRate = value;

    setSpeed(value);

  }





  return {

    isPlaying,

    currentTime,

    duration,

    speed,

    toggle,

    seek,

    skip,

    changeSpeed,

  };

}