"use server";

import { revalidatePath } from "next/cache";
import { supabase } from "@/lib/supabase";

export async function skipPlayer() {
  // Find the first waiting player
  const { data: player, error } = await supabase
    .from("players")
    .select("*")
    .eq("status", "waiting")
    .order("created_at", { ascending: true })
    .limit(1)
    .maybeSingle();

  if (error || !player) {
    console.log("No waiting players to skip.");
    return;
  }

  const { error: updateError } = await supabase
    .from("players")
    .update({
      created_at: new Date().toISOString(),
      skips: (player.skips ?? 0) + 1,
    })
    .eq("id", player.id);

  if (updateError) {
    console.error(updateError);
    return;
  }

  revalidatePath("/");
  revalidatePath("/admin");
}