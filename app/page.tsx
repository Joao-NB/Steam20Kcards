"use client";

import Link from "next/link";
import { useState } from "react";

export default function Home() {
  const [hoverEffect, setHoverEffect] = useState(false);

  return (
    <div
      className="flex min-h-screen w-dvw items-center justify-center p-4 bg-cover"
      style={{ backgroundImage: "url('/texture.jpg')" }}
    >
      <div className="w-full max-w-7xl h-auto flex flex-col md:flex-row p-4 gap-6">
        {/* IMAGEM LATERAL MAIOR */}
        <div
          className={`
            w-full md:w-1/2 bg-center bg-no-repeat bg-contain
            transition-transform duration-500
            ${hoverEffect ? "scale-110" : "scale-100"}
          `}
          style={{ backgroundImage: "url('/Vector.svg')" }}
        ></div>

        {/* BOTÕES */}
        <div className="w-full md:w-1/2 flex justify-center items-center font-game">
          <div className="flex flex-col items-center space-y-6">
            {/* BOTÃO GRANDE - JOGAR */}
            <Link href="/levels/1">
              <div
                onMouseEnter={() => setHoverEffect(true)}
                onMouseLeave={() => setHoverEffect(false)}
                className="
                  border-2 border-brand-primary font-bold text-2xl text-brand-primary
                  px-8 py-5 w-56 text-center rounded-b-4xl cursor-pointer
                  transition-all duration-300
                  hover:scale-110 hover:shadow-xl hover:bg-brand-primary hover:text-black
                "
              >
                JOGAR
              </div>
            </Link>

            {/* BOTÃO MÉDIO - CRÉDITOS */}
            <Link href="/">
              <div
                onMouseEnter={() => setHoverEffect(true)}
                onMouseLeave={() => setHoverEffect(false)}
                className="
                  border-2 border-brand-primary font-bold text-xl text-brand-primary
                  px-6 py-4 w-48 text-center rounded-b-4xl cursor-pointer
                  transition-all duration-300
                  hover:scale-110 hover:shadow-xl hover:bg-brand-primary hover:text-black
                "
              >
                CRÉDITOS
              </div>
            </Link>

            {/* BOTÃO PEQUENO - SAIR */}
            <Link href="/">
              <div
                onMouseEnter={() => setHoverEffect(true)}
                onMouseLeave={() => setHoverEffect(false)}
                className="
                  border-2 border-brand-primary font-bold text-lg text-brand-primary
                  px-5 py-3 w-40 text-center rounded-b-4xl cursor-pointer
                  transition-all duration-300
                  hover:scale-110 hover:shadow-xl hover:bg-brand-primary hover:text-black
                "
              >
                SAIR
              </div>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
