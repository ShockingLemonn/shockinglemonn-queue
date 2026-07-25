import { supabase } from "@/lib/supabase";

export async function getSetting(key: string) {
  const { data, error } = await supabase
    .from("settings")
    .select("value")
    .eq("key", key)
    .maybeSingle();

  if (error || !data) {
    return null;
  }

  return data.value;
}