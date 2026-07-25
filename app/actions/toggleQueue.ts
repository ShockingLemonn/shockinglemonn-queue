"use server";

import { revalidatePath } from "next/cache";
import { supabase } from "@/lib/supabase";

export async function toggleQueue() {
  const { data, error } = await supabase
    .from("settings")
    .select("value")
    .eq("key", "queue_open")
    .maybeSingle();

  if (error || !data) {
    console.error("Failed to load queue setting.");
    return;
  }

  const newValue = data.value === "true" ? "false" : "true";

  const { error: updateError } = await supabase
    .from("settings")
    .update({ value: newValue })
    .eq("key", "queue_open");

  if (updateError) {
    console.error(updateError);
    return;
  }

  revalidatePath("/");
  revalidatePath("/admin");
}