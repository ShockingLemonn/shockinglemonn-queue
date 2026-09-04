import { supabase } from "@/lib/supabase";
import LiveScoreboard from "@/components/LiveScoreboard";

export default async function OverlayPage() {
  const { data: currentPlayer } = await supabase
    .from("players")
    .select(
      "id, username, streamer_score, opponent_score, matches_remaining, status"
    )
    .eq("status", "playing")
    .maybeSingle();

  return (
    <LiveScoreboard initialPlayer={currentPlayer} />
  );
}