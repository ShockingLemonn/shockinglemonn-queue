"use server";

import { revalidatePath } from "next/cache";
import { supabase } from "@/lib/supabase";

export async function startMatch() {
  const { data: player, error } = await supabase
    .from("players")
    .select("*")
    .eq("status", "waiting")
    .order("created_at", { ascending: true })
    .limit(1)
    .maybeSingle();

  if (error || !player) {
    console.log("No waiting players.");
    return;
  }

  const { data, error: updateError } = await supabase
    .from("players")
    .update({ status: "playing" })
    .eq("id", player.id)
    .select();

  console.log("Updated rows:", data);

  if (updateError) {
    console.error("UPDATE ERROR:", updateError);
    return;
  }

  revalidatePath("/");
  revalidatePath("/admin");
}