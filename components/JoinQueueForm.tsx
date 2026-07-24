"use client";
import {joinQueue} from "@/app/actions/joinQueue";
export default function JoinQueueForm() {
return (
<div className="bg-gray-900 rounded-xl p-6 mt-8">
<h2 className="text-2xl font-bold mb-6">
Join the Queue
</h2>

<form action={joinQueue} className="space-y-4">

<div>
<label className="block mb-2">
Shinobi Name
</label>

<input
name="username"
type="text"
className="w-full p-3 rounded bg-gray-800 border border-gray-700"
placeholder="Enter your username"
/>
</div>

<div>
<label className="block mb-2">
Platform
</label>

<select
name="platform"
className="w-full p-3 rounded bg-gray-800 border border-gray-700"
>
<option>Twitch</option>
<option>YouTube</option>
<option>TikTok</option>
</select>
</div>

<div>
<label className="block mb-2">
Discord (Optional)
</label>

<input
name="discord"
type="text"
className="w-full p-3 rounded bg-gray-800 border border-gray-700"
placeholder="Discord username"
/>
</div>

<button
className="w-full bg-blue-600 hover:bg-blue-700 p-3 rounded-lg font-bold"
>
Join Queue
</button>

</form>
</div>
);
}