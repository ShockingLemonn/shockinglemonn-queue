"use server";

import { revalidatePath } from "next/cache";
import { supabase } from "@/lib/supabase";

export async function updateCurrentGame(formData: FormData) {
  const game = formData.get("game") as string;

  if (!game?.trim()) {
    return;
  }

  const { error } = await supabase
    .from("settings")
    .update({
      value: game.trim(),
    })
    .eq("key", "current_game");

  if (error) {
    console.error(error);
    return;
  }

  revalidatePath("/");
  revalidatePath("/admin");
}