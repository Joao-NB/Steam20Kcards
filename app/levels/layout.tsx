"use client";

import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";

export default function LevelsLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const audioRef = useRef<HTMLAudioElement | null>(null);

  // Pega o número da fase da URL
  function getPhaseFromPath(path: string | null) {
    if (!path) return null;
    const m = path.match(/^\/levels\/(\d+)(?:\/|$|\?)/);
    return m ? Number(m[1]) : null;
  }

  useEffect(() => {
    const phase = getPhaseFromPath(pathname);
    if (!phase) return;

    if (!audioRef.current) {
      const el = document.createElement("audio");
      el.id = "levels-global-audio";
      el.src = `/sounds/fase${phase}.mp3`;
      el.loop = true;
      el.preload = "auto";
      el.volume = 0.4;
      document.body.appendChild(el);
      audioRef.current = el;
    } else {
      audioRef.current.src = `/sounds/fase${phase}.mp3`;
      audioRef.current.load();
    }

    const playAudio = async () => {
      try {
        await audioRef.current?.play();
        console.debug(`[Audio] Fase ${phase} tocando`);
      } catch {
        // Bloqueio de autoplay resolvido pelo primeiro clique do usuário
      }
    };

    playAudio();

    // Cleanup: pausa ao sair do layout
    return () => {
      audioRef.current?.pause();
    };
  }, [pathname]);

  // Listener global para permitir tocar após o primeiro clique do usuário
  useEffect(() => {
    const handleFirstInteraction = () => {
      if (!audioRef.current) return;
      audioRef.current.play().catch(() => {});
      window.removeEventListener("click", handleFirstInteraction);
    };

    window.addEventListener("click", handleFirstInteraction);
    return () => window.removeEventListener("click", handleFirstInteraction);
  }, []);

  return <>{children}</>;
}
