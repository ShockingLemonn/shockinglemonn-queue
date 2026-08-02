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

  // Get all active players (waiting or playing)
  const { data: players, error: lookupError } = await supabase
    .from("players")
    .select("id, username, status")
    .in("status", ["waiting", "playing"]);

  if (lookupError) {
    console.error("Lookup Error:", lookupError);
    return;
  }

  // Count waiting players
  const waitingPlayers =
    players?.filter((player) => player.status === "waiting") ?? [];

  if (waitingPlayers.length >= 10) {
    console.log("Queue is full.");
    return;
  }

  // Check for duplicate username (case-insensitive)
  const duplicate = players?.find(
    (player) =>
      player.username.trim().toLowerCase() === username.toLowerCase()
  );

  if (duplicate) {
    console.log(`${username} is already in the queue.`);
    return;
  }

  const { error } = await supabase.from("players").insert([
    {
      username,
      platform,
      discord,
      matches_remaining: 3,
      status: "waiting",
      skips: 0,
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