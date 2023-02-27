import "bootstrap/dist/css/bootstrap.css";
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Header } from "./header/header";
import { Grid } from "./Grid/Grid";
import { useState, useEffect, useRef } from "react";

import {
  MDBBtn,
  MDBModal,
  MDBModalDialog,
  MDBModalContent,
  MDBModalHeader,
  MDBModalTitle,
  MDBModalBody,
  MDBModalFooter,
} from 'mdb-react-ui-kit';

function App() {
  const intervalIdRef = useRef(null);
  const [winner, setWinner] = useState(null);
  const [simulationFinished, setsimulationFinished] = useState(false);

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
    { type: "paper", x: 18, y: 18 },
    { type: "scissors", x: 2, y: 2 },
    { type: "rock", x: 2, y: 1 },
    { type: "paper", x: 7, y: 10 },
    { type: "paper", x: 14, y: 18 },
    { type: "scissors", x: 3, y: 3 },
    { type: "rock", x: 7, y: 7 },
    { type: "paper", x: 12, y: 12 },
    { type: "rock", x: 15, y: 15 },
    { type: "rock", x: 1, y: 1 },
    { type: "paper", x: 10, y: 10 },
    { type: "rock", x: 18, y: 18 },
    { type: "scissors", x: 5, y: 5 },
    { type: "rock", x: 7, y: 7 },
    { type: "paper", x: 12, y: 12 },
    { type: "scissors", x: 15, y: 15 },
  ]);

  function updateAgentsPosition() {
  setAgents((agents) => {
    const allSameType = agents.every(
      (agent, index, arr) => agent.type === arr[0].type
    );
    if (allSameType) {
      clearInterval(intervalIdRef.current);
      setWinner(agents[0].type);
      setsimulationFinished(true);
      return agents;
    }
    return agents.map((agent) => {
      const dx = Math.floor(Math.random() * 3) - 1; // random x direction (-1, 0, 1)
      const dy = Math.floor(Math.random() * 3) - 1; // random y direction (-1, 0, 1)
      const x = Math.min(Math.max(agent.x + dx, 0), 19); // limit x position to [0, 19]
      const y = Math.min(Math.max(agent.y + dy, 0), 19); // limit y position to [0, 19]

      // collision detection
      const collidingAgent = agents.find(
        (a) => a.x === x && a.y === y && a !== agent
      );
      if (collidingAgent) {
        if (collidingAgent.type === agent.type) {
          // same type, keep moving randomly
          return { ...agent, x, y };
        } else {
          // different type, determine winner based on rock-paper-scissors rules
          const winnerType = getWinnerType(agent.type, collidingAgent.type);
          const newType = agent.type === winnerType ? agent.type : collidingAgent.type;
          return { ...agent, x, y, type: newType };
        }
      }

      return { ...agent, x, y };
    });
  });
}

function getWinnerType(type1, type2) {
  if (type1 === type2) {
    return type1;
  }
  if (
    (type1 === "rock" && type2 === "scissors") ||
    (type1 === "scissors" && type2 === "paper") ||
    (type1 === "paper" && type2 === "rock")
  ) {
    return type1;
  }
  return type2;
}

useEffect(() => {
    intervalIdRef.current = setInterval(() => {
      updateAgentsPosition();
    }, 100); // update position every 1 second
    return () => clearInterval(intervalIdRef.current);
}, []);
  
  const toggleShow = () => setsimulationFinished(false);

  const WinnerPopUp = ({typeName}) => {
    return (
      <MDBModal show={simulationFinished} tabIndex='-1'>
        <MDBModalDialog>
          <MDBModalContent>
            <MDBModalHeader>
              <MDBModalTitle>Résultat de la simulation</MDBModalTitle>
              <MDBBtn className='btn-close' color='none' onClick={toggleShow}></MDBBtn>
            </MDBModalHeader>
            <MDBModalBody><h1>{typeName} gangne !</h1></MDBModalBody>

            <MDBModalFooter>
              <MDBBtn color='secondary' onClick={toggleShow}>
                Fermer
              </MDBBtn>
              <MDBBtn>Exporter les résultats</MDBBtn>
            </MDBModalFooter>
          </MDBModalContent>
        </MDBModalDialog>
      </MDBModal>
    );
  }


  return (
    <>
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
        <Routes>
          <Route>
            <Route path="/" element={<Grid grid={grid} agents={agents} />} />
          </Route>
          </Routes>
        </main>
        <WinnerPopUp
          typeName={winner === "rock" ? "Pierre" : winner === "scissors" ? "Ciseaux" : "Feuille "}
          onClose={() => setsimulationFinished(false)}/>
      </BrowserRouter>
    </>
  );
}

export default App;