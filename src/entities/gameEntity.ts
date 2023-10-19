export enum GameStatus {
	PENDING_PLAYER = "pending",
	IN_PROGRESS = "in-progress",
	FINISHED = "finished",
}

export enum Move {
	ROCK = "rock",
	PAPER = "paper",
	SCISSOR = "scissor",
}

export type Player = {
	name: string;
	move?: Move | "HIDDEN";
};

export type Game = {
	id: string;
	status: GameStatus;
	players: Player[];
};

export const canJoinGame = (game: Game, playerName: string) => {
	if (
		game.players.some((p) => p.name === playerName) ||
		game.players.length === 2
	) {
		return false;
	}

	return true;
};

export const isValidMove = (move: string) => {
	return Object.values(Move).includes(move as Move);
};

export const canMakeMove = (game: Game, playerName: string) => {
	if (
		game.players.length === 1 ||
		!game.players.some((player) => player.name === playerName) ||
		game.players.some(
			(player) => player.name === playerName && "move" in player
		)
	) {
		return false;
	}

	return true;
};

export const calculateWinner = (players: Player[]) => {
	const [player1, player2] = players;
	if (player1.move === player2.move) {
		return null;
	}

	if (player1.move === Move.ROCK && player2.move === Move.SCISSOR) {
		return player1;
	}

	if (player1.move === Move.PAPER && player2.move === Move.ROCK) {
		return player1;
	}

	if (player1.move === Move.SCISSOR && player2.move === Move.PAPER) {
		return player1;
	}

	return player2;
};

export const determineGameStatus = (game: Game) => {
	if (game.players.length === 1) {
		return GameStatus.PENDING_PLAYER;
	}

	if (game.players.every((player) => "move" in player)) {
		return GameStatus.FINISHED;
	}

	return GameStatus.IN_PROGRESS;
};
