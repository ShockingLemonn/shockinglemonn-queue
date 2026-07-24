import { supabase } from "@/lib/supabase";

export default async function Queue() {
const { data: players, error } = await supabase
.from("players")
.select("*")
.order("created_at", { ascending: true });

if (error) {
return (
<div className="bg-red-900 rounded-xl p-6 mt-8">
<p>Failed to load queue.</p>
</div>
);
}

return (
<div className="bg-gray-900 rounded-xl p-6 mt-8">
<h2 className="text-2xl font-bold mb-6">Queue</h2>

{players.length === 0 ? (
<p>No challengers yet.</p>
) : (
<ul className="space-y-3">
{players.map((player, index) => (
<li
key={player.id}
className="bg-gray-800 rounded-lg p-4 flex justify-between"
>
<span>
#{index + 1} {player.username}
</span>

<span>{player.platform}</span>
</li>
))}
</ul>
)}
</div>
);
}