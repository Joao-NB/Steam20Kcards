"use client";

import { useState } from "react";
// 🛑 ALTERADO: Importando useRouter para navegação
import { useParams, useRouter } from "next/navigation"; 
import { questions, Question, Option } from "@/app/data/questions";
import { Settings } from "lucide-react"; // Usando Settings diretamente

/**
 * Página da fase (/levels/[id])
 * ...
 */

export default function Page() {
  const { id } = useParams();
  const phase = Number(id) || 1;
  
  // 🛑 NOVO: Inicialização do router
  const router = useRouter(); 
  
  // 🛑 CONFIGURAÇÃO: Defina o número total de fases do seu jogo.
  const TOTAL_PHASES = 3; 

  // filtra perguntas da fase atual
  const phaseQuestions: Question[] = questions.filter((q) => q.phase === phase);

  // ... (Estados e lógica de handleOptionClick permanecem os mesmos) ...
  const [current, setCurrent] = useState(0);
  const [lives, setLives] = useState(3);
  const [removedOptions, setRemovedOptions] = useState<number[]>([]);
  const [disableAll, setDisableAll] = useState(false);

  const question = phaseQuestions[current];

  // Handler ao clicar numa opção
  function handleOptionClick(optionIndex: number) {
    if (disableAll) return;
    const option: Option | undefined = question?.options[optionIndex];
    if (!option) return;

    if (option.correct) {
      setDisableAll(true);
      // CORRIGIDO: Uso de template literals com crases (`)
      window.alert(`✅ Correto!\n\n${option.feedback || ""}`);

      if (current + 1 < phaseQuestions.length) {
        setCurrent((c) => c + 1);
        setRemovedOptions([]);
        setDisableAll(false);
      } else {
        // 🛑 LÓGICA DE PROGRESSÃO DE LEVEL FOI ADICIONADA AQUI
        const nextPhase = phase + 1;
        
        if (nextPhase <= TOTAL_PHASES) {
            // CORRIGIDO: Uso de template literals com crases (`)
            window.alert(`🎉 Você concluiu a Fase ${phase}! Preparando para a Fase ${nextPhase}...`);
            // CORRIGIDO: Uso de template literals com crases (`)
            router.push(`/levels/${nextPhase}`); 
        } else {
            // Todas as fases concluídas
            // CORRIGIDO: Uso de template literals com crases (`)
            window.alert(`🏆 Parabéns! Você concluiu todas as ${TOTAL_PHASES} fases!`);
            setDisableAll(true);
            // Opcional: router.push('/');
        }
      }
    } else {
      setLives((prev) => {
        const novo = prev - 1;
        if (novo <= 0) {
          window.alert("💥 Você perdeu todas as vidas. A fase será reiniciada.");
          setCurrent(0);
          setRemovedOptions([]);
          setDisableAll(false);
          return 3;
        } else {
          setRemovedOptions((prevArr) => [...prevArr, optionIndex]);
          // CORRIGIDO: Uso de template literals com crases (`)
          window.alert(`❌ Incorreto.\n\n${option.feedback || ""}`);
          return novo;
        }
      });
    }
  }

  // Se não houver perguntas para a fase
  if (phaseQuestions.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p>Nenhuma pergunta encontrada para a fase {phase}.</p>
      </div>
    );
  }

  // --- Render principal (NÃO ALTERADO) ---
  return (
    <div key={phase} className="flex min-h-screen w-dvw justify-between gap-4" style={{ backgroundImage: "url('/texture.jpg')" }}>
      {/* Lado esquerdo — vidas (AGORA COM Settings) */}
      <aside className="flex-1 flex flex-col justify-center pl-2">
        <div className="flex flex-col justify-evenly gap-2">
          {[1, 2, 3].map((v) => (
            <div
              key={v}
              className="flex items-center justify-center h-16 w-16"
            >
              <Settings // Componente de ícone
                size={64}
                // CORRIGIDO: Uso de template literals com crases (`)
                className={`transition-colors ${v <= lives ? "text-brand-primary" : "text-brand-background/40"}`}
              />
            </div>
          ))}
        </div>
      </aside>

      {/* Área principal */}
      <main className="flex-4 flex flex-col justify-between items-center py-6 ">
        <div className="bg-brand-background text-brand-gray w-5/6 flex items-center justify-center h-16 rounded-sm text-2xl">
          {question?.question}
        </div>

        <div className="w-full flex flex-wrap justify-evenly items-center text-brand-gray gap-4 mt-6 px-6">
          {question.options.map((opt: Option, index: number) => {
            const removed = removedOptions.includes(index);
            return removed ? null : (
              <button
                key={opt.id}
                onClick={() => handleOptionClick(index)}
                disabled={disableAll}
                // CORRIGIDO: Uso de template literals com crases (`)
                className={`p-4 w-1/6 h-56 rounded-xl shadow-2xl transition transform hover:-translate-y-1 ${removed ? "opacity-40 pointer-events-none" : "bg-brand-light hover:bg-brand-primary-dark"}`}              
              >
                <div className="h-full flex items-center justify-center text-center px-2">
                  <span>{opt.text}</span>
                </div>
              </button>
            );
          })}
        </div>
      </main>
    </div>
  );
}