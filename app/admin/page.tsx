import AdminQueue from "@/components/AdminQueue";
import CurrentChallenger from "@/components/CurrentChallenger";
import { clearQueue } from "@/app/actions/clearQueue";
import { startMatch } from "@/app/actions/startMatch";
export default function AdminPage() {
return (
<main className="min-h-screen bg-black text-white p-8">
<div className="max-w-5xl mx-auto">
<h1 className="text-4xl font-bold mb-2">
🏯 Hokage Office
</h1>

<p className="text-gray-400 mb-8">
Stream Control Panel
</p>
<form action={clearQueue} className="mb-8">
  <button
    type="submit"
    className="bg-red-600 hover:bg-red-700 px-6 py-3 rounded-lg font-bold"
  >
    🗑 Clear Queue
  </button>
</form>
<form action={startMatch} className="mb-8">
  <button
    type="submit"
    className="bg-green-600 hover:bg-green-700 px-6 py-3 rounded-lg font-bold"
  >
    ▶ Start Set
  </button>
</form>
<CurrentChallenger />

<AdminQueue />
</div>
</main>
);
}