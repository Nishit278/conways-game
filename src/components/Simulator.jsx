import React, { useCallback, useRef, useState } from "react";

let numRows = 20,
  numCols = 20;
const genGrid = () => {
  let rows = [];
  for (let i = 0; i < numRows; i++) {
    // rows.push(Array.from(Array(numCols), () => 0));
    rows.push(Array.from(Array(numCols), () => (Math.floor(Math.random()*2))));
  }
  return rows;
};
const positions = [
  [0, 1],
  [0, -1],
  [1, -1],
  [-1, 1],
  [1, 1],
  [-1, -1],
  [1, 0],
  [-1, 0],
];

const Simulator = () => {
  const [grid, setGrid] = useState(() => genGrid());
  const [running, setRunning] = useState(false);
  //   console.log(grid);

  const handleToggle = (row, col) => {
    let copy = [...grid];
    copy[row][col] = grid[row][col] === 1 ? 0 : 1;
    setGrid(copy);
  };

  // ...
  const runningRef = useRef(running);
  runningRef.current = running;

  const runSimulation = useCallback((grid) => {
    if (!runningRef.current) {
      return;
    }

    let gridCopy = [...grid];
    for (let i = 0; i < numRows; i++) {
      for (let j = 0; j < numCols; j++) {
        let neighbors = 0;

        positions.forEach(([x, y]) => {
          const newI = i + x;
          const newJ = j + y;

          if (newI >= 0 && newI < numRows && newJ >= 0 && newJ < numCols) {
            neighbors += grid[newI][newJ];
          }
        });

        if (neighbors < 2 || neighbors > 3) {
          gridCopy[i][j] = 0;
        } else if (grid[i][j] === 0 && neighbors === 3) {
          gridCopy[i][j] = 1;
        }
      }
    }

    setGrid(gridCopy);
  }, []);
  return (
    <div className="simulator">
      <div className="grid">
        {grid.map((row, i) =>
          row.map((col, j) => (
            <div
              className={`cell ${grid[i][j] === 1 ? "alive" : ""}`}
              key={`${i}-${j}`}
              onClick={() => handleToggle(i, j)}
            >
              {/* {grid[i][j]} */}
            </div>
          ))
        )}
      </div>
      <div className="buttons">
        <button className="button">Reset</button>
        <button
          className="button"
          onClick={() => {
            setRunning(!running);
            if (!running) {
              runningRef.current = true;
            }
            setInterval(() => {
              runSimulation(grid);
            }, 500);
          }}
        >
          {running ? "Stop" : "Start"}
        </button>
      </div>
    </div>
  );
};

export default Simulator;
