import "bootstrap/dist/css/bootstrap.css";
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Header } from "./header/header";
import { Grid } from "./Grid/Grid";
import { useState, useEffect, useRef } from "react";
import Agent from "./agent";

import {
  MDBBtn,
  MDBModal,
  MDBModalDialog,
  MDBModalContent,
  MDBModalHeader,
  MDBModalTitle,
  MDBModalBody,
  MDBModalFooter,
} from "mdb-react-ui-kit";

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
    new Agent("rock", 2, 2, 2),
    new Agent("paper", 3, 2),
    //new Agent("scissors", 1, 3),
    // new Agent("scissors", 2, 2),
    // new Agent("rock", 2, 1),
    // new Agent("paper", 7, 10),
    // new Agent("paper", 14, 18),
    // new Agent("scissors", 3, 3),
    // new Agent("rock", 7, 7),
    // new Agent("paper", 12, 12),
    // new Agent("rock", 15, 15),
    // new Agent("rock", 1, 1),
    // new Agent("paper", 10, 10),
    // new Agent("rock", 18, 18),
    // new Agent("scissors", 5, 5),
    // new Agent("rock", 7, 7),
    // new Agent("paper", 12, 12),
    // new Agent("scissors", 15, 15),
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
      // return agents.map((agent) => {
      //   agent.updatePosition(agents);
      //   return new Agent(agent.type, agent.x, agent.y);
      // });
      //agents.forEach(agent => agent.calculateNextPosition(agents));
      //agents[0].calculateNextPosition(agents);
      return agents;
    });
  }

  useEffect(() => {
    intervalIdRef.current = setInterval(() => {
      updateAgentsPosition();
    }, 100); // update position every 1 second
    return () => clearInterval(intervalIdRef.current);
  }, []);

  const toggleShow = () => setsimulationFinished(false);

  const WinnerPopUp = ({ typeName }) => {
    return (
      <MDBModal show={simulationFinished} tabIndex="-1">
        <MDBModalDialog>
          <MDBModalContent>
            <MDBModalHeader>
              <MDBModalTitle>Résultat de la simulation</MDBModalTitle>
              <MDBBtn
                className="btn-close"
                color="none"
                onClick={toggleShow}
              ></MDBBtn>
            </MDBModalHeader>
            <MDBModalBody>
              <h1>{typeName} gangne !</h1>
            </MDBModalBody>

            <MDBModalFooter>
              <MDBBtn color="secondary" onClick={toggleShow}>
                Fermer
              </MDBBtn>
              <MDBBtn>Exporter les résultats</MDBBtn>
            </MDBModalFooter>
          </MDBModalContent>
        </MDBModalDialog>
      </MDBModal>
    );
  };

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
          typeName={
            winner === "rock"
              ? "Pierre"
              : winner === "scissors"
              ? "Ciseaux"
              : "Feuille "
          }
          onClose={() => setsimulationFinished(false)}
        />
      </BrowserRouter>
    </>
  );
}

export default App;
