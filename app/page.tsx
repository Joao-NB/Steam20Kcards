import Link from "next/link";

export default function Home() {
  return (
    <div
      className="flex min-h-screen w-dvw items-center justify-center p-8"
      style={{ backgroundImage: "url('/texture.jpg')" }}
    >
      <div className=" w-full h-[500px] p-4 gap-2 flex justify-between">
        <div
          className="w-1/2 bg-center bg-no-repeat"
          style={{ backgroundImage: "url('/Vector.svg')" }}
        ></div>
        <div className="w-1/2 flex justify-center items-center p-4">
          <div className="flex flex-col justify-center items-center space-y-4">
            <Link href="/levels">
              <div className="border-2 border-brand-primary font-bold text-xl text-brand-primary px-4 py-4 w-44 text-center rounded-b-4xl">
                JOGAR
              </div>
            </Link>
            <Link href={"/"}>
              <div className="border-2 border-brand-primary font-bold text-xl text-brand-primary px-4 py-4 rounded-b-4xl">
                CRÉDITOS
              </div>
            </Link>
            <Link href={"/"}>
              <div className="border-2 border-brand-primary font-bold text-xl text-brand-primary px-6 py-4 rounded-b-4xl">
                SAIR
              </div>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
