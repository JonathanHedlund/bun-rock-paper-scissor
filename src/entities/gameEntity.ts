export enum GameStatus {
	PENDING_PLAYER = "pending",
	IN_PROGRESS = "in-progress",
	FINISHED = "finished",
}

export enum Move {
	ROCK = "rock",
	PAPER = "paper",
	SCISSORS = "scissors",
}

export type Player = {
	name: string;
	move?: Move | "HIDDEN";
};

export type Game = {
	id: string;
	status: GameStatus;
	players: Player[];
	winner?: Player;
};

export const isPlayerInGame = (game: Game, playerName: string) =>
	game.players.some((player) => player.name === playerName);

export const isGameFull = (game: Game) => game.players.length === 2;

export const isValidMove = (move: string) =>
	Object.values(Move).includes(move as Move);

export const hasAlreadyMadeMove = (game: Game, playerName: string) =>
	game.players.some((player) => player.name === playerName && "move" in player);

export const calculateWinner = (players: Player[]) => {
	const [player1, player2] = players;
	if (player1.move === player2.move) {
		return null;
	}

	if (player1.move === Move.ROCK && player2.move === Move.SCISSORS) {
		return player1;
	}

	if (player1.move === Move.PAPER && player2.move === Move.ROCK) {
		return player1;
	}

	if (player1.move === Move.SCISSORS && player2.move === Move.PAPER) {
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
