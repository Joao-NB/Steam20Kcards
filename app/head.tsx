// app/head.tsx
export default function Head() {
  return (
    <>
      <title>Steam 20K Cards</title>
      <meta name="description" content="Steam 20K Cards — jogo educativo steampunk sobre ISO 20000" />

      {/* Open Graph / previews de link */}
      <meta property="og:title" content="Steam 20K Cards" />
      <meta property="og:description" content="Jogue Steam 20K Cards e aprenda sobre ISO 20000 de forma divertida!" />
      <meta property="og:image" content="https://steam20kcards.vercel.app/images/Vector.svg" />
      <meta property="og:url" content="https://steam20kcards.vercel.app/" />
      <meta property="og:type" content="website" />

      {/* Twitter cards */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content="Steam 20K Cards" />
      <meta name="twitter:description" content="Jogue Steam 20K Cards e aprenda sobre ISO 20000 de forma divertida!" />
      <meta name="twitter:image" content="https://steam20kcards.vercel.app/images/og-image.png" />
    </>
  );
}
