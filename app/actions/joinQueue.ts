"use server";

import { revalidatePath } from "next/cache";
import { supabase } from "@/lib/supabase";

export async function joinQueue(formData: FormData) {
  const username = (formData.get("username") as string)?.trim();
  const platform = formData.get("platform") as string;
  const discord = (formData.get("discord") as string)?.trim() || null;

  if (!username || !platform) {
    console.log("Missing username or platform");
    return;
  }

  // Check all active players (waiting or playing)
  const { data: players, error: lookupError } = await supabase
    .from("players")
    .select("id, username, status")
    .in("status", ["waiting", "playing"]);

  if (lookupError) {
    console.error("Lookup Error:", lookupError);
    return;
  }

  const duplicate = players?.find(
    (player) =>
      player.username.trim().toLowerCase() === username.toLowerCase()
  );

  if (duplicate) {
  throw new Error("⚠️ You're already in the queue!");
}

  const { error } = await supabase.from("players").insert([
    {
      username,
      platform,
      discord,
      matches_remaining: 3,
      status: "waiting",
    },
  ]);

  if (error) {
    console.error("Supabase Error:", error);
    return;
  }

  console.log("Player added successfully!");

  revalidatePath("/");
  revalidatePath("/admin");
}