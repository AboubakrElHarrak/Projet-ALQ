import "bootstrap/dist/css/bootstrap.css";
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Header } from "./header/header";
import { Grid } from "./Grid/Grid";
import { useState, useEffect, useRef } from "react";
import Agent from "./agent";

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";

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

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

export const options = {
  responsive: true,
  plugins: {
    legend: {
      position: "top",
    },
    title: {
      display: true,
      text: "Chart.js Bar Chart",
    },
  },
};

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
    new Agent("rock", 2, 2, 4),
    new Agent("scissors", 4, 4),
    new Agent("scissors", 0, 4, 4),
    //new Agent("scissors", 3, 3),
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

  const labels = ["rock", "paper", "scissors"];

  const [data, setData] = useState({
    labels,
    datasets: [
      {
        label: "Dataset 1",
        data: [0, 0, 0],
        backgroundColor: "rgba(255, 99, 132, 0.5)",
      },
    ],
  });

  useEffect(() => {
    const agentsDetails = () => {
      const agentsMap = new Map();

      labels.forEach((label) => agentsMap.set(label, 0));

      agents.forEach((agent) => {
        let agentCount = agentsMap.get(agent.type) || 0;
        agentsMap.set(agent.type, agentCount + 1);
      });
      let result = [];

      for (let entry of agentsMap.entries()) {
        result.push({ agentType: entry[0], agentCount: entry[1] });
      }
      return result;
    };

    setData({
      labels: agentsDetails().map((agentDetails) => agentDetails.agentType),
      datasets: [
        {
          label: "Dataset 1",
          data: agentsDetails().map((agentDetails) => agentDetails.agentCount),
          backgroundColor: "rgba(255, 99, 132, 0.5)",
        },
      ],
    });
  }, [agents]);

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
        if (agent === agents[0]) {
          agent.calculateNextPosition(agents);
        } else {
          agent.updatePosition(agents, agent.x, agent.y);
        }
        return new Agent(agent.type, agent.x, agent.y, agent.intelligence);
      });

      //agents.forEach(agent => agent.calculateNextPosition(agents));

      //agents[0].calculateNextPosition(agents);
      //return agents;
    });
  }

  useEffect(() => {
    intervalIdRef.current = setInterval(() => {
      updateAgentsPosition();
    }, 2000); // update position every 1 second
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
            flexDirection: "column",
          }}
        >
          <Routes>
            <Route>
              <Route
                path="/"
                element={
                  <>
                    <Grid grid={grid} agents={agents} />
                    <Bar style={{ width: 20 }} options={options} data={data} />
                  </>
                }
              />
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
