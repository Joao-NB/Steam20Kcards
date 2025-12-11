"use client";

import { motion, useAnimation } from "framer-motion";
import { useEffect, useRef, useState } from "react";

interface CardOptionProps {
  text: string;
  onClick: () => void;
  disabled?: boolean;
  index: number;
  initialRotate?: number;
  isFocused: boolean;
  setFocusedCard: (index: number | null) => void;
  initialAnimation?: {
    y: number;
    rotate: number;
    opacity: number;
    animateY: number;
    animateRotate: number;
    animateOpacity: number;
    delay: number;
  };
  style?: React.CSSProperties;
  isMobile?: boolean;
  textStyle?: React.CSSProperties; // Novo prop para personalizar texto
}

export default function CardOption({
  text,
  onClick,
  disabled = false,
  index,
  initialRotate = 0,
  isFocused,
  setFocusedCard,
  initialAnimation,
  style = {},
  isMobile = false,
  textStyle = {},
}: CardOptionProps) {
  const hoverAudio = useRef<HTMLAudioElement | null>(null);
  const dropAudio = useRef<HTMLAudioElement | null>(null);
  const [dropVolume, setDropVolume] = useState(0.3);
  const [dropPitch, setDropPitch] = useState(1);

  // Controle de movimento aleatório contínuo
  const randomAnim = useAnimation();

  useEffect(() => {
    // Sons
    hoverAudio.current = new Audio("/sounds/card_flip.wav");
    hoverAudio.current.volume = 0.3;

    dropAudio.current = new Audio("/sounds/card_flip.wav");
    const volume = 0.25 + Math.random() * 0.1;
    const pitch = 0.9 + Math.random() * 0.2;
    setDropVolume(volume);
    setDropPitch(pitch);
    dropAudio.current.volume = volume;
    dropAudio.current.playbackRate = pitch;

    const timer = setTimeout(() => dropAudio.current?.play(), (initialAnimation?.delay ?? 0) * 1000);

    // Animação aleatória contínua mais suave
    const animateRandom = async () => {
      while (true) {
        await randomAnim.start({
          x: (Math.random() - 0.5) * 3,       // movimento horizontal menor
          y: (Math.random() - 0.5) * 3,       // movimento vertical menor
          rotate: (Math.random() - 0.5) * 2,  // rotação leve
          transition: { 
            duration: 2 + Math.random() * 2,  // duração maior e variada
            ease: "easeInOut"                 // suaviza a transição
          },
        });
      }
    };
    animateRandom();

    return () => clearTimeout(timer);
  }, []);

  return (
    <motion.div
      onMouseEnter={() => {
        setFocusedCard(index);
        hoverAudio.current?.play();
      }}
      onMouseLeave={() => setFocusedCard(null)}
      initial={{
        y: initialAnimation?.y ?? 0,
        rotate: initialAnimation?.rotate ?? initialRotate,
        opacity: 0,
      }}
      animate={{
        y: isFocused ? -30 : initialAnimation?.animateY ?? 0,
        rotate: isFocused ? 0 : initialAnimation?.animateRotate ?? initialRotate,
        opacity: initialAnimation?.animateOpacity ?? 1,
        scale: isFocused ? 1.15 : 1,
      }}
      transition={{
        type: "spring",
        stiffness: 200,
        damping: 20,
        delay: initialAnimation?.delay ?? 0,
      }}
      className={`perspective cursor-pointer relative`}
      style={{
        ...style,
        width: isMobile ? '120px' : '176px',
        height: isMobile ? '160px' : '240px',
        "--drop-volume": dropVolume,
        "--drop-pitch": dropPitch,
        zIndex: isFocused ? 999 : 1,
        overflow: "visible",
        position: "relative",
      } as React.CSSProperties}
    >
      <motion.div
        onClick={() => { if (!disabled && isFocused) onClick(); }}
        className="relative w-full h-full"
        style={{ transformStyle: "preserve-3d", perspective: 1200 }}
        animate={randomAnim} // movimento contínuo aleatório suave
      >
        {/* Frente da carta */}
        <motion.div
          className="absolute w-full h-full rounded-xl flex items-center justify-center text-center font-bold text-[#2E1B00] shadow-lg"
          style={{
            backfaceVisibility: "hidden",
            backgroundImage: "url('/textures/minha_frente.jpg')",
            backgroundSize: "cover",
            backgroundPosition: "center",
            opacity: disabled ? 0.4 : 1,
            border: "2px solid rgba(0,0,0,0.2)",
          }}
          animate={{ rotateY: isFocused ? 0 : 180 }}
          transition={{ duration: 0.5 }}
        >
          <span
            className="px-2 text-center font-bold text-[#2E1B00]"
            style={{
              fontSize: isMobile ? '0.8rem' : '1rem', // texto menor no mobile
              ...textStyle,
            }}
          >
            {text}
          </span>
        </motion.div>

        {/* Verso da carta */}
        <motion.div
          className="absolute w-full h-full rounded-xl shadow-md flex items-center justify-center"
          style={{
            backfaceVisibility: "hidden",
            backgroundImage: "url('/textures/metal_back.jpg')",
            backgroundSize: "cover",
            backgroundPosition: "center",
            border: "1px solid rgba(0,0,0,0.2)",
          }}
          animate={{ rotateY: isFocused ? 180 : 0 }}
          transition={{ duration: 0.5 }}
        />
      </motion.div>
    </motion.div>
  );
}
