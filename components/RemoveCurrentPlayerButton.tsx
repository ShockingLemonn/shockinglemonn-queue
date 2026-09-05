"use client";

import { removeCurrentPlayer } from "@/app/actions/removeCurrentPlayer";

export default function RemoveCurrentPlayerButton() {
  function handleClick() {
    const confirmed = window.confirm(
      "Are you sure you want to remove the current challenger? This will not count as a win or use a match."
    );

    if (!confirmed) {
      return;
    }

    const form = document.getElementById(
      "remove-current-player-form"
    ) as HTMLFormElement | null;

    form?.requestSubmit();
  }

  return (
    <form
      id="remove-current-player-form"
      action={removeCurrentPlayer}
    >
      <button
        type="button"
        onClick={handleClick}
        className="bg-red-600 hover:bg-red-700 px-5 py-2 rounded-lg font-bold"
      >
        Remove Current Player
      </button>
    </form>
  );
}