import Hero from "@/components/Hero";
import LiveStatus from "@/components/LiveStatus";
import Queue from "@/components/Queue";
import JoinQueueForm from "@/components/JoinQueueForm";
import { getSetting } from "@/lib/settings";

export default async function Home() {
  const currentGame = await getSetting("current_game");
  const queueOpen = await getSetting("queue_open");
  const streamLive = await getSetting("stream_live");

  return (
    <main className="min-h-screen bg-[#0B0F19] text-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-6 md:py-10">

        <Hero currentGame={currentGame} />

        <LiveStatus
          currentGame={currentGame}
          queueOpen={queueOpen}
          streamLive={streamLive}
        />

        {/* Mobile: Join Battle first
            Desktop: Queue left, Join Battle right */}
        <div className="flex flex-col lg:grid lg:grid-cols-2 gap-6 md:gap-8">

          {/* Join Battle */}
          <div
            id="join"
            className="order-1 lg:order-2 bg-gray-900/90 rounded-3xl border border-orange-500/30 p-6 md:p-8"
          >
            <h2 className="text-2xl md:text-3xl font-bold mb-6">
              ⚔ Join the Battle
            </h2>

            {queueOpen === "true" ? (
              <JoinQueueForm />
            ) : (
              <div className="text-center py-10">
                <h3 className="text-2xl font-bold text-red-400">
                  🔒 Queue Closed
                </h3>

                <p className="mt-3 text-gray-400">
                  The queue is currently closed.
                  <br />
                  Come back soon!
                </p>
              </div>
            )}
          </div>

          {/* Queue */}
          <div className="order-2 lg:order-1 bg-gray-900/90 rounded-3xl border border-orange-500/30 p-6 md:p-8">
            <h2 className="text-2xl md:text-3xl font-bold mb-6">
              🥷 Current Queue
            </h2>

            <Queue />
          </div>

        </div>

      </div>
    </main>
  );
}