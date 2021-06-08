import React, { useState } from "react";
import Square from "../Square";
import styles from "./styles.module.css";

const Board = ({ turn, setTurn, handleGameGrid }) => {
  const [grid, setGrid] = useState(new Array(9).fill(null));
  const [winner, setWinner] = useState(null);

  const handleClick = (i) => {
    if (grid[i] !== null || winner) return;

    let newGrid = grid;
    newGrid[i] = turn;
    setGrid(newGrid);
    calculateWinner(grid);
    turn === "O" ? setTurn("X") : setTurn("O");
  };
  function calculateWinner(squares) {
    if (!grid.includes(null)) return setWinner("C");

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
        setWinner(squares[a]);
        handleGameGrid();
        return;
      }
    }
    return;
  }

  return (
    <div className={styles.board}>
      <div className={styles.winner}>{winner}</div>
      {grid.map((square, i) => (
        <Square key={i} value={square} handleClick={() => handleClick(i)} />
      ))}
    </div>
  );
};

export default Board;
