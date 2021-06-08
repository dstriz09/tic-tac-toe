import React, { useState } from "react";
import Board from "./components/Board";

function App() {
  const [turn, setTurn] = useState("O");
  const [gameGrid, setGameGrid] = useState(new Array(9).fill(null));
  const [gameWinner, setGameWinner] = useState(null);

  const handleGameGrid = (i) => {
    let newGrid = gameGrid;
    newGrid[i] = turn;
    setGameGrid(newGrid);
    calculateWinner(gameGrid);
  };

  function calculateWinner(squares) {
    const lines = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];
    for (let i = 0; i < lines.length; i++) {
      const [a, b, c] = lines[i];
      if (
        squares[a] &&
        squares[a] === squares[b] &&
        squares[a] === squares[c]
      ) {
        return setGameWinner(squares[a]);
      }
    }
    return;
  }

  return (
    <>
      <div className="container">
        <div className="game-winner">{gameWinner}</div>
        {gameGrid.map((board, i) => (
          <Board
            key={i}
            turn={turn}
            setTurn={setTurn}
            handleGameGrid={() => handleGameGrid(i)}
          />
        ))}
      </div>
      <button
        className="reset"
        onClick={() => setGameGrid(new Array(9).fill(null))}
      >
        RESET
      </button>
    </>
  );
}

export default App;
