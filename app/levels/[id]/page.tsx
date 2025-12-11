// 🔥 PAGE.TSX
"use client";
import { useState, useRef, useEffect, useMemo } from "react";
import { useParams, useRouter } from "next/navigation";
import { questions, Question, Option } from "@/app/data/questions";
import CardOption from "@/app/components/CardOption";
import { motion, Transition, useAnimation } from "framer-motion";
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
  const [isMobile, setIsMobile] = useState(false);

  // 🔥 Desativa rolagem da página totalmente
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, []);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 1024);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  const correctAudioRef = useRef<HTMLAudioElement | null>(null);
  const wrongAudioRef = useRef<HTMLAudioElement | null>(null);

  const gearsAnimation = useAnimation();
  const gearsPanelAnimation = useAnimation();

  useEffect(() => {
    correctAudioRef.current = new Audio("/sounds/card_correct.mp3");
    correctAudioRef.current.volume = 0.4;
    wrongAudioRef.current = new Audio("/sounds/card_rip.wav");
    wrongAudioRef.current.volume = 0.4;

    const animateGears = async () => {
      await gearsPanelAnimation.start({
        x: 0,
        transition: { duration: 0.3, ease: "easeOut" },
      });
      gearsAnimation.start({
        x: 0,
        rotate: [0, 360],
        transition: { duration: 0.3, ease: "easeOut" },
      });
    };

    gearsPanelAnimation.set({ x: -240 });
    gearsAnimation.set({ x: -240, rotate: 0 });
    animateGears();
  }, [gearsAnimation, gearsPanelAnimation]);

  const question = phaseQuestions[current];
  const nextPhase = phase + 1;

  useEffect(() => {
    const props = phaseQuestions[current]?.options.map(() => ({
      volume: 0.25 + Math.random() * 0.1,
      pitch: 0.9 + Math.random() * 0.2,
    }));
    setRandomProps(props || []);
  }, [current, phaseQuestions]);

  useEffect(() => {
  window.history.replaceState(null, "", "/");

  const preventBack = () => {
    router.replace("/");
  };

  window.addEventListener("popstate", preventBack);
  return () => window.removeEventListener("popstate", preventBack);
}, [router]);

  function triggerGearSpin() {
    gearsAnimation.start({
      rotate: [0, 360],
      transition: { duration: 0.8, ease: "easeInOut" },
    });
  }

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
          setIsCorrect(false);
          setFeedback("");
        }, 500);
      } else {
        if (nextPhase <= TOTAL_PHASES) {
          setIsPhaseFinished(true);
        } else {
          router.push("/levels/finish");
        }
      }
    } else {
      triggerGearSpin();
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
          if (isMobile) triggerGearSpin();
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
  const dropTransition: Transition = { type: "spring" as const, stiffness: 120, damping: 12 };

  return (
    <div
      key={phase}
      className="flex flex-col lg:flex-row min-h-screen w-full justify-between gap-4 font-game overflow-hidden relative bg-cover bg-center"
      style={{ backgroundImage: "url('/texture.jpg')" }}
    >
      {/* Correntes - MOBILE */}
      <motion.div
        initial={initialDrop}
        animate={dropAnimation}
        transition={dropTransition}
        className="lg:hidden absolute -top-2 left-[10%] z-40"
      >
        <Image src="/images/corrente_esquerda.png" alt="Corrente esquerda" width={64} height={220} />
      </motion.div>

      <motion.div
        initial={initialDrop}
        animate={dropAnimation}
        transition={dropTransition}
        className="lg:hidden absolute -top-2 right-[10%] z-40"
      >
        <Image src="/images/corrente_direita.png" alt="Corrente direita" width={80} height={220} />
      </motion.div>

      {/* Correntes - DESKTOP */}
      <motion.div initial={initialDrop} animate={dropAnimation} className="hidden lg:block absolute -top-5 left-[30%] z-40">
        <Image src="/images/corrente_esquerda.png" alt="Corrente" width={90} height={300} />
      </motion.div>
      <motion.div initial={initialDrop} animate={dropAnimation} className="hidden lg:block absolute -top-5 right-[20%] z-40">
        <Image src="/images/corrente_direita.png" alt="Corrente" width={120} height={300} />
      </motion.div>

      {/* FASE STEAMPUNK - Desktop */}
      <div className="hidden lg:block fixed top-8 left-8 z-50">
        <div className="relative">
          <motion.div
            initial={{ opacity: 0, y: 25, scaleY: 1 }}
            animate={{
              opacity: 1,
              y: 0,
              scaleY: [1, 1.04, 1],
            }}
            transition={{
              opacity: { duration: 0.5, ease: "easeOut" },
              y: { duration: 0.5, ease: "easeOut" },
              scaleY: {
                duration: 1.5,
                repeat: Infinity,
                repeatType: "reverse",
                ease: "easeInOut",
              },
            }}
            className="relative bg-gradient-to-br from-zinc-900 to-zinc-950 border-4 border-amber-900/50 rounded-md shadow-2xl px-6 py-3"
          >
            <div className="absolute top-1 left-1 w-3 h-3 bg-amber-900 rounded-full border border-amber-800"></div>
            <div className="absolute top-1 right-1 w-3 h-3 bg-amber-900 rounded-full border border-amber-800"></div>
            <div className="absolute bottom-1 left-1 w-3 h-3 bg-amber-900 rounded-full border border-amber-800"></div>
            <div className="absolute bottom-1 right-1 w-3 h-3 bg-amber-900 rounded-full border border-amber-800"></div>

            <h1
              className="text-3xl font-bold tracking-wider drop-shadow-lg"
              style={{
                color: "#d8603b",
                textShadow: "0 0 12px rgba(216,96,59,0.6), 0 2px 4px rgba(0,0,0,0.8)",
              }}
            >
              FASE {phase}-{current + 1}
            </h1>
          </motion.div>
        </div>
      </div>

      {/* PAINEL LATERAL - Desktop */}
      <aside
        className="hidden lg:flex flex-col items-center justify-center relative"
        style={{
          width: "240px",
          height: "100vh",
          marginLeft: "-100px",
        }}
      >
        <motion.div
          initial={{ opacity: 0, y: -20 }} // animação de entrada
          animate={{ opacity: 1, y: 0 }} // estado final fixo
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="relative flex flex-col items-center justify-center w-full h-full"
        >
          {/* Fundo */}
          <div className="absolute w-full h-full top-0 left-0">
            <Image src="/images/fundo_engrena.png" alt="Painel" fill style={{ objectFit: "contain" }} />
          </div>

          {/* Engrenagens / Vidas */}
          <div className="relative flex flex-col items-center justify-center w-full z-10" style={{ top: "-12px", gap: "22px" }}>
            <div className="flex flex-col items-center" style={{ marginLeft: "92px" }}>
              {Array.from({ length: 3 }).map((_, v) => (
                <motion.div key={v} animate={gearsAnimation} style={{ width: 84, height: 84 }}>
                  <Image src={v < lives ? "/images/gear_orange.png" : "/images/gear_gray.png"} alt="vida" width={84} height={84} />
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>
      </aside>

      {/* CONTEÚDO CENTRAL */}
      <main className="flex-1 flex flex-col justify-start items-center py-6 w-full relative">
        {/* Letreiro */}
        <motion.div
          initial={initialDrop}
          animate={dropAnimation}
          transition={dropTransition}
          className="relative w-[90%] max-w-[850px] min-h-[95px] px-4 flex items-center justify-center text-center shadow-xl bg-center bg-cover z-50"
          style={{
            backgroundImage: "url('/textures/letreiro.jpg')",
            marginTop: isMobile ? "6px" : "20px",
            minHeight: isMobile ? "60px" : "95px",
          }}
        >
          <span className={`text-black font-semibold ${isMobile ? "text-lg" : "text-xl"} ${!isMobile ? "md:text-2xl" : ""}`}>
            {question.question}
          </span>
        </motion.div>

        {/* FASE-X-Y e vidas MOBILE (acima das cartas) */}
        {isMobile && (
          <div className="flex flex-col items-center gap-2 mt-2">
            <h1 className="text-black font-extrabold drop-shadow-2xl tracking-wider" style={{ fontSize: "1.3rem" }}>
              Fase {phase}-{current + 1}
            </h1>
            <div className="flex gap-2">
              {Array.from({ length: 3 }).map((_, i) => (
                <motion.div key={i} animate={gearsAnimation}>
                  <Image src={i < lives ? "/images/gear_orange.png" : "/images/gear_gray.png"} alt="vida" width={36} height={36} />
                </motion.div>
              ))}
            </div>
          </div>
        )}

        {/* Cartas */}
        <div className="w-full flex flex-wrap justify-center items-end gap-3 mt-14 px-4 relative min-h-[300px] overflow-visible">
          {question.options.map((opt, index) => {
            if (removedOptions.includes(index)) return null;
            const total = question.options.length;
            const fanSpread = 30;
            const startAngle = -fanSpread / 2;
            const rotate = startAngle + (fanSpread / (total - 1)) * index;

            let adjacentOffset = { x: 0, y: 0 };
            if (focusedCard !== null) {
              const diff = index - focusedCard;
              if (Math.abs(diff) === 1) {
                adjacentOffset = { x: diff * 10, y: -5 };
              } else if (diff === 0) {
                adjacentOffset = { x: 0, y: -20 };
              }
            }

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
                isMobile={isMobile}
                initialAnimation={{
                  y: 200,
                  rotate,
                  opacity: 0,
                  animateY: adjacentOffset.y,
                  animateOpacity: 1,
                  animateRotate: rotate,
                  delay: index * 0.1,
                }}
                style={
                  {
                    perspective: 1200,
                    "--drop-volume": randomProps[index]?.volume ?? 0.3,
                    "--drop-pitch": randomProps[index]?.pitch ?? 1,
                    width: isMobile ? "124px" : "176px",
                    height: isMobile ? "164px" : "240px",
                  } as React.CSSProperties
                }
                textStyle={{
                  fontSize: isMobile ? "0.85rem" : "1rem",
                }}
              />
            );
          })}
        </div>

        {/* Dialogs */}
        <Dialog open={isCorrect} onOpenChange={setIsCorrect}>
          <DialogContent
            onClick={() => setIsCorrect(false)}
            className="z-110 text-center flex flex-col justify-center items-center cursor-pointer"
            style={{
              backgroundImage: "url('/images/fundo_modal.png')",
              backgroundSize: "cover",
              backgroundRepeat: "no-repeat",
              backgroundPosition: "center",
              width: "90%", // responsivo
              maxWidth: "600px", // diminuiu no geral
              height: "350px",
              borderRadius: "12px",
              padding: "0 30px",
            }}
          >
            <DialogTitle className="mb-6 text-center" style={{ color: "#4e4540", fontSize: "2.5rem", lineHeight: "1.2", fontWeight: "normal" }}>
              RESPOSTA CORRETA!!
            </DialogTitle>
            <p className="text-center" style={{ color: "#4e4540", fontSize: "2rem", lineHeight: "1.5", fontWeight: "normal" }}>
              {feedback}
            </p>
          </DialogContent>
        </Dialog>

        <Dialog open={isWrong} onOpenChange={setIsWrong}>
          <DialogContent
            onClick={() => setIsWrong(false)}
            className="z-110 text-center flex flex-col justify-center items-center cursor-pointer"
            style={{
              backgroundImage: "url('/images/fundo_modal.png')",
              backgroundSize: "cover",
              backgroundRepeat: "no-repeat",
              backgroundPosition: "center",
              width: "90%", // responsivo
              maxWidth: "600px", // diminuiu no geral
              height: "350px",
              borderRadius: "12px",
              padding: "0 30px",
            }}
          >
            <DialogTitle className="mb-6 text-center" style={{ color: "#4e4540", fontSize: "2.5rem", lineHeight: "1.2", fontWeight: "normal" }}>
              RESPOSTA INCORRETA!
            </DialogTitle>
            <p className="text-center" style={{ color: "#4e4540", fontSize: "2rem", lineHeight: "1.5", fontWeight: "normal" }}>
              {feedback}
            </p>
          </DialogContent>
        </Dialog>

        <Dialog open={isPhaseFinished} onOpenChange={setIsPhaseFinished}>
          <DialogContent
            className="z-110 text-center flex flex-col justify-center items-center"
            style={{
              backgroundImage: "url('/textures/mesa_western.jpg')",
              backgroundSize: "cover",
              backgroundPosition: "center",
              backgroundRepeat: "no-repeat",
              width: "90%", // responsivo
              maxWidth: "600px", // diminuiu no geral
              height: "350px",
              borderRadius: "12px",
              padding: "0 30px",
            }}
          >
            <DialogTitle className="mb-6 text-center" style={{ fontSize: "2.5rem", lineHeight: "1.2", fontWeight: "normal" }}>
              FIM DE FASE!
            </DialogTitle>
            <p className="text-center" style={{ fontSize: "2rem", lineHeight: "1.5", fontWeight: "normal" }}>
              Você concluiu a Fase {phase}! Prepare-se para {nextPhase}...
            </p>
            <Button onClick={() => router.push(`/levels/${nextPhase}`)} className="mt-6 bg-brand-primary hover:bg-brand-primary-dark">
              Próxima Fase
            </Button>
          </DialogContent>
        </Dialog>
      </main>
    </div>
  );
}
