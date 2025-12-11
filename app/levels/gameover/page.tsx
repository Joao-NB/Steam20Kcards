"use client";
import { useState } from "react";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { DialogTitle } from "@radix-ui/react-dialog";
import Image from "next/image";
import Link from "next/link";

export default function TutorialPage() {
  const [currentModal, setCurrentModal] = useState(0);

  const tutorialTitles = [
    "BEM VINDO",
    "APRENDIZADO INTERATIVO",
    "FUNCIONAMENTO",
    "MAPAS",
    "OPÇÕES DE RESPOSTAS",
    "PERDAS E VIDAS"
  ];

  const tutorialMessages = [
    "BEM VINDO AO STEAM 20K CARDS",
    "AQUI APRENDEREMOS SOBRE A ISO 20000 DE FORMA INTERATIVA",
    "FUNCIONARA DA SEGUINTE FORMA:",
    "HA 4 MAPAS, CADA UM CONTENDO 5 PERGUNTAS DO AMBIENTE DE TRABALHO",
    "PARA CADA PERGUNTA VOCE TERA 5 OPCOES DE RESPOSTAS, CARDS, QUE ESTARAO NO SEU DECK",
    "CADA PERGUNTA TERA UMA RESPOSTA CORRETA. CASO ESCOLHA O CARD ERRADO, PERDERA UMA VIDA. AO PERDER TODAS, REINICIA A FASE INTEIRA"
  ];

  const nextModal = () => {
    if (currentModal < tutorialMessages.length - 1) {
      setCurrentModal((prev) => prev + 1);
    } else {
      window.location.href = "/levels/1"; // redireciona para o jogo
    }
  };

  return (
    <div
      className="relative flex items-center justify-center min-h-screen w-full bg-cover bg-center"
      style={{ backgroundImage: "url('/texture.jpg')" }}
    >
      {/* Botão voltar para home */}
      <Link href="/" className="absolute top-4 right-4 z-[200] w-12 h-12 md:w-16 md:h-16">
        <Image
          src="/Vector.svg"
          alt="Voltar para Home"
          width={64}
          height={64}
          className="object-contain cursor-pointer"
        />
      </Link>

      {/* Modal do tutorial */}
      <Dialog open={true} onOpenChange={() => {}} modal={false}>
        <DialogContent
          onClick={nextModal}
          className="cursor-pointer flex flex-col justify-center items-center text-center"
          style={{
            backgroundImage: "url('/images/fundo_modal.png')",
            backgroundSize: "cover",
            backgroundRepeat: "no-repeat",
            backgroundPosition: "center",
            width: "85%",
            maxWidth: "900px",
            minHeight: "500px",
            borderRadius: "20px",
            padding: "40px",
            zIndex: 100,
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <DialogTitle
            style={{
              color: "#4e4540",
              fontSize: "3rem",
              lineHeight: 1.2,
              fontWeight: "normal",
              textTransform: "uppercase",
              textAlign: "center",
              marginBottom: "20px"
            }}
          >
            {tutorialTitles[currentModal]}
          </DialogTitle>
          <p
            style={{
              color: "#4e4540",
              fontSize: "2rem",
              lineHeight: 1.5,
              fontWeight: "normal",
              textTransform: "uppercase",
              textAlign: "center",
            }}
          >
            {tutorialMessages[currentModal]}
          </p>
          <span
            style={{
              marginTop: "30px",
              color: "#4e4540",
              fontSize: "1.6rem",
              textAlign: "center",
            }}
          >
            Clique em qualquer lugar para continuar
          </span>
        </DialogContent>
      </Dialog>
    </div>
  );
}
