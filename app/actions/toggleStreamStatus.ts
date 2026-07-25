"use server";

import { revalidatePath } from "next/cache";
import { supabase } from "@/lib/supabase";

export async function toggleStreamStatus() {
  const { data, error } = await supabase
    .from("settings")
    .select("value")
    .eq("key", "stream_live")
    .maybeSingle();

  if (error || !data) {
    console.error("Failed to load stream status.");
    return;
  }

  const newValue = data.value === "true" ? "false" : "true";

  const { error: updateError } = await supabase
    .from("settings")
    .update({ value: newValue })
    .eq("key", "stream_live");

  if (updateError) {
    console.error(updateError);
    return;
  }

  revalidatePath("/");
  revalidatePath("/admin");
}