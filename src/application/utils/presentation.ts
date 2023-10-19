import type { Player } from "../../entities/gameEntity";

export const hideMoves = (players: Player[]): Player[] => {
	return players.map((player) =>
		player.move
			? {
					...player,
					move: "HIDDEN",
			  }
			: player
	);
};
