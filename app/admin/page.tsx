import Queue from "@/components/Queue";

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

<Queue />
</div>
</main>
);
}