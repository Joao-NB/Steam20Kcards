"use client";

import { useState, useRef, useEffect, useMemo } from "react";
import { useParams, useRouter } from "next/navigation";
import { questions, Question, Option } from "@/app/data/questions";
import CardOption from "@/app/components/CardOption";
import { motion, Transition } from "framer-motion";
import Image from "next/image";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { DialogTitle } from "@radix-ui/react-dialog";
import { Button } from "@/components/ui/button";

interface RandomProps {
  volume: number;
  pitch: number;
}

export default function Page() {
  const { id } = useParams();
  const phase = Number(id) || 1;
  const router = useRouter();

  const TOTAL_PHASES = 4;

  const phaseQuestions: Question[] = useMemo(
    () => questions.filter((q) => q.phase === phase),
    [phase]
  );

  const [current, setCurrent] = useState(0);
  const [lives, setLives] = useState(3);
  const [removedOptions, setRemovedOptions] = useState<number[]>([]);
  const [disableAll, setDisableAll] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const [isWrong, setIsWrong] = useState(false);
  const [isPhaseFinished, setIsPhaseFinished] = useState(false);
  const [feedback, setFeedback] = useState("");
  const [focusedCard, setFocusedCard] = useState<number | null>(null);
  const [randomProps, setRandomProps] = useState<RandomProps[]>([]);

  const correctAudioRef = useRef<HTMLAudioElement | null>(null);
  const wrongAudioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    correctAudioRef.current = new Audio("/sounds/card_correct.mp3");
    correctAudioRef.current.volume = 0.4;

    wrongAudioRef.current = new Audio("/sounds/card_rip.wav");
    wrongAudioRef.current.volume = 0.4;
  }, []);

  const question = phaseQuestions[current];
  const nextPhase = phase + 1;

  // Gera valores aleatórios apenas quando current muda
  useEffect(() => {
    const props = phaseQuestions[current]?.options.map(() => ({
      volume: 0.25 + Math.random() * 0.1,
      pitch: 0.9 + Math.random() * 0.2,
    }));
    setRandomProps(props || []);
  }, [current, phaseQuestions]);

  function handleOptionClick(optionIndex: number) {
    if (disableAll) return;

    const option: Option | undefined = question?.options[optionIndex];
    if (!option) return;

    if (option.correct) {
      setDisableAll(true);
      setIsCorrect(true);
      setFeedback(option.feedback || "");
      correctAudioRef.current?.play();

      if (current + 1 < phaseQuestions.length) {
        setTimeout(() => {
          setCurrent((c) => c + 1);
          setRemovedOptions([]);
          setDisableAll(false);
        }, 500);
      } else {
        if (nextPhase <= TOTAL_PHASES) {
          setIsPhaseFinished(true);
        } else {
          router.push("/levels/finish");
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
          setIsWrong(true);
          setFeedback(option.feedback || "");
          wrongAudioRef.current?.play();
          return novo;
        }
      });
    }
  }

  if (!question) {
    return (
      <div className="min-h-screen flex items-center justify-center font-game">
        <p>Nenhuma pergunta encontrada para a fase {phase}.</p>
      </div>
    );
  }

  const dropAnimation = { y: 0, opacity: 1 };
  const initialDrop = { y: -200, opacity: 0 };
  const dropTransition: Transition = { type: "spring", stiffness: 120, damping: 12 };

  return (
    <div
      key={phase}
      className="flex min-h-screen w-dvw justify-between gap-4 font-game overflow-hidden relative"
      style={{ backgroundImage: "url('/texture.jpg')" }}
    >
      {/* VIDAS */}
      <aside className="flex-1 relative flex flex-col justify-center gap-6 overflow-visible">
        <motion.div
          initial={{ x: -300, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ type: "spring", stiffness: 100, damping: 15, duration: 1.2 }}
          className="absolute top-1/2 -translate-y-1/2 left-[-180px] z-0"
        >
          <Image
            src="/images/fundo_engrena.png"
            alt="fundo engrena"
            width={280}
            height={100}
            priority
          />
        </motion.div>

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

      {/* PERGUNTA + OPÇÕES */}
      <main className="flex-4 flex flex-col justify-between items-center py-6 w-full relative">
        {/* DIÁLOGOS DE FEEDBACK */}
        <Dialog open={isCorrect} onOpenChange={setIsCorrect}>
          <DialogContent
            className="z-110 h-48 text-center"
            style={{
              backgroundImage: "url('/textures/mesa_western.jpg')",
              backgroundSize: "cover",
              backgroundPosition: "center",
              backgroundRepeat: "no-repeat",
            }}
          >
            <DialogTitle>RESPOSTA CORRETA!!</DialogTitle>
            <p>{feedback}</p>
          </DialogContent>
        </Dialog>

        <Dialog open={isWrong} onOpenChange={setIsWrong}>
          <DialogContent
            className="z-110 h-48 text-center"
            style={{
              backgroundImage: "url('/textures/mesa_western.jpg')",
              backgroundSize: "cover",
              backgroundPosition: "center",
              backgroundRepeat: "no-repeat",
            }}
          >
            <DialogTitle>RESPOSTA INCORRETA!</DialogTitle>
            <p>{feedback}</p>
          </DialogContent>
        </Dialog>

        <Dialog open={isPhaseFinished} onOpenChange={setIsPhaseFinished}>
          <DialogContent
            className="z-110 h-48 text-center"
            style={{
              backgroundImage: "url('/textures/mesa_western.jpg')",
              backgroundSize: "cover",
              backgroundPosition: "center",
              backgroundRepeat: "no-repeat",
            }}
          >
            <DialogTitle>FIM DE FASE!</DialogTitle>
            <p>
              Você concluiu a Fase {phase}! Preparando para a Fase {nextPhase}...
            </p>
            <Button
              onClick={() => router.push(`/levels/${nextPhase}`)}
              className="bg-brand-primary hover:bg-brand-primary-dark hover:cursor-pointer transition-colors duration-300"
            >
              Próxima Fase
            </Button>
          </DialogContent>
        </Dialog>

        {/* CORRENTES */}
        <motion.div
          initial={initialDrop}
          animate={dropAnimation}
          transition={{ ...dropTransition, delay: 0 }}
          className="absolute z-30 top-0 left-[calc(50%-380px)]"
        >
          <Image
            src="/images/corrente_esquerda.png"
            alt="Corrente esquerda"
            width={80}
            height={300}
          />
        </motion.div>

        <motion.div
          initial={initialDrop}
          animate={dropAnimation}
          transition={{ ...dropTransition, delay: 0 }}
          className="absolute z-30 top-0 right-[calc(50%-380px)]"
        >
          <Image
            src="/images/corrente_direita.png"
            alt="Corrente direita"
            width={100}
            height={350}
          />
        </motion.div>

        {/* LETREIRO */}
        <motion.div
          initial={initialDrop}
          animate={dropAnimation}
          transition={dropTransition}
          className="relative w-5/7 h-22 mt-4 flex items-center justify-center shadow-2xl z-20"
          style={{
            backgroundImage: "url('/textures/letreiro.jpg')",
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
          }}
        >
          <span className="text-black text-xl font-semibold text-center">
            {question.question}
          </span>
        </motion.div>

        {/* CARTAS */}
        <div className="w-full flex justify-center items-end gap-0 mt-8 px-6 relative h-80 overflow-visible">
          {question.options.map((opt, index) => {
            if (removedOptions.includes(index)) return null;

            const total = question.options.length;
            const fanSpread = 30;
            const startAngle = -fanSpread / 2;
            const rotate = startAngle + (fanSpread / (total - 1)) * index;

            return (
              <CardOption
                key={opt.id}
                text={opt.text}
                onClick={() => handleOptionClick(index)}
                disabled={disableAll}
                index={index}
                initialRotate={rotate}
                isFocused={focusedCard === index}
                setFocusedCard={setFocusedCard}
                initialAnimation={{
                  y: 200,
                  rotate: rotate,
                  opacity: 0,
                  animateY: 0,
                  animateOpacity: 1,
                  animateRotate: rotate,
                  delay: index * 0.2,
                }}
                style={{
                  perspective: 1200,
                  "--drop-volume": randomProps[index]?.volume ?? 0.3,
                  "--drop-pitch": randomProps[index]?.pitch ?? 1,
                } as React.CSSProperties}
              />
            );
          })}
        </div>
      </main>
    </div>
  );
}
