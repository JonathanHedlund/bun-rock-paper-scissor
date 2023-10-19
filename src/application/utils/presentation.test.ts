import { describe, expect, test } from "bun:test";

import { Move, type Player } from "../../entities/gameEntity";
import { hideMoves } from "./presentation";

describe("presentation", () => {
	test("should hide moves", () => {
		const players: Player[] = [
			{ name: "John", move: Move.ROCK },
			{ name: "Ted", move: Move.PAPER },
		];

		expect(hideMoves(players)).toEqual([
			{ name: "John", move: "HIDDEN" },
			{ name: "Ted", move: "HIDDEN" },
		]);
	});
	test("should not hide move if there is no move", () => {
		const players: Player[] = [
			{ name: "John" },
			{ name: "Ted", move: Move.PAPER },
		];

		expect(hideMoves(players)).toEqual([
			{ name: "John" },
			{ name: "Ted", move: "HIDDEN" },
		]);
	});
});
