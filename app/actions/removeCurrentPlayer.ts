"use server";

import { revalidatePath } from "next/cache";
import { supabase } from "@/lib/supabase";

export async function removeCurrentPlayer() {
  // Find the current challenger
  const { data: player, error: playerError } = await supabase
    .from("players")
    .select("id")
    .eq("status", "playing")
    .maybeSingle();

  if (playerError) {
    console.error("FIND CURRENT PLAYER ERROR:", playerError);
    return;
  }

  if (!player) {
    console.log("No active challenger to remove.");
    return;
  }

  // Remove the current challenger
  const { error: deleteError } = await supabase
    .from("players")
    .delete()
    .eq("id", player.id);

  if (deleteError) {
    console.error("REMOVE CURRENT PLAYER ERROR:", deleteError);
    return;
  }

  // Find the next challenger in line
  const { data: nextPlayer, error: nextPlayerError } = await supabase
    .from("players")
    .select("*")
    .eq("status", "waiting")
    .order("created_at", { ascending: true })
    .limit(1)
    .maybeSingle();

  if (nextPlayerError) {
    console.error("NEXT PLAYER ERROR:", nextPlayerError);
    return;
  }

  // Start the next challenger
  if (nextPlayer) {
    const { error: startError } = await supabase
      .from("players")
      .update({
        status: "playing",
        streamer_score: 0,
        opponent_score: 0,
      })
      .eq("id", nextPlayer.id);

    if (startError) {
      console.error("START NEXT PLAYER ERROR:", startError);
      return;
    }
  }

  revalidatePath("/");
  revalidatePath("/admin");
  revalidatePath("/overlay");
}