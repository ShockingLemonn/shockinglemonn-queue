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
      <div className="max-w-6xl mx-auto px-6 py-10">

        <Hero />

        <LiveStatus
          currentGame={currentGame}
          queueOpen={queueOpen}
          streamLive={streamLive}
        />

        <div className="grid lg:grid-cols-2 gap-8">

          <div className="bg-gray-900/90 rounded-3xl border border-orange-500/30 p-8">
            <h2 className="text-3xl font-bold mb-6">
              🥷 Current Queue
            </h2>

            <Queue />
          </div>

          <div
            id="join"
            className="bg-gray-900/90 rounded-3xl border border-orange-500/30 p-8"
          >
            <h2 className="text-3xl font-bold mb-6">
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
                  Come back soon!
                </p>
              </div>
            )}
          </div>

        </div>

      </div>
    </main>
  );
}