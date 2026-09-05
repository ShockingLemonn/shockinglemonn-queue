"use client";

import { useEffect, useRef, useState } from "react";
import { supabase } from "@/lib/supabase";

type Player = {
  id: number;
  username: string;
  streamer_score: number;
  opponent_score: number;
  matches_remaining: number;
  status: string;
};

export default function LiveScoreboard({
  initialPlayer,
}: {
  initialPlayer: Player | null;
}) {
  const [player, setPlayer] = useState<Player | null>(initialPlayer);

  const playerRef = useRef<Player | null>(initialPlayer);

  useEffect(() => {
    playerRef.current = player;
  }, [player]);

  useEffect(() => {
    let clearTimer: ReturnType<typeof setTimeout> | null = null;

    const channel = supabase
      .channel("overlay-scoreboard")
      .on(
        "postgres_changes",
        {
          event: "*",
          schema: "public",
          table: "players",
        },
        (payload) => {
          // Player was deleted after finishing their set.
          if (payload.eventType === "DELETE") {
            if (clearTimer) {
              clearTimeout(clearTimer);
            }

            // Keep the final score visible briefly if there is
            // no next challenger.
            clearTimer = setTimeout(() => {
              setPlayer(null);
              playerRef.current = null;
            }, 1500);

            return;
          }

          const newPlayer = payload.new as Player;

          // Only display the active challenger.
          if (newPlayer.status !== "playing") {
            return;
          }

          // A new player update means we have a current challenger.
          if (clearTimer) {
            clearTimeout(clearTimer);
            clearTimer = null;
          }

          const currentPlayer = playerRef.current;

          // New challenger.
          if (currentPlayer && newPlayer.id !== currentPlayer.id) {
            setPlayer(newPlayer);
            playerRef.current = newPlayer;
            return;
          }

          // Same challenger = score/match update.
          setPlayer(newPlayer);
          playerRef.current = newPlayer;
        }
      )
      .subscribe();

    return () => {
      if (clearTimer) {
        clearTimeout(clearTimer);
      }

      supabase.removeChannel(channel);
    };
  }, []);

  // Calculate the current game number from the number of games
  // already played. Never allow it to display higher than 3.
  const gamesPlayed =
    (player?.streamer_score ?? 0) +
    (player?.opponent_score ?? 0);

  const matchNumber = Math.min(gamesPlayed + 1, 3);

  return (
    <>
      <style>{`
        html,
        body {
          background: transparent !important;
        }
      `}</style>

      <main className="min-h-screen flex items-start justify-center bg-transparent text-white p-8">
        <div className="w-full max-w-5xl">

          {/* PLAYER VS VIEWER */}
          <div className="flex items-stretch justify-center gap-10">

            {/* LEFT PLAYER PANEL */}
            <div
              className="relative flex-1 min-w-0 overflow-hidden"
              style={{
                clipPath:
                  "polygon(0 0, 97% 0, 100% 22%, 100% 78%, 97% 100%, 0 100%, 3% 50%)",
              }}
            >
              <div className="relative bg-black/90 px-8 py-2">

                {/* Orange accent */}
                <div className="absolute left-0 top-0 h-1 w-full bg-orange-500" />

                <div className="flex items-center gap-5">

                  {/* Score */}
                  <div className="w-10 shrink-0 text-center">
                    <div className="text-5xl font-black leading-none text-orange-400">
                      {player?.streamer_score ?? 0}
                    </div>
                  </div>

                  {/* Name */}
                  <div className="min-w-0">
                    <div className="truncate text-3xl font-black tracking-wide">
                      ShockingLemonn
                    </div>
                  </div>

                </div>
              </div>

              {/* Border */}
              <div className="pointer-events-none absolute inset-0 border-2 border-orange-500/70" />
            </div>

            {/* RIGHT VIEWER PANEL */}
            <div
              className="relative flex-1 min-w-0 overflow-hidden"
              style={{
                clipPath:
                  "polygon(3% 0, 100% 0, 97% 50%, 100% 100%, 3% 100%, 0 78%, 0 22%)",
              }}
            >
              <div className="relative bg-black/90 px-8 py-2">

                {/* Blue accent */}
                <div className="absolute right-0 top-0 h-1 w-full bg-sky-500" />

                <div className="flex items-center justify-end gap-5">

                  {/* Name */}
                  <div className="min-w-0 text-right">
                    <div className="truncate text-3xl font-black tracking-wide">
                      {player?.username ?? "Waiting..."}
                    </div>
                  </div>

                  {/* Score */}
                  <div className="w-10 shrink-0 text-center">
                    <div className="text-5xl font-black leading-none text-sky-400">
                      {player?.opponent_score ?? 0}
                    </div>
                  </div>

                </div>
              </div>

              {/* Border */}
              <div className="pointer-events-none absolute inset-0 border-2 border-sky-500/70" />
            </div>

          </div>

          {/* MATCH COUNTER */}
          {player && (
            <div className="relative -mt-1 flex justify-center">
              <div className="border-2 border-white/40 bg-black/95 px-5 py-1.5">
                <span className="text-sm font-black uppercase tracking-[0.25em] text-white">
                  MATCH {matchNumber} / 3
                </span>
              </div>
            </div>
          )}

        </div>
      </main>
    </>
  );
}