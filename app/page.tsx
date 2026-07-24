import Header from "@/components/Header";
import JoinQueueForm from "@/components/JoinQueueForm";
import Queue from "@/components/Queue";

export default async function Home() {

return (
<main className="min-h-screen bg-black text-white p-8">
<div className="max-w-4xl mx-auto">
    <Header />



<div className="bg-gray-900 rounded-xl p-6 mb-8">
<h2 className="text-2xl font-bold mb-4">
🔴 LIVE
</h2>

<p>
Game:
<span className="font-bold">
{" "}Super Naruto Clash of Ninja 4
</span>
</p>
</div>

<Queue />
<JoinQueueForm />
</div>
</main>
);
}