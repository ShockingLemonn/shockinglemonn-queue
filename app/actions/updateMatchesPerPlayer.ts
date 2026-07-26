"use server";

import { supabase } from "@/lib/supabase";
import { revalidatePath } from "next/cache";

export async function updateMatchesPerPlayer(formData: FormData) {
  const matches = formData.get("matches")?.toString();

  if (!matches) return;

  const { error } = await supabase
    .from("settings")
    .update({
      value: matches,
    })
    .eq("key", "matches_per_player");

  if (error) {
    console.error(error);
    return;
  }

  revalidatePath("/");
  revalidatePath("/admin");
}