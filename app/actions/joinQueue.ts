"use server";

import {revalidatePath} from "next/cache";
import { supabase } from "@/lib/supabase";

export async function joinQueue(formData: FormData) {
const username = formData.get("username") as string;
const platform = formData.get("platform") as string;
const discord = formData.get("discord") as string;

if (!username || !platform) {
console.log("Missing username or platform");
return;
}
const cleanUsername = username.trim();

const { data: existingPlayer } = await supabase
.from("players")
.select("id")
.eq("username", cleanUsername)
.eq("status", "waiting")
.maybeSingle();

if (existingPlayer) {
console.log(`${cleanUsername} is already in the queue.`);
return;
}

const { error } = await supabase.from("players").insert([
{
username: cleanUsername,
platform,
discord: discord?.trim() || null,
matches_remaining: 3,
status: "waiting",
},
]);

if (error) {
console.error("Supabase Error:", error);
} else {
console.log("Player added successfully!");
revalidatePath("/");
}
}