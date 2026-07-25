"use server";

import { revalidatePath } from "next/cache";
import { supabase } from "@/lib/supabase";

export async function streamerWon() {
  const { data: player, error } = await supabase
    .from("players")
    .select("*")
    .eq("status", "playing")
    .maybeSingle();

  if (error || !player) {
    console.log("No active challenger.");
    return;
  }

  const matchesRemaining = player.matches_remaining - 1;

  if (matchesRemaining <= 0) {
    await supabase
      .from("players")
      .delete()
      .eq("id", player.id);

    const { data: nextPlayer } = await supabase
      .from("players")
      .select("*")
      .eq("status", "waiting")
      .order("created_at", { ascending: true })
      .limit(1)
      .maybeSingle();

    if (nextPlayer) {
      await supabase
        .from("players")
        .update({ status: "playing" })
        .eq("id", nextPlayer.id);
    }
  } else {
    await supabase
      .from("players")
      .update({
        matches_remaining: matchesRemaining,
      })
      .eq("id", player.id);
  }

  revalidatePath("/");
  revalidatePath("/admin");
}