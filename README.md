# test

To install dependencies:

```bash
bun install
```

To run:

```bash
bun run index.ts
```

# Simple general game service

Simple game service where different games can be played. Such as Rock Paper Scissor and Tic Tac Toe!

## API Routes for games

Each game can be created and joined (if there are spots available). When creating a game the user inputs the type of game they want to create.

```bash
GET /api/games
GET /api/games/:id
POST /api/games/ { gameType: GameType }
PUT /api/games/:id/join
PUT /api/games/:id/move
```

## API Routes for Rock Paper Scissors

In Rock Paper Scissors there are only two players allowed. The allowed moves are "Rock", "Paper", and "Scissors".
When both players have put in their moves the winner is calculated
