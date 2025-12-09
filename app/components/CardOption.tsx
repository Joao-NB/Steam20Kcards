"use client";

import { motion } from "framer-motion";

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
}: CardOptionProps) {
  return (
    <motion.div
      onMouseEnter={() => setFocusedCard(index)}
      onMouseLeave={() => setFocusedCard(null)}
      initial={{
        y: initialAnimation?.y ?? 0,
        rotate: initialAnimation?.rotate ?? initialRotate,
        opacity: initialAnimation?.opacity ?? 0,
      }}
      animate={{
        y: isFocused
          ? -30
          : initialAnimation?.animateY ?? 0,
        rotate: isFocused
          ? 0
          : initialAnimation?.animateRotate ?? initialRotate,
        opacity: initialAnimation?.animateOpacity ?? 1,
        scale: isFocused ? 1.15 : 1,
      }}
      transition={{
        type: "spring",
        stiffness: 200,
        damping: 20,
        delay: initialAnimation?.delay ?? 0,
      }}
      className="w-44 h-60 perspective cursor-pointer"
      style={style}
    >
      <motion.div
        onClick={() => { if (!disabled && isFocused) onClick(); }}
        className="relative w-full h-full"
        style={{ transformStyle: "preserve-3d", perspective: 1200 }}
      >
        {/* Frente da carta */}
        <motion.div
          className="absolute w-full h-full rounded-xl flex items-center justify-center text-center font-bold text-[#2E1B00] shadow-lg"
          style={{
            backfaceVisibility: "hidden",
            backgroundImage: "url('/textures/frente_card.jpg')",
            backgroundSize: "cover",
            backgroundPosition: "center",
            opacity: disabled ? 0.4 : 1,
            border: "2px solid rgba(0,0,0,0.2)"
          }}
          animate={{ rotateY: isFocused ? 0 : 180 }}
          transition={{ duration: 0.5 }}
        >
          <span className="px-2 text-lg">{text}</span>
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
