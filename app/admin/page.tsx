import { skipPlayer } from "@/app/actions/skipPlayer";
import AdminQueue from "@/components/AdminQueue";
import CurrentChallenger from "@/components/CurrentChallenger";
import { clearQueue } from "@/app/actions/clearQueue";
import { startMatch } from "@/app/actions/startMatch";
import { updateCurrentGame } from "@/app/actions/updateCurrentGame";
import { updateMatchesPerPlayer } from "@/app/actions/updateMatchesPerPlayer";
import { toggleQueue } from "@/app/actions/toggleQueue";
import { toggleStreamStatus } from "@/app/actions/toggleStreamStatus";
import { getSetting } from "@/lib/settings";

export default async function AdminPage() {
  const currentGame = await getSetting("current_game");
  const queueOpen = await getSetting("queue_open");
  const streamLive = await getSetting("stream_live");
  const matchesPerPlayer = await getSetting("matches_per_player");

  return (
    <main className="min-h-screen bg-[#0B0F19] text-white">
      <div className="max-w-5xl mx-auto px-6 py-10">

        <h1 className="text-5xl font-black mb-2">
          🏯 Hokage Office
        </h1>

        <p className="text-gray-400 mb-10">
          Stream Control Center
        </p>

        {/* Stream Settings */}
        <div className="bg-gray-900/90 rounded-3xl border border-orange-500/30 p-8 mb-8">

          <h2 className="text-3xl font-bold mb-6">
            🎮 Stream Settings
          </h2>

          {/* Stream Status */}
          <div className="mb-8">
            <h3 className="text-xl font-bold mb-3">
              Stream Status
            </h3>

            <p className="text-lg mb-4">
              {streamLive === "true"
                ? "🔴 LIVE"
                : "⚫ OFFLINE"}
            </p>

            <form action={toggleStreamStatus}>
              <button
                type="submit"
                className="bg-red-600 hover:bg-red-700 px-6 py-3 rounded-xl font-bold"
              >
                {streamLive === "true"
                  ? "End Stream"
                  : "Go Live"}
              </button>
            </form>
          </div>

          <hr className="border-gray-700 mb-8" />

          {/* Current Game */}
          <div className="mb-8">
            <h3 className="text-xl font-bold mb-3">
              Current Game
            </h3>

            <form action={updateCurrentGame} className="space-y-4">
              <input
                type="text"
                name="game"
                defaultValue={currentGame ?? ""}
                className="w-full rounded-xl bg-gray-800 border border-gray-700 p-3"
              />

              <button
                type="submit"
                className="bg-blue-600 hover:bg-blue-700 px-6 py-3 rounded-xl font-bold"
              >
                💾 Save Game
              </button>
            </form>
          </div>

          <hr className="border-gray-700 mb-8" />

          {/* Matches Per Challenger */}
          <div className="mb-8">
            <h3 className="text-xl font-bold mb-3">
              Matches Per Challenger
            </h3>

            <form
              action={updateMatchesPerPlayer}
              className="space-y-4"
            >
              <input
                type="number"
                name="matches"
                min="1"
                max="20"
                defaultValue={matchesPerPlayer ?? "3"}
                className="w-full rounded-xl bg-gray-800 border border-gray-700 p-3"
              />

              <button
                type="submit"
                className="bg-purple-600 hover:bg-purple-700 px-6 py-3 rounded-xl font-bold"
              >
                💾 Save Match Rule
              </button>
            </form>
          </div>

          <hr className="border-gray-700 mb-8" />

          {/* Queue */}
          <div>
            <h3 className="text-xl font-bold mb-3">
              Queue Status
            </h3>

            <p className="text-lg mb-4">
              {queueOpen === "true"
                ? "🟢 OPEN"
                : "🔴 CLOSED"}
            </p>

            <form action={toggleQueue}>
              <button
                type="submit"
                className="bg-orange-600 hover:bg-orange-700 px-6 py-3 rounded-xl font-bold"
              >
                {queueOpen === "true"
                  ? "Close Queue"
                  : "Open Queue"}
              </button>
            </form>
          </div>

        </div>

        {/* Match Controls */}
        <div className="bg-gray-900/90 rounded-3xl border border-orange-500/30 p-8 mb-8">

          <h2 className="text-3xl font-bold mb-6">
            ⚔ Match Controls
          </h2>

          <div className="flex flex-wrap gap-4">

            <form action={startMatch}>
              <button
                type="submit"
                className="bg-green-600 hover:bg-green-700 px-6 py-3 rounded-xl font-bold"
              >
                ▶ Start Set
              </button>
            </form>

            <form action={skipPlayer}>
              <button
                type="submit"
                className="bg-yellow-500 hover:bg-yellow-600 text-black px-6 py-3 rounded-xl font-bold"
              >
                ⏭ Skip Player
              </button>
            </form>

            <form action={clearQueue}>
              <button
                type="submit"
                className="bg-red-600 hover:bg-red-700 px-6 py-3 rounded-xl font-bold"
              >
                🗑 Clear Queue
              </button>
            </form>

          </div>

        </div>

        <CurrentChallenger />

        <AdminQueue />

      </div>
    </main>
  );
}