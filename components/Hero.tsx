interface HeroProps {
  currentGame: string | null;
}

export default function Hero({ currentGame }: HeroProps) {
  return (
    <section className="relative overflow-hidden rounded-3xl mb-8 md:mb-10">

      {/* Background */}
      <div
        className="absolute inset-0 bg-cover bg-center scale-105"
        style={{
          backgroundImage:
            "url('/images/the_valley_of_the_end-1.avif')",
        }}
      />

      {/* Overlay */}
      <div className="absolute inset-0 bg-black/65" />

      {/* Content */}
      <div className="relative flex min-h-[420px] md:min-h-[520px] items-center justify-center px-6 py-14 md:px-12">

        <div className="w-full max-w-3xl rounded-3xl bg-black/30 backdrop-blur-sm p-8 md:p-12 text-center">

          <div className="inline-flex items-center rounded-full bg-red-600/90 px-4 py-2 text-sm font-bold uppercase tracking-wider shadow-lg">
            🔴 LIVE VIEWER BATTLES
          </div>

          <h1 className="mt-6 text-4xl md:text-7xl font-black leading-tight text-white drop-shadow-xl">
            SHOCKINGLEMONN
          </h1>

          <h2 className="mt-2 text-2xl md:text-4xl font-bold text-orange-400">
            BATTLE HUB
          </h2>

          <p className="mt-6 text-base md:text-xl text-gray-200 max-w-2xl mx-auto leading-relaxed">
            Challenge me live, climb the queue, and prove you're the strongest
            shinobi in the Hidden Leaf.
          </p>

          <div className="mt-8 flex justify-center">
            <div className="rounded-2xl bg-gray-900/80 border border-orange-500/40 px-6 py-4">
              <p className="text-xs uppercase tracking-widest text-gray-400">
                CURRENT GAME
              </p>

              <p className="mt-1 text-lg md:text-2xl font-bold text-white">
                {currentGame ?? "No Game Selected"}
              </p>
            </div>
          </div>

          <a
            href="#join"
            className="mt-10 inline-flex w-full sm:w-auto items-center justify-center rounded-full bg-orange-500 px-10 py-4 text-lg md:text-xl font-bold transition-all duration-200 hover:bg-orange-400 hover:scale-105 shadow-xl"
          >
            ⚔ JOIN THE BATTLE
          </a>

        </div>

      </div>

    </section>
  );
}