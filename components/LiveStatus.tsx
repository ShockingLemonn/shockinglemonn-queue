type Props = {
  currentGame: string | null;
  queueOpen: string | null;
  streamLive: string | null;
};

export default function LiveStatus({
  currentGame,
  queueOpen,
  streamLive,
}: Props) {
  const isLive = streamLive === "true";

  return (
    <section className="bg-gray-900/90 rounded-3xl border border-orange-500/30 p-8 mb-8">

      <h2 className="text-3xl font-bold mb-6">
        {isLive ? "🔴 LIVE NOW" : "⚫ OFFLINE"}
      </h2>

      {isLive ? (
        <>
          <div className="space-y-3 text-xl">
            <p>
              🎮 <span className="font-bold">{currentGame}</span>
            </p>

            <p>
              {queueOpen === "true"
                ? "🟢 Queue Open"
                : "🔴 Queue Closed"}
            </p>
          </div>
        </>
      ) : (
        <>
          <p className="text-xl text-gray-300">
            Not currently streaming.
          </p>

          <p className="mt-4 text-gray-400">
            Follow on Twitch or Discord to know
            when the next battle begins.
          </p>
        </>
      )}

    </section>
  );
}