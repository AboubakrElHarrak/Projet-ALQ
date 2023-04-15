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
import { Bar, Chart, Line } from "react-chartjs-2";
import 'chart.js/auto';

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
import { IndividualAgent } from "./Classes/Agent/IndividualAgent";

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
        display: false
    },
    title: {
      display: true,
      text: "Current Agent distribution",
    },
  }
};

export const options2 = {
  responsive: true,  
  plugins: {
    legend: {
        display: false
    },
    title: {
      display: true,
      text: "Simulation progress",
    },
  }
};

function App() {
  const Ref = useRef();

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
    new IndividualAgent("rock", 1, 1, 4),
    new IndividualAgent("scissors", 3, 3),
    new IndividualAgent("scissors", 0, 4),
    new IndividualAgent("scissors", 3, 3, 2),
    new IndividualAgent("rock", 2, 1, 5),
    new IndividualAgent("paper", 7, 10, 4),
    new IndividualAgent("paper", 14, 18, 3),
    new IndividualAgent("scissors", 3, 3),
    new IndividualAgent("rock", 7, 7, 3),
    new IndividualAgent("paper", 12, 12, 2),
    new IndividualAgent("rock", 15, 15, 2),
    new IndividualAgent("rock", 1, 1, 2),
    new IndividualAgent("paper", 10, 10, 4),
    new IndividualAgent("rock", 18, 18, 3),
    new IndividualAgent("scissors", 5, 5, 2),
    new IndividualAgent("rock", 7, 7, 3),
    new IndividualAgent("paper", 12, 12),
    new IndividualAgent("scissors", 15, 15),
  ]);

  const [lineChartData, setLineChartData] = useState([
    {nbRock: 0, nbPaper: 0, nbScissors: 0, step: 0}
  ]);

  const labels = ["rock", "paper", "scissors"];

  const [data, setData] = useState({
    labels,
    datasets: [
      {
        data: [0, 0, 0],
        backgroundColor: ["rgba(255, 99, 132, 0.5)", "rgba(0, 99, 132, 0.5)", "rgba(255, 99, 0, 0.5)"],
      },
    ],
  });

  const [data2, setData2] = useState({
    labels: [],
    datasets: [
      {
        label: "",
        data: [0, 0, 0],
        backgroundColor: ["rgba(255, 99, 132, 0.5)"],
      },
    ],
  });

  useEffect(() => {
    const agentsDetails = () => {
      const agentsMap = new Map();

      labels.forEach((label) => agentsMap.set(label, 0));

      agents.forEach((agent) => {
        let agentCount = agentsMap.get(agent.getType()) || 0;
        agentsMap.set(agent.getType(), agentCount + 1);
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
          data: agentsDetails().map((agentDetails) => agentDetails.agentCount),
          backgroundColor: ["rgba(255, 99, 132, 0.5)", "rgba(0, 99, 132, 0.5)", "rgba(255, 99, 0, 0.5)"],
        },
      ],
    });

    let _step = lineChartData[lineChartData.length - 1].step;

    setLineChartData(
      [...lineChartData, {nbRock: agentsDetails()[0].agentCount, nbPaper: agentsDetails()[1].agentCount, nbScissors: agentsDetails()[2].agentCount, step: _step + 1}]
    );
    // [{nbRock: 1, nbPaper: 1, nbScissors: 1, instant: 500}, {nbRock: 1, nbPaper: 0, nbScissors: 2, instant: 600}]

    setData2({
      labels: lineChartData.map((item) => item.step),
      datasets: [
        {
          label: "Rock",
          data: lineChartData.map((item) => item.nbRock),
          backgroundColor: ["rgba(255, 99, 132, 0.5)"],
        },
        {
          label: "Paper",
          data: lineChartData.map((item) => item.nbPaper),
          backgroundColor: ["rgba(0, 99, 132, 0.5)"],
        },
        {
          label: "Scissors",
          data: lineChartData.map((item) => item.nbScissors),
          backgroundColor: ["rgba(255, 99, 0, 0.5)"],
        },
      ],
    });
  }, [agents]);


  function updateAgentsPosition() {
    setAgents((agents) => {
      const allSameType = agents.every(
        (agent, index, arr) => agent.getType() === arr[0].getType()
      );
      if (allSameType) {
        clearInterval(intervalIdRef.current);
        setWinner(agents[0].getType());
        setsimulationFinished(true);
        return agents;
      }
      return agents.map((agent) => {
        agent.behave(agents);
        return new IndividualAgent(agent.getType(), agent.getX(), agent.getY(), agent.getIntelligence());
      });

      //agents.forEach(agent => agent.calculateNextPosition(agents));

      //agents[0].calculateNextPosition(agents);
      //return agents;
    });
  }

  useEffect(() => {
    intervalIdRef.current = setInterval(() => {
      updateAgentsPosition();
    }, 100); // update position every 0.1 second
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
          className="mx-auto p-5"
          style={{
            display: "flex",
            justifyContent: "center",
            flexDirection: "row",
          }}
        >
          <Routes>
            <Route>
              <Route
                path="/"
                element={
                  <>
                    <Grid grid={grid} agents={agents} />
                    <div className="chart-container" style={{position: "relative", width: "30vw", marginLeft: "5vw"}}>
                      <Bar options={options} data={data} />
                      <Line ref={Ref} options={options2} data={data2} style={{marginTop: "15%"}}/>
                    </div>
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
        />
      </BrowserRouter>
    </>
  );
}

export default App;