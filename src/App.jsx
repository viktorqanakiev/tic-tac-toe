import { useState } from "react";
import Player from "./components/Player.jsx";
import GameBoard from "./components/GameBoard.jsx";
import Log from "./components/log.jsx";
import { WINNING_COMBINATIONS } from "./winning-combinations.js";

const initialGameBoard = [
  [null, null, null],
  [null, null, null],
  [null, null, null],
];

function deriveACtivePlayer(gameTurns) {
  let currentPlayer = "X";

  if (gameTurns.length > 0 && gameTurns[0].player === "X") {
    currentPlayer = "O";
  }

  return currentPlayer;
}

function App() {
  const [gameTurns, setGameTurns] = useState([]);
  const activePlayer = deriveACtivePlayer(gameTurns);

  let gameBoard = initialGameBoard;

  for (const turn of gameTurns) {
    const { square, player } = turn;
    const { row, col } = square;
    gameBoard[row][col] = player;
  }
  let winner = null;

  for (const combination of WINNING_COMBINATIONS) {
    const firstSquareSimbol =
      gameBoard[combination[0].row][combination[0].column];
    const secondSquareSimbol =
      gameBoard[combination[1].row][combination[1].column];
    const thirdSquareSimbol =
      gameBoard[combination[2].row][combination[2].column];

      if(firstSquareSimbol && firstSquareSimbol === secondSquareSimbol && firstSquareSimbol === thirdSquareSimbol){
        winner = firstSquareSimbol;
      }
  }

  function handleSelectSquare(rowIndex, colIndex) {
    setGameTurns((prevTurns) => {
      const currentPlayer = deriveACtivePlayer(prevTurns);

      const updatedTurns = [
        { square: { row: rowIndex, col: colIndex }, player: currentPlayer },
        ...prevTurns,
      ];
      return updatedTurns;
    });
  }
  return (
    <main>
      <div id="game-container">
        <ol id="players" className="highlight-player">
          <Player
            initialName="Player 1"
            symbol="X"
            IsActive={activePlayer === "X"}
          />
          <Player
            initialName="Player 2"
            symbol="O"
            IsActive={activePlayer === "O"}
          />
        </ol>
        {/* We check if we have a winner and the print it */}
        {winner && <p>You won, {winner}!</p>}
        <GameBoard onSelectSquare={handleSelectSquare} board={gameBoard} />
      </div>
      <Log turns={gameTurns} />
    </main>
  );
}

export default App;
