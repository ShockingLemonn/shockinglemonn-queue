import { supabase } from "@/lib/supabase";

export default async function OverlayPage() {
  const { data: currentPlayer } = await supabase
    .from("players")
    .select("*")
    .eq("status", "playing")
    .maybeSingle();

  const { data: queue } = await supabase
    .from("players")
    .select("*")
    .eq("status", "waiting")
    .order("created_at", { ascending: true });

  return (
    <main className="min-h-screen flex items-center justify-center bg-transparent text-white">
      <div className="w-[460px] rounded-3xl border border-orange-500/40 bg-black/75 backdrop-blur-md shadow-2xl p-8">

        <div className="text-center">

          <p className="text-orange-400 font-semibold tracking-[0.35em] text-sm">
            CURRENT MATCH
          </p>

          <h1 className="text-4xl font-extrabold mt-3">
            {currentPlayer
              ? currentPlayer.username
              : "Waiting..."}
          </h1>

          {currentPlayer && (
            <>
              <p className="text-gray-300 mt-3 text-lg">
                {currentPlayer.platform}
              </p>

              <div className="mt-5 inline-flex rounded-full bg-orange-500/20 px-5 py-2 border border-orange-500/40">
                <span className="font-bold text-orange-300">
                  ⚔ {currentPlayer.matches_remaining} Matches Remaining
                </span>
              </div>
            </>
          )}

        </div>

        <div className="my-8 h-px bg-gradient-to-r from-transparent via-orange-500 to-transparent" />

        <h2 className="text-center text-2xl font-bold mb-6">
          NEXT UP
        </h2>

        {queue && queue.length > 0 ? (
          <div className="space-y-3">

            {queue.slice(0, 5).map((player, index) => (
              <div
                key={player.id}
                className="flex justify-between items-center rounded-xl bg-white/5 border border-white/10 px-5 py-4"
              >
                <span className="text-xl font-semibold">
                  #{index + 1}
                </span>

                <span className="text-xl">
                  {player.username}
                </span>
              </div>
            ))}

          </div>
        ) : (
          <div className="text-center text-gray-400 text-lg">
            Nobody waiting...
          </div>
        )}

      </div>
    </main>
  );
}