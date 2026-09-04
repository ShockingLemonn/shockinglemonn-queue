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

export async function setSetting(key: string, value: string) {
  const { error } = await supabase
    .from("settings")
    .upsert(
      {
        key,
        value,
      },
      {
        onConflict: "key",
      }
    );

  if (error) {
    console.error(`Failed to update setting "${key}":`, error);
    return false;
  }

  return true;
}