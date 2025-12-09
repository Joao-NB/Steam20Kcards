"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";

export default function CardOption({
  text,
  onClick,
  disabled = false,
  index = 0,
  initialRotate = 0,
}: {
  text: string;
  onClick: () => void;
  disabled?: boolean;
  index?: number;
  initialRotate?: number;
}) {
  const [flipped, setFlipped] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setFlipped(true), 500 + index * 150);
    return () => clearTimeout(timer);
  }, [index]);

  return (
    <motion.div
      initial={{ y: -50, opacity: 0, rotate: initialRotate }}
      animate={{ y: 0, opacity: 1, rotate: 0 }}
      whileHover={{ scale: disabled ? 1 : 1.05, y: disabled ? 0 : -5, rotate: disabled ? 0 : 2 }}
      transition={{ type: "spring", stiffness: 200, damping: 15 }}
      className="w-44 h-60 perspective"
      style={{ zIndex: 100 - index }}
    >
      <motion.div
        onClick={() => { if (!disabled) onClick(); }}
        className="relative w-full h-full cursor-pointer"
        style={{ transformStyle: "preserve-3d", perspective: 1200 }}
      >
        {/* Frente da carta */}
        <motion.div
          className="absolute w-full h-full rounded-2xl border flex items-center justify-center text-center font-bold text-[#2E1B00] shadow-2xl"
          style={{
            backfaceVisibility: "hidden",
            rotateY: flipped ? 0 : 180,
            backgroundColor: "#dfd1b7",
            borderColor: "#a88d72",
            opacity: disabled ? 0.4 : 1
          }}
          animate={{ rotateY: flipped ? 0 : 180 }}
          transition={{ duration: 0.6 }}
          whileHover={{
            boxShadow: disabled
              ? "0px 5px 10px rgba(0,0,0,0.3)"
              : "5px 7px 15px rgba(0,0,0,0.5)",
            transition: { type: "tween", duration: 0.3 }
          }}
        >
          <span className="px-4 text-lg">{text}</span>
        </motion.div>

        {/* Verso da carta */}
        <motion.div
          className="absolute w-full h-full rounded-2xl shadow-2xl border-4 flex items-center justify-center"
          style={{
            backfaceVisibility: "hidden",
            rotateY: flipped ? 180 : 0,
            backgroundImage: "url('/textures/metal_back.jpg')",
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
            borderColor: "#a68c5f",
          }}
          animate={{ rotateY: flipped ? 180 : 0 }}
          transition={{ duration: 0.6 }}
          whileHover={{
            boxShadow: disabled
              ? "0px 5px 10px rgba(0,0,0,0.3)"
              : "5px 7px 15px rgba(0,0,0,0.5)",
            transition: { type: "tween", duration: 0.3 }
          }}
        />
      </motion.div>
    </motion.div>
  );
}
