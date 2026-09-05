"use server";

import { revalidatePath } from "next/cache";
import { supabase } from "@/lib/supabase";

export async function opponentWon() {
  const { data: player, error } = await supabase
    .from("players")
    .select("*")
    .eq("status", "playing")
    .maybeSingle();

  if (error || !player) {
    console.log("No active challenger.");
    return;
  }

  const opponentScore = (player.opponent_score ?? 0) + 1;
  const matchesRemaining = player.matches_remaining - 1;

  // Challenger has finished all of their matches.
  if (matchesRemaining <= 0) {
    // Save the FINAL score while the player is still "playing".
    const { error: finishError } = await supabase
      .from("players")
      .update({
        matches_remaining: 0,
        opponent_score: opponentScore,
      })
      .eq("id", player.id);

    if (finishError) {
      console.error("FINISH ERROR:", finishError);
      return;
    }

    // Give the overlay 5 seconds to show the final score.
    await new Promise((resolve) => setTimeout(resolve, 5000));

    // Remove the finished challenger.
    const { error: deleteError } = await supabase
      .from("players")
      .delete()
      .eq("id", player.id);

    if (deleteError) {
      console.error("DELETE ERROR:", deleteError);
      return;
    }

    // Find the next challenger.
    const { data: nextPlayer, error: nextError } = await supabase
      .from("players")
      .select("*")
      .eq("status", "waiting")
      .order("created_at", { ascending: true })
      .limit(1)
      .maybeSingle();

    if (nextError) {
      console.error("NEXT PLAYER ERROR:", nextError);
      return;
    }

    // Start the next challenger.
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
      }
    }
  } else {
    // Normal game.
    const { error: updateError } = await supabase
      .from("players")
      .update({
        matches_remaining: matchesRemaining,
        opponent_score: opponentScore,
      })
      .eq("id", player.id);

    if (updateError) {
      console.error("UPDATE ERROR:", updateError);
      return;
    }
  }

  revalidatePath("/");
  revalidatePath("/admin");
  revalidatePath("/overlay");
}