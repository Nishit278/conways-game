import React from "react";

const Simulator = ({rows, cols, grid, setGrid}) => {
  const handleToggle = (row, col) => {
    let copy = [...grid];
    copy[row][col] = grid[row][col] === 1 ? 0 : 1;
    setGrid(copy);
  };
  return (
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
  );
};

export default Simulator;
