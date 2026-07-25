import { supabase } from "@/lib/supabase";
import { removePlayer } from "@/app/actions/removePlayer";
export default async function AdminQueue() {
  const { data: players, error } = await supabase
    .from("players")
    .select("*")
    .eq("status", "waiting")
    .order("created_at", { ascending: true });

  if (error) {
    return (
      <div className="bg-red-900 rounded-xl p-6">
        Failed to load queue.
      </div>
    );
  }

  return (
    <div className="bg-gray-900 rounded-xl p-6">
      <h2 className="text-2xl font-bold mb-6">
        Queue
      </h2>

      {players.length === 0 ? (
        <p>No challengers waiting.</p>
      ) : (
        <div className="space-y-3">
          {players.map((player, index) => (
            <div
              key={player.id}
              className="flex items-center justify-between bg-gray-800 rounded-lg p-4"
            >
              <div>
                <p className="font-bold">
                  #{index + 1} {player.username}
                </p>

                <p className="text-sm text-gray-400">
                  {player.platform}
                </p>
              </div>

              <form action={removePlayer}>
  <input
    type="hidden"
    name="id"
    value={player.id}
  />

  <button
    type="submit"
    className="bg-red-600 hover:bg-red-700 px-4 py-2 rounded-lg"
  >
    🗑 Remove
  </button>
</form>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}