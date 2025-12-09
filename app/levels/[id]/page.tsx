"use client";

import { useState } from "react";
import { useParams, useRouter } from "next/navigation"; 
import { questions, Question, Option } from "@/app/data/questions";
import CardOption from "@/app/components/CardOption";
import { motion } from "framer-motion";
import Image from "next/image";

export default function Page() {
  const { id } = useParams();
  const phase = Number(id) || 1;
  const router = useRouter(); 

  const TOTAL_PHASES = 3; 
  const phaseQuestions: Question[] = questions.filter((q) => q.phase === phase);

  const [current, setCurrent] = useState(0);
  const [lives, setLives] = useState(3);
  const [removedOptions, setRemovedOptions] = useState<number[]>([]);
  const [disableAll, setDisableAll] = useState(false);

  const question = phaseQuestions[current];

  function handleOptionClick(optionIndex: number) {
    if (disableAll) return;
    const option: Option | undefined = question?.options[optionIndex];
    if (!option) return;

    if (option.correct) {
      setDisableAll(true);
      window.alert(`✅ Correto!\n\n${option.feedback || ""}`);

      if (current + 1 < phaseQuestions.length) {
        setCurrent((c) => c + 1);
        setRemovedOptions([]);
        setDisableAll(false);
      } else {
        const nextPhase = phase + 1;
        if (nextPhase <= TOTAL_PHASES) {
          window.alert(`🎉 Você concluiu a Fase ${phase}! Preparando para a Fase ${nextPhase}...`);
          router.push(`/levels/${nextPhase}`); 
        } else {

            // Todas as fases concluídas
            setDisableAll(true);
            router.push("/levels/finish")
           

        }
      }
    } else {
      setLives((prev) => {
        const novo = prev - 1;
        if (novo <= 0) {
        
          setCurrent(0);
          setRemovedOptions([]);
          setDisableAll(false);
          router.push("/levels/gameover");
          return 3;
          

        } else {
          setRemovedOptions((prevArr) => [...prevArr, optionIndex]);
          window.alert(`❌ Incorreto.\n\n${option.feedback || ""}`);
          return novo;
        }
      });
    }
  }

  if (phaseQuestions.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center font-game">
        <p>Nenhuma pergunta encontrada para a fase {phase}.</p>
      </div>
    );
  }

  return (
    <div
      key={phase}
      className="flex min-h-screen w-dvw justify-between gap-4 font-game"
      style={{ backgroundImage: "url('/texture.jpg')" }}
    >
      {/* Lado esquerdo — vidas com imagem de fundo animada */}
      <aside className="flex-1 relative flex flex-col justify-center gap-6 overflow-visible">
  {/* Fundo das engrenagens vindo da esquerda */}
  <motion.div
    initial={{ x: -300, opacity: 0 }}
    animate={{ x: 0, opacity: 1 }}
    transition={{ type: "spring", stiffness: 100, damping: 15, duration: 1.2 }}
    className="absolute top-1/2 -translate-y-1/2 left-[-180px] z-0" // saiu mais pra esquerda
  >
    <Image
      src="/images/fundo_engrenagens.png"
      alt="fundo engrenagens"
      width={320}   // largura menor
      height={240}  // altura menor
      priority
    />
  </motion.div>

  {/* Engrenagens animadas */}
  {Array.from({ length: 3 }).map((_, v) => (
    <motion.img
      key={v}
      src={v < lives ? "/images/gear_orange.png" : "/images/gear_gray.png"}
      alt="gear"
      className="h-20 w-20 relative z-10"
      initial={{ x: -200, opacity: 0 }}
      animate={{ x: 0, opacity: 1, rotate: v < lives ? 360 : 0 }}
      transition={{ type: "spring", stiffness: 120, damping: 12, duration: 1 }}
    />
  ))}
</aside>


      {/* Área principal */}
      <main className="flex-4 flex flex-col justify-between items-center py-6 w-full">
        {/* Letreiro da pergunta estilo steampunk pendurado */}
        <motion.div
          initial={{ y: -200, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ type: "spring", stiffness: 120, damping: 12 }}
          className="relative w-5/7 h-22 mt-4 flex items-center justify-center shadow-2xl"
          style={{
            backgroundImage: "url('/textures/letreiro.jpg')",
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat"
          }}
        >
          <span className="text-black text-xl font-semibold text-center">{question?.question}</span>
        </motion.div>

        {/* Cards */}
        <div className="w-full flex flex-wrap justify-center items-center gap-6 mt-8 px-6 relative">
          {question.options.map((opt, index) => {
            const removed = removedOptions.includes(index);
            if (removed) return null;

            return (
              <CardOption
                key={opt.id}
                text={opt.text}
                onClick={() => handleOptionClick(index)}
                disabled={disableAll}
                index={index}
                initialRotate={0}
              />
            );
          })}
        </div>
      </main>
    </div>
  );
}
