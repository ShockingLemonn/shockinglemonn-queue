"use server";

import { revalidatePath } from "next/cache";
import { supabase } from "@/lib/supabase";

export async function removePlayer(formData: FormData) {
  const id = Number(formData.get("id"));

  console.log("Removing player ID:", id);

  const { data, error } = await supabase
  .from("players")
  .delete()
  .eq("id", id)
  .select();

console.log("Deleted rows:", data);

  if (error) {
    console.error("DELETE ERROR:", error);
    return;
  }

  console.log("Player removed!");

  revalidatePath("/");
  revalidatePath("/admin");
}