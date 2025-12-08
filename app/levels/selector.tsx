// app/levels/selector.tsx
import Link from "next/link";

export default function Selector({ phase }: { phase: number }) {
  return (
    <div className="border-4 border-b-0 border-brand-primary-dark bg-brand-background/60 backdrop-blur-3xl h-96 w-1/4 rounded-t-2xl shadow-2xl">
      <div className="w-full p-4 flex flex-col justify-between items-center gap-4">
        <Link href={`/levels/${phase}`}>
          <button className="bg-brand-primary px-4 py-2 rounded-xl hover:cursor-pointer hover:bg-brand-primary-dark">
            SELECIONAR
          </button>
        </Link>

        <div className="text-center px-5 py-2 bg-brand-primary-dark rounded-lg">
          FASE {phase}
        </div>
      </div>
    </div>
  );
}
