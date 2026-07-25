import { supabase } from "@/lib/supabase";
import { streamerWon } from "@/app/actions/streamerWon";
export default async function CurrentChallenger() {
  const { data: player, error } = await supabase
    .from("players")
    .select("*")
    .eq("status", "playing")
    .maybeSingle();

  if (error) {
    return (
      <div className="bg-red-900 rounded-xl p-6 mb-8">
        Failed to load current challenger.
      </div>
    );
  }

  if (!player) {
    return (
      <div className="bg-gray-900 rounded-xl p-6 mb-8">
        <h2 className="text-2xl font-bold mb-4">
          🥷 Current Challenger
        </h2>

        <p className="text-gray-400">
          No active match.
        </p>
      </div>
    );
  }

  return (
    <div className="bg-blue-900 rounded-xl p-6 mb-8">
      <h2 className="text-2xl font-bold mb-4">
        🥷 Current Challenger
      </h2>

      <div className="space-y-2">
        <p>
          <strong>Name:</strong> {player.username}
        </p>

        <p>
          <strong>Platform:</strong> {player.platform}
        </p>

        <p>
          <strong>Matches Remaining:</strong> {player.matches_remaining}
        </p>

        <p>
          <strong>Status:</strong> 🟢 Playing
        </p>
        <form action={streamerWon} className="pt-4">
  <button
    type="submit"
    className="bg-green-600 hover:bg-green-700 px-5 py-2 rounded-lg font-bold"
  >
    🏆 Streamer Won
  </button>
</form>
      </div>
    </div>
  );
}