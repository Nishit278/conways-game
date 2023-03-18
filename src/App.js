import "./App.scss";
import Navbar from "./components/Navbar";
import Simulator from "./components/Simulator";
import React, { useCallback, useRef, useState, useEffect } from "react";

let numRows = 20,
  numCols = 20;
const genGrid = () => {
  let rows = [];
  for (let i = 0; i < numRows; i++) {
    // rows.push(Array.from(Array(numCols), () => 0));
    rows.push(Array.from(Array(numCols), () => Math.floor(Math.random() * 2)));
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

function App() {
  const [grid, setGrid] = useState(() => genGrid());
  const [running, setRunning] = useState(false);
  //   console.log(grid);
  // useEffect(()=>{
  //   if(running){
  //    setTimeout(()=> {let gridCopy = [...grid];
  //       for (let i = 0; i < numRows; i++) {
  //         for (let j = 0; j < numCols; j++) {
  //           let neighbors = 0;
    
  //           positions.forEach(([x, y]) => {
  //             const newI = i + x;
  //             const newJ = j + y;
    
  //             if (newI >= 0 && newI < numRows && newJ >= 0 && newJ < numCols) {
  //               neighbors += grid[newI][newJ];
  //             }
  //           });
    
  //           if (neighbors < 2 || neighbors > 3) {
  //             gridCopy[i][j] = 0;
  //           } else if (grid[i][j] === 0 && neighbors === 3) {
  //             gridCopy[i][j] = 1;
  //           }
  //         }
  //       }
    
  //       setGrid(gridCopy);},500)
  //   } else {
  //     return;
  //   }
  // }, [running, grid])
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

  const handleReset = ()=>{
    let copy = genGrid();
    console.table(copy);

    setGrid(copy);
  }
  return (
    <div className="app">
      <Navbar />
      <div className="simulator">
        <Simulator
          rows={numRows}
          cols={numCols}
          grid={grid}
          setGrid={setGrid}
        />
        <div className="buttons">
          <button className="button" onClick={()=> handleReset()}>Reset</button>
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
    </div>
  );
}

export default App;
