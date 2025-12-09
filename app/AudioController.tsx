"use client";

import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";

export default function AudioController() {
  const pathname = usePathname();
  const audioRef = useRef<HTMLAudioElement | null>(null);

  function playMusic(path: string) {
    const regex = /^\/levels\/([0-9]+)$/;
    const match = path.match(regex);

    // ❌ Se não for uma fase → parar música
    if (!match) {
      audioRef.current?.pause();
      return;
    }

    const phase = Number(match[1]);

    // Para música anterior
    audioRef.current?.pause();

    // Cria nova trilha
    const audio = new Audio(`/sounds/fase${phase}.mp3`);
    audio.volume = 0.4;
    audio.loop = true;

    // Tenta tocar (em refresh funciona pois é interação direta)
    audio.play().catch(() => {});

    audioRef.current = audio;
  }

  // 🔥 roda sempre que a rota muda
  useEffect(() => {
    playMusic(pathname);
  }, [pathname]);

  // 🔥 roda no carregamento inicial (digitando URL ou dando F5)
  useEffect(() => {
    playMusic(window.location.pathname);
  }, []);

  return null;
}
