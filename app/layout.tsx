import type { Metadata } from "next";
import { Yanone_Kaffeesatz } from "next/font/google";
import "./globals.css";

const yanone = Yanone_Kaffeesatz({
  subsets: ["latin"],
  weight: ["300", "400", "700"],
});

export const metadata: Metadata = {
  title: "Cards20K",
  description: "Jogo educacional",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-br">
      <body className={yanone.className}>{children}</body>
    </html>
  );
}
