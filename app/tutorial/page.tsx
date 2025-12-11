"use client";
import { useState, useEffect } from "react";
import { Dialog } from "@/components/ui/dialog";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence, easeOut, easeIn } from "framer-motion";

export default function TutorialPage() {
  const [currentModal, setCurrentModal] = useState(0);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 640);
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const tutorialMessages = [
    "BEM VINDO AO STEAM 20K CARDS",
    "AQUI APRENDEREMOS SOBRE A ISO 20000 DE FORMA INTERATIVA",
    "FUNCIONARA DA SEGUINTE FORMA:",
    "HA 4 MAPAS, CADA UM CONTENDO 5 PERGUNTAS DO AMBIENTE DE TRABALHO",
    "PARA CADA PERGUNTA VOCE TERA 5 OPÇÕES DE RESPOSTAS, CARDS, QUE ESTARAO NO SEU DECK",
    "CADA PERGUNTA TERA UMA RESPOSTA CORRETA. CASO ESCOLHA O CARD ERRADO, PERDERA UMA VIDA. AO PERDER TODAS, REINICIA A FASE INTEIRA"
  ];

  const playSound = () => {
    const audio = new Audio("/sounds/card_drop.mp3");
    audio.play();
  };

  useEffect(() => {
    playSound();
  }, []);

  const nextModal = () => {
    if (currentModal < tutorialMessages.length - 1) {
      setCurrentModal(prev => prev + 1);
      playSound();
    } else {
      window.location.href = "/levels/1";
    }
  };

  const modalVariants = {
    hidden: { x: 300, y: -30, rotate: -15, scale: 0.9, opacity: 0 },
    visible: { 
      x: 0, y: 0, rotate: 0, scale: 1, opacity: 1, 
      transition: { duration: 0.6, ease: easeOut } 
    },
    exit: { 
      x: -300, y: 30, rotate: 15, scale: 0.9, opacity: 0, 
      transition: { duration: 0.6, ease: easeIn } 
    },
  };

  return (
    <div
      className="relative flex flex-col items-center justify-center min-h-screen w-full bg-cover bg-center overflow-hidden"
      style={{ backgroundImage: "url('/texture.jpg')" }}
    >
      <Link href="/" className="absolute top-4 right-4 z-[200] w-12 h-12 md:w-16 md:h-16">
        <Image src="/Vector.svg" alt="Voltar para Home" width={64} height={64} className="object-contain cursor-pointer" />
      </Link>

      <Dialog open={true} onOpenChange={() => {}} modal={false}>
        <AnimatePresence mode="wait">
          <motion.div
            key={currentModal}
            variants={modalVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            onClick={nextModal}
            className="cursor-pointer flex flex-col items-center text-center w-[90%] sm:w-[65%] max-w-[1000px]"
            style={{
              backgroundImage: "url('/images/fundo_modal.png')",
              backgroundSize: "cover",
              backgroundPosition: "center",
              backgroundRepeat: "no-repeat",
              borderRadius: 0,
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
              zIndex: 100,
              padding: isMobile ? "20px 15px" : "40px",
              minHeight: isMobile ? "45vh" : currentModal === 5 ? "530px" : "480px", // só um pouco maior
              maxHeight: isMobile ? "60vh" : currentModal === 5 ? "630px" : "630px",
              overflowY: isMobile ? "auto" : "visible",
            }}
          >
            <div className="flex flex-col justify-center items-center w-full h-full">
              <p
                className="leading-relaxed text-center uppercase text-[#4e4540] max-w-[90%] sm:max-w-[550px] mx-auto break-words"
                style={{ 
                  fontSize: currentModal === 5 
                    ? (isMobile ? '1.5rem' : '2rem') 
                    : (isMobile ? '1.9rem' : '2.6rem'), 
                  lineHeight: isMobile ? (currentModal === 5 ? 1.7 : 1.9) : (currentModal === 5 ? 1.8 : 2)
                }}
              >
                {tutorialMessages[currentModal]}
              </p>

              {currentModal === 5 && (
                <div className="flex flex-row justify-center items-center gap-3 mt-4">
                  <Image src="/images/gear_orange.png" alt="Engrenagem" width={isMobile ? 32 : 50} height={isMobile ? 32 : 50} />
                  <Image src="/images/gear_orange.png" alt="Engrenagem" width={isMobile ? 32 : 50} height={isMobile ? 32 : 50} />
                  <Image src="/images/gear_orange.png" alt="Engrenagem" width={isMobile ? 32 : 50} height={isMobile ? 32 : 50} />
                </div>
              )}
            </div>

            <span
              className="text-[1rem] sm:text-[1.05rem] text-center text-[#4e4540] mt-4"
            >
              Clique em qualquer lugar para continuar
            </span>
          </motion.div>
        </AnimatePresence>
      </Dialog>
    </div>
  );
}
