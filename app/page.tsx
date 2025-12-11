"use client";

import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { motion } from "framer-motion";

export default function Home() {
  const [hoverEffect, setHoverEffect] = useState(false);

  const containerVariants = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.2 } },
  };

  const imageVariants = {
    hidden: { y: -100, opacity: 0, rotate: -10 },
    visible: { 
      y: 0, 
      opacity: 1, 
      rotate: 0, 
      transition: { type: "spring" as const, stiffness: 150, damping: 12 } // ✅ corrigido
    },
  };

  const buttonVariants = {
    hidden: { y: 50, opacity: 0, rotate: -5, scale: 0.8 },
    visible: { 
      y: 0, 
      opacity: 1, 
      rotate: 0, 
      scale: 1, 
      transition: { type: "spring" as const, stiffness: 200, damping: 15 } // ✅ corrigido
    },
  };

  return (
    <div
      className="flex min-h-screen w-dvw items-center justify-center p-4 bg-cover"
      style={{ backgroundImage: "url('/texture.jpg')" }}
    >
      <motion.div
        className="w-full max-w-7xl h-auto flex flex-col md:flex-row items-center md:items-start p-4 gap-6"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* IMAGEM LATERAL MAIOR */}
        <motion.div
          className={`w-full md:w-3/5 flex justify-center transition-transform duration-500 ${hoverEffect ? "scale-110" : "scale-100"}`}
          variants={imageVariants}
        >
          <Image
            src="/Vector.svg"
            alt="Vector"
            width={600}
            height={600}
            className="w-full max-w-md md:max-w-full h-auto object-contain"
            priority
          />
        </motion.div>

        {/* BOTÕES */}
        <motion.div className="w-full md:w-2/5 flex justify-center items-center font-game" variants={containerVariants}>
          <div className="flex flex-col items-center space-y-6">
            {/* BOTÃO GRANDE - JOGAR */}
            <Link href="/levels/1">
              <motion.div
                onMouseEnter={() => setHoverEffect(true)}
                onMouseLeave={() => setHoverEffect(false)}
                className="border-2 border-brand-primary font-bold text-4xl text-brand-primary px-14 py-8 w-72 text-center rounded-b-4xl cursor-pointer transition-all duration-300 hover:scale-110 hover:shadow-xl hover:bg-brand-primary hover:text-black"
                variants={buttonVariants}
              >
                JOGAR
              </motion.div>
            </Link>

            {/* BOTÃO MÉDIO - CRÉDITOS */}
            <Sheet>
              <SheetTrigger asChild>
                <motion.div
                  onMouseEnter={() => setHoverEffect(true)}
                  onMouseLeave={() => setHoverEffect(false)}
                  className="border-2 border-brand-primary font-bold text-3xl text-brand-primary px-12 py-6 w-64 text-center rounded-b-4xl cursor-pointer transition-all duration-300 hover:scale-110 hover:shadow-xl hover:bg-brand-primary hover:text-black"
                  variants={buttonVariants}
                >
                  CRÉDITOS
                </motion.div>
              </SheetTrigger>
              <SheetContent className="border-2 border-r-0 rounded-l-xl border-brand-primary bg-brand-gray text-brand-light">
                <SheetHeader>
                  <SheetTitle className="text-brand-light text-2xl">CRÉDITOS</SheetTitle>
                </SheetHeader>

                <div className="p-4 space-y-4">
                  <h1 className="text-xl">
                    <span className="font-bold">Arthur do Nascimento Penaforte:</span> Desenvolvedor Front-End.
                  </h1>
                  <h1 className="text-xl">
                    <span className="font-bold">Hugo Henrique Andrade Lima:</span> Diretor de Arte e Designer.
                  </h1>
                  <h1 className="text-xl">
                    <span className="font-bold">Ivisson Pereira Do Nascimento Alves:</span> Arquiteto de software.
                  </h1>
                  <h1 className="text-xl">
                    <span className="font-bold">João Guilherme Nemesio Beltrão:</span> Desenvolvedor Front-End.
                  </h1>
                  <h1 className="text-xl">
                    <span className="font-bold">Pedro Augusto Veiga Pessoa De Araújo:</span> QA.
                  </h1>
                  <h1 className="text-xl">
                    <span className="font-bold">Pedro Guedes Lunguinho Silva:</span> Game Design.
                  </h1>
                  <h1 className="text-xl">
                    <span className="font-bold">Túlio Lemos Cabral:</span> Gestor de projeto e QA.
                  </h1>
                </div>
              </SheetContent>
            </Sheet>

            {/* BOTÃO PEQUENO - SAIR */}
            <Link href="https://youtu.be/dQw4w9WgXcQ?si=Qk66UPnGTi8DqDSb">
              <motion.div
                onMouseEnter={() => setHoverEffect(true)}
                onMouseLeave={() => setHoverEffect(false)}
                className="border-2 border-brand-primary font-bold text-2xl text-brand-primary px-8 py-5 w-52 text-center rounded-b-4xl cursor-pointer transition-all duration-300 hover:scale-110 hover:shadow-xl hover:bg-brand-primary hover:text-black"
                variants={buttonVariants}
              >
                SAIR
              </motion.div>
            </Link>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
}
