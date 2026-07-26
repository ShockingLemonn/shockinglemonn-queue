"use client";

import { joinQueue } from "@/app/actions/joinQueue";

export default function JoinQueueForm() {
  return (
    <form action={joinQueue} className="space-y-6">

      {/* Username */}
      <div>
        <label className="block mb-2 text-sm uppercase tracking-wide text-orange-400 font-semibold">
          🥷 Shinobi Name
        </label>

        <input
          name="username"
          type="text"
          placeholder="Enter your username"
          className="w-full rounded-2xl border border-gray-700 bg-gray-800 px-5 py-4 text-lg text-white outline-none transition-all duration-200 focus:border-orange-500 focus:ring-2 focus:ring-orange-500/30"
          required
        />
      </div>

      {/* Platform */}
      <div>
        <label className="block mb-2 text-sm uppercase tracking-wide text-orange-400 font-semibold">
          🎮 Platform
        </label>

        <select
          name="platform"
          className="w-full rounded-2xl border border-gray-700 bg-gray-800 px-5 py-4 text-lg text-white outline-none transition-all duration-200 focus:border-orange-500 focus:ring-2 focus:ring-orange-500/30"
        >
          <option>Twitch</option>
          <option>YouTube</option>
          <option>TikTok</option>
        </select>
      </div>

      {/* Discord */}
      <div>
        <label className="block mb-2 text-sm uppercase tracking-wide text-orange-400 font-semibold">
          💬 Discord (Optional)
        </label>

        <input
          name="discord"
          type="text"
          placeholder="Username#1234"
          className="w-full rounded-2xl border border-gray-700 bg-gray-800 px-5 py-4 text-lg text-white outline-none transition-all duration-200 focus:border-orange-500 focus:ring-2 focus:ring-orange-500/30"
        />
      </div>

      {/* Button */}
      <button
        type="submit"
        className="w-full rounded-2xl bg-orange-500 py-4 text-xl font-black text-white transition-all duration-200 hover:bg-orange-400 hover:scale-[1.02] active:scale-95 shadow-lg shadow-orange-500/20"
      >
        ⚔ JOIN THE BATTLE
      </button>

    </form>
  );
}