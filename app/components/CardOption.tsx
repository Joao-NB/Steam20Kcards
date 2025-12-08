"use client";

import { motion } from "framer-motion";

export default function CardOption({
  text,
  onClick,
  disabled = false,
}: {
  text: string;
  onClick: () => void;
  disabled?: boolean;
}) {
  return (
    <motion.button
      onClick={onClick}
      disabled={disabled}
      initial={{ rotateY: 180, opacity: 0 }}
      animate={{ rotateY: 0, opacity: 1 }}
      whileHover={{ scale: disabled ? 1 : 1.05 }}
      transition={{ duration: 0.4 }}
      className={`
        w-40 h-56 
        rounded-xl 
        shadow-xl 
        border border-gray-700
        flex items-center justify-center
        text-center font-semibold text-white
        transition-all
        ${disabled ? "opacity-40 pointer-events-none" : "bg-gray-800 hover:bg-gray-700"}
      `}
      style={{
        perspective: 1000,
      }}
    >
      <span className="px-2">{text}</span>
    </motion.button>
  );
}
