import "bootstrap/dist/css/bootstrap.css";
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Header } from "./header/header";
import { Grid } from "./Grid/Grid";
import { useState, useEffect } from "react";

function App() {
  const grid = [];
  for (let i = 0; i < 20; i++) {
    grid[i] = [];
    for (let j = 0; j < 20; j++) {
      grid[i][j] = 0;
    }
  }

  const [agents, setAgents] = useState([
    { type: "rock", x: 1, y: 1 },
    { type: "paper", x: 10, y: 10 },
    { type: "scissors", x: 18, y: 18 },
  ]);

  function updateAgentsPosition() {
    setAgents((agents) =>
      agents.map((agent) => {
        const dx = Math.floor(Math.random() * 3) - 1; // random x direction (-1, 0, 1)
        const dy = Math.floor(Math.random() * 3) - 1; // random y direction (-1, 0, 1)
        const x = Math.min(Math.max(agent.x + dx, 0), 19); // limit x position to [0, 19]
        const y = Math.min(Math.max(agent.y + dy, 0), 19); // limit y position to [0, 19]
        return { ...agent, x, y };
      })
    );
  }

  grid[1][1] = 1;
  grid[10][10] = 2;
  grid[18][18] = 3;

  useEffect(() => {
    const intervalId = setInterval(() => {
      updateAgentsPosition();
    }, 1000); // update position every 1 second
    return () => clearInterval(intervalId);
  }, []);

  return (
    <BrowserRouter>
      <Header />
      <main
        className="w-75 mx-auto p-5"
        style={{
          display: "flex",
          justifyContent: "center",
          alignContent: "center",
        }}
      >
        <Grid grid={grid} agents={agents} />
        <Routes>
          <Route>
            {/* <Route path="/food" element={<Food foodCategories={foodCategories}/>} /> */}
          </Route>
        </Routes>
      </main>
    </BrowserRouter>
  );
}

export default App;
