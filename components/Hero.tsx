export default function Hero() {
  return (
    <section className="relative overflow-hidden rounded-3xl mb-10">

      {/* Background */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage:
            "url('/images/the_valley_of_the_end-1.avif')",
        }}
      />

      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-black/70" />

      {/* Content */}
      <div className="relative px-10 py-20 text-center">

        <h1 className="text-6xl font-black tracking-wide text-white drop-shadow-lg">
          ⚡ SHOCKINGLEMONN ⚡
        </h1>

        <p className="mt-6 text-2xl text-orange-400 font-semibold">
          Ultimate Naruto Viewer Battles
        </p>

        <p className="mt-4 max-w-2xl mx-auto text-gray-300 text-lg">
          Fight live against viewers, climb the queue,
          and prove you're the strongest shinobi.
        </p>

        <div className="mt-10">
          <a
            href="#join"
            className="inline-block rounded-full bg-orange-500 px-8 py-4 text-xl font-bold transition hover:bg-orange-400 hover:scale-105"
          >
            🍃 ENTER THE ARENA
          </a>
        </div>

      </div>
    </section>
  );
}