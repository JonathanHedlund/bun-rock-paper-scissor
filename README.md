# THE ULTIMATE SHOWDOWN - Rock, paper, scissors

A simple app where two players can face off in a rock, paper, scissors match.
The rules are simple, one game decides the winner.

## Example of how a game could look like

1. Player 1 sends a request to create a new game and gets back a game ID from the server.
2. Player 1 sends the game ID to player 2 via any communication channel. (eg mail, slack or fax)
3. Player 2 joins the game using the game ID.
4. Player 1 makes his move (Stone).
5. Player 2 makes his move (Scissors).
6. Player 1 checks the state of the game and discovers that he has won.
7. Player 2 checks the state of the game and discovers that he lost.

## How to set up the game

To load all the dependencies open up your command line and navigate to the root of the
project and execute using one of the following commands:

```bash
bun install
```

Start the server using one of the following commands:

```bash
bun run start
```

Make calls to the server using your favorite way of API testing. Such as:

- curl
- wget
- Postman
- HTTPie

## API calls used to play the game and what is required in the body

Once you have the server up and running on your localhost you can go to this step!
Here are all of the API calls used to play the game and a more indepth description of each.

```
POST /api/v1/games
POST /api/v1/games --> Creates a new game
POST /api/v1/games/{id}/join --> Joins an existing game
POST /api/v1/games/{id}/move --> Make your move
GET /api/v1/games/{id} --> Get results of your game
```

### POST /api/games

Creates a new game. Input the player name in the request-body.
A game ID is returned that you can send to your opponent

```json
{
	"name": "Jonathan"
}
```

### POST /api/games/{id}/join

Joins a game with the game ID you recieved from your opponent.
Input the player name in the request-body. Returns if you are able to join the game or not.

```json
{
	"name": "Ted"
}
```

### POST /api/games/{id}/move

Make your move. Input your player name and the move you want to make. As well as having the game ID as a parameter.
Only "Rock", "Paper" and "Scissors" are valid moves in this game.

```json
{
	"name": "Ted",
	"move": "Scissors"
}
```

### GET /api/games/{id}

Returns the current state of the game by providing the game ID as a parameter. If both players have made their move a victor is crowned.
No input in the request-body.
