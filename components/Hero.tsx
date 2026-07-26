interface HeroProps {
  currentGame: string | null;
}

export default function Hero({ currentGame }: HeroProps) {
  return (
    <section className="relative overflow-hidden rounded-3xl mb-8">

      {/* Background */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage:
            "url('/images/the_valley_of_the_end-1.avif')",
        }}
      />

      {/* Overlay */}
      <div className="absolute inset-0 bg-black/55" />

      {/* Content */}
      <div className="relative flex min-h-[380px] md:min-h-[460px] items-center justify-center px-6 py-12">

        <div className="max-w-3xl text-center">

          <div className="inline-flex items-center rounded-full bg-red-600 px-4 py-2 text-sm font-bold shadow-lg">
            🔴 LIVE VIEWER BATTLES
          </div>

          <h1 className="mt-6 text-5xl md:text-7xl font-black text-white drop-shadow-xl">
            SHOCKINGLEMONN
          </h1>

          <h2 className="mt-2 text-3xl md:text-4xl font-bold text-orange-400">
            Battle Hub
          </h2>

          <p className="mt-6 text-lg md:text-xl text-gray-200 max-w-2xl mx-auto">
            Challenge me live, climb the queue, and prove you're the strongest shinobi.
          </p>

          <div className="mt-8 inline-flex rounded-full bg-black/50 px-6 py-3 backdrop-blur-sm border border-orange-500/30">
            <span className="text-gray-300 mr-2">
              🎮
            </span>

            <span className="font-bold">
              {currentGame}
            </span>
          </div>

          <div className="mt-10">
            <a
              href="#join"
              className="inline-flex items-center justify-center rounded-full bg-orange-500 px-10 py-4 text-xl font-black transition hover:bg-orange-400 hover:scale-105 shadow-xl"
            >
              ⚔ JOIN THE BATTLE
            </a>
          </div>

        </div>

      </div>

    </section>
  );
}