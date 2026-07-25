"use server";

import { revalidatePath } from "next/cache";
import { supabase } from "@/lib/supabase";

export async function clearQueue() {
  const { error } = await supabase
    .from("players")
    .delete()
    .neq("id", 0);

  if (error) {
    console.error(error);
    return;
  }

  revalidatePath("/");
  revalidatePath("/admin");
}