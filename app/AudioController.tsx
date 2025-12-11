"use client";

import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";

export default function AudioController() {
  const pathname = usePathname();
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const currentPhaseRef = useRef<number | null>(null);

  function stopAudio() {
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
      audioRef.current = null;
    }
  }

  function playMusic(phase: number) {
    stopAudio();

    const audio = new Audio(`/sounds/fase${phase}.mp3`);
    audio.volume = 0.4;
    audio.loop = true;
    audio.play().catch(() => {});
    audioRef.current = audio;
    currentPhaseRef.current = phase;
  }

  useEffect(() => {
    const regex = /^\/levels\/([0-9]+)$/;
    const match = pathname.match(regex);

    if (!match) {
      stopAudio();
      currentPhaseRef.current = null;
      return;
    }

    const phase = Number(match[1]);
    if (currentPhaseRef.current !== phase) {
      playMusic(phase);
    }

    const handleVisibility = () => {
      if (document.visibilityState === "hidden") {
        stopAudio();
      } else if (document.visibilityState === "visible" && currentPhaseRef.current === phase) {
        playMusic(phase);
      }
    };

    const handleBlur = () => stopAudio();
    const handleFocus = () => {
      if (currentPhaseRef.current === phase) playMusic(phase);
    };

    document.addEventListener("visibilitychange", handleVisibility);
    window.addEventListener("blur", handleBlur);
    window.addEventListener("focus", handleFocus);

    return () => {
      stopAudio();
      document.removeEventListener("visibilitychange", handleVisibility);
      window.removeEventListener("blur", handleBlur);
      window.removeEventListener("focus", handleFocus);
    };
  }, [pathname]);

  return null;
}
